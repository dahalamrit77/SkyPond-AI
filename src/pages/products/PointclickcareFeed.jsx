// product page -> PointclickcareFeed (refactored)
import C from '../../tokens.js'
import { useState } from "react"
import { Button } from '../../components/ui/Button.jsx'
import { Navbar } from '../../components/Navbar.jsx'
import { Footer } from '../../components/Footer.jsx'
import { Breadcrumb } from '../../components/Breadcrumb.jsx'
import { ProductHero } from '../../components/ProductHero.jsx'
import {
  Rss, Hospital, Zap, Pill, CreditCard, LogOut, Shield,
  Plug, Eye, CheckCircle, FileText, KeyRound, LayoutGrid,
  BarChart3, ClipboardList, Receipt,
} from 'lucide-react'

// ── Primitives ────────────────────────────────────────────────────────────────

const Badge = ({ c = C.p2, children }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 13px",
    borderRadius: 99, border: `1px solid ${c}28`, background: `${c}18`, color: c,
    fontSize: 11.5, letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: 500,
    fontFamily: "'Akshar', sans-serif",
  }}>
    {children}
  </span>
)

const H = ({ size = "h2", style = {}, color, children }) => {
  const s = { hero: "clamp(2.4rem,5vw,4rem)", h2: "clamp(1.8rem,2.7vw,2.5rem)", h3: "1.2rem" }
  const fw = size === "h3" ? 500 : 700
  return (
    <h2 style={{
      fontSize: s[size], fontWeight: fw, color: color || C.head,
      letterSpacing: "-0.026em", lineHeight: 1.1,
      fontFamily: "'Akshar', sans-serif", ...style,
    }}>{children}</h2>
  )
}

const P = ({ style = {}, children }) => (
  <p style={{
    fontSize: "clamp(0.96rem,1.1vw,1.04rem)", color: C.body, lineHeight: 1.76,
    fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight: 400, ...style,
  }}>{children}</p>
)

function Card({ children, style = {}, ac = C.accent, hover = true }) {
  const [h, setH] = useState(false)
  return (
    <div
      onMouseEnter={() => hover && setH(true)}
      onMouseLeave={() => hover && setH(false)}
      style={{
        background: C.surface, border: `1.5px solid ${h ? C.p2 : C.border}`, borderRadius: 16,
        transition: "all 0.2s", transform: h && hover ? "translateY(-4px)" : "none",
        boxShadow: h && hover ? `0 16px 40px ${ac}1A` : "0 2px 8px rgba(0,0,0,0.04)", ...style,
      }}
    >{children}</div>
  )
}

const CheckItem = ({ children }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: C.head }}>
    <div style={{
      width: 20, height: 20, borderRadius: "50%", background: `${C.green}18`,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1,
    }}>
      <CheckCircle size={11} color={C.green} />
    </div>
    {children}
  </div>
)

// ── Mockup chrome wrapper ────────────────────────────────────────────────────

function MockupChrome({ tab, children }) {
  return (
    <div style={{
      background: C.dark, borderRadius: 18, border: "1px solid rgba(255,255,255,0.10)",
      overflow: "hidden", boxShadow: "0 24px 56px rgba(0,0,0,0.22)",
    }}>
      <div style={{
        background: "rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "10px 16px", display: "flex", alignItems: "center", gap: 6,
      }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
        <div style={{
          marginLeft: 10, fontSize: 11, color: C.muted,
          background: "rgba(255,255,255,0.06)", borderRadius: 4, padding: "3px 10px",
        }}>{tab}</div>
      </div>
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  )
}

// ── Flow diagram strip (inside Hero) ─────────────────────────────────────────

function FlowNode({ icon, title, sub, pills, highlight }) {
  return (
    <div style={{
      background: highlight ? `${C.green}12` : C.surface,
      border: `1px solid ${highlight ? `${C.green}55` : C.border}`,
      borderRadius: 16, padding: "22px 18px", textAlign: "center",
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: "50%",
        background: highlight ? `${C.green}22` : C.bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 10px", color: highlight ? C.green : C.p,
      }}>{icon}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.head, marginBottom: 4, fontFamily: "'Akshar', sans-serif" }}>{title}</div>
      <div style={{ fontSize: 11, color: C.body, lineHeight: 1.4 }}>{sub}</div>
      {pills && (
        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 5 }}>
          {pills.map((p, i) => (
            <div key={i} style={{
              fontSize: 10, background: C.bg,
              border: `1px solid ${C.border}`,
              color: C.body, borderRadius: 6, padding: "4px 8px",
            }}>{p}</div>
          ))}
        </div>
      )}
    </div>
  )
}

