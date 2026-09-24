# SentinelRAG — AI Security Knowledge Assistant

SentinelRAG is a portfolio project demonstrating Retrieval-Augmented Generation (RAG) for cybersecurity and compliance knowledge.

## Architecture

User → FastAPI → Azure AI Search (hybrid retrieval) → Azure OpenAI Responses API → grounded answer + sources

## Azure services

- Azure OpenAI — LLM inference and embeddings
- Azure AI Search — keyword + vector/hybrid retrieval
- Microsoft Entra ID — recommended passwordless authentication

## Features

- Markdown/text document ingestion
- Chunking with source metadata
- Embedding generation
- Azure AI Search vector index
- Hybrid retrieval
- Grounded LLM responses
- Source-aware API responses
- Prompt-injection guardrails
- FastAPI REST API
- Docker support

## Run locally

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
az login
python -m app.ingest
uvicorn app.main:app --reload --port 8000
```

Then open `http://localhost:8000/docs`.

## Example

```bash
curl -X POST http://localhost:8000/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"What should an employee do after a suspected phishing incident?"}'
```

## Security design

The system instructs the model to use only retrieved evidence, refuse unsupported answers, and treat retrieved documents as untrusted data. This demonstrates basic defenses against unsupported generation and prompt injection.

## Next extensions

- Microsoft Sentinel incident ingestion
- Microsoft Defender for Endpoint telemetry
- Entra ID authentication
- Document-level access controls
- RAG evaluation and groundedness metrics
- Application Insights telemetry
- GitHub Actions CI/CD
- Azure Container Apps deployment

## Resume

**AI-Powered Security Knowledge Assistant | Azure OpenAI, Azure AI Search, Python, RAG, FastAPI, Docker**

- Built a RAG application using Azure OpenAI and Azure AI Search to provide grounded responses from cybersecurity and compliance documentation.
- Implemented document chunking, embeddings, vector/hybrid retrieval, prompt guardrails, and source-aware responses.
- Exposed the solution through FastAPI and containerized it with Docker for repeatable deployment.
