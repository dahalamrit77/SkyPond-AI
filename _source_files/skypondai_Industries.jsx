import { useState, useEffect } from "react";

const C = {
  bg:"#EEF4F8", surface:"#FFFFFF", alt:"#E3EFF6", border:"#C9DFEA",
  p:"#1C3053", pd:"#141F38", p2:"#6ABDE9",
  accent:"#60A4B1", violet:"#B6CAEB", green:"#6BA769",
  amber:"#D3A217", red:"#F58033",
  head:"#1C3053", body:"#2D4066", muted:"#6B8BAF",
  dark:"#1C3053",
};

const Badge = ({ c=C.p, children }) => (
  <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"4px 13px",
    borderRadius:99, border:`1px solid ${c}28`, background:`${c}0B`, color:c,
    fontSize:11.5, letterSpacing:"0.07em", textTransform:"uppercase", fontWeight:700 }}>
    {children}
  </span>
);
const H = ({ size="h2", style={}, color, children }) => {
  const s = { hero:"clamp(2.2rem,4.5vw,3.6rem)", h2:"clamp(1.7rem,2.5vw,2.3rem)", h3:"1.15rem" };
  return <h2 style={{ fontSize:s[size], fontWeight:800, color:color||C.head,
    letterSpacing:"-0.026em", lineHeight:1.12,
    fontFamily:"'DM Sans',system-ui,sans-serif", ...style }}>{children}</h2>;
};
const P = ({ style={}, children }) => (
  <p style={{ fontSize:"clamp(0.95rem,1.05vw,1.02rem)", color:C.body, lineHeight:1.78, ...style }}>{children}</p>
);
function PBtn({ children, href, light }) {
  const base = { display:"inline-flex", alignItems:"center", gap:8, padding:"12px 26px",
    borderRadius:10, fontWeight:700, fontSize:14.5, cursor:"pointer",
    textDecoration:"none", fontFamily:"inherit", transition:"all 0.15s" };
  const v = light
    ? {...base, background:C.surface, color:C.p, border:`1.5px solid ${C.border}`, boxShadow:"0 2px 10px rgba(0,0,0,0.07)"}
    : {...base, background:`linear-gradient(135deg,${C.p},#2A4A7F)`, color:"#fff", border:"none", boxShadow:`0 4px 20px ${C.p}45`};
  return <a href={href} style={v}
    onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"}
    onMouseLeave={e => e.currentTarget.style.transform="none"}>
    {children}
  </a>;
}

