from typing import Sequence

from openai import OpenAI

from app.config import settings


class EmbeddingError(RuntimeError):
    pass


def embed_texts(texts: Sequence[str]) -> list[list[float]]:
    if not texts:
        return []

    if not settings.openai_api_key:
        raise EmbeddingError("RAG_OPENAI_API_KEY must be set when using pgvector backend.")

    client = OpenAI(api_key=settings.openai_api_key)
    response = client.embeddings.create(
        model=settings.openai_embedding_model,
        input=list(texts),
    )
    return [item.embedding for item in response.data]


def embed_query(text: str) -> list[float]:
    vectors = embed_texts([text])
    if not vectors:
        raise EmbeddingError("Failed to embed query text.")
    return vectors[0]
