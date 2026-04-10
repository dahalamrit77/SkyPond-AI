import { useState, useEffect, useRef } from "react";

const C = {
  // Brand primaries
  bg:"#EEF4F8",        // light blue tint bg (from primary light blue)
  surface:"#FFFFFF",
  alt:"#E3EFF6",       // slightly deeper light blue for alt sections
  border:"#C9DFEA",    // primary light blue as border
  // Primary palette
  p:"#1C3053",         // dark navy — main brand color
  pd:"#141F38",        // darker navy for hover states
  p2:"#6ABDE9",        // sky blue — secondary primary
  // Subdued secondaries (used for service/accent colors)
  accent:"#60A4B1",    // subdued teal
  violet:"#B6CAEB",    // subdued periwinkle
  green:"#6BA769",     // subdued sage green
  amber:"#D3A217",     // subdued gold
  red:"#F58033",       // subdued orange (used where red/warning needed)
  // Text
  head:"#1C3053",      // dark navy for headings
  body:"#2D4066",      // mid-navy for body text
  muted:"#6B8BAF",     // muted blue-grey
  // Dark sections
  dark:"#1C3053",      // dark navy (replaces near-black)
  ms:"#0078D4",        // Microsoft blue (keep for MS Cloud page)
};

const Badge = ({ c=C.p, children }) => (
  <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"4px 13px",
    borderRadius:99, border:`1px solid ${c}28`, background:`${c}0B`, color:c,
    fontSize:11.5, letterSpacing:"0.07em", textTransform:"uppercase", fontWeight:700 }}>
    {children}
  </span>
);
const H = ({ size="h2", style={}, color, children }) => {
  const s = { hero:"clamp(2.4rem,5vw,4rem)", h2:"clamp(1.8rem,2.7vw,2.5rem)", h3:"1.2rem" };
  return <h2 style={{ fontSize:s[size], fontWeight:800, color:color||C.head,
    letterSpacing:"-0.026em", lineHeight:1.1, fontFamily:"'DM Sans',system-ui,sans-serif", ...style }}>{children}</h2>;
};
const P = ({ style={}, children }) => (
  <p style={{ fontSize:"clamp(0.96rem,1.1vw,1.04rem)", color:C.body, lineHeight:1.76, ...style }}>{children}</p>
);
function PBtn({ children, onClick, href, light }) {
  const Tag = href ? "a" : "button";
  const base = { display:"inline-flex", alignItems:"center", gap:8, padding:"12px 24px",
    borderRadius:10, fontWeight:700, fontSize:14.5, border:"none", cursor:"pointer",
    textDecoration:"none", fontFamily:"inherit", transition:"all 0.15s" };
  const v = light
    ? {...base, background:"#fff", color:C.ms, boxShadow:"0 2px 14px rgba(0,0,0,0.13)"}
    : {...base, background:`linear-gradient(135deg,${C.ms},#005A9E)`, color:"#fff", boxShadow:`0 4px 20px ${C.ms}45`};
  return <Tag href={href} onClick={onClick} style={v}
    onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=light?"0 8px 24px rgba(0,0,0,0.18)":`0 8px 28px ${C.ms}60`; }}
    onMouseLeave={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow=light?"0 2px 14px rgba(0,0,0,0.13)":`0 4px 20px ${C.ms}45`; }}>
    {children}
  </Tag>;
}
function Card({ children, style={}, ac=C.ms, hover=true }) {
  const [h, setH] = useState(false);
  return <div onMouseEnter={()=>hover&&setH(true)} onMouseLeave={()=>hover&&setH(false)}
    style={{ background:C.surface, border:`1.5px solid ${h?ac+"44":C.border}`, borderRadius:16,
      transition:"all 0.2s", transform:h&&hover?"translateY(-4px)":"none",
      boxShadow:h&&hover?`0 16px 40px ${ac}1A`:"0 2px 8px rgba(0,0,0,0.04)", ...style }}>{children}</div>;
}

