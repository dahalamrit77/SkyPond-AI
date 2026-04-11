import C from '../../tokens.js'
import { useState, useEffect, useRef } from "react";
import { Navbar } from '../../components/Navbar.jsx'
import { Footer } from '../../components/Footer.jsx'
import { Breadcrumb } from '../../components/Breadcrumb.jsx'
import { ShieldCheck, Smartphone, Link as LinkIcon, Settings, BarChart3, Hospital, Cloud, Wrench } from 'lucide-react'
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '../../config/constants.js'

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
    ? {...base, background:"#fff", color:C.p, boxShadow:"0 2px 14px rgba(0,0,0,0.13)"}
    : {...base, background:`linear-gradient(135deg,${C.p},${C.pd})`, color:"#fff", boxShadow:`0 4px 20px ${C.p}45`};
  return <Tag href={href} onClick={onClick} style={v}
    onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=light?"0 8px 24px rgba(0,0,0,0.18)":`0 8px 28px ${C.p}60`; }}
    onMouseLeave={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow=light?"0 2px 14px rgba(0,0,0,0.13)":`0 4px 20px ${C.p}45`; }}>
    {children}
  </Tag>;
}
function Card({ children, style={}, ac=C.p, hover=true }) {
  const [h, setH] = useState(false);
  return <div onMouseEnter={()=>hover&&setH(true)} onMouseLeave={()=>hover&&setH(false)}
    style={{ background:C.surface, border:`1.5px solid ${h?ac+"44":C.border}`, borderRadius:16,
      transition:"all 0.2s", transform:h&&hover?"translateY(-4px)":"none",
      boxShadow:h&&hover?`0 16px 40px ${ac}1A`:"0 2px 8px rgba(0,0,0,0.04)", ...style }}>{children}</div>;
}

