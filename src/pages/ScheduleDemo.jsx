import C from '../tokens.js'
import { useState, useEffect, useRef } from "react";
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'

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
              <div style={{ color:C.body, fontSize:13, lineHeight:1.6, fontWeight:500 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ScheduleDemo() {
  return (
    <>
      <style>{`
        .meetings-iframe-container {
          background: #fff;
        }
        .meetings-iframe-container iframe {
          width: 100% !important;
          border: none !important;
          background: #fff !important;
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
              boxShadow:"0 6px 28px rgba(0,0,0,0.06)", background:"#fff" }}>
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

