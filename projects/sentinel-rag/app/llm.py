from .embeddings import get_openai_client
from .config import settings
from .prompts import SYSTEM_PROMPT, build_user_prompt

def answer(question: str, chunks: list[dict]) -> str:
    client = get_openai_client()
    response = client.responses.create(
        model=settings.azure_openai_model,
        instructions=SYSTEM_PROMPT,
        input=build_user_prompt(question, chunks),
        max_output_tokens=700,
    )
    return response.output_text
