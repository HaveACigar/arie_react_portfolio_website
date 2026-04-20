from app.schemas import Citation


def render_answer(question: str, context_chunks: list[str], citations: list[Citation], variant: str) -> str:
    if not context_chunks:
        return "I do not have enough indexed context yet. Ingest documents and retry."

    context = "\n\n".join(context_chunks)

    if variant == "concise":
        return (
            "Answer (concise mode):\n"
            f"Based on indexed docs, here is a short response to '{question}'.\n"
            f"Key evidence:\n{context[:700]}"
        )

    return (
        "Answer (baseline mode):\n"
        f"Question: {question}\n"
        "Grounded response generated from retrieved context.\n"
        f"Evidence summary:\n{context[:1400]}\n"
        f"Citations used: {', '.join(c.title for c in citations) if citations else 'none'}"
    )
