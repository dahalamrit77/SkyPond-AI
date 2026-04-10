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
    ? {...base, background:"#fff", color:C.violet, boxShadow:"0 2px 14px rgba(0,0,0,0.13)"}
    : {...base, background:`linear-gradient(135deg,${C.violet},#5B21B6)`, color:"#fff", boxShadow:`0 4px 20px ${C.violet}45`};
  return <Tag href={href} onClick={onClick} style={v}
    onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=light?"0 8px 24px rgba(0,0,0,0.18)":`0 8px 28px ${C.violet}60`; }}
    onMouseLeave={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow=light?"0 2px 14px rgba(0,0,0,0.13)":`0 4px 20px ${C.violet}45`; }}>
    {children}
  </Tag>;
}
function Card({ children, style={}, ac=C.violet, hover=true }) {
  const [h, setH] = useState(false);
  return <div onMouseEnter={()=>hover&&setH(true)} onMouseLeave={()=>hover&&setH(false)}
    style={{ background:C.surface, border:`1.5px solid ${h?ac+"44":C.border}`, borderRadius:16,
      transition:"all 0.2s", transform:h&&hover?"translateY(-4px)":"none",
      boxShadow:h&&hover?`0 16px 40px ${ac}1A`:"0 2px 8px rgba(0,0,0,0.04)", ...style }}>{children}</div>;
}

