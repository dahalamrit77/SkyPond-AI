import { useState, useEffect } from "react";

const C = {
  bg:"#EEF4F8",
  surface:"#FFFFFF",
  alt:"#E3EFF6",
  border:"#C9DFEA",
  p:"#1C3053",
  pd:"#141F38",
  p2:"#6ABDE9",
  accent:"#60A4B1",
  violet:"#B6CAEB",
  green:"#6BA769",
  amber:"#D3A217",
  red:"#F58033",
  head:"#1C3053",
  body:"#2D4066",
  muted:"#6B8BAF",
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
  const s = { hero:"clamp(2.4rem,5vw,3.8rem)", h2:"clamp(1.8rem,2.7vw,2.4rem)", h3:"1.15rem" };
  return <h2 style={{ fontSize:s[size], fontWeight:800, color:color||C.head,
    letterSpacing:"-0.026em", lineHeight:1.12,
    fontFamily:"'DM Sans',system-ui,sans-serif", ...style }}>{children}</h2>;
};
const P = ({ style={}, children }) => (
  <p style={{ fontSize:"clamp(0.96rem,1.1vw,1.04rem)", color:C.body, lineHeight:1.78, ...style }}>{children}</p>
);
function PBtn({ children, href, light }) {
  const base = { display:"inline-flex", alignItems:"center", gap:8, padding:"12px 26px",
    borderRadius:10, fontWeight:700, fontSize:14.5, border:"none", cursor:"pointer",
    textDecoration:"none", fontFamily:"inherit", transition:"all 0.15s" };
  const v = light
    ? {...base, background:C.surface, color:C.p, boxShadow:"0 2px 14px rgba(0,0,0,0.1)"}
    : {...base, background:`linear-gradient(135deg,${C.p},#2A4A7F)`, color:"#fff", boxShadow:`0 4px 20px ${C.p}45`};
  return <a href={href} style={v}
    onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; }}
    onMouseLeave={e=>{ e.currentTarget.style.transform="none"; }}>
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
        <img src="/logosymbol.png" alt="SkypondTech" style={{ width:36, height:36, objectFit:"contain", mixBlendMode:"multiply", filter:"brightness(0.9)" }} />
        <span style={{ color:C.head, fontWeight:800, fontSize:17, letterSpacing:"-0.02em",
          fontFamily:"'DM Sans',sans-serif" }}>
          SkypondTech<span style={{ color:C.p2 }}>.ai</span>
        </span>
      </a>
      <div style={{ display:"flex", gap:26 }}>
        {[["Services","/services"],["Products","/products"],["About","/about"],["Contact","/#contact"]].map(([l,h]) => (
          <a key={l} href={h} style={{ color: l==="About" ? C.p2 : C.body,
            fontSize:13.5, fontWeight: l==="About" ? 700 : 600, textDecoration:"none" }}
            onMouseEnter={e => e.currentTarget.style.color = C.p2}
            onMouseLeave={e => e.currentTarget.style.color = l==="About" ? C.p2 : C.body}>{l}</a>
        ))}
      </div>
      <PBtn href="/schedule">Schedule a Demo →</PBtn>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{ minHeight:"72vh", display:"flex", alignItems:"center",
      padding:"120px 5vw 80px", position:"relative", overflow:"hidden",
      background:`linear-gradient(160deg,${C.dark} 0%,#0D2040 100%)` }}>
      <div style={{ position:"absolute", inset:0,
        backgroundImage:`linear-gradient(${C.p2}09 1px,transparent 1px),linear-gradient(90deg,${C.p2}09 1px,transparent 1px)`,
        backgroundSize:"52px 52px", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:-160, right:-60, width:640, height:640, borderRadius:"50%",
        background:`radial-gradient(circle,${C.p2}22 0%,transparent 68%)`, pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-60, left:-40, width:420, height:420, borderRadius:"50%",
        background:`radial-gradient(circle,${C.accent}28 0%,transparent 68%)`, pointerEvents:"none" }} />

      <div style={{ maxWidth:860, margin:"0 auto", position:"relative", zIndex:1, textAlign:"center" }}>
        <div style={{ marginBottom:20, animation:"fadeUp 0.5s ease both" }}>
          <Badge c={C.p2}>About SkypondTech.AI</Badge>
        </div>
        <H size="hero" color="#fff" style={{ marginBottom:22, animation:"fadeUp 0.5s 0.08s ease both" }}>
          Built for a Gap{" "}
          <span style={{ background:`linear-gradient(90deg,${C.p2},${C.accent})`,
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            Nobody Else Was Filling
          </span>
        </H>
        <P style={{ maxWidth:620, margin:"0 auto 36px", color:"rgba(255,255,255,0.68)",
          fontSize:"1.08rem", animation:"fadeUp 0.5s 0.14s ease both" }}>
          SkypondTech.AI exists because LTC pharmacy deserves technology that actually understands it — not generic IT solutions retrofitted to fit a specialized, regulation-heavy, high-stakes industry.
        </P>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap",
          animation:"fadeUp 0.5s 0.2s ease both" }}>
          <PBtn href="/schedule">Talk to Our Team →</PBtn>
          <a href="#story" style={{ display:"inline-flex", alignItems:"center", gap:8,
            padding:"12px 24px", borderRadius:10, background:"transparent",
            color:"rgba(255,255,255,0.72)", fontWeight:600, fontSize:14.5,
            border:`1.5px solid rgba(255,255,255,0.22)`, textDecoration:"none" }}
            onMouseEnter={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.5)"}
            onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.22)"}>
            Our Story ↓
          </a>
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section id="story" style={{ padding:"96px 5vw", background:C.surface }}>
      <div style={{ maxWidth:1060, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:72, alignItems:"center" }}>

          {/* Left — the story */}
          <div>
            <div style={{ marginBottom:16 }}><Badge c={C.p}>Our Story</Badge></div>
            <H size="h2" style={{ marginBottom:24 }}>
              We Started Because the Problem Was Real and the Solutions Weren't
            </H>
            <P style={{ marginBottom:18 }}>
              LTC pharmacy operates at the intersection of healthcare, compliance, and logistics — serving nursing facilities, assisted living communities, and behavioral health centers with medication management that can't afford to fail.
            </P>
            <P style={{ marginBottom:18 }}>
              The SkypondTech team didn't come from the technology industry looking for a market to serve. They came from the LTC pharmacy world itself — spending close to a decade inside it, working hands-on with the systems pharmacies depend on, understanding the workflows, and living with the gaps that generic software left behind.
            </P>
            <P style={{ marginBottom:18 }}>
              That experience — across dispensing operations, DEA compliance, PointClickCare integrations, prior auth cycles, and census reconciliation — is what made the problem impossible to ignore. LTC pharmacies were running critical workflows on manual processes, outdated software, and workarounds. The technology they actually needed simply didn't exist.
            </P>
            <P style={{ marginBottom:18 }}>
              SkypondTech.AI was founded to address that gap directly. Not by adapting general-purpose software, but by building from the ground up with LTC pharmacy as the starting point — shaped by nearly a decade of firsthand experience in the industry.
            </P>
            <P>
              Three to five years in, that focus hasn't changed. Every engagement we take on is with an LTC pharmacy or an organization that directly serves one. That's not a constraint — it's a deliberate choice to go deep rather than wide.
            </P>
          </div>

          {/* Right — visual timeline */}
          <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
            {[
              { year:"Early 2020s", color:C.p,      icon:"🔍",
                title:"The Gap Identified",
                desc:"After nearly a decade working inside LTC pharmacy — hands-on with dispensing systems, DEA workflows, and facility integrations — the team saw the same problem everywhere: pharmacies patching critical operations together with manual work and software that was never built for them." },
              { year:"Year One",    color:C.accent,  icon:"🛠️",
                title:"First Builds",
                desc:"First custom integrations and internal tools built specifically for LTC pharmacy operations — not adapted from other industries, designed for this one." },
              { year:"Growing",     color:C.green,   icon:"📈",
                title:"Expanding the Platform",
                desc:"Grew from integration work into AI automation, Power BI analytics, and PointClickCare API solutions — all staying within the LTC pharmacy ecosystem." },
              { year:"Today",       color:C.amber,   icon:"🎯",
                title:"Purpose-Built, Still",
                desc:"A focused team serving LTC pharmacies with six specialized services and a product suite. Deep expertise in the workflows, regulations, and systems that matter." },
            ].map((item, i, arr) => (
              <div key={i} style={{ display:"flex", gap:20, position:"relative" }}>
                {/* Connector line */}
                {i < arr.length - 1 && (
                  <div style={{ position:"absolute", left:19, top:44, bottom:0, width:2,
                    background:`linear-gradient(to bottom,${item.color}50,${arr[i+1].color}30)` }} />
                )}
                <div style={{ flexShrink:0, paddingBottom:28 }}>
                  <div style={{ width:38, height:38, borderRadius:10, background:`${item.color}14`,
                    border:`2px solid ${item.color}40`, display:"flex", alignItems:"center",
                    justifyContent:"center", fontSize:17, position:"relative", zIndex:1 }}>{item.icon}</div>
                </div>
                <div style={{ paddingBottom:28 }}>
                  <div style={{ fontSize:10.5, fontWeight:700, color:item.color,
                    textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:4 }}>{item.year}</div>
                  <div style={{ color:C.head, fontWeight:700, fontSize:15.5, marginBottom:6,
                    fontFamily:"'DM Sans',sans-serif" }}>{item.title}</div>
                  <div style={{ color:C.body, fontSize:14, lineHeight:1.68 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  const pillars = [
    { icon:"🎯", color:C.p,     title:"Purpose-Built for LTC Pharmacy",
      desc:"We don't serve general healthcare. We don't serve retail pharmacy. We serve LTC pharmacy specifically — which means every tool, every integration, and every recommendation is shaped by the specific constraints of this industry." },
    { icon:"🔬", color:C.accent, title:"Insider Knowledge, Not Consulting Theory",
      desc:"Our team spent close to a decade working inside LTC pharmacy before building technology for it. That means we know PointClickCare, DEA compliance, prior auth workflows, and dispensing cycles from the inside — not from a discovery call." },
    { icon:"🔗", color:C.amber, title:"Fluent in the Systems You Already Use",
      desc:"We work directly with the pharmacy management systems and EHRs LTC pharmacies run on — QS/1 (NRx), FrameworkLTC, MatrixCare, American HealthTech (AHT), and PointClickCare. No ramp-up time learning your stack. We already know how these systems behave, where their integration limits are, and how to build around them." },
    { icon:"🤝", color:C.green, title:"Honest About What We Can Do",
      desc:"If something isn't in our wheelhouse, we say so. LTC pharmacy is high-stakes — your technology partner needs to be straight with you about scope, timelines, and what a realistic solution looks like." },
  ];
  return (
    <section style={{ padding:"88px 5vw", background:C.alt }}>
      <div style={{ maxWidth:1060, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.accent}>Our Mission</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>
            What We're Here to Do
          </H>
          <P style={{ maxWidth:520, margin:"0 auto" }}>
            Three principles that shape every project we take on and every relationship we build.
          </P>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:20 }}>
          {pillars.map((p, i) => (
            <div key={i} style={{ padding:"32px 28px", borderRadius:18, background:C.surface,
              border:`1.5px solid ${C.border}`, transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=p.color+"50"; e.currentTarget.style.boxShadow=`0 16px 40px ${p.color}14`; e.currentTarget.style.transform="translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="none"; }}>
              <div style={{ width:48, height:48, borderRadius:12, background:`${p.color}12`,
                border:`1.5px solid ${p.color}30`, display:"flex", alignItems:"center",
                justifyContent:"center", fontSize:22, marginBottom:18 }}>{p.icon}</div>
              <H size="h3" style={{ marginBottom:10, fontSize:16, color:C.head }}>{p.title}</H>
              <P style={{ fontSize:"0.92rem", lineHeight:1.72 }}>{p.desc}</P>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatWeAreNot() {
  return (
    <section style={{ padding:"88px 5vw", background:C.surface }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ marginBottom:14 }}><Badge c={C.amber}>Honest Positioning</Badge></div>
          <H size="h2" style={{ marginBottom:14 }}>What SkypondTech Is — and Isn't</H>
          <P style={{ maxWidth:480, margin:"0 auto" }}>
            We'd rather set the right expectations upfront than be everything to everyone.
          </P>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          {/* What we are */}
          <div style={{ padding:"28px 26px", borderRadius:16,
            background:`${C.green}08`, border:`2px solid ${C.green}30` }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.green,
              textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:18 }}>✓ What We Are</div>
            {[
              "A focused team with deep LTC pharmacy IT expertise",
              "Specialists in PointClickCare integrations and API connections",
              "Builders of custom tools for pharmacy-specific workflows",
              "Honest advisors who tell you what's realistic",
              "A long-term partner, not a one-time vendor",
              "Colorado-based, serving LTC pharmacies nationwide",
            ].map((item, i) => (
              <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start",
                padding:"9px 0", borderBottom: i < 5 ? `1px solid ${C.green}18` : "none" }}>
                <span style={{ color:C.green, fontWeight:800, fontSize:13, flexShrink:0, marginTop:1 }}>✓</span>
                <span style={{ color:C.body, fontSize:14, lineHeight:1.55 }}>{item}</span>
              </div>
            ))}
          </div>

          {/* What we are not */}
          <div style={{ padding:"28px 26px", borderRadius:16,
            background:`${C.muted}08`, border:`2px solid ${C.border}` }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.muted,
              textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:18 }}>✗ What We're Not</div>
            {[
              "A general healthcare IT firm that also serves LTC",
              "A large agency with hundreds of consultants",
              "A company that will say yes to any project in any industry",
              "A managed services provider for general IT support",
              "A firm that competes on lowest price over best fit",
              "A vendor that disappears after go-live",
            ].map((item, i) => (
              <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start",
                padding:"9px 0", borderBottom: i < 5 ? `1px solid ${C.border}` : "none" }}>
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

function Location() {
  return (
    <section style={{ padding:"72px 5vw", background:C.alt }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"center" }}>
          <div>
            <div style={{ marginBottom:14 }}><Badge c={C.p}>Where We Are</Badge></div>
            <H size="h2" style={{ marginBottom:16 }}>Lafayette, Colorado</H>
            <P style={{ marginBottom:14 }}>
              We're based in Lafayette, CO, but we work with LTC pharmacies across the country. The work we do is largely systems and software, which travels well.
            </P>
            <P style={{ marginBottom:28 }}>
              If you're local, we're happy to meet in person. If you're not, we're used to building strong working relationships remotely — and most of our engagements are national.
            </P>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[
                { icon:"📍", label:"Lafayette, CO (Boulder/Denver metro)" },
                { icon:"📧", label:"info@skypondtech.com", href:"mailto:info@skypondtech.com" },
                { icon:"📞", label:"(720) 724-6828", href:"tel:+17207246828" },
              ].map((item, i) => (
                item.href
                  ? <a key={i} href={item.href} style={{ display:"inline-flex", alignItems:"center",
                      gap:10, color:C.body, fontSize:14.5, textDecoration:"none",
                      fontWeight:500, transition:"color 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.color = C.p2}
                      onMouseLeave={e => e.currentTarget.style.color = C.body}>
                      <span>{item.icon}</span>{item.label}
                    </a>
                  : <span key={i} style={{ display:"inline-flex", alignItems:"center",
                      gap:10, color:C.body, fontSize:14.5, fontWeight:500 }}>
                      <span>{item.icon}</span>{item.label}
                    </span>
              ))}
            </div>
          </div>

          {/* Stat cards */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            {[
              { num:"LTC Only",  sub:"Our entire focus",             color:C.p },
              { num:"3–5 Yrs",   sub:"Deep domain experience",       color:C.accent },
              { num:"6",         sub:"Specialized services",         color:C.green },
              { num:"100%",      sub:"Client satisfaction target",   color:C.amber },
            ].map((s, i) => (
              <div key={i} style={{ padding:"24px 20px", borderRadius:14, background:C.surface,
                border:`1.5px solid ${s.color}30`, textAlign:"center" }}>
                <div style={{ fontSize:"clamp(1.4rem,2vw,1.8rem)", fontWeight:900, color:s.color,
                  fontFamily:"'DM Sans',sans-serif", letterSpacing:"-0.02em" }}>{s.num}</div>
                <div style={{ color:C.muted, fontSize:12.5, marginTop:5, lineHeight:1.4 }}>{s.sub}</div>
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
      <div style={{ position:"absolute", top:-120, right:-60, width:480, height:480, borderRadius:"50%",
        background:`radial-gradient(circle,${C.p2}25 0%,transparent 70%)`, pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-60, left:0, width:340, height:340, borderRadius:"50%",
        background:`radial-gradient(circle,${C.accent}30 0%,transparent 70%)`, pointerEvents:"none" }} />
      <div style={{ maxWidth:640, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
        <H size="h2" style={{ color:"#fff", marginBottom:14 }}>
          Ready to Work With a Team That Knows LTC Pharmacy?
        </H>
        <P style={{ color:"rgba(255,255,255,0.62)", marginBottom:32, fontSize:"1.05rem" }}>
          Book a free discovery call. We'll talk through your current setup, identify where the gaps are, and be straight with you about what we can help with.
        </P>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <PBtn href="/schedule">Schedule a Free Call →</PBtn>
          <a href="/services" style={{ display:"inline-flex", alignItems:"center", gap:8,
            padding:"12px 24px", borderRadius:10, background:"transparent",
            color:"rgba(255,255,255,0.75)", fontWeight:600, fontSize:14.5,
            border:`1.5px solid rgba(255,255,255,0.22)`, textDecoration:"none" }}
            onMouseEnter={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.5)"}
            onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.22)"}>
            View Our Services →
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
          <img src="/logosymbol.png" alt="SkypondTech" style={{ width:30, height:30, objectFit:"contain", mixBlendMode:"multiply", filter:"brightness(0.9)" }} />
          <span style={{ color:C.head, fontWeight:800, fontSize:15, fontFamily:"'DM Sans',sans-serif" }}>
            SkypondTech<span style={{ color:C.p2 }}>.ai</span>
          </span>
        </div>
        <div style={{ display:"flex", gap:24 }}>
          {[["Services","/services"],["Products","/products"],["About","/about"],["Contact","/#contact"]].map(([l,h]) => (
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

export default function About() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          background: #EEF4F8;
          color: #2D4066;
          font-family: 'DM Sans', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
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
        <StorySection />
        <Mission />
        <WhatWeAreNot />
        <Location />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
