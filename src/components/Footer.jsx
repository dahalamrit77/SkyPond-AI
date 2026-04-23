import C from '../tokens.js'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '../config/constants.js'

export function Footer() {
  const [hoveredLink, setHoveredLink] = useState(null)
  const logoBase = import.meta.env.BASE_URL;

  return (
    <footer style={{ background:C.p, borderTop:'1px solid rgba(255,255,255,0.12)', padding:"44px 5vw 22px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:32, marginBottom:36 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:12 }}>
              <img
                src={`${logoBase}navbar-logo-white.png`}
                alt="SkypondTech"
                style={{ width:220, height:"auto", maxHeight:56, objectFit:"contain", objectPosition:"left center", display:"block" }}
              />
            </div>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:13.5, lineHeight:1.7, maxWidth:240, marginBottom:16,
              fontFamily:"'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight:400 }}>
              The complete LTC pharmacy technology platform. DEA compliance, AI automation, analytics, PointClickCare, and more.
            </p>
            <span style={{ display:"block", color:'rgba(255,255,255,0.55)', fontSize:12.5, marginBottom:4,
              fontFamily:"'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight:300 }}>📍 Lafayette, CO</span>
            {[["✉ " + CONTACT_EMAIL,`mailto:${CONTACT_EMAIL}`,'email'],["☎ " + CONTACT_PHONE_DISPLAY,`tel:${CONTACT_PHONE}`,'phone']].map(([t,h,id]) => (
              <a key={id} href={h} style={{ display:"block", color: hoveredLink === id ? C.p2 : 'rgba(255,255,255,0.65)', fontSize:12.5, textDecoration:"none", marginBottom:4,
                fontFamily:"'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight:300, transition:"color 0.15s" }}
                onMouseEnter={() => setHoveredLink(id)}
                onMouseLeave={() => setHoveredLink(null)}>{t}</a>
            ))}
          </div>
          {[
            ["Products",[
              ["DEA Lookup Tool","/products/dea-lookup"],
              ["DEA Compliance Reporting","/products/dea-compliance-reporting"],
              ["CS Inventory","/products/cs-inventory"],
              ["LTC Analytics","/products/ltc-analytics"],
              ["PointClickCare Feed","/products/pointclickcare-feed"],
              ["Document Automation","/products/document-automation"],
            ]],
            ["Services",[
              ["LTC Pharmacy IT","/services/ltc-pharmacy-it"],
              ["AI Automation","/services/ai-automation"],
              ["Data Analytics","/services/data-analytics"],
              ["Custom Development","/services/custom-development"],
              ["Microsoft Cloud","/services/microsoft-cloud"],
              ["PointClickCare Integration","/services/pointclickcare-integration"],
            ]],
            ["Company",[
              ["About","/about"],
              ["Our Values","/our-values"],
              ["Case Studies","https://skypondtech.com/resources/case-studies/"],
              ["Blog","https://skypondtech.com/resources/blogs/"],
              ["FAQs","https://skypondtech.com/resources/faqs/"],
              ["skypondtech.com","https://skypondtech.com"],
            ]]
          ].map(([title, links]) => (
            <div key={title}>
              <div style={{ color:'#FFFFFF', fontWeight:600, fontSize:11.5, letterSpacing:"0.06em",
                textTransform:"uppercase", marginBottom:13, fontFamily:"'Akshar', sans-serif" }}>{title}</div>
              {links.map(([lbl, href]) => {
                const isInternal = href.startsWith("/");
                const linkId = `${title}-${lbl}`;
                const linkColor = hoveredLink === linkId ? C.p2 : 'rgba(255,255,255,0.72)';
                const commonStyle = { display:"block", color:linkColor, fontSize:13.5,
                  textDecoration:"none", marginBottom:8, transition:"color 0.15s",
                  fontFamily:"'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight:400 };

                if (isInternal) {
                  return (
                    <Link key={lbl} to={href} style={commonStyle}
                      onMouseEnter={() => setHoveredLink(linkId)}
                      onMouseLeave={() => setHoveredLink(null)}>{lbl}</Link>
                  );
                }

                return (
                  <a key={lbl} href={href} target="_blank" rel="noopener noreferrer" style={commonStyle}
                    onMouseEnter={() => setHoveredLink(linkId)}
                    onMouseLeave={() => setHoveredLink(null)}>{lbl}</a>
                );
              })}
            </div>
          ))}
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.12)', paddingTop:18, display:"flex",
          justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
          <span style={{ color:'rgba(255,255,255,0.45)', fontSize:'0.8rem',
            fontFamily:"'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight:300 }}>© {new Date().getFullYear()} Skypond Tech Pvt. Ltd. · All Rights Reserved</span>
          <div style={{ display:"flex", gap:18 }}>
            {[["LinkedIn","https://www.linkedin.com/company/skypond-tech-llc/","li"],["Instagram","https://www.instagram.com/skypondtech/","ig"]].map(([l,h,id]) => (
              <a key={l} href={h} target="_blank" rel="noopener noreferrer" style={{ color: hoveredLink === id ? C.p2 : 'rgba(255,255,255,0.65)', fontSize:12.5, textDecoration:"none",
                fontFamily:"'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight:300, transition:"color 0.15s" }}
                onMouseEnter={() => setHoveredLink(id)}
                onMouseLeave={() => setHoveredLink(null)}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
