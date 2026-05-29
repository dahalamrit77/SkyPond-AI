'use client'

import { useState } from 'react'
import {
  Zap, Bell, CheckCircle, FileText, Plug, Send,
  Archive, Search, PenLine, ClipboardList, Handshake,
  UserCheck, ShieldAlert, BarChart2, ChevronRight,
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
      border: '1px solid rgba(255,255,255,0.10)', overflow: 'hidden',
      boxShadow: '0 24px 56px rgba(0,0,0,0.22)',
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

/* ── Diagram strip ── */
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
        }}>How a document goes from trigger to archive</div>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 200px 1fr 200px', alignItems: 'center' }}>
          <DiagNode
            icon={<Bell size={28} color={C.p} />}
            title="Trigger Event"
            sub="Staff action, system event, or scheduled workflow"
            pills={['New admission', 'PA request due', 'Facility onboarding']}
          />
          <DiagConn tag="generates instantly" />
          <DiagNode
            icon={<Zap size={28} color={C.green} />}
            title="Skypond Platform"
            sub="Populates template from pharmacy data sources"
            special
          />
          <DiagConn tag="routes for signature" />
          <DiagNode
            icon={<CheckCircle size={28} color={C.p} />}
            title="Signed & Archived"
            sub="HIPAA-compliant storage with full audit trail"
            pills={['e-Signed', 'Archived', 'Searchable']}
          />
        </div>
      </div>
    </div>
  )
}

