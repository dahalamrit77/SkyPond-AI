import C from '../tokens.js'
import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'
import { Search, ClipboardList, Pill, TrendingUp, Link as LinkIcon, FileText, Hospital, Settings, BarChart3, Laptop, Cloud, CheckCircle2, Box, Inbox, Activity } from 'lucide-react'
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '../config/constants.js'

/* ─── PRIMITIVES ──────────────────────────────────────────────────────────── */
const Badge = ({ c=C.p, children }) => (
  <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"4px 13px",
    borderRadius:99, border:`1px solid ${c}28`, background:`${c}0B`, color:c,
    fontSize:11.5, letterSpacing:"0.07em", textTransform:"uppercase", fontWeight:700 }}>
    {children}
  </span>
);

const H = ({ size="h2", style={}, color, children }) => {
  const s = { hero:"clamp(2.5rem,5.2vw,4.2rem)", h2:"clamp(1.85rem,2.8vw,2.6rem)", h3:"1.22rem" };
  return <h2 style={{ fontSize:s[size], fontWeight:800, color:color||C.head,
    letterSpacing:"-0.028em", lineHeight:1.08,
    fontFamily:"'DM Sans',system-ui,sans-serif", ...style }}>{children}</h2>;
};

const P = ({ style={}, children }) => (
  <p style={{ fontSize:"clamp(0.96rem,1.1vw,1.04rem)", color:C.body, lineHeight:1.76, ...style }}>
    {children}
  </p>
);

function PBtn({ children, onClick, href, light }) {
  const Tag = href ? "a" : "button";
  const base = { display:"inline-flex", alignItems:"center", gap:8, padding:"12px 24px",
    borderRadius:10, fontWeight:700, fontSize:14.5, border:"none", cursor:"pointer",
    textDecoration:"none", fontFamily:"inherit", transition:"all 0.15s" };
  const v = light
    ? {...base, background:"#fff", color:C.p, boxShadow:"0 2px 14px rgba(0,0,0,0.13)"}
    : {...base, background:`linear-gradient(135deg,${C.p},${C.pd})`, color:"#fff", boxShadow:`0 4px 20px ${C.p}45`};
  return (
    <Tag href={href} onClick={onClick} style={v}
      onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)";
        e.currentTarget.style.boxShadow = light ? "0 8px 24px rgba(0,0,0,0.18)" : `0 8px 28px ${C.p}60`; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform="none";
        e.currentTarget.style.boxShadow = light ? "0 2px 14px rgba(0,0,0,0.13)" : `0 4px 20px ${C.p}45`; }}>
      {children}
    </Tag>
  );
}

function GBtn({ children, onClick }) {
  return (
    <button onClick={onClick} style={{ display:"inline-flex", alignItems:"center", gap:8,
      padding:"12px 24px", borderRadius:10, background:"transparent", color:C.head,
      fontWeight:600, fontSize:14.5, border:`1.5px solid ${C.border}`, cursor:"pointer",
      fontFamily:"inherit", transition:"all 0.15s" }}
      onMouseEnter={e=>{ e.currentTarget.style.borderColor=C.p; e.currentTarget.style.background=`${C.p}08`; }}
      onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background="transparent"; }}>
      {children}
    </button>
  );
}

function Card({ children, style={}, ac, hover=true }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={()=>hover&&setH(true)} onMouseLeave={()=>hover&&setH(false)}
      style={{ background:C.surface, border:`1.5px solid ${h&&ac ? ac+"44" : C.border}`,
        borderRadius:16, transition:"all 0.2s", transform:h&&hover?"translateY(-4px)":"none",
        boxShadow:h&&hover ? `0 16px 40px ${ac ? ac+"1A":"rgba(0,0,0,0.08)"}` : "0 2px 8px rgba(0,0,0,0.04)",
        ...style }}>
      {children}
    </div>
  );
}

/* ─── DATA ────────────────────────────────────────────────────────────────── */
const PRODUCTS = [
  { icon:<Search size={18} />, color:C.p,      tag:"Compliance",  title:"DEA Lookup Tool",
    desc:"Real-time DEA registration verification, bulk prescriber lookups, instant flags on expired/invalid registrations — with full audit trail.",
    metric:"90% faster", ml:"vs manual lookup" },
  { icon:<ClipboardList size={18} />, color:C.p,      tag:"Compliance",  title:"DEA Compliance Reporting",
    desc:"Automated ARCOS reporting, DEA Form 222 tracking, discrepancy detection, and scheduled archival — replacing hours of manual documentation.",
    metric:"8 hrs saved", ml:"per week" },
  { icon:<Pill size={18} />, color:C.p,      tag:"Inventory",   title:"Controlled Substance Inventory",
    desc:"Real-time CS tracking, discrepancy alerts, per-transaction audit trails, biennial inventory support, and multi-facility management.",
    metric:"99.8%", ml:"inventory accuracy" },
  { icon:<TrendingUp size={18} />, color:C.p,      tag:"Analytics",   title:"LTC Analytics Dashboard",
    desc:"Dispensing trends, facility benchmarking, error rate tracking, census-to-dispensing correlation, and executive-ready report exports.",
    metric:"3×", ml:"faster decisions" },
  { icon:<LinkIcon size={18} />, color:C.p,      tag:"Integration", title:"PointClickCare Data Feed",
    desc:"Live bidirectional PCC sync — MAR updates, ADT event handling, order reconciliation, and HIPAA-compliant data transmission.",
    metric:"Zero", ml:"duplicate manual entry" },
  { icon:<FileText size={18} />, color:C.p,      tag:"Automation",  title:"Document Automation",
    desc:"AI-powered prior auth generation, compliance document templating, e-signature integration, fax automation, and audit-ready archival.",
    metric:"75% less", ml:"processing time" },
];

