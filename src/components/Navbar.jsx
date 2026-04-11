import C from '../tokens.js'
import { useState, useEffect, useRef } from 'react'
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'
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

function PBtn({ children, onClick, href, light, to, style: styleProp }) {
  const base = { display:"inline-flex", alignItems:"center", gap:8, padding:"12px 24px",
    borderRadius:10, fontWeight:700, fontSize:14.5, border:"none", cursor:"pointer",
    textDecoration:"none", fontFamily:"inherit", transition:"all 0.15s" };
  const v = {
    ...(light
      ? {...base, background:"#fff", color:C.p, boxShadow:"0 2px 14px rgba(0,0,0,0.13)"}
      : {...base, background:`linear-gradient(135deg,${C.p},${C.pd})`, color:"#fff", boxShadow:`0 4px 20px ${C.p}45`}),
    ...(styleProp || {}),
  };

  const onMouseEnter = e=>{ e.currentTarget.style.transform="translateY(-2px)";
    e.currentTarget.style.boxShadow = light ? "0 8px 24px rgba(0,0,0,0.18)" : `0 8px 28px ${C.p}60`; }
  const onMouseLeave = e=>{ e.currentTarget.style.transform="none";
    e.currentTarget.style.boxShadow = light ? "0 2px 14px rgba(0,0,0,0.13)" : `0 4px 20px ${C.p}45`; }

  if (to) {
    return (
      <RouterLink to={to} onClick={onClick} style={v} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {children}
      </RouterLink>
    );
  }

  const Tag = href ? "a" : "button";
  return (
    <Tag href={href} onClick={onClick} style={v} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
    </Tag>
  );
}

