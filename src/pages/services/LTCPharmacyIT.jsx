import C from '../../tokens.js'
import { useState, useEffect, useRef } from "react";
import { Button } from '../../components/ui/Button.jsx'
import { Navbar } from '../../components/Navbar.jsx'
import { Footer } from '../../components/Footer.jsx'
import { Breadcrumb } from '../../components/Breadcrumb.jsx'
import { ProductHero } from '../../components/ProductHero.jsx'
import { Hospital, CheckCircle2, Zap, Lock, Frown, Timer, ClipboardList, DollarSign, Smartphone, Link as LinkIcon, RefreshCw, ShieldCheck, BarChart3, Wrench, Settings } from 'lucide-react'
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '../../config/constants.js'

/* ── primitives ── */
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
    letterSpacing:"-0.026em", lineHeight:1.1,
    fontFamily:"'Akshar', sans-serif", ...style }}>{children}</h2>;
};
const P = ({ style={}, children }) => (
  <p style={{ fontSize:"clamp(0.96rem,1.1vw,1.04rem)", color:C.body, lineHeight:1.76,
    fontFamily:"'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight:400, ...style }}>{children}</p>
);
function Card({ children, style={}, ac, hover=true }) {
  const [h, setH] = useState(false);
  return <div onMouseEnter={()=>hover&&setH(true)} onMouseLeave={()=>hover&&setH(false)}
    style={{ background:C.surface, border:`1.5px solid ${h ? C.p2 : C.border}`, borderRadius:16,
      transition:"all 0.2s", transform:h&&hover?"translateY(-4px)":"none",
      boxShadow:h&&hover?`0 16px 40px ${ac?ac+"1A":"rgba(0,0,0,0.08)"}`:"0 2px 8px rgba(0,0,0,0.04)",
      ...style }}>{children}</div>;
}

/* ── Navbar ── */
function Hero() {
  return (
    <ProductHero
      badge="LTC Pharmacy IT"
      title={(
        <>
          LTC pharmacy IT built by
          <br />
          <span style={{ color: C.p }}>people who know the industry</span>
        </>
      )}
      description="We don't learn LTC pharmacy on your project. Our team has built telepharmacy platforms, DEA compliance systems, and pharmacy-facility integrations inside real LTC operations — and we bring that depth to every engagement."
      stats={[
        { num: '50+', label: 'LTC projects delivered' },
        { num: '100%', label: 'Client satisfaction rate' },
        { num: 'LTC', label: 'Exclusive industry focus' },
        { num: 'HIPAA', label: 'Compliant by design' },
      ]}
    />
  );
}

/* ── Problem ── */
function Problem() {
  const pains = [
    { icon:<Frown size={22} />, title:"Generic IT firms that don't speak LTC", desc:"You spend half the project explaining dispensing workflows, DEA schedules, and facility coordination to a team that's never worked in pharmacy." },
    { icon:<Timer size={22} />, title:"Slow integrations with LTC systems", desc:"PointClickCare, pharmacy management systems, and facility EHRs have their own complexity. Most developers discover this on your timeline and budget." },
    { icon:<ClipboardList size={22} />, title:"Compliance gaps that create audit risk", desc:"Off-the-shelf tools miss the DEA reporting, CS tracking, and controlled substance audit trail requirements that are specific to LTC pharmacy operations." },
    { icon:<DollarSign size={22} />, title:"Rework costs from misaligned solutions", desc:"Projects built without LTC domain knowledge get rebuilt. That costs twice — in money and in the months of disrupted pharmacy operations while fixes are made." },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.surface }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:72, alignItems:"start" }}>
          <div>
            <div style={{ marginBottom:14 }}><Badge c={C.red}>⚠ The Problem</Badge></div>
            <H size="h2" style={{ marginBottom:18 }}>Most IT Firms Learn LTC Pharmacy on Your Dime</H>
            <P style={{ marginBottom:16 }}>Long-term care pharmacy has a unique combination of compliance requirements, operational workflows, and system integrations that generic IT partners aren't prepared for.</P>
            <P>By the time a typical firm understands your DEA reporting obligations, your PointClickCare data structure, and your facility billing workflows — your project is over schedule and over budget.</P>
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

/* ── Capabilities ── */
function Capabilities() {
  const [active, setActive] = useState(0);
  const caps = [
    {
      icon:<Smartphone size={20} />, title:"Telepharmacy Application Development",
      tag:"Custom Build",
      desc:"We build telepharmacy platforms from the ground up — patient-facing medication management, RPh review interfaces, facility portals, and integration layers with your existing PMS. Built with HIPAA-compliant architecture and LTC-specific workflow logic baked in.",
      bullets:["Web and mobile-first RPh review interfaces","Facility and patient portal development","PMS integration layer (BestRx, QS1, SoftWriters, PioneerRx)","Real-time order queue and status tracking","HIPAA-compliant data architecture","Scalable to multi-site and multi-state operations"],
      metric:"Full-stack", ml:"React · Node.js · Azure",
    },
    {
      icon:<LinkIcon size={20} />, title:"Pharmacy-Facility Integration",
      tag:"Integration",
      desc:"We design and build the data bridges between your pharmacy system and LTC facilities — PointClickCare data feeds, MAR sync, ADT event handling, and billing reconciliation. No more manual bridging between systems.",
      bullets:["PointClickCare bidirectional data feed","MAR (Medication Administration Record) sync","ADT (Admit/Discharge/Transfer) event handling","Billing and census reconciliation","Error monitoring and failure alerting","HIPAA-compliant data transmission"],
      metric:"Real-time", ml:"Bidirectional sync",
    },
    {
      icon:<RefreshCw size={20} />, title:"System Migration & Modernization",
      tag:"Migration",
      desc:"Moving from a legacy PMS to a new platform without disrupting dispensing operations is high-stakes. We manage LTC pharmacy system migrations with a structured approach that protects data integrity and keeps your compliance posture intact throughout.",
      bullets:["Pre-migration data audit and mapping","Zero-downtime cutover planning","Historical data migration and validation","Staff training and workflow documentation","Post-migration support and stabilization","Compliance continuity throughout the process"],
      metric:"Zero", ml:"Dispensing disruption",
    },
    {
      icon:<ShieldCheck size={20} />, title:"Regulatory Compliance Tooling",
      tag:"Compliance",
      desc:"We build the compliance infrastructure that keeps LTC pharmacies audit-ready — DEA lookup, ARCOS reporting, CS inventory tracking, prior authorization management, and document archival systems with full audit trails.",
      bullets:["DEA registration verification system","ARCOS and DEA Form 222 reporting","Controlled substance audit trail","Prior authorization workflow tooling","Document generation and archival","Regulatory reporting dashboards"],
      metric:"Audit-ready", ml:"Built-in from day one",
    },
    {
      icon:<BarChart3 size={20} />, title:"Custom Reporting & Dashboards",
      tag:"Analytics",
      desc:"We build reporting systems tailored to what LTC pharmacy operators actually need — dispensing metrics, facility performance, error rate tracking, and executive summaries — delivered via Power BI or custom web dashboards.",
      bullets:["Power BI dashboard development","Automated report scheduling and delivery","Dispensing volume and trend analysis","Facility performance benchmarking","Medication error rate tracking","Executive-level summary exports"],
      metric:"Power BI", ml:"Microsoft-certified",
    },
  ];
  const cap = caps[active];
  return (
    <section id="how" style={{ padding:"88px 5vw", background:C.alt }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.p}>⚙ Capabilities</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>What We Build for LTC Pharmacies</H>
          <P style={{ maxWidth:480, margin:"0 auto" }}>Five core capability areas — each built around the specific technical and compliance demands of long-term care pharmacy operations.</P>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.2fr", gap:24 }}>
          {/* Tab list */}
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {caps.map((c,i) => (
              <button key={i} onClick={()=>setActive(i)} style={{ display:"flex", alignItems:"center",
                gap:14, padding:"14px 18px", borderRadius:12, textAlign:"left",
                background:active===i?`${C.p}0C`:"transparent",
                border:`1.5px solid ${active===i?C.p+"50":C.border}`,
                cursor:"pointer", transition:"all 0.18s", fontFamily:"inherit" }}>
                <span style={{ fontSize:20, width:40, height:40, borderRadius:10, flexShrink:0,
                  background:active===i?`${C.p}18`:C.surface,
                  display:"flex", alignItems:"center", justifyContent:"center" }}>{c.icon}</span>
                <div>
                  <div style={{ color:C.head, fontWeight:700, fontSize:13.5 }}>{c.title}</div>
                  <div style={{ color:C.p, fontSize:10.5, fontWeight:700, textTransform:"uppercase",
                    letterSpacing:"0.06em", marginTop:2 }}>{c.tag}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <Card ac={C.p} hover={false} style={{ padding:"30px 28px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
              <span style={{ fontSize:28, width:54, height:54, background:`${C.p}12`,
                border:`1px solid ${C.p}28`, borderRadius:14,
                display:"flex", alignItems:"center", justifyContent:"center" }}>{cap.icon}</span>
              <div>
                <span style={{ fontSize:10.5, fontWeight:700, textTransform:"uppercase",
                  letterSpacing:"0.08em", color:C.p }}>{cap.tag}</span>
                <H size="h3" style={{ marginTop:3, fontSize:18 }}>{cap.title}</H>
              </div>
            </div>
            <P style={{ marginBottom:20, lineHeight:1.74 }}>{cap.desc}</P>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:22 }}>
              {cap.bullets.map((b,i) => (
                <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start",
                  padding:"9px 11px", borderRadius:8, background:C.bg, border:`1px solid ${C.border}` }}>
                  <span style={{ color:C.green, fontWeight:800, fontSize:12, marginTop:1 }}>✓</span>
                  <span style={{ color:C.body, fontSize:13, lineHeight:1.45 }}>{b}</span>
                </div>
              ))}
            </div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"8px 16px",
              borderRadius:8, background:`${C.p}0C`, border:`1px solid ${C.p}25`,
              color:C.p, fontWeight:700, fontSize:13 }}>
              {cap.metric} <span style={{ fontWeight:400, opacity:0.7 }}>· {cap.ml}</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ── Process ── */
function Process() {
  const steps = [
    { n:"01", title:"Discovery & Workflow Audit", desc:"We start by mapping your current workflows, systems, and compliance obligations. No assumptions — we document how your pharmacy actually operates before we write a single line of code.", color:C.p },
    { n:"02", title:"Solution Design", desc:"We design a technical approach in plain language — architecture, integrations, timeline, and costs — tailored to your workflow. You review and approve before anything is built.", color:C.p },
    { n:"03", title:"Build & Integrate", desc:"We build and integrate the solution with your existing PMS, facility systems, and compliance infrastructure. Regular demos keep you informed at every stage — no surprises at handoff.", color:C.p },
    { n:"04", title:"Training & Documentation", desc:"We train your team in person or remotely, provide full technical documentation, and ensure every staff member who touches the system is confident before we hand it over.", color:C.p },
    { n:"05", title:"Ongoing Support & Evolution", desc:"LTC pharmacy technology doesn't stand still — regulatory changes, system updates, and operational needs evolve. We stay engaged with ongoing support and iteration.", color:C.p },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.surface }}>
      <div style={{ maxWidth:860, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.p}>🗺 Our Process</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>How We Work With You</H>
          <P style={{ maxWidth:440, margin:"0 auto" }}>A structured, transparent process that protects your operations and keeps compliance intact throughout every phase.</P>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {steps.map((s,i) => (
            <div key={i} style={{ display:"flex", gap:20, padding:"22px 24px", borderRadius:14,
              background:C.bg, border:`1px solid ${C.border}`, alignItems:"flex-start",
              transition:"border-color 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=s.color+"50"; e.currentTarget.style.boxShadow=`0 8px 28px ${s.color}12`; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow="none"; }}>
              <div style={{ width:42, height:42, borderRadius:11, background:`${s.color}12`,
                border:`1px solid ${s.color}30`, display:"flex", alignItems:"center",
                justifyContent:"center", flexShrink:0, fontWeight:900, fontSize:15,
                color:s.color, fontFamily:"'Akshar', sans-serif" }}>{s.n}</div>
              <div>
                <div style={{ color:C.head, fontWeight:700, fontSize:16, marginBottom:6,
                  fontFamily:"'Akshar', sans-serif" }}>{s.title}</div>
                <div style={{ color:C.body, fontSize:14.5, lineHeight:1.68 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Use Cases ── */
function UseCases() {
  const cases = [
    { icon:<Wrench size={18} />, title:"Building a Telepharmacy Platform from Scratch",
      who:"Independent LTC pharmacy expanding into remote dispensing",
      outcome:"Full-stack telepharmacy application with RPh review interface, facility portal, PMS integration, and HIPAA-compliant architecture — delivered in 12 weeks." },
    { icon:<RefreshCw size={18} />, title:"Migrating Off a Legacy Pharmacy System",
      who:"Multi-location LTC pharmacy chain switching PMS vendors",
      outcome:"Structured migration with full data audit, zero-downtime cutover plan, historical data validation, and staff training across 4 locations." },
    { icon:<LinkIcon size={18} />, title:"Connecting Pharmacy to 20+ LTC Facilities",
      who:"Regional LTC pharmacy serving multiple facilities on PointClickCare",
      outcome:"Centralized PointClickCare data feed with real-time MAR sync, ADT event handling, and an error monitoring dashboard that flags sync issues instantly." },
    { icon:<ClipboardList size={18} />, title:"Building a DEA Compliance Infrastructure",
      who:"LTC pharmacy that failed an audit and needed a compliance overhaul",
      outcome:"Complete DEA compliance system: prescriber verification, ARCOS reporting, CS inventory tracking, and audit trail — ready in 8 weeks." },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.alt }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.p}>📁 Use Cases</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>Projects We've Delivered</H>
          <P style={{ maxWidth:460, margin:"0 auto" }}>Real scenarios from our LTC pharmacy IT engagements — not hypothetical examples.</P>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
          {cases.map((c,i) => (
            <Card key={i} ac={C.p} style={{ padding:"26px 24px" }}>
              <div style={{ fontSize:28, marginBottom:14 }}>{c.icon}</div>
              <H size="h3" style={{ marginBottom:8, fontSize:16 }}>{c.title}</H>
              <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", columnGap:10, rowGap:12, alignItems:"start" }}>
                <span style={{ fontSize:11, padding:"2px 8px", borderRadius:4, background:`${C.p}0C`,
                  color:C.p, fontWeight:700, justifySelf:"start", marginTop:1 }}>WHO</span>
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

/* ── FAQ ── */
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q:"Do you only work with LTC pharmacies?", a:"Yes. Long-term care pharmacy is our exclusive focus. We don't take on retail, compounding, or specialty pharmacy projects. That focus means we bring genuine operational knowledge — not a learning curve — to every LTC engagement." },
    { q:"How long does a typical LTC IT project take?", a:"It depends on scope. A DEA compliance module or reporting dashboard typically takes 4–8 weeks. A full telepharmacy build or complex PMS migration is 10–16 weeks. We give you a clear timeline during solution design, before anything is committed." },
    { q:"Will you work with our existing pharmacy management system?", a:"Yes. We integrate with all major LTC pharmacy management systems — BestRx, QS1, SoftWriters, PioneerRx, Liberty, and others. We don't require you to change your PMS to work with us." },
    { q:"How do you handle HIPAA compliance in your builds?", a:"Every solution we build uses HIPAA-compliant architecture by default: encryption at rest and in transit, role-based access control, audit logging, BAA agreements, and zero PHI retention in third-party services. Compliance isn't an add-on — it's baked in from the first design decision." },
    { q:"What does working with SkypondTech actually look like day-to-day?", a:"You get a direct line to Ramesh and the team — not a ticket system. We do weekly demos during active builds, document everything, and don't disappear after go-live. Our clients typically describe it as working with an internal team that just happens to specialize in LTC technology." },
    { q:"Can you help us after the project is delivered?", a:"Absolutely. Most clients stay on a support retainer after delivery. We handle system updates, regulatory changes, new integrations, and iterative improvements — so your LTC technology evolves as your pharmacy grows." },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.surface }}>
      <div style={{ maxWidth:780, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.p}>❓ FAQ</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>Questions We Get Asked</H>
          <P style={{ maxWidth:400, margin:"0 auto" }}>Straight answers to the questions LTC pharmacy teams ask before working with us.</P>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {faqs.map((f,i) => (
            <div key={i} style={{ borderRadius:12, border:`1.5px solid ${open===i?C.p+"44":C.border}`,
              overflow:"hidden", transition:"border-color 0.2s",
              boxShadow:open===i?`0 4px 20px ${C.p}10`:"none" }}>
              <button onClick={()=>setOpen(open===i?null:i)}
                style={{ width:"100%", padding:"18px 22px", display:"flex", alignItems:"center",
                  justifyContent:"space-between", background:open===i?`${C.p}06`:C.surface,
                  border:"none", cursor:"pointer", fontFamily:"inherit", textAlign:"left", transition:"background 0.2s" }}>
                <span style={{ color:C.head, fontWeight:700, fontSize:15 }}>{f.q}</span>
                <span style={{ color:C.p, fontSize:18, fontWeight:700, flexShrink:0, marginLeft:12,
                  transform:open===i?"rotate(45deg)":"none", transition:"transform 0.2s" }}>+</span>
              </button>
              {open===i && (
                <div style={{ padding:"0 22px 18px", background:`${C.p}06` }}>
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

/* ── Related ── */
function Related() {
  const items = [
    { icon:<Settings size={20} />, color:C.green, tag:"Service", title:"AI Automation", href:"/services/ai-automation",
      desc:"Intelligent workflow automation replacing manual bottlenecks in your LTC pharmacy operations." },
    { icon:<BarChart3 size={20} />, color:C.orange, tag:"Service", title:"Data Analytics & Power BI", href:"/services/data-analytics",
      desc:"Custom dashboards and analytics pipelines that make your pharmacy data actionable." },
    { icon:<LinkIcon size={20} />, color:C.p, tag:"Product", title:"PointClickCare Data Feed", href:"/products/pointclickcare-feed",
      desc:"Live bidirectional sync between your pharmacy system and PointClickCare." },
  ];
  return (
    <section style={{ padding:"72px 5vw", background:C.alt }}>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <H size="h3" style={{ marginBottom:32, fontSize:20 }}>Related Services & Products</H>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
          {items.map((it,i) => (
            <Card key={i} ac={it.color}>
              <a href={it.href} style={{ display:"block", padding:"24px 22px", textDecoration:"none" }}>
                <div style={{ fontSize:24, marginBottom:12 }}>{it.icon}</div>
                <div style={{ fontSize:10.5, fontWeight:700, textTransform:"uppercase",
                  letterSpacing:"0.07em", color:it.color, marginBottom:6 }}>{it.tag}</div>
                <div style={{ color:C.head, fontWeight:700, fontSize:16, marginBottom:8,
                  fontFamily:"'Akshar', sans-serif" }}>{it.title}</div>
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

/* ── CTA ── */
function CTA() {
  return (
    <section style={{ padding:"80px 5vw", background:C.surface, borderTop:`1px solid ${C.border}`,
      position:"relative" }}>
      <div style={{ maxWidth:660, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
        <H size="h2" style={{ color:C.head, marginBottom:14, fontFamily:"'Akshar', sans-serif", fontWeight:700 }}>
          Ready to Work with an LTC Pharmacy IT Team That Actually Gets It?
        </H>
        <P style={{ color:C.body, marginBottom:32, fontSize:16,
          fontFamily:"'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight:400 }}>
          Schedule a conversation. We'll review your current systems, identify the highest-impact opportunities, and give you a clear, honest plan — no fluff, no upsell.
        </P>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <Button variant="primary" size="md" to="/schedule-demo">Schedule a Consultation →</Button>
          <Button variant="secondary" size="md" href={`tel:${CONTACT_PHONE}`} style={{ fontSize:"0.9rem" }}>
            📞 {CONTACT_PHONE_DISPLAY}
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
export default function LTCPharmacyIT() {
  return (
    <>
            <Navbar />
      <Breadcrumb items={[{ label:"Home", href:"/" }, { label:"Services", href:"/services" }, { label:"LTC Pharmacy IT", href:null }]} />
      <main>
        <Hero />
        <Problem />
        <Capabilities />
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
