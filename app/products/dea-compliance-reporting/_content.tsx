'use client'

import { useState } from 'react'
import {
  ClipboardList, Pill, Zap, Building2, Upload, BarChart3,
  Plug, CheckCircle, Eye, Network, UserCheck, Search, Package,
} from 'lucide-react'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { Button } from '@/components/ui/Button'
import { ProductHero } from '@/components/sections/ProductHero'
import C from '@/lib/tokens'
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '@/lib/constants'

/* ─── Page-local primitives ──────────────────────────────────────────────── */
function Badge({ c = C.p2, children }: { c?: string; children: React.ReactNode }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 13px',
      borderRadius: 99, border: `1px solid ${c}28`, background: `${c}18`, color: c,
      fontSize: 11.5, letterSpacing: '0.07em', textTransform: 'uppercase', fontWeight: 500,
      fontFamily: "'Akshar', sans-serif",
    }}>{children}</span>
  )
}

function H({ size = 'h2', style = {}, color, children }: {
  size?: 'hero' | 'h2' | 'h3'
  style?: React.CSSProperties
  color?: string
  children: React.ReactNode
}) {
  const sizes: Record<string, string> = {
    hero: 'clamp(2.4rem,5vw,4rem)',
    h2:   'clamp(1.8rem,2.7vw,2.5rem)',
    h3:   '1.2rem',
  }
  const fw = size === 'h3' ? 500 : 700
  const Tag = size === 'hero' ? 'h1' : size === 'h3' ? 'h3' : 'h2'
  return (
    <Tag style={{
      fontSize: sizes[size], fontWeight: fw, color: color || C.head,
      letterSpacing: '-0.026em', lineHeight: 1.1,
      fontFamily: "'Akshar', sans-serif", ...style,
    }}>{children}</Tag>
  )
}

function P({ style = {}, children }: { style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: 'clamp(0.96rem,1.1vw,1.04rem)', color: C.body, lineHeight: 1.76,
      fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight: 400, ...style,
    }}>{children}</p>
  )
}

function Card({ children, style = {}, ac = C.accent, hover = true }: {
  children: React.ReactNode
  style?: React.CSSProperties
  ac?: string
  hover?: boolean
}) {
  const [h, setH] = useState(false)
  return (
    <div
      onMouseEnter={() => hover && setH(true)}
      onMouseLeave={() => hover && setH(false)}
      style={{
        background: C.surface, border: `1.5px solid ${h ? C.p2 : C.border}`, borderRadius: 16,
        transition: 'all 0.2s', transform: h && hover ? 'translateY(-4px)' : 'none',
        boxShadow: h && hover ? `0 16px 40px ${ac}1A` : '0 2px 8px rgba(0,0,0,0.04)', ...style,
      }}
    >{children}</div>
  )
}

const CheckItem = ({ children }: { [key: string]: any }) => (
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

function MockupChrome({ tab, children }: { [key: string]: any }) {
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

// ── Diagram strip (inside Hero) ───────────────────────────────────────────────

function DiagramNode({ icon, title, sub, pills, highlight }: { [key: string]: any }) {
  return (
    <div style={{
      background: highlight ? `${C.p}12` : C.surface,
      border: `1px solid ${highlight ? C.p + "55" : C.border}`,
      borderRadius: 16, padding: "22px 18px", textAlign: "center",
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: "50%",
        background: highlight ? `${C.p}22` : C.bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 10px", color: C.p,
      }}>{icon}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.head, marginBottom: 4, fontFamily: "'Akshar', sans-serif" }}>{title}</div>
      <div style={{ fontSize: 11, color: C.body, lineHeight: 1.4 }}>{sub}</div>
      {pills && (
        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 4 }}>
          {pills.map((p: any, i: any) => (
            <div key={i} style={{
              fontSize: 10, background: C.bg, border: `1px solid ${C.border}`,
              color: C.body, borderRadius: 6, padding: "4px 8px",
            }}>{p}</div>
          ))}
        </div>
      )}
    </div>
  )
}

