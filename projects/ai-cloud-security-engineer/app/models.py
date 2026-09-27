from pydantic import BaseModel, Field
from typing import List, Optional

class SecurityEvent(BaseModel):
    event_id: str
    timestamp: str
    user: str
    source_ip: str
    source_country: str
    destination_country: Optional[str] = None
    failed_logins: int = Field(ge=0)
    successful_login: bool
    new_device: bool
    mfa_result: str
    privileged_account: bool = False
    impossible_travel: bool = False
    suspicious_ip: bool = False
    resource: str

class RiskFinding(BaseModel):
    rule: str
    points: int
    evidence: str

class AnalysisResponse(BaseModel):
    event_id: str
    risk_score: int
    severity: str
    findings: List[RiskFinding]
    mitre_attack: List[str]
    analyst_summary: str
    recommended_actions: List[str]
