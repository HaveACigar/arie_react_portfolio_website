from dataclasses import dataclass
from typing import Protocol

import psycopg
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from app.config import settings
from app.rag.embeddings import embed_query, embed_texts


@dataclass
class StoredDoc:
    id: str
    title: str
    source: str
    text: str


class VectorStore(Protocol):
    def upsert(self, docs: list[StoredDoc]) -> int:
        ...

    def search(
        self,
        query: str,
        top_k: int = 4,
        source_filters: list[str] | None = None,
    ) -> list[tuple[StoredDoc, float]]:
        ...

    def count(self) -> int:
        ...


class InMemoryVectorStore:
    def __init__(self) -> None:
        self.docs: list[StoredDoc] = []
        self._vectorizer = TfidfVectorizer(stop_words="english")
        self._matrix = None

    def upsert(self, docs: list[StoredDoc]) -> int:
        existing = {doc.id: doc for doc in self.docs}
        for doc in docs:
            existing[doc.id] = doc
        self.docs = list(existing.values())
        corpus = [doc.text for doc in self.docs]
        self._matrix = self._vectorizer.fit_transform(corpus) if corpus else None
        return len(docs)

    def search(
        self,
        query: str,
        top_k: int = 4,
        source_filters: list[str] | None = None,
    ) -> list[tuple[StoredDoc, float]]:
        if not self.docs or self._matrix is None:
            return []

        normalized_filters = {item.strip().lower() for item in (source_filters or []) if item.strip()}
        query_vec = self._vectorizer.transform([query])
        similarities = cosine_similarity(query_vec, self._matrix)[0]

        ranked_candidates = sorted(enumerate(similarities), key=lambda item: item[1], reverse=True)
        filtered_candidates: list[tuple[int, float]] = []
        for index, score in ranked_candidates:
            if normalized_filters and self.docs[index].source.lower() not in normalized_filters:
                continue
            filtered_candidates.append((index, score))
            if len(filtered_candidates) >= top_k:
                break

        ranked = filtered_candidates[:top_k]
        return [(self.docs[index], float(score)) for index, score in ranked]

    def count(self) -> int:
        return len(self.docs)


class PgVectorStore:
    def __init__(self, dsn: str, table_name: str) -> None:
        self._dsn = dsn
        self._table_name = table_name
        self._ensure_schema()

    def _ensure_schema(self) -> None:
        with psycopg.connect(self._dsn) as conn:
            with conn.cursor() as cur:
                cur.execute("CREATE EXTENSION IF NOT EXISTS vector")
                cur.execute(
                    f"""
                    CREATE TABLE IF NOT EXISTS {self._table_name} (
                        id TEXT PRIMARY KEY,
                        title TEXT NOT NULL,
                        source TEXT NOT NULL,
                        text TEXT NOT NULL,
                        embedding vector({settings.embedding_dimensions}) NOT NULL
                    )
                    """
                )
            conn.commit()

    @staticmethod
    def _to_vector_literal(vector: list[float]) -> str:
        return "[" + ",".join(f"{value:.8f}" for value in vector) + "]"

    def upsert(self, docs: list[StoredDoc]) -> int:
        if not docs:
            return 0

        vectors = embed_texts([doc.text for doc in docs])

        with psycopg.connect(self._dsn) as conn:
            with conn.cursor() as cur:
                for doc, vector in zip(docs, vectors, strict=True):
                    cur.execute(
                        f"""
                        INSERT INTO {self._table_name} (id, title, source, text, embedding)
                        VALUES (%s, %s, %s, %s, %s::vector)
                        ON CONFLICT (id)
                        DO UPDATE SET
                            title = EXCLUDED.title,
                            source = EXCLUDED.source,
                            text = EXCLUDED.text,
                            embedding = EXCLUDED.embedding
                        """,
                        (
                            doc.id,
                            doc.title,
                            doc.source,
                            doc.text,
                            self._to_vector_literal(vector),
                        ),
                    )
            conn.commit()
        return len(docs)

    def search(
        self,
        query: str,
        top_k: int = 4,
        source_filters: list[str] | None = None,
    ) -> list[tuple[StoredDoc, float]]:
        if top_k <= 0:
            return []

        query_embedding = embed_query(query)
        vector_literal = self._to_vector_literal(query_embedding)
        normalized_filters = [item.strip().lower() for item in (source_filters or []) if item.strip()]

        with psycopg.connect(self._dsn) as conn:
            with conn.cursor() as cur:
                if normalized_filters:
                    cur.execute(
                        f"""
                        SELECT
                            id,
                            title,
                            source,
                            text,
                            (1 - (embedding <=> %s::vector)) AS score
                        FROM {self._table_name}
                        WHERE lower(source) = ANY(%s)
                        ORDER BY embedding <=> %s::vector ASC
                        LIMIT %s
                        """,
                        (vector_literal, normalized_filters, vector_literal, top_k),
                    )
                else:
                    cur.execute(
                        f"""
                        SELECT
                            id,
                            title,
                            source,
                            text,
                            (1 - (embedding <=> %s::vector)) AS score
                        FROM {self._table_name}
                        ORDER BY embedding <=> %s::vector ASC
                        LIMIT %s
                        """,
                        (vector_literal, vector_literal, top_k),
                    )
                rows = cur.fetchall()

        results: list[tuple[StoredDoc, float]] = []
        for row in rows:
            doc = StoredDoc(id=row[0], title=row[1], source=row[2], text=row[3])
            score = float(row[4]) if row[4] is not None else 0.0
            results.append((doc, score))
        return results

    def count(self) -> int:
        with psycopg.connect(self._dsn) as conn:
            with conn.cursor() as cur:
                cur.execute(f"SELECT COUNT(*) FROM {self._table_name}")
                row = cur.fetchone()
                return int(row[0]) if row else 0


def _build_store() -> VectorStore:
    if settings.retrieval_backend.lower() == "pgvector":
        if not settings.openai_api_key:
            print("[rag-ops] pgvector requested but RAG_OPENAI_API_KEY is empty; falling back to tfidf.")
            return InMemoryVectorStore()
        try:
            return PgVectorStore(settings.pgvector_dsn, settings.pgvector_table)
        except Exception as exc:
            print(f"[rag-ops] pgvector init failed ({exc}); falling back to tfidf.")
            return InMemoryVectorStore()
    return InMemoryVectorStore()


store: VectorStore = _build_store()