function DiagramConnector({ tag }: { [key: string]: any }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "0 6px" }}>
      <div style={{
        fontSize: 10, fontWeight: 600, color: C.green,
        background: `${C.green}18`, border: `1px solid ${C.green}33`,
        padding: "3px 10px", borderRadius: 100, whiteSpace: "nowrap",
      }}>{tag}</div>
      <div style={{
        width: "100%", height: 2,
        background: `linear-gradient(90deg, ${C.border}, ${C.green} 50%, ${C.border})`,
      }} />
    </div>
  )
}

function DiagramStrip() {
  return (
    <div style={{
      background: C.surface, borderTop: `1px solid ${C.border}`,
      padding: "44px 5vw 48px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
          color: C.muted, marginBottom: 32, textAlign: "center",
        }}>How reporting flows</div>
        <div style={{
          display: "grid", gridTemplateColumns: "200px 1fr 200px 1fr 200px", alignItems: "center",
        }}>
          <DiagramNode
            icon={<Pill size={20} />}
            title="Your Pharmacy System"
            sub="Dispense & ordering transactions"
            pills={["CII orders", "Dispense records", "Returns & adjustments"]}
          />
          <DiagramConnector tag="data pull & validation" />
          <DiagramNode
            icon={<Zap size={20} />}
            title="Skypond Platform"
            sub="Maps, validates & formats for DEA requirements"
            highlight
          />
          <DiagramConnector tag="automated submission" />
          <DiagramNode
            icon={<Building2 size={20} />}
            title="DEA Systems"
            sub="ARCOS · CSOS · Form 222"
            pills={["Confirmation receipt", "Archived record", "Audit trail"]}
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
      badge="Compliance Reporting"
      title={(
        <>
          Automated <span style={{ color: C.p }}>DEA reporting</span>
          <br />
          that eliminates manual filing risk
        </>
      )}
      description="Handle CSOS ordering, ARCOS submissions, and DEA Form 222 workflows without managing it by spreadsheet. Designed for LTC pharmacies that can't afford a filing mistake or a missed deadline."
      stats={[
        { num: '80%', label: 'Reduction in manual reporting time' },
        { num: '0', label: 'Missed filing deadlines for clients' },
        { num: 'CSOS', label: 'Certified integration' },
        { num: 'Multi-site', label: 'Rollup reporting' },
      ]}
      after={<DiagramStrip />}
    />
  )
}

// ── Feature mockup panels ─────────────────────────────────────────────────────