function Navbar() {
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const f = () => setSc(window.scrollY > 30);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, height:64, padding:"0 5vw",
      display:"flex", alignItems:"center", justifyContent:"space-between",
      background: sc ? "rgba(238,244,248,0.96)" : "transparent",
      backdropFilter: sc ? "blur(18px)" : "none",
      borderBottom: sc ? `1px solid ${C.border}` : "none", transition:"all 0.3s" }}>
      <a href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
        <img src="/logosymbol.png" alt="SkypondTech" style={{ width:36, height:36,
          objectFit:"contain", mixBlendMode:"multiply", filter:"brightness(0.9)" }} />
        <span style={{ color:C.head, fontWeight:800, fontSize:17, letterSpacing:"-0.02em",
          fontFamily:"'DM Sans',sans-serif" }}>
          SkypondTech<span style={{ color:C.p2 }}>.ai</span>
        </span>
      </a>
      <div style={{ display:"flex", gap:26 }}>
        {[["Services","/services"],["Products","/products"],["Industries","/industries"],["About","/about"],["Contact","/#contact"]].map(([l,h]) => (
          <a key={l} href={h}
            style={{ color: l==="Industries" ? C.p2 : C.body,
              fontSize:13.5, fontWeight: l==="Industries" ? 700 : 600, textDecoration:"none" }}
            onMouseEnter={e => e.currentTarget.style.color = C.p2}
            onMouseLeave={e => e.currentTarget.style.color = l==="Industries" ? C.p2 : C.body}>{l}</a>
        ))}
      </div>
      <PBtn href="/schedule">Schedule a Demo →</PBtn>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{ minHeight:"64vh", display:"flex", alignItems:"center",
      padding:"120px 5vw 72px", position:"relative", overflow:"hidden",
      background:`linear-gradient(160deg,${C.dark} 0%,#0D2040 100%)` }}>
      <div style={{ position:"absolute", inset:0,
        backgroundImage:`linear-gradient(${C.p2}09 1px,transparent 1px),linear-gradient(90deg,${C.p2}09 1px,transparent 1px)`,
        backgroundSize:"52px 52px", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:-140, right:-60, width:580, height:580, borderRadius:"50%",
        background:`radial-gradient(circle,${C.p2}20 0%,transparent 68%)`, pointerEvents:"none" }} />

      <div style={{ maxWidth:820, margin:"0 auto", position:"relative", zIndex:1, textAlign:"center" }}>
        <div style={{ marginBottom:18, animation:"fadeUp 0.5s ease both" }}>
          <Badge c={C.p2}>Who We Work With</Badge>
        </div>
        <H size="hero" color="#fff" style={{ marginBottom:20, animation:"fadeUp 0.5s 0.08s ease both" }}>
          Deep Where It Matters.{" "}
          <span style={{ background:`linear-gradient(90deg,${C.p2},${C.accent})`,
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            Capable Beyond It.
          </span>
        </H>
        <P style={{ maxWidth:580, margin:"0 auto 36px", color:"rgba(255,255,255,0.65)",
          fontSize:"1.06rem", animation:"fadeUp 0.5s 0.14s ease both" }}>
          Our expertise is rooted in LTC pharmacy and long-term care. But the analytics, integration, and custom development work we do travels across industries — and we're selective about where we take it.
        </P>
      </div>
    </section>
  );
}

