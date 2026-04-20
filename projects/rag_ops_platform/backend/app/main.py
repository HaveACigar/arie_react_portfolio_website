from fastapi import FastAPI
from app.config import settings
from app.eval.harness import run_eval
from app.rag.pipeline import answer_question
from app.schemas import AskRequest, AskResponse, EvalRequest, EvalSummary, IngestRequest
from app.storage.vector_store import StoredDoc, store
from app.telemetry import telemetry


app = FastAPI(title=settings.app_name)


@app.get("/health")
def health() -> dict:
    return {"status": "ok", "environment": settings.environment}


@app.post("/ingest")
def ingest(payload: IngestRequest) -> dict:
    started = telemetry.start_timer()
    docs = [StoredDoc(id=d.id, title=d.title, source=d.source, text=d.text) for d in payload.documents]
    ingested = store.upsert(docs)
    telemetry.record_request("ingest", started, token_estimate=sum(len(d.text) // 4 for d in payload.documents))
    return {"ingested": ingested, "total_docs": len(store.docs)}


@app.post("/ask", response_model=AskResponse)
def ask(payload: AskRequest) -> AskResponse:
    started = telemetry.start_timer()
    result = answer_question(payload.question, variant=payload.experiment_variant)
    telemetry.record_request("ask", started, token_estimate=len(payload.question) // 4 + len(result.answer) // 4)
    return result


@app.post("/eval/run", response_model=EvalSummary)
def run_eval_suite(payload: EvalRequest) -> EvalSummary:
    started = telemetry.start_timer()
    summary = run_eval(payload.cases)
    telemetry.record_request("eval", started)
    return summary


@app.get("/metrics")
def metrics() -> dict:
    return telemetry.snapshot()
