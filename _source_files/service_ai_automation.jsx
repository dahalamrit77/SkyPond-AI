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
    letterSpacing:"-0.026em", lineHeight:1.1,
    fontFamily:"'DM Sans',system-ui,sans-serif", ...style }}>{children}</h2>;
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
    ? {...base, background:"#fff", color:C.accent, boxShadow:"0 2px 14px rgba(0,0,0,0.13)"}
    : {...base, background:`linear-gradient(135deg,${C.accent},#0670A0)`, color:"#fff", boxShadow:`0 4px 20px ${C.accent}45`};
  return <Tag href={href} onClick={onClick} style={v}
    onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=light?"0 8px 24px rgba(0,0,0,0.18)":`0 8px 28px ${C.accent}60`; }}
    onMouseLeave={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow=light?"0 2px 14px rgba(0,0,0,0.13)":`0 4px 20px ${C.accent}45`; }}>
    {children}
  </Tag>;
}
function Card({ children, style={}, ac=C.accent, hover=true }) {
  const [h, setH] = useState(false);
  return <div onMouseEnter={()=>hover&&setH(true)} onMouseLeave={()=>hover&&setH(false)}
    style={{ background:C.surface, border:`1.5px solid ${h?ac+"44":C.border}`, borderRadius:16,
      transition:"all 0.2s", transform:h&&hover?"translateY(-4px)":"none",
      boxShadow:h&&hover?`0 16px 40px ${ac}1A`:"0 2px 8px rgba(0,0,0,0.04)", ...style }}>{children}</div>;
}

