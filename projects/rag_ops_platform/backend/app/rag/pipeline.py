from app.config import settings
from app.rag.generator import render_answer
from app.rag.guardrails import check_input_safety
from app.schemas import AskResponse, Citation
from app.storage.vector_store import store


def answer_question(question: str, variant: str) -> AskResponse:
    allowed, reason = check_input_safety(question)
    if not allowed:
        return AskResponse(answer="", citations=[], blocked=True, reason=reason)

    top_docs = store.search(question, top_k=settings.max_context_docs)
    citations: list[Citation] = []
    context_chunks: list[str] = []

    for doc, score in top_docs:
        citations.append(
            Citation(doc_id=doc.id, title=doc.title, source=doc.source, score=round(score, 4))
        )
        context_chunks.append(doc.text[:1200])

    answer = render_answer(question, context_chunks, citations, variant)
    return AskResponse(answer=answer, citations=citations, blocked=False, reason=None)
