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


def test_stream_and_judge_eval() -> None:
    stream_response = client.post(
        "/ask/stream",
        json={"question": "What is retrieval augmented generation?", "user_id": "u2", "experiment_variant": "baseline"},
    )
    assert stream_response.status_code == 200
    assert "event: done" in stream_response.text

    judge_response = client.post(
        "/eval/judge",
        json={
            "cases": [
                {
                    "question": "What is retrieval augmented generation?",
                    "expected_keywords": ["retrieval", "generation"],
                }
            ]
        },
    )
    assert judge_response.status_code == 200
    summary = judge_response.json()
    assert summary["case_count"] == 1
    assert len(summary["cases"]) == 1


def test_source_filtered_retrieval() -> None:
    ingest_response = client.post(
        "/ingest",
        json={
            "documents": [
                {
                    "id": "src-a-1",
                    "title": "Source A Doc",
                    "source": "source_a",
                    "text": "Alpha source doc discussing traffic and city infrastructure.",
                },
                {
                    "id": "src-b-1",
                    "title": "Source B Doc",
                    "source": "source_b",
                    "text": "Beta source doc discussing SEC filing revenue and assets.",
                },
            ]
        },
    )
    assert ingest_response.status_code == 200

    filtered_response = client.post(
        "/ask",
        json={
            "question": "What does this corpus say about SEC filing revenue?",
            "user_id": "u3",
            "experiment_variant": "baseline",
            "source_filters": ["source_b"],
        },
    )
    assert filtered_response.status_code == 200
    body = filtered_response.json()
    assert body["blocked"] is False
    assert len(body["citations"]) >= 1
    assert all(citation["source"] == "source_b" for citation in body["citations"])


def test_auto_route_sources_when_filters_empty() -> None:
    ingest_response = client.post(
        "/ingest",
        json={
            "documents": [
                {
                    "id": "sec-1",
                    "title": "SEC Metrics",
                    "source": "sec_companyfacts",
                    "text": "Revenue and liabilities trends from SEC filings and balance sheet data.",
                },
                {
                    "id": "nyc-1",
                    "title": "NYC Complaints",
                    "source": "nyc_311",
                    "text": "Noise and sanitation complaints in Brooklyn and Manhattan.",
                },
            ]
        },
    )
    assert ingest_response.status_code == 200

    routed_response = client.post(
        "/ask",
        json={
            "question": "What do SEC filings indicate about revenue?",
            "user_id": "u4",
            "experiment_variant": "baseline",
            "source_filters": [],
            "auto_route_sources": True,
        },
    )
    assert routed_response.status_code == 200
    body = routed_response.json()
    assert len(body["citations"]) >= 1
    assert all(citation["source"] == "sec_companyfacts" for citation in body["citations"])
    assert body["routed_sources"] == ["sec_companyfacts"]
    assert body["applied_source_filters"] == ["sec_companyfacts"]
