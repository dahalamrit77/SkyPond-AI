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
      background: sc ? "rgba(246,247,253,0.96)" : "rgba(246,247,253,0.85)",
      backdropFilter:"blur(18px)",
      borderBottom:`1px solid ${sc ? C.border : "transparent"}`, transition:"all 0.3s" }}>
      <a href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
        <img src="/logosymbol.png" alt="SkypondTech" style={{ width:36, height:36, objectFit:"contain", mixBlendMode:"screen", filter:"brightness(1.1)" }} />
        <span style={{ color:C.head, fontWeight:800, fontSize:17, letterSpacing:"-0.02em",
          fontFamily:"'DM Sans',sans-serif" }}>
          SkypondTech<span style={{ color:C.p }}>.ai</span>
        </span>
      </a>
      <div style={{ display:"flex", gap:26 }}>
        {[["Services","/services"],["Products","/products"],["About","/#about"],["Contact","/#contact"]].map(([l,h]) => (
          <a key={l} href={h} style={{ color:C.body, fontSize:13.5, fontWeight:600, textDecoration:"none" }}
            onMouseEnter={e => e.currentTarget.style.color = C.accent}
            onMouseLeave={e => e.currentTarget.style.color = C.body}>{l}</a>
        ))}
      </div>
      <a href="mailto:info@skypondtech.com" style={{ display:"inline-flex", alignItems:"center", gap:8,
        padding:"9px 20px", borderRadius:9, background:C.p, color:"#fff",
        fontWeight:700, fontSize:13.5, textDecoration:"none", fontFamily:"inherit" }}
        onMouseEnter={e => e.currentTarget.style.background = C.pd}
        onMouseLeave={e => e.currentTarget.style.background = C.p}>
        Contact Us
      </a>
    </nav>
  );
}

/* HubSpot embed — uses dangerouslySetInnerHTML so the script tag
   executes exactly as HubSpot expects it, after the container div exists */
function HubSpotEmbed() {
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    // Remove any previously injected HS script to avoid duplicates on HMR
    const existing = document.getElementById("hs-meetings-script");
    if (existing) existing.remove();

    const s = document.createElement("script");
    s.id = "hs-meetings-script";
    s.src = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
    s.type = "text/javascript";
    s.async = true;
    // Append AFTER the container div is in the DOM
    wrapperRef.current.appendChild(s);
  }, []);

  return (
    <div ref={wrapperRef} style={{ width:"100%", minHeight:690 }}>
      <div
        className="meetings-iframe-container"
        data-src="https://meetings-na2.hubspot.com/ramesh-kc?embed=true"
        style={{ width:"100%", minHeight:690 }}
      />
    </div>
  );
}

