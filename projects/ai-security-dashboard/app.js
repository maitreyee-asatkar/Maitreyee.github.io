const incidents=[{severity:"critical",title:"Impossible-travel sign-in",detail:"Identity • 2 min ago",risk:94},{severity:"critical",title:"Suspicious PowerShell execution",detail:"Endpoint • 7 min ago",risk:91},{severity:"high",title:"Multiple MFA failures",detail:"Identity • 12 min ago",risk:78},{severity:"high",title:"Unusual outbound connection",detail:"Network • 19 min ago",risk:74},{severity:"medium",title:"Legacy authentication attempt",detail:"Identity • 27 min ago",risk:58},{severity:"medium",title:"Large file transfer",detail:"Data • 41 min ago",risk:51}];
const incidentList=document.getElementById("incidentList"),filter=document.getElementById("severityFilter"),activeAlerts=document.getElementById("activeAlerts"),criticalCount=document.getElementById("criticalCount"),riskScore=document.getElementById("riskScore"),summaryScore=document.getElementById("summaryScore"),summaryTitle=document.getElementById("summaryTitle"),summaryText=document.getElementById("summaryText"),lastRefresh=document.getElementById("lastRefresh");
function renderIncidents(){const selected=filter.value,visible=selected==="all"?incidents:incidents.filter(i=>i.severity===selected);incidentList.innerHTML=visible.map((i,index)=>`<button class="incident incident-button" data-index="${incidents.indexOf(i)}"><div class="severity ${i.severity}"></div><div><h3>${i.title}</h3><p>${i.detail}</p></div><div><span class="badge">${i.severity}</span><p>Risk ${i.risk}</p></div><span class="incident-open">Investigate →</span></button>`).join("");document.querySelectorAll(".incident-button").forEach(btn=>btn.addEventListener("click",()=>openInvestigation(Number(btn.dataset.index))))}


const investigationOverlay=document.getElementById("investigationOverlay");
const investigationDrawer=document.getElementById("investigationDrawer");
const investigationTitle=document.getElementById("investigationTitle");
const investigationSeverity=document.getElementById("investigationSeverity");
const investigationId=document.getElementById("investigationId");
const investigationSource=document.getElementById("investigationSource");
const investigationRisk=document.getElementById("investigationRisk");
const investigationConfidence=document.getElementById("investigationConfidence");
const investigationTimeline=document.getElementById("investigationTimeline");
const investigationClassification=document.getElementById("investigationClassification");
const investigationReason=document.getElementById("investigationReason");
const investigationActions=document.getElementById("investigationActions");

const investigationData={
  "Impossible-travel sign-in":{
    source:"Identity telemetry",confidence:"91%",classification:"Potential account compromise",
    reason:"A successful authentication followed activity from geographically distant locations in an unusually short time window.",
    timeline:["18:41 — Sign-in from New York","18:42 — Sign-in from London","18:43 — Impossible-travel detection triggered","18:44 — Risk score raised to 94","18:45 — Analyst investigation recommended"],
    actions:["Validate the user's travel and device history","Review Entra sign-in and Conditional Access results","Revoke suspicious sessions if compromise is confirmed","Require MFA reauthentication and monitor the identity"]
  },
  "Suspicious PowerShell execution":{
    source:"Endpoint telemetry",confidence:"88%",classification:"Potential malicious script execution",
    reason:"PowerShell activity was correlated with an unusual process chain and elevated endpoint risk.",
    timeline:["18:36 — PowerShell process started","18:37 — Unusual parent-child process chain detected","18:39 — Command-line telemetry collected","18:41 — Endpoint risk increased to 91","18:43 — Investigation queued"],
    actions:["Inspect the process tree and command line","Check for encoded or downloaded commands","Review Defender endpoint telemetry","Isolate the endpoint only after analyst validation"]
  },
  "Multiple MFA failures":{
    source:"Identity telemetry",confidence:"84%",classification:"Possible credential attack",
    reason:"Repeated MFA failures may indicate password spraying, MFA fatigue, or a legitimate user struggling to authenticate.",
    timeline:["18:31 — First MFA failure","18:33 — Repeated authentication attempts","18:35 — Conditional Access evaluated","18:37 — Identity risk increased","18:40 — Pattern correlated"],
    actions:["Review source IPs and affected accounts","Check for password-spray patterns","Validate device and sign-in context","Require credential reset when compromise evidence supports it"]
  }
};

