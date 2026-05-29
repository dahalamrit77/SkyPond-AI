'use client'

import { useState } from 'react'
import {
  Package, Pill, Zap, ClipboardList, CheckCircle,
  PenLine, AlertTriangle, CheckSquare, BarChart3,
  Building2, UserCog, LayoutGrid, FileText, Search,
  Download, Archive, ChevronRight,
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

/* ── Shared sub-components ── */
function Mockup({ title, children }: { [key: string]: any }) {
  return (
    <div style={{
      background: C.dark, borderRadius: 18,
      border: '1px solid rgba(255,255,255,0.10)',
      overflow: 'hidden', boxShadow: '0 24px 56px rgba(0,0,0,0.22)',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 6,
      }}>
        {['#ff5f57', '#febc2e', '#28c840'].map((c: any) => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
        ))}
        <span style={{
          marginLeft: 10, fontSize: 11, color: C.muted,
          background: 'rgba(255,255,255,0.06)', borderRadius: 4, padding: '3px 10px',
        }}>{title}</span>
      </div>
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  )
}

function CheckItem({ children }: { [key: string]: any }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 10,
      fontSize: 14, color: C.head,
      fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
    }}>
      <div style={{
        width: 20, height: 20, borderRadius: '50%', background: `${C.green}18`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, marginTop: 1,
      }}>
        <CheckCircle size={11} color={C.green} />
      </div>
      {children}
    </div>
  )
}

/* ── Diagram strip nodes/connectors ── */
function DiagNode({ icon, title, sub, pills = [], special = false }: { [key: string]: any }) {
  return (
    <div style={{
      background: special ? `${C.green}12` : C.surface,
      border: `1px solid ${special ? `${C.green}55` : C.border}`,
      borderRadius: 16, padding: '22px 18px', textAlign: 'center',
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>{icon}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.head, marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 11, color: C.body, lineHeight: 1.4 }}>{sub}</div>
      {pills.length > 0 && (
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {pills.map((p: any) => (
            <div key={p} style={{
              fontSize: 10, background: C.bg,
              border: `1px solid ${C.border}`,
              color: C.body, borderRadius: 6, padding: '4px 8px',
            }}>{p}</div>
          ))}
        </div>
      )}
    </div>
  )
}

function DiagConn({ tag }: { [key: string]: any }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '0 6px' }}>
      <div style={{
        fontSize: 10, fontWeight: 600, color: C.green,
        background: `${C.green}18`, border: `1px solid ${C.green}33`,
        padding: '3px 10px', borderRadius: 100, whiteSpace: 'nowrap',
      }}>{tag}</div>
      <div style={{
        width: '100%', height: 2, position: 'relative',
        background: `linear-gradient(90deg, ${C.border}, ${C.green} 50%, ${C.border})`,
      }}>
        <div style={{
          position: 'absolute', right: -1, top: -4,
          borderLeft: `8px solid ${C.green}`,
          borderTop: '5px solid transparent', borderBottom: '5px solid transparent',
        }} />
      </div>
    </div>
  )
}

/* ── Mockup panels ── */
function MockupPerpetualBalance() {
  const muted = 'rgba(255,255,255,0.45)'
  const bright = 'rgba(255,255,255,0.85)'
  const rows = [
    { drug: 'Oxycodone 5mg', onHand: '487 tabs', expected: '487', status: '✓ Match', ok: true },
    { drug: 'Hydromorphone 2mg', onHand: '196 tabs', expected: '200', status: '⚠ -4', ok: false },
    { drug: 'Fentanyl 25mcg patch', onHand: '42 units', expected: '42', status: '✓ Match', ok: true },
  ]
  return (
    <Mockup title="CS Inventory — Perpetual Balance">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: bright, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Schedule II — Running Balance
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: C.green, fontWeight: 500 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.green }} />
          Live
        </div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '12px 14px', marginBottom: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 8, fontSize: 10, color: muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
          {['Drug', 'On Hand', 'Expected', 'Status'].map((h: any) => <span key={h}>{h}</span>)}
        </div>
        {rows.map((r: any, i: any) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 8,
            fontSize: 12, color: bright, padding: '6px 0',
            borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
          }}>
            <span>{r.drug}</span>
            <span>{r.onHand}</span>
            <span>{r.expected}</span>
            <span style={{ color: r.ok ? C.green : '#f87171', fontWeight: 600 }}>{r.status}</span>
          </div>
        ))}
      </div>
      <div style={{
        background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
        borderRadius: 10, padding: '12px 14px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: 12, color: '#f87171', fontWeight: 600 }}>Discrepancy Detected</div>
          <div style={{ fontSize: 11, color: muted }}>Hydromorphone 2mg · -4 tablets · Requires review</div>
        </div>
        <div style={{ fontSize: 10, background: 'rgba(239,68,68,0.15)', color: '#f87171', padding: '4px 10px', borderRadius: 6, fontWeight: 600 }}>
          Investigate
        </div>
      </div>
    </Mockup>
  )
}

