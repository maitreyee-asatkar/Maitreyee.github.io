# SentinelRAG — AI Security Knowledge Assistant

Azure OpenAI + Azure AI Search + RAG + FastAPI + Docker.

SentinelRAG is a portfolio project demonstrating how Retrieval-Augmented Generation can help security teams query cybersecurity and compliance documentation while keeping answers grounded in retrieved evidence.

## Architecture

Browser → FastAPI → Azure AI Search hybrid/vector retrieval → Azure OpenAI Responses API → grounded answer + sources.

## Security engineering

- Evidence-grounded generation
- Source-aware responses
- Prompt-injection guardrails
- Azure identity authentication pattern
- No production secrets committed
- Deterministic evaluation check
- Dockerized deployment
- GitHub Actions CI validation

## Run

Copy .env.example to .env, authenticate with Azure CLI, index the sample documents, then run the FastAPI service.

API documentation is available at /docs.

## Portfolio extensions

Planned integrations include Microsoft Sentinel incidents, Microsoft Defender for Endpoint telemetry, Entra ID authentication, Application Insights tracing, document-level authorization, RAG quality metrics, and Azure Container Apps.

## Resume-ready

AI-Powered Security Knowledge Assistant | Azure OpenAI, Azure AI Search, Python, RAG, FastAPI, Docker

Built a RAG application using Azure OpenAI and Azure AI Search to provide grounded responses from cybersecurity and compliance documentation. Implemented document chunking, embeddings, hybrid retrieval, prompt guardrails, source-aware responses, evaluation checks, and a browser-based interface. Containerized the application with Docker and added GitHub Actions CI validation.
