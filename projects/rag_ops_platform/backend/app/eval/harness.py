from app.rag.pipeline import answer_question
from app.schemas import EvalCase, EvalSummary


def _keyword_hit_rate(text: str, keywords: list[str]) -> float:
    if not keywords:
        return 1.0
    lowered = text.lower()
    hits = sum(1 for kw in keywords if kw.lower() in lowered)
    return hits / len(keywords)


def _retrieval_overlap(case: EvalCase, citation_titles: list[str]) -> float:
    if not case.expected_keywords:
        return 1.0
    normalized = [t.lower() for t in citation_titles]
    hits = 0
    for kw in case.expected_keywords:
        if any(kw.lower() in title for title in normalized):
            hits += 1
    return hits / len(case.expected_keywords)


def run_eval(cases: list[EvalCase]) -> EvalSummary:
    if not cases:
        return EvalSummary(
            avg_retrieval_overlap=0.0,
            avg_answer_keyword_hit_rate=0.0,
            case_count=0,
        )

    retrieval_scores: list[float] = []
    answer_scores: list[float] = []

    for case in cases:
        result = answer_question(case.question, variant="baseline")
        titles = [c.title for c in result.citations]
        retrieval_scores.append(_retrieval_overlap(case, titles))
        answer_scores.append(_keyword_hit_rate(result.answer, case.expected_keywords))

    return EvalSummary(
        avg_retrieval_overlap=round(sum(retrieval_scores) / len(retrieval_scores), 3),
        avg_answer_keyword_hit_rate=round(sum(answer_scores) / len(answer_scores), 3),
        case_count=len(cases),
    )
