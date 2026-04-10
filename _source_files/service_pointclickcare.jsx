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

/* ── Toggle widget: HL7 vs PCC API ── */
function APIWidget() {
  const [view, setView] = useState("api");

  const hl7Fields = [
    { label:"Event Type",           val:"A01 – Admit",          ok:true },
    { label:"Patient MRN",          val:"Partial only",          ok:false },
    { label:"Full Demographics",    val:"❌ Not transmitted",    ok:false },
    { label:"Insurance / Payer",    val:"❌ Not transmitted",    ok:false },
    { label:"Room / Bed",           val:"Sometimes",             ok:false },
    { label:"Effective Date",       val:"❌ Not transmitted",    ok:false },
    { label:"Discharge Reason",     val:"❌ Not transmitted",    ok:false },
    { label:"Transfer Destination", val:"❌ Not transmitted",    ok:false },
  ];
  const apiFields = [
    { label:"Event Type",           val:"Admission confirmed",       ok:true },
    { label:"Full Demographics",    val:"Name, DOB, gender, contact",ok:true },
    { label:"Insurance / Payer",    val:"Primary & secondary payer", ok:true },
    { label:"Room / Bed / Unit",    val:"Current location",          ok:true },
    { label:"Effective Date",       val:"Admission timestamp",       ok:true },
    { label:"Discharge Reason",     val:"Code + narrative",          ok:true },
    { label:"Transfer Destination", val:"Receiving unit / facility", ok:true },
    { label:"Active Medications",   val:"Current Rx list",           ok:true },
  ];
  const fields = view === "hl7" ? hl7Fields : apiFields;

  return (
    <div style={{ background:C.dark, borderRadius:20, overflow:"hidden",
      boxShadow:`0 24px 60px ${C.accent}30`, border:"1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ padding:"16px 20px 0", display:"flex", gap:8 }}>
        {[["hl7","HL7 Alone"],["api","PCC API"]].map(([k,label]) => (
          <button key={k} onClick={()=>setView(k)} style={{ flex:1, padding:"9px 12px",
            borderRadius:9, border:"none", cursor:"pointer", fontFamily:"inherit",
            fontWeight:700, fontSize:12.5, transition:"all 0.2s",
            background: view===k ? (k==="hl7"?`${C.amber}25`:`${C.accent}25`) : "rgba(255,255,255,0.05)",
            color: view===k ? (k==="hl7"?C.amber:C.accent) : "rgba(255,255,255,0.3)",
            border: view===k ? `1.5px solid ${k==="hl7"?C.amber+"50":C.accent+"50"}` : "1.5px solid transparent" }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ padding:"16px 20px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <div style={{ fontSize:10.5, fontWeight:700, color:"rgba(255,255,255,0.3)",
            textTransform:"uppercase", letterSpacing:"0.07em" }}>
            {view==="hl7" ? "ADT Data Available to Your Pharmacy" : "ADT Data via PCC API"}
          </div>
          <div style={{ padding:"3px 9px", borderRadius:5, fontSize:10.5, fontWeight:700,
            background: view==="hl7" ? `${C.amber}18` : `${C.green}18`,
            color: view==="hl7" ? C.amber : C.green,
            border:`1px solid ${view==="hl7"?C.amber+"40":C.green+"40"}` }}>
            {view==="hl7" ? "Incomplete" : "Complete"}
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
          {fields.map((f,i) => (
            <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"8px 12px", borderRadius:8,
              background: f.ok ? "rgba(5,150,105,0.07)" : "rgba(220,38,38,0.07)",
              border:`1px solid ${f.ok?"rgba(5,150,105,0.2)":"rgba(220,38,38,0.18)"}` }}>
              <span style={{ fontSize:12.5, color:"rgba(255,255,255,0.5)" }}>{f.label}</span>
              <span style={{ fontSize:12, fontWeight:700, color:f.ok?C.green:C.red }}>{f.val}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop:12, padding:"11px 13px", borderRadius:9,
          background: view==="hl7" ? `${C.amber}12` : `${C.green}10`,
          border:`1px solid ${view==="hl7"?C.amber+"30":C.green+"30"}` }}>
          <div style={{ fontSize:12, fontWeight:600, lineHeight:1.6,
            color: view==="hl7" ? C.amber : C.green }}>
            {view==="hl7"
              ? "HL7 tells you an event happened. It doesn't give you what you need to act on it."
              : "The PCC API delivers the complete record — no portal access, no calls, no gaps."}
          </div>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, padding:"0 20px 20px" }}>
        {[["No portal","Access needed"],["Real-time","Webhook + API"],["Complete","Census record"]].map(([v,l]) => (
          <div key={l} style={{ padding:"10px", borderRadius:8, textAlign:"center",
            background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ fontSize:13, fontWeight:900, color:C.accent,
              fontFamily:"'DM Sans',sans-serif" }}>{v}</div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", marginTop:3 }}>{l}</div>
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
        <span style={{ color:C.head, fontWeight:800, fontSize:17, letterSpacing:"-0.02em",
          fontFamily:"'DM Sans',sans-serif" }}>
          SkypondTech<span style={{ color:C.p }}>.ai</span>
        </span>
      </a>
      <div style={{ display:"flex", gap:26 }}>
        {[["Services","/services"],["Products","/products"],["About","/#about"],["Contact","/#contact"]].map(([l,h])=>(
          <a key={l} href={h} style={{ color:C.body, fontSize:13.5, fontWeight:600, textDecoration:"none" }}
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
    <section style={{ minHeight:"92vh", display:"flex", alignItems:"center",
      padding:"120px 5vw 80px", position:"relative", overflow:"hidden", background:C.dark }}>
      <div style={{ position:"absolute", inset:0,
        backgroundImage:`linear-gradient(${C.accent}07 1px,transparent 1px),linear-gradient(90deg,${C.accent}07 1px,transparent 1px)`,
        backgroundSize:"52px 52px", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:-180, right:-80, width:700, height:700, borderRadius:"50%",
        background:`radial-gradient(circle,${C.accent}20 0%,transparent 68%)`, pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-80, left:-60, width:480, height:480, borderRadius:"50%",
        background:`radial-gradient(circle,${C.p}28 0%,transparent 68%)`, pointerEvents:"none" }} />

      <div style={{ maxWidth:1100, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.05fr 1fr", gap:64, alignItems:"center" }}>
          <div>
            <div style={{ display:"flex", gap:10, marginBottom:20, animation:"fadeUp 0.6s ease both" }}>
              <Badge c={C.accent}>🔗 Service</Badge>
              <Badge c={C.muted}>PointClickCare Integration</Badge>
            </div>
            <H size="hero" color="#fff" style={{ marginBottom:22, animation:"fadeUp 0.6s 0.1s ease both" }}>
              HL7 Tells You Something Happened.{" "}
              <span style={{ background:`linear-gradient(90deg,${C.accent},${C.p2})`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                The API Tells You Everything Else.
              </span>
            </H>
            <P style={{ maxWidth:530, color:"rgba(255,255,255,0.72)", marginBottom:18,
              fontSize:"1.06rem", animation:"fadeUp 0.6s 0.18s ease both" }}>
              Most LTC pharmacies rely on HL7 for ADT notifications — but HL7 only delivers a fraction of the census data your pharmacy needs. Demographics, payer information, effective dates, discharge reason, and transfer details are routinely absent.
            </P>
            <P style={{ maxWidth:530, color:"rgba(255,255,255,0.5)",
              fontSize:"0.97rem", marginBottom:32, animation:"fadeUp 0.6s 0.22s ease both" }}>
              We close that gap using the PointClickCare Marketplace API — pulling the complete, structured resident record directly from PCC, without requiring facility staff to give your pharmacy portal access or send anything manually.
            </P>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", animation:"fadeUp 0.6s 0.28s ease both" }}>
              <PBtn href="/schedule">See a Technical Demo →</PBtn>
              <a href="#the-gap" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"12px 24px",
                borderRadius:10, background:"transparent", color:"rgba(255,255,255,0.72)", fontWeight:600,
                fontSize:14.5, border:"1.5px solid rgba(255,255,255,0.2)", textDecoration:"none" }}
                onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.5)"}
                onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.2)"}>
                See the Gap ↓
              </a>
            </div>
            <div style={{ display:"flex", gap:0, marginTop:50,
              borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:28,
              animation:"fadeUp 0.6s 0.4s ease both" }}>
              {[["PCC API","Direct data pull"],["No portal","Access required"],["Complete","ADT records"],["Real-time","Webhook + polling"]].map(([v,l],i,a) => (
                <div key={i} style={{ flex:1, paddingRight:16,
                  borderRight:i<a.length-1?"1px solid rgba(255,255,255,0.1)":"none",
                  marginRight:i<a.length-1?16:0 }}>
                  <div style={{ fontSize:"clamp(0.9rem,1.3vw,1.1rem)", fontWeight:900, color:C.accent,
                    letterSpacing:"-0.01em", fontFamily:"'DM Sans',sans-serif" }}>{v}</div>
                  <div style={{ color:"rgba(255,255,255,0.35)", fontSize:11.5, marginTop:2, fontWeight:500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ animation:"fadeUp 0.7s 0.2s ease both" }}>
            <APIWidget />
          </div>
        </div>
      </div>
    </section>
  );
}

function TheGap() {
  return (
    <section id="the-gap" style={{ padding:"88px 5vw", background:C.surface }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.amber}>⚠ The HL7 Gap</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>Why HL7 Alone Leaves Your Pharmacy Operating Blind</H>
          <P style={{ maxWidth:580, margin:"0 auto" }}>
            HL7 ADT messages were designed as event triggers — not as complete data records. What they transmit is enough to know something changed. It's rarely enough to act on it without a follow-up call to the facility.
          </P>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:40 }}>
          {/* HL7 alone */}
          <div style={{ borderRadius:16, border:`2px solid ${C.amber}40`, background:`${C.amber}05`, padding:"28px 26px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <div style={{ width:44, height:44, borderRadius:11, background:`${C.amber}18`,
                border:`1px solid ${C.amber}40`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>📡</div>
              <div>
                <div style={{ fontSize:10.5, fontWeight:700, color:C.amber, textTransform:"uppercase", letterSpacing:"0.07em" }}>HL7 Integration Alone</div>
                <div style={{ color:C.head, fontWeight:700, fontSize:17, fontFamily:"'DM Sans',sans-serif", marginTop:3 }}>Incomplete Picture</div>
              </div>
            </div>
            {[
              [true,  "Notifies you an ADT event occurred"],
              [true,  "Delivers patient ID and event type"],
              [false, "Full demographics not transmitted"],
              [false, "Payer / insurance data not transmitted"],
              [false, "Effective dates for billing not transmitted"],
              [false, "Discharge reason not transmitted"],
              [false, "Transfer destination not transmitted"],
              [false, "Gaps filled by phone calls to the facility"],
            ].map(([ok, text], i) => (
              <div key={i} style={{ display:"flex", gap:9, alignItems:"flex-start", marginBottom:8,
                padding:"8px 11px", borderRadius:8,
                background: ok ? `${C.green}07` : `${C.amber}08`,
                border:`1px solid ${ok?C.green+"20":C.amber+"22"}` }}>
                <span style={{ fontSize:12, fontWeight:800, flexShrink:0, marginTop:1,
                  color: ok ? C.green : C.amber }}>{ok ? "✓" : "⚠"}</span>
                <span style={{ fontSize:13.5, color:C.body, lineHeight:1.45 }}>{text}</span>
              </div>
            ))}
          </div>

          {/* PCC API */}
          <div style={{ borderRadius:16, border:`2px solid ${C.accent}40`, background:`${C.accent}05`, padding:"28px 26px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <div style={{ width:44, height:44, borderRadius:11, background:`${C.accent}18`,
                border:`1px solid ${C.accent}40`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>🔌</div>
              <div>
                <div style={{ fontSize:10.5, fontWeight:700, color:C.accent, textTransform:"uppercase", letterSpacing:"0.07em" }}>HL7 + PCC Marketplace API</div>
                <div style={{ color:C.head, fontWeight:700, fontSize:17, fontFamily:"'DM Sans',sans-serif", marginTop:3 }}>Complete Picture</div>
              </div>
            </div>
            {[
              "Real-time webhook notification of ADT event",
              "API pull retrieves the full structured resident record",
              "Complete demographics — name, DOB, contact, gender",
              "Primary and secondary payer information",
              "Admission and discharge effective dates for billing",
              "Discharge reason code and narrative",
              "Transfer destination — unit, room, or facility",
              "No facility portal access or manual input required",
            ].map((text, i) => (
              <div key={i} style={{ display:"flex", gap:9, alignItems:"flex-start", marginBottom:8,
                padding:"8px 11px", borderRadius:8,
                background:`${C.green}07`, border:`1px solid ${C.green}20` }}>
                <span style={{ fontSize:12, fontWeight:800, color:C.green, flexShrink:0, marginTop:1 }}>✓</span>
                <span style={{ fontSize:13.5, color:C.body, lineHeight:1.45 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding:"24px 28px", borderRadius:16,
          background:`linear-gradient(135deg,${C.accent}0B,${C.p}07)`,
          border:`1.5px solid ${C.accent}28`, display:"flex", gap:18, alignItems:"flex-start" }}>
          <div style={{ fontSize:28, flexShrink:0 }}>💡</div>
          <div>
            <div style={{ color:C.head, fontWeight:700, fontSize:16, marginBottom:8,
              fontFamily:"'DM Sans',sans-serif" }}>
              The real problem: pharmacies shouldn't need the facility to get their own patient data
            </div>
            <P style={{ marginBottom:0, fontSize:"0.95rem" }}>
              When a patient is admitted, discharged, or transferred, your pharmacy needs to act — update records, manage billing dates, prevent unnecessary fills, initiate prior auth. Every one of those actions requires data that HL7 doesn't reliably deliver. The PCC Marketplace API delivers it directly, programmatically, the moment the event occurs.
            </P>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon:"📡", color:C.amber, label:"Step 1", title:"HL7 Delivers the Trigger",
      desc:"An ADT event fires in PointClickCare — admission, discharge, or transfer. The HL7 message arrives at your pharmacy. You know something happened. You don't yet have everything you need to act on it." },
    { icon:"🔔", color:C.accent, label:"Step 2", title:"Webhook Confirms in Real Time",
      desc:"Simultaneously, our PCC Marketplace webhook subscription receives a real-time notification. This immediately triggers an API call — no polling delay, no manual check, no waiting for facility staff." },
    { icon:"📦", color:C.p, label:"Step 3", title:"API Pulls the Complete Record",
      desc:"Using the PCC RESTful API, we retrieve the full structured resident record — demographics, payer, effective dates, room/bed, discharge reason, transfer destination, and active Rx list. Everything, automatically." },
    { icon:"⚡", color:C.green, label:"Step 4", title:"Pharmacy System Updated",
      desc:"Complete data is written directly to your pharmacy management system. Patient setup, payer information, billing dates, and order actions are triggered and updated without your staff touching a keyboard." },
    { icon:"📊", color:C.violet, label:"Step 5", title:"Census Dashboard Stays Current",
      desc:"Your pharmacy census dashboard reflects every facility in real time — active residents, recent ADT events, reconciliation status, and any data exceptions that need human review. One screen, full picture." },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.alt }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.accent}>⚡ How It Works</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>From ADT Event to Complete Record — Automatically</H>
          <P style={{ maxWidth:460, margin:"0 auto" }}>How HL7, webhooks, and the PCC API work together to give your pharmacy the full census picture in real time.</P>
        </div>
        <div style={{ position:"relative" }}>
          <div style={{ position:"absolute", left:27, top:44, bottom:44, width:2,
            background:`linear-gradient(to bottom,${C.amber},${C.accent},${C.p},${C.green},${C.violet})`,
            opacity:0.25, pointerEvents:"none" }} />
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {steps.map((s,i) => (
              <div key={i} style={{ display:"flex", gap:20, padding:"22px 24px", borderRadius:14,
                background:C.surface, border:`1px solid ${C.border}`, alignItems:"flex-start",
                transition:"border-color 0.2s, box-shadow 0.2s", position:"relative" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=s.color+"50"; e.currentTarget.style.boxShadow=`0 8px 28px ${s.color}12`; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow="none"; }}>
                <div style={{ width:38, height:38, borderRadius:10, background:`${s.color}14`,
                  border:`1.5px solid ${s.color}40`, display:"flex", alignItems:"center",
                  justifyContent:"center", flexShrink:0, fontSize:17, zIndex:1 }}>{s.icon}</div>
                <div>
                  <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:6 }}>
                    <span style={{ fontSize:10.5, fontWeight:700, color:s.color,
                      textTransform:"uppercase", letterSpacing:"0.07em" }}>{s.label}</span>
                    <div style={{ color:C.head, fontWeight:700, fontSize:16,
                      fontFamily:"'DM Sans',sans-serif" }}>{s.title}</div>
                  </div>
                  <div style={{ color:C.body, fontSize:14.5, lineHeight:1.68 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatYouGet() {
  const benefits = [
    { icon:"🚫", color:C.accent, title:"No Facility Portal Access Required",
      desc:"Your team gets complete, structured ADT data from the PCC API directly — no PCC user accounts, no facility admin involvement, no portal login from your staff for each facility they serve." },
    { icon:"💊", color:C.red, title:"Stop Fills for Discharged Patients",
      desc:"Real-time discharge notification with effective date means auto-refills stop the moment a patient leaves — preventing medication waste and the billing disputes and credit cycles that follow." },
    { icon:"💰", color:C.green, title:"Billing Dates Correct from Day One",
      desc:"Admission and discharge effective dates from the API mean billing dates are accurate from the first fill. No retroactive credits, no dispute cycles, no staff manually correcting dates after the fact." },
    { icon:"📋", color:C.p, title:"Prior Auth Triggered at Admission",
      desc:"Full payer data at admission means prior authorization requests are initiated immediately — not after a call to the facility to confirm what insurance the patient has." },
    { icon:"🔄", color:C.violet, title:"Automated Daily Census Reconciliation",
      desc:"Daily census pulled programmatically via the API creates an automatic differential report — surfacing discrepancies between your records and the facility's actual resident list without manual comparison." },
    { icon:"📞", color:C.amber, title:"Fewer Calls in Both Directions",
      desc:"Facility staff stop calling for order status. Your staff stop calling for patient data. The API handles the exchange so neither side needs to pick up the phone." },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.surface }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.p}>✦ What You Get</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>The Operational Difference a Complete Census Makes</H>
          <P style={{ maxWidth:480, margin:"0 auto" }}>
            When your pharmacy has the full ADT picture in real time, six operational problems solve themselves.
          </P>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:18 }}>
          {benefits.map((b,i) => (
            <Card key={i} ac={b.color} style={{ padding:"26px 24px" }}>
              <div style={{ width:42, height:42, borderRadius:11, background:`${b.color}12`,
                border:`1px solid ${b.color}28`, display:"flex", alignItems:"center",
                justifyContent:"center", fontSize:20, marginBottom:16 }}>{b.icon}</div>
              <H size="h3" style={{ marginBottom:9, fontSize:15.5 }}>{b.title}</H>
              <P style={{ fontSize:"0.9rem", lineHeight:1.68 }}>{b.desc}</P>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function DataShared() {
  const categories = [
    { label:"ADT Events",           color:C.accent, fields:["Admission","Discharge","Transfer","Leave of absence","Room / bed change"] },
    { label:"Resident Demographics",color:C.p,      fields:["Full name & DOB","Gender","Contact information","Emergency contacts","Insurance IDs"] },
    { label:"Payer & Billing",      color:C.green,  fields:["Primary insurance","Secondary insurance","Admission effective date","Discharge date & reason","Prior auth information"] },
    { label:"Location & Census",    color:C.violet, fields:["Current facility","Unit & room / bed","Transfer destination","Census date & time","Admission source"] },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.alt }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.accent}>📦 Data Coverage</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>What the PCC API Delivers to Your Pharmacy</H>
          <P style={{ maxWidth:480, margin:"0 auto" }}>
            Complete, structured resident data — delivered securely through the PCC Marketplace API the moment an ADT event occurs.
          </P>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:18 }}>
          {categories.map((cat,i) => (
            <Card key={i} ac={cat.color} style={{ padding:"24px 22px" }}>
              <div style={{ fontSize:11, fontWeight:700, color:cat.color,
                textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:14 }}>{cat.label}</div>
              {cat.fields.map((f,j) => (
                <div key={j} style={{ display:"flex", gap:8, alignItems:"center", marginBottom:7,
                  padding:"8px 10px", borderRadius:7, background:C.bg, border:`1px solid ${C.border}` }}>
                  <span style={{ color:cat.color, fontWeight:800, fontSize:11 }}>✓</span>
                  <span style={{ color:C.body, fontSize:13.5 }}>{f}</span>
                </div>
              ))}
            </Card>
          ))}
        </div>
        <div style={{ marginTop:22, padding:"20px 26px", borderRadius:14,
          background:`${C.accent}08`, border:`1.5px solid ${C.accent}25`,
          display:"flex", gap:16, alignItems:"center" }}>
          <span style={{ fontSize:22, flexShrink:0 }}>🔒</span>
          <div>
            <div style={{ color:C.head, fontWeight:700, fontSize:15, marginBottom:4,
              fontFamily:"'DM Sans',sans-serif" }}>HIPAA-Compliant Exchange via PCC Marketplace</div>
            <P style={{ fontSize:"0.9rem", marginBottom:0 }}>
              All data flows through the PCC Marketplace API — authenticated via OAuth 2.0, encrypted in transit, with a full audit log of every API call. PHI is never retained outside your defined systems. BAA agreements are in place with both PCC and your pharmacy before any data is exchanged.
            </P>
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  const cases = [
    { icon:"💊", title:"Discharge Fill Prevention",
      who:"Multi-facility LTC pharmacy filling medications for patients already discharged",
      outcome:"Real-time discharge notifications with effective dates eliminated fills for discharged patients. Medication waste cost dropped significantly in the first quarter. Zero discharge-date billing disputes since go-live." },
    { icon:"💰", title:"Prior Auth Triggered at Admission",
      who:"LTC pharmacy with a consistent 2–3 day delay in initiating prior authorizations",
      outcome:"Full payer data at admission triggered automated PA initiation. Delay reduced from 2–3 days to under 4 hours. Denial rate from late PA submissions dropped to zero." },
    { icon:"📋", title:"Daily Census Reconciliation Automated",
      who:"Regional LTC pharmacy spending 3 hours daily reconciling census across 14 facilities",
      outcome:"Automated daily differential report built from API data replaced manual reconciliation entirely. Discrepancies surfaced and resolved same-day rather than accumulating into month-end billing corrections." },
    { icon:"📞", title:"Eliminating Inbound Facility Calls",
      who:"LTC pharmacy receiving 40+ facility calls per day for order status and patient information",
      outcome:"API integration gave facility staff direct data access. Inbound calls reduced 75%. Pharmacy team time redirected to clinical review and dispensing." },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.surface }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.violet}>📁 Results</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>What Happens When the Gap Closes</H>
          <P style={{ maxWidth:440, margin:"0 auto" }}>Outcomes from LTC pharmacies that replaced incomplete HL7 data with full PCC API coverage.</P>
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
    { q:"Why can't we just rely on our existing HL7 feed?", a:"HL7 ADT messages are event triggers, not complete data records. The HL7 standard marks most fields as optional, and in practice many facilities transmit only the minimum — patient ID and event type. Demographics, payer information, effective dates, and discharge details are frequently absent. Those missing fields are exactly what your pharmacy needs to take the right action." },
    { q:"Do we need PointClickCare user accounts for our pharmacy staff?", a:"No — and that's one of the core benefits. We connect through the PCC Marketplace API, which authenticates at the application level. Your pharmacy staff don't need individual PCC credentials, and you're not dependent on facility IT administrators granting system access." },
    { q:"Does the facility need to do anything to enable this?", a:"A one-time activation through the PointClickCare Marketplace portal is required — the facility or corporate entity submits a request, we confirm the setup on our end, and PCC activates the API connection within 2–3 business days. After that, data flows automatically with no ongoing action from the facility." },
    { q:"What happens if the API connection goes down?", a:"We build retry logic and alerting into every integration. Failed API calls are retried automatically on a defined schedule, and our monitoring team is alerted immediately for persistent failures. Your team is notified so manual processes can resume temporarily if needed. We target 99.9% uptime on all integration connections." },
    { q:"Can this work across multiple facilities with different PCC environments?", a:"Yes. We handle multi-facility deployments where each facility may have different PCC configurations. The integration layer normalizes the data before it reaches your pharmacy system — so you get a consistent, structured record regardless of how individual facilities have set up their PCC environment." },
    { q:"How is PHI protected through the API connection?", a:"All data is exchanged via the PCC Marketplace API using OAuth 2.0 authentication and TLS 1.3 encryption in transit. We maintain a full audit log for every API call. PHI is never cached in intermediate systems, and BAA agreements are in place with both PointClickCare and your pharmacy before any data exchange begins." },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.alt }}>
      <div style={{ maxWidth:780, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.p}>❓ FAQ</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>Questions We Get Asked</H>
          <P style={{ maxWidth:400, margin:"0 auto" }}>Straight answers about the HL7 gap and how the PCC API fills it.</P>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {faqs.map((f,i) => (
            <div key={i} style={{ borderRadius:12, border:`1.5px solid ${open===i?C.accent+"44":C.border}`,
              overflow:"hidden", transition:"border-color 0.2s", boxShadow:open===i?`0 4px 20px ${C.accent}10`:"none" }}>
              <button onClick={()=>setOpen(open===i?null:i)}
                style={{ width:"100%", padding:"18px 22px", display:"flex", alignItems:"center",
                  justifyContent:"space-between", background:open===i?`${C.accent}06`:C.surface,
                  border:"none", cursor:"pointer", fontFamily:"inherit", textAlign:"left" }}>
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
    { icon:"⚙️", color:C.accent, tag:"Service", title:"AI Automation", href:"/services/ai-automation",
      desc:"Workflow automation including census-triggered order management and prior auth initiation." },
    { icon:"🔗", color:C.violet, tag:"Product", title:"PointClickCare Data Feed", href:"/products/pointclickcare-feed",
      desc:"Our pre-built PCC data feed product — faster deployment for standard integration needs." },
  ];
  return (
    <section style={{ padding:"72px 5vw", background:C.surface }}>
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
      <div style={{ maxWidth:680, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
        <H size="h2" style={{ color:"#fff", marginBottom:14 }}>
          Ready to Get the Full ADT Picture Without Calling the Facility?
        </H>
        <P style={{ color:"rgba(255,255,255,0.65)", marginBottom:32, fontSize:16 }}>
          Schedule a technical walkthrough. We'll show you exactly what your current HL7 feed is missing, how the PCC API fills those gaps, and what the integration looks like against your existing pharmacy system.
        </P>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <PBtn light href="/schedule">Book a Technical Walkthrough →</PBtn>
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

export default function PointClickCareIntegration() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:#1C3053;color:#3A3E60;font-family:'DM Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);}}
        ::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-track{background:#1C3053;}
        ::-webkit-scrollbar-thumb{background:#60A4B1;border-radius:3px;}
      `}</style>
      <Navbar />
      <main>
        <Hero />
        <TheGap />
        <HowItWorks />
        <WhatYouGet />
        <DataShared />
        <UseCases />
        <FAQ />
        <Related />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
