from app.config import settings
from app.observability.tracing import traceable_op
from app.rag.generator import render_answer
from app.rag.guardrails import check_input_safety
from app.rag.source_router import route_sources
from app.schemas import AskResponse, Citation
from app.storage.vector_store import store


@traceable_op("rag-answer-question")
def answer_question(
    question: str,
    variant: str,
    source_filters: list[str] | None = None,
    auto_route_sources: bool = True,
) -> AskResponse:
    allowed, reason = check_input_safety(question)
    if not allowed:
        return AskResponse(
            answer="",
            citations=[],
            blocked=True,
            reason=reason,
            routed_sources=[],
            applied_source_filters=[],
        )

    effective_source_filters = [item for item in (source_filters or []) if item.strip()]
    routed_sources: list[str] = []
    if auto_route_sources and not effective_source_filters:
        routed_sources = route_sources(question)
        effective_source_filters = routed_sources.copy()

    top_docs = store.search(
        question,
        top_k=settings.max_context_docs,
        source_filters=effective_source_filters,
    )
    citations: list[Citation] = []
    context_chunks: list[str] = []

    for doc, score in top_docs:
        citations.append(
            Citation(doc_id=doc.id, title=doc.title, source=doc.source, score=round(score, 4))
        )
        context_chunks.append(doc.text[:1200])

    answer = render_answer(question, context_chunks, citations, variant)
    return AskResponse(
        answer=answer,
        citations=citations,
        blocked=False,
        reason=None,
        routed_sources=routed_sources,
        applied_source_filters=effective_source_filters,
    )