/* ── Live automation widget ── */
function AutoWidget() {
  const workflows = [
    { name:"Prior Authorization", before:45, after:8, unit:"min", icon:"📋", color:C.accent },
    { name:"DEA Compliance Report", before:180, after:5, unit:"min", icon:"🔍", color:C.p },
    { name:"Order Entry & Triage", before:6, after:0.5, unit:"min/order", icon:"💊", color:C.violet },
    { name:"Fax Processing", before:12, after:1.5, unit:"min/fax", icon:"📠", color:C.green },
    { name:"Document Filing & Archival", before:60, after:3, unit:"min", icon:"📁", color:C.amber },
  ];
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold:0.3 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ background:C.dark, borderRadius:20, overflow:"hidden",
      boxShadow:`0 24px 60px ${C.accent}30`, border:"1px solid rgba(255,255,255,0.07)", padding:"28px 28px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.35)",
            textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>Automation Impact</div>
          <div style={{ fontSize:17, fontWeight:800, color:"#fff", fontFamily:"'DM Sans',sans-serif" }}>Time Saved Per Workflow</div>
        </div>
        <div style={{ display:"flex", gap:14 }}>
          {[["Before", "rgba(255,255,255,0.18)"], ["After AI", C.accent]].map(([l,c]) => (
            <div key={l} style={{ display:"flex", gap:6, alignItems:"center" }}>
              <div style={{ width:10, height:10, borderRadius:2, background:c }} />
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.45)", fontWeight:600 }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {workflows.map((w, i) => {
        const pct = Math.round((1 - w.after / w.before) * 100);
        return (
          <div key={i} style={{ marginBottom:18, opacity:on?1:0, transform:on?"none":"translateY(8px)",
            transition:`opacity 0.5s ${i*0.1}s, transform 0.5s ${i*0.1}s` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <span style={{ fontSize:14 }}>{w.icon}</span>
                <span style={{ color:"rgba(255,255,255,0.8)", fontSize:13, fontWeight:600 }}>{w.name}</span>
              </div>
              <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                <span style={{ color:"rgba(255,255,255,0.3)", fontSize:12, textDecoration:"line-through" }}>{w.before}{w.unit}</span>
                <span style={{ color:w.color, fontWeight:800, fontSize:13 }}>→ {w.after}{w.unit}</span>
                <span style={{ color:C.green, fontWeight:800, fontSize:12,
                  background:`${C.green}18`, padding:"2px 7px", borderRadius:4 }}>↓{pct}%</span>
              </div>
            </div>
            <div style={{ position:"relative", height:8, borderRadius:4, background:"rgba(255,255,255,0.07)", overflow:"hidden" }}>
              <div style={{ position:"absolute", left:0, top:0, height:"100%", borderRadius:4,
                background:"rgba(255,255,255,0.15)",
                width: on ? `${(w.before / 180) * 100}%` : "0%",
                transition:`width 0.8s ${i*0.1}s ease-out` }} />
              <div style={{ position:"absolute", left:0, top:0, height:"100%", borderRadius:4,
                background:w.color,
                width: on ? `${(w.after / 180) * 100}%` : "0%",
                transition:`width 1s ${i*0.1+0.2}s ease-out` }} />
            </div>
          </div>
        );
      })}

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginTop:24 }}>
        {[["89%","Avg time reduction"], ["0","Errors added by AI"], ["24/7","Consistent performance"]].map(([v,l]) => (
          <div key={l} style={{ padding:"14px 12px", borderRadius:10, background:"rgba(255,255,255,0.05)",
            border:"1px solid rgba(255,255,255,0.08)", textAlign:"center" }}>
            <div style={{ fontSize:20, fontWeight:900, color:C.accent, fontFamily:"'DM Sans',sans-serif",
              letterSpacing:"-0.02em" }}>{v}</div>
            <div style={{ fontSize:10.5, color:"rgba(255,255,255,0.4)", marginTop:4 }}>{l}</div>
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
            onMouseEnter={e=>e.currentTarget.style.color=C.accent}
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
        backgroundImage:`linear-gradient(${C.accent}08 1px,transparent 1px),linear-gradient(90deg,${C.accent}08 1px,transparent 1px)`,
        backgroundSize:"52px 52px", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:-180, right:-80, width:700, height:700, borderRadius:"50%",
        background:`radial-gradient(circle,${C.accent}22 0%,transparent 68%)`, pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-80, left:-60, width:500, height:500, borderRadius:"50%",
        background:`radial-gradient(circle,${C.p}30 0%,transparent 68%)`, pointerEvents:"none" }} />

      <div style={{ maxWidth:1100, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.05fr 1fr", gap:64, alignItems:"center" }}>
          <div>
            <div style={{ display:"flex", gap:10, marginBottom:20, animation:"fadeUp 0.6s ease both" }}>
              <Badge c={C.accent}>⚙ Service</Badge>
              <Badge c={C.muted}>AI Automation</Badge>
            </div>
            <H size="hero" color="#fff" style={{ marginBottom:22, animation:"fadeUp 0.6s 0.1s ease both" }}>
              Replace Manual Bottlenecks with{" "}
              <span style={{ background:`linear-gradient(90deg,${C.accent},${C.p2})`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                Intelligent Automation
              </span>
            </H>
            <P style={{ maxWidth:520, color:"rgba(255,255,255,0.7)", marginBottom:32,
              fontSize:"1.08rem", animation:"fadeUp 0.6s 0.18s ease both" }}>
              We build AI workflows purpose-designed for LTC pharmacy — not repurposed from generic automation tools.
              Prior auth, DEA compliance reporting, order triage, fax processing — automated end-to-end, with full audit trails.
            </P>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", animation:"fadeUp 0.6s 0.25s ease both" }}>
              <PBtn href="/schedule">See It in Action →</PBtn>
              <a href="#automations" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"12px 24px",
                borderRadius:10, background:"transparent", color:"rgba(255,255,255,0.8)", fontWeight:600, fontSize:14.5,
                border:"1.5px solid rgba(255,255,255,0.2)", textDecoration:"none", transition:"border-color 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.5)"}
                onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.2)"}>
                See What We Automate ↓
              </a>
            </div>

            <div style={{ display:"flex", gap:0, marginTop:52,
              borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:32,
              animation:"fadeUp 0.6s 0.4s ease both" }}>
              {[["89%","Avg time reduction"],["Zero","Errors introduced"],["24/7","Consistent output"],["Weeks","Time to ROI"]].map(([v,l],i,a) => (
                <div key={i} style={{ flex:1, paddingRight:18,
                  borderRight:i<a.length-1?"1px solid rgba(255,255,255,0.1)":"none",
                  marginRight:i<a.length-1?18:0 }}>
                  <div style={{ fontSize:"clamp(1.4rem,2.2vw,1.9rem)", fontWeight:900, color:C.accent,
                    letterSpacing:"-0.03em", fontFamily:"'DM Sans',sans-serif" }}>{v}</div>
                  <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11.5, marginTop:2, fontWeight:500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ animation:"fadeUp 0.7s 0.2s ease both" }}>
            <AutoWidget />
          </div>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const pains = [
    { icon:"⏳", title:"Staff time consumed by repetitive data entry", desc:"Your technicians are entering the same prescription data multiple times across systems. Every manual step is a bottleneck that slows dispensing and burns out your team." },
    { icon:"📠", title:"Fax queues that grow faster than you can process them", desc:"LTC pharmacies receive hundreds of faxes daily. Manual sorting, extraction, and routing is one of the highest-cost, lowest-value activities in pharmacy operations." },
    { icon:"📋", title:"Prior auth backlogs that delay patient care", desc:"Prior authorization requests require structured documentation, follow-up, and status tracking. Handled manually, it's a process that takes 45+ minutes per case and creates denial risks." },
    { icon:"📊", title:"Compliance reports built manually every reporting cycle", desc:"DEA and regulatory reports that should take 5 minutes take hours because the data lives in multiple systems and has to be manually compiled, formatted, and filed." },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.surface }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:72, alignItems:"start" }}>
          <div>
            <div style={{ marginBottom:14 }}><Badge c={C.red}>⚠ The Problem</Badge></div>
            <H size="h2" style={{ marginBottom:18 }}>Your Staff Is Doing Work That Shouldn't Require a Human</H>
            <P style={{ marginBottom:16 }}>LTC pharmacies are data-intensive operations. The same structured information — prescriptions, patient records, compliance data — moves through multiple systems manually, multiple times per day.</P>
            <P style={{ marginBottom:16 }}>That's not an operational quirk. It's a solvable problem. AI automation doesn't replace your pharmacists — it eliminates the repetitive work so they can focus on clinical judgment, patient safety, and the decisions that actually require human expertise.</P>
            <div style={{ padding:"16px 18px", borderRadius:12, background:`${C.accent}08`,
              border:`1px solid ${C.accent}25`, marginTop:8 }}>
              <div style={{ fontSize:13.5, color:C.accent, fontWeight:600, lineHeight:1.6 }}>
                The goal isn't to automate everything. It's to identify which specific workflows in your pharmacy are pure manual overhead — and eliminate that overhead precisely.
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

function Automations() {
  const [active, setActive] = useState(0);
  const autos = [
    {
      icon:"📋", title:"Prior Authorization Automation", tag:"High Impact",
      before:"45 min / case", after:"8 min / case", saving:"83%",
      desc:"We automate the entire prior auth workflow — from identifying authorization requirements to generating structured documentation, submitting requests, tracking status, and flagging denials for follow-up. Built to work with your existing payer integrations.",
      steps:["Prescription triggers PA requirement check","Required documentation auto-compiled from patient record","Structured PA request generated and submitted","Status tracked with automatic follow-up reminders","Denials flagged to clinical team with appeal documentation ready"],
      color:C.accent,
    },
    {
      icon:"📠", title:"Fax Processing & Triage", tag:"Volume Reduction",
      before:"12 min / fax", after:"1.5 min / fax", saving:"88%",
      desc:"Incoming faxes are automatically received, classified (new Rx, renewal, PA response, clinical note), key data extracted, and routed to the correct workflow queue. Exceptions and ambiguous faxes are flagged for human review.",
      steps:["Fax received and classified by document type","Structured data extracted (patient, drug, prescriber, directions)","Routed to correct queue (new order, renewal, PA, etc.)","Prescriber DEA verification triggered automatically","Exceptions flagged with confidence score for human review"],
      color:C.p,
    },
    {
      icon:"💊", title:"Order Entry & Triage", tag:"Speed & Accuracy",
      before:"6 min / order", after:"0.5 min / order", saving:"92%",
      desc:"Prescription data is extracted, validated against your formulary and dispensing rules, DEA status verified, CS scheduling confirmed, and the order queued for RPh review — with a complete structured record and zero manual re-entry.",
      steps:["eRx or fax data extracted and structured","Patient and prescriber records matched","DEA verification and CS schedule confirmed","Dispensing rules applied (DAW, auto-refill, batch)","Packaged for RPh review with full audit trail"],
      color:C.violet,
    },
    {
      icon:"📊", title:"DEA Compliance Reporting", tag:"Regulatory",
      before:"3 hrs / report", after:"8 min / report", saving:"96%",
      desc:"DEA regulatory reports are assembled automatically from your pharmacy data — ARCOS submissions, DEA Form 222 tracking, CS inventory reconciliation — formatted correctly and filed on schedule. Audit trails maintained automatically.",
      steps:["CS transaction data aggregated across systems","ARCOS report formatted and validated","DEA Form 222 records reconciled","Discrepancies flagged before submission","Report filed and confirmation archived"],
      color:C.green,
    },
    {
      icon:"📁", title:"Document Generation & Archival", tag:"Compliance",
      before:"60 min / day", after:"3 min / day", saving:"95%",
      desc:"Compliance documents, patient correspondence, facility reports, and regulatory submissions are generated from templates with live data, routed for e-signature where required, and archived with full search and retrieval capability.",
      steps:["Document type and recipient identified","Template populated with live patient/pharmacy data","Routed for e-signature if required","Filed with structured metadata for retrieval","Audit trail linked to source transaction"],
      color:C.amber,
    },
  ];
  const a = autos[active];
  return (
    <section id="automations" style={{ padding:"88px 5vw", background:C.alt }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.accent}>⚡ What We Automate</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>5 High-Impact LTC Pharmacy Automations</H>
          <P style={{ maxWidth:480, margin:"0 auto" }}>Each automation is built specifically for LTC pharmacy workflows — not adapted from generic RPA tools.</P>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.2fr", gap:24 }}>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {autos.map((au,i) => (
              <button key={i} onClick={()=>setActive(i)} style={{ display:"flex", alignItems:"center",
                gap:14, padding:"14px 18px", borderRadius:12, textAlign:"left",
                background:active===i?`${au.color}0C`:"transparent",
                border:`1.5px solid ${active===i?au.color+"50":C.border}`,
                cursor:"pointer", transition:"all 0.18s", fontFamily:"inherit" }}>
                <span style={{ fontSize:20, width:40, height:40, borderRadius:10, flexShrink:0,
                  background:active===i?`${au.color}18`:C.surface,
                  display:"flex", alignItems:"center", justifyContent:"center" }}>{au.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ color:C.head, fontWeight:700, fontSize:13.5 }}>{au.title}</div>
                  <div style={{ color:au.color, fontSize:10.5, fontWeight:700,
                    textTransform:"uppercase", letterSpacing:"0.06em", marginTop:2 }}>{au.tag}</div>
                </div>
                {active===i && (
                  <span style={{ fontSize:12, fontWeight:800, color:C.green,
                    background:`${C.green}12`, padding:"3px 8px", borderRadius:5 }}>↓{au.saving}</span>
                )}
              </button>
            ))}
          </div>

          <Card ac={a.color} hover={false} style={{ padding:"30px 28px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
              <div style={{ display:"flex", alignItems:"center", gap:13 }}>
                <span style={{ fontSize:26, width:52, height:52, background:`${a.color}12`,
                  border:`1px solid ${a.color}28`, borderRadius:13,
                  display:"flex", alignItems:"center", justifyContent:"center" }}>{a.icon}</span>
                <div>
                  <span style={{ fontSize:10.5, fontWeight:700, textTransform:"uppercase",
                    letterSpacing:"0.08em", color:a.color }}>{a.tag}</span>
                  <H size="h3" style={{ marginTop:3, fontSize:16 }}>{a.title}</H>
                </div>
              </div>
            </div>

            <div style={{ display:"flex", gap:10, marginBottom:18 }}>
              {[["Before", a.before, C.muted], ["After AI", a.after, a.color], ["Saved", a.saving, C.green]].map(([l,v,c]) => (
                <div key={l} style={{ flex:1, padding:"10px 12px", borderRadius:9,
                  background:C.bg, border:`1px solid ${C.border}` }}>
                  <div style={{ fontSize:10, color:C.muted, fontWeight:700,
                    textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>{l}</div>
                  <div style={{ fontSize:15, fontWeight:800, color:c,
                    fontFamily:"'DM Sans',sans-serif" }}>{v}</div>
                </div>
              ))}
            </div>

            <P style={{ marginBottom:18, lineHeight:1.72, fontSize:"0.95rem" }}>{a.desc}</P>

            <div style={{ marginBottom:4 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase",
                letterSpacing:"0.07em", marginBottom:10 }}>How It Works</div>
              {a.steps.map((st,i) => (
                <div key={i} style={{ display:"flex", gap:10, marginBottom:8, alignItems:"flex-start" }}>
                  <div style={{ width:20, height:20, borderRadius:"50%", background:`${a.color}15`,
                    border:`1px solid ${a.color}30`, display:"flex", alignItems:"center",
                    justifyContent:"center", flexShrink:0, fontSize:10, fontWeight:800, color:a.color }}>{i+1}</div>
                  <span style={{ color:C.body, fontSize:13, lineHeight:1.5 }}>{st}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n:"01", title:"Workflow Discovery Session", desc:"We spend time inside your current workflows — watching how staff process faxes, enter orders, and handle compliance tasks — before we design anything. The automation matches your reality, not a generic template.", color:C.accent },
    { n:"02", title:"Automation Design & Approval", desc:"We map out each automation in plain language with your team. You see exactly what gets automated, what gets escalated to humans, and how exceptions are handled — before a single line of code is written.", color:C.p },
    { n:"03", title:"Build Against Your Live Systems", desc:"We build the automation integrated with your actual pharmacy management system, EHR, and data sources. No sandbox-only testing — we validate against real workflows.", color:C.violet },
    { n:"04", title:"Parallel Run & Validation", desc:"Before full deployment, the automation runs in parallel with your manual process. We compare outputs, measure accuracy, and tune edge case handling until the results are pharmacy-grade reliable.", color:C.green },
    { n:"05", title:"Deploy & Monitor", desc:"Automation goes live with full monitoring. Every run is logged, exceptions are surfaced immediately, and we track performance metrics week-over-week. You always know what the AI is doing.", color:C.accent },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.surface }}>
      <div style={{ maxWidth:860, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.p}>🗺 Process</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>How We Build Your Automations</H>
          <P style={{ maxWidth:440, margin:"0 auto" }}>A structured approach that gets automation live in weeks — not months — without disrupting your pharmacy operations.</P>
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
                color:s.color, fontFamily:"'DM Sans',sans-serif" }}>{s.n}</div>
              <div>
                <div style={{ color:C.head, fontWeight:700, fontSize:16, marginBottom:6,
                  fontFamily:"'DM Sans',sans-serif" }}>{s.title}</div>
                <div style={{ color:C.body, fontSize:14.5, lineHeight:1.68 }}>{s.desc}</div>
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
    { icon:"🏥", title:"Prior Auth Backlog Elimination",
      who:"LTC pharmacy with 3-day PA backlog causing patient care delays",
      outcome:"Prior auth automation reduced average processing time from 45 to 8 minutes. Backlog cleared in 2 weeks, denial rate dropped 22% due to more complete initial submissions." },
    { icon:"📠", title:"Fax Processing at Scale",
      who:"Regional LTC pharmacy processing 400+ faxes daily with 4 staff",
      outcome:"Automated fax triage and data extraction reduced manual fax handling by 88%. Staff redirected to clinical review and exception management." },
    { icon:"📊", title:"DEA Reporting Automation",
      who:"Multi-facility LTC pharmacy spending 3 hours per DEA report cycle",
      outcome:"ARCOS report generation automated end-to-end. Reporting cycle reduced from 3 hours to 8 minutes. Zero missed submissions in 12 months post-deployment." },
    { icon:"💊", title:"Order Entry Throughput",
      who:"LTC pharmacy with order entry backlog during peak census periods",
      outcome:"AI order triage automated 70% of routine orders, reducing average entry time from 6 minutes to under 1 minute. RPh review volume unaffected — clinical oversight maintained throughout." },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.alt }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.violet}>📁 Results</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>What Happens After Automation</H>
          <P style={{ maxWidth:440, margin:"0 auto" }}>Real outcomes from LTC pharmacy automation engagements — not projected estimates.</P>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
          {cases.map((c,i) => (
            <Card key={i} ac={C.accent} style={{ padding:"26px 24px" }}>
              <div style={{ fontSize:28, marginBottom:14 }}>{c.icon}</div>
              <H size="h3" style={{ marginBottom:8, fontSize:16 }}>{c.title}</H>
              <div style={{ display:"flex", gap:7, marginBottom:12, alignItems:"flex-start" }}>
                <span style={{ fontSize:11, padding:"2px 8px", borderRadius:4, background:`${C.accent}0C`,
                  color:C.accent, fontWeight:700, flexShrink:0, marginTop:1 }}>WHO</span>
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
    { q:"Does automation replace our pharmacists?", a:"No — and this is the most important thing to understand. Our automations handle structured, repetitive tasks that don't require clinical judgment. Pharmacists and pharmacy staff still review every order, manage clinical exceptions, and make every decision that requires expertise. The AI handles the overhead so your team can focus on what actually requires them." },
    { q:"What if the automation makes a mistake?", a:"Every automation we build has a defined exception pathway. When the AI encounters something outside its confidence threshold — an ambiguous prescription, an unusual patient scenario, a system discrepancy — it flags it immediately for human review rather than proceeding. We monitor accuracy metrics continuously and the system improves over time." },
    { q:"Will this work with our existing pharmacy management system?", a:"Yes. We build integrations with all major LTC pharmacy systems — BestRx, QS1, SoftWriters, PioneerRx, Liberty, and others. We use Vision AI for systems without APIs, which means no vendor dependency or PMS replacement required." },
    { q:"How long does it take to deploy an automation?", a:"Most single-workflow automations are live within 3–5 weeks. Complex multi-system workflows take 6–10 weeks. We give you a clear timeline during discovery, and we don't go live until the parallel-run validation meets our accuracy standards." },
    { q:"Is PHI handled securely?", a:"All automations are built HIPAA-compliant by default: encryption in transit and at rest, no PHI retention in third-party systems, full audit logging, and BAA agreements in place. We design for zero data exposure from the architecture up." },
    { q:"Can we start with just one workflow?", a:"Absolutely — and that's usually the right approach. We typically recommend starting with the single highest-impact bottleneck, validating the results, and then expanding. Most clients start with fax processing or prior auth and add workflows from there." },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.surface }}>
      <div style={{ maxWidth:780, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.p}>❓ FAQ</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>Questions We Get Asked</H>
          <P style={{ maxWidth:400, margin:"0 auto" }}>Straight answers to what LTC pharmacy teams ask before automating.</P>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {faqs.map((f,i) => (
            <div key={i} style={{ borderRadius:12, border:`1.5px solid ${open===i?C.accent+"44":C.border}`,
              overflow:"hidden", transition:"border-color 0.2s",
              boxShadow:open===i?`0 4px 20px ${C.accent}10`:"none" }}>
              <button onClick={()=>setOpen(open===i?null:i)}
                style={{ width:"100%", padding:"18px 22px", display:"flex", alignItems:"center",
                  justifyContent:"space-between", background:open===i?`${C.accent}06`:C.surface,
                  border:"none", cursor:"pointer", fontFamily:"inherit", textAlign:"left", transition:"background 0.2s" }}>
                <span style={{ color:C.head, fontWeight:700, fontSize:15 }}>{f.q}</span>
                <span style={{ color:C.accent, fontSize:18, fontWeight:700, flexShrink:0, marginLeft:12,
                  transform:open===i?"rotate(45deg)":"none", transition:"transform 0.2s" }}>+</span>
              </button>
              {open===i && (
                <div style={{ padding:"0 22px 18px", background:`${C.accent}06` }}>
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
    { icon:"🏥", color:C.p, tag:"Service", title:"LTC Pharmacy IT", href:"/services/ltc-pharmacy-it",
      desc:"Custom LTC pharmacy applications, telepharmacy platforms, and full-stack system integrations." },
    { icon:"📊", color:C.violet, tag:"Service", title:"Data Analytics & Power BI", href:"/services/data-analytics",
      desc:"Custom dashboards and analytics pipelines that make your pharmacy data genuinely actionable." },
    { icon:"📄", color:C.accent, tag:"Product", title:"Document Automation", href:"/products/document-automation",
      desc:"AI-powered prior auth generation, compliance templating, and audit-ready archival." },
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
                  fontFamily:"'DM Sans',sans-serif" }}>{it.title}</div>
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
        background:`radial-gradient(circle,${C.accent}45 0%,transparent 70%)`, pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-70, left:0, width:360, height:360, borderRadius:"50%",
        background:`radial-gradient(circle,${C.p}44 0%,transparent 70%)`, pointerEvents:"none" }} />
      <div style={{ maxWidth:660, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
        <H size="h2" style={{ color:"#fff", marginBottom:14 }}>
          Ready to See What Gets Automated in Your Pharmacy?
        </H>
        <P style={{ color:"rgba(255,255,255,0.68)", marginBottom:32, fontSize:16 }}>
          Schedule a workflow discovery session with our team. We'll map your current manual processes, identify the 2–3 highest-impact automations, and show you exactly what the ROI looks like before you commit to anything.
        </P>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <PBtn light href="/schedule">Book a Discovery Session →</PBtn>
          <a href="tel:+17207246828" style={{ display:"inline-flex", alignItems:"center", gap:8,
            padding:"12px 24px", borderRadius:10, background:"transparent",
            color:"rgba(255,255,255,0.78)", fontWeight:600, fontSize:14, textDecoration:"none",
            border:"1.5px solid rgba(255,255,255,0.22)", fontFamily:"inherit" }}
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
              onMouseEnter={e=>e.currentTarget.style.color=C.accent}
              onMouseLeave={e=>e.currentTarget.style.color=C.muted}>{l}</a>
          ))}
        </div>
        <span style={{ color:C.muted, fontSize:12.5 }}>© 2025 Skypond Tech Pvt. Ltd.</span>
      </div>
    </footer>
  );
}

export default function AIAutomation() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:#1C3053;color:#3A3E60;font-family:'DM Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);}}
        ::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-track{background:#1C3053;}
        ::-webkit-scrollbar-thumb{background:#2E3190;border-radius:3px;}
      `}</style>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Automations />
        <HowItWorks />
        <UseCases />
        <FAQ />
        <Related />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