function FlowConnector({ tag }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "0 6px" }}>
      <div style={{
        fontSize: 10, fontWeight: 600, color: C.green,
        background: `${C.green}18`, border: `1px solid ${C.green}33`,
        padding: "3px 10px", borderRadius: 100, whiteSpace: "nowrap",
      }}>{tag}</div>
      <div style={{
        width: "100%", height: 2, position: "relative",
        background: `linear-gradient(90deg, ${C.border}, ${C.green} 50%, ${C.border})`,
      }}>
        <div style={{
          position: "absolute", right: -1, top: -4,
          borderLeft: `8px solid ${C.green}`,
          borderTop: "5px solid transparent", borderBottom: "5px solid transparent",
        }} />
      </div>
    </div>
  )
}

function FlowStrip() {
  return (
    <div style={{
      background: C.surface,
      borderTop: `1px solid ${C.border}`,
      padding: "44px 5vw 48px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
          color: C.muted, marginBottom: 32, textAlign: "center",
        }}>How data moves</div>
        <div style={{
          display: "grid", gridTemplateColumns: "200px 1fr 230px 1fr 200px", alignItems: "center",
        }}>
          <FlowNode
            icon={<Hospital size={28} />}
            title="PointClickCare"
            sub="Facility EHR — staff enter changes here"
            pills={["Payor source changed", "Admission / discharge", "Coverage updated"]}
          />
          <FlowConnector tag="monitored in real time" />
          <FlowNode
            icon={<Zap size={28} />}
            title="Skypond Platform"
            sub="Detects, validates & routes every change event instantly"
            highlight
          />
          <FlowConnector tag="automatically pushed" />
          <FlowNode
            icon={<Pill size={28} />}
            title="Your Pharmacy System"
            sub="Document management receives updates instantly"
            pills={["Billing team notified", "Census record updated", "Claim corrected"]}
          />
        </div>
      </div>
    </div>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <ProductHero
      badge="Real-Time Data Feed"
      title={(
        <>
          Every <span style={{ color: C.p }}>PointClickCare</span> change
          <br />
          delivered to your pharmacy instantly
        </>
      )}
      description="Our platform monitors PointClickCare in real time and pushes every relevant change — payor updates, census shifts, coverage modifications — directly into your pharmacy's document management system. No manual reports. No facility logins. No billing on the wrong payor."
      stats={[
        { num: 'Real-time', label: 'PCC change detection as it happens' },
        { num: 'Auto', label: 'Pushed to your doc management system' },
        { num: 'Zero', label: 'Manual report runs needed' },
        { num: 'HIPAA', label: 'Compliant by design' },
      ]}
      after={<FlowStrip />}
    />
  )
}

// ── Feature mockup panels ─────────────────────────────────────────────────────

function LiveFeedMockup() {
  const rows = [
    {
      icon: <CreditCard size={14} />, iconBg: `${C.green}26`, iconColor: C.green,
      label: "Payor Source Changed",
      sub: "R. Martinez · Sunrise SNF · Medicare → Managed Care",
      status: "Pushed", statusBg: `${C.green}26`, statusColor: C.green,
    },
    {
      icon: <Hospital size={14} />, iconBg: "rgba(59,130,246,0.20)", iconColor: "#7eb8f7",
      label: "New Admission",
      sub: "T. Johnson · Maplewood Care · Medicare Part A",
      status: "Delivered", statusBg: "rgba(59,130,246,0.18)", statusColor: "#7eb8f7",
    },
    {
      icon: <LogOut size={14} />, iconBg: "rgba(245,158,11,0.18)", iconColor: "#f5c96a",
      label: "Discharge Recorded",
      sub: "E. Kim · Valley View SNF · Fills suspended",
      status: "Pushed", statusBg: `${C.green}26`, statusColor: C.green,
    },
    {
      icon: <Shield size={14} />, iconBg: "rgba(168,85,247,0.18)", iconColor: "#c79cf7",
      label: "Coverage Updated",
      sub: "M. Okafor · Elmwood · Private Pay → Medicaid",
      status: "Routing", statusBg: "rgba(245,158,11,0.14)", statusColor: "#f5c96a",
    },
  ]

  return (
    <MockupChrome tab="PCC Change Feed — Live">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.88)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Incoming Changes
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: C.green, fontWeight: 500 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green }} />
          Live
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {rows.map((r, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 10, padding: "11px 14px",
            display: "grid", gridTemplateColumns: "32px 1fr auto", gap: 12, alignItems: "center",
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8, background: r.iconBg,
              display: "flex", alignItems: "center", justifyContent: "center", color: r.iconColor,
            }}>{r.icon}</div>
            <div>
              <div style={{ fontSize: 12, color: "#fff", fontWeight: 600, marginBottom: 2 }}>{r.label}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{r.sub}</div>
            </div>
            <div style={{
              fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 6,
              background: r.statusBg, color: r.statusColor, whiteSpace: "nowrap",
            }}>{r.status}</div>
          </div>
        ))}
      </div>
    </MockupChrome>
  )
}

