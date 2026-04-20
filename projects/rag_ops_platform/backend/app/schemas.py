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
    source_filters: list[str] = Field(default_factory=list)
    auto_route_sources: bool = True


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
    routed_sources: list[str] = Field(default_factory=list)
    applied_source_filters: list[str] = Field(default_factory=list)


class EvalCase(BaseModel):
    question: str
    expected_keywords: list[str] = []


class EvalRequest(BaseModel):
    cases: list[EvalCase]


class EvalSummary(BaseModel):
    avg_retrieval_overlap: float
    avg_answer_keyword_hit_rate: float
    case_count: int


class JudgeEvalCase(BaseModel):
    question: str
    expected_keywords: list[str] = []


class JudgeEvalRequest(BaseModel):
    cases: list[JudgeEvalCase]


class JudgeEvalCaseResult(BaseModel):
    question: str
    answer: str
    blocked: bool
    relevance_score: float
    groundedness_score: float
    overall_score: float
    rationale: str


class JudgeEvalSummary(BaseModel):
    avg_relevance_score: float
    avg_groundedness_score: float
    avg_overall_score: float
    case_count: int
    judge_model: str
    used_llm_judge: bool
    cases: list[JudgeEvalCaseResult]
