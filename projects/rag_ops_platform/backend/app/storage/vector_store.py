from dataclasses import dataclass
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


@dataclass
class StoredDoc:
    id: str
    title: str
    source: str
    text: str


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

    def search(self, query: str, top_k: int = 4) -> list[tuple[StoredDoc, float]]:
        if not self.docs or self._matrix is None:
            return []
        query_vec = self._vectorizer.transform([query])
        similarities = cosine_similarity(query_vec, self._matrix)[0]
        ranked = sorted(enumerate(similarities), key=lambda item: item[1], reverse=True)[:top_k]
        return [(self.docs[index], float(score)) for index, score in ranked]


store = InMemoryVectorStore()
