# AI Security Operations Center

An Azure-hosted portfolio project demonstrating an interactive, AI-assisted Security Operations Center (SOC) experience using safe simulated telemetry.

## Live capabilities

- Prioritized security incident queue and severity filtering
- Interactive incident investigation workspace
- Event timelines, risk scoring, and confidence indicators
- Explainable AI-style threat correlation
- Analyst mitigation checklists
- MITRE ATT&CK technique mapping
- Safe purple-team attack simulator
- Identity, endpoint, network, cloud, and data telemetry concepts
- Risk Mitigation AI demo assistant
- Responsive dark SOC interface
- GitHub Actions CI/CD to Azure App Service

## Attack simulation scenarios

The lab can simulate credential attacks, impossible travel, suspicious PowerShell activity, data exfiltration signals, and MFA fatigue. These scenarios generate UI-only demo telemetry. They do not execute attacks, scan systems, or connect to production infrastructure.

## Architecture

```
GitHub
  |
  v
GitHub Actions
  |
  v
Azure App Service (F1)
  |
  v
AI Security Operations Center
  |
  +--> Incident Investigation
  +--> Risk Correlation
  +--> MITRE ATT&CK Mapping
  +--> Attack Simulator
  +--> Risk Mitigation Assistant
```

### Production integration roadmap

A production implementation could connect approved sources such as Microsoft Sentinel, Microsoft Defender, Microsoft Entra ID, Azure Functions, and an approved AI service. Those connectors are shown as an architecture roadmap and are **not active integrations in this public demo**.

## Current implementation

The public project uses deterministic/sample telemetry and client-side analysis. It does **not** ingest real customer data, require an AI API key, or execute production containment actions.

This keeps the portfolio demo safe to publish and inexpensive to operate.

## Technologies

- HTML5
- CSS3
- JavaScript
- Node.js
- GitHub
- GitHub Actions
- Azure App Service

## Portfolio talking point

> Built and deployed an Azure-hosted AI-assisted SOC platform featuring incident investigation, explainable risk correlation, MITRE ATT&CK mapping, safe attack simulation, analyst mitigation workflows, and automated GitHub Actions CI/CD.

## Disclaimer

This project is a portfolio demonstration using simulated security telemetry. AI-style outputs and mappings are illustrative and should be validated by a qualified analyst before any production security action.
