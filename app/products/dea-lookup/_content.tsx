'use client'

import { useState } from 'react'
import {
  Search, Zap, ClipboardList, FolderOpen, Bell,
  User, UserPlus, ClipboardCheck, ShieldCheck,
  FileText, Package, CheckCircle, ChevronRight,
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

/* ── Diagram strip inside Hero ── */
function DiagNode({ icon, title, sub, pills, special }: { [key: string]: any }) {
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
        }}>How a lookup works</div>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 200px 1fr 200px', alignItems: 'center' }}>
          <DiagNode
            icon={<User size={28} color={C.p} />}
            title="Pharmacy Staff"
            sub="Enters DEA number or uploads CSV"
            pills={['Single lookup', 'Bulk CSV upload']}
            special={false}
          />
          <DiagConn tag="submits query" />
          <DiagNode
            icon={<Zap size={28} color={C.green} />}
            title="Skypond Platform"
            sub="Queries DEA federal database live — no cache"
            pills={[]}
            special={true}
          />
          <DiagConn tag="returns in <1s" />
          <DiagNode
            icon={<ClipboardList size={28} color={C.p} />}
            title="Verified Result"
            sub="Name, schedules, expiry — logged to audit trail"
            pills={['✓ Valid', '⚠ Expiring', '✗ Invalid']}
            special={false}
          />
        </div>
      </div>
    </div>
  )
}

/* ── Feature mockups ── */
function MockupLiveResult() {
  const muted = 'rgba(255,255,255,0.45)'
  const bright = 'rgba(255,255,255,0.85)'
  return (
    <Mockup title="DEA Lookup — Verification Result">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: bright, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Registrant Record
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, fontSize: 11,
          background: `${C.green}25`, color: C.green, borderRadius: 6, padding: '4px 10px', fontWeight: 600,
        }}>✓ Valid Registration</div>
      </div>
      <div style={{
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12, padding: 16, marginBottom: 12,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            ['Registrant Name', 'Dr. Patricia Reeves, MD', bright],
            ['DEA Number', 'BR4921047', bright],
            ['Business Activity', 'Practitioner', bright],
            ['Expiration Date', '03/31/2026', '#f5c96a'],
          ].map(([label, val, c]) => (
            <div key={label}>
              <div style={{ fontSize: 10, color: muted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 13, color: c, fontWeight: 500 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: muted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
          Authorized Schedules
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['Schedule II', 'Schedule III', 'Schedule IV', 'Schedule V'].map((s: any) => (
            <span key={s} style={{
              background: `${C.green}25`, color: C.green, border: `1px solid ${C.green}40`,
              borderRadius: 6, padding: '4px 10px', fontSize: 11, fontWeight: 600,
            }}>{s}</span>
          ))}
        </div>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: muted,
        background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 12px',
      }}>
        <Bell size={13} color={muted} />
        <span>Verified <strong style={{ color: bright }}>just now</strong> by{' '}
          <strong style={{ color: bright }}>J. Williams, CPhT</strong> · Saved to audit log</span>
      </div>
    </Mockup>
  )
}

