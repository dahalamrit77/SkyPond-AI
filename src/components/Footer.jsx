import C from '../tokens.js'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '../config/constants.js'

function LinkedInIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function InstagramIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

const SOCIAL_LINKS = [
  { id: 'li', label: 'LinkedIn', href: 'https://www.linkedin.com/company/skypond-tech-llc/', Icon: LinkedInIcon },
  { id: 'ig', label: 'Instagram', href: 'https://www.instagram.com/skypondtech/', Icon: InstagramIcon },
]

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
              ["Privacy Policy","/privacy-policy"],
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
          <div style={{ display:"flex", gap:14, alignItems:"center" }}>
            {SOCIAL_LINKS.map(({ id, label, href, Icon }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                style={{
                  display:"flex", alignItems:"center", justifyContent:"center",
                  width:36, height:36, borderRadius:8,
                  color: hoveredLink === id ? C.p2 : 'rgba(255,255,255,0.75)',
                  background: hoveredLink === id ? 'rgba(255,255,255,0.1)' : 'transparent',
                  transition:"color 0.15s, background 0.15s",
                }}
                onMouseEnter={() => setHoveredLink(id)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
