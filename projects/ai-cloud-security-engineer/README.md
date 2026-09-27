# AI Cloud Security Engineer — Automated Security Analysis Platform

A portfolio-grade Python application that ingests security events, performs deterministic risk scoring, maps suspicious behavior to MITRE ATT&CK, and optionally uses Azure OpenAI to generate an evidence-grounded analyst explanation and remediation plan.

## Stack
- Python 3.12
- FastAPI + Pydantic
- Azure OpenAI (optional)
- MITRE ATT&CK mapping
- Docker
- GitHub Actions
- Pytest

## Run locally
```bash
python -m venv .venv
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open http://127.0.0.1:8000/docs.

The default `AI_PROVIDER=local` mode requires no API keys.

## Test
```bash
pytest -q
```

## Demo
POST `data/suspicious_login.json` to `/analyze`.

## Azure OpenAI
Copy `.env.example` to `.env`, configure the Azure OpenAI values, and set `AI_PROVIDER=azure_openai`.

Never commit `.env` or credentials.

## Architecture
Security telemetry → FastAPI → validation → deterministic risk engine → MITRE ATT&CK mapping → AI analyst → structured incident report.

Production target: Azure Container Apps + Azure OpenAI + Key Vault + Entra ID + Application Insights + GitHub Actions.

## Resume bullet
Built a Python/FastAPI cloud-security analysis platform that ingests authentication telemetry, performs deterministic risk scoring and MITRE ATT&CK mapping, and uses Azure OpenAI to generate evidence-grounded analyst explanations and remediation guidance; containerized the service and added automated CI testing.
