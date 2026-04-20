from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "RAG Ops Platform"
    environment: str = "dev"
    max_context_docs: int = 4
    max_context_chars: int = 5000
    blocked_terms: str = "ssn,credit card,password"
    monthly_token_budget: int = 2_000_000

    model_config = SettingsConfigDict(env_file=".env", env_prefix="RAG_")


settings = Settings()
