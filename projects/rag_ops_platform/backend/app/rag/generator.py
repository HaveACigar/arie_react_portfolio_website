import re

from app.schemas import Citation


NOISY_PATTERNS = (
    "representative messy rows",
    " location=",
    " geo=",
    " created=",
    " status=",
)


def _sentences(text: str) -> list[str]:
    parts = re.split(r"(?<=[.!?])\s+", text.replace("\n", " "))
    return [part.strip() for part in parts if part.strip()]


def _is_noisy(sentence: str) -> bool:
    lowered = sentence.lower()
    if any(pattern in lowered for pattern in NOISY_PATTERNS):
        return True
    if "#" in sentence and any(token in lowered for token in ("created=", "location=", "geo=")):
        return True
    return False


def _extract_points(chunk: str, max_points: int = 2) -> list[str]:
    keep: list[str] = []
    preferred_keywords = (
        "summary",
        "total",
        "top",
        "trend",
        "increase",
        "decrease",
        "complaint",
        "revenue",
        "liabilit",
        "crime",
        "balance",
    )

    for sentence in _sentences(chunk):
        if _is_noisy(sentence):
            continue
        if len(sentence) < 25:
            continue
        if any(keyword in sentence.lower() for keyword in preferred_keywords):
            keep.append(sentence)

    if not keep:
        for sentence in _sentences(chunk):
            if _is_noisy(sentence):
                continue
            if len(sentence) >= 25:
                keep.append(sentence)
            if len(keep) >= max_points:
                break

    return keep[:max_points]


def render_answer(question: str, context_chunks: list[str], citations: list[Citation], variant: str) -> str:
    if not context_chunks:
        return "I do not have enough indexed context yet. Ingest documents and retry."

    findings: list[str] = []
    for index, chunk in enumerate(context_chunks):
        title = citations[index].title if index < len(citations) else f"Document {index + 1}"
        for point in _extract_points(chunk, max_points=2):
            findings.append(f"- {title}: {point}")

    sources = sorted({citation.source for citation in citations})
    source_text = ", ".join(sources) if sources else "unknown"
    citations_text = ", ".join(citation.title for citation in citations[:5]) if citations else "none"

    if variant == "concise":
        top_findings = findings[:4] if findings else ["- Retrieved relevant evidence, but no concise points could be extracted."]
        return (
            f"Question: {question}\n"
            f"Sources consulted: {source_text}\n"
            "Key findings:\n"
            + "\n".join(top_findings)
        )

    detailed_findings = findings[:8] if findings else ["- Retrieved relevant evidence, but no structured findings could be extracted."]
    return (
        f"Question: {question}\n"
        f"Sources consulted: {source_text}\n"
        "Grounded findings:\n"
        + "\n".join(detailed_findings)
        + f"\nCitations used: {citations_text}"
    )
