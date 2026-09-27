from app.models import SecurityEvent
from app.risk_engine import calculate_risk, map_mitre

def make_event(**overrides):
    base = {
        "event_id": "TEST-1", "timestamp": "2026-09-27T00:00:00Z",
        "user": "test.user", "source_ip": "192.0.2.10", "source_country": "US",
        "failed_logins": 0, "successful_login": False, "new_device": False,
        "mfa_result": "success", "privileged_account": False,
        "impossible_travel": False, "suspicious_ip": False, "resource": "Entra ID",
    }
    base.update(overrides)
    return SecurityEvent(**base)

def test_high_risk_event():
    e = make_event(failed_logins=17, successful_login=True, new_device=True,
                   privileged_account=True, impossible_travel=True, suspicious_ip=True)
    score, severity, findings = calculate_risk(e)
    assert score == 100
    assert severity == "HIGH"
    assert len(findings) >= 5

def test_mitre_mapping():
    techniques = map_mitre(make_event(failed_logins=8, successful_login=True, new_device=True))
    assert any("T1110" in item for item in techniques)
    assert any("T1078" in item for item in techniques)
