import os
from dotenv import load_dotenv
from fastapi import FastAPI
from .ai_analyzer import azure_openai_analysis, local_analysis
from .models import AnalysisResponse, SecurityEvent
from .risk_engine import calculate_risk, map_mitre

load_dotenv()

app = FastAPI(
    title="AI Cloud Security Engineer",
    version="1.0.0",
    description="Automated security analysis using Python, FastAPI, MITRE ATT&CK and optional Azure OpenAI.",
)

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/analyze", response_model=AnalysisResponse)
def analyze(event: SecurityEvent):
    score, severity, findings = calculate_risk(event)
    techniques = map_mitre(event)
    if os.getenv("AI_PROVIDER", "local").lower() == "azure_openai":
        summary, actions = azure_openai_analysis(event, severity, findings, techniques)
    else:
        summary, actions = local_analysis(event, severity, findings)
    return AnalysisResponse(
        event_id=event.event_id,
        risk_score=score,
        severity=severity,
        findings=findings,
        mitre_attack=techniques,
        analyst_summary=summary,
        recommended_actions=actions,
    )