/* ── Feature mockups ── */
function MockupPriorAuth() {
  const muted = 'rgba(255,255,255,0.45)'
  const bright = 'rgba(255,255,255,0.85)'
  const fields = [
    ['Patient', 'R. Martinez'],
    ['Facility', 'Sunrise SNF'],
    ['Medication', 'Apixaban 5mg BID'],
    ['Payer', 'UnitedHealthcare MC'],
  ]
  const checks = [
    'Clinical notes pulled from patient record',
    'Prescriber DEA verified and included',
    'Payer-specific PA form selected automatically',
  ]
  return (
    <Mockup title="Prior Auth Generator — Ready in Seconds">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: bright, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Prior Authorization Request
        </div>
        <div style={{ fontSize: 11, background: `${C.green}20`, color: C.green, borderRadius: 6, padding: '4px 10px', fontWeight: 600 }}>
          Auto-populated
        </div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16, marginBottom: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {fields.map(([label, val]) => (
            <div key={label}>
              <div style={{ fontSize: 10, color: muted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 13, color: bright, fontWeight: 500 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
        {checks.map((c: any) => (
          <div key={c} style={{ background: `${C.green}0A`, border: `1px solid ${C.green}2E`, borderRadius: 8, padding: '8px 14px', fontSize: 12, color: C.green }}>
            ✓ {c}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, background: `${C.green}20`, border: `1px solid ${C.green}45`, borderRadius: 8, padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 12, color: C.green, fontWeight: 600, cursor: 'pointer' }}>
          <Send size={12} /> Send to Prescriber
        </div>
        <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: muted, cursor: 'pointer' }}>
          Preview
        </div>
      </div>
    </Mockup>
  )
}

function MockupEsign() {
  const muted = 'rgba(255,255,255,0.45)'
  const steps = [
    { icon: '✓', color: C.green, bg: `${C.green}33`, border: C.green, label: 'Generated from template',         sub: 'Apr 24, 2026 · 09:14 AM' },
    { icon: '✓', color: C.green, bg: `${C.green}33`, border: C.green, label: 'Pharmacist signed',               sub: 'S. Patel, RPh · Apr 24 · 09:31 AM' },
    { icon: '…', color: C.amber, bg: `${C.amber}25`, border: C.amber, label: 'Awaiting facility administrator', sub: 'Sent to J. Hoffman · Reminder due Apr 26' },
    { icon: '·', color: muted,   bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.15)', label: 'Archive to document management', sub: 'Pending completion' },
  ]
  return (
    <Mockup title="e-Signature Routing — In Progress">
      <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
        Facility Service Agreement · Maplewood Care
      </div>
      <div style={{ position: 'relative', marginBottom: 14 }}>
        <div style={{ position: 'absolute', left: 17, top: 28, bottom: 28, width: 2, background: 'rgba(255,255,255,0.08)', zIndex: 0 }} />
        {steps.map((s: any, i: any) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', position: 'relative', zIndex: 1 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: s.bg, border: `2px solid ${s.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0, color: s.color, fontWeight: 700 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: 12, color: s.color, fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: muted }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </Mockup>
  )
}

function MockupArchive() {
  const muted = 'rgba(255,255,255,0.45)'
  const bright = 'rgba(255,255,255,0.85)'
  const docs = [
    { icon: <FileText size={18} color={muted} />, title: 'Prior Auth — Apixaban · R. Martinez', sub: 'Sunrise SNF · Apr 24, 2026',                 tag: 'Sent',     tagC: C.green, tagBg: `${C.green}20` },
    { icon: <Handshake size={18} color={muted} />, title: 'Service Agreement · Maplewood Care',  sub: 'Pending facility signature · Apr 24, 2026', tag: 'Pending',  tagC: C.amber, tagBg: `${C.amber}20` },
    { icon: <ClipboardList size={18} color={muted} />, title: 'HIPAA Consent · T. Johnson',      sub: 'Valley View SNF · Apr 23, 2026',             tag: 'Archived', tagC: C.green, tagBg: `${C.green}20` },
  ]
  return (
    <Mockup title="Document Archive — Smart Search">
      <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <Search size={14} color={muted} />
        <span style={{ fontSize: 13, color: muted }}>Search documents · facility, patient, or type...</span>
      </div>
      <div style={{ fontSize: 11, color: muted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Recent Documents</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {docs.map((d: any, i: any) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '11px 14px', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 12, alignItems: 'center' }}>
            <div>{d.icon}</div>
            <div>
              <div style={{ fontSize: 12, color: bright, fontWeight: 500 }}>{d.title}</div>
              <div style={{ fontSize: 11, color: muted }}>{d.sub}</div>
            </div>
            <div style={{ fontSize: 10, background: d.tagBg, color: d.tagC, padding: '3px 8px', borderRadius: 6, fontWeight: 600, whiteSpace: 'nowrap' }}>{d.tag}</div>
          </div>
        ))}
      </div>
    </Mockup>
  )
}

/* ── Page sections ── */
function Hero() {
  return (
    <ProductHero
      badge="Document Automation"
      title={(
        <>
          Generate, route, and archive
          <br />
          <span style={{ color: C.p }}>pharmacy documents</span>
          {' '}at scale
        </>
      )}
      description="LTC pharmacy operations run on paperwork. Prior auth letters, facility service agreements, patient consent forms, compliance notices — Document Automation replaces manual assembly with template-driven generation, e-signature routing, and HIPAA-compliant archiving."
      stats={[
        { num: '90%', label: 'Reduction in doc assembly time' },
        { num: 'e-Sign', label: 'Integrated workflow routing' },
        { num: 'HIPAA', label: 'Compliant archiving' },
        { num: 'Full', label: 'Audit trail on every document' },
      ]}
      after={<DiagramStrip />}
    />
  )
}

function Features() {
  const features = [
    {
      title: 'Template-driven generation — documents in seconds, not hours',
      desc: 'Build once, generate forever. Templates pull patient name, medication, prescriber, facility, and payer details from your pharmacy system automatically — no copy-paste, no manual entry, no risk of populating the wrong record.',
      checks: [
        'Auto-populates from live pharmacy system data',
        'Payer-specific PA form selection built in',
        'Clinical notes and prescriber info pulled automatically',
        'Consistent formatting across every document, every time',
      ],
      mockup: <MockupPriorAuth />,
      reverse: false,
    },
    {
      title: 'e-Signature routing — multi-step approval without the chasing',
      desc: 'Send documents for signature via configurable multi-step approval chains. Pharmacist signs first, then routes to prescriber or facility administrator automatically. Reminder emails go out before deadlines — without anyone tracking it manually.',
      checks: [
        'Multi-step signature chains configured per document type',
        'Automatic reminder delivery at configurable intervals',
        'Real-time status tracking on every document in flight',
        'Facility administrator signatures collected without facility login',
      ],
      mockup: <MockupEsign />,
      reverse: true,
    },
    {
      title: 'HIPAA-compliant archive with full-text search',
      desc: 'Every completed document is stored in encrypted, access-controlled cloud storage with configurable retention policies. No documents living in email attachments, shared drives, or filing cabinets.',
      desc2: 'Find any document in seconds using full-text search filtered by facility, patient, document type, date range, or signature status.',
      checks: [
        'Encrypted HIPAA-compliant document storage',
        'Full-text search across the entire archive',
        'Filter by facility, patient, type, or status',
        'Configurable retention policies per document type',
      ],
      mockup: <MockupArchive />,
      reverse: false,
    },
  ]
  return (
    <section id="features" style={{ padding: '88px 5vw', background: C.surface }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 52 }}>
          <div style={{ marginBottom: 14 }}><Badge c={C.p}>Capabilities</Badge></div>
          <H size="h2" style={{ marginBottom: 12 }}>From template to signed archive — without manual assembly</H>
          <P style={{ maxWidth: 580 }}>Built for the document volume that LTC pharmacy operations actually generate — not a general-purpose document tool adapted for healthcare.</P>
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
    { n: '01', icon: <FileText size={26} color={C.green} />,  bg: `${C.green}18`, title: 'Build template library',      desc: 'Work with our team to build templates for your most common document types — PA letters, facility agreements, consent forms, compliance notices.' },
    { n: '02', icon: <Plug size={26} color={C.p} />,          bg: `${C.p}18`,     title: 'Connect data sources',         desc: 'Templates link to your pharmacy system so patient, medication, prescriber, and facility fields populate automatically from existing records.' },
    { n: '03', icon: <Zap size={26} color={C.amber} />,       bg: `${C.amber}18`, title: 'Trigger and generate',         desc: 'A technician or pharmacist triggers a document from the relevant workflow. The populated document is ready for review in seconds.' },
    { n: '04', icon: <CheckCircle size={26} color={C.green} />, bg: `${C.green}18`, title: 'Route, sign, archive',       desc: 'The document routes through your configured approval workflow. Once fully signed, it is automatically archived with a complete audit trail.' },
  ]
  return (
    <section id="how" style={{ padding: '88px 5vw', background: C.bg }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ marginBottom: 14 }}><Badge c={C.p}>How It Works</Badge></div>
          <H size="h2" style={{ marginBottom: 14 }}>From template to signed archive — automatically</H>
          <P style={{ maxWidth: 440, margin: '0 auto' }}>Most document types are live within a week of kick-off. Your team sees the time savings from the first document generated.</P>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', position: 'relative' }}>
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
    { icon: <ClipboardList size={30} color={C.green} />,   iconBg: `${C.green}18`,         title: 'Prior authorization letters',         desc: 'Generate prior auth requests with complete clinical and prescription data pre-populated. Send directly to payers without manual transcription — and track status without hunting through email.',                                       result: 'PA letters in seconds, not 20 minutes' },
    { icon: <Handshake size={30} color="#7eb8f7" />,       iconBg: 'rgba(59,130,246,0.12)', title: 'Facility service agreements',          desc: 'Auto-generate and route new facility service agreements for pharmacist review and facility administrator e-signature when onboarding new accounts — no back-and-forth email required.',                                         result: 'Onboarding paperwork in hours, not days' },
    { icon: <UserCheck size={30} color="#f5c96a" />,       iconBg: 'rgba(245,158,11,0.12)', title: 'Patient consent and admission forms',  desc: 'Generate HIPAA-compliant consent forms for new admissions pre-populated with patient and facility data. Route to facility for collection and archive automatically — no paper forms to track down.',                                     result: 'Admission paperwork handled without paper' },
    { icon: <ShieldAlert size={30} color="#c79cf7" />,     iconBg: 'rgba(168,85,247,0.12)', title: 'DEA and compliance communications',   desc: 'Auto-generate prescriber notifications for expired DEA registrations, refill limit notices, and controlled substance compliance communications — without drafting from scratch each time.',                                  result: 'Compliance notices out in one click' },
  ]
  return (
    <section style={{ padding: '96px 5vw 100px', background: C.alt }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 52 }}>
          <div style={{ marginBottom: 14 }}><Badge c={C.green}>Who It's For</Badge></div>
          <H size="h2" style={{ marginBottom: 12 }}>The document workflows that drain time most in LTC pharmacy</H>
          <P style={{ color: C.muted, maxWidth: 580 }}>These are the scenarios where manual document handling causes the most friction — and where automation pays off fastest.</P>
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
    { title: 'HIPAA Compliant',             sub: 'PHI handled under full HIPAA requirements throughout' },
    { title: '21 CFR Part 11 e-Signatures', sub: 'Legally valid electronic signatures with full attribution' },
    { title: 'Encrypted Storage',           sub: 'All documents encrypted at rest with AES-256' },
    { title: 'Role-Based Access',           sub: 'Control who can generate, view, and sign each document type' },
    { title: 'Retention Policy Controls',   sub: 'Configurable per document type and jurisdiction' },
    { title: 'Complete Audit Trail',        sub: 'Full history of every view, edit, send, and signature' },
  ]
  return (
    <section style={{ padding: '0 5vw 88px', background: C.dark }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 64 }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ marginBottom: 14 }}><Badge c={C.green}>Security &amp; Compliance</Badge></div>
          <H size="h2" color="#fff" style={{ marginBottom: 12 }}>Every document stored. Every signature verified.</H>
          <P style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 580 }}>Document Automation is built around HIPAA requirements for PHI handling in document workflows — from generation through delivery and archiving.</P>
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
    { icon: <ClipboardList size={20} color={C.p} />, title: 'DEA Compliance Reporting', desc: 'Pair document automation with DEA filing workflows for end-to-end compliance documentation.', href: '/products/dea-compliance-reporting' },
    { icon: <Zap size={20} color={C.p} />,           title: 'PointClickCare Feed',      desc: 'Trigger document generation automatically from PCC admission and discharge events.',          href: '/products/pointclickcare-feed' },
    { icon: <BarChart2 size={20} color={C.p} />,     title: 'LTC Analytics',            desc: 'Track document volume, turnaround times, and completion rates as operational KPIs.',          href: '/products/ltc-analytics' },
  ]
  return (
    <section style={{ padding: '80px 5vw', background: C.surface }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ marginBottom: 14 }}><Badge c={C.p}>Related Products</Badge></div>
          <H size="h2">Works well with</H>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
          {items.map((it: any, i: any) => (
            <Card key={i} ac={C.p}>
              <a href={it.href} style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '24px 22px', textDecoration: 'none' }}>
                <div>{it.icon}</div>
                <div style={{ color: C.head, fontWeight: 700, fontSize: 14, fontFamily: "'Akshar', sans-serif" }}>{it.title}</div>
                <div style={{ color: C.body, fontSize: 13, lineHeight: 1.55, flex: 1, fontWeight: 300 }}>{it.desc}</div>
                <div style={{ color: C.p, fontSize: 12, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>Learn more <ChevronRight size={12} /></div>
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
          <H size="h2" style={{ marginBottom: 12 }}>See Document Automation in action</H>
          <P style={{ color: C.muted, maxWidth: 520, fontWeight: 400 }}>
            Walk through a prior auth generation and e-signature workflow live — from trigger to signed archive in under two minutes.
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
export function DocumentAutomationContent() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Document Automation' }]} />
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