function PayorMockup() {
  const payors = [
    { name: "Medicare Part A", count: "54 residents", pct: 38, color: C.green },
    { name: "Medicaid", count: "47 residents", pct: 33, color: "#7eb8f7" },
    { name: "Managed Care", count: "29 residents", pct: 20, color: "#f5c96a" },
    { name: "Private Pay", count: "12 residents", pct: 9, color: "#c79cf7" },
  ]

  return (
    <MockupChrome tab="Payor Distribution — Sunrise SNF">
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.88)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>
          Current Payor Breakdown
        </div>
        <div style={{ fontSize: 11, color: C.muted }}>142 active residents · Updated just now</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
        {payors.map((p) => (
          <div key={p.name} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.88)", fontWeight: 500 }}>{p.name}</span>
              <span style={{ fontSize: 11, color: C.muted }}>{p.count} · {p.pct}%</span>
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 100, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 100, background: p.color, width: `${p.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "10px 12px", background: `${C.green}14`,
        border: `1px solid ${C.green}33`, borderRadius: 10,
      }}>
        <CreditCard size={14} color={C.green} />
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.72)" }}>3 payor changes received today —</span>
        <span style={{ fontSize: 11, color: C.green, fontWeight: 600 }}>billing team notified</span>
      </div>
    </MockupChrome>
  )
}

function BeforeAfterMockup() {
  const before = [
    "Log into PCC at each facility",
    "Manually pull census reports",
    "Download and import files",
    "Done 1–2× daily, if remembered",
    "Claims sent with wrong payor",
  ]
  const after = [
    "No facility login needed",
    "Changes pushed automatically",
    "Lands in your doc mgmt system",
    "Real-time, all day, every facility",
    "Right payor, right claim, first try",
  ]

  return (
    <MockupChrome tab="Before vs. After PCC Feed">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{
          borderRadius: 12, padding: 16,
          background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)",
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.06em",
            textTransform: "uppercase", color: "#f87171", marginBottom: 12,
          }}>Before</div>
          {before.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 11, color: C.muted, marginBottom: 8 }}>
              <span style={{ flexShrink: 0, color: "#f87171", fontWeight: 700 }}>✗</span>
              {item}
            </div>
          ))}
        </div>
        <div style={{
          borderRadius: 12, padding: 16,
          background: `${C.green}0E`, border: `1px solid ${C.green}38`,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.06em",
            textTransform: "uppercase", color: C.green, marginBottom: 12,
          }}>With PCC Feed</div>
          {after.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 11, color: "rgba(255,255,255,0.72)", marginBottom: 8 }}>
              <span style={{ flexShrink: 0, color: C.green, fontWeight: 700 }}>✓</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </MockupChrome>
  )
}

// ── Features section ──────────────────────────────────────────────────────────

function Features() {
  const splits = [
    {
      title: "Real-time change feed, delivered to your system",
      desc: "The moment a facility staff member updates a resident record in PointClickCare — payor source, coverage, census status — our platform captures it and pushes it directly to your document management system. No batches. No polling delays. No stale data.",
      checks: [
        "Payor source changes delivered the moment they happen",
        "Admissions, discharges, and transfers tracked in real time",
        "Insurance coverage modifications captured automatically",
        "Full delivery confirmation and timestamped audit log",
      ],
      mockup: <LiveFeedMockup />,
      reverse: false,
    },
    {
      title: "Bill to the right payor — before the claim goes out",
      desc1: "Payor source changes are the most common reason LTC pharmacy claims get rejected. A Medicare spell ends, a resident moves to managed care, a private-pay patient qualifies for Medicaid — if your system doesn't know, the claim goes out wrong.",
      desc2: "The PCC feed ensures your billing team sees every payor change in time to correct it before submission, not after a denial.",
      checks: [
        "Medicare, Medicaid, managed care, and private pay tracked",
        "Billing team notified before the next claim cycle",
        "Fewer rejections from stale or incorrect payor data",
      ],
      mockup: <PayorMockup />,
      reverse: true,
    },
    {
      title: "No manual report runs. No facility logins. Ever.",
      desc1: "Many LTC pharmacy teams have staff whose job includes logging into PointClickCare at each facility — sometimes multiple times a day — just to pull census and payor reports. When facility credentials expire or change, the workflow breaks.",
      desc2: "The PCC feed replaces that entirely. Your pharmacy never needs facility-level access to stay current. The data comes to you, automatically.",
      checks: [
        "No facility PCC credentials required",
        "No manual exports, downloads, or file imports",
        "Works across all your facility contracts simultaneously",
        "Complete change history and delivery audit trail",
      ],
      mockup: <BeforeAfterMockup />,
      reverse: false,
    },
  ]

  return (
    <section id="features" style={{ padding: "80px 5vw", background: C.surface }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 52 }}>
          <div style={{ marginBottom: 14 }}><Badge c={C.p}>Capabilities</Badge></div>
          <H size="h2" style={{ marginBottom: 12 }}>Built for what LTC pharmacies actually need</H>
          <P style={{ maxWidth: 580 }}>
            Not a generic EHR connector — every feature targets the specific operational pain of relying on manual PCC workflows.
          </P>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 72 }}>
          {splits.map((sp, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center",
              direction: sp.reverse ? "rtl" : "ltr",
            }}>
              <div style={{ direction: "ltr" }}>
                <H size="h3" style={{ fontSize: 26, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>
                  {sp.title}
                </H>
                {sp.desc && <P style={{ marginBottom: 16 }}>{sp.desc}</P>}
                {sp.desc1 && <P style={{ marginBottom: 16 }}>{sp.desc1}</P>}
                {sp.desc2 && <P style={{ marginBottom: 16 }}>{sp.desc2}</P>}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {sp.checks.map((c, j) => <CheckItem key={j}>{c}</CheckItem>)}
                </div>
              </div>
              <div style={{ direction: "ltr" }}>{sp.mockup}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── How It Works ─────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      n: "01", icon: <Plug size={26} />, bg: `${C.green}1E`,
      title: "Connect to PCC",
      desc: "We configure the feed using your PointClickCare credentials and map your facility list. Setup is handled by our team.",
    },
    {
      n: "02", icon: <Eye size={26} />, bg: "rgba(59,130,246,0.12)",
      title: "Platform monitors 24/7",
      desc: "Our platform watches PointClickCare continuously — payor updates, census events, coverage changes — as they happen in real time.",
    },
    {
      n: "03", icon: <Zap size={26} />, bg: "rgba(245,158,11,0.12)",
      title: "Changes pushed instantly",
      desc: "Each detected change is packaged and delivered directly into your pharmacy's document management system — automatically.",
    },
    {
      n: "04", icon: <CheckCircle size={26} />, bg: `${C.green}1E`,
      title: "Your team acts on it",
      desc: "Billing and ops staff see accurate payor and census data in time to act — before the next claim cycle, not after a denial.",
    },
  ]

  return (
    <section id="how" style={{ padding: "80px 5vw", background: C.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ marginBottom: 14 }}><Badge c={C.p}>How It Works</Badge></div>
          <H size="h2" style={{ marginBottom: 12 }}>From connection to continuous delivery</H>
          <P style={{ maxWidth: 460, margin: "0 auto" }}>
            Most pharmacies are receiving real-time data within days of kick-off — no lengthy IT project on your side.
          </P>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, position: "relative" }}>
          <div style={{
            position: "absolute", top: 44, left: "12%", right: "12%", height: 2,
            backgroundImage: `repeating-linear-gradient(90deg, ${C.border} 0, ${C.border} 6px, transparent 6px, transparent 14px)`,
            zIndex: 0,
          }} />
          {steps.map((s, i) => (
            <div key={i} style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              textAlign: "center", padding: "0 16px", position: "relative", zIndex: 1,
            }}>
              <div
                style={{
                  width: 88, height: 88, borderRadius: "50%", background: C.surface,
                  border: `2px solid ${C.border}`, display: "flex", alignItems: "center",
                  justifyContent: "center", marginBottom: 20, position: "relative",
                  transition: "border-color 0.3s, box-shadow 0.3s", cursor: "default",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = C.green
                  e.currentTarget.style.boxShadow = `0 0 0 6px ${C.green}1A`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = C.border
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                <div style={{
                  width: 60, height: 60, borderRadius: "50%", background: s.bg,
                  display: "flex", alignItems: "center", justifyContent: "center", color: C.p,
                }}>{s.icon}</div>
                <div style={{
                  position: "absolute", top: -6, right: -6, width: 22, height: 22,
                  borderRadius: "50%", background: C.dark, color: C.green,
                  fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center",
                  justifyContent: "center", border: `2px solid ${C.border}`,
                  fontFamily: "'Akshar', sans-serif",
                }}>{s.n}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.head, marginBottom: 8, fontFamily: "'Akshar', sans-serif" }}>
                {s.title}
              </div>
              <div style={{ fontSize: 13, color: C.body, lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Who It's For ─────────────────────────────────────────────────────────────

function WhoItsFor() {
  const cases = [
    {
      icon: <Receipt size={28} />, iconBg: `${C.green}1E`, iconColor: C.green,
      title: "Billing to the right payor, every time",
      desc: "Payor source changes are the most common cause of LTC pharmacy claim rejections. The feed delivers those changes before your next claim cycle — not after a denial that requires rework and resubmission.",
      result: "Fewer rejections, faster reimbursement",
    },
    {
      icon: <FileText size={28} />, iconBg: "rgba(59,130,246,0.12)", iconColor: "#7eb8f7",
      title: "Eliminating the manual PCC report run",
      desc: "Many pharmacies have staff running manual census and payor reports from PCC multiple times daily. The feed replaces that entirely. Data arrives automatically — your staff focuses on pharmacy work instead.",
      result: "Hours recovered every week, per facility",
    },
    {
      icon: <KeyRound size={28} />, iconBg: "rgba(245,158,11,0.12)", iconColor: "#f5c96a",
      title: "No dependency on facility login access",
      desc: "Relying on facilities to provide and maintain PCC credentials creates operational risk — when logins expire or change, your workflow breaks. With the feed, you never need facility-level access to stay current.",
      result: "Operational continuity, zero access gaps",
    },
    {
      icon: <LayoutGrid size={28} />, iconBg: "rgba(168,85,247,0.12)", iconColor: "#c79cf7",
      title: "Managing high census volumes at scale",
      desc: "For pharmacies serving 20, 40, or 100+ facilities, manually tracking payor and census changes across all of them is impossible. The feed handles it systematically — every facility, every change, automatically delivered.",
      result: "Scales to any number of facilities",
    },
  ]

  return (
    <section style={{ padding: "96px 5vw 100px", background: C.alt }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 52 }}>
          <div style={{ marginBottom: 14 }}><Badge c={C.green}>Who It's For</Badge></div>
          <H size="h2" style={{ marginBottom: 12 }}>
            Built for real LTC pharmacy scenarios
          </H>
          <P style={{ maxWidth: 580, color: C.muted }}>
            Whether you serve 5 facilities or 150, the operational problem is the same — and the feed solves it at any scale.
          </P>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {cases.map((c, i) => (
            <div key={i}
              style={{
                background: C.surface, border: `1.5px solid ${C.border}`,
                borderRadius: 18, padding: 32,
                display: "grid", gridTemplateColumns: "64px 1fr", gap: 20, alignItems: "start",
                transition: "border-color 0.25s, box-shadow 0.25s",
                boxShadow: "0 2px 12px rgba(20,49,86,0.06)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = C.p2
                e.currentTarget.style.boxShadow = "0 10px 32px rgba(20,49,86,0.12)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = C.border
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(20,49,86,0.06)"
              }}
            >
              <div style={{
                width: 64, height: 64, borderRadius: 16, background: c.iconBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: c.iconColor, flexShrink: 0,
              }}>{c.icon}</div>
              <div>
                <div style={{
                  fontSize: 16, fontWeight: 600, color: C.head, marginBottom: 8,
                  lineHeight: 1.3, fontFamily: "'Akshar', sans-serif",
                }}>{c.title}</div>
                <p style={{
                  fontSize: 13.5, color: C.muted, lineHeight: 1.65, fontWeight: 400,
                  fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
                }}>{c.desc}</p>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  marginTop: 14, fontSize: 12, fontWeight: 600, color: C.p,
                }}>→ {c.result}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Security & Compliance ─────────────────────────────────────────────────────

function SecurityCompliance() {
  const items = [
    { title: "HIPAA Compliant", sub: "PHI handled under full HIPAA requirements" },
    { title: "HIPAA BAA Included", sub: "Business Associate Agreement with every deployment" },
    { title: "Encrypted in Transit & at Rest", sub: "TLS 1.3 in transit · AES-256 at rest" },
    { title: "Full Change Audit Log", sub: "Every event logged with timestamp and delivery status" },
    { title: "Role-Based Access Controls", sub: "Granular permissions on who can see what" },
    { title: "SOC 2 Type II", sub: "Independently audited security controls" },
  ]

  return (
    <section style={{ padding: "0 5vw 80px", background: C.dark }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 64 }}>
          <div style={{ marginBottom: 52 }}>
            <div style={{ marginBottom: 14 }}><Badge c={C.green}>Security & Compliance</Badge></div>
            <H size="h2" style={{ marginBottom: 12, color: "#fff" }}>
              Built to handle protected health information the right way
            </H>
            <P style={{ maxWidth: 580, color: "rgba(255,255,255,0.72)" }}>
              All data received from PointClickCare and delivered to your document management system is encrypted in transit and at rest. Every change event is logged with full provenance.
            </P>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {items.map((it, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14, padding: 20, display: "flex", alignItems: "center", gap: 14,
              }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.green, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{it.title}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{it.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Related ───────────────────────────────────────────────────────────────────

function Related() {
  const items = [
    {
      icon: <FileText size={20} />, color: C.p, tag: "Product",
      title: "Document Automation", href: "/products/document-automation",
      desc: "PCC feed changes land in your document management system — Document Automation triggers the right workflows from those updates automatically.",
    },
    {
      icon: <BarChart3 size={20} />, color: C.p, tag: "Product",
      title: "LTC Analytics", href: "/products/ltc-analytics",
      desc: "Layer PCC census and payor data on top of your pharmacy metrics for a complete operational and financial picture across all facilities.",
    },
    {
      icon: <ClipboardList size={20} />, color: C.p, tag: "Product",
      title: "DEA Compliance Reporting", href: "/products/dea-compliance-reporting",
      desc: "Keep compliance workflows informed by the same real-time census and payor data flowing through the PCC feed.",
    },
  ]

  return (
    <section style={{ padding: "80px 5vw", background: C.surface }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 52 }}>
          <div style={{ marginBottom: 14 }}><Badge c={C.p}>Related Products</Badge></div>
          <H size="h2">Works well with</H>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
          {items.map((it, i) => (
            <Card key={i} ac={it.color}>
              <a href={it.href} style={{ display: "block", padding: "24px 22px", textDecoration: "none" }}>
                <div style={{ marginBottom: 12, color: it.color }}>{it.icon}</div>
                <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: it.color, marginBottom: 6 }}>{it.tag}</div>
                <div style={{ color: C.head, fontWeight: 700, fontSize: 16, marginBottom: 8, fontFamily: "'Akshar', sans-serif" }}>{it.title}</div>
                <div style={{ color: C.body, fontSize: 13.5, lineHeight: 1.6 }}>{it.desc}</div>
                <div style={{ color: it.color, fontSize: 13, fontWeight: 700, marginTop: 14 }}>Learn more →</div>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA ───────────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <section style={{
      padding: "80px 5vw", background: C.bg,
      borderTop: `1px solid ${C.border}`,
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center",
      }}>
        <div>
          <H size="h2" style={{ marginBottom: 12 }}>
            See the PCC feed in action
          </H>
          <P style={{ color: C.muted, maxWidth: 520 }}>
            We'll show you exactly how a payor source change in PointClickCare reaches your document management system in real time — live demo, not a slide deck.
          </P>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
          <Button variant="primary" size="md" to="/schedule-demo">Schedule a Demo →</Button>
          <Button variant="secondary" size="md" to="/schedule-demo">Talk to Sales</Button>
        </div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PointclickcareFeed() {
  return (
    <>
      <Navbar />
      <Breadcrumb items={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "PointClickCare Data Feed", href: null },
      ]} />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <WhoItsFor />
        <SecurityCompliance />
        <Related />
        <CTA />
      </main>
      <Footer />
    </>
  )
}