function WhatToExpect() {
  const steps = [
    { icon:"💬", title:"Tell us what you're working with",
      desc:"Your current pharmacy system, which facilities you serve, and what's not working today." },
    { icon:"🔍", title:"We identify the actual gap",
      desc:"Whether it's an HL7 data issue, a manual workflow bottleneck, or a reporting blind spot — we name it specifically." },
    { icon:"🗺️", title:"You get a clear path forward",
      desc:"What a solution looks like, realistic timelines, and what it takes to start. No vague proposals." },
  ];
  return (
    <div style={{ padding:"28px 28px 24px", borderRadius:16,
      background:C.surface, border:`1px solid ${C.border}` }}>
      <div style={{ fontSize:10.5, fontWeight:700, color:C.muted, textTransform:"uppercase",
        letterSpacing:"0.08em", marginBottom:20 }}>What happens on the call</div>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
            <div style={{ width:34, height:34, borderRadius:8, background:C.alt,
              border:`1px solid ${C.border}`, display:"flex", alignItems:"center",
              justifyContent:"center", fontSize:15, flexShrink:0 }}>{s.icon}</div>
            <div>
              <div style={{ color:C.head, fontWeight:700, fontSize:14, marginBottom:3,
                fontFamily:"'DM Sans',sans-serif" }}>{s.title}</div>
              <div style={{ color:C.muted, fontSize:13, lineHeight:1.6 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop:22, paddingTop:18, borderTop:`1px solid ${C.border}`,
        display:"flex", alignItems:"center", gap:11 }}>
        <div style={{ width:40, height:40, borderRadius:9,
          background:`linear-gradient(135deg,${C.p},${C.accent})`,
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>👤</div>
        <div>
          <div style={{ color:C.head, fontWeight:700, fontSize:14,
            fontFamily:"'DM Sans',sans-serif" }}>Ramesh KC</div>
          <div style={{ color:C.muted, fontSize:12 }}>Founder · SkypondTech.AI · Lafayette, CO</div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ background:C.surface, borderTop:`1px solid ${C.border}`, padding:"30px 5vw" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", justifyContent:"space-between",
        alignItems:"center", flexWrap:"wrap", gap:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <img src="/logosymbol.png" alt="SkypondTech" style={{ width:30, height:30, objectFit:"contain", mixBlendMode:"screen", filter:"brightness(1.1)" }} />
          <span style={{ color:C.head, fontWeight:800, fontSize:15, fontFamily:"'DM Sans',sans-serif" }}>
            SkypondTech<span style={{ color:C.p }}>.ai</span>
          </span>
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {[
            ["📍 Lafayette, CO", null],
            ["📧 info@skypondtech.com", "mailto:info@skypondtech.com"],
            ["📞 (720) 724-6828", "tel:+17207246828"],
          ].map(([label, href], i) => (
            href
              ? <a key={i} href={href} style={{ color:C.muted, fontSize:12.5, textDecoration:"none",
                  padding:"5px 12px", borderRadius:6, border:`1px solid ${C.border}` }}
                  onMouseEnter={e => e.currentTarget.style.color = C.accent}
                  onMouseLeave={e => e.currentTarget.style.color = C.muted}>{label}</a>
              : <span key={i} style={{ color:C.muted, fontSize:12.5,
                  padding:"5px 12px", borderRadius:6, border:`1px solid ${C.border}` }}>{label}</span>
          ))}
        </div>
        <span style={{ color:C.muted, fontSize:12 }}>© 2025 Skypond Tech Pvt. Ltd.</span>
      </div>
    </footer>
  );
}

export default function ScheduleDemo() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          background: ${C.bg};
          color: ${C.body};
          font-family: 'DM Sans', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .meetings-iframe-container iframe {
          width: 100% !important;
          border: none !important;
        }
      `}</style>

      <Navbar />

      <main style={{ paddingTop:64 }}>
        {/* Hero header */}
        <div style={{ background:`linear-gradient(160deg,${C.dark} 0%,#0D2040 100%)`,
          padding:"68px 5vw 56px", textAlign:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0,
            backgroundImage:`linear-gradient(${C.accent}07 1px,transparent 1px),linear-gradient(90deg,${C.accent}07 1px,transparent 1px)`,
            backgroundSize:"48px 48px", pointerEvents:"none" }} />
          <div style={{ position:"absolute", top:-100, left:"50%", transform:"translateX(-50%)",
            width:560, height:560, borderRadius:"50%",
            background:`radial-gradient(circle,${C.accent}18 0%,transparent 68%)`, pointerEvents:"none" }} />
          <div style={{ position:"relative", zIndex:1, animation:"fadeUp 0.6s ease both" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"5px 14px",
              borderRadius:99, border:`1px solid ${C.accent}30`, background:`${C.accent}10`,
              color:C.accent, fontSize:11, fontWeight:700, letterSpacing:"0.07em",
              textTransform:"uppercase", marginBottom:16 }}>📅 Free Discovery Call</div>
            <h1 style={{ fontSize:"clamp(1.9rem,4vw,2.9rem)", fontWeight:900, color:"#fff",
              letterSpacing:"-0.03em", lineHeight:1.12, marginBottom:14,
              fontFamily:"'DM Sans',sans-serif" }}>
              Let's talk about your{" "}
              <span style={{ background:`linear-gradient(90deg,${C.accent},${C.p2})`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                pharmacy's specific situation
              </span>
            </h1>
            <p style={{ fontSize:"clamp(0.96rem,1.1vw,1.05rem)", color:"rgba(255,255,255,0.58)",
              maxWidth:500, margin:"0 auto", lineHeight:1.72 }}>
              30 minutes. No pitch deck. We'll talk through your current setup, identify the gaps, and be straight with you about what we can and can't help with.
            </p>
          </div>
        </div>

        {/* Trust chips */}
        <div style={{ background:C.surface, borderBottom:`1px solid ${C.border}`,
          padding:"16px 5vw", display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
          {[
            "🔒 HIPAA-Compliant Workflows",
            "🏥 LTC Pharmacy Specialists",
            "🤝 No hard-sell — just a conversation",
            "⚡ Same-week availability",
          ].map((label, i) => (
            <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:6,
              padding:"6px 14px", borderRadius:99, background:C.alt,
              border:`1px solid ${C.border}`, fontSize:12.5, color:C.body, fontWeight:500 }}>
              {label}
            </span>
          ))}
        </div>

        {/* Main grid */}
        <div style={{ maxWidth:1060, margin:"0 auto", padding:"56px 5vw 80px",
          display:"grid", gridTemplateColumns:"1fr 360px", gap:48, alignItems:"start" }}>

          {/* HubSpot calendar embed */}
          <div style={{ animation:"fadeUp 0.55s 0.1s ease both" }}>
            <div style={{ borderRadius:16, overflow:"hidden",
              border:`1px solid ${C.border}`,
              boxShadow:"0 6px 28px rgba(0,0,0,0.06)", background:C.surface }}>
              <HubSpotEmbed />
            </div>
          </div>

          {/* Right panel */}
          <div style={{ display:"flex", flexDirection:"column", gap:16,
            animation:"fadeUp 0.55s 0.2s ease both" }}>
            <WhatToExpect />

            {/* Alternate contact */}
            <div style={{ padding:"20px 22px", borderRadius:14,
              background:C.alt, border:`1px solid ${C.border}` }}>
              <div style={{ fontSize:10.5, fontWeight:700, color:C.muted,
                textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:12 }}>
                Prefer another way?
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                {[
                  { icon:"📧", title:"Email us", sub:"info@skypondtech.com", href:"mailto:info@skypondtech.com" },
                  { icon:"📞", title:"Call directly", sub:"(720) 724-6828", href:"tel:+17207246828" },
                ].map((item, i) => (
                  <a key={i} href={item.href} style={{ display:"flex", alignItems:"center", gap:10,
                    padding:"10px 13px", borderRadius:9, background:C.surface,
                    border:`1px solid ${C.border}`, textDecoration:"none", transition:"border-color 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = C.accent + "55"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                    <span style={{ fontSize:15 }}>{item.icon}</span>
                    <div>
                      <div style={{ color:C.head, fontWeight:700, fontSize:13 }}>{item.title}</div>
                      <div style={{ color:C.muted, fontSize:12 }}>{item.sub}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