const SERVICES = [
  { icon:<Hospital size={20} />, color:C.p,      title:"LTC Pharmacy IT",        desc:"Telepharmacy apps, pharmacy-facility integration, migration, and custom reporting — exclusively for LTC." },
  { icon:<Settings size={20} />, color:C.accent, title:"AI Automation",          desc:"Intelligent workflow automation replacing manual bottlenecks: order entry, prior auth, compliance reporting, and more." },
  { icon:<BarChart3 size={20} />, color:C.violet, title:"Data Analytics & Power BI", desc:"Custom Power BI dashboards and automated data pipelines that make your pharmacy data genuinely actionable." },
  { icon:<Laptop size={20} />, color:C.p,      title:"Custom Development",     desc:"Full-stack applications — React, Node.js, Azure — built around your specific LTC workflows and integrations." },
  { icon:<Cloud size={20} />, color:C.accent, title:"Microsoft Cloud",        desc:"Microsoft 365, Azure, and Power Platform properly configured for healthcare compliance and LTC operations." },
  { icon:<LinkIcon size={20} />, color:C.violet, title:"PointClickCare Integration", desc:"End-to-end PCC data bridges built and maintained by specialists who know both systems inside and out." },
];

const TESTIMONIALS = [
  { q:"Ramesh and his team's expertise in data analysis has played an instrumental part in our daily workflow. Easy-to-read reporting improves work efficiency and provides critical data to help reduce pharmacy-related errors.", a:"Cory K.", r:"Pharmacist in Charge", co:"SeniorRX Pharmacy", i:"CK", c:C.p },
  { q:"Working with Skypond was a game changer for us. We built a new data analytics tool using Power BI that streamlined our workload tremendously. We would highly recommend SkyPond Tech.", a:"Tyler J.", r:"Operations Lead", co:"The CorePoint", i:"TJ", c:C.accent },
  { q:"Skypond has an amazing team very knowledgeable in the LTC Pharmacy and Facility industries. This specialized knowledge is irreplaceable and cuts down on overall development cost. Hiring them is well worth the investment.", a:"Director of Pharmacy Ops", r:"Director of Pharmacy Operations", co:"Long-Term Care Pharmacy", i:"DP", c:C.violet },
];

