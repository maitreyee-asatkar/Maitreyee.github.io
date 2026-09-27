import json
import os
from typing import List
from .models import SecurityEvent, RiskFinding

def local_analysis(event: SecurityEvent, severity: str, findings: List[RiskFinding]):
    evidence = "; ".join(f.evidence for f in findings) or "No high-confidence indicators were detected."
    actions = [
        "Review the user's recent sign-in history and device registrations.",
        "Validate whether the login was expected with the user or service owner.",
        "Review authentication and endpoint telemetry for related activity.",
    ]
    if severity == "HIGH":
        actions.insert(0, "Temporarily contain the account or session if the activity is confirmed malicious.")
    if event.privileged_account:
        actions.insert(0, "Prioritize review because the affected identity is privileged.")
    return f"Security analysis classified this event as {severity}. Evidence: {evidence}", actions

def azure_openai_analysis(event, severity, findings, techniques):
    from openai import AzureOpenAI
    client = AzureOpenAI(
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
        azure_endpoint=os.environ["AZURE_OPENAI_ENDPOINT"],
        api_version=os.getenv("AZURE_OPENAI_API_VERSION", "2024-10-21"),
    )
    prompt = f"""You are a careful SOC analyst.
Analyze this security event using ONLY the supplied evidence. Do not invent facts.
Return JSON with summary (string) and actions (array of strings).
Severity: {severity}
MITRE ATT&CK: {techniques}
Event: {event.model_dump()}
Findings: {[f.model_dump() for f in findings]}
"""
    response = client.chat.completions.create(
        model=os.environ["AZURE_OPENAI_DEPLOYMENT"],
        temperature=0.1,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": "You are a careful cloud security analyst."},
            {"role": "user", "content": prompt},
        ],
    )
    data = json.loads(response.choices[0].message.content)
    return data["summary"], data["actions"]
