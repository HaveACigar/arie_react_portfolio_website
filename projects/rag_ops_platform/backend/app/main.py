import json
import re

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from app.config import settings
from app.eval.harness import run_eval
from app.eval.llm_judge import run_llm_judge_eval
from app.rag.pipeline import answer_question
from app.schemas import (
    AskRequest,
    AskResponse,
    EvalRequest,
    EvalSummary,
    IngestRequest,
    JudgeEvalRequest,
    JudgeEvalSummary,
)
from app.storage.vector_store import StoredDoc, store
from app.telemetry import telemetry


app = FastAPI(title=settings.app_name)

allowed_origins = [origin.strip() for origin in settings.cors_origins.split(",") if origin.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _sse_event(event: str, payload: dict) -> str:
    return f"event: {event}\ndata: {json.dumps(payload)}\n\n"


@app.get("/health")
def health() -> dict:
    return {"status": "ok", "environment": settings.environment}


@app.post("/ingest")
def ingest(payload: IngestRequest) -> dict:
    started = telemetry.start_timer()
    docs = [StoredDoc(id=d.id, title=d.title, source=d.source, text=d.text) for d in payload.documents]
    ingested = store.upsert(docs)
    telemetry.record_request("ingest", started, token_estimate=sum(len(d.text) // 4 for d in payload.documents))
    return {"ingested": ingested, "total_docs": store.count()}


@app.post("/ask", response_model=AskResponse)
def ask(payload: AskRequest) -> AskResponse:
    started = telemetry.start_timer()
    result = answer_question(
        payload.question,
        variant=payload.experiment_variant,
        source_filters=payload.source_filters,
        auto_route_sources=payload.auto_route_sources,
    )
    telemetry.record_request("ask", started, token_estimate=len(payload.question) // 4 + len(result.answer) // 4)
    return result


@app.post("/ask/stream")
def ask_stream(payload: AskRequest) -> StreamingResponse:
    started = telemetry.start_timer()
    result = answer_question(
        payload.question,
        variant=payload.experiment_variant,
        source_filters=payload.source_filters,
        auto_route_sources=payload.auto_route_sources,
    )
    telemetry.record_request("ask_stream", started, token_estimate=len(payload.question) // 4 + len(result.answer) // 4)

    def event_source():
        if result.blocked:
            yield _sse_event("blocked", {"reason": result.reason})
            yield _sse_event("done", {"blocked": True})
            return

        # Stream chunks with trailing whitespace preserved so the UI keeps newlines/indentation.
        for token in re.findall(r"\S+\s*", result.answer):
            yield _sse_event("token", {"text": token})

        yield _sse_event(
            "metadata",
            {
                "blocked": False,
                "citations": [citation.model_dump() for citation in result.citations],
                "routed_sources": result.routed_sources,
                "applied_source_filters": result.applied_source_filters,
            },
        )
        yield _sse_event("done", {"blocked": False})

    return StreamingResponse(event_source(), media_type="text/event-stream")


@app.post("/eval/run", response_model=EvalSummary)
def run_eval_suite(payload: EvalRequest) -> EvalSummary:
    started = telemetry.start_timer()
    summary = run_eval(payload.cases)
    telemetry.record_request("eval", started)
    return summary


@app.post("/eval/judge", response_model=JudgeEvalSummary)
def run_judge_eval_suite(payload: JudgeEvalRequest) -> JudgeEvalSummary:
    started = telemetry.start_timer()
    summary = run_llm_judge_eval(payload.cases)
    telemetry.record_request("eval_judge", started)
    return summary


@app.get("/metrics")
def metrics() -> dict:
    return telemetry.snapshot()
