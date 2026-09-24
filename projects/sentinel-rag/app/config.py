from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    azure_openai_endpoint: str
    azure_openai_model: str
    azure_openai_embedding_model: str
    azure_search_endpoint: str
    azure_search_index: str = "security-knowledge"
    top_k: int = 5
    chunk_size: int = 1200
    chunk_overlap: int = 200

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False, extra="ignore")

settings = Settings()
