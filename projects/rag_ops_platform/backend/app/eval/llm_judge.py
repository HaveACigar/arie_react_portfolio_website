import json

from openai import OpenAI

from app.config import settings
from app.observability.tracing import traceable_op
from app.rag.pipeline import answer_question
from app.schemas import (
    JudgeEvalCase,
    JudgeEvalCaseResult,
    JudgeEvalSummary,
)


def _clamp_score(value: float) -> float:
    return max(0.0, min(1.0, value))


def _keyword_hit_rate(text: str, keywords: list[str]) -> float:
    if not keywords:
        return 1.0
    lowered = text.lower()
    hits = sum(1 for kw in keywords if kw.lower() in lowered)
    return hits / len(keywords)


def _heuristic_scores(answer: str, keyword_targets: list[str], citation_count: int) -> tuple[float, float, str]:
    relevance = _keyword_hit_rate(answer, keyword_targets)
    groundedness = 1.0 if citation_count > 0 else 0.25
    rationale = "Heuristic judge used (no OpenAI API key configured)."
    return _clamp_score(relevance), _clamp_score(groundedness), rationale


def _llm_scores(question: str, answer: str, expected_keywords: list[str], citations: list[dict]) -> tuple[float, float, str]:
    client = OpenAI(api_key=settings.openai_api_key)

    prompt = (
        "You are an evaluation judge for a RAG system. "
        "Score the answer on relevance and groundedness between 0 and 1. "
        "Return only valid JSON with keys relevance_score, groundedness_score, rationale."
    )

    user_payload = {
        "question": question,
        "answer": answer,
        "expected_keywords": expected_keywords,
        "citations": citations,
    }

    completion = client.chat.completions.create(
        model=settings.openai_judge_model,
        temperature=0,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": json.dumps(user_payload)},
        ],
    )

    content = completion.choices[0].message.content or "{}"
    parsed = json.loads(content)
    relevance = float(parsed.get("relevance_score", 0.0))
    groundedness = float(parsed.get("groundedness_score", 0.0))
    rationale = str(parsed.get("rationale", "LLM judge scored this case."))
    return _clamp_score(relevance), _clamp_score(groundedness), rationale


@traceable_op("rag-llm-judge-eval")
def run_llm_judge_eval(cases: list[JudgeEvalCase]) -> JudgeEvalSummary:
    if not cases:
        return JudgeEvalSummary(
            avg_relevance_score=0.0,
            avg_groundedness_score=0.0,
            avg_overall_score=0.0,
            case_count=0,
            judge_model=settings.openai_judge_model,
            used_llm_judge=bool(settings.openai_api_key),
            cases=[],
        )

    used_llm_judge = bool(settings.openai_api_key)
    results: list[JudgeEvalCaseResult] = []

    for case in cases:
        qa = answer_question(case.question, variant="baseline")

        if qa.blocked:
            results.append(
                JudgeEvalCaseResult(
                    question=case.question,
                    answer=qa.answer,
                    blocked=True,
                    relevance_score=0.0,
                    groundedness_score=0.0,
                    overall_score=0.0,
                    rationale=qa.reason or "Blocked by guardrails.",
                )
            )
            continue

        try:
            if used_llm_judge:
                relevance, groundedness, rationale = _llm_scores(
                    question=case.question,
                    answer=qa.answer,
                    expected_keywords=case.expected_keywords,
                    citations=[c.model_dump() for c in qa.citations],
                )
            else:
                relevance, groundedness, rationale = _heuristic_scores(
                    answer=qa.answer,
                    keyword_targets=case.expected_keywords,
                    citation_count=len(qa.citations),
                )
        except Exception as exc:
            used_llm_judge = False
            relevance, groundedness, rationale = _heuristic_scores(
                answer=qa.answer,
                keyword_targets=case.expected_keywords,
                citation_count=len(qa.citations),
            )
            rationale = f"{rationale} Fallback reason: {exc}"

        overall = round((relevance + groundedness) / 2, 3)
        results.append(
            JudgeEvalCaseResult(
                question=case.question,
                answer=qa.answer,
                blocked=False,
                relevance_score=round(relevance, 3),
                groundedness_score=round(groundedness, 3),
                overall_score=overall,
                rationale=rationale,
            )
        )

    case_count = len(results)
    avg_relevance = round(sum(item.relevance_score for item in results) / case_count, 3)
    avg_groundedness = round(sum(item.groundedness_score for item in results) / case_count, 3)
    avg_overall = round(sum(item.overall_score for item in results) / case_count, 3)

    return JudgeEvalSummary(
        avg_relevance_score=avg_relevance,
        avg_groundedness_score=avg_groundedness,
        avg_overall_score=avg_overall,
        case_count=case_count,
        judge_model=settings.openai_judge_model,
        used_llm_judge=used_llm_judge,
        cases=results,
    )
