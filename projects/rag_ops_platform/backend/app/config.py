from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "RAG Ops Platform"
    environment: str = "dev"
    cors_origins: str = "http://localhost:4173,http://127.0.0.1:4173"
    retrieval_backend: str = "tfidf"
    max_context_docs: int = 4
    max_context_chars: int = 5000
    blocked_terms: str = "ssn,credit card,password"
    monthly_token_budget: int = 2_000_000
    openai_api_key: str | None = None
    openai_embedding_model: str = "text-embedding-3-small"
    openai_judge_model: str = "gpt-4o-mini"
    embedding_dimensions: int = 1536
    pgvector_dsn: str = "postgresql://postgres:postgres@localhost:5432/rag_ops"
    pgvector_table: str = "documents"
    langsmith_tracing: bool = False
    langsmith_api_key: str | None = None
    langsmith_project: str = "rag-ops-platform"

    model_config = SettingsConfigDict(env_file=".env", env_prefix="RAG_", extra="ignore")


settings = Settings()