function TechStack() {
  const tiers = [
    { label:"Frontend", color:C.p, items:["React","Next.js","TypeScript","Tailwind CSS","React Native"] },
    { label:"Backend", color:C.accent, items:["Node.js","Python","REST APIs","GraphQL","Microservices"] },
    { label:"Cloud & Data", color:C.violet, items:["Microsoft Azure","Power BI","SQL Server","PostgreSQL","Azure Functions"] },
    { label:"Integration", color:C.green, items:["PointClickCare API","HL7 / FHIR","Pharmacy PMS APIs","Webhook pipelines","ETL pipelines"] },
  ];
  return (
    <div style={{ background:C.dark, borderRadius:20, padding:"28px 26px",
      boxShadow:`0 24px 60px ${C.p}30`, border:"1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.3)",
        textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:20 }}>Technology Stack</div>
      {tiers.map((tier, i) => (
        <div key={i} style={{ marginBottom:i < tiers.length-1 ? 18 : 0 }}>
          <div style={{ fontSize:11, fontWeight:700, color:tier.color,
            textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>{tier.label}</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
            {tier.items.map((item, j) => (
              <span key={j} style={{ padding:"5px 11px", borderRadius:7, fontSize:12.5, fontWeight:600,
                background:`${tier.color}18`, border:`1px solid ${tier.color}35`, color:"rgba(255,255,255,0.75)",
                transition:"all 0.15s", cursor:"default" }}
                onMouseEnter={e=>{ e.currentTarget.style.background=`${tier.color}30`; e.currentTarget.style.color="#fff"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background=`${tier.color}18`; e.currentTarget.style.color="rgba(255,255,255,0.75)"; }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
      <div style={{ marginTop:22, padding:"14px 16px", borderRadius:10,
        background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontSize:11.5, color:"rgba(255,255,255,0.5)", lineHeight:1.6 }}>
          Every stack decision is made based on your specific LTC pharmacy workflow requirements — not a default template.
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section style={{ minHeight:"88vh", display:"flex", alignItems:"center",
      padding:"120px 5vw 80px", position:"relative", overflow:"hidden", background:C.dark }}>
      <div style={{ position:"absolute", inset:0,
        backgroundImage:`linear-gradient(${C.p}08 1px,transparent 1px),linear-gradient(90deg,${C.p}08 1px,transparent 1px)`,
        backgroundSize:"52px 52px", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:-180, right:-80, width:700, height:700, borderRadius:"50%",
        background:`radial-gradient(circle,${C.p}22 0%,transparent 68%)`, pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-80, left:-60, width:500, height:500, borderRadius:"50%",
        background:`radial-gradient(circle,${C.violet}24 0%,transparent 68%)`, pointerEvents:"none" }} />

      <div style={{ maxWidth:1100, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.05fr 1fr", gap:64, alignItems:"center" }}>
          <div>
            <div style={{ display:"flex", gap:10, marginBottom:20, animation:"fadeUp 0.6s ease both" }}>
              <Badge c={C.p}>💻 Service</Badge>
              <Badge c={C.muted}>Custom Development</Badge>
            </div>
            <H size="hero" color="#fff" style={{ marginBottom:22, animation:"fadeUp 0.6s 0.1s ease both" }}>
              Software Built Around{" "}
              <span style={{ background:`linear-gradient(90deg,${C.p},${C.violet})`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                Your LTC Workflows
              </span>
            </H>
            <P style={{ maxWidth:520, color:"rgba(255,255,255,0.7)", marginBottom:32, fontSize:"1.08rem", animation:"fadeUp 0.6s 0.18s ease both" }}>
              Off-the-shelf software wasn't designed for LTC pharmacy. We build the custom applications, internal tools, and system integrations that match exactly how your pharmacy actually operates — with LTC domain knowledge built in from day one.
            </P>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", animation:"fadeUp 0.6s 0.25s ease both" }}>
              <PBtn href="/schedule-demo">Discuss Your Project →</PBtn>
              <a href="#whatwebuild" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"12px 24px",
                borderRadius:10, background:"transparent", color:"rgba(255,255,255,0.8)", fontWeight:600, fontSize:14.5,
                border:"1.5px solid rgba(255,255,255,0.2)", textDecoration:"none", transition:"border-color 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.5)"}
                onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.2)"}>
                See What We Build ↓
              </a>
            </div>
            <div style={{ display:"flex", gap:0, marginTop:52, borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:30,
              animation:"fadeUp 0.6s 0.4s ease both" }}>
              {[["LTC","Domain expertise"],["Full-stack","React · Node · Azure"],["HIPAA","Compliant builds"],["50+","Projects delivered"]].map(([v,l],i,a) => (
                <div key={i} style={{ flex:1, paddingRight:16,
                  borderRight:i<a.length-1?"1px solid rgba(255,255,255,0.1)":"none", marginRight:i<a.length-1?16:0 }}>
                  <div style={{ fontSize:"clamp(1rem,1.5vw,1.3rem)", fontWeight:900, color:C.p,
                    letterSpacing:"-0.02em", fontFamily:"'DM Sans',sans-serif" }}>{v}</div>
                  <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11.5, marginTop:2, fontWeight:500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ animation:"fadeUp 0.7s 0.2s ease both" }}>
            <TechStack />
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatWeBuild() {
  const [active, setActive] = useState(0);
  const builds = [
    { icon:<Smartphone size={20} />, color:C.p, tag:"Web & Mobile", title:"Telepharmacy & Patient-Facing Applications",
      desc:"Web and mobile applications for telepharmacy delivery, patient medication management, RPh remote review, and facility portal access. Built with HIPAA-compliant architecture and LTC-specific workflow logic.",
      examples:["RPh remote review interface","Patient medication history portal","Facility staff order status portal","Mobile dispensing confirmation app","Telepharmacy video consultation platform"] },
    { icon:<LinkIcon size={20} />, color:C.accent, tag:"Integration", title:"System Integration & Data Pipelines",
      desc:"Custom data bridges between your pharmacy system, EHR platforms, billing systems, and external databases. We handle field mapping, transformation, error handling, and monitoring.",
      examples:["PMS-to-EHR bidirectional feeds","Billing system reconciliation","Insurance verification APIs","DEA database integration","Census-to-order automation pipelines"] },
    { icon:<Settings size={20} />, color:C.violet, tag:"Internal Tools", title:"Internal Operations Tools",
      desc:"Custom internal applications that replace spreadsheets and manual processes — workflow management, exception queuing, compliance tracking, staff assignment, and operational reporting.",
      examples:["Compliance exception management system","Staff workflow assignment tool","Order priority queue manager","Facility communication platform","Audit documentation system"] },
    { icon:<BarChart3 size={20} />, color:C.green, tag:"Reporting", title:"Custom Reporting & Automation",
      desc:"Automated reporting systems that pull data from multiple sources, format it correctly, and deliver it on schedule — eliminating manual report compilation entirely.",
      examples:["Automated DEA compliance reports","Facility performance report delivery","Executive summary automation","Survey-ready documentation packages","Billing reconciliation reports"] },
    { icon:<ShieldCheck size={20} />, color:C.amber, tag:"Compliance", title:"Regulatory & Compliance Infrastructure",
      desc:"Purpose-built compliance tools: DEA verification, CS audit trails, ARCOS reporting systems, prior authorization platforms, and document management with full audit history.",
      examples:["DEA registration verification system","CS inventory audit trail","Prior auth workflow platform","Document generation & e-signature","State board reporting tools"] },
  ];
  const b = builds[active];
  return (
    <section id="whatwebuild" style={{ padding:"88px 5vw", background:C.alt }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.p}>🔨 What We Build</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>Five Categories of Custom LTC Pharmacy Software</H>
          <P style={{ maxWidth:480, margin:"0 auto" }}>From patient-facing apps to internal compliance tools — built for LTC pharmacy, not adapted from generic software.</P>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.2fr", gap:24 }}>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {builds.map((bd,i) => (
              <button key={i} onClick={()=>setActive(i)} style={{ display:"flex", alignItems:"center",
                gap:14, padding:"14px 18px", borderRadius:12, textAlign:"left",
                background:active===i?`${bd.color}0C`:"transparent",
                border:`1.5px solid ${active===i?bd.color+"50":C.border}`,
                cursor:"pointer", transition:"all 0.18s", fontFamily:"inherit" }}>
                <span style={{ fontSize:20, width:40, height:40, borderRadius:10, flexShrink:0,
                  background:active===i?`${bd.color}18`:C.surface,
                  display:"flex", alignItems:"center", justifyContent:"center" }}>{bd.icon}</span>
                <div>
                  <div style={{ color:C.head, fontWeight:700, fontSize:13.5 }}>{bd.title}</div>
                  <div style={{ color:bd.color, fontSize:10.5, fontWeight:700,
                    textTransform:"uppercase", letterSpacing:"0.06em", marginTop:2 }}>{bd.tag}</div>
                </div>
              </button>
            ))}
          </div>
          <Card ac={b.color} hover={false} style={{ padding:"30px 28px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:13, marginBottom:20 }}>
              <span style={{ fontSize:26, width:52, height:52, background:`${b.color}12`,
                border:`1px solid ${b.color}28`, borderRadius:13,
                display:"flex", alignItems:"center", justifyContent:"center" }}>{b.icon}</span>
              <div>
                <span style={{ fontSize:10.5, fontWeight:700, textTransform:"uppercase",
                  letterSpacing:"0.08em", color:b.color }}>{b.tag}</span>
                <H size="h3" style={{ marginTop:3, fontSize:17 }}>{b.title}</H>
              </div>
            </div>
            <P style={{ marginBottom:20, lineHeight:1.74, fontSize:"0.95rem" }}>{b.desc}</P>
            <div style={{ marginBottom:4 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase",
                letterSpacing:"0.07em", marginBottom:10 }}>Example Projects</div>
              <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                {b.examples.map((ex,i) => (
                  <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start",
                    padding:"9px 12px", borderRadius:8, background:C.bg, border:`1px solid ${C.border}` }}>
                    <span style={{ color:b.color, fontWeight:800, fontSize:12, marginTop:1 }}>→</span>
                    <span style={{ color:C.body, fontSize:13.5 }}>{ex}</span>
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
    { n:"01", title:"Requirements & Scope Definition", desc:"We run structured discovery sessions with your operational, clinical, and IT stakeholders to define exact requirements — not a sales discovery call, but a genuine technical scope document with user stories, acceptance criteria, and constraints.", color:C.p },
    { n:"02", title:"Architecture Design", desc:"We design the application architecture, data model, integration points, and security model before writing any code. You review and approve the design — no surprises during build.", color:C.accent },
    { n:"03", title:"Iterative Build with Weekly Demos", desc:"We build in 2-week sprints with a working demo at the end of each. You see real progress, provide feedback, and shape the product throughout development — not just at the end.", color:C.violet },
    { n:"04", title:"QA & Compliance Validation", desc:"Every build goes through structured QA: functional testing, security review, HIPAA compliance validation, and performance testing. Compliance is verified before, not after, deployment.", color:C.green },
    { n:"05", title:"Deployment & Training", desc:"We deploy to your environment, train your team, and provide full technical documentation. Go-live is planned for low-disruption timing — usually overnight or over a weekend.", color:C.amber },
    { n:"06", title:"Ongoing Support & Iteration", desc:"Most clients continue with us post-launch — new features, regulatory changes, integrations with new systems. We stay involved so the software evolves with your pharmacy.", color:C.p },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.surface }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.accent}>🗺 Process</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>How We Build Custom Software</H>
          <P style={{ maxWidth:440, margin:"0 auto" }}>An iterative, transparent process that keeps you in control from requirements through go-live.</P>
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
    { icon:<Smartphone size={18} />, title:"Telepharmacy Platform Build",
      who:"Independent LTC pharmacy expanding into remote RPh review",
      outcome:"Full telepharmacy application with RPh review interface, facility portal, PMS integration, and HIPAA-compliant architecture built in 12 weeks. Now serving 8 LTC facilities remotely." },
    { icon:<Settings size={18} />, title:"Internal Compliance Management Tool",
      who:"LTC pharmacy with no centralized compliance exception tracking",
      outcome:"Custom web app built to manage DEA exceptions, CS discrepancies, and prior auth follow-ups. Compliance team went from spreadsheets to a structured system with full audit trail in 6 weeks." },
    { icon:<LinkIcon size={18} />, title:"Multi-System Integration Layer",
      who:"Regional LTC pharmacy chain needing pharmacy, billing, and EHR connected",
      outcome:"Custom integration layer connecting PMS, PointClickCare, and billing system. Eliminated 4 hours per day of manual data bridging across 3 systems." },
    { icon:<BarChart3 size={18} />, title:"Facility Reporting Portal",
      who:"LTC pharmacy whose facility clients were calling for order status updates",
      outcome:"Self-service facility portal built with real-time order status, dispense history, and reconciliation reports. Inbound status calls dropped 80% in the first month post-launch." },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.alt }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.violet}>📁 Projects</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>Custom Software We've Shipped</H>
          <P style={{ maxWidth:440, margin:"0 auto" }}>Real custom development projects for LTC pharmacies — not hypothetical examples.</P>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
          {cases.map((c,i) => (
            <Card key={i} ac={C.p} style={{ padding:"26px 24px" }}>
              <div style={{ fontSize:28, marginBottom:14 }}>{c.icon}</div>
              <H size="h3" style={{ marginBottom:8, fontSize:16 }}>{c.title}</H>
              <div style={{ display:"flex", gap:7, marginBottom:12, alignItems:"flex-start" }}>
                <span style={{ fontSize:11, padding:"2px 8px", borderRadius:4, background:`${C.p}0C`,
                  color:C.p, fontWeight:700, flexShrink:0, marginTop:1 }}>WHO</span>
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
    { q:"How do you price custom development projects?", a:"We scope and price projects based on requirements, not time-and-materials. After a discovery session we give you a fixed-price proposal covering design, development, QA, and deployment. No surprise invoices mid-project." },
    { q:"How long do custom projects typically take?", a:"A focused internal tool or single-workflow application is typically 4–8 weeks. A full-stack application with integrations and a user-facing interface is usually 10–16 weeks. We give you a clear timeline in the proposal before anything begins." },
    { q:"Do we own the code after delivery?", a:"Yes. All custom code built for your project is fully owned by you. We provide the complete codebase, documentation, and deployment configuration. You're never dependent on us to access or modify what we've built." },
    { q:"Can you work with our existing development team?", a:"Absolutely. We can build independently, work alongside your internal team, or provide a senior LTC-specialist developer to augment your team on a project basis." },
    { q:"How do you handle HIPAA compliance in custom builds?", a:"HIPAA compliance is built in from the architecture layer — not added as an afterthought. Every build includes encryption at rest and in transit, role-based access control, audit logging, PHI data handling policies, and a BAA in place before any PHI is accessed." },
    { q:"What happens after delivery if we need changes?", a:"Most clients continue on a support and iteration retainer after delivery. For clients who want full independence, we provide complete handoff documentation and a knowledge transfer session with your team. We're available on an as-needed basis either way." },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.surface }}>
      <div style={{ maxWidth:780, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.p}>❓ FAQ</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>Questions We Get Asked</H>
          <P style={{ maxWidth:400, margin:"0 auto" }}>What LTC pharmacy teams ask before starting a custom development project.</P>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {faqs.map((f,i) => (
            <div key={i} style={{ borderRadius:12, border:`1.5px solid ${open===i?C.p+"44":C.border}`,
              overflow:"hidden", transition:"border-color 0.2s", boxShadow:open===i?`0 4px 20px ${C.p}10`:"none" }}>
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

function Related() {
  const items = [
    { icon:<Hospital size={20} />, color:C.p, tag:"Service", title:"LTC Pharmacy IT", href:"/services/ltc-pharmacy-it", desc:"Telepharmacy platforms, system migrations, and compliance tooling for LTC pharmacies." },
    { icon:<Settings size={20} />, color:C.accent, tag:"Service", title:"AI Automation", href:"/services/ai-automation", desc:"Intelligent workflow automation replacing manual bottlenecks in your pharmacy." },
    { icon:<Cloud size={20} />, color:C.violet, tag:"Service", title:"Microsoft Cloud", href:"/services/microsoft-cloud", desc:"Azure, Microsoft 365, and Power Platform configured for healthcare compliance." },
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
        background:`radial-gradient(circle,${C.p}55 0%,transparent 70%)`, pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-70, left:0, width:360, height:360, borderRadius:"50%",
        background:`radial-gradient(circle,${C.violet}44 0%,transparent 70%)`, pointerEvents:"none" }} />
      <div style={{ maxWidth:660, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
        <H size="h2" style={{ color:"#fff", marginBottom:14 }}>Have a Custom LTC Pharmacy Software Problem?</H>
        <P style={{ color:"rgba(255,255,255,0.68)", marginBottom:32, fontSize:16 }}>
          Tell us what you're trying to build or fix. We'll review the requirements, give you an honest assessment of scope and cost, and let you decide if we're the right fit — no pressure, no obligation.
        </P>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <PBtn light href="/schedule-demo">Discuss Your Project →</PBtn>
          <a href={`tel:${CONTACT_PHONE}`} style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"12px 24px",
            borderRadius:10, background:"transparent", color:"rgba(255,255,255,0.78)", fontWeight:600, fontSize:14,
            textDecoration:"none", border:"1.5px solid rgba(255,255,255,0.22)", fontFamily:"inherit" }}
            onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.55)"}
            onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.22)"}>
            📞 {CONTACT_PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}

export default function CustomDevelopment() {
  return (
    <>
            <Navbar />
      <Breadcrumb items={[{ label:"Home", href:"/" }, { label:"Services", href:"/services" }, { label:"Custom Development", href:null }]} />
      <main>
        <Hero />
        <WhatWeBuild />
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
