const button=document.getElementById('themeToggle');const body=document.body;const saved=localStorage.getItem('ma-theme');if(saved==='dark'){body.classList.add('dark');if(button)button.textContent='☀'}button?.addEventListener('click',()=>{body.classList.toggle('dark');const dark=body.classList.contains('dark');button.textContent=dark?'☀':'☾';localStorage.setItem('ma-theme',dark?'dark':'light')});

const labs=document.getElementById('labs');
if(labs){
  const section=document.createElement('section');
  section.className='section case-studies';
  section.id='case-studies';
  section.innerHTML=`<div class="container">
    <div class="section-label">07 / SECURITY CASE STUDIES</div>
    <div class="case-head"><div><h2>From raw telemetry to a security conclusion.</h2></div><p>Selected lab evidence translated into recruiter-friendly security workflows — investigation, detection, network troubleshooting, and documented findings.</p></div>
    <div class="case-grid">
      <article class="case-card featured"><div class="case-kicker">SOC INVESTIGATION · SURICATA + SPLUNK</div><h3>IDS Alert Validation & Triage</h3><div class="flow"><span>Traffic</span><b>→</b><span>Suricata</span><b>→</b><span>Alert</span><b>→</b><span>Splunk</span></div><p><strong>Objective:</strong> Validate IDS events and make the alert searchable in the SIEM.</p><p><strong>Evidence:</strong> Suricata alerts were generated and then located in Splunk for investigation and review.</p><p><strong>Analyst workflow:</strong> Validate event source → inspect alert context → search indexed telemetry → determine whether follow-up analysis is required.</p><div class="case-tags"><span>IDS</span><span>SIEM</span><span>Suricata</span><span>Splunk</span></div></article>
      <article class="case-card"><div class="case-kicker">NETWORK SECURITY · PFSENSE</div><h3>DMZ & Firewall Connectivity</h3><p><strong>Objective:</strong> Build and validate a segmented DMZ/client environment.</p><p><strong>Workflow:</strong> Configure pfSense interfaces → validate client connectivity → inspect traffic → confirm logging visibility.</p><div class="case-tags"><span>pfSense</span><span>DMZ</span><span>Firewall</span><span>Packet Analysis</span></div></article>
      <article class="case-card"><div class="case-kicker">NETWORK TELEMETRY · ZEEK</div><h3>Network Visibility in Splunk</h3><p><strong>Objective:</strong> Turn Zeek network telemetry into searchable security data.</p><p><strong>Workflow:</strong> Collect Zeek events → index in Splunk → search connection data → review network activity.</p><div class="case-tags"><span>Zeek</span><span>Network Telemetry</span><span>Splunk</span></div></article>
    </div>
  </div>`;
  labs.insertAdjacentElement('afterend',section);
}

const caseSection=document.getElementById('case-studies');
if(caseSection){
  const detect=document.createElement('section');
  detect.className='section dark detection-section';
  detect.id='detections';
  detect.innerHTML=`<div class="container"><div class="section-label">08 / DETECTION ENGINEERING</div><div class="detection-head"><h2>Security signals I know how to collect, search, and validate.</h2><p>Examples grounded in the hands-on lab work documented in the portfolio.</p></div><div class="detection-grid"><div class="detect"><span class="severity high">HIGH</span><h3>Suricata IDS Events</h3><p>Generate and validate IDS alerts, then use Splunk to search the resulting security telemetry.</p><code>source = suricata<br>platform = splunk<br>focus = alert validation</code></div><div class="detect"><span class="severity medium">MEDIUM</span><h3>Syslog Monitoring</h3><p>Ingest system logs into Splunk and verify that events are indexed and searchable for operational analysis.</p><code>source = syslog<br>index = security telemetry<br>focus = log search</code></div><div class="detect"><span class="severity medium">MEDIUM</span><h3>Zeek Network Telemetry</h3><p>Search Zeek-derived network records in Splunk to examine hosts, connections, and network activity.</p><code>source = zeek<br>index = zeek<br>focus = network visibility</code></div></div></div>`;
  caseSection.insertAdjacentElement('afterend',detect);
}
