import C from '../../tokens.js'
import { useState, useEffect, useRef } from "react";
import { Button } from '../../components/ui/Button.jsx'
import { Navbar } from '../../components/Navbar.jsx'
import { Footer } from '../../components/Footer.jsx'
import { Breadcrumb } from '../../components/Breadcrumb.jsx'
import { ProductHero } from '../../components/ProductHero.jsx'
import { Unlock, Shuffle, HelpCircle, Zap, BarChart3, Mail, Cloud, Lock, Hospital, Laptop, Settings } from 'lucide-react'
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '../../config/constants.js'

const Badge = ({ c=C.p2, children }) => (
  <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"4px 13px",
    borderRadius:99, border:`1px solid ${c}28`, background:`${c}18`, color:c,
    fontSize:11.5, letterSpacing:"0.07em", textTransform:"uppercase", fontWeight:500,
    fontFamily:"'Akshar', sans-serif" }}>
    {children}
  </span>
);
const H = ({ size="h2", style={}, color, children }) => {
  const s = { hero:"clamp(2.4rem,5vw,4rem)", h2:"clamp(1.8rem,2.7vw,2.5rem)", h3:"1.2rem" };
  const fw = size === "h3" ? 500 : 700;
  return <h2 style={{ fontSize:s[size], fontWeight:fw, color:color||C.head,
    letterSpacing:"-0.026em", lineHeight:1.1, fontFamily:"'Akshar', sans-serif", ...style }}>{children}</h2>;
};
const P = ({ style={}, children }) => (
  <p style={{ fontSize:"clamp(0.96rem,1.1vw,1.04rem)", color:C.body, lineHeight:1.76,
    fontFamily:"'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight:400, ...style }}>{children}</p>
);
function Card({ children, style={}, ac=C.ms, hover=true }) {
  const [h, setH] = useState(false);
  return <div onMouseEnter={()=>hover&&setH(true)} onMouseLeave={()=>hover&&setH(false)}
    style={{ background:C.surface, border:`1.5px solid ${h ? C.p2 : C.border}`, borderRadius:16,
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
            <div style={{ fontSize:13.5, fontWeight:900, color:C.ms, fontFamily:"'Akshar', sans-serif" }}>{v}</div>
            <div style={{ fontSize:10.5, color:"rgba(255,255,255,0.35)", marginTop:3 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <ProductHero
      badge="Microsoft Cloud"
      title={(
        <>
          Microsoft Cloud,
          <br />
          <span style={{ color: C.p }}>configured for healthcare</span>
        </>
      )}
      description="Microsoft 365, Azure, and Power Platform properly deployed for LTC pharmacy — not a generic IT rollout. HIPAA compliance built in, LTC workflows considered, and a BAA in place before any PHI touches the cloud."
      stats={[
        { num: 'HIPAA BAA', label: 'Microsoft-signed' },
        { num: '365 + Azure', label: 'Full stack' },
        { num: 'LTC-specific', label: 'Configuration' },
        { num: 'Power BI', label: 'Analytics included' },
      ]}
    />
  );
}

function Problem() {
  const pains = [
    { icon:<Unlock size={18} />, title:"Generic Microsoft 365 deployments with no HIPAA controls", desc:"Out-of-the-box Microsoft 365 is not HIPAA-compliant by default. Without proper DLP policies, conditional access, audit logging, and a signed BAA, your cloud environment is creating compliance exposure." },
    { icon:<BarChart3 size={18} />, title:"Power BI deployed without LTC pharmacy data context", desc:"Power BI is powerful, but it needs to be connected to the right data sources with the right metrics defined. Generic Power BI implementations leave pharmacy operators with dashboards that don't reflect their actual operations." },
    { icon:<Shuffle size={18} />, title:"Disconnected Microsoft tools that don't talk to pharmacy systems", desc:"Teams, SharePoint, and Azure are valuable — but only when they're integrated with your pharmacy workflows. Generic IT deployments treat pharmacy software as separate, leaving your team switching between systems manually." },
    { icon:<HelpCircle size={18} />, title:"No one accountable for ongoing compliance", desc:"Microsoft cloud environments require ongoing maintenance to stay HIPAA-compliant — policy updates, access reviews, audit log monitoring. Without a specialist, compliance drift happens quietly." },
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
                    fontFamily:"'Akshar', sans-serif" }}>{p.title}</div>
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
    { icon:<Mail size={20} />, color:C.ms, tag:"Productivity", title:"Microsoft 365 Deployment & Configuration",
      desc:"Full Microsoft 365 deployment configured for LTC pharmacy — Teams, SharePoint, Exchange, OneDrive, and Intune — with HIPAA-compliant settings, data loss prevention policies, conditional access, and a signed BAA in place before any PHI is accessed.",
      includes:["HIPAA-compliant tenant configuration","DLP policies for PHI data types","Conditional access & MFA enforcement","SharePoint document management setup","Teams configuration for pharmacy & facility communication","Microsoft Intune for device management"] },
    { icon:<Cloud size={20} />, color:"#0078D4", tag:"Infrastructure", title:"Azure Cloud Infrastructure",
      desc:"Azure deployment for pharmacy applications — hosting, databases, API gateways, and automation — configured with healthcare-grade security controls, role-based access, audit logging, and Azure Key Vault for secrets management.",
      includes:["Azure App Service & Container hosting","Azure SQL / PostgreSQL databases","API Management for integration layers","Azure Active Directory configuration","Key Vault for secure credential storage","Azure Monitor & Application Insights"] },
    { icon:<BarChart3 size={20} />, color:"#742774", tag:"Analytics", title:"Power BI for LTC Pharmacy Operations",
      desc:"Power BI workspace setup, data pipeline configuration, and dashboard development — connected to your pharmacy system, PCC data, and operational sources — with scheduled refresh, role-based access, and automated report delivery.",
      includes:["Power BI workspace and capacity setup","Data gateway configuration","PMS and EHR data connectors","LTC-specific dashboard development","Scheduled refresh & automated delivery","Row-level security by facility or role"] },
    { icon:<Zap size={20} />, color:C.p, tag:"Automation", title:"Power Automate & Power Apps",
      desc:"Low-code automation and internal app development using Microsoft's Power Platform — workflow automation, approval processes, data collection forms, and internal tools built without full custom development.",
      includes:["Pharmacy workflow automations","Approval and notification flows","Internal data collection apps","SharePoint-integrated tools","Teams-embedded applications","Automated report and alert delivery"] },
    { icon:<Lock size={20} />, color:C.green, tag:"Compliance", title:"HIPAA Compliance Configuration",
      desc:"A full HIPAA technical safeguard configuration across your Microsoft environment — audit logging, access controls, encryption verification, BAA management, and an ongoing compliance monitoring posture.",
      includes:["Microsoft HIPAA BAA signing","Audit log configuration and retention","Encryption verification (at rest & transit)","Access review and privilege audit","DLP policy testing and validation","Quarterly compliance review"] },
  ];
  const s = svcs[active];
  return (
    <section id="how" style={{ padding:"88px 5vw", background:C.alt }}>
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
    { n:"01", title:"Environment Assessment", desc:"We audit your current Microsoft licensing, configuration, and compliance posture — identifying gaps in HIPAA controls, unused capabilities, and integration opportunities before proposing any changes.", color:C.p },
    { n:"02", title:"Architecture & Compliance Plan", desc:"We design the full Microsoft cloud architecture — licensing, services, security controls, and integration points — with HIPAA compliance verification built into every layer before deployment begins.", color:C.p },
    { n:"03", title:"HIPAA Baseline Configuration", desc:"BAA signed, audit logging enabled, DLP policies applied, conditional access configured, and encryption verified — HIPAA baseline is established before any PHI enters the environment.", color:C.p },
    { n:"04", title:"Service Deployment & Integration", desc:"Microsoft 365, Azure services, and Power Platform deployed and integrated with your pharmacy applications, PMS, and operational workflows — in a staged rollout that minimizes disruption.", color:C.p },
    { n:"05", title:"Training & Adoption", desc:"Staff training on Microsoft tools configured for your pharmacy workflows — not generic training videos but role-specific sessions that show your team how to actually use what we've built.", color:C.p },
    { n:"06", title:"Ongoing Management & Compliance Monitoring", desc:"Regular compliance reviews, access audits, policy updates, and Microsoft update management — so your cloud environment stays compliant and current without requiring internal IT expertise.", color:C.p },
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
                color:s.color, fontFamily:"'Akshar', sans-serif" }}>{s.n}</div>
              <div>
                <div style={{ color:C.head, fontWeight:700, fontSize:15.5, marginBottom:6,
                  fontFamily:"'Akshar', sans-serif" }}>{s.title}</div>
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
    { icon:<Lock size={18} />, title:"HIPAA Compliance Remediation",
      who:"LTC pharmacy using Microsoft 365 with no HIPAA controls configured",
      outcome:"Full HIPAA baseline applied — BAA signed, DLP policies enforced, audit logging enabled, conditional access deployed. Compliance posture transformed from exposed to defensible in 3 weeks." },
    { icon:<BarChart3 size={18} />, title:"Power BI Analytics Deployment",
      who:"LTC pharmacy with pharmacy data in their PMS but no analytics capability",
      outcome:"Power BI connected to PMS data via Azure data gateway. Dispensing, facility, and error dashboards live within 6 weeks. Leadership now receives automated weekly operational summaries." },
    { icon:<Hospital size={18} />, title:"Teams + Pharmacy Workflow Integration",
      who:"LTC pharmacy with facility staff using Teams but pharmacy using separate systems",
      outcome:"Teams channels configured per facility with automated order status notifications and pharmacy alerts. Inbound facility phone calls reduced 60% in the first month post-deployment." },
    { icon:<Zap size={18} />, title:"Power Automate Pharmacy Workflows",
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
              <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", columnGap:10, rowGap:12, alignItems:"start" }}>
                <span style={{ fontSize:11, padding:"2px 8px", borderRadius:4, background:`${C.ms}0C`,
                  color:C.ms, fontWeight:700, justifySelf:"start", marginTop:1 }}>WHO</span>
                <span style={{ color:C.muted, fontSize:13, lineHeight:1.5 }}>{c.who}</span>
                <span style={{ fontSize:11, padding:"2px 8px", borderRadius:4, background:`${C.green}0C`,
                  color:C.green, fontWeight:700, justifySelf:"start", marginTop:1 }}>RESULT</span>
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
    { icon:<Laptop size={20} />, color:C.p, tag:"Service", title:"Custom Development", href:"/services/custom-development", desc:"Full-stack LTC pharmacy applications built on Azure and modern web technologies." },
    { icon:<BarChart3 size={20} />, color:C.p, tag:"Service", title:"Data Analytics & Power BI", href:"/services/data-analytics", desc:"Custom Power BI dashboards and automated reporting pipelines for LTC pharmacy." },
    { icon:<Settings size={20} />, color:C.p, tag:"Service", title:"AI Automation", href:"/services/ai-automation", desc:"Intelligent workflow automation — integratable with Power Automate and Azure." },
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
                <div style={{ color:C.head, fontWeight:700, fontSize:16, marginBottom:8, fontFamily:"'Akshar', sans-serif" }}>{it.title}</div>
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
    <section style={{ padding:"80px 5vw", background:C.surface, borderTop:`1px solid ${C.border}`,
      position:"relative" }}>
      <div style={{ maxWidth:660, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
        <H size="h2" style={{ color:C.head, marginBottom:14, fontFamily:"'Akshar', sans-serif", fontWeight:700 }}>
          Is Your Microsoft Cloud Actually HIPAA-Compliant?
        </H>
        <P style={{ color:C.body, marginBottom:32, fontSize:16,
          fontFamily:"'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight:400 }}>
          Schedule a free cloud assessment. We'll review your current Microsoft environment, identify compliance gaps, and give you a clear remediation plan — no obligation, no sales pressure.
        </P>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <Button variant="primary" size="md" to="/schedule-demo">Book a Free Cloud Assessment →</Button>
          <Button variant="secondary" size="md" href={`tel:${CONTACT_PHONE}`} style={{ fontSize:"0.9rem" }}>
            📞 {CONTACT_PHONE_DISPLAY}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function MicrosoftCloud() {
  return (
    <>
            <Navbar />
      <Breadcrumb items={[{ label:"Home", href:"/" }, { label:"Services", href:"/services" }, { label:"Microsoft Cloud", href:null }]} />
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
