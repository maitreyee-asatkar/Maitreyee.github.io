from .models import SecurityEvent, RiskFinding

def calculate_risk(event: SecurityEvent):
    score = 0
    findings = []
    rules = [
        (event.failed_logins >= 10, "Repeated authentication failures", 25, f"{event.failed_logins} failed logins were observed."),
        (event.successful_login and event.failed_logins >= 5, "Successful login after repeated failures", 20, "A successful authentication followed multiple failures."),
        (event.new_device, "New device", 15, "The authentication originated from a previously unseen device."),
        (event.impossible_travel, "Impossible travel", 25, "Authentication geography is inconsistent with prior activity."),
        (event.suspicious_ip, "Suspicious source IP", 20, "The source IP is marked suspicious in the test dataset."),
        (event.privileged_account, "Privileged account", 10, "The affected identity has elevated privileges."),
    ]
    for matched, rule, points, evidence in rules:
        if matched:
            findings.append(RiskFinding(rule=rule, points=points, evidence=evidence))
            score += points
    score = min(score, 100)
    severity = "HIGH" if score >= 70 else "MEDIUM" if score >= 40 else "LOW"
    return score, severity, findings

def map_mitre(event: SecurityEvent):
    techniques = []
    if event.failed_logins >= 5:
        techniques.append("T1110 — Brute Force")
    if event.successful_login:
        techniques.append("T1078 — Valid Accounts")
    if event.new_device or event.impossible_travel:
        techniques.append("T1078.004 — Cloud Accounts")
    return techniques