function NavDropdown({ label, items, onAnchor, active }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = open || active;
  const btnColor = isActive ? C.p : C.body;
  const btnWeight = isActive ? 700 : 600;

  return (
    <div ref={ref} style={{ position:"relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}>
      <button
        style={{ display:"flex", alignItems:"center", gap:5, background:"none", border:"none",
          color:btnColor, fontSize:13.5, fontWeight:btnWeight, cursor:"pointer",
          fontFamily:"inherit", transition:"color 0.15s", padding:"4px 0" }}>
        {label}
        <ChevronDown size={12} style={{ transition:"transform 0.2s", transform: open ? "rotate(180deg)" : "none" }} />
      </button>

      {open && (
        <div style={{ position:"absolute", top:"calc(100% + 12px)", left:"50%",
          transform:"translateX(-50%)", width:480, background:C.surface,
          borderRadius:16, border:`1.5px solid ${C.border}`,
          boxShadow:`0 20px 60px rgba(59,63,176,0.14)`,
          padding:"10px 10px", zIndex:200,
          animation:"dropIn 0.18s ease both" }}>
          {/* Arrow */}
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
                  <div style={{ color:C.head, fontWeight:700, fontSize:13.5,
                    fontFamily:"'DM Sans',sans-serif" }}>{item.label}</div>
                  <div style={{ color:C.body, fontSize:11.5, marginTop:2 }}>{item.desc}</div>
                </div>
              </RouterLink>
            ))}
          </div>
          <div style={{ borderTop:`1px solid ${C.border}`, marginTop:8, paddingTop:8,
            padding:"10px 12px 6px" }}>
            <RouterLink to={label === "Services" ? "/services" : "/products"}
              style={{ fontSize:12.5, fontWeight:700, color:C.p, textDecoration:"none",
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

function HamburgerIcon({ open }) {
  if (open) {
    return <X size={20} color={C.head} aria-hidden />;
  }
  return <Menu size={22} color={C.head} aria-hidden />;
}

export function Navbar() {
  const [sc, setSc] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 900);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleAbout = () => {
    if (pathname === "/") {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/about");
    }
  };

  const handleContact = () => {
    if (pathname === "/") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/schedule-demo");
    }
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
  const useSolidNav = sc || pathname !== "/" || mobileOpen;

  // screen blend reads well on dark hero (home, transparent nav); it washes out on light nav backgrounds
  const logoImgStyle = {
    width: 36,
    height: 36,
    objectFit: "contain",
    ...(useSolidNav
      ? { mixBlendMode: "normal", filter: "none" }
      : { mixBlendMode: "screen", filter: "brightness(1.1)" }),
  };

  const activeServices = pathname.startsWith("/services");
  const activeProducts = pathname.startsWith("/products");
  const activeIndustries = pathname === "/industries";
  const activeAbout = pathname === "/about";
  const activeContact = pathname === "/schedule-demo";

  const mobileLinkStyle = {
    display:"block", padding:"14px 5vw", color:C.head, fontSize:15, fontWeight:600,
    textDecoration:"none", borderBottom:`1px solid ${C.border}`, fontFamily:"'DM Sans',sans-serif",
  };

  const mobileSubLinkStyle = {
    display:"flex", alignItems:"flex-start", gap:12, padding:"12px 5vw 12px calc(5vw + 12px)",
    textDecoration:"none", borderBottom:`1px solid ${C.alt}`,
  };

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
        background: useSolidNav ? "rgba(246,247,253,0.95)" : "transparent",
        backdropFilter: useSolidNav ? "blur(18px)" : "none",
        borderBottom: useSolidNav ? `1px solid ${C.border}` : "none", transition:"all 0.3s" }}>
        <RouterLink to="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
          <img src="/logosymbol.png" alt="SkypondTech" style={logoImgStyle} />
          <span style={{ color:C.head, fontWeight:800, fontSize:17, letterSpacing:"-0.02em",
            fontFamily:"'DM Sans',sans-serif" }}>
            SkypondTech<span style={{ color:C.p }}>.ai</span>
          </span>
        </RouterLink>

        {!isMobile && (
          <div style={{ display:"flex", alignItems:"center", gap:26 }}>
            <NavDropdown label="Services" items={SERVICES_NAV} active={activeServices} />
            <NavDropdown label="Products" items={PRODUCTS_NAV} active={activeProducts} />
            <RouterLink to="/industries" style={{
              color: activeIndustries ? C.p : C.body,
              fontSize:13.5,
              fontWeight: activeIndustries ? 700 : 600,
              textDecoration:"none", transition:"color 0.15s" }}
              onMouseEnter={e => { if (!activeIndustries) e.currentTarget.style.color=C.p; }}
              onMouseLeave={e => { if (!activeIndustries) e.currentTarget.style.color=C.body; }}>Industries</RouterLink>
            <button type="button" onClick={handleAbout}
              style={{ background:"none", border:"none",
                color: activeAbout ? C.p : C.body, fontSize:13.5, fontWeight: activeAbout ? 700 : 600,
                cursor:"pointer", fontFamily:"inherit", transition:"color 0.15s" }}
              onMouseEnter={e => { if (!activeAbout) e.currentTarget.style.color=C.p; }}
              onMouseLeave={e => { if (!activeAbout) e.currentTarget.style.color=C.body; }}>About</button>
            <button type="button" onClick={handleContact}
              style={{ background:"none", border:"none",
                color: activeContact ? C.p : C.body, fontSize:13.5, fontWeight: activeContact ? 700 : 600,
                cursor:"pointer", fontFamily:"inherit", transition:"color 0.15s" }}
              onMouseEnter={e => { if (!activeContact) e.currentTarget.style.color=C.p; }}
              onMouseLeave={e => { if (!activeContact) e.currentTarget.style.color=C.body; }}>Contact</button>
          </div>
        )}

        {!isMobile ? (
          <PBtn to="/schedule-demo">Schedule a Demo →</PBtn>
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
            <HamburgerIcon open={mobileOpen} />
          </button>
        )}
      </nav>

      {isMobile && mobileOpen && (
        <div
          style={{
            position:"fixed", top:64, left:0, right:0, bottom:0, zIndex:99,
            background:C.surface, overflowY:"auto",
            animation:"navMobilePanelIn 0.22s ease forwards",
          }}
        >
          <div style={{ paddingBottom:32 }}>
            <button
              type="button"
              onClick={() => setMobileExpanded(mobileExpanded === "services" ? null : "services")}
              style={{
                width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
                padding:"16px 5vw", background:"none", border:"none", borderBottom:`1px solid ${C.border}`,
                cursor:"pointer", fontFamily:"inherit", textAlign:"left",
              }}
            >
              <span style={{
                color: activeServices ? C.p : C.body,
                fontSize:15,
                fontWeight: activeServices ? 700 : 600,
              }}>Services</span>
              <ChevronDown size={14} color={C.muted} style={{
                transform: mobileExpanded === "services" ? "rotate(180deg)" : "none",
                transition:"transform 0.2s",
              }} />
            </button>
            {mobileExpanded === "services" && (
              <div style={{ background:C.alt }}>
                {SERVICES_NAV.map((item, i) => (
                  <RouterLink key={i} to={item.slug} onClick={closeMobile} style={mobileSubLinkStyle}>
                    <span style={{ fontSize:20, width:40, height:40, borderRadius:10, flexShrink:0,
                      background:C.surface, display:"flex", alignItems:"center", justifyContent:"center",
                      border:`1px solid ${C.border}` }}>{item.icon}</span>
                    <div>
                      <div style={{ color:C.head, fontWeight:700, fontSize:14 }}>{item.label}</div>
                      <div style={{ color:C.muted, fontSize:12, marginTop:2 }}>{item.desc}</div>
                    </div>
                  </RouterLink>
                ))}
                <RouterLink to="/services" onClick={closeMobile}
                  style={{ ...mobileLinkStyle, background:C.surface, color:C.p, fontWeight:700, fontSize:13.5 }}>
                  View all Services →
                </RouterLink>
              </div>
            )}

            <button
              type="button"
              onClick={() => setMobileExpanded(mobileExpanded === "products" ? null : "products")}
              style={{
                width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
                padding:"16px 5vw", background:"none", border:"none", borderBottom:`1px solid ${C.border}`,
                cursor:"pointer", fontFamily:"inherit", textAlign:"left",
              }}
            >
              <span style={{
                color: activeProducts ? C.p : C.body,
                fontSize:15,
                fontWeight: activeProducts ? 700 : 600,
              }}>Products</span>
              <ChevronDown size={14} color={C.muted} style={{
                transform: mobileExpanded === "products" ? "rotate(180deg)" : "none",
                transition:"transform 0.2s",
              }} />
            </button>
            {mobileExpanded === "products" && (
              <div style={{ background:C.alt }}>
                {PRODUCTS_NAV.map((item, i) => (
                  <RouterLink key={i} to={item.slug} onClick={closeMobile} style={mobileSubLinkStyle}>
                    <span style={{ fontSize:20, width:40, height:40, borderRadius:10, flexShrink:0,
                      background:C.surface, display:"flex", alignItems:"center", justifyContent:"center",
                      border:`1px solid ${C.border}` }}>{item.icon}</span>
                    <div>
                      <div style={{ color:C.head, fontWeight:700, fontSize:14 }}>{item.label}</div>
                      <div style={{ color:C.muted, fontSize:12, marginTop:2 }}>{item.desc}</div>
                    </div>
                  </RouterLink>
                ))}
                <RouterLink to="/products" onClick={closeMobile}
                  style={{ ...mobileLinkStyle, background:C.surface, color:C.p, fontWeight:700, fontSize:13.5 }}>
                  View all Products →
                </RouterLink>
              </div>
            )}

            <RouterLink
              to="/industries"
              onClick={closeMobile}
              style={{
                ...mobileLinkStyle,
                color: activeIndustries ? C.p : C.body,
                fontWeight: activeIndustries ? 700 : 600,
              }}
            >
              Industries
            </RouterLink>
            <button
              type="button"
              onClick={() => { handleAbout(); closeMobile(); }}
              style={{
                ...mobileLinkStyle,
                width:"100%",
                cursor:"pointer",
                background:"none",
                textAlign:"left",
                fontFamily:"inherit",
                color: activeAbout ? C.p : C.body,
                fontWeight: activeAbout ? 700 : 600,
              }}
            >
              About
            </button>
            <button
              type="button"
              onClick={() => { handleContact(); closeMobile(); }}
              style={{
                ...mobileLinkStyle,
                width:"100%",
                cursor:"pointer",
                background:"none",
                textAlign:"left",
                fontFamily:"inherit",
                color: activeContact ? C.p : C.body,
                fontWeight: activeContact ? 700 : 600,
              }}
            >
              Contact
            </button>

            <div style={{ padding:"24px 5vw 8px" }}>
              <PBtn
                to="/schedule-demo"
                onClick={closeMobile}
                style={{ width:"100%", justifyContent:"center", boxSizing:"border-box" }}
              >
                Schedule a Demo →
              </PBtn>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