function MockupWasteLog() {
  const muted = 'rgba(255,255,255,0.45)'
  const bright = 'rgba(255,255,255,0.85)'
  const fields = [
    ['Drug Wasted', 'Morphine Sulfate 10mg/mL', bright],
    ['Quantity', '4 mL', bright],
    ['Reason', 'Partial vial — patient discharged', bright],
    ['Date & Time', 'Apr 24, 2026 · 14:32', bright],
  ]
  return (
    <Mockup title="Waste Log — Witnessed Destruction">
      <div style={{ fontSize: 12, fontWeight: 600, color: bright, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
        Controlled Substance Waste Event
      </div>
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16, marginBottom: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          {fields.map(([label, val, c]) => (
            <div key={label}>
              <div style={{ fontSize: 10, color: muted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 13, color: c, fontWeight: 500 }}>{val}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[['Primary Witness', '✓ S. Patel, RPh'], ['Second Witness', '✓ M. Torres, CPhT']].map(([label, name]) => (
            <div key={label} style={{
              background: `${C.green}14`, border: `1px solid ${C.green}33`,
              borderRadius: 8, padding: 10, textAlign: 'center',
            }}>
              <div style={{ fontSize: 11, color: muted, marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>{name}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: muted, background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 12px' }}>
        <Archive size={13} color={muted} />
        <span>Logged to perpetual record · Balance updated · Destruction documentation generated</span>
      </div>
    </Mockup>
  )
}

function MockupBiennialInventory() {
  const muted = 'rgba(255,255,255,0.45)'
  const bright = 'rgba(255,255,255,0.85)'
  const summary = [
    { val: '64', label: 'CS Drug Entries' },
    { val: 'CII–CV', label: 'All Schedules' },
    { val: 'DEA', label: 'Format Compliant' },
  ]
  return (
    <Mockup title="Biennial Inventory — Export Ready">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: bright, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          May 1, 2026 Biennial Inventory
        </div>
        <div style={{ fontSize: 11, background: `${C.green}20`, color: C.green, borderRadius: 6, padding: '4px 10px', fontWeight: 600 }}>
          Ready
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
        {summary.map(({ val, label }) => (
          <div key={label} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 14, textAlign: 'center' }}>
            <div style={{ fontFamily: "'Akshar', sans-serif", fontSize: 24, fontWeight: 900, color: C.green }}>{val}</div>
            <div style={{ fontSize: 11, color: muted }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{
          flex: 1, background: `${C.green}20`, border: `1px solid ${C.green}45`,
          borderRadius: 8, padding: 10, textAlign: 'center',
          fontSize: 12, color: C.green, fontWeight: 600,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer',
        }}>
          <Download size={13} /> Download DEA Report
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.16)',
          borderRadius: 8, padding: '10px 14px',
          fontSize: 12, color: muted, cursor: 'pointer',
        }}>
          Preview
        </div>
      </div>
    </Mockup>
  )
}

/* ── Diagram strip ── */
function DiagramStrip() {
  return (
    <div style={{
      background: C.surface,
      borderTop: `1px solid ${C.border}`,
      padding: '44px 5vw 48px',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: C.muted,
          marginBottom: 32, textAlign: 'center',
        }}>How every transaction is tracked</div>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 200px 1fr 200px', alignItems: 'center' }}>
          <DiagNode
            icon={<Pill size={28} color={C.p} />}
            title="Transaction Occurs"
            sub="Receive, dispense, return, waste, or transfer"
            pills={['Dispense CII', 'Waste witnessed', 'Receive from supplier']}
          />
          <DiagConn tag="recorded instantly" />
          <DiagNode
            icon={<Zap size={28} color={C.green} />}
            title="Skypond Platform"
            sub="Updates perpetual balance & checks against tolerance"
            special={true}
          />
          <DiagConn tag="alerts if discrepancy" />
          <DiagNode
            icon={<ClipboardList size={28} color={C.p} />}
            title="Inventory Record"
            sub="Perpetual balance updated · Discrepancies surfaced"
            pills={['Within tolerance', 'Alert triggered', 'Audit log entry']}
          />
        </div>
      </div>
    </div>
  )
}

/* ── Page sections ── */
function Hero() {
  return (
    <ProductHero
      badge="Inventory Management"
      title={(
        <>
          Real-time <span style={{ color: C.p }}>controlled substance</span>
          <br />
          inventory built for LTC volume
        </>
      )}
      description="Track every dispense, receive, return, and waste transaction against a perpetual running balance. Surface discrepancies instantly — before they become compliance events that demand your attention during an inspection."
      stats={[
        { num: 'Real-time', label: 'Perpetual inventory tracking' },
        { num: 'CII–CV', label: 'All schedule coverage' },
        { num: '100%', label: 'Transaction auditability' },
        { num: 'Auto', label: 'Discrepancy detection' },
      ]}
      after={<DiagramStrip />}
    />
  )
}

function Features() {
  const features = [
    {
      title: 'Perpetual inventory — live balance on every controlled substance',
      desc: 'Every transaction — receive, dispense, return, waste, transfer — is recorded against a live running balance. No end-of-day batch processing. The count is always current, always accurate.',
      checks: [
        'All transaction types tracked against perpetual balance',
        'Live balance visible by drug, schedule, and storage location',
        'Every entry attributed to an authenticated staff member',
        'Zero tolerance for unlogged transactions',
      ],
      mockup: <MockupPerpetualBalance />,
      reverse: false,
    },
    {
      title: 'Witnessed waste logging — dual-signature, DEA-ready',
      desc: 'Capture witnessed waste events with dual-signature requirements built into the workflow. The system enforces that a second witness confirms before the record is closed — no workarounds.',
      desc2: 'Destruction records include all DEA-required documentation for Schedule II drugs, ready for any inspection.',
      checks: [
        'Two-witness confirmation required by workflow',
        'Reason, drug, quantity, and date captured automatically',
        'Perpetual balance updated immediately on completion',
        'DEA destruction documentation generated on every waste event',
      ],
      mockup: <MockupWasteLog />,
      reverse: true,
    },
    {
      title: 'Biennial inventory export — one click, DEA-formatted',
      desc: 'Generate a DEA-formatted biennial inventory report covering every controlled substance on hand on the required inventory date. What used to take hours of manual counting and spreadsheet work now takes one click.',
      checks: [
        'All Schedule II–V drugs included automatically',
        'DEA-compliant format ready for submission or inspection',
        'Covers all storage locations in one report',
        'Full reconciliation against perpetual records built in',
      ],
      mockup: <MockupBiennialInventory />,
      reverse: false,
    },
  ]

  return (
    <section id="features" style={{ padding: '88px 5vw', background: C.surface }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 52 }}>
          <div style={{ marginBottom: 14 }}><Badge c={C.p}>Capabilities</Badge></div>
          <H size="h2" style={{ marginBottom: 12 }}>Every transaction tracked. Every discrepancy surfaced.</H>
          <P style={{ maxWidth: 580 }}>Built for the dispense volume and regulatory scrutiny of LTC pharmacy — not a general inventory system adapted for controlled substances.</P>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 72 }}>
          {features.map((f: any, i: any) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', direction: f.reverse ? 'rtl' : 'ltr' }}>
              <div style={{ direction: 'ltr' }}>
                <h3 style={{ fontFamily: "'Akshar', sans-serif", fontSize: 26, fontWeight: 800, color: C.head, marginBottom: 12, lineHeight: 1.2 }}>{f.title}</h3>
                <P style={{ marginBottom: f.desc2 ? 12 : 16 }}>{f.desc}</P>
                {f.desc2 && <P style={{ marginBottom: 16 }}>{f.desc2}</P>}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {f.checks.map((c: any, j: any) => <CheckItem key={j}>{c}</CheckItem>)}
                </div>
              </div>
              <div style={{ direction: 'ltr' }}>{f.mockup}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { n: '01', icon: <ClipboardList size={26} color={C.green} />, bg: `${C.green}18`, title: 'Configure formulary & locations', desc: 'Set up your CS formulary and storage locations. Initialize inventory from your opening count or a data import.' },
    { n: '02', icon: <PenLine size={26} color={C.p} />, bg: `${C.p}18`, title: 'Record transactions as they happen', desc: 'Technicians log receives, dispenses, returns, and waste in real time via the interface or integrated dispensing system.' },
    { n: '03', icon: <AlertTriangle size={26} color={C.amber} />, bg: `${C.amber}18`, title: 'Discrepancies surface automatically', desc: 'The system continuously compares recorded transactions against counts. Any deviation outside tolerance triggers an immediate alert.' },
    { n: '04', icon: <CheckSquare size={26} color={C.green} />, bg: `${C.green}18`, title: 'Resolve and document', desc: 'Staff investigate and document resolutions. The full chain — what happened, who reviewed it, what action was taken — is stored permanently.' },
  ]
  return (
    <section id="how" style={{ padding: '88px 5vw', background: C.bg }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ marginBottom: 14 }}><Badge c={C.p}>How It Works</Badge></div>
          <H size="h2" style={{ marginBottom: 14 }}>From opening count to always-current inventory</H>
          <P style={{ maxWidth: 440, margin: '0 auto' }}>Setup is fast. Once live, the system runs continuously with no daily maintenance from your team.</P>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 44, left: '12%', right: '12%', height: 2, zIndex: 0, background: `repeating-linear-gradient(90deg, ${C.border} 0, ${C.border} 6px, transparent 6px, transparent 14px)` }} />
          {steps.map((s: any, i: any) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 16px', position: 'relative', zIndex: 1 }}>
              <div
                style={{ width: 88, height: 88, borderRadius: '50%', background: C.surface, border: `2px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, position: 'relative', transition: 'border-color 0.3s, box-shadow 0.3s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.boxShadow = `0 0 0 6px ${C.green}18` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</div>
                <div style={{ position: 'absolute', top: -6, right: -6, width: 22, height: 22, borderRadius: '50%', background: C.head, color: C.green, fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${C.border}` }}>{s.n}</div>
              </div>
              <h4 style={{ fontSize: 14, fontWeight: 600, color: C.head, marginBottom: 8, fontFamily: "'Akshar', sans-serif" }}>{s.title}</h4>
              <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontWeight: 300, fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function UseCases() {
  const cases = [
    {
      icon: <BarChart3 size={30} color={C.green} />, iconBg: `${C.green}18`,
      title: 'High-volume LTC dispensing',
      desc: 'Manage perpetual inventory across hundreds of CS SKUs and thousands of daily transactions without a clipboard or spreadsheet in sight. Discrepancies surface before the shift ends.',
      result: 'Real-time accuracy at any dispense volume',
    },
    {
      icon: <Building2 size={30} color="#7eb8f7" />, iconBg: 'rgba(59,130,246,0.12)',
      title: 'Facility-based satellite locations',
      desc: 'Track controlled substance inventory at facility storage locations separately from the central pharmacy — with full visibility from one dashboard without driving to each site.',
      result: 'Central visibility across every storage location',
    },
    {
      icon: <UserCog size={30} color="#f5c96a" />, iconBg: 'rgba(245,158,11,0.12)',
      title: 'Pharmacist-in-charge oversight',
      desc: 'Get a real-time snapshot of every controlled substance count, every open discrepancy, and every pending resolution across your operation — without leaving your workstation.',
      result: 'Full PIC oversight from a single dashboard',
    },
    {
      icon: <LayoutGrid size={30} color="#c79cf7" />, iconBg: 'rgba(168,85,247,0.12)',
      title: 'DEA inspection readiness',
      desc: 'Pull a complete transaction history for any drug and any time period — with full chain-of-custody documentation, waste logs, and discrepancy resolutions — in minutes, not hours.',
      result: 'Inspection-ready documentation at any time',
    },
  ]
  return (
    <section style={{ padding: '96px 5vw 100px', background: C.alt }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 52 }}>
          <div style={{ marginBottom: 14 }}><Badge c={C.green}>Who It's For</Badge></div>
          <H size="h2" style={{ marginBottom: 12 }}>Where CS inventory management makes the difference</H>
          <P style={{ color: C.muted, maxWidth: 580 }}>
            The regulatory stakes in LTC controlled substance management are high — and these are the scenarios where the system earns its keep.
          </P>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {cases.map((c: any, i: any) => (
            <div key={i}
              style={{
                background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 18, padding: 32,
                display: 'grid', gridTemplateColumns: '64px 1fr', gap: 20, alignItems: 'start',
                transition: 'border-color 0.25s, box-shadow 0.25s', cursor: 'default',
                boxShadow: '0 2px 12px rgba(20,49,86,0.06)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = C.p2
                e.currentTarget.style.boxShadow = '0 10px 32px rgba(20,49,86,0.12)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = C.border
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(20,49,86,0.06)'
              }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: c.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.icon}</div>
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: C.head, marginBottom: 8, lineHeight: 1.3, fontFamily: "'Akshar', sans-serif" }}>{c.title}</h4>
                <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.65, fontWeight: 400, fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif" }}>{c.desc}</p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 14, fontSize: 12, fontWeight: 600, color: C.p }}>→ {c.result}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Compliance() {
  const items = [
    { title: 'DEA 21 CFR 1304 Compliant', sub: 'Full compliance with CS recordkeeping requirements' },
    { title: 'Biennial Inventory Support', sub: 'One-click DEA-formatted biennial inventory report' },
    { title: 'Dual-Witness Waste Logging', sub: 'Enforced workflow — no workarounds' },
    { title: 'Schedule II–V Coverage', sub: 'All controlled substance schedules tracked' },
    { title: 'Immutable Audit Trail', sub: 'No records can be deleted or altered' },
    { title: 'HIPAA Compliant', sub: 'Patient and dispensing data handled securely' },
  ]
  return (
    <section style={{ padding: '0 5vw 88px', background: C.dark }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 64 }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ marginBottom: 14 }}><Badge c={C.green}>Security &amp; Compliance</Badge></div>
          <H size="h2" color="#ffffff" style={{ marginBottom: 12 }}>Inspection-ready documentation, always</H>
          <P style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 580 }}>
            Every transaction, every count, every discrepancy resolution is permanently logged with user attribution and timestamp. Your CS records are always audit-ready.
          </P>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
          {items.map((it: any, i: any) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: C.green, flexShrink: 0 }} />
              <div>
                <strong style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{it.title}</strong>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{it.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Related() {
  const items = [
    { icon: <FileText size={20} color={C.p} />, title: 'DEA Compliance Reporting', href: '/products/dea-compliance-reporting', desc: 'Automate ARCOS, CSOS, and Form 222 submissions with validated inventory data.' },
    { icon: <Search size={20} color={C.p} />, title: 'DEA Lookup Tool', href: '/products/dea-lookup', desc: 'Verify prescriber DEA registrations before filling controlled substances.' },
    { icon: <Zap size={20} color={C.p} />, title: 'Document Automation', href: '/products/document-automation', desc: 'Auto-generate inventory reports, destruction records, and compliance letters.' },
  ]
  return (
    <section style={{ padding: '80px 5vw', background: C.surface }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <H size="h3" style={{ marginBottom: 32, fontSize: 20 }}>Related Products</H>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
          {items.map((it: any, i: any) => (
            <Card key={i} ac={C.p}>
              <a href={it.href} style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '24px 22px', textDecoration: 'none' }}>
                <div>{it.icon}</div>
                <div style={{ color: C.head, fontWeight: 700, fontSize: 14, fontFamily: "'Akshar', sans-serif" }}>{it.title}</div>
                <div style={{ color: C.body, fontSize: 13, lineHeight: 1.55, flex: 1, fontWeight: 300 }}>{it.desc}</div>
                <div style={{ color: C.p, fontSize: 12, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  Learn more <ChevronRight size={12} />
                </div>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section style={{ padding: '80px 5vw', background: C.bg, borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
        <div>
          <H size="h2" style={{ marginBottom: 12 }}>See CS Inventory in action</H>
          <P style={{ color: C.muted, maxWidth: 520 }}>
            Watch a live walkthrough of the perpetual tracking and discrepancy workflow with a team that knows LTC pharmacy.
          </P>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
          <Button variant="primary" size="md" to="/schedule-demo">Schedule a Demo →</Button>
          <Button variant="secondary" size="md" to="/schedule-demo">Talk to Sales</Button>
        </div>
      </div>
    </section>
  )
}

/* ─── Page export ─────────────────────────────────────────────────────────── */
export function CsInventoryContent() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'CS Inventory' }]} />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <UseCases />
        <Compliance />
        <Related />
        <CTA />
      </main>
    </>
  )
}