/* ── Microsoft Cloud Stack Diagram ── */
function CloudDiagram() {
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold:0.2 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  const layers = [
    { label:"Microsoft 365", color:"#0078D4", items:["Teams","SharePoint","Exchange","OneDrive","Intune"] },
    { label:"Azure Cloud", color:"#0078D4", items:["Azure Active Directory","App Service","SQL Database","Azure Functions","Key Vault"] },
    { label:"Power Platform", color:"#742774", items:["Power BI","Power Automate","Power Apps","Dataverse","Power Pages"] },
    { label:"Security & Compliance", color:C.green, items:["HIPAA Controls","BAA","MFA / Conditional Access","DLP Policies","Audit Logs"] },
  ];

  return (
    <div ref={ref} style={{ background:C.dark, borderRadius:20, padding:"28px 26px",
      boxShadow:`0 24px 60px ${C.ms}28`, border:"1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
        <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.3)",
          textTransform:"uppercase", letterSpacing:"0.08em" }}>Microsoft Cloud for LTC Pharmacy</div>
        <div style={{ padding:"4px 10px", borderRadius:5, background:`${C.green}18`,
          border:`1px solid ${C.green}35`, fontSize:10.5, fontWeight:700, color:C.green }}>HIPAA Ready</div>
      </div>

      {layers.map((layer, i) => (
        <div key={i} style={{ marginBottom:i < layers.length-1 ? 16 : 0,
          opacity:on?1:0, transform:on?"none":"translateX(-10px)",
          transition:`opacity 0.5s ${i*0.1}s, transform 0.5s ${i*0.1}s` }}>
          <div style={{ fontSize:10.5, fontWeight:700, color:layer.color,
            textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>{layer.label}</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
            {layer.items.map((item, j) => (
              <span key={j} style={{ padding:"5px 11px", borderRadius:7, fontSize:12, fontWeight:600,
                background:`${layer.color}18`, border:`1px solid ${layer.color}35`,
                color:"rgba(255,255,255,0.72)" }}>{item}</span>
            ))}
          </div>
        </div>
      ))}

      <div style={{ marginTop:20, display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {[["Configured","For LTC pharmacy workflows"],["HIPAA BAA","Microsoft-signed"],["99.9%","Azure SLA uptime"],["Healthcare","Compliance built-in"]].map(([v,l]) => (
          <div key={l} style={{ padding:"11px 13px", borderRadius:9,
            background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ fontSize:13.5, fontWeight:900, color:C.ms, fontFamily:"'DM Sans',sans-serif" }}>{v}</div>
            <div style={{ fontSize:10.5, color:"rgba(255,255,255,0.35)", marginTop:3 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Navbar() {
  const [sc, setSc] = useState(false);
  useEffect(() => { const f=()=>setSc(window.scrollY>30); window.addEventListener("scroll",f); return()=>window.removeEventListener("scroll",f); }, []);
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, height:64, padding:"0 5vw",
      display:"flex", alignItems:"center", justifyContent:"space-between",
      background:sc?"rgba(246,247,253,0.95)":"transparent",
      backdropFilter:sc?"blur(18px)":"none",
      borderBottom:sc?`1px solid ${C.border}`:"none", transition:"all 0.3s" }}>
      <a href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
        <img src="/logosymbol.png" alt="SkypondTech" style={{ width:36, height:36, objectFit:"contain", mixBlendMode:"screen", filter:"brightness(1.1)" }} />
        <span style={{ color:C.head, fontWeight:800, fontSize:17, letterSpacing:"-0.02em", fontFamily:"'DM Sans',sans-serif" }}>
          SkypondTech<span style={{ color:C.p }}>.ai</span>
        </span>
      </a>
      <div style={{ display:"flex", gap:26 }}>
        {[["Services","/services"],["Products","/products"],["About","/#about"],["Contact","/#contact"]].map(([l,h])=>(
          <a key={l} href={h} style={{ color:C.body, fontSize:13.5, fontWeight:600, textDecoration:"none", transition:"color 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.color=C.ms}
            onMouseLeave={e=>e.currentTarget.style.color=C.body}>{l}</a>
        ))}
      </div>
      <PBtn href="/schedule">Schedule a Demo →</PBtn>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{ minHeight:"88vh", display:"flex", alignItems:"center",
      padding:"120px 5vw 80px", position:"relative", overflow:"hidden", background:C.dark }}>
      <div style={{ position:"absolute", inset:0,
        backgroundImage:`linear-gradient(${C.ms}08 1px,transparent 1px),linear-gradient(90deg,${C.ms}08 1px,transparent 1px)`,
        backgroundSize:"52px 52px", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:-180, right:-80, width:700, height:700, borderRadius:"50%",
        background:`radial-gradient(circle,${C.ms}22 0%,transparent 68%)`, pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-80, left:-60, width:480, height:480, borderRadius:"50%",
        background:`radial-gradient(circle,${C.p}30 0%,transparent 68%)`, pointerEvents:"none" }} />

      <div style={{ maxWidth:1100, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.05fr 1fr", gap:64, alignItems:"center" }}>
          <div>
            <div style={{ display:"flex", gap:10, marginBottom:20, animation:"fadeUp 0.6s ease both" }}>
              <Badge c={C.ms}>☁️ Service</Badge>
              <Badge c={C.muted}>Microsoft Cloud</Badge>
            </div>
            <H size="hero" color="#fff" style={{ marginBottom:22, animation:"fadeUp 0.6s 0.1s ease both" }}>
              Microsoft Cloud,{" "}
              <span style={{ background:`linear-gradient(90deg,${C.ms},${C.p2})`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                Configured for Healthcare
              </span>
            </H>
            <P style={{ maxWidth:520, color:"rgba(255,255,255,0.7)", marginBottom:32,
              fontSize:"1.08rem", animation:"fadeUp 0.6s 0.18s ease both" }}>
              Microsoft 365, Azure, and Power Platform properly deployed for LTC pharmacy — not a generic IT rollout. HIPAA compliance built in, LTC workflows considered, and a BAA in place before any PHI touches the cloud.
            </P>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", animation:"fadeUp 0.6s 0.25s ease both" }}>
              <PBtn href="/schedule">Schedule a Cloud Assessment →</PBtn>
              <a href="#services" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"12px 24px",
                borderRadius:10, background:"transparent", color:"rgba(255,255,255,0.8)", fontWeight:600, fontSize:14.5,
                border:"1.5px solid rgba(255,255,255,0.2)", textDecoration:"none", transition:"border-color 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.5)"}
                onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.2)"}>
                See What's Included ↓
              </a>
            </div>
            <div style={{ display:"flex", gap:0, marginTop:52,
              borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:30,
              animation:"fadeUp 0.6s 0.4s ease both" }}>
              {[["HIPAA BAA","Microsoft-signed"],["365 + Azure","Full stack"],["LTC-specific","Configuration"],["Power BI","Analytics included"]].map(([v,l],i,a) => (
                <div key={i} style={{ flex:1, paddingRight:16,
                  borderRight:i<a.length-1?"1px solid rgba(255,255,255,0.1)":"none", marginRight:i<a.length-1?16:0 }}>
                  <div style={{ fontSize:"clamp(0.95rem,1.4vw,1.15rem)", fontWeight:900, color:C.ms,
                    letterSpacing:"-0.02em", fontFamily:"'DM Sans',sans-serif" }}>{v}</div>
                  <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11.5, marginTop:2, fontWeight:500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ animation:"fadeUp 0.7s 0.2s ease both" }}>
            <CloudDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const pains = [
    { icon:"🔓", title:"Generic Microsoft 365 deployments with no HIPAA controls", desc:"Out-of-the-box Microsoft 365 is not HIPAA-compliant by default. Without proper DLP policies, conditional access, audit logging, and a signed BAA, your cloud environment is creating compliance exposure." },
    { icon:"📊", title:"Power BI deployed without LTC pharmacy data context", desc:"Power BI is powerful, but it needs to be connected to the right data sources with the right metrics defined. Generic Power BI implementations leave pharmacy operators with dashboards that don't reflect their actual operations." },
    { icon:"🔀", title:"Disconnected Microsoft tools that don't talk to pharmacy systems", desc:"Teams, SharePoint, and Azure are valuable — but only when they're integrated with your pharmacy workflows. Generic IT deployments treat pharmacy software as separate, leaving your team switching between systems manually." },
    { icon:"❓", title:"No one accountable for ongoing compliance", desc:"Microsoft cloud environments require ongoing maintenance to stay HIPAA-compliant — policy updates, access reviews, audit log monitoring. Without a specialist, compliance drift happens quietly." },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.surface }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:72, alignItems:"start" }}>
          <div>
            <div style={{ marginBottom:14 }}><Badge c={C.red}>⚠ The Problem</Badge></div>
            <H size="h2" style={{ marginBottom:18 }}>Most Microsoft Cloud Deployments Miss the Healthcare Layer</H>
            <P style={{ marginBottom:16 }}>A generic Microsoft 365 or Azure deployment gets you the software — but not the healthcare-specific configuration that makes it safe and useful for a pharmacy operation handling PHI every day.</P>
            <P style={{ marginBottom:16 }}>HIPAA requires specific technical safeguards that aren't enabled by default. LTC pharmacy workflows require specific integrations that a general IT consultant won't know to build. The gap between "deployed" and "properly configured" is where compliance problems start.</P>
            <div style={{ padding:"16px 18px", borderRadius:12, background:`${C.ms}08`, border:`1px solid ${C.ms}22` }}>
              <div style={{ fontSize:13.5, color:C.ms, fontWeight:600, lineHeight:1.6 }}>
                A Microsoft BAA is necessary but not sufficient. The HIPAA technical safeguards need to be configured, enforced, and monitored — that's where most generic IT deployments fall short.
              </div>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {pains.map((p,i) => (
              <div key={i} style={{ display:"flex", gap:14, padding:"18px 18px", borderRadius:12,
                background:C.bg, border:`1px solid ${C.border}` }}>
                <span style={{ fontSize:22, flexShrink:0, marginTop:2 }}>{p.icon}</span>
                <div>
                  <div style={{ color:C.head, fontWeight:700, fontSize:14.5, marginBottom:5,
                    fontFamily:"'DM Sans',sans-serif" }}>{p.title}</div>
                  <div style={{ color:C.body, fontSize:13.5, lineHeight:1.65 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [active, setActive] = useState(0);
  const svcs = [
    { icon:"📧", color:C.ms, tag:"Productivity", title:"Microsoft 365 Deployment & Configuration",
      desc:"Full Microsoft 365 deployment configured for LTC pharmacy — Teams, SharePoint, Exchange, OneDrive, and Intune — with HIPAA-compliant settings, data loss prevention policies, conditional access, and a signed BAA in place before any PHI is accessed.",
      includes:["HIPAA-compliant tenant configuration","DLP policies for PHI data types","Conditional access & MFA enforcement","SharePoint document management setup","Teams configuration for pharmacy & facility communication","Microsoft Intune for device management"] },
    { icon:"☁️", color:"#0078D4", tag:"Infrastructure", title:"Azure Cloud Infrastructure",
      desc:"Azure deployment for pharmacy applications — hosting, databases, API gateways, and automation — configured with healthcare-grade security controls, role-based access, audit logging, and Azure Key Vault for secrets management.",
      includes:["Azure App Service & Container hosting","Azure SQL / PostgreSQL databases","API Management for integration layers","Azure Active Directory configuration","Key Vault for secure credential storage","Azure Monitor & Application Insights"] },
    { icon:"📊", color:"#742774", tag:"Analytics", title:"Power BI for LTC Pharmacy Operations",
      desc:"Power BI workspace setup, data pipeline configuration, and dashboard development — connected to your pharmacy system, PCC data, and operational sources — with scheduled refresh, role-based access, and automated report delivery.",
      includes:["Power BI workspace and capacity setup","Data gateway configuration","PMS and EHR data connectors","LTC-specific dashboard development","Scheduled refresh & automated delivery","Row-level security by facility or role"] },
    { icon:"⚡", color:C.violet, tag:"Automation", title:"Power Automate & Power Apps",
      desc:"Low-code automation and internal app development using Microsoft's Power Platform — workflow automation, approval processes, data collection forms, and internal tools built without full custom development.",
      includes:["Pharmacy workflow automations","Approval and notification flows","Internal data collection apps","SharePoint-integrated tools","Teams-embedded applications","Automated report and alert delivery"] },
    { icon:"🔒", color:C.green, tag:"Compliance", title:"HIPAA Compliance Configuration",
      desc:"A full HIPAA technical safeguard configuration across your Microsoft environment — audit logging, access controls, encryption verification, BAA management, and an ongoing compliance monitoring posture.",
      includes:["Microsoft HIPAA BAA signing","Audit log configuration and retention","Encryption verification (at rest & transit)","Access review and privilege audit","DLP policy testing and validation","Quarterly compliance review"] },
  ];
  const s = svcs[active];
  return (
    <section id="services" style={{ padding:"88px 5vw", background:C.alt }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.ms}>☁️ What's Included</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>Microsoft Cloud Services for LTC Pharmacy</H>
          <P style={{ maxWidth:480, margin:"0 auto" }}>Five service areas — each configured specifically for healthcare compliance and LTC pharmacy workflows, not generic IT deployment.</P>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.2fr", gap:24 }}>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {svcs.map((sv,i) => (
              <button key={i} onClick={()=>setActive(i)} style={{ display:"flex", alignItems:"center",
                gap:14, padding:"14px 18px", borderRadius:12, textAlign:"left",
                background:active===i?`${sv.color}0C`:"transparent",
                border:`1.5px solid ${active===i?sv.color+"50":C.border}`,
                cursor:"pointer", transition:"all 0.18s", fontFamily:"inherit" }}>
                <span style={{ fontSize:20, width:40, height:40, borderRadius:10, flexShrink:0,
                  background:active===i?`${sv.color}18`:C.surface,
                  display:"flex", alignItems:"center", justifyContent:"center" }}>{sv.icon}</span>
                <div>
                  <div style={{ color:C.head, fontWeight:700, fontSize:13.5 }}>{sv.title}</div>
                  <div style={{ color:sv.color, fontSize:10.5, fontWeight:700,
                    textTransform:"uppercase", letterSpacing:"0.06em", marginTop:2 }}>{sv.tag}</div>
                </div>
              </button>
            ))}
          </div>
          <Card ac={s.color} hover={false} style={{ padding:"30px 28px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:13, marginBottom:20 }}>
              <span style={{ fontSize:26, width:52, height:52, background:`${s.color}12`,
                border:`1px solid ${s.color}28`, borderRadius:13,
                display:"flex", alignItems:"center", justifyContent:"center" }}>{s.icon}</span>
              <div>
                <span style={{ fontSize:10.5, fontWeight:700, textTransform:"uppercase",
                  letterSpacing:"0.08em", color:s.color }}>{s.tag}</span>
                <H size="h3" style={{ marginTop:3, fontSize:17 }}>{s.title}</H>
              </div>
            </div>
            <P style={{ marginBottom:20, lineHeight:1.74, fontSize:"0.95rem" }}>{s.desc}</P>
            <div style={{ marginBottom:4 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase",
                letterSpacing:"0.07em", marginBottom:10 }}>What's Included</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7 }}>
                {s.includes.map((item,i) => (
                  <div key={i} style={{ display:"flex", gap:7, alignItems:"flex-start",
                    padding:"9px 11px", borderRadius:8, background:C.bg, border:`1px solid ${C.border}` }}>
                    <span style={{ color:s.color, fontWeight:800, fontSize:12, marginTop:1 }}>✓</span>
                    <span style={{ color:C.body, fontSize:12.5, lineHeight:1.4 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n:"01", title:"Environment Assessment", desc:"We audit your current Microsoft licensing, configuration, and compliance posture — identifying gaps in HIPAA controls, unused capabilities, and integration opportunities before proposing any changes.", color:C.ms },
    { n:"02", title:"Architecture & Compliance Plan", desc:"We design the full Microsoft cloud architecture — licensing, services, security controls, and integration points — with HIPAA compliance verification built into every layer before deployment begins.", color:C.p },
    { n:"03", title:"HIPAA Baseline Configuration", desc:"BAA signed, audit logging enabled, DLP policies applied, conditional access configured, and encryption verified — HIPAA baseline is established before any PHI enters the environment.", color:C.green },
    { n:"04", title:"Service Deployment & Integration", desc:"Microsoft 365, Azure services, and Power Platform deployed and integrated with your pharmacy applications, PMS, and operational workflows — in a staged rollout that minimizes disruption.", color:C.violet },
    { n:"05", title:"Training & Adoption", desc:"Staff training on Microsoft tools configured for your pharmacy workflows — not generic training videos but role-specific sessions that show your team how to actually use what we've built.", color:C.amber },
    { n:"06", title:"Ongoing Management & Compliance Monitoring", desc:"Regular compliance reviews, access audits, policy updates, and Microsoft update management — so your cloud environment stays compliant and current without requiring internal IT expertise.", color:C.ms },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.surface }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.p}>🗺 Process</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>How We Deploy Microsoft Cloud for Your Pharmacy</H>
          <P style={{ maxWidth:440, margin:"0 auto" }}>A structured 6-phase deployment that puts HIPAA compliance first and builds everything else on top of it.</P>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          {steps.map((s,i) => (
            <div key={i} style={{ display:"flex", gap:18, padding:"22px 22px", borderRadius:14,
              background:C.bg, border:`1px solid ${C.border}`, alignItems:"flex-start",
              transition:"border-color 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=s.color+"50"; e.currentTarget.style.boxShadow=`0 8px 28px ${s.color}12`; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow="none"; }}>
              <div style={{ width:40, height:40, borderRadius:10, background:`${s.color}12`,
                border:`1px solid ${s.color}30`, display:"flex", alignItems:"center",
                justifyContent:"center", flexShrink:0, fontWeight:900, fontSize:14,
                color:s.color, fontFamily:"'DM Sans',sans-serif" }}>{s.n}</div>
              <div>
                <div style={{ color:C.head, fontWeight:700, fontSize:15.5, marginBottom:6,
                  fontFamily:"'DM Sans',sans-serif" }}>{s.title}</div>
                <div style={{ color:C.body, fontSize:13.5, lineHeight:1.65 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  const cases = [
    { icon:"🔒", title:"HIPAA Compliance Remediation",
      who:"LTC pharmacy using Microsoft 365 with no HIPAA controls configured",
      outcome:"Full HIPAA baseline applied — BAA signed, DLP policies enforced, audit logging enabled, conditional access deployed. Compliance posture transformed from exposed to defensible in 3 weeks." },
    { icon:"📊", title:"Power BI Analytics Deployment",
      who:"LTC pharmacy with pharmacy data in their PMS but no analytics capability",
      outcome:"Power BI connected to PMS data via Azure data gateway. Dispensing, facility, and error dashboards live within 6 weeks. Leadership now receives automated weekly operational summaries." },
    { icon:"🏥", title:"Teams + Pharmacy Workflow Integration",
      who:"LTC pharmacy with facility staff using Teams but pharmacy using separate systems",
      outcome:"Teams channels configured per facility with automated order status notifications and pharmacy alerts. Inbound facility phone calls reduced 60% in the first month post-deployment." },
    { icon:"⚡", title:"Power Automate Pharmacy Workflows",
      who:"LTC pharmacy with manual approval processes for exception handling",
      outcome:"Power Automate flows built for CS exception approvals, prior auth escalations, and compliance document routing. 4 hours per day of manual email coordination eliminated." },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.alt }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.violet}>📁 Results</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>Microsoft Cloud Done Right for LTC Pharmacy</H>
          <P style={{ maxWidth:440, margin:"0 auto" }}>Real outcomes from Microsoft cloud engagements with LTC pharmacy operations.</P>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
          {cases.map((c,i) => (
            <Card key={i} ac={C.ms} style={{ padding:"26px 24px" }}>
              <div style={{ fontSize:28, marginBottom:14 }}>{c.icon}</div>
              <H size="h3" style={{ marginBottom:8, fontSize:16 }}>{c.title}</H>
              <div style={{ display:"flex", gap:7, marginBottom:12, alignItems:"flex-start" }}>
                <span style={{ fontSize:11, padding:"2px 8px", borderRadius:4, background:`${C.ms}0C`,
                  color:C.ms, fontWeight:700, flexShrink:0, marginTop:1 }}>WHO</span>
                <span style={{ color:C.muted, fontSize:13, lineHeight:1.5 }}>{c.who}</span>
              </div>
              <div style={{ display:"flex", gap:7, alignItems:"flex-start" }}>
                <span style={{ fontSize:11, padding:"2px 8px", borderRadius:4, background:`${C.green}0C`,
                  color:C.green, fontWeight:700, flexShrink:0, marginTop:1 }}>RESULT</span>
                <span style={{ color:C.body, fontSize:13, lineHeight:1.55 }}>{c.outcome}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q:"Does Microsoft 365 come with HIPAA compliance out of the box?", a:"No — and this is the most common misconception. Microsoft provides the tools and signs a BAA, but the HIPAA-required technical safeguards (audit logging, DLP policies, conditional access, encryption enforcement) must be configured. Default settings are not sufficient for a covered entity handling PHI." },
    { q:"What Microsoft licenses do we need?", a:"For most LTC pharmacies, Microsoft 365 Business Premium covers the core productivity and security requirements. Azure services are licensed separately based on what you're running. We review your current licensing during the assessment and recommend the most cost-effective path — including consolidating licenses you might already be paying for but not using." },
    { q:"Can you take over an existing Microsoft environment that wasn't set up correctly?", a:"Yes, and this is one of our most common engagements. We audit your current environment, document what's misconfigured or missing, and remediate systematically — without disrupting your day-to-day operations. Most compliance remediations take 2–4 weeks." },
    { q:"Do you manage our Microsoft environment ongoing?", a:"Yes. Most clients continue on a managed services retainer — covering policy updates, access reviews, new user onboarding, Microsoft update management, and quarterly compliance reviews. You get dedicated support without hiring an internal IT specialist." },
    { q:"How does Power BI connect to our pharmacy system?", a:"We use an on-premises Azure data gateway to connect Power BI to your PMS database or exports. This keeps your data within your network while making it available to Power BI for reporting. The connection is encrypted and audited." },
    { q:"What happens when Microsoft releases updates that affect our configuration?", a:"We monitor Microsoft's update roadmap for changes that affect healthcare customers — DLP policy changes, new compliance features, security updates — and proactively apply configuration updates. You're notified of any material changes before they're implemented." },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.surface }}>
      <div style={{ maxWidth:780, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.p}>❓ FAQ</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>Questions We Get Asked</H>
          <P style={{ maxWidth:400, margin:"0 auto" }}>What LTC pharmacy teams ask about Microsoft cloud for healthcare.</P>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {faqs.map((f,i) => (
            <div key={i} style={{ borderRadius:12, border:`1.5px solid ${open===i?C.ms+"44":C.border}`,
              overflow:"hidden", transition:"border-color 0.2s", boxShadow:open===i?`0 4px 20px ${C.ms}10`:"none" }}>
              <button onClick={()=>setOpen(open===i?null:i)}
                style={{ width:"100%", padding:"18px 22px", display:"flex", alignItems:"center",
                  justifyContent:"space-between", background:open===i?`${C.ms}06`:C.surface,
                  border:"none", cursor:"pointer", fontFamily:"inherit", textAlign:"left", transition:"background 0.2s" }}>
                <span style={{ color:C.head, fontWeight:700, fontSize:15 }}>{f.q}</span>
                <span style={{ color:C.ms, fontSize:18, fontWeight:700, flexShrink:0, marginLeft:12,
                  transform:open===i?"rotate(45deg)":"none", transition:"transform 0.2s" }}>+</span>
              </button>
              {open===i && (
                <div style={{ padding:"0 22px 18px", background:`${C.ms}06` }}>
                  <p style={{ color:C.body, fontSize:14.5, lineHeight:1.72 }}>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Related() {
  const items = [
    { icon:"💻", color:C.p, tag:"Service", title:"Custom Development", href:"/services/custom-development", desc:"Full-stack LTC pharmacy applications built on Azure and modern web technologies." },
    { icon:"📊", color:C.violet, tag:"Service", title:"Data Analytics & Power BI", href:"/services/data-analytics", desc:"Custom Power BI dashboards and automated reporting pipelines for LTC pharmacy." },
    { icon:"⚙️", color:C.accent, tag:"Service", title:"AI Automation", href:"/services/ai-automation", desc:"Intelligent workflow automation — integratable with Power Automate and Azure." },
  ];
  return (
    <section style={{ padding:"72px 5vw", background:C.alt }}>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <H size="h3" style={{ marginBottom:32, fontSize:20 }}>Related Services</H>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
          {items.map((it,i) => (
            <Card key={i} ac={it.color}>
              <a href={it.href} style={{ display:"block", padding:"24px 22px", textDecoration:"none" }}>
                <div style={{ fontSize:24, marginBottom:12 }}>{it.icon}</div>
                <div style={{ fontSize:10.5, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", color:it.color, marginBottom:6 }}>{it.tag}</div>
                <div style={{ color:C.head, fontWeight:700, fontSize:16, marginBottom:8, fontFamily:"'DM Sans',sans-serif" }}>{it.title}</div>
                <div style={{ color:C.body, fontSize:13.5, lineHeight:1.6 }}>{it.desc}</div>
                <div style={{ color:it.color, fontSize:13, fontWeight:700, marginTop:14 }}>Learn more →</div>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{ padding:"80px 5vw", background:C.dark, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:-140, right:-80, width:500, height:500, borderRadius:"50%",
        background:`radial-gradient(circle,${C.ms}45 0%,transparent 70%)`, pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-70, left:0, width:360, height:360, borderRadius:"50%",
        background:`radial-gradient(circle,${C.p}44 0%,transparent 70%)`, pointerEvents:"none" }} />
      <div style={{ maxWidth:660, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
        <H size="h2" style={{ color:"#fff", marginBottom:14 }}>
          Is Your Microsoft Cloud Actually HIPAA-Compliant?
        </H>
        <P style={{ color:"rgba(255,255,255,0.68)", marginBottom:32, fontSize:16 }}>
          Schedule a free cloud assessment. We'll review your current Microsoft environment, identify compliance gaps, and give you a clear remediation plan — no obligation, no sales pressure.
        </P>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <PBtn light href="/schedule">Book a Free Cloud Assessment →</PBtn>
          <a href="tel:+17207246828" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"12px 24px",
            borderRadius:10, background:"transparent", color:"rgba(255,255,255,0.78)", fontWeight:600, fontSize:14,
            textDecoration:"none", border:"1.5px solid rgba(255,255,255,0.22)", fontFamily:"inherit" }}
            onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.55)"}
            onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.22)"}>
            📞 (720) 724-6828
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background:C.surface, borderTop:`1px solid ${C.border}`, padding:"40px 5vw 22px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", justifyContent:"space-between",
        alignItems:"center", flexWrap:"wrap", gap:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
          <div style={{ width:30, height:30, borderRadius:7, background:`linear-gradient(135deg,${C.p},${C.accent})`,
            display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:14, color:"#fff" }}>S</div>
          <span style={{ color:C.head, fontWeight:800, fontSize:16, fontFamily:"'DM Sans',sans-serif" }}>
            SkypondTech<span style={{ color:C.p }}>.ai</span>
          </span>
        </div>
        <div style={{ display:"flex", gap:24 }}>
          {[["Services","/services"],["Products","/products"],["Schedule Demo","/schedule"],["Contact","/#contact"]].map(([l,h])=>(
            <a key={l} href={h} style={{ color:C.muted, fontSize:13, textDecoration:"none" }}
              onMouseEnter={e=>e.currentTarget.style.color=C.ms}
              onMouseLeave={e=>e.currentTarget.style.color=C.muted}>{l}</a>
          ))}
        </div>
        <span style={{ color:C.muted, fontSize:12.5 }}>© 2025 Skypond Tech Pvt. Ltd.</span>
      </div>
    </footer>
  );
}

export default function MicrosoftCloud() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:#1C3053;color:#3A3E60;font-family:'DM Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);}}
        ::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-track{background:#1C3053;}
        ::-webkit-scrollbar-thumb{background:#0078D4;border-radius:3px;}
      `}</style>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Services />
        <Process />
        <UseCases />
        <FAQ />
        <Related />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