function MockupBulkResult() {
  const muted = 'rgba(255,255,255,0.45)'
  const bright = 'rgba(255,255,255,0.85)'
  const summary = [
    { n: 43, label: 'Valid', color: C.green, bg: `${C.green}18` },
    { n: 3, label: 'Expiring Soon', color: '#f5c96a', bg: 'rgba(245,158,11,0.15)' },
    { n: 1, label: 'Action Required', color: '#f87171', bg: 'rgba(239,68,68,0.15)' },
  ]
  const rows = [
    { text: '⚠ Expired — Action Required', sub: 'Dr. M. Torres · BT1920384 · Expired 01/2025', color: '#f87171', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)', tag: 'Review', tagBg: 'rgba(239,68,68,0.15)' },
    { text: '⏰ Expiring in 60 days', sub: 'Dr. A. Patel · AP3847291 · Exp 06/2026', color: '#f5c96a', bg: 'rgba(245,158,11,0.07)', border: 'rgba(245,158,11,0.2)', tag: 'Alert', tagBg: 'rgba(245,158,11,0.12)' },
    { text: '✓ 43 registrants verified valid', sub: 'All saved to audit log with timestamp', color: C.green, bg: `${C.green}0A`, border: `${C.green}25`, tag: 'Export CSV', tagBg: `${C.green}18` },
  ]
  return (
    <Mockup title="Bulk Lookup — Upload Results">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: bright, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          prescribers_q2.csv · 47 records
        </div>
        <div style={{ fontSize: 11, color: muted }}>Complete</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
        {summary.map(({ n, label, color, bg }) => (
          <div key={label} style={{ background: bg, border: `1px solid ${color}40`, borderRadius: 10, padding: 14, textAlign: 'center' }}>
            <div style={{ fontFamily: "'Akshar', sans-serif", fontSize: 26, fontWeight: 900, color }}>{n}</div>
            <div style={{ fontSize: 11, color: muted }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {rows.map((r: any, i: any) => (
          <div key={i} style={{
            background: r.bg, border: `1px solid ${r.border}`, borderRadius: 8,
            padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: 12, color: r.color, fontWeight: 600 }}>{r.text}</div>
              <div style={{ fontSize: 11, color: muted }}>{r.sub}</div>
            </div>
            <div style={{ fontSize: 10, background: r.tagBg, color: r.color, padding: '3px 8px', borderRadius: 6, fontWeight: 600 }}>
              {r.tag}
            </div>
          </div>
        ))}
      </div>
    </Mockup>
  )
}

function MockupExpirationMonitor() {
  const muted = 'rgba(255,255,255,0.45)'
  const upcoming = [
    { label: 'Expires in 14 days', sub: 'Dr. K. Nguyen · KN2910483', color: '#f87171', bg: 'rgba(239,68,68,0.08)', border: '#f87171' },
    { label: 'Expires in 32 days', sub: 'Dr. R. Singh · RS1847362', color: '#f5c96a', bg: 'rgba(245,158,11,0.08)', border: '#f5c96a' },
    { label: 'Expires in 58 days', sub: 'Dr. L. Chen · LC9283710', color: '#f5c96a', bg: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.4)' },
  ]
  return (
    <Mockup title="Expiration Monitor — Active Prescribers">
      <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
        Upcoming Expirations
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {upcoming.map((u: any, i: any) => (
          <div key={i} style={{ background: u.bg, borderLeft: `3px solid ${u.border}`, borderRadius: '0 8px 8px 0', padding: '10px 14px' }}>
            <div style={{ fontSize: 12, color: u.color, fontWeight: 600 }}>{u.label}</div>
            <div style={{ fontSize: 11, color: muted }}>{u.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ background: `${C.green}12`, border: `1px solid ${C.green}33`, borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Bell size={16} color={C.green} />
        <div>
          <div style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>Automatic alerts enabled</div>
          <div style={{ fontSize: 11, color: muted }}>Notify at 90, 60, 30, and 14 days before expiry</div>
        </div>
      </div>
    </Mockup>
  )
}

/* ── Page sections ── */
function Hero() {
  return (
    <ProductHero
      badge="Compliance Tool"
      title={(
        <>
          Instant <span style={{ color: C.p }}>DEA registrant</span>
          <br />
          verification, every time
        </>
      )}
      description="Validate prescriber DEA numbers against live federal databases in under a second. Stop relying on outdated printouts or manual phone calls — get a definitive answer before every controlled substance fill."
      stats={[
        { num: '<1s', label: 'Average lookup response time' },
        { num: '100%', label: 'Federal database accuracy' },
        { num: '10K+', label: 'Monthly lookups processed' },
        { num: 'HIPAA', label: 'Compliant by design' },
      ]}
      after={<DiagramStrip />}
    />
  )
}

function Features() {
  const features = [
    {
      title: 'Live DEA validation — results in under a second',
      desc: 'Query the DEA registrant database live on every lookup — no cached records, no stale data. Every result reflects the current federal record at the moment you check.',
      checks: [
        'Real-time federal database query, not cached data',
        'Registrant name, address, schedules, and expiry returned',
        'Instant flag on expired, invalid, or inactive registrations',
        'Results saved automatically to timestamped audit log',
      ],
      mockup: <MockupLiveResult />,
      reverse: false,
    },
    {
      title: 'Bulk validation — run your entire prescriber list at once',
      desc: 'Upload a CSV of DEA numbers from your pharmacy system and validate hundreds of prescribers in a single pass. Results come back with a clear status on every record — valid, expiring soon, or requiring action.',
      desc2: 'Ideal for quarterly compliance audits, new facility onboarding, or any time you need to clear a large prescriber list without running individual lookups.',
      checks: [
        'CSV upload — no reformatting required',
        'Clear valid / expiring / expired status per record',
        'Downloadable results for compliance documentation',
        'Runs in seconds regardless of list size',
      ],
      mockup: <MockupBulkResult />,
      reverse: true,
    },
    {
      title: 'Expiration monitoring — catch issues before they cause violations',
      desc: 'Set up automatic alerts for prescribers whose DEA registrations are approaching expiration. Catch the issue 90, 60, or 30 days out — not the day a controlled substance order comes in.',
      checks: [
        'Configurable alert thresholds per prescriber',
        'Alerts to pharmacist-in-charge and compliance staff',
        'Full prescriber expiration calendar view',
        'Never caught off guard by an expired registration again',
      ],
      mockup: <MockupExpirationMonitor />,
      reverse: false,
    },
  ]

  return (
    <section id="features" style={{ padding: '88px 5vw', background: C.surface }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 52 }}>
          <div style={{ marginBottom: 14 }}><Badge c={C.p}>Capabilities</Badge></div>
          <H size="h2" style={{ marginBottom: 12 }}>Verification that keeps pace with your dispense volume</H>
          <P style={{ maxWidth: 580 }}>Built for the speed and scale of LTC pharmacy — not a once-a-day manual lookup process.</P>
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
    { n: '01', icon: <Search size={26} color={C.green} />, bg: `${C.green}18`, title: 'Enter or upload', desc: 'Paste a single DEA number or upload a CSV export from your pharmacy system. No reformatting required.' },
    { n: '02', icon: <Zap size={26} color={C.p} />, bg: `${C.p}18`, title: 'Live query executes', desc: 'Skypond queries the DEA registrant database in real time and retrieves the current registrant record instantly.' },
    { n: '03', icon: <ClipboardList size={26} color={C.amber} />, bg: `${C.amber}18`, title: 'Review results', desc: 'Name, business activity, authorized schedules, expiration date, and status — valid, expiring, or flagged — returned clearly.' },
    { n: '04', icon: <FolderOpen size={26} color={C.green} />, bg: `${C.green}18`, title: 'Logged automatically', desc: 'Every lookup is timestamped, attributed to the staff member who ran it, and saved to the audit log without any extra steps.' },
  ]
  return (
    <section id="how" style={{ padding: '88px 5vw', background: C.bg }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ marginBottom: 14 }}><Badge c={C.p}>How It Works</Badge></div>
          <H size="h2" style={{ marginBottom: 14 }}>Simple to use. Impossible to get wrong.</H>
          <P style={{ maxWidth: 440, margin: '0 auto' }}>Designed for pharmacists and technicians — not IT staff. Up and running in minutes.</P>
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
    { icon: <CheckCircle size={30} color={C.green} />, iconBg: `${C.green}18`, title: 'Pre-dispense verification at the point of fill', desc: 'Build DEA lookup into your CII dispense workflow so technicians confirm prescriber authorization before every controlled substance fill — not after a compliance question arises.', result: 'Verification at the point of dispensing' },
    { icon: <UserPlus size={30} color="#7eb8f7" />, iconBg: 'rgba(59,130,246,0.12)', title: 'New prescriber onboarding', desc: 'When a facility sends over a new attending physician or NP, verify their DEA number instantly — before their first controlled substance order reaches your queue.', result: 'Zero delay on new prescriber activation' },
    { icon: <ClipboardCheck size={30} color="#f5c96a" />, iconBg: 'rgba(245,158,11,0.12)', title: 'Periodic compliance audits', desc: 'Run your entire active prescriber list through bulk lookup monthly to surface any expired or revoked registrations before they create a dispensing violation or inspection issue.', result: 'Proactive compliance, not reactive cleanup' },
    { icon: <ShieldCheck size={30} color="#c79cf7" />, iconBg: 'rgba(168,85,247,0.12)', title: 'DEA inspection preparation', desc: 'Pull a complete verification history for any prescriber or time period to demonstrate due-diligence practices. Every lookup logged with user, timestamp, and result — ready in minutes.', result: 'Inspection-ready documentation always on hand' },
  ]
  return (
    <section style={{ padding: '96px 5vw 100px', background: C.alt }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 52 }}>
          <div style={{ marginBottom: 14 }}><Badge c={C.green}>Who It's For</Badge></div>
          <H size="h2" style={{ marginBottom: 12 }}>Real scenarios where DEA verification matters</H>
          <P style={{ color: C.muted, maxWidth: 540 }}>From daily dispense workflows to quarterly audits — verification needs come up constantly in LTC pharmacy.</P>
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
    { title: 'HIPAA Compliant', sub: 'PHI handled under full HIPAA requirements' },
    { title: 'DEA Database Direct', sub: 'Live federal database, not a third-party copy' },
    { title: 'SOC 2 Type II', sub: 'Independently audited security controls' },
    { title: 'Role-Based Access', sub: 'Control who can run lookups and see results' },
    { title: 'Encrypted Audit Logs', sub: 'Every lookup stored securely with full attribution' },
    { title: 'No PHI Stored', sub: 'Lookup results are logged, not retained as PHI' },
  ]
  return (
    <section style={{ padding: '0 5vw 88px', background: C.dark }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 64 }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ marginBottom: 14 }}><Badge c={C.green}>Security &amp; Compliance</Badge></div>
          <H size="h2" color="#ffffff" style={{ marginBottom: 12 }}>Secure. Auditable. HIPAA-compliant.</H>
          <P style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 580 }}>Every lookup is encrypted in transit and at rest. Access is role-controlled, every action is logged, and no PHI leaves your environment.</P>
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
    { icon: <FileText size={20} color={C.p} />, title: 'DEA Compliance Reporting', href: '/products/dea-compliance-reporting', desc: 'Automate CSOS, ARCOS, and Form 222 filing workflows.' },
    { icon: <Package size={20} color={C.p} />, title: 'CS Inventory', href: '/products/cs-inventory', desc: 'Real-time controlled substance inventory management.' },
    { icon: <Zap size={20} color={C.p} />, title: 'Document Automation', href: '/products/document-automation', desc: 'Auto-generate and route compliance documentation.' },
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
          <H size="h2" style={{ marginBottom: 12 }}>See DEA Lookup in action</H>
          <P style={{ color: C.muted, maxWidth: 520 }}>
            Walk through a live demo with someone who has built compliance tools inside real LTC operations.
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
export function DeaLookupContent() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'DEA Lookup Tool' }]} />
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