from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)


def test_health() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"


def test_ingest_and_ask() -> None:
    ingest_response = client.post(
        "/ingest",
        json={
            "documents": [
                {
                    "id": "doc-1",
                    "title": "RAG Overview",
                    "source": "internal",
                    "text": "Retrieval augmented generation combines retrieval and generation for grounded responses.",
                }
            ]
        },
    )
    assert ingest_response.status_code == 200

    ask_response = client.post(
        "/ask",
        json={"question": "What is retrieval augmented generation?", "user_id": "u1", "experiment_variant": "baseline"},
    )
    assert ask_response.status_code == 200
    body = ask_response.json()
    assert body["blocked"] is False
    assert len(body["citations"]) >= 1