/* ─── LIVE AGENT WIDGET ───────────────────────────────────────────────────── */
function AgentWidget() {
  const pipeline = [
    { label:"Parsing eRx",            sub:"Extracting order details",             icon:<Inbox size={12} /> },
    { label:"DEA Verification",       sub:"Prescriber registration — valid ✓",    icon:<Search size={12} /> },
    { label:"CS Compliance Check",    sub:"Schedule II — audit trail created",    icon:<Pill size={12} /> },
    { label:"Inventory Updated",      sub:"Oxycodone 5mg: 1,239 units remaining", icon:<Box size={12} /> },
    { label:"PointClickCare Sync",    sub:"MAR updated · Facility 3B",            icon:<LinkIcon size={12} /> },
    { label:"Analytics Logged",       sub:"Dispensing +1 · Error rate 0.18%",     icon:<BarChart3 size={12} /> },
    { label:"Order Complete",         sub:"Ready for RPh review",                 icon:<CheckCircle2 size={12} /> },
  ];

  const [step, setStep] = useState(0);
  const [done, setDone] = useState([]);

  useEffect(() => {
    const t = setInterval(() => {
      setStep(s => {
        const n = (s + 1) % pipeline.length;
        if (n === 0) setDone([]);
        else setDone(d => [...d, s]);
        return n;
      });
    }, 1500);
    return () => clearInterval(t);
  }, []);

  const orders = [
    { drug:"Oxycodone 5mg",    facility:"Rm 4A",  type:"New ⚠ CS",  active:true  },
    { drug:"Metformin 500mg",  facility:"Rm 7C",  type:"Refill",    active:false },
    { drug:"Lorazepam 1mg",    facility:"Rm 12B", type:"New ⚠ CS",  active:false },
    { drug:"Atorvastatin 40mg",facility:"Rm 2A",  type:"Renewal",   active:false },
    { drug:"Fluticasone 50mcg",facility:"Rm 9D",  type:"Refill",    active:false },
  ];

  return (
    <div style={{ background:C.dark, borderRadius:20, overflow:"hidden",
      boxShadow:`0 28px 72px rgba(59,63,176,0.38)`, border:"1px solid rgba(255,255,255,0.07)" }}>

      {/* title bar */}
      <div style={{ padding:"10px 18px", borderBottom:"1px solid rgba(255,255,255,0.07)",
        display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", gap:6 }}>
          {["#FF5F57","#FEBC2E","#28C840"].map(c => (
            <div key={c} style={{ width:11, height:11, borderRadius:"50%", background:c }} />
          ))}
        </div>
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", fontWeight:600, letterSpacing:"0.06em" }}>
          SKYPONDTECH AI AGENT · LIVE
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ width:7, height:7, borderRadius:"50%", background:C.green,
            boxShadow:`0 0 7px ${C.green}` }} />
          <span style={{ fontSize:10, color:C.green, fontWeight:700 }}>RUNNING</span>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
        {/* Pipeline */}
        <div style={{ padding:"20px 20px", borderRight:"1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize:10.5, fontWeight:700, color:"rgba(255,255,255,0.3)",
            textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:14 }}>AI Pipeline</div>
          {pipeline.map((s, i) => {
            const isActive = i === step;
            const isDone   = done.includes(i);
            return (
              <div key={i} style={{ display:"flex", gap:11, marginBottom:9, alignItems:"flex-start" }}>
                <div style={{ width:22, height:22, borderRadius:"50%", flexShrink:0, marginTop:1,
                  background: isDone ? C.green : isActive ? C.p : "rgba(255,255,255,0.05)",
                  border:`1.5px solid ${isDone ? C.green : isActive ? C.p2 : "rgba(255,255,255,0.1)"}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:9, transition:"all 0.3s",
                  boxShadow: isActive ? `0 0 14px ${C.p}90` : isDone ? `0 0 8px ${C.green}60` : "none" }}>
                  {isDone ? "✓" : isActive
                    ? <span style={{ width:6, height:6, borderRadius:"50%", background:"#fff", display:"block" }} />
                    : <span style={{ fontSize:9 }}>{s.icon}</span>}
                </div>
                <div>
                  <div style={{ fontSize:12.5, fontWeight: isActive ? 700 : 500,
                    color: isDone ? "rgba(255,255,255,0.45)" : isActive ? "#fff" : "rgba(255,255,255,0.25)",
                    transition:"color 0.3s" }}>{s.label}</div>
                  {isActive && (
                    <div style={{ fontSize:10.5, color:C.accent, marginTop:2,
                      animation:"fadeUp 0.3s ease both" }}>{s.sub}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Order queue */}
        <div style={{ padding:"20px 18px" }}>
          <div style={{ fontSize:10.5, fontWeight:700, color:"rgba(255,255,255,0.3)",
            textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:14 }}>Order Queue</div>
          {orders.map((o, i) => (
            <div key={i} style={{ padding:"9px 12px", borderRadius:8, marginBottom:7,
              background: o.active ? "rgba(59,63,176,0.22)" : "rgba(255,255,255,0.03)",
              border:`1px solid ${o.active ? C.p2+"60" : "rgba(255,255,255,0.05)"}`,
              display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div>
                <div style={{ fontSize:12, color: o.active ? "#fff" : "rgba(255,255,255,0.38)",
                  fontWeight: o.active ? 600 : 400 }}>{o.drug}</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,0.25)", marginTop:1 }}>{o.facility}</div>
              </div>
              <span style={{ fontSize:10, fontWeight:700,
                color: o.active ? C.accent : o.type.includes("⚠") ? C.amber+"99" : "rgba(255,255,255,0.2)",
                background: o.active ? `${C.accent}15` : "transparent",
                padding: o.active ? "2px 7px" : "0", borderRadius:4 }}>
                {o.active ? "ACTIVE" : o.type}
              </span>
            </div>
          ))}

          {/* Status chips */}
          <div style={{ marginTop:14, display:"flex", flexDirection:"column", gap:7 }}>
            <div style={{ padding:"8px 11px", borderRadius:8,
              background:`${C.green}12`, border:`1px solid ${C.green}28` }}>
              <div style={{ fontSize:11, color:C.green, fontWeight:700 }}>✓ DEA Verified · CS Logged · PCC Synced</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", marginTop:2 }}>Audit trail created · 0 discrepancies</div>
            </div>
            <div style={{ padding:"8px 11px", borderRadius:8,
              background:`${C.p}12`, border:`1px solid ${C.p}28` }}>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.6)" }}>📊 Analytics updated · Error rate: <span style={{ color:C.green, fontWeight:700 }}>0.18%</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── DEA SCORECARD ───────────────────────────────────────────────────────── */
function DEACard() {
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold:0.3 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  const rows = [
    { l:"DEA Registrations Verified", s:"pass", v:"247/247" },
    { l:"Expiring in 30 Days",        s:"warn", v:"3 flagged" },
    { l:"Invalid / Revoked",          s:"pass", v:"0 found" },
    { l:"ARCOS Report Filed",         s:"pass", v:"Current" },
    { l:"CS Discrepancies",           s:"pass", v:"0 open" },
  ];
  const score = 94;
  return (
    <div ref={ref} style={{ background:C.surface, border:`1.5px solid ${C.border}`,
      borderRadius:18, padding:"22px 20px", boxShadow:`0 4px 20px ${C.p}08` }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <div>
          <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", color:C.p, marginBottom:3 }}>DEA Audit Readiness</div>
          <div style={{ fontWeight:800, fontSize:15, color:C.head, fontFamily:"'DM Sans',sans-serif" }}>Compliance Scorecard</div>
        </div>
        <div style={{ position:"relative", width:68, height:68, borderRadius:"50%", border:`2px solid ${C.p}30`, background:`${C.p}08` }}>
          <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
            <BarChart3 size={16} color={C.p} style={{ marginBottom:3 }} />
            <span style={{ fontSize:17, fontWeight:900, color:C.p, lineHeight:1, fontFamily:"'DM Sans',sans-serif" }}>{on?score:0}</span>
            <span style={{ fontSize:9, color:C.muted, fontWeight:600 }}>/100</span>
          </div>
        </div>
      </div>
      {rows.map((r,i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"7px 10px", borderRadius:7, background:C.bg, marginBottom:5,
          opacity:on?1:0, transform:on?"none":"translateX(-8px)",
          transition:`opacity 0.4s ${i*0.08}s,transform 0.4s ${i*0.08}s` }}>
          <div style={{ display:"flex", alignItems:"center", gap:7 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:r.s==="pass"?C.green:C.amber }} />
            <span style={{ fontSize:12, color:C.body }}>{r.l}</span>
          </div>
          <span style={{ fontSize:11, fontWeight:700, color:r.s==="pass"?C.green:C.amber }}>{r.v}</span>
        </div>
      ))}
      <div style={{ marginTop:12, padding:"8px 11px", borderRadius:8,
        background:`${C.green}10`, border:`1px solid ${C.green}28`,
        display:"flex", alignItems:"center", gap:7 }}>
        <span>✅</span>
        <span style={{ fontSize:11.5, fontWeight:600, color:C.green }}>Audit-ready — 3 items need attention</span>
      </div>
    </div>
  );
}

/* ─── CS INVENTORY ────────────────────────────────────────────────────────── */
function CSCard() {
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold:0.3 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  const drugs = [
    { n:"Oxycodone HCl 5mg",  sch:"II",  cnt:1240, max:1500, s:"ok"   },
    { n:"Hydrocodone 7.5mg",  sch:"II",  cnt:876,  max:1000, s:"ok"   },
    { n:"Lorazepam 1mg",      sch:"IV",  cnt:340,  max:400,  s:"warn" },
    { n:"Tramadol 50mg",      sch:"IV",  cnt:88,   max:800,  s:"low"  },
  ];
  const sc = s => s==="ok" ? C.green : s==="warn" ? C.amber : C.red;
  return (
    <div ref={ref} style={{ background:C.surface, border:`1.5px solid ${C.border}`,
      borderRadius:18, padding:"22px 20px", boxShadow:`0 4px 20px ${C.violet}08` }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <div>
          <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", color:C.p, marginBottom:3 }}>CS Inventory</div>
          <div style={{ fontWeight:800, fontSize:15, color:C.head, fontFamily:"'DM Sans',sans-serif" }}>Controlled Substances</div>
        </div>
        <div style={{ padding:"3px 9px", borderRadius:5, background:`${C.green}15`,
          border:`1px solid ${C.green}30`, fontSize:10, fontWeight:700, color:C.green }}>🟢 Live</div>
      </div>
      {drugs.map((d,i) => (
        <div key={i} style={{ marginBottom:11, opacity:on?1:0, transform:on?"none":"translateX(-6px)",
          transition:`opacity 0.4s ${i*0.1}s,transform 0.4s ${i*0.1}s` }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
            <div style={{ display:"flex", gap:6, alignItems:"center" }}>
              <span style={{ fontSize:9, padding:"1px 5px", borderRadius:3,
                background:`${C.violet}15`, color:C.p, fontWeight:700 }}>Sch {d.sch}</span>
              <span style={{ fontSize:12, color:C.body }}>{d.n}</span>
            </div>
            <span style={{ fontSize:11, fontWeight:700, color:sc(d.s) }}>
              {d.s==="low"?"⚠ LOW":d.s==="warn"?"▲":""} {d.cnt}/{d.max}
            </span>
          </div>
          <div style={{ height:6, borderRadius:3, background:C.alt, overflow:"hidden" }}>
            <div style={{ height:"100%", borderRadius:3, background:sc(d.s),
              width:on?`${(d.cnt/d.max)*100}%`:"0%",
              transition:`width 0.9s ${i*0.1}s ease-out` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── ANALYTICS SPARK ────────────────────────────────────────────────────── */
function AnalyticsCard() {
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold:0.3 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  const kpis = [
    { l:"Dispenses / Month", v:"3,241", d:"+6.2%", c:C.p },
    { l:"Active Facilities",  v:"18",    d:"+2",    c:C.accent },
    { l:"Error Rate",         v:"0.18%", d:"-0.04%",c:C.green },
    { l:"Avg Fill Time",      v:"4.2m",  d:"-0.8m", c:C.p },
  ];
  const dispensing = [420,455,438,490,462,510,487];
  const maxD = 510;
  const w = 160;
  const facilities = [
    { n:"Sunrise Memory Care",    pct:94, c:C.p },
    { n:"Oakwood Skilled Nursing",pct:88, c:C.accent },
    { n:"Valley View LTC",        pct:97, c:C.green },
    { n:"Ridgeline Rehab Center", pct:76, c:C.amber },
  ];
  return (
    <div ref={ref} style={{ background:C.surface, border:`1.5px solid ${C.border}`,
      borderRadius:18, padding:"22px 20px", boxShadow:`0 4px 20px ${C.accent}08` }}>
      <div style={{ marginBottom:14 }}>
        <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", color:C.accent, marginBottom:3 }}>Analytics Dashboard</div>
        <div style={{ fontWeight:800, fontSize:15, color:C.head, fontFamily:"'DM Sans',sans-serif" }}>LTC Operations Overview</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
        {kpis.map((k,i) => (
          <div key={i} style={{ padding:"10px 10px", borderRadius:9, background:C.bg,
            border:`1px solid ${C.border}`, opacity:on?1:0, transform:on?"none":"translateY(6px)",
            transition:`opacity 0.4s ${i*0.1}s,transform 0.4s ${i*0.1}s` }}>
            <div style={{ fontSize:10.5, color:C.muted, marginBottom:3 }}>{k.l}</div>
            <div style={{ fontSize:18, fontWeight:900, color:k.c, fontFamily:"'DM Sans',sans-serif", letterSpacing:"-0.02em", lineHeight:1 }}>{k.v}</div>
            <div style={{ fontSize:10, color:C.green, fontWeight:700, marginTop:3 }}>▲ {k.d}</div>
          </div>
        ))}
      </div>
      <div style={{ padding:"12px 12px", borderRadius:9, background:C.bg, border:`1px solid ${C.border}`, marginBottom:14 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
          <span style={{ fontSize:11, fontWeight:600, color:C.body }}>Dispensing Volume</span>
          <span style={{ fontSize:10, color:C.muted }}>Rx/week</span>
        </div>
        {on && (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:40 }}>
            <Activity size={20} color={C.p} />
          </div>
        )}
      </div>
      <div>
        <div style={{ fontSize:10.5, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:8 }}>Facility Performance</div>
        {facilities.map((f,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:7,
            opacity:on?1:0, transition:`opacity 0.4s ${0.4+i*0.08}s` }}>
            <span style={{ fontSize:11.5, color:C.body, flex:1 }}>{f.n}</span>
            <div style={{ width:80, height:5, borderRadius:3, background:C.alt, overflow:"hidden", flexShrink:0 }}>
              <div style={{ height:"100%", borderRadius:3, background:f.c,
                width:on?`${f.pct}%`:"0%", transition:`width 0.8s ${0.4+i*0.08}s ease-out` }} />
            </div>
            <span style={{ fontSize:11, fontWeight:700, color:f.c, minWidth:26, textAlign:"right" }}>{f.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  return (
    <section style={{ minHeight:"100vh", display:"flex", alignItems:"center",
      padding:"120px 5vw 80px", position:"relative", overflow:"hidden", background:C.bg }}>
      <div style={{ position:"absolute", inset:0,
        backgroundImage:`linear-gradient(${C.p}06 1px,transparent 1px),linear-gradient(90deg,${C.p}06 1px,transparent 1px)`,
        backgroundSize:"56px 56px", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:-200, right:-80, width:760, height:760, borderRadius:"50%",
        background:`radial-gradient(circle,${C.p}14 0%,transparent 68%)`, pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-60, left:-80, width:500, height:500, borderRadius:"50%",
        background:`radial-gradient(circle,${C.accent}0E 0%,transparent 68%)`, pointerEvents:"none" }} />

      <div style={{ maxWidth:1160, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>
          {/* LEFT */}
          <div>
            <div style={{ marginBottom:20, animation:"fadeUp 0.6s ease both" }}>
              <Badge c={C.p}>✦ The Complete LTC Pharmacy Platform</Badge>
            </div>
            <H size="hero" style={{ marginBottom:22, animation:"fadeUp 0.6s 0.1s ease both" }}>
              More Than Automation.{" "}
              <br />
              <span style={{ background:`linear-gradient(90deg,${C.p},${C.accent})`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                Total LTC Intelligence.
              </span>
            </H>
            <P style={{ maxWidth:500, marginBottom:16, animation:"fadeUp 0.6s 0.15s ease both" }}>
              SkypondTech is the only platform that combines DEA compliance, controlled substance tracking,
              AI automation, PointClickCare integration, and LTC-specific analytics — from a team that
              works exclusively in LTC pharmacy.
            </P>

            {/* competitive callout chips */}
            <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:28,
              animation:"fadeUp 0.6s 0.2s ease both" }}>
              {[
                ["⚡","6 purpose-built products — DEA & CS tools no competitor offers"],
                ["🏥","100% LTC-only focus — not diluted by retail or specialty pharmacy"],
                ["👥","Real named clients — not anonymous testimonials"],
              ].map(([icon,txt]) => (
                <div key={txt} style={{ display:"inline-flex", alignItems:"center", gap:10,
                  padding:"10px 14px", borderRadius:9, background:`${C.p}0A`, border:`1px solid ${C.p}20` }}>
                  <span style={{ fontSize:15 }}>{icon}</span>
                  <span style={{ fontSize:13, color:C.p, fontWeight:600 }}>{txt}</span>
                </div>
              ))}
            </div>

            <div style={{ display:"flex", gap:12, flexWrap:"wrap", animation:"fadeUp 0.6s 0.25s ease both" }}>
              <PBtn onClick={() => go("contact")}>Schedule a Demo →</PBtn>
              <GBtn onClick={() => go("products")}>Explore Products</GBtn>
            </div>

            {/* stats */}
            <div style={{ display:"flex", gap:0, marginTop:48,
              borderTop:`1px solid ${C.border}`, paddingTop:30,
              animation:"fadeUp 0.6s 0.4s ease both" }}>
              {[["50+","Projects"],["100%","Satisfaction"],["6","Products"],["LTC","Only Focus"]].map(([v,l],i,a) => (
                <div key={i} style={{ flex:1, paddingRight:18,
                  borderRight: i<a.length-1 ? `1px solid ${C.border}` : "none",
                  marginRight: i<a.length-1 ? 18 : 0 }}>
                  <div style={{ fontSize:"clamp(1.4rem,2.2vw,1.9rem)", fontWeight:900, color:C.p,
                    letterSpacing:"-0.03em", fontFamily:"'DM Sans',sans-serif" }}>{v}</div>
                  <div style={{ color:C.muted, fontSize:11.5, marginTop:2, fontWeight:500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — agent widget */}
          <div style={{ animation:"fadeUp 0.7s 0.2s ease both" }}>
            <AgentWidget />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const pills = ["DEA Compliance","CS Inventory Tracking","PointClickCare Integration",
    "Power BI Analytics","AI Workflow Automation","Microsoft Azure","Custom LTC Dev","Document Automation","100% LTC Focus"];
  return (
    <div style={{ background:C.dark, padding:"15px 0", overflow:"hidden", whiteSpace:"nowrap" }}>
      <div style={{ display:"inline-flex", gap:52, animation:"ticker 32s linear infinite" }}>
        {[...pills,...pills].map((p,i) => (
          <span key={i} style={{ color:"rgba(255,255,255,0.38)", fontSize:11.5, fontWeight:700,
            letterSpacing:"0.07em", textTransform:"uppercase" }}>✦ {p}</span>
        ))}
      </div>
    </div>
  );
}

function Products() {
  const [active, setActive] = useState(0);
  const p = PRODUCTS[active];
  return (
    <section id="products" style={{ padding:"92px 5vw", background:C.surface }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ marginBottom:12 }}><Badge c={C.accent}>📦 6 Core Products</Badge></div>
          <H size="h2" style={{ marginBottom:12 }}>Purpose-Built for LTC. Not Adapted from Generic AI.</H>
          <P style={{ maxWidth:520, margin:"0 auto" }}>
            Every product solves a specific LTC pharmacy problem that automation-only platforms don't touch — DEA compliance, CS inventory, analytics, and EHR integration.
          </P>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.15fr", gap:24 }}>
          <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
            {PRODUCTS.map((pr,i) => (
              <button key={i} onClick={() => setActive(i)} style={{ display:"flex", alignItems:"center",
                gap:13, padding:"12px 15px", borderRadius:11, textAlign:"left",
                background: active===i ? `${pr.color}0C` : "transparent",
                border:`1.5px solid ${active===i ? pr.color+"50" : C.border}`,
                cursor:"pointer", transition:"all 0.18s", fontFamily:"inherit" }}>
                <span style={{ fontSize:17, width:37, height:37, flexShrink:0, borderRadius:9,
                  background: active===i ? `${pr.color}18` : C.alt,
                  display:"flex", alignItems:"center", justifyContent:"center" }}>{pr.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ color:C.head, fontWeight:700, fontSize:13.5 }}>{pr.title}</div>
                  <div style={{ color:pr.color, fontSize:10.5, fontWeight:700,
                    textTransform:"uppercase", letterSpacing:"0.06em", marginTop:2 }}>{pr.tag}</div>
                </div>
                {active===i && <span style={{ fontSize:11.5, fontWeight:800, color:pr.color }}>{pr.metric}</span>}
              </button>
            ))}
          </div>

          <Card ac={p.color} hover={false} style={{ padding:"28px 26px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:13, marginBottom:18 }}>
              <span style={{ fontSize:28, width:52, height:52,
                background:`${p.color}14`, border:`1px solid ${p.color}28`,
                borderRadius:13, display:"flex", alignItems:"center", justifyContent:"center" }}>{p.icon}</span>
              <div>
                <span style={{ fontSize:10.5, fontWeight:700, textTransform:"uppercase",
                  letterSpacing:"0.08em", color:p.color }}>{p.tag}</span>
                <h3 style={{ color:C.head, fontWeight:800, fontSize:18, marginTop:2,
                  fontFamily:"'DM Sans',sans-serif" }}>{p.title}</h3>
              </div>
            </div>
            <P style={{ marginBottom:18, lineHeight:1.72 }}>{p.desc}</P>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"7px 14px",
              borderRadius:8, background:`${p.color}10`, border:`1px solid ${p.color}25`,
              color:p.color, fontWeight:700, fontSize:12.5, marginBottom:22 }}>
              {p.metric} <span style={{ fontWeight:400, opacity:0.7 }}>{p.ml}</span>
            </div>
            <div><PBtn onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" })}>
              Request a Demo →
            </PBtn></div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Dashboards() {
  return (
    <section style={{ padding:"92px 5vw", background:C.alt }}>
      <div style={{ maxWidth:1160, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:12 }}><Badge c={C.p}>📊 Platform Depth</Badge></div>
          <H size="h2" style={{ marginBottom:12 }}>Real Platform Intelligence — Not Just Order Entry</H>
          <P style={{ maxWidth:540, margin:"0 auto" }}>
            SkypondTech gives you DEA compliance visibility, real-time CS tracking, and LTC analytics — capabilities no automation tool offers.
          </P>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:20 }}>
          <DEACard />
          <AnalyticsCard />
          <CSCard />
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" style={{ padding:"92px 5vw", background:C.surface }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ marginBottom:48 }}>
          <div style={{ marginBottom:12 }}><Badge c={C.p}>⚙ Full-Service Partner</Badge></div>
          <H size="h2" style={{ marginBottom:12, maxWidth:540 }}>We Build, Integrate, Train, and Support — End to End</H>
          <P style={{ maxWidth:500 }}>
            TJM Labs and PillSpark are automation tools. SkypondTech is your complete LTC technology partner — from DEA compliance to custom development to Microsoft cloud infrastructure.
          </P>
          <Link to="/compare" style={{ color: C.accent, fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginTop: 10 }}>
            See how we compare →
          </Link>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:18 }}>
          {SERVICES.map((s,i) => (
            <Card key={i} ac={s.color} style={{ padding:"24px 22px 26px" }}>
              <div style={{ width:46, height:46, borderRadius:10, marginBottom:14,
                background:`${s.color}10`, border:`1px solid ${s.color}25`,
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:21 }}>{s.icon}</div>
              <h3 style={{ color:C.head, fontWeight:700, fontSize:16, marginBottom:8,
                fontFamily:"'DM Sans',sans-serif" }}>{s.title}</h3>
              <p style={{ color:C.body, fontSize:13.5, lineHeight:1.68 }}>{s.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustriesSection() {
  const verticals = [
    { icon:<Pill size={20} />, color:C.p,      tag:"Primary Focus",  title:"LTC Pharmacy",
      desc:"Our deepest domain. Nearly a decade inside LTC pharmacy operations — dispensing, DEA compliance, PointClickCare, prior auth, and everything in between.",
      href:"/services" },
    { icon:<Hospital size={20} />, color:C.accent, tag:"Near-Primary",   title:"LTC Facilities",
      desc:"SNF, ALF, memory care, and behavioral health. Same compliance demands, overlapping systems, same need for technology that understands the care setting.",
      href:"/industries" },
    { icon:<BarChart3 size={20} />, color:C.amber,  tag:"Analytics & Dev", title:"Financial & Retail",
      desc:"Our Data Analytics and Custom Development services travel outside healthcare. We've built analytics platforms and custom applications for financial firms and retail organizations.",
      href:"/industries" },
  ];
  return (
    <section id="industries" style={{ padding:"92px 5vw", background:C.alt }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end",
          marginBottom:44, flexWrap:"wrap", gap:16 }}>
          <div>
            <div style={{ marginBottom:12 }}><Badge c={C.accent}>🏢 Who We Serve</Badge></div>
            <H size="h2" style={{ marginBottom:10, maxWidth:480 }}>
              LTC-Focused.
              <br />
              Not LTC-Only.
            </H>
            <P style={{ maxWidth:460 }}>
              Our expertise is rooted in long-term care. Our analytics and development capabilities extend beyond it.
            </P>
          </div>
          <a href="/industries" style={{ display:"inline-flex", alignItems:"center", gap:7,
            padding:"10px 20px", borderRadius:9, background:C.surface,
            border:`1.5px solid ${C.border}`, color:C.body, fontWeight:600,
            fontSize:13.5, textDecoration:"none", flexShrink:0, transition:"border-color 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor=C.p2}
            onMouseLeave={e => e.currentTarget.style.borderColor=C.border}>
            View All Industries →
          </a>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
          {verticals.map((v, i) => (
            <a key={i} href={v.href} style={{ textDecoration:"none" }}>
              <div style={{ padding:"28px 26px", borderRadius:18, background:C.surface,
                border:`1.5px solid ${C.border}`, height:"100%", transition:"all 0.2s",
                display:"flex", flexDirection:"column", gap:0 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=v.color+"50"; e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 16px 36px ${v.color}12`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
                <div style={{ width:44, height:44, borderRadius:11, background:`${v.color}12`,
                  border:`1.5px solid ${v.color}28`, display:"flex", alignItems:"center",
                  justifyContent:"center", fontSize:20, marginBottom:16 }}>{v.icon}</div>
                <div style={{ fontSize:10.5, fontWeight:700, color:v.color,
                  textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6 }}>{v.tag}</div>
                <div style={{ color:C.head, fontWeight:700, fontSize:17, marginBottom:10,
                  fontFamily:"'DM Sans',sans-serif" }}>{v.title}</div>
                <p style={{ color:C.body, fontSize:13.5, lineHeight:1.68, flex:1 }}>{v.desc}</p>
                <div style={{ color:v.color, fontSize:13, fontWeight:700, marginTop:18 }}>Learn more →</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a+1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="about" style={{ padding:"92px 5vw", background:C.surface }}>
      <div style={{ maxWidth:820, margin:"0 auto", textAlign:"center" }}>
        <div style={{ marginBottom:12 }}><Badge c={C.accent}>💬 Named Clients. Real Results.</Badge></div>
        <H size="h2" style={{ marginBottom:10 }}>Our Clients Put Their Names on It</H>
        <P style={{ maxWidth:440, margin:"0 auto 44px", color:C.muted }}>
          TJM Labs has named testimonials. PillSpark doesn't. We do — from real LTC pharmacy leaders who stand behind the results.
        </P>
        <div style={{ position:"relative", minHeight:260 }}>
          {TESTIMONIALS.map((t,i) => (
            <div key={i} style={{ position:i===0?"relative":"absolute", top:0, left:0, right:0,
              opacity:active===i?1:0, transform:active===i?"translateY(0)":"translateY(12px)",
              transition:"opacity 0.5s,transform 0.5s", pointerEvents:active===i?"auto":"none" }}>
              <Card hover={false} style={{ padding:"32px 36px", textAlign:"left" }}>
                <div style={{ fontSize:38, lineHeight:1, color:t.c, marginBottom:10,
                  fontFamily:"Georgia,serif", opacity:0.5 }}>"</div>
                <p style={{ fontSize:"clamp(0.94rem,1.15vw,1.04rem)", color:C.body,
                  lineHeight:1.78, fontStyle:"italic", marginBottom:22 }}>{t.q}</p>
                <div style={{ display:"flex", alignItems:"center", gap:13 }}>
                  <div style={{ width:42, height:42, borderRadius:"50%",
                    background:`linear-gradient(135deg,${t.c},${t.c}88)`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontWeight:800, color:"#fff", fontSize:13 }}>{t.i}</div>
                  <div>
                    <div style={{ color:C.head, fontWeight:700, fontSize:14.5 }}>{t.a}</div>
                    <div style={{ color:C.muted, fontSize:12.5 }}>{t.r} · {t.co}</div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:7, justifyContent:"center", marginTop:20 }}>
          {TESTIMONIALS.map((_,i) => (
            <button key={i} onClick={() => setActive(i)}
              style={{ width:active===i?26:7, height:7, borderRadius:4,
                background:active===i?C.p:C.border, border:"none", cursor:"pointer",
                transition:"all 0.3s" }} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section style={{ padding:"80px 5vw", background:C.dark, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:-140, right:-80, width:520, height:520, borderRadius:"50%",
        background:`radial-gradient(circle,${C.p}55 0%,transparent 70%)`, pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-70, left:0, width:380, height:380, borderRadius:"50%",
        background:`radial-gradient(circle,${C.accent}44 0%,transparent 70%)`, pointerEvents:"none" }} />
      <div style={{ maxWidth:680, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
        <H size="h2" style={{ color:"#fff", marginBottom:14 }}>
          The Full LTC Pharmacy Platform.<br/>One Partner. Zero Gaps.
        </H>
        <P style={{ color:"rgba(255,255,255,0.66)", marginBottom:32, fontSize:16 }}>
          Don't settle for a narrow automation tool or a general-purpose AI platform. SkypondTech is purpose-built for LTC pharmacy — DEA compliance, CS inventory, AI automation, analytics, and PointClickCare — everything you need, from one team that only works in LTC.
        </P>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <PBtn light onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" })}>
            Schedule a Demo →
          </PBtn>
          <a href={`tel:${CONTACT_PHONE}`} style={{ display:"inline-flex", alignItems:"center", gap:8,
            padding:"12px 24px", borderRadius:10, background:"transparent",
            color:"rgba(255,255,255,0.78)", fontWeight:600, fontSize:14, textDecoration:"none",
            border:"1.5px solid rgba(255,255,255,0.22)", fontFamily:"inherit", transition:"border-color 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.55)"}
            onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.22)"}>
            📞 {CONTACT_PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name:"", email:"", company:"", service:"", message:"" });
  const [sent, setSent] = useState(false);
  const inp = { width:"100%", padding:"11px 13px", borderRadius:9, background:C.alt,
    border:`1.5px solid ${C.border}`, color:C.head, fontSize:14, outline:"none",
    transition:"border-color 0.2s", boxSizing:"border-box", fontFamily:"inherit" };
  const lbl = { color:C.muted, fontSize:12.5, display:"block", marginBottom:5, fontWeight:600 };
  return (
    <section id="contact" style={{ padding:"92px 5vw", background:C.surface }}>
      <div style={{ maxWidth:640, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:44 }}>
          <div style={{ marginBottom:12 }}><Badge c={C.p}>✉ Get In Touch</Badge></div>
          <H size="h2" style={{ marginBottom:10 }}>Start a Conversation</H>
          <P>Tell us about your pharmacy's biggest compliance or operational bottleneck. We'll come back with a clear, honest plan.</P>
        </div>
        {sent ? (
          <Card hover={false} style={{ padding:"48px 36px", textAlign:"center" }}>
            <div style={{ fontSize:48, marginBottom:14 }}>✅</div>
            <H size="h3" style={{ marginBottom:10 }}>We'll Be in Touch</H>
            <P>Our team responds within one business day. Reach us directly at {CONTACT_EMAIL} or {CONTACT_PHONE_DISPLAY}.</P>
          </Card>
        ) : (
          <Card hover={false} style={{ padding:"34px 30px" }}>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                <div><label style={lbl}>Name *</label>
                  <input style={inp} placeholder="Your name" value={form.name}
                    onChange={e => setForm({...form,name:e.target.value})}
                    onFocus={e => e.target.style.borderColor=C.p}
                    onBlur={e => e.target.style.borderColor=C.border} /></div>
                <div><label style={lbl}>Work Email *</label>
                  <input style={inp} placeholder="you@pharmacy.com" value={form.email}
                    onChange={e => setForm({...form,email:e.target.value})}
                    onFocus={e => e.target.style.borderColor=C.p}
                    onBlur={e => e.target.style.borderColor=C.border} /></div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                <div><label style={lbl}>Pharmacy / Organization</label>
                  <input style={inp} placeholder="Company name" value={form.company}
                    onChange={e => setForm({...form,company:e.target.value})}
                    onFocus={e => e.target.style.borderColor=C.p}
                    onBlur={e => e.target.style.borderColor=C.border} /></div>
                <div><label style={lbl}>What are you looking for?</label>
                  <select style={{...inp,cursor:"pointer"}} value={form.service}
                    onChange={e => setForm({...form,service:e.target.value})}
                    onFocus={e => e.target.style.borderColor=C.p}
                    onBlur={e => e.target.style.borderColor=C.border}>
                    <option value="">Select…</option>
                    <option>DEA Lookup Tool & Compliance</option>
                    <option>Controlled Substance Inventory</option>
                    <option>LTC Analytics Dashboard</option>
                    <option>PointClickCare Data Feed</option>
                    <option>AI Automation</option>
                    <option>Custom Development</option>
                    <option>Microsoft Cloud Solutions</option>
                    <option>Full platform demo</option>
                  </select></div>
              </div>
              <div><label style={lbl}>Tell us about your challenge</label>
                <textarea style={{...inp,minHeight:96,resize:"vertical"}}
                  placeholder="What's your biggest compliance or operational bottleneck right now?"
                  value={form.message} onChange={e => setForm({...form,message:e.target.value})}
                  onFocus={e => e.target.style.borderColor=C.p}
                  onBlur={e => e.target.style.borderColor=C.border} />
              </div>
              <PBtn onClick={() => { if(form.name && form.email) setSent(true); }}>
                Send Message →
              </PBtn>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
}

/* ─── ROOT ────────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Products />
        <Dashboards />
        <Services />
        <IndustriesSection />
        <Testimonials />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

