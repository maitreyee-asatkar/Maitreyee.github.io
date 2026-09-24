from azure.identity import DefaultAzureCredential, get_bearer_token_provider
from openai import OpenAI
from .config import settings

def get_openai_client() -> OpenAI:
    token_provider = get_bearer_token_provider(
        DefaultAzureCredential(), "https://ai.azure.com/.default"
    )
    return OpenAI(
        base_url=f"{settings.azure_openai_endpoint.rstrip('/')}/openai/v1/",
        api_key=token_provider,
    )

def embed(text: str) -> list[float]:
    client = get_openai_client()
    response = client.embeddings.create(
        model=settings.azure_openai_embedding_model,
        input=text,
    )
    return response.data[0].embedding
