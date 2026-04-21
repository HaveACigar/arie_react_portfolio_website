import re
from collections import defaultdict

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


def _find_int(label: str, text: str) -> int | None:
    match = re.search(rf"{re.escape(label)}\s*:\s*(\d+)", text, re.IGNORECASE)
    if not match:
        return None
    try:
        return int(match.group(1))
    except ValueError:
        return None


def _find_after_label(label: str, text: str) -> str | None:
    match = re.search(rf"{re.escape(label)}\s*:\s*([^\n\.]+)", text, re.IGNORECASE)
    if not match:
        return None
    value = match.group(1).strip()
    return value if value else None


def _summarize_nyc311(question: str, context_chunks: list[str], citations: list[Citation]) -> str:
    complaint_totals: dict[str, int] = defaultdict(int)
    complaint_boroughs: dict[str, set[str]] = defaultdict(set)
    complaint_descriptors: dict[str, list[str]] = defaultdict(list)

    for index, citation in enumerate(citations):
        if citation.source != "nyc_311":
            continue
        chunk = context_chunks[index] if index < len(context_chunks) else ""

        title_parts = [part.strip() for part in citation.title.split("|")]
        if len(title_parts) >= 3:
            complaint = title_parts[1]
            borough = title_parts[2]
        else:
            complaint = citation.title
            borough = "Unspecified"

        total = _find_int("Total complaints", chunk) or 0
        top_descriptor = _find_after_label("Top descriptors", chunk) or "none"

        complaint_totals[complaint] += total
        complaint_boroughs[complaint].add(borough)
        if top_descriptor and top_descriptor != "none":
            complaint_descriptors[complaint].append(top_descriptor)

    if not complaint_totals:
        return ""

    ranked = sorted(complaint_totals.items(), key=lambda item: item[1], reverse=True)
    top_items = ranked[:4]

    lines: list[str] = [
        f"Question: {question}",
        "Sources consulted: nyc_311",
        "Summary:",
        "- The strongest recurring complaint categories in the retrieved evidence are listed below.",
        "Top recurring categories:",
    ]

    for complaint, total in top_items:
        boroughs = ", ".join(sorted(complaint_boroughs[complaint]))
        descriptor = complaint_descriptors[complaint][0] if complaint_descriptors[complaint] else "n/a"
        lines.append(
            f"- {complaint}: {total} complaint(s) across {boroughs}. Typical descriptor: {descriptor}."
        )

    return "\n".join(lines)


def _summarize_chicago(question: str, context_chunks: list[str], citations: list[Citation]) -> str:
    findings: list[str] = []
    for index, citation in enumerate(citations):
        if citation.source != "chicago_crimes":
            continue
        chunk = context_chunks[index] if index < len(context_chunks) else ""
        incidents = _find_int("Total incidents", chunk)
        arrest_rate = _find_after_label("Arrest rate", chunk)
        domestic_rate = _find_after_label("Domestic flag rate", chunk)
        top_desc = _find_after_label("Top descriptions", chunk)
        findings.append(
            f"- {citation.title}: incidents={incidents if incidents is not None else 'n/a'}, "
            f"arrest={arrest_rate or 'n/a'}, domestic={domestic_rate or 'n/a'}, top={top_desc or 'n/a'}."
        )

    if not findings:
        return ""

    return "\n".join([
        f"Question: {question}",
        "Sources consulted: chicago_crimes",
        "Summary:",
        *findings[:4],
    ])


def _summarize_sec(question: str, context_chunks: list[str], citations: list[Citation]) -> str:
    findings: list[str] = []
    for index, citation in enumerate(citations):
        if citation.source != "sec_companyfacts":
            continue
        chunk = context_chunks[index] if index < len(context_chunks) else ""
        focus_lines: list[str] = []
        for line in chunk.splitlines():
            lowered = line.lower()
            if any(token in lowered for token in ("revenue", "liabilities", "assets", "net income", "operating cash flow")):
                focus_lines.append(line.strip())
        if focus_lines:
            findings.append(f"- {citation.title}: {' | '.join(focus_lines[:3])}")
        else:
            points = _extract_points(chunk, max_points=2)
            if points:
                findings.append(f"- {citation.title}: {' | '.join(points)}")

    if not findings:
        return ""

    return "\n".join([
        f"Question: {question}",
        "Sources consulted: sec_companyfacts",
        "Summary:",
        *findings[:3],
    ])


def _summarize_generic(question: str, context_chunks: list[str], citations: list[Citation]) -> str:
    findings: list[str] = []
    for index, chunk in enumerate(context_chunks):
        title = citations[index].title if index < len(citations) else f"Document {index + 1}"
        points = _extract_points(chunk, max_points=1)
        if points:
            findings.append(f"- {title}: {points[0]}")

    if not findings:
        findings = ["- Retrieved relevant evidence, but no structured findings could be extracted."]

    sources = sorted({citation.source for citation in citations})
    source_text = ", ".join(sources) if sources else "unknown"
    return "\n".join([
        f"Question: {question}",
        f"Sources consulted: {source_text}",
        "Summary:",
        *findings[:5],
    ])


def render_answer(question: str, context_chunks: list[str], citations: list[Citation], variant: str) -> str:
    if not context_chunks:
        return "I do not have enough indexed context yet. Ingest documents and retry."

    source_set = {citation.source for citation in citations}
    citations_text = ", ".join(citation.title for citation in citations[:5]) if citations else "none"

    if source_set == {"nyc_311"}:
        answer = _summarize_nyc311(question, context_chunks, citations)
    elif source_set == {"chicago_crimes"}:
        answer = _summarize_chicago(question, context_chunks, citations)
    elif source_set == {"sec_companyfacts"}:
        answer = _summarize_sec(question, context_chunks, citations)
    else:
        answer = _summarize_generic(question, context_chunks, citations)

    if not answer:
        answer = _summarize_generic(question, context_chunks, citations)

    if variant == "concise":
        lines = answer.splitlines()
        if len(lines) > 8:
            answer = "\n".join(lines[:8])

    return f"{answer}\nCitations used: {citations_text}"