/* ── PRIMARY VERTICALS ── */
function PrimaryVerticals() {
  const verticals = [
    {
      tag:"Primary Focus",
      tagColor:C.p,
      icon:"💊",
      color:C.p,
      title:"LTC Pharmacy",
      subtitle:"Our deepest domain — built from the inside out",
      desc:"We started here and it remains the center of everything we do. After close to a decade working inside LTC pharmacy operations, our team understands the dispensing cycles, DEA compliance requirements, prior auth workflows, and system integrations that make this industry unlike any other.",
      services:["PointClickCare API & HL7 Integration","DEA Compliance Reporting","AI Workflow Automation","Power BI Analytics & Dashboards","Custom Pharmacy Applications","Microsoft Cloud & HIPAA Configuration"],
      systems:["QS/1 (NRx)","FrameworkLTC","PioneerRx","BestRx"],
      cta:"View LTC Pharmacy Services",
      ctaHref:"/services",
    },
    {
      tag:"Near-Primary",
      tagColor:C.accent,
      icon:"🏥",
      color:C.accent,
      title:"LTC Facilities",
      subtitle:"SNF, ALF, Memory Care & Behavioral Health",
      desc:"Skilled nursing facilities, assisted living communities, memory care, and behavioral health organizations sit at the same intersection as LTC pharmacy — similar compliance demands, overlapping systems, and the same need for technology that actually understands the care setting.",
      services:["PointClickCare & MatrixCare Integrations","Census & ADT Data Automation","EHR-to-Pharmacy Data Feeds","Resident Analytics Dashboards","AHT & MatrixCare Reporting","Custom Operations Tools"],
      systems:["PointClickCare","MatrixCare","American HealthTech (AHT)"],
      cta:"Talk to Our Team",
      ctaHref:"/schedule",
    },
  ];

  return (
    <section style={{ padding:"88px 5vw", background:C.surface }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.p}>Core Verticals</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>Where We Have the Deepest Expertise</H>
          <P style={{ maxWidth:520, margin:"0 auto" }}>
            Two verticals where our team has real, hands-on domain knowledge — not just technology experience.
          </P>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
          {verticals.map((v, i) => (
            <div key={i} style={{ borderRadius:20, border:`2px solid ${v.color}30`,
              background: i===0 ? `linear-gradient(160deg,${C.p}06,${C.p2}04)` : `${C.accent}05`,
              padding:"36px 32px", display:"flex", flexDirection:"column", gap:0 }}>

              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:48, height:48, borderRadius:12, background:`${v.color}14`,
                    border:`1.5px solid ${v.color}35`, display:"flex", alignItems:"center",
                    justifyContent:"center", fontSize:22 }}>{v.icon}</div>
                  <div>
                    <div style={{ fontSize:10.5, fontWeight:700, color:v.tagColor,
                      textTransform:"uppercase", letterSpacing:"0.07em" }}>{v.tag}</div>
                    <H size="h3" style={{ fontSize:20, marginTop:2 }}>{v.title}</H>
                  </div>
                </div>
              </div>

              <div style={{ fontSize:13.5, fontWeight:600, color:v.color, marginBottom:12 }}>{v.subtitle}</div>
              <P style={{ fontSize:"0.93rem", marginBottom:24 }}>{v.desc}</P>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:24 }}>
                {/* Services */}
                <div>
                  <div style={{ fontSize:10.5, fontWeight:700, color:C.muted,
                    textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>What We Do</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    {v.services.map((s, j) => (
                      <div key={j} style={{ display:"flex", gap:7, alignItems:"flex-start" }}>
                        <span style={{ color:v.color, fontWeight:800, fontSize:11, marginTop:2, flexShrink:0 }}>✓</span>
                        <span style={{ color:C.body, fontSize:12.5, lineHeight:1.5 }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Systems */}
                <div>
                  <div style={{ fontSize:10.5, fontWeight:700, color:C.muted,
                    textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>Systems We Know</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {v.systems.map((s, j) => (
                      <span key={j} style={{ padding:"4px 10px", borderRadius:6, fontSize:12,
                        background:`${v.color}10`, border:`1px solid ${v.color}25`,
                        color:v.color, fontWeight:600 }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              <a href={v.ctaHref} style={{ display:"inline-flex", alignItems:"center", gap:7,
                padding:"10px 20px", borderRadius:9, background:`${v.color}14`,
                border:`1.5px solid ${v.color}35`, color:v.color, fontWeight:700,
                fontSize:13.5, textDecoration:"none", alignSelf:"flex-start",
                transition:"all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.background=`${v.color}22`; }}
                onMouseLeave={e => { e.currentTarget.style.background=`${v.color}14`; }}>
                {v.cta} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── BROADER INDUSTRIES ── */
function BroaderIndustries() {
  const industries = [
    { icon:"📊", color:C.amber,  title:"Financial Services",
      services:["Executive & operational dashboards","Custom reporting from multiple data sources","Power BI implementations","Data pipeline & warehouse builds"],
      desc:"We've built analytics platforms and custom reporting tools for financial firms that needed clarity across complex, multi-source datasets — without the overhead of a large BI consultancy." },
    { icon:"🛍️", color:C.green,  title:"Retail & E-Commerce",
      services:["Sales & inventory dashboards","Customer analytics & segmentation","Custom web applications","Operational reporting tools"],
      desc:"Retail and e-commerce organizations come to us when off-the-shelf analytics tools aren't giving them what they need — and they want something built to their actual business logic." },
    { icon:"🏢", color:C.violet, title:"Other Industries",
      services:["Data Analytics & Power BI","Custom web application development","System integration & data pipelines","Operational dashboards"],
      desc:"If your organization needs a custom analytics solution or a web application built right, we're worth a conversation — regardless of industry. We're selective, but not closed." },
  ];

  return (
    <section style={{ padding:"88px 5vw", background:C.alt }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:16 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.amber}>Beyond LTC</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>We Also Work With</H>
        </div>

        {/* Context banner */}
        <div style={{ padding:"18px 24px", borderRadius:12, marginBottom:44,
          background:`${C.p}08`, border:`1.5px solid ${C.p}20`,
          display:"flex", gap:14, alignItems:"flex-start", maxWidth:820, margin:"0 auto 44px" }}>
          <span style={{ fontSize:20, flexShrink:0 }}>💡</span>
          <P style={{ fontSize:"0.93rem", marginBottom:0 }}>
            Two of our six services — <strong style={{ color:C.p }}>Data Analytics & Power BI</strong> and <strong style={{ color:C.p }}>Custom Development</strong> — apply cleanly outside the healthcare space. If you're in finance, retail, or another industry and need serious analytics work or a custom application, we can help.
          </P>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
          {industries.map((ind, i) => (
            <div key={i} style={{ padding:"28px 26px", borderRadius:18, background:C.surface,
              border:`1.5px solid ${C.border}`, transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=ind.color+"50"; e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 16px 36px ${ind.color}14`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
              <div style={{ width:44, height:44, borderRadius:11, background:`${ind.color}12`,
                border:`1.5px solid ${ind.color}30`, display:"flex", alignItems:"center",
                justifyContent:"center", fontSize:20, marginBottom:16 }}>{ind.icon}</div>
              <H size="h3" style={{ fontSize:17, marginBottom:10 }}>{ind.title}</H>
              <P style={{ fontSize:"0.88rem", marginBottom:18, lineHeight:1.7 }}>{ind.desc}</P>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {ind.services.map((s, j) => (
                  <div key={j} style={{ display:"flex", gap:7, alignItems:"flex-start" }}>
                    <span style={{ color:ind.color, fontWeight:800, fontSize:11, marginTop:2, flexShrink:0 }}>✓</span>
                    <span style={{ color:C.body, fontSize:13, lineHeight:1.5 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign:"center", marginTop:40 }}>
          <a href="/services/data-analytics" style={{ display:"inline-flex", alignItems:"center", gap:8,
            padding:"11px 22px", borderRadius:9, background:C.surface,
            border:`1.5px solid ${C.border}`, color:C.body, fontWeight:600,
            fontSize:13.5, textDecoration:"none", marginRight:12, transition:"border-color 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor=C.p2}
            onMouseLeave={e => e.currentTarget.style.borderColor=C.border}>
            Data Analytics Service →
          </a>
          <a href="/services/custom-development" style={{ display:"inline-flex", alignItems:"center", gap:8,
            padding:"11px 22px", borderRadius:9, background:C.surface,
            border:`1.5px solid ${C.border}`, color:C.body, fontWeight:600,
            fontSize:13.5, textDecoration:"none", transition:"border-color 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor=C.p2}
            onMouseLeave={e => e.currentTarget.style.borderColor=C.border}>
            Custom Development Service →
          </a>
        </div>
      </div>
    </section>
  );
}

function RightFit() {
  return (
    <section style={{ padding:"88px 5vw", background:C.surface }}>
      <div style={{ maxWidth:860, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.accent}>Is There a Fit?</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>How We Decide Whether to Work Together</H>
          <P style={{ maxWidth:520, margin:"0 auto" }}>
            We're not the right partner for everyone — and we'd rather say that upfront than take on a project we can't do well.
          </P>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          <div style={{ padding:"28px 26px", borderRadius:16,
            background:`${C.green}07`, border:`2px solid ${C.green}25` }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.green,
              textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:18 }}>✓ Strong Fit</div>
            {[
              "LTC pharmacy or long-term care facility — any scope",
              "Organization needing serious analytics or BI work",
              "Custom web application with complex business logic",
              "System integration across multiple data sources",
              "Team that wants a long-term technology partner",
              "Project where domain knowledge actually matters",
            ].map((item, i, a) => (
              <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start",
                padding:"9px 0", borderBottom: i<a.length-1?`1px solid ${C.green}15`:"none" }}>
                <span style={{ color:C.green, fontWeight:800, fontSize:13, flexShrink:0, marginTop:1 }}>✓</span>
                <span style={{ color:C.body, fontSize:14, lineHeight:1.55 }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ padding:"28px 26px", borderRadius:16,
            background:`${C.muted}07`, border:`2px solid ${C.border}` }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.muted,
              textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:18 }}>✗ Likely Not a Fit</div>
            {[
              "General IT support or helpdesk services",
              "Simple website or marketing site builds",
              "Industries outside our experience without analytics/dev needs",
              "Projects where lowest price is the primary decision factor",
              "One-time deliverable with no ongoing relationship",
              "Timelines that require a large team on day one",
            ].map((item, i, a) => (
              <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start",
                padding:"9px 0", borderBottom: i<a.length-1?`1px solid ${C.border}`:"none" }}>
                <span style={{ color:C.muted, fontWeight:800, fontSize:13, flexShrink:0, marginTop:1 }}>✗</span>
                <span style={{ color:C.muted, fontSize:14, lineHeight:1.55 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{ padding:"80px 5vw",
      background:`linear-gradient(160deg,${C.dark} 0%,#0D2040 100%)`,
      position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:-120, right:-60, width:460, height:460, borderRadius:"50%",
        background:`radial-gradient(circle,${C.p2}22 0%,transparent 70%)`, pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-60, left:0, width:320, height:320, borderRadius:"50%",
        background:`radial-gradient(circle,${C.accent}28 0%,transparent 70%)`, pointerEvents:"none" }} />
      <div style={{ maxWidth:620, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
        <H size="h2" style={{ color:"#fff", marginBottom:14 }}>
          Not Sure If There's a Fit? Just Ask.
        </H>
        <P style={{ color:"rgba(255,255,255,0.62)", marginBottom:32, fontSize:"1.05rem" }}>
          Book a 30-minute call. We'll tell you honestly whether we're the right team for your project — and if we're not, we'll say so.
        </P>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <PBtn href="/schedule">Schedule a Free Call →</PBtn>
          <a href="/about" style={{ display:"inline-flex", alignItems:"center", gap:8,
            padding:"12px 24px", borderRadius:10, background:"transparent",
            color:"rgba(255,255,255,0.72)", fontWeight:600, fontSize:14.5,
            border:`1.5px solid rgba(255,255,255,0.22)`, textDecoration:"none" }}
            onMouseEnter={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.5)"}
            onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.22)"}>
            Learn About Us →
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background:C.surface, borderTop:`1px solid ${C.border}`, padding:"36px 5vw 22px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", justifyContent:"space-between",
        alignItems:"center", flexWrap:"wrap", gap:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
          <img src="/logosymbol.png" alt="SkypondTech" style={{ width:30, height:30,
            objectFit:"contain", mixBlendMode:"multiply", filter:"brightness(0.9)" }} />
          <span style={{ color:C.head, fontWeight:800, fontSize:15, fontFamily:"'DM Sans',sans-serif" }}>
            SkypondTech<span style={{ color:C.p2 }}>.ai</span>
          </span>
        </div>
        <div style={{ display:"flex", gap:24 }}>
          {[["Services","/services"],["Products","/products"],["Industries","/industries"],["About","/about"],["Contact","/#contact"]].map(([l,h]) => (
            <a key={l} href={h} style={{ color:C.muted, fontSize:13, textDecoration:"none" }}
              onMouseEnter={e => e.currentTarget.style.color = C.p2}
              onMouseLeave={e => e.currentTarget.style.color = C.muted}>{l}</a>
          ))}
        </div>
        <span style={{ color:C.muted, fontSize:12 }}>© 2025 Skypond Tech Pvt. Ltd.</span>
      </div>
    </footer>
  );
}

export default function Industries() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #EEF4F8; color: #2D4066;
          font-family: 'DM Sans', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #EEF4F8; }
        ::-webkit-scrollbar-thumb { background: #60A4B1; border-radius: 3px; }
      `}</style>
      <Navbar />
      <main>
        <Hero />
        <PrimaryVerticals />
        <BroaderIndustries />
        <RightFit />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
