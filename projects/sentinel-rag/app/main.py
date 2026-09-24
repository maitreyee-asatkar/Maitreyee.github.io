from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from .search import retrieve
from .llm import answer

app = FastAPI(title="SentinelRAG Security Knowledge Assistant", version="0.1.0")

class AskRequest(BaseModel):
    question: str = Field(min_length=5, max_length=2000)

class AskResponse(BaseModel):
    answer: str
    sources: list[str]

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/ask", response_model=AskResponse)
def ask(request: AskRequest):
    try:
        chunks = retrieve(request.question)
        if not chunks:
            return AskResponse(
                answer="I don't have enough evidence in the indexed knowledge base to answer that.",
                sources=[],
            )
        return AskResponse(
            answer=answer(request.question, chunks),
            sources=sorted({c["source"] for c in chunks}),
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
