import C from '../tokens.js'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer style={{ background:C.surface, borderTop:`1px solid ${C.border}`, padding:"44px 5vw 22px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:32, marginBottom:36 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:12 }}>
              <img
                src="/logosymbol.png"
                alt="SkypondTech"
                style={{ width:30, height:30, objectFit:"contain" }}
              />
              <span style={{ color:C.head, fontWeight:800, fontSize:16, fontFamily:"'DM Sans',sans-serif" }}>
                SkypondTech<span style={{ color:C.p }}>.ai</span>
              </span>
            </div>
            <p style={{ color:C.body, fontSize:13.5, lineHeight:1.7, maxWidth:240, marginBottom:16 }}>
              The complete LTC pharmacy technology platform. DEA compliance, AI automation, analytics, PointClickCare, and more.
            </p>
            <span style={{ display:"block", color:C.body, fontSize:12.5, marginBottom:4 }}>📍 Lafayette, CO</span>
            {[["✉ info@skypondtech.com","mailto:info@skypondtech.com"],["☎ (720) 724-6828","tel:+17207246828"]].map(([t,h]) => (
              <a key={t} href={h} style={{ display:"block", color:C.body, fontSize:12.5, textDecoration:"none", marginBottom:4 }}>{t}</a>
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
              <div style={{ color:C.head, fontWeight:800, fontSize:11.5, letterSpacing:"0.06em",
                textTransform:"uppercase", marginBottom:13 }}>{title}</div>
              {links.map(([lbl, href]) => {
                const isInternal = href.startsWith("/");
                const commonStyle = { display:"block", color:C.body, fontSize:13.5,
                  textDecoration:"none", marginBottom:8, transition:"color 0.15s" };

                if (isInternal) {
                  return (
                    <Link key={lbl} to={href} style={commonStyle}
                      onMouseEnter={e => e.currentTarget.style.color=C.p}
                      onMouseLeave={e => e.currentTarget.style.color=C.body}>{lbl}</Link>
                  );
                }

                return (
                  <a key={lbl} href={href} target="_blank" rel="noopener noreferrer" style={commonStyle}
                    onMouseEnter={e => e.currentTarget.style.color=C.p}
                    onMouseLeave={e => e.currentTarget.style.color=C.body}>{lbl}</a>
                );
              })}
            </div>
          ))}
        </div>
        <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:18, display:"flex",
          justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
          <span style={{ color:C.body, fontSize:12.5 }}>© {new Date().getFullYear()} Skypond Tech Pvt. Ltd. · All Rights Reserved</span>
          <div style={{ display:"flex", gap:18 }}>
            {[["LinkedIn","https://www.linkedin.com/company/skypond-tech-llc/"],["Instagram","https://www.instagram.com/skypondtech/"]].map(([l,h]) => (
              <a key={l} href={h} target="_blank" rel="noopener noreferrer" style={{ color:C.body, fontSize:12.5, textDecoration:"none" }}
                onMouseEnter={e => e.currentTarget.style.color=C.p}
                onMouseLeave={e => e.currentTarget.style.color=C.body}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
