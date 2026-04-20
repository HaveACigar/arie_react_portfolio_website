from pydantic import BaseModel, Field


class DocumentIn(BaseModel):
    id: str
    title: str
    text: str = Field(min_length=20)
    source: str


class IngestRequest(BaseModel):
    documents: list[DocumentIn]


class AskRequest(BaseModel):
    question: str = Field(min_length=3)
    user_id: str
    experiment_variant: str = "baseline"


class Citation(BaseModel):
    doc_id: str
    title: str
    source: str
    score: float


class AskResponse(BaseModel):
    answer: str
    citations: list[Citation]
    blocked: bool
    reason: str | None = None


class EvalCase(BaseModel):
    question: str
    expected_keywords: list[str] = []


class EvalRequest(BaseModel):
    cases: list[EvalCase]


class EvalSummary(BaseModel):
    avg_retrieval_overlap: float
    avg_answer_keyword_hit_rate: float
    case_count: int
