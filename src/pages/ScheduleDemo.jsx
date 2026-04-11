import C from '../tokens.js'
import { useState, useEffect, useRef } from "react";
import { Button } from '../components/ui/Button.jsx'
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'
import { MessageSquare, Search, Map, Mail, Phone } from 'lucide-react'
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_DISPLAY, HUBSPOT_MEETINGS_URL, HUBSPOT_SCRIPT_URL } from '../config/constants.js'

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
    s.src = HUBSPOT_SCRIPT_URL;
    s.type = "text/javascript";
    s.async = true;
    // Append AFTER the container div is in the DOM
    wrapperRef.current.appendChild(s);
  }, []);

  return (
    <div ref={wrapperRef} style={{ width:"100%", minHeight:690 }}>
      <div
        className="meetings-iframe-container"
        data-src={HUBSPOT_MEETINGS_URL}
        style={{ width:"100%", minHeight:690 }}
      />
    </div>
  );
}

function WhatToExpect() {
  const steps = [
    { icon:<MessageSquare size={15} />, title:"Tell us what you're working with",
      desc:"Your current pharmacy system, which facilities you serve, and what's not working today." },
    { icon:<Search size={15} />, title:"We identify the actual gap",
      desc:"Whether it's an HL7 data issue, a manual workflow bottleneck, or a reporting blind spot — we name it specifically." },
    { icon:<Map size={15} />, title:"You get a clear path forward",
      desc:"What a solution looks like, realistic timelines, and what it takes to start. No vague proposals." },
  ];
  return (
    <div style={{ padding:"28px 28px 24px", borderRadius:16,
      background:C.surface, border:`1px solid ${C.border}` }}>
      <div style={{ fontSize:10.5, fontWeight:500, color:C.muted, textTransform:"uppercase",
        letterSpacing:"0.08em", marginBottom:20, fontFamily:"'Akshar', sans-serif" }}>What happens on the call</div>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
            <div style={{ width:34, height:34, borderRadius:8, background:C.alt,
              border:`1px solid ${C.border}`, display:"flex", alignItems:"center",
              justifyContent:"center", fontSize:15, flexShrink:0 }}>{s.icon}</div>
            <div>
              <div style={{ color:C.head, fontWeight:500, fontSize:14, marginBottom:3,
                fontFamily:"'Akshar', sans-serif" }}>{s.title}</div>
              <div style={{ color:C.body, fontSize:13, lineHeight:1.6, fontWeight:400,
                fontFamily:"'Gotham', 'Helvetica Neue', Arial, sans-serif" }}>{s.desc}</div>
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
              borderRadius:99, border:`1px solid ${C.p2}30`, background:`${C.p2}18`,
              color:C.p2, fontSize:11, fontWeight:500, letterSpacing:"0.07em",
              textTransform:"uppercase", marginBottom:16, fontFamily:"'Akshar', sans-serif" }}>📅 Free Discovery Call</div>
            <h1 style={{ fontSize:"clamp(1.9rem,4vw,2.9rem)", fontWeight:700, color:"#fff",
              letterSpacing:"-0.03em", lineHeight:1.12, marginBottom:14,
              fontFamily:"'Akshar', sans-serif" }}>
              Let's talk about your{" "}
              <span style={{ background:`linear-gradient(90deg,${C.accent},${C.p2})`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                pharmacy's specific situation
              </span>
            </h1>
            <p style={{ fontSize:"clamp(0.96rem,1.1vw,1.05rem)", color:"rgb(255, 255, 255)",
              maxWidth:500, margin:"0 auto", lineHeight:1.72,
              fontFamily:"'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight:400 }}>
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
              padding:"6px 14px", borderRadius:99,
              background: i === 3 ? `${C.amber}14` : C.alt,
              border:`1px solid ${i === 3 ? `${C.amber}40` : C.border}`,
              fontSize:12.5, color:C.body, fontWeight:500,
              fontFamily:"'Gotham', 'Helvetica Neue', Arial, sans-serif" }}>
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
              <div style={{ fontSize:10.5, fontWeight:500, color:C.muted,
                textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:12,
                fontFamily:"'Akshar', sans-serif" }}>
                Prefer another way?
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                {[
                  { icon:<Mail size={15} />, title:"Email us", sub:CONTACT_EMAIL, href:`mailto:${CONTACT_EMAIL}` },
                  { icon:<Phone size={15} />, title:"Call directly", sub:CONTACT_PHONE_DISPLAY, href:`tel:${CONTACT_PHONE}` },
                ].map((item, i) => (
                  <Button key={i} href={item.href} variant="secondary" size="sm"
                    style={{ width:"100%", justifyContent:"flex-start", whiteSpace:"normal", textAlign:"left" }}>
                    <span style={{ fontSize:15 }}>{item.icon}</span>
                    <div>
                      <div style={{ color:C.head, fontWeight:500, fontSize:13, fontFamily:"'Akshar', sans-serif" }}>{item.title}</div>
                      <div style={{ color:C.muted, fontSize:12,
                        fontFamily:"'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight:300 }}>{item.sub}</div>
                    </div>
                  </Button>
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

