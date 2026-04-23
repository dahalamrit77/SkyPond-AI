import C from '../tokens.js'
import { useState, useEffect, useRef } from 'react'
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'
import { Button } from './ui/Button.jsx'
import { ChevronDown, X, Menu, Hospital, Settings, BarChart3, Link, Laptop, Cloud, Search, ClipboardList, Pill, TrendingUp, FileText } from 'lucide-react'

const SERVICES_NAV = [
  { icon:<Hospital size={18} />, label:"LTC Pharmacy IT",          slug:"/services/ltc-pharmacy-it",     desc:"Telepharmacy, integrations & migrations" },
  { icon:<Settings size={18} />, label:"AI Automation",             slug:"/services/ai-automation",       desc:"Workflow automation for LTC pharmacies" },
  { icon:<BarChart3 size={18} />, label:"Data Analytics & Power BI", slug:"/services/data-analytics",      desc:"Dashboards & automated reporting" },
  { icon:<Link size={18} />, label:"PointClickCare Integration",slug:"/services/pointclickcare-integration", desc:"Bidirectional EHR data sync" },
  { icon:<Laptop size={18} />, label:"Custom Development",        slug:"/services/custom-development",  desc:"Full-stack LTC pharmacy apps" },
  { icon:<Cloud size={18} />, label:"Microsoft Cloud",           slug:"/services/microsoft-cloud",     desc:"365, Azure & Power Platform" },
];

const PRODUCTS_NAV = [
  { icon:<Search size={18} />, label:"DEA Lookup Tool",              slug:"/products/dea-lookup",              desc:"Real-time prescriber verification" },
  { icon:<ClipboardList size={18} />, label:"DEA Compliance Reporting",     slug:"/products/dea-compliance-reporting", desc:"Automated ARCOS & DEA reporting" },
  { icon:<Pill size={18} />, label:"CS Inventory Management",      slug:"/products/cs-inventory",            desc:"Real-time controlled substance tracking" },
  { icon:<TrendingUp size={18} />, label:"LTC Analytics Dashboard",      slug:"/products/ltc-analytics",           desc:"Dispensing trends & facility benchmarks" },
  { icon:<Link size={18} />, label:"PointClickCare Data Feed",     slug:"/products/pointclickcare-feed",     desc:"Live bidirectional PCC sync" },
  { icon:<FileText size={18} />, label:"Document Automation",          slug:"/products/document-automation",     desc:"Prior auth, templates & archival" },
];

function NavDropdown({ label, items, onAnchor, active, navDark }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const btnColor = active ? (navDark ? '#FFFFFF' : C.p) : (navDark ? 'rgba(255,255,255,0.78)' : C.body);
  const btnWeight = active ? 600 : 500;
  const chevronColor = navDark ? 'rgba(255,255,255,0.7)' : C.muted;

  return (
    <div ref={ref} style={{ position:"relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        style={{ display:"flex", alignItems:"center", gap:5, background:"none",
          borderLeft:"none", borderRight:"none", borderTop:"none",
          borderBottom: active ? `2px solid ${C.p2}` : '2px solid transparent',
          paddingBottom:4, boxSizing:"border-box",
          color:btnColor, fontSize:13.5, fontWeight:btnWeight, cursor:"pointer",
          fontFamily:"'Akshar', sans-serif", transition:"color 0.15s, border-color 0.15s" }}>
        {label}
        <ChevronDown size={12} color={chevronColor} style={{ transition:"transform 0.2s", transform: open ? "rotate(180deg)" : "none" }} />
      </button>

      {open && (
        <div style={{ position:"absolute", top:"calc(100% + 12px)", left:"50%",
          transform:"translateX(-50%)", width:480, background:C.surface,
          borderRadius:16, border:`1.5px solid ${C.border}`,
          boxShadow:`0 20px 60px rgba(59,63,176,0.14)`,
          padding:"10px 10px", zIndex:200,
          animation:"dropIn 0.18s ease both" }}>
          <div style={{ position:"absolute", top:-7, left:"50%", transform:"translateX(-50%)",
            width:13, height:13, background:C.surface, border:`1.5px solid ${C.border}`,
            borderRight:"none", borderBottom:"none", rotate:"45deg" }} />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:4 }}>
            {items.map((item, i) => (
              <RouterLink key={i} to={item.slug}
                style={{ display:"flex", alignItems:"center", gap:11, padding:"11px 13px",
                  borderRadius:10, textDecoration:"none", transition:"background 0.15s",
                  background:"transparent" }}
                onMouseEnter={e => e.currentTarget.style.background = C.alt}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                onClick={onAnchor}>
                <span style={{ fontSize:18, width:36, height:36, borderRadius:9, flexShrink:0,
                  background:C.alt, display:"flex", alignItems:"center",
                  justifyContent:"center" }}>{item.icon}</span>
                <div>
                  <div style={{ color:C.head, fontWeight:500, fontSize:13.5,
                    fontFamily:"'Akshar', sans-serif" }}>{item.label}</div>
                  <div style={{ color:C.body, fontSize:11.5, marginTop:2,
                    fontFamily:"'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight:300 }}>{item.desc}</div>
                </div>
              </RouterLink>
            ))}
          </div>
          <div style={{ borderTop:`1px solid ${C.border}`, marginTop:8, paddingTop:8,
            padding:"10px 12px 6px" }}>
            <RouterLink to={label === "Services" ? "/services" : "/products"}
              style={{ fontSize:12.5, fontWeight:500, color:C.p, textDecoration:"none",
                fontFamily:"'Akshar', sans-serif",
                display:"flex", alignItems:"center", gap:5 }}
              onMouseEnter={e => e.currentTarget.style.opacity="0.75"}
              onMouseLeave={e => e.currentTarget.style.opacity="1"}
              onClick={onAnchor}>
              View all {label} →
            </RouterLink>
          </div>
        </div>
      )}
    </div>
  );
}