function ArcosMockup() {
  const stats = [
    { val: "1,847", label: "Transactions", color: C.green, bg: `${C.green}14`, border: `${C.green}33` },
    { val: "12", label: "Drug Codes", color: "#7eb8f7", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.2)" },
    { val: "0", label: "Exceptions", color: C.green, bg: `${C.green}14`, border: `${C.green}33` },
  ]
  const rows = [
    { text: "Data validation passed", status: "Complete", ok: true },
    { text: "DEA format requirements met", status: "Complete", ok: true },
    { text: "Awaiting pharmacist review & approval", status: "Pending", ok: false },
  ]
  return (
    <MockupChrome tab="ARCOS Report — Q1 2026 Draft">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.88)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Quarterly Filing Status
        </div>
        <div style={{ fontSize: 11, background: "rgba(245,158,11,0.12)", color: "#f5c96a", borderRadius: 6, padding: "4px 10px", fontWeight: 600 }}>
          Due Apr 30, 2026
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
        {stats.map((m: any) => (
          <div key={m.label} style={{ background: m.bg, border: `1px solid ${m.border}`, borderRadius: 10, padding: 14, textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: m.color, fontFamily: "'Akshar', sans-serif" }}>{m.val}</div>
            <div style={{ fontSize: 11, color: C.muted }}>{m.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {rows.map((r: any, i: any) => (
          <div key={i} style={{
            background: r.ok ? `${C.green}0A` : "rgba(245,158,11,0.07)",
            border: `1px solid ${r.ok ? C.green + "2E" : "rgba(245,158,11,0.2)"}`,
            borderRadius: 8, padding: "10px 14px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ fontSize: 12, color: r.ok ? "rgba(255,255,255,0.88)" : "#f5c96a" }}>
              {r.ok ? "✓" : "⏳"} {r.text}
            </div>
            <div style={{ fontSize: 10, color: r.ok ? C.green : "#f5c96a", fontWeight: 600 }}>{r.status}</div>
          </div>
        ))}
      </div>
    </MockupChrome>
  )
}

function Form222Mockup() {
  const drugs = [["Oxycodone HCl 5mg", "500", "Tablets"], ["Hydromorphone 2mg", "200", "Tablets"]]
  return (
    <MockupChrome tab="Form 222 — Digital Ordering Workflow">
      <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.88)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>
        Schedule II Purchase Order
      </div>
      <div style={{
        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12, padding: 16, marginBottom: 12,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          {[["Supplier DEA", "PM0010148"], ["Order Date", "Apr 24, 2026"]].map(([label, val]) => (
            <div key={label}>
              <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}>{val}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{
            display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 8,
            fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em", padding: "0 6px",
          }}>
            <span>Drug</span><span>Qty</span><span>Unit</span>
          </div>
          {drugs.map(([drug, qty, unit]) => (
            <div key={drug} style={{
              display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 8,
              fontSize: 11, color: "rgba(255,255,255,0.88)",
              background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: "8px 6px",
            }}>
              <span>{drug}</span><span>{qty}</span><span>{unit}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{
          flex: 1, background: `${C.green}1E`, border: `1px solid ${C.green}47`,
          borderRadius: 8, padding: 10, textAlign: "center",
          fontSize: 12, color: C.green, fontWeight: 600, cursor: "pointer",
        }}>✓ Approve & Submit via CSOS</div>
        <div style={{
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.16)",
          borderRadius: 8, padding: "10px 14px", fontSize: 12, color: C.muted, cursor: "pointer",
        }}>Review</div>
      </div>
    </MockupChrome>
  )
}

function CalendarMockup() {
  const items = [
    {
      icon: <Upload size={18} />, iconBg: "rgba(245,158,11,0.15)", iconColor: "#f5c96a",
      title: "ARCOS Q1 Submission", sub: "Due Apr 30 · All 3 locations",
      urgency: "6 days", urgencyColor: "#f5c96a",
      bg: "rgba(245,158,11,0.07)", border: "rgba(245,158,11,0.2)",
    },
    {
      icon: <ClipboardList size={18} />, iconBg: "rgba(59,130,246,0.12)", iconColor: "#7eb8f7",
      title: "Biennial Inventory (DEA)", sub: "Due Jun 1 · North location",
      urgency: "38 days", urgencyColor: C.muted,
      bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.10)",
    },
    {
      icon: <BarChart3 size={18} />, iconBg: `${C.green}1E`, iconColor: C.green,
      title: "ARCOS Q2 Submission", sub: "Due Jul 31 · All 3 locations",
      urgency: "97 days", urgencyColor: C.muted,
      bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.10)",
    },
  ]
  return (
    <MockupChrome tab="Compliance Calendar — All Deadlines">
      <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.88)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>
        Upcoming Filing Obligations
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((it: any, i: any) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 14, alignItems: "center",
            background: it.bg, border: `1px solid ${it.border}`, borderRadius: 10, padding: "12px 14px",
          }}>
            <div style={{
              width: 40, height: 40, background: it.iconBg, borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center", color: it.iconColor,
            }}>{it.icon}</div>
            <div>
              <div style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>{it.title}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{it.sub}</div>
            </div>
            <div style={{ fontSize: 11, color: it.urgencyColor, fontWeight: 600 }}>{it.urgency}</div>
          </div>
        ))}
      </div>
    </MockupChrome>
  )
}

// ── Features section ──────────────────────────────────────────────────────────

function Features() {
  const splits = [
    {
      title: "ARCOS automated filing — quarterly, on time, every time",
      desc: "Generate and submit quarterly ARCOS reports directly to the DEA without manual data extraction or formatting. Built-in validation catches errors before submission — not after a rejection notice.",
      checks: [
        "Auto-generated from your dispensing transaction data",
        "DEA format validation before every submission",
        "Confirmation receipts archived automatically",
        "Multi-location rollup into a single filing workflow",
      ],
      mockup: <ArcosMockup />,
      reverse: false,
    },
    {
      title: "DEA Form 222 — paperless Schedule II ordering via CSOS",
      desc: "Replace paper Form 222 with a fully digital ordering workflow. Approve, sign, and transmit Schedule I and II purchase orders electronically via CSOS — with a complete audit trail on every transaction.",
      checks: [
        "Digital DEA Form 222 from creation to CSOS submission",
        "Pharmacist e-sign and approve in the same workflow",
        "Supplier confirmation linked to the original order",
        "Full order history searchable by drug, date, or supplier",
      ],
      mockup: <Form222Mockup />,
      reverse: true,
    },
    {
      title: "Compliance calendar — no deadline falls through the cracks",
      desc: "A built-in compliance calendar tracks every DEA reporting obligation by frequency and jurisdiction. ARCOS quarters, biennial inventory dates, and Form 222 cycles all in one view — with automated reminders to your team.",
      checks: [
        "All DEA deadlines tracked and surfaced automatically",
        "Automated reminders at configurable lead times",
        "Exception flagging when data issues need attention before filing",
        "Multi-location deadline management in one dashboard",
      ],
      mockup: <CalendarMockup />,
      reverse: false,
    },
  ]

  return (
    <section id="features" style={{ padding: "80px 5vw", background: C.surface }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 52 }}>
          <div style={{ marginBottom: 14 }}><Badge c={C.p}>Capabilities</Badge></div>
          <H size="h2" style={{ marginBottom: 12 }}>Every DEA obligation — handled automatically</H>
          <P style={{ maxWidth: 580 }}>
            From quarterly ARCOS to Schedule II ordering, the system takes care of the mechanics so your team focuses on compliance decisions, not data entry.
          </P>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 72 }}>
          {splits.map((sp: any, i: any) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center",
              direction: sp.reverse ? "rtl" : "ltr",
            }}>
              <div style={{ direction: "ltr" }}>
                <H size="h3" style={{ fontSize: 26, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>
                  {sp.title}
                </H>
                <P style={{ marginBottom: 16 }}>{sp.desc}</P>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {sp.checks.map((c: any, j: any) => <CheckItem key={j}>{c}</CheckItem>)}
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
      title: "Connect data source",
      desc: "We integrate with your pharmacy system via API or scheduled pull and map your transaction data to DEA reporting formats.",
    },
    {
      n: "02", icon: <CheckCircle size={26} />, bg: "rgba(59,130,246,0.12)",
      title: "Auto-generated & validated",
      desc: "Draft reports are generated on schedule. Validation checks completeness, quantity accuracy, and DEA format requirements before you review.",
    },
    {
      n: "03", icon: <Eye size={26} />, bg: "rgba(245,158,11,0.12)",
      title: "Review exceptions",
      desc: "Any flagged items surface for pharmacist review. Approve corrections or override with documented justification.",
    },
    {
      n: "04", icon: <Upload size={26} />, bg: `${C.green}1E`,
      title: "Submit & archive",
      desc: "Approved reports transmit directly to DEA systems. Confirmations and full submission records are archived automatically.",
    },
  ]

  return (
    <section id="how" style={{ padding: "80px 5vw", background: C.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ marginBottom: 14 }}><Badge c={C.p}>How It Works</Badge></div>
          <H size="h2" style={{ marginBottom: 12 }}>From your data to DEA submission — automatically</H>
          <P style={{ maxWidth: 460, margin: "0 auto" }}>
            Integrates with your existing pharmacy system. Most clients are live within two weeks.
          </P>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, position: "relative" }}>
          <div style={{
            position: "absolute", top: 44, left: "12%", right: "12%", height: 2,
            backgroundImage: `repeating-linear-gradient(90deg, ${C.border} 0, ${C.border} 6px, transparent 6px, transparent 14px)`,
            zIndex: 0,
          }} />
          {steps.map((s: any, i: any) => (
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
      icon: <Building2 size={28} />, iconBg: `${C.green}1E`, iconColor: C.green,
      title: "Independent LTC pharmacies",
      desc: "Stop spending 20+ hours a quarter extracting, formatting, and submitting ARCOS data. Let the system handle the mechanics while your pharmacists handle compliance decisions.",
      result: "Hours recovered every quarter",
    },
    {
      icon: <Network size={28} />, iconBg: "rgba(59,130,246,0.12)", iconColor: "#7eb8f7",
      title: "Multi-location pharmacy chains",
      desc: "Consolidate reporting across all locations into one workflow. One review cycle. One submission process. One compliance officer who can see everything.",
      result: "Unified compliance across all locations",
    },
    {
      icon: <UserCheck size={28} />, iconBg: "rgba(245,158,11,0.12)", iconColor: "#f5c96a",
      title: "Compliance officers",
      desc: "Get a real-time view of every upcoming deadline, every pending exception, and every submitted report across your entire operation — without chasing pharmacists for status updates.",
      result: "Full visibility across every obligation",
    },
    {
      icon: <Search size={28} />, iconBg: "rgba(168,85,247,0.12)", iconColor: "#c79cf7",
      title: "Preparing for DEA inspection",
      desc: "Pull a complete submission history with all confirmation receipts and exception resolutions in minutes — not hours of hunting through email attachments and shared drives.",
      result: "Inspection-ready in minutes, not hours",
    },
  ]

  return (
    <section style={{ padding: "96px 5vw 100px", background: C.alt }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 52 }}>
          <div style={{ marginBottom: 14 }}><Badge c={C.green}>Who It's For</Badge></div>
          <H size="h2" style={{ marginBottom: 12 }}>
            Built for how LTC pharmacies actually operate
          </H>
          <P style={{ maxWidth: 580, color: C.muted }}>
            Whether you run one location or thirty, the compliance burden is real — and this is designed for it.
          </P>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {cases.map((c: any, i: any) => (
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
    { title: "CSOS Certified", sub: "Electronic Schedule I/II ordering via CSOS" },
    { title: "ARCOS Reporting", sub: "Quarterly automated submissions to DEA ARCOS" },
    { title: "DEA Form 222", sub: "Full digital workflow for Schedule II purchase orders" },
    { title: "21 CFR Part 11", sub: "Electronic signature compliance" },
    { title: "Encrypted Submissions", sub: "All DEA transmissions encrypted end-to-end" },
    { title: "Complete Audit Trail", sub: "Every action logged with user, timestamp, and outcome" },
  ]

  return (
    <section style={{ padding: "0 5vw 80px", background: C.dark }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 64 }}>
          <div style={{ marginBottom: 52 }}>
            <div style={{ marginBottom: 14 }}><Badge c={C.green}>Security & Compliance</Badge></div>
            <H size="h2" style={{ marginBottom: 12, color: "#fff" }}>
              Every report. Every deadline. Every time.
            </H>
            <P style={{ maxWidth: 580, color: "rgba(255,255,255,0.72)" }}>
              Our reporting engine is built and maintained by people with direct experience in DEA regulatory requirements for controlled substance dispensers.
            </P>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {items.map((it: any, i: any) => (
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
      icon: <Package size={20} />, color: C.p, tag: "Product",
      title: "CS Inventory", href: "/products/cs-inventory",
      desc: "Real-time controlled substance inventory with automated discrepancy alerts.",
    },
    {
      icon: <BarChart3 size={20} />, color: C.p, tag: "Product",
      title: "LTC Analytics", href: "/products/ltc-analytics",
      desc: "Pharmacy-specific dashboards for utilization, cost, and compliance KPIs.",
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
          {items.map((it: any, i: any) => (
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
            Ready to automate your DEA reporting?
          </H>
          <P style={{ color: C.muted, maxWidth: 520 }}>
            See how the system handles your full reporting cycle — from data pull to DEA submission — in a live walkthrough.
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

/* ─── Page export ─────────────────────────────────────────────────────────── */
export function DeaComplianceContent() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'DEA Compliance Reporting' }]} />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <WhoItsFor />
        <SecurityCompliance />
        <Related />
        <CTA />
      </main>
    </>
  )
}