/* ── Live dashboard widget ── */
function DashboardWidget() {
  const [tab, setTab] = useState("30D");
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold:0.2 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  const kpis = [
    { l:"Rx / Month", v:"3,241", d:"+6.2%", c:C.violet, up:true },
    { l:"Facilities Served", v:"18", d:"+2 this quarter", c:C.p, up:true },
    { l:"Error Rate", v:"0.18%", d:"-0.04% vs last mo", c:C.green, up:false },
    { l:"Avg Fill Time", v:"4.2m", d:"-0.8m vs last mo", c:C.accent, up:false },
  ];

  const dispensing = [
    { label:"Oct", v:2840 }, { label:"Nov", v:2950 }, { label:"Dec", v:3010 },
    { label:"Jan", v:3080 }, { label:"Feb", v:3160 }, { label:"Mar", v:3241 },
  ];
  const maxV = 3400;
  const W = 280, H_chart = 80;
  const pts = dispensing.map((d,i) => `${(i/(dispensing.length-1))*W},${H_chart - (d.v/maxV)*H_chart}`).join(" ");

  const facilities = [
    { name:"Sunrise Memory Care", score:97, color:C.green },
    { name:"Oakwood Skilled Nursing", score:91, color:C.violet },
    { name:"Valley View LTC", score:88, color:C.accent },
    { name:"Ridgeline Rehab Center", score:74, color:C.amber },
  ];

  return (
    <div ref={ref} style={{ background:C.dark, borderRadius:20, overflow:"hidden",
      boxShadow:`0 28px 72px ${C.violet}35`, border:"1px solid rgba(255,255,255,0.07)" }}>
      {/* Titlebar */}
      <div style={{ padding:"10px 18px", borderBottom:"1px solid rgba(255,255,255,0.07)",
        display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", gap:6 }}>
          {["#FF5F57","#FEBC2E","#28C840"].map(c=>(
            <div key={c} style={{ width:11, height:11, borderRadius:"50%", background:c }} />
          ))}
        </div>
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", fontWeight:600, letterSpacing:"0.06em" }}>
          SKYPOND ANALYTICS · POWER BI
        </div>
        <div style={{ display:"flex", gap:6, alignItems:"center" }}>
          {["30D","90D","12M"].map(t => (
            <button key={t} onClick={()=>setTab(t)} style={{ padding:"3px 8px", borderRadius:5, border:"none",
              cursor:"pointer", fontSize:10.5, fontWeight:700, fontFamily:"inherit",
              background:tab===t?`${C.violet}60`:"rgba(255,255,255,0.07)",
              color:tab===t?"#fff":"rgba(255,255,255,0.35)", transition:"all 0.15s" }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ padding:"20px 20px" }}>
        {/* KPI grid */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:10, marginBottom:20 }}>
          {kpis.map((k,i) => (
            <div key={i} style={{ padding:"12px 12px", borderRadius:10,
              background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)",
              opacity:on?1:0, transform:on?"none":"translateY(6px)",
              transition:`opacity 0.4s ${i*0.08}s, transform 0.4s ${i*0.08}s` }}>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.35)", marginBottom:6 }}>{k.l}</div>
              <div style={{ fontSize:18, fontWeight:900, color:k.c, fontFamily:"'DM Sans',sans-serif",
                letterSpacing:"-0.02em", lineHeight:1 }}>{k.v}</div>
              <div style={{ fontSize:10, marginTop:5,
                color:k.up ? C.green : C.green, fontWeight:600 }}>
                {k.up ? "▲" : "▼"} {k.d}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          {/* Sparkline chart */}
          <div style={{ padding:"14px 14px", borderRadius:12, background:"rgba(255,255,255,0.04)",
            border:"1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
              <span style={{ fontSize:11.5, color:"rgba(255,255,255,0.6)", fontWeight:600 }}>Dispensing Trend</span>
              <span style={{ fontSize:10, color:C.green, fontWeight:700 }}>▲ 14.1% YTD</span>
            </div>
            {on && (
              <svg width={W} height={H_chart} style={{ display:"block", overflow:"visible" }}>
                <defs>
                  <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.violet} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={C.violet} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polyline fill="none" stroke={C.violet} strokeWidth={2.5}
                  strokeLinecap="round" strokeLinejoin="round" points={pts} />
                {dispensing.map((d,i) => (
                  <circle key={i} cx={(i/(dispensing.length-1))*W}
                    cy={H_chart-(d.v/maxV)*H_chart} r={i===dispensing.length-1?4:2.5}
                    fill={C.violet} opacity={i===dispensing.length-1?1:0.5} />
                ))}
              </svg>
            )}
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:8 }}>
              {dispensing.map(d => (
                <span key={d.label} style={{ fontSize:9.5, color:"rgba(255,255,255,0.25)" }}>{d.label}</span>
              ))}
            </div>
          </div>

          {/* Facility performance */}
          <div style={{ padding:"14px 14px", borderRadius:12, background:"rgba(255,255,255,0.04)",
            border:"1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ fontSize:11.5, color:"rgba(255,255,255,0.6)", fontWeight:600, marginBottom:12 }}>
              Facility Performance
            </div>
            {facilities.map((f,i) => (
              <div key={i} style={{ marginBottom:10, opacity:on?1:0,
                transition:`opacity 0.4s ${0.3+i*0.08}s` }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <span style={{ fontSize:11, color:"rgba(255,255,255,0.5)" }}>{f.name}</span>
                  <span style={{ fontSize:11, fontWeight:700, color:f.color }}>{f.score}%</span>
                </div>
                <div style={{ height:5, borderRadius:3, background:"rgba(255,255,255,0.07)", overflow:"hidden" }}>
                  <div style={{ height:"100%", borderRadius:3, background:f.color,
                    width:on?`${f.score}%`:"0%",
                    transition:`width 0.8s ${0.3+i*0.08}s ease-out` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
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
            onMouseEnter={e=>e.currentTarget.style.color=C.violet}
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
      padding:"120px 5vw 80px", position:"relative", overflow:"hidden", background:C.bg }}>
      <div style={{ position:"absolute", inset:0,
        backgroundImage:`linear-gradient(${C.violet}06 1px,transparent 1px),linear-gradient(90deg,${C.violet}06 1px,transparent 1px)`,
        backgroundSize:"52px 52px", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:-160, right:-80, width:680, height:680, borderRadius:"50%",
        background:`radial-gradient(circle,${C.violet}14 0%,transparent 68%)`, pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-80, left:-40, width:480, height:480, borderRadius:"50%",
        background:`radial-gradient(circle,${C.p}10 0%,transparent 68%)`, pointerEvents:"none" }} />

      <div style={{ maxWidth:1100, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.05fr 1fr", gap:64, alignItems:"center" }}>
          <div>
            <div style={{ display:"flex", gap:10, marginBottom:20, animation:"fadeUp 0.6s ease both" }}>
              <Badge c={C.violet}>📊 Service</Badge>
              <Badge c={C.muted}>Data Analytics & Power BI</Badge>
            </div>
            <H size="hero" style={{ marginBottom:22, animation:"fadeUp 0.6s 0.1s ease both" }}>
              Your Pharmacy Data Should{" "}
              <span style={{ background:`linear-gradient(90deg,${C.violet},${C.accent})`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                Tell You Something
              </span>
            </H>
            <P style={{ maxWidth:520, marginBottom:32, fontSize:"1.08rem", animation:"fadeUp 0.6s 0.18s ease both" }}>
              Most LTC pharmacies are sitting on data they can't act on — scattered across PMS exports, spreadsheets, and facility reports.
              We build the dashboards, pipelines, and automated reports that turn that data into decisions.
            </P>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", animation:"fadeUp 0.6s 0.25s ease both" }}>
              <PBtn href="/schedule">Request a Demo Dashboard →</PBtn>
              <a href="#dashboards" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"12px 24px",
                borderRadius:10, background:"transparent", color:C.head, fontWeight:600, fontSize:14.5,
                border:`1.5px solid ${C.border}`, textDecoration:"none", transition:"all 0.15s" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=C.violet; e.currentTarget.style.background=`${C.violet}08`; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background="transparent"; }}>
                See What We Build ↓
              </a>
            </div>

            <div style={{ display:"flex", gap:0, marginTop:52,
              borderTop:`1px solid ${C.border}`, paddingTop:30,
              animation:"fadeUp 0.6s 0.4s ease both" }}>
              {[["Power BI","Microsoft-certified"],["Real-time","Live data pipelines"],["LTC-specific","Built for your metrics"],["Automated","Scheduled delivery"]].map(([v,l],i,a) => (
                <div key={i} style={{ flex:1, paddingRight:18,
                  borderRight:i<a.length-1?`1px solid ${C.border}`:"none",
                  marginRight:i<a.length-1?18:0 }}>
                  <div style={{ fontSize:"clamp(1rem,1.5vw,1.2rem)", fontWeight:900, color:C.violet,
                    letterSpacing:"-0.02em", fontFamily:"'DM Sans',sans-serif" }}>{v}</div>
                  <div style={{ color:C.muted, fontSize:11.5, marginTop:2, fontWeight:500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ animation:"fadeUp 0.7s 0.2s ease both" }}>
            <DashboardWidget />
          </div>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const pains = [
    { icon:"📁", title:"Data trapped in PMS exports and spreadsheets", desc:"Your pharmacy management system holds valuable data — but it lives in flat exports that require manual manipulation before you can see anything useful." },
    { icon:"🔀", title:"Metrics spread across disconnected systems", desc:"Dispensing data is in your PMS. Facility performance is in spreadsheets. Error rates are in incident logs. Nobody has a unified view of what's actually happening across your operation." },
    { icon:"🐢", title:"Reports that take hours to produce once a month", desc:"Your operations team spends hours assembling reports manually. By the time the report is ready, the data is stale — and the decisions it should inform have already been made without it." },
    { icon:"❓", title:"No visibility into facility-level performance", desc:"You have 20 facilities, but no consistent way to benchmark them against each other. Problems fester at the facility level because nobody is looking at the right data in the right way." },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.surface }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:72, alignItems:"start" }}>
          <div>
            <div style={{ marginBottom:14 }}><Badge c={C.red}>⚠ The Problem</Badge></div>
            <H size="h2" style={{ marginBottom:18 }}>Most LTC Pharmacies Are Flying Blind</H>
            <P style={{ marginBottom:16 }}>You generate enormous amounts of operational data every day — prescriptions dispensed, errors flagged, facilities served, DEA transactions logged. But if that data lives in separate systems and requires manual effort to compile, it's not actually usable.</P>
            <P style={{ marginBottom:16 }}>The result is decisions made on gut feel, monthly reports that arrive too late to act on, and no early warning when something is going wrong at a specific facility.</P>
            <div style={{ padding:"16px 18px", borderRadius:12, background:`${C.violet}08`,
              border:`1px solid ${C.violet}22` }}>
              <div style={{ fontSize:13.5, color:C.violet, fontWeight:600, lineHeight:1.6 }}>
                The fix isn't more spreadsheets. It's a data infrastructure that automatically aggregates, structures, and surfaces the right metrics — so your team can act, not compile.
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

function Dashboards() {
  const [active, setActive] = useState(0);
  const boards = [
    {
      icon:"💊", title:"Dispensing Operations Dashboard", tag:"Operations",
      desc:"A real-time view of dispensing volume, fill time trends, batch performance, and order queue status. Built for pharmacy operations managers who need to see what's happening across the dispensing floor right now — and spot bottlenecks before they become problems.",
      metrics:["Total Rx dispensed (daily/weekly/monthly)","Average fill time by drug type and batch","Order queue depth and aging","Technician throughput and efficiency","Batch performance by facility"],
      audience:"Operations Manager, Director of Pharmacy",
      color:C.violet,
    },
    {
      icon:"🏥", title:"Facility Performance Dashboard", tag:"Multi-Site",
      desc:"Benchmarks each LTC facility you serve against a consistent set of KPIs — dispensing accuracy, census-to-order ratios, on-time delivery, and communication responsiveness. Gives you early warning on facilities that are trending in the wrong direction.",
      metrics:["Per-facility dispensing accuracy rate","Census-to-order ratio by facility","On-time delivery performance","Communication response rates","Month-over-month trend by facility"],
      audience:"COO, Regional Director, VP of Operations",
      color:C.p,
    },
    {
      icon:"⚠️", title:"Medication Error Rate Tracker", tag:"Safety & Quality",
      desc:"Tracks medication errors, near-misses, and dispensing discrepancies in real time — with root cause categorization, trend analysis, and automatic alerts when error rates cross defined thresholds. Supports your QA process without manual log review.",
      metrics:["Error rate by drug class and type","Near-miss and caught-error trends","Root cause categorization","Facility-level error benchmarks","Threshold alerts and escalation log"],
      audience:"Pharmacist in Charge, Quality Assurance, Compliance Officer",
      color:C.red,
    },
    {
      icon:"📋", title:"DEA Compliance Dashboard", tag:"Compliance",
      desc:"A compliance-ready view of your DEA verification status, ARCOS reporting schedule, CS inventory levels, and audit trail completeness. Designed for pharmacies that need to stay ahead of DEA audits — not scramble to prepare for them.",
      metrics:["DEA registration status by prescriber","ARCOS report filing status and history","CS inventory levels vs. threshold","Audit trail completeness score","Open discrepancies and resolution status"],
      audience:"Compliance Officer, Pharmacist in Charge, COO",
      color:C.amber,
    },
    {
      icon:"📈", title:"Executive Summary Dashboard", tag:"Leadership",
      desc:"A single-screen operational summary for pharmacy leadership — revenue indicators, patient census, dispensing volume, error rates, and facility satisfaction — delivered as a scheduled email report or always-on Power BI view. Built for decisions, not data analysis.",
      metrics:["Revenue and dispensing volume trends","Patient census vs. dispensing ratio","Error rate summary","Facility satisfaction indicators","Month-over-month operational KPIs"],
      audience:"CEO, COO, Owner-Operator",
      color:C.accent,
    },
  ];
  const b = boards[active];
  return (
    <section id="dashboards" style={{ padding:"88px 5vw", background:C.alt }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.violet}>📊 Dashboards</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>What We Build for LTC Pharmacy Operations</H>
          <P style={{ maxWidth:480, margin:"0 auto" }}>Five purpose-built dashboard types — each designed for a specific LTC pharmacy audience and decision.</P>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.2fr", gap:24 }}>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {boards.map((bd,i) => (
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
            <P style={{ marginBottom:18, lineHeight:1.74, fontSize:"0.95rem" }}>{b.desc}</P>

            <div style={{ marginBottom:18 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase",
                letterSpacing:"0.07em", marginBottom:10 }}>Key Metrics Included</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7 }}>
                {b.metrics.map((m,i) => (
                  <div key={i} style={{ display:"flex", gap:7, alignItems:"flex-start",
                    padding:"8px 10px", borderRadius:8, background:C.bg, border:`1px solid ${C.border}` }}>
                    <span style={{ color:b.color, fontWeight:800, fontSize:11, marginTop:1 }}>✦</span>
                    <span style={{ color:C.body, fontSize:12.5, lineHeight:1.4 }}>{m}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display:"flex", gap:8, alignItems:"center", padding:"10px 14px",
              borderRadius:9, background:`${b.color}0C`, border:`1px solid ${b.color}22` }}>
              <span style={{ fontSize:13 }}>👤</span>
              <div>
                <span style={{ fontSize:10.5, color:C.muted, fontWeight:600 }}>Built for: </span>
                <span style={{ fontSize:13, color:b.color, fontWeight:700 }}>{b.audience}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n:"01", title:"Data Audit & Source Mapping", desc:"We start by documenting every data source in your pharmacy — PMS exports, EHR feeds, spreadsheets, manual logs — and assessing the quality, structure, and refresh frequency of each.", color:C.violet },
    { n:"02", title:"Metric Definition", desc:"We work with your team to define the exact KPIs that matter for each stakeholder — operations, compliance, clinical, and leadership. No generic metrics — only what drives decisions in your pharmacy.", color:C.p },
    { n:"03", title:"Data Pipeline Architecture", desc:"We design and build the ETL pipeline that pulls data from your sources, cleans and structures it, and loads it into Power BI or your data warehouse on your required refresh schedule.", color:C.accent },
    { n:"04", title:"Dashboard Build & Iteration", desc:"We build the dashboards with your team's input at every stage. You see working prototypes early — not finished products that miss the mark. We iterate until every view is genuinely useful.", color:C.green },
    { n:"05", title:"Training & Handoff", desc:"We train the team that will use and maintain the dashboards — not just the admin. Full documentation, a Power BI walkthrough, and a clear runbook for adding new data sources or metrics.", color:C.violet },
    { n:"06", title:"Ongoing Optimization", desc:"Dashboards should evolve as your pharmacy grows. We stay engaged — adding new views, incorporating new data sources, and refining metrics as your operation changes.", color:C.amber },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.surface }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.p}>🗺 Our Process</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>From Scattered Data to Live Dashboards</H>
          <P style={{ maxWidth:440, margin:"0 auto" }}>A 6-step process that takes you from raw pharmacy data to actionable, always-on analytics.</P>
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
    { icon:"🏥", title:"Unified View Across 18 Facilities",
      who:"Regional LTC pharmacy serving 18 skilled nursing and memory care facilities",
      outcome:"Built a facility benchmarking dashboard in Power BI that surfaces per-facility dispensing accuracy, on-time delivery, and error rates in a single view. Operations team now identifies underperforming facilities in minutes, not weeks." },
    { icon:"📉", title:"Error Rate Reduction via Data Visibility",
      who:"LTC pharmacy with a rising medication error rate and no clear root cause",
      outcome:"Data pipeline built to aggregate error logs, dispensing records, and shift data. Dashboard revealed a pattern in error timing tied to a specific batch process. Rate dropped 40% within 60 days of process correction." },
    { icon:"📊", title:"Executive Reporting Automated",
      who:"Owner-operator spending 4 hours per month building an executive summary report",
      outcome:"Automated Power BI report scheduled for Monday morning delivery. Leadership now receives a complete operational summary — dispensing volume, error trends, facility performance, financial indicators — without any manual compilation." },
    { icon:"⚠️", title:"DEA Compliance Dashboard",
      who:"LTC pharmacy that failed a DEA inspection due to documentation gaps",
      outcome:"Built a compliance dashboard covering DEA verification status, ARCOS filing history, CS inventory levels, and audit trail completeness. Pharmacy passed its next inspection with zero findings." },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.alt }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.p}>📁 Results</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>What Changes When You Can See Your Data</H>
          <P style={{ maxWidth:440, margin:"0 auto" }}>Real outcomes from LTC pharmacy analytics engagements.</P>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
          {cases.map((c,i) => (
            <Card key={i} ac={C.violet} style={{ padding:"26px 24px" }}>
              <div style={{ fontSize:28, marginBottom:14 }}>{c.icon}</div>
              <H size="h3" style={{ marginBottom:8, fontSize:16 }}>{c.title}</H>
              <div style={{ display:"flex", gap:7, marginBottom:12, alignItems:"flex-start" }}>
                <span style={{ fontSize:11, padding:"2px 8px", borderRadius:4, background:`${C.violet}0C`,
                  color:C.violet, fontWeight:700, flexShrink:0, marginTop:1 }}>WHO</span>
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
    { q:"Do we need to be using Power BI already?", a:"No. We set up Power BI as part of the engagement if you're not already using it. We handle licensing, workspace setup, and configuration. If you already have Power BI through Microsoft 365, we build on top of your existing environment." },
    { q:"What data sources can you connect?", a:"We connect to all major LTC pharmacy management systems (BestRx, QS1, SoftWriters, PioneerRx, Liberty), PointClickCare, Excel and CSV exports, SQL databases, and custom API sources. If your data exists somewhere structured, we can build a pipeline to it." },
    { q:"How often is the data refreshed?", a:"That depends on your needs and data source capabilities. Most operational dashboards refresh every 15–60 minutes. Some metrics — like DEA compliance status — update in real time. Scheduled reports run on whatever cadence you define." },
    { q:"How long does it take to build a dashboard?", a:"A single focused dashboard — like a facility performance view — typically takes 3–5 weeks including data pipeline, design, and testing. A full analytics suite with 4–5 interconnected dashboards is usually 8–12 weeks." },
    { q:"Can we add new metrics after the dashboard is live?", a:"Yes, and it's straightforward. Once the data pipeline is built, adding new metrics or new views is usually a matter of days, not weeks. We document everything so your team can request changes or additions easily." },
    { q:"Do you train our team to use and maintain it?", a:"Absolutely. We train the users who'll rely on the dashboards, the admin who'll manage the workspace, and provide full documentation. We want your team to own the dashboards — not depend on us for every change." },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.surface }}>
      <div style={{ maxWidth:780, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.p}>❓ FAQ</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>Questions We Get Asked</H>
          <P style={{ maxWidth:400, margin:"0 auto" }}>Straight answers to what LTC pharmacy teams ask before starting an analytics project.</P>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {faqs.map((f,i) => (
            <div key={i} style={{ borderRadius:12, border:`1.5px solid ${open===i?C.violet+"44":C.border}`,
              overflow:"hidden", transition:"border-color 0.2s",
              boxShadow:open===i?`0 4px 20px ${C.violet}10`:"none" }}>
              <button onClick={()=>setOpen(open===i?null:i)}
                style={{ width:"100%", padding:"18px 22px", display:"flex", alignItems:"center",
                  justifyContent:"space-between", background:open===i?`${C.violet}06`:C.surface,
                  border:"none", cursor:"pointer", fontFamily:"inherit", textAlign:"left", transition:"background 0.2s" }}>
                <span style={{ color:C.head, fontWeight:700, fontSize:15 }}>{f.q}</span>
                <span style={{ color:C.violet, fontSize:18, fontWeight:700, flexShrink:0, marginLeft:12,
                  transform:open===i?"rotate(45deg)":"none", transition:"transform 0.2s" }}>+</span>
              </button>
              {open===i && (
                <div style={{ padding:"0 22px 18px", background:`${C.violet}06` }}>
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
    { icon:"⚙️", color:C.accent, tag:"Service", title:"AI Automation", href:"/services/ai-automation",
      desc:"Intelligent workflow automation replacing manual bottlenecks across your pharmacy operations." },
    { icon:"📈", color:C.violet, tag:"Product", title:"LTC Analytics Dashboard", href:"/products/ltc-analytics",
      desc:"Our pre-built LTC analytics product — faster time to insight for standard LTC pharmacy metrics." },
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
        background:`radial-gradient(circle,${C.violet}45 0%,transparent 70%)`, pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-70, left:0, width:360, height:360, borderRadius:"50%",
        background:`radial-gradient(circle,${C.accent}40 0%,transparent 70%)`, pointerEvents:"none" }} />
      <div style={{ maxWidth:660, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
        <H size="h2" style={{ color:"#fff", marginBottom:14 }}>
          Ready to Actually Use Your Pharmacy Data?
        </H>
        <P style={{ color:"rgba(255,255,255,0.68)", marginBottom:32, fontSize:16 }}>
          Schedule a data discovery session. We'll review your current data sources, identify what's possible in Power BI, and show you a prototype dashboard built from your actual pharmacy data — before you commit to anything.
        </P>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <PBtn light href="/schedule">Book a Data Discovery Session →</PBtn>
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
              onMouseEnter={e=>e.currentTarget.style.color=C.violet}
              onMouseLeave={e=>e.currentTarget.style.color=C.muted}>{l}</a>
          ))}
        </div>
        <span style={{ color:C.muted, fontSize:12.5 }}>© 2025 Skypond Tech Pvt. Ltd.</span>
      </div>
    </footer>
  );
}

export default function DataAnalytics() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:#F6F7FD;color:#3A3E60;font-family:'DM Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);}}
        ::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-track{background:#F6F7FD;}
        ::-webkit-scrollbar-thumb{background:#C5C9E8;border-radius:3px;}
      `}</style>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Dashboards />
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