function openInvestigation(index){
  const incident=incidents[index];
  if(!incident)return;
  const data=investigationData[incident.title]||{
    source:incident.detail.split(" • ")[0]+" telemetry",confidence:"79%",classification:"Suspicious activity requires review",
    reason:"The detection is elevated based on the demo risk model. Validate the underlying evidence before taking containment action.",
    timeline:["18:20 — Telemetry event observed","18:22 — Detection rule triggered","18:24 — Risk score calculated","18:26 — Related events correlated","18:28 — Analyst review recommended"],
    actions:["Validate the alert evidence and affected asset","Correlate related identity, endpoint, and network events","Contain confirmed malicious activity","Document findings and remediation"]
  };
  investigationTitle.textContent=incident.title;
  investigationSeverity.textContent=incident.severity;
  investigationSeverity.className="badge "+incident.severity;
  investigationId.textContent="INC-"+(1042+index);
  investigationSource.textContent=data.source;
  investigationRisk.textContent=incident.risk;
  investigationConfidence.textContent=data.confidence;
  investigationClassification.textContent=data.classification;
  investigationReason.textContent=data.reason;
  investigationTimeline.innerHTML=data.timeline.map((x,i)=>`<div class="timeline-item"><span>${i+1}</span><p>${x}</p></div>`).join("");
  investigationActions.innerHTML=data.actions.map(x=>`<label class="action-item"><input type="checkbox"><span>${x}</span></label>`).join("");
  investigationOverlay.hidden=false;
  investigationDrawer.hidden=false;
  document.body.classList.add("drawer-open");
}
function closeInvestigation(){investigationDrawer.hidden=true;investigationOverlay.hidden=true;document.body.classList.remove("drawer-open")}
document.getElementById("investigationClose").addEventListener("click",closeInvestigation);
investigationOverlay.addEventListener("click",closeInvestigation);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!investigationDrawer.hidden)closeInvestigation()});
document.getElementById("investigateBtn").addEventListener("click",e=>{e.currentTarget.textContent="✓ Investigation active"});
document.getElementById("containBtn").addEventListener("click",()=>{alert("Demo checklist opened. Validate evidence before taking production containment actions.")});
function refreshTelemetry(){const alertCount=24+Math.floor(Math.random()*8),critical=3+Math.floor(Math.random()*3),score=66+Math.floor(Math.random()*15);activeAlerts.textContent=alertCount;criticalCount.textContent=critical;riskScore.innerHTML=`${score}<span>/100</span>`;summaryScore.textContent=score;lastRefresh.textContent=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}
document.getElementById("refreshBtn").addEventListener("click",refreshTelemetry);filter.addEventListener("change",renderIncidents);
document.getElementById("analyzeBtn").addEventListener("click",()=>{const top=incidents[0];summaryScore.textContent=top.risk;summaryTitle.textContent="High-confidence identity attack pattern";summaryText.textContent="The demo correlation engine connected geographic anomaly, authentication failures, and endpoint activity. An analyst should validate the identity and affected device before containment."});
document.getElementById("themeToggle").addEventListener("click",()=>document.body.classList.toggle("light"));

const bot=document.getElementById("riskBot"),botMessages=document.getElementById("riskBotMessages"),botInput=document.getElementById("riskBotInput");
document.getElementById("riskBotToggle").addEventListener("click",()=>{bot.hidden=false;botInput.focus()});
document.getElementById("riskBotClose").addEventListener("click",()=>bot.hidden=true);
const mitigationRules=[
{keys:["impossible","travel"],answer:"Mitigation: validate the sign-in location and device, review recent authentication history, revoke suspicious sessions if compromise is suspected, require MFA reauthentication, and investigate the source IP. In production, correlate Entra ID sign-in risk with Sentinel incidents before containment."},
{keys:["mfa","failure"],answer:"Mitigation: review the affected identity and device, look for password-spray patterns, verify Conditional Access and MFA results, temporarily increase monitoring, and consider blocking suspicious IPs or requiring a credential reset when evidence supports compromise."},
{keys:["powershell","script"],answer:"Mitigation: inspect the process tree and command line, identify the initiating user/device, check for encoded or downloaded commands, isolate the endpoint if malicious activity is confirmed, and review Defender telemetry for persistence or lateral movement."},
{keys:["risk score","high risk","risk"],answer:"Mitigation: prioritize critical incidents first, identify which identities/endpoints/networks drive the score, validate the underlying detections, contain confirmed threats, and document remediation. A score alone should not trigger destructive actions."},
{keys:["outbound","connection","network"],answer:"Mitigation: identify the destination, process, user, and volume; compare the destination against approved services and threat intelligence; restrict confirmed malicious destinations; and investigate the originating endpoint for compromise."},
{keys:["legacy","authentication"],answer:"Mitigation: identify applications still using legacy authentication, migrate them to modern authentication, apply Conditional Access controls, and monitor for repeated legacy-auth attempts during the transition."}
];
function botReply(q){const text=q.toLowerCase();const rule=mitigationRules.find(r=>r.keys.every(k=>text.includes(k)))||mitigationRules.find(r=>r.keys.some(k=>text.includes(k)));return rule?rule.answer:"Start with the alert context: affected identity/device, time, source IP, destination, process, and related events. Then validate the detection, contain confirmed threats, remediate the root cause, and document the evidence. This demo assistant provides guidance only; production actions should be validated by an analyst."}
function addMessage(text,type){const el=document.createElement("div");el.className=type==="user"?"user-message":"bot-message";el.textContent=text;botMessages.appendChild(el);botMessages.scrollTop=botMessages.scrollHeight}
function askBot(q){if(!q.trim())return;addMessage(q,"user");setTimeout(()=>addMessage(botReply(q),"bot"),250);botInput.value=""}
document.getElementById("riskBotForm").addEventListener("submit",e=>{e.preventDefault();askBot(botInput.value)});
document.querySelectorAll(".riskbot-suggestions button").forEach(b=>b.addEventListener("click",()=>askBot(b.dataset.prompt)));
renderIncidents();