function HamburgerIcon({ open, navDark }) {
  const stroke = navDark ? '#FFFFFF' : C.p;
  if (open) {
    return <X size={20} color={stroke} aria-hidden />;
  }
  return <Menu size={22} color={stroke} aria-hidden />;
}

export function Navbar() {
  const [sc, setSc] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 900);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleAbout = () => {
    navigate("/about");
  };

  const handleContact = () => {
    navigate("/schedule-demo");
  };

  useEffect(() => {
    const f = () => setSc(window.scrollY > 30);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!isMobile) {
      setMobileOpen(false);
      setMobileExpanded(null);
    }
  }, [isMobile]);

  const closeMobile = () => setMobileOpen(false);
  const navDark = sc || pathname !== "/";
  const logoBase = import.meta.env.BASE_URL;

  const logoWordmarkStyle = {
    width: 220,
    height: "auto",
    maxHeight: 42,
    objectFit: "contain",
    objectPosition: "left center",
    display: "block",
    backgroundColor: "transparent",
    border: "none",
    verticalAlign: "middle",
  };
  const navbarLogoSrc = `${logoBase}${navDark ? "navbar-logo-white.png" : "navbar-logo-blue.png"}`;

  const activeServices = pathname.startsWith("/services");
  const activeProducts = pathname.startsWith("/products");
  const activeIndustries = pathname === "/industries";
  const activeAbout = pathname === "/about";
  const activeContact = pathname === "/schedule-demo";

  const deskLinkBase = (isActive) => ({
    fontSize:13.5,
    fontFamily:"'Akshar', sans-serif",
    textDecoration:"none",
    transition:"color 0.15s, border-color 0.15s",
    borderBottom: isActive ? `2px solid ${C.p2}` : '2px solid transparent',
    paddingBottom:4,
    boxSizing:"border-box",
    color: isActive ? (navDark ? '#FFFFFF' : C.p) : (navDark ? 'rgba(255,255,255,0.78)' : C.body),
    fontWeight: isActive ? 600 : 400,
    cursor: "pointer",
    background: "none",
    borderLeft: "none",
    borderRight: "none",
    borderTop: "none",
  });

  return (
    <>
      <style>{`
        @keyframes navMobilePanelIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, height:64, padding:"0 5vw",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        background: navDark ? C.p : 'transparent',
        backdropFilter: 'none',
        borderBottom: navDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
        transition:"all 0.3s" }}>
        <RouterLink to="/" style={{ display:"flex", alignItems:"center", textDecoration:"none",
          background:"transparent", lineHeight:0 }}
          aria-label="SkypondTech home">
          <img src={navbarLogoSrc} alt="Skypond Tech" style={logoWordmarkStyle} />
        </RouterLink>

        {!isMobile && (
          <div style={{ display:"flex", alignItems:"center", gap:26 }}>
            <NavDropdown label="Services" items={SERVICES_NAV} active={activeServices} navDark={navDark} />
            <NavDropdown label="Products" items={PRODUCTS_NAV} active={activeProducts} navDark={navDark} />
            <RouterLink to="/industries" style={deskLinkBase(activeIndustries)}
              onMouseEnter={e => { if (!activeIndustries) e.currentTarget.style.color = navDark ? 'rgba(255,255,255,0.95)' : C.p; }}
              onMouseLeave={e => { if (!activeIndustries) e.currentTarget.style.color = navDark ? 'rgba(255,255,255,0.78)' : C.body; }}>Industries</RouterLink>
            <button type="button" onClick={handleAbout}
              style={deskLinkBase(activeAbout)}
              onMouseEnter={e => { if (!activeAbout) e.currentTarget.style.color = navDark ? 'rgba(255,255,255,0.95)' : C.p; }}
              onMouseLeave={e => { if (!activeAbout) e.currentTarget.style.color = navDark ? 'rgba(255,255,255,0.78)' : C.body; }}>About</button>
            <button type="button" onClick={handleContact}
              style={deskLinkBase(activeContact)}
              onMouseEnter={e => { if (!activeContact) e.currentTarget.style.color = navDark ? 'rgba(255,255,255,0.95)' : C.p; }}
              onMouseLeave={e => { if (!activeContact) e.currentTarget.style.color = navDark ? 'rgba(255,255,255,0.78)' : C.body; }}>Contact</button>
          </div>
        )}

        {!isMobile ? (
          <Button variant={navDark ? 'primaryDark' : 'primary'} size="sm" to="/schedule-demo">Schedule a Demo →</Button>
        ) : (
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(o => !o)}
            style={{
              width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center",
              background:"transparent", border:"none", cursor:"pointer", padding:0, flexShrink:0,
            }}
          >
            <HamburgerIcon open={mobileOpen} navDark={navDark} />
          </button>
        )}
      </nav>

      {isMobile && mobileOpen && (
        <div
          style={{
            position:"fixed", top:64, left:0, right:0, bottom:0, zIndex:99,
            background:C.p, overflowY:"auto",
            animation:"navMobilePanelIn 0.22s ease forwards",
          }}
        >
          <div style={{ paddingBottom:32 }}>
            <button
              type="button"
              onClick={() => setMobileExpanded(mobileExpanded === "services" ? null : "services")}
              style={{
                width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
                padding:"16px 5vw", background:"none", border:"none", borderBottom:'1px solid rgba(255,255,255,0.12)',
                cursor:"pointer", fontFamily:"inherit", textAlign:"left",
              }}
            >
              <span style={{
                color: activeServices ? C.p2 : '#FFFFFF',
                fontSize:15,
                fontFamily:"'Akshar', sans-serif",
                fontWeight: activeServices ? 600 : 500,
              }}>Services</span>
              <ChevronDown size={14} color="rgba(255,255,255,0.7)" style={{
                transform: mobileExpanded === "services" ? "rotate(180deg)" : "none",
                transition:"transform 0.2s",
              }} />
            </button>
            {mobileExpanded === "services" && (
              <div style={{ background:'rgba(255,255,255,0.06)' }}>
                {SERVICES_NAV.map((item, i) => {
                  const isAct = pathname === item.slug;
                  return (
                  <RouterLink key={i} to={item.slug} onClick={closeMobile} style={{
                    display:"flex", alignItems:"flex-start", gap:12, padding:"12px 5vw 12px calc(5vw + 12px)",
                    textDecoration:"none", borderBottom:'1px solid rgba(255,255,255,0.08)',
                    color: isAct ? C.p2 : 'rgba(255,255,255,0.82)',
                    fontWeight: isAct ? 600 : 400,
                    borderLeft: isAct ? `3px solid ${C.p2}` : '3px solid transparent',
                    paddingLeft: isAct ? 13 : 16,
                    boxSizing:"border-box",
                  }}>
                    <span style={{ fontSize:20, width:40, height:40, borderRadius:10, flexShrink:0,
                      background:'rgba(255,255,255,0.1)', display:"flex", alignItems:"center", justifyContent:"center",
                      border:'1px solid rgba(255,255,255,0.15)' }}>{item.icon}</span>
                    <div>
                      <div style={{ color: 'inherit', fontWeight:500, fontSize:14, fontFamily:"'Akshar', sans-serif" }}>{item.label}</div>
                      <div style={{ color:'rgba(255,255,255,0.65)', fontSize:12, marginTop:2,
                        fontFamily:"'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight:300 }}>{item.desc}</div>
                    </div>
                  </RouterLink>
                  );
                })}
                <RouterLink to="/services" onClick={closeMobile}
                  style={{ display:"block", padding:"14px 5vw", color:'rgba(255,255,255,0.82)', fontSize:13.5, fontWeight:500, fontFamily:"'Akshar', sans-serif",
                    textDecoration:"none", borderBottom:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.04)' }}>
                  View all Services →
                </RouterLink>
              </div>
            )}

            <button
              type="button"
              onClick={() => setMobileExpanded(mobileExpanded === "products" ? null : "products")}
              style={{
                width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
                padding:"16px 5vw", background:"none", border:"none", borderBottom:'1px solid rgba(255,255,255,0.12)',
                cursor:"pointer", fontFamily:"inherit", textAlign:"left",
              }}
            >
              <span style={{
                color: activeProducts ? C.p2 : '#FFFFFF',
                fontSize:15,
                fontFamily:"'Akshar', sans-serif",
                fontWeight: activeProducts ? 600 : 500,
              }}>Products</span>
              <ChevronDown size={14} color="rgba(255,255,255,0.7)" style={{
                transform: mobileExpanded === "products" ? "rotate(180deg)" : "none",
                transition:"transform 0.2s",
              }} />
            </button>
            {mobileExpanded === "products" && (
              <div style={{ background:'rgba(255,255,255,0.06)' }}>
                {PRODUCTS_NAV.map((item, i) => {
                  const isAct = pathname === item.slug;
                  return (
                  <RouterLink key={i} to={item.slug} onClick={closeMobile} style={{
                    display:"flex", alignItems:"flex-start", gap:12, padding:"12px 5vw 12px calc(5vw + 12px)",
                    textDecoration:"none", borderBottom:'1px solid rgba(255,255,255,0.08)',
                    color: isAct ? C.p2 : 'rgba(255,255,255,0.82)',
                    fontWeight: isAct ? 600 : 400,
                    borderLeft: isAct ? `3px solid ${C.p2}` : '3px solid transparent',
                    paddingLeft: isAct ? 13 : 16,
                    boxSizing:"border-box",
                  }}>
                    <span style={{ fontSize:20, width:40, height:40, borderRadius:10, flexShrink:0,
                      background:'rgba(255,255,255,0.1)', display:"flex", alignItems:"center", justifyContent:"center",
                      border:'1px solid rgba(255,255,255,0.15)' }}>{item.icon}</span>
                    <div>
                      <div style={{ color: 'inherit', fontWeight:500, fontSize:14, fontFamily:"'Akshar', sans-serif" }}>{item.label}</div>
                      <div style={{ color:'rgba(255,255,255,0.65)', fontSize:12, marginTop:2,
                        fontFamily:"'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight:300 }}>{item.desc}</div>
                    </div>
                  </RouterLink>
                  );
                })}
                <RouterLink to="/products" onClick={closeMobile}
                  style={{ display:"block", padding:"14px 5vw", color:'rgba(255,255,255,0.82)', fontSize:13.5, fontWeight:500, fontFamily:"'Akshar', sans-serif",
                    textDecoration:"none", borderBottom:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.04)' }}>
                  View all Products →
                </RouterLink>
              </div>
            )}

            <RouterLink
              to="/industries"
              onClick={closeMobile}
              style={{
                display:"block", padding:"14px 5vw", fontSize:15, fontFamily:"'Akshar', sans-serif",
                textDecoration:"none", borderBottom:'1px solid rgba(255,255,255,0.12)',
                color: activeIndustries ? C.p2 : 'rgba(255,255,255,0.82)',
                fontWeight: activeIndustries ? 600 : 400,
                borderLeft: activeIndustries ? `3px solid ${C.p2}` : '3px solid transparent',
                paddingLeft: activeIndustries ? 13 : 16,
                boxSizing:"border-box",
              }}
            >
              Industries
            </RouterLink>
            <button
              type="button"
              onClick={() => { handleAbout(); closeMobile(); }}
              style={{
                display:"block", width:"100%", padding:"14px 5vw", fontSize:15, fontFamily:"'Akshar', sans-serif",
                cursor:"pointer", background:"none", border:"none", borderBottom:'1px solid rgba(255,255,255,0.12)',
                textAlign:"left",
                color: activeAbout ? C.p2 : 'rgba(255,255,255,0.82)',
                fontWeight: activeAbout ? 600 : 400,
                borderLeft: activeAbout ? `3px solid ${C.p2}` : '3px solid transparent',
                paddingLeft: activeAbout ? 13 : 16,
                boxSizing:"border-box",
              }}
            >
              About
            </button>
            <button
              type="button"
              onClick={() => { handleContact(); closeMobile(); }}
              style={{
                display:"block", width:"100%", padding:"14px 5vw", fontSize:15, fontFamily:"'Akshar', sans-serif",
                cursor:"pointer", background:"none", border:"none", borderBottom:'1px solid rgba(255,255,255,0.12)',
                textAlign:"left",
                color: activeContact ? C.p2 : 'rgba(255,255,255,0.82)',
                fontWeight: activeContact ? 600 : 400,
                borderLeft: activeContact ? `3px solid ${C.p2}` : '3px solid transparent',
                paddingLeft: activeContact ? 13 : 16,
                boxSizing:"border-box",
              }}
            >
              Contact
            </button>

            <div style={{ padding:"24px 5vw 8px" }}>
              <Button
                variant="primaryDark"
                size="md"
                to="/schedule-demo"
                onClick={closeMobile}
                style={{ width:"100%", justifyContent:"center", boxSizing:"border-box" }}
              >
                Schedule a Demo →
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
