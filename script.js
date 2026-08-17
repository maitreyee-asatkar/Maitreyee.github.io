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

// Browser-based SSH-style launcher. This is a simulated portfolio experience, not a real SSH service.
(function(){
  const heroActions=document.querySelector('.hero-actions');
  if(!heroActions || document.getElementById('sshLauncher')) return;
  const sshBtn=document.createElement('button');
  sshBtn.id='sshLauncher';
  sshBtn.className='btn secondary';
  sshBtn.type='button';
  sshBtn.textContent='$ ssh maitreyee@securitylab';
  heroActions.appendChild(sshBtn);

  const style=document.createElement('style');
  style.textContent=`#sshLauncher{font-family:'JetBrains Mono',monospace;font-size:11px}#sshOverlay{position:fixed;inset:0;z-index:9999;display:none;place-items:center;background:rgba(5,2,10,.78);backdrop-filter:blur(10px);padding:20px}#sshOverlay.show{display:grid}#sshWindow{width:min(920px,96vw);border:1px solid #7c3aed;border-radius:14px;background:#08040e;box-shadow:0 0 80px rgba(124,58,237,.28);overflow:hidden}#sshTop{display:flex;align-items:center;gap:9px;padding:12px 15px;background:#13091d;border-bottom:1px solid #3b1d60;color:#c4b5fd;font:11px 'JetBrains Mono',monospace}#sshTop .ssh-dot{width:8px;height:8px;border-radius:50%;background:#86efac;box-shadow:0 0 8px #86efac}#sshClose{margin-left:auto;background:transparent;border:1px solid #4c1d78;color:#c4b5fd;border-radius:6px;padding:5px 8px;cursor:pointer}#sshBody{padding:22px;font:13px/1.7 'JetBrains Mono',monospace;color:#e9ddff}#sshOutput{min-height:300px;max-height:56vh;overflow:auto;white-space:pre-wrap;margin-bottom:12px}#sshForm{display:flex;align-items:center;gap:8px}#sshPrompt{color:#a78bfa;white-space:nowrap}#sshInput{flex:1;background:transparent;border:0;outline:0;color:#fff;font:13px 'JetBrains Mono',monospace}#sshHint{color:#7f6d8c;font-size:10px;margin-top:10px}#sshOutput .ssh-ok{color:#86efac}#sshOutput .ssh-purple{color:#c4b5fd}#sshOutput .ssh-warn{color:#fbbf24}`;
  document.head.appendChild(style);

  const overlay=document.createElement('div');
  overlay.id='sshOverlay';
  overlay.innerHTML=`<div id="sshWindow" role="dialog" aria-modal="true" aria-label="Security lab SSH terminal"><div id="sshTop"><span class="ssh-dot"></span><strong>ssh maitreyee@securitylab</strong><span style="margin-left:8px;color:#86efac">CONNECTED</span><button id="sshClose" type="button">ESC</button></div><div id="sshBody"><div id="sshOutput"></div><form id="sshForm"><span id="sshPrompt">maitreyee@securitylab:~$</span><input id="sshInput" autocomplete="off" spellcheck="false" aria-label="SSH command input"></form><div id="sshHint">Try: help · whoami · status · alerts · labs · network · skills · resume · console · clear · exit</div></div></div>`;
  document.body.appendChild(overlay);

  const out=document.getElementById('sshOutput');
  const input=document.getElementById('sshInput');
  const closeBtn=document.getElementById('sshClose');
  const prompt='maitreyee@securitylab:~$';
  const write=(text,cls='')=>{const div=document.createElement('div');if(cls)div.className=cls;div.textContent=text;out.appendChild(div);out.scrollTop=out.scrollHeight};
  const welcome=()=>{
    out.innerHTML='';
    write('$ ssh maitreyee@securitylab','ssh-purple');
    write('Connecting to maitreyee-securitylab...');
    write('Connection established.','ssh-ok');
    write('');
    write('Maitreyee Asatkar','ssh-purple');
    write('Cybersecurity Engineer | SOC Analyst | Security Support Analyst');
    write('');
    write('Type "help" to explore the security lab.');
    write('');
  };
  const commands={
    help:()=>[
      'Available commands:',
      '  whoami       analyst profile',
      '  status       security posture',
      '  alerts       current lab alerts',
      '  investigate  show sample investigation workflow',
      '  labs         hands-on lab inventory',
      '  network      security architecture',
      '  skills       technical skill domains',
      '  resume       open resume',
      '  console      open SOC command center',
      '  clear        clear terminal',
      '  exit         close session'
    ],
    whoami:()=>['Maitreyee Asatkar','Focus: SOC Analysis · Security Engineering · Network Security · IAM'],
    status:()=>['[OK] Identity controls','[OK] SIEM / telemetry labs','[OK] Network security labs','[OK] Vulnerability assessment labs','[OK] NIST / CMMC compliance experience','[INFO] This is a defensive portfolio simulation — no live production telemetry.'],
    alerts:()=>['[HIGH]   AL-0017  Suricata IDS event validation','[MEDIUM] AL-0016  Syslog ingestion check','[MEDIUM] AL-0015  Zeek network telemetry review','[LOW]    AL-0014  Forbidden-page web event','[MEDIUM] AL-0013  DMZ connectivity validation','[LOW]    AL-0012  Vulnerability scan observation'],
    investigate:()=>['AL-0017 — Suricata IDS event validation','1. Validate event source','2. Inspect alert context','3. Search indexed telemetry in Splunk','4. Determine whether deeper analysis is required'],
    labs:()=>['12 hands-on labs','pfSense · Splunk · Nmap · OpenVAS/GSM · Linux Routing · Syslog · Suricata · Zeek · Nginx · network testing'],
    network:()=>['USER / DEVICE → ENTRA ID → FIREWALL / VPN → CLOUD / APPS','Telemetry: Splunk · Suricata · Zeek · Syslog','Controls: MFA · RBAC · Segmentation · NAT/PAT · VPN'],
    skills:()=>['Security Operations: SIEM · IDS · vulnerability assessment','Identity: Entra ID · MFA · RBAC · Conditional Access','Network: TCP/IP · VLAN · VPN · NAT/PAT · Firewalls','Cloud: Azure · AWS · Microsoft 365 · Intune'],
    resume:()=>{window.location.href='resume.html';return ['Opening resume...'];},
    console:()=>{window.location.href='terminal.html';return ['Opening Security Operations Console...'];},
    clear:()=>{out.innerHTML='';return [];},
    exit:()=>{overlay.classList.remove('show');return []}
  };
  const run=(raw)=>{
    const cmd=raw.trim().toLowerCase();
    write(`${prompt} ${raw}`,'ssh-purple');
    if(!cmd)return;
    if(commands[cmd]){
      const lines=commands[cmd]();
      if(Array.isArray(lines)) lines.forEach((line,i)=>write(line,i===0&&cmd!=='clear'?'ssh-ok':''));
    }else{
      write(`command not found: ${raw}. Type "help" for available commands.`,'ssh-warn');
    }
  };
  sshBtn.addEventListener('click',()=>{overlay.classList.add('show');welcome();setTimeout(()=>input.focus(),60)});
  closeBtn.addEventListener('click',()=>overlay.classList.remove('show'));
  overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.classList.remove('show')});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('show'))overlay.classList.remove('show')});
  document.getElementById('sshForm').addEventListener('submit',e=>{e.preventDefault();run(input.value);input.value='';});
})();
