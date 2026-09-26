# AI Security Operations Dashboard

A portfolio project demonstrating an AI-assisted Security Operations Center (SOC) dashboard.

## What it demonstrates

- Security alert prioritization
- Risk scoring
- Identity, endpoint, network, cloud, and data telemetry concepts
- Explainable analyst recommendations
- Responsive dashboard UI
- GitHub + Azure Static Web Apps deployment
- Architecture designed for future Microsoft Sentinel / Defender / Azure Functions integration

## Current implementation

The public demo uses deterministic/sample telemetry. It does **not** connect to production security systems, ingest real customer data, or require an AI API key.

This keeps the portfolio demo safe to publish and inexpensive to operate.

## Future cloud architecture

```
Security telemetry
       |
       v
Normalization / enrichment
       |
       v
Risk scoring + correlation
       |
       v
AI-assisted incident summary
       |
       v
SOC dashboard
```

A future version can connect approved telemetry sources through an Azure Function/API and an appropriate AI service. Any paid service should be enabled only after confirming available student credits/free-tier coverage.

## Technologies

- HTML5
- CSS3
- JavaScript
- GitHub
- Azure Static Web Apps

## Portfolio note

This project is intended to demonstrate security engineering, cloud deployment, automation, and AI-assisted SOC concepts using non-production demo data.
