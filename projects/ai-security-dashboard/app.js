const incidents = [
  { severity: "critical", title: "Impossible-travel sign-in", detail: "Identity • 2 min ago", risk: 94 },
  { severity: "critical", title: "Suspicious PowerShell execution", detail: "Endpoint • 7 min ago", risk: 91 },
  { severity: "high", title: "Multiple MFA failures", detail: "Identity • 12 min ago", risk: 78 },
  { severity: "high", title: "Unusual outbound connection", detail: "Network • 19 min ago", risk: 74 },
  { severity: "medium", title: "Legacy authentication attempt", detail: "Identity • 27 min ago", risk: 58 },
  { severity: "medium", title: "Large file transfer", detail: "Data • 41 min ago", risk: 51 }
];

const incidentList = document.getElementById("incidentList");
const filter = document.getElementById("severityFilter");
const activeAlerts = document.getElementById("activeAlerts");
const criticalCount = document.getElementById("criticalCount");
const riskScore = document.getElementById("riskScore");
const summaryScore = document.getElementById("summaryScore");
const summaryTitle = document.getElementById("summaryTitle");
const summaryText = document.getElementById("summaryText");
const lastRefresh = document.getElementById("lastRefresh");

function renderIncidents() {
  const selected = filter.value;
  const visible = selected === "all" ? incidents : incidents.filter(i => i.severity === selected);
  incidentList.innerHTML = visible.map(i => `
    <div class="incident">
      <div class="severity ${i.severity}"></div>
      <div>
        <h3>${i.title}</h3>
        <p>${i.detail}</p>
      </div>
      <div>
        <span class="badge">${i.severity}</span>
        <p>Risk ${i.risk}</p>
      </div>
    </div>
  `).join("");
}

function refreshTelemetry() {
  const alertCount = 24 + Math.floor(Math.random() * 8);
  const critical = 3 + Math.floor(Math.random() * 3);
  const score = 66 + Math.floor(Math.random() * 15);
  activeAlerts.textContent = alertCount;
  criticalCount.textContent = critical;
  riskScore.innerHTML = `${score}<span>/100</span>`;
  summaryScore.textContent = score;
  lastRefresh.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

document.getElementById("refreshBtn").addEventListener("click", refreshTelemetry);
filter.addEventListener("change", renderIncidents);

document.getElementById("analyzeBtn").addEventListener("click", () => {
  const top = incidents[0];
  summaryScore.textContent = top.risk;
  summaryTitle.textContent = "High-confidence identity attack pattern";
  summaryText.textContent =
    "The demo correlation engine connected geographic anomaly, authentication failures, and endpoint activity. " +
    "An analyst should validate the identity and affected device before containment.";
});

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
});

renderIncidents();