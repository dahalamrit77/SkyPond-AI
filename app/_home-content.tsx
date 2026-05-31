'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Search, ClipboardList, Pill, TrendingUp, Link as LinkIcon, FileText,
  Hospital, Settings, BarChart3, Laptop, Cloud, CheckCircle2, Box,
  Inbox, Activity, Zap, Building2, Users, ArrowRight, Shield,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { sanityClient } from '@/lib/sanity/client'
import { TESTIMONIALS_QUERY } from '@/lib/sanity/queries'
import type { Testimonial } from '@/lib/sanity/queries'
import C from '@/lib/tokens'
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '@/lib/constants'
import Image from 'next/image'

/* ─────────────────────────────────────────────────────────────────────────────
   COLOUR SYSTEM
   Primary:   #143156 (C.p)   — deep navy, foundations, headings, primary CTA
   Secondary: #8AB8E3 (C.p2)  — steel blue, links, accents, secondary CTA
   Green:     #83B762 (C.green) — compliance pass, success, positive metrics
   Amber:     #D9A629 (C.amber) — analytics, data insights, attention
   Orange:    #F79043 (C.red)   — automation speed, energy, urgency
   Violet:    #C6DBE7 (C.violet)— soft backgrounds, alt sections
───────────────────────────────────────────────────────────────────────────── */

/* ─── Scroll-reveal hook ────────────────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ─── Shared primitives ─────────────────────────────────────────────────── */
function SectionLabel({ color = C.p2, children }: { color?: string; children: React.ReactNode }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
      textTransform: 'uppercase', color,
      fontFamily: "'Akshar', sans-serif", marginBottom: 14,
    }}>
      <span style={{ width: 18, height: 2, background: color, display: 'inline-block', borderRadius: 1 }} />
      {children}
      <span style={{ width: 18, height: 2, background: color, display: 'inline-block', borderRadius: 1 }} />
    </div>
  )
}

/* ─── Data ──────────────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    icon: <ClipboardList size={20} />,
    color: C.green,
    tag: 'Compliance',
    title: 'DEA Compliance Reporting',
    desc: 'Automated ARCOS reporting, DEA Form 222 tracking, discrepancy detection, and scheduled archival — replacing hours of manual documentation.',
    metric: '8 hrs saved',
    ml: 'per week',
    href: '/products/dea-compliance-reporting',
  },
  {
    icon: <Pill size={20} />,
    color: C.p,
    tag: 'Inventory',
    title: 'Controlled Substance Inventory',
    desc: 'Real-time CS tracking, discrepancy alerts, per-transaction audit trails, biennial inventory support, and multi-facility management.',
    metric: '99.8%',
    ml: 'inventory accuracy',
    href: '/products/cs-inventory',
  },
  {
    icon: <TrendingUp size={20} />,
    color: C.amber,
    tag: 'Analytics',
    title: 'LTC Analytics Dashboard',
    desc: 'Dispensing trends, facility benchmarking, error rate tracking, census-to-dispensing correlation, and executive-ready report exports.',
    metric: '3×',
    ml: 'faster decisions',
    href: '/products/ltc-analytics',
  },
  {
    icon: <LinkIcon size={20} />,
    color: C.p,
    tag: 'Integration',
    title: 'PointClickCare Data Feed',
    desc: 'Live bidirectional PCC sync — MAR updates, ADT event handling, order reconciliation, and HIPAA-compliant data transmission.',
    metric: 'Zero',
    ml: 'duplicate manual entry',
    href: '/products/pointclickcare-feed',
  },
  {
    icon: <FileText size={20} />,
    color: C.red,
    tag: 'Automation',
    title: 'Document Automation',
    desc: 'AI-powered prior auth generation, compliance document templating, e-signature integration, fax automation, and audit-ready archival.',
    metric: '75% less',
    ml: 'processing time',
    href: '/products/document-automation',
  },
]

const SERVICES = [
  { icon: <Hospital size={22} />, color: C.p2,     title: 'LTC Pharmacy IT',            desc: 'Telepharmacy apps, pharmacy-facility integration, migration, and custom reporting — exclusively for LTC.', href: '/services/ltc-pharmacy-it' },
  { icon: <Settings size={22} />, color: C.red,    title: 'AI Automation',              desc: 'Intelligent workflow automation replacing manual bottlenecks: order entry, prior auth, compliance reporting, and more.', href: '/services/ai-automation' },
  { icon: <BarChart3 size={22} />, color: C.amber,  title: 'Data Analytics & Power BI',  desc: 'Custom Power BI dashboards and automated data pipelines that make your pharmacy data genuinely actionable.', href: '/services/data-analytics' },
  { icon: <Laptop size={22} />, color: C.p2,       title: 'Custom Development',          desc: 'Full-stack applications — React, Node.js, Azure — built around your specific LTC workflows and integrations.', href: '/services/custom-development' },
  { icon: <Cloud size={22} />, color: C.green,     title: 'Microsoft Cloud',             desc: 'Microsoft 365, Azure, and Power Platform properly configured for healthcare compliance and LTC operations.', href: '/services/microsoft-cloud' },
  { icon: <LinkIcon size={22} />, color: C.p2,     title: 'PointClickCare Integration',  desc: 'End-to-end PCC data bridges built and maintained by specialists who know both systems inside and out.', href: '/services/pointclickcare-integration' },
]

/* ─── Live Agent Widget ─────────────────────────────────────────────────── */
function AgentWidget() {
  const pipeline = [
    { label: 'Parsing eRx',         sub: 'Extracting order details',             icon: <Inbox size={12} /> },
    { label: 'DEA Verification',    sub: 'Prescriber registration — valid ✓',    icon: <Search size={12} /> },
    { label: 'CS Compliance Check', sub: 'Schedule II — audit trail created',    icon: <Pill size={12} /> },
    { label: 'Inventory Updated',   sub: 'Oxycodone 5mg: 1,239 units remaining', icon: <Box size={12} /> },
    { label: 'PointClickCare Sync', sub: 'MAR updated · Facility 3B',            icon: <LinkIcon size={12} /> },
    { label: 'Analytics Logged',    sub: 'Dispensing +1 · Error rate 0.18%',     icon: <BarChart3 size={12} /> },
    { label: 'Order Complete',      sub: 'Ready for RPh review',                 icon: <CheckCircle2 size={12} /> },
  ]
  const [step, setStep] = useState(0)
  const [done, setDone] = useState<number[]>([])
  useEffect(() => {
    const t = setInterval(() => {
      setStep((s) => {
        const n = (s + 1) % pipeline.length
        if (n === 0) setDone([])
        else setDone((d) => [...d, s])
        return n
      })
    }, 1500)
    return () => clearInterval(t)
  }, [])
  const orders = [
    { drug: 'Oxycodone 5mg',     facility: 'Rm 4A',  type: 'New ⚠ CS', active: true },
    { drug: 'Metformin 500mg',   facility: 'Rm 7C',  type: 'Refill',   active: false },
    { drug: 'Lorazepam 1mg',     facility: 'Rm 12B', type: 'New ⚠ CS', active: false },
    { drug: 'Atorvastatin 40mg', facility: 'Rm 2A',  type: 'Renewal',  active: false },
    { drug: 'Fluticasone 50mcg', facility: 'Rm 9D',  type: 'Refill',   active: false },
  ]
  return (
    <div style={{
      background: '#0B1627',
      borderRadius: 16,
      overflow: 'hidden',
      border: '1px solid rgba(138,184,227,0.15)',
      boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(138,184,227,0.08)',
    }}>
      {/* Title bar */}
      <div style={{
        padding: '10px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(255,255,255,0.02)',
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#FF5F57','#FEBC2E','#28C840'].map((c) => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <span style={{ fontSize: 10, color: 'rgba(138,184,227,0.82)', fontWeight: 700, letterSpacing: '0.08em', fontFamily: "'Akshar', sans-serif" }}>
          SKYPONDTECH AI AGENT · LIVE
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, boxShadow: `0 0 8px ${C.green}` }} />
          <span style={{ fontSize: 10, color: C.green, fontWeight: 700, fontFamily: "'Akshar', sans-serif" }}>RUNNING</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* Pipeline */}
        <div style={{ padding: '18px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(138,184,227,0.72)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, fontFamily: "'Akshar', sans-serif" }}>AI Pipeline</div>
          {pipeline.map((s, i) => {
            const isActive = i === step
            const isDone   = done.includes(i)
            return (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                  background: isDone ? `${C.green}25` : isActive ? `${C.p2}20` : 'rgba(255,255,255,0.04)',
                  border: `1.5px solid ${isDone ? C.green : isActive ? C.p2 : 'rgba(255,255,255,0.08)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s',
                  boxShadow: isActive ? `0 0 12px ${C.p2}60` : 'none',
                }}>
                  {isDone
                    ? <span style={{ fontSize: 9, color: C.green, fontWeight: 800 }}>✓</span>
                    : isActive
                    ? <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.p2, display: 'block' }} />
                    : <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 9 }}>{s.icon}</span>}
                </div>
                <div>
                  <div style={{
                    fontSize: 12, fontWeight: isActive ? 600 : 400,
                    color: isDone ? 'rgba(255,255,255,0.52)' : isActive ? '#fff' : 'rgba(255,255,255,0.42)',
                    transition: 'color 0.3s', lineHeight: 1.3,
                  }}>{s.label}</div>
                  {isActive && (
                    <div style={{ fontSize: 10, color: C.p2, marginTop: 2, animation: 'fadeUp 0.3s ease both' }}>{s.sub}</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        {/* Order queue */}
        <div style={{ padding: '18px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(138,184,227,0.72)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, fontFamily: "'Akshar', sans-serif" }}>Order Queue</div>
          {orders.map((o, i) => (
            <div key={i} style={{
              padding: '8px 11px', borderRadius: 7, marginBottom: 6,
              background: o.active ? 'rgba(138,184,227,0.08)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${o.active ? C.p2 + '40' : 'rgba(255,255,255,0.04)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: 11.5, color: o.active ? '#fff' : 'rgba(255,255,255,0.62)', fontWeight: o.active ? 600 : 400 }}>{o.drug}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>{o.facility}</div>
              </div>
              <span style={{
                fontSize: 9.5, fontWeight: 700,
                color: o.active ? C.p2 : o.type.includes('⚠') ? C.amber : 'rgba(255,255,255,0.18)',
                background: o.active ? `${C.p2}12` : 'transparent',
                padding: o.active ? '2px 7px' : '0', borderRadius: 4,
              }}>
                {o.active ? 'ACTIVE' : o.type}
              </span>
            </div>
          ))}
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ padding: '7px 10px', borderRadius: 7, background: `${C.green}10`, border: `1px solid ${C.green}22` }}>
              <div style={{ fontSize: 10.5, color: C.green, fontWeight: 600 }}>✓ DEA Verified · CS Logged · PCC Synced</div>
              <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.58)', marginTop: 2 }}>Audit trail created · 0 discrepancies</div>
            </div>
            <div style={{ padding: '7px 10px', borderRadius: 7, background: 'rgba(138,184,227,0.06)', border: '1px solid rgba(138,184,227,0.14)' }}>
              <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.5)' }}>📊 Analytics updated · Error rate: <span style={{ color: C.green, fontWeight: 700 }}>0.18%</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── DEA Scorecard ─────────────────────────────────────────────────────── */
function DEACard() {
  const { ref, visible } = useReveal()
  const rows = [
    { l: 'DEA Registrations Verified', s: 'pass', v: '247/247' },
    { l: 'Expiring in 30 Days',        s: 'warn', v: '3 flagged' },
    { l: 'Invalid / Revoked',          s: 'pass', v: '0 found' },
    { l: 'ARCOS Report Filed',         s: 'pass', v: 'Current' },
    { l: 'CS Discrepancies',           s: 'pass', v: '0 open' },
  ]
  return (
    <div ref={ref} style={{
      background: '#fff', border: `1px solid ${C.border}`,
      borderRadius: 16, padding: '22px 20px', overflow: 'hidden',
      borderTop: `3px solid ${C.green}`,
      boxShadow: '0 2px 16px rgba(20,49,86,0.06)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.green, marginBottom: 2, fontFamily: "'Akshar', sans-serif" }}>DEA Audit Readiness</div>
          <div style={{ fontWeight: 700, fontSize: 14.5, color: C.head, fontFamily: "'Akshar', sans-serif" }}>Compliance Scorecard</div>
        </div>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: `${C.green}12`, border: `2px solid ${C.green}30`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: C.green, lineHeight: 1, fontFamily: "'Akshar', sans-serif" }}>{visible ? 94 : 0}</span>
          <span style={{ fontSize: 8.5, color: C.muted, fontWeight: 600 }}>/100</span>
        </div>
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '6px 9px', borderRadius: 6,
          background: r.s === 'pass' ? `${C.green}06` : `${C.amber}08`,
          marginBottom: 4,
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-6px)',
          transition: `opacity 0.4s ${i * 0.07}s, transform 0.4s ${i * 0.07}s`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: r.s === 'pass' ? C.green : C.amber, flexShrink: 0 }} />
            <span style={{ fontSize: 11.5, color: C.body }}>{r.l}</span>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: r.s === 'pass' ? C.green : C.amber }}>{r.v}</span>
        </div>
      ))}
      <div style={{ marginTop: 10, padding: '7px 10px', borderRadius: 7, background: `${C.green}0D`, border: `1px solid ${C.green}25`, display: 'flex', alignItems: 'center', gap: 6 }}>
        <Shield size={13} color={C.green} />
        <span style={{ fontSize: 11, fontWeight: 600, color: C.green }}>Audit-ready — 3 items need attention</span>
      </div>
    </div>
  )
}

/* ─── CS Inventory ──────────────────────────────────────────────────────── */
function CSCard() {
  const { ref, visible } = useReveal()
  const drugs = [
    { n: 'Oxycodone HCl 5mg',  sch: 'II',  cnt: 1240, max: 1500, s: 'ok'   },
    { n: 'Hydrocodone 7.5mg',  sch: 'II',  cnt: 876,  max: 1000, s: 'ok'   },
    { n: 'Lorazepam 1mg',      sch: 'IV',  cnt: 340,  max: 400,  s: 'warn' },
    { n: 'Tramadol 50mg',      sch: 'IV',  cnt: 88,   max: 800,  s: 'low'  },
  ]
  const sc = (s: string) => s === 'ok' ? C.green : s === 'warn' ? C.amber : C.red
  return (
    <div ref={ref} style={{
      background: '#fff', border: `1px solid ${C.border}`,
      borderRadius: 16, padding: '22px 20px',
      borderTop: `3px solid ${C.p2}`,
      boxShadow: '0 2px 16px rgba(20,49,86,0.06)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.p2, marginBottom: 2, fontFamily: "'Akshar', sans-serif" }}>CS Inventory</div>
          <div style={{ fontWeight: 700, fontSize: 14.5, color: C.head, fontFamily: "'Akshar', sans-serif" }}>Controlled Substances</div>
        </div>
        <div style={{ padding: '4px 10px', borderRadius: 20, background: `${C.green}12`, border: `1px solid ${C.green}28`, fontSize: 10.5, fontWeight: 700, color: C.green }}>
          🟢 Live
        </div>
      </div>
      {drugs.map((d, i) => (
        <div key={i} style={{ marginBottom: 11, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-5px)', transition: `opacity 0.4s ${i * 0.09}s, transform 0.4s ${i * 0.09}s` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 3, background: `${C.p}10`, color: C.p, fontWeight: 700, fontFamily: "'Akshar', sans-serif" }}>Sch {d.sch}</span>
              <span style={{ fontSize: 12, color: C.body }}>{d.n}</span>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: sc(d.s) }}>
              {d.s === 'low' ? '⚠ LOW ' : d.s === 'warn' ? '▲ ' : ''}{d.cnt}/{d.max}
            </span>
          </div>
          <div style={{ height: 5, borderRadius: 3, background: C.alt, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 3, background: sc(d.s),
              width: visible ? `${(d.cnt / d.max) * 100}%` : '0%',
              transition: `width 1s ${i * 0.1}s ease-out`,
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Analytics Card ────────────────────────────────────────────────────── */
function AnalyticsCard() {
  const { ref, visible } = useReveal()
  const kpis = [
    { l: 'Dispenses / Month', v: '3,241', d: '+6.2%', c: C.p },
    { l: 'Active Facilities',  v: '18',    d: '+2',    c: C.p2 },
    { l: 'Error Rate',         v: '0.18%', d: '-0.04%', c: C.green },
    { l: 'Avg Fill Time',      v: '4.2m',  d: '-0.8m', c: C.amber },
  ]
  const facilities = [
    { n: 'Sunrise Memory Care',     pct: 94, c: C.p },
    { n: 'Oakwood Skilled Nursing', pct: 88, c: C.p2 },
    { n: 'Valley View LTC',         pct: 97, c: C.green },
    { n: 'Ridgeline Rehab Center',  pct: 76, c: C.amber },
  ]
  return (
    <div ref={ref} style={{
      background: '#fff', border: `1px solid ${C.border}`,
      borderRadius: 16, padding: '22px 20px',
      borderTop: `3px solid ${C.amber}`,
      boxShadow: '0 2px 16px rgba(20,49,86,0.06)',
    }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.amber, marginBottom: 2, fontFamily: "'Akshar', sans-serif" }}>Analytics Dashboard</div>
        <div style={{ fontWeight: 700, fontSize: 14.5, color: C.head, fontFamily: "'Akshar', sans-serif" }}>LTC Operations Overview</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginBottom: 14 }}>
        {kpis.map((k, i) => (
          <div key={i} style={{
            padding: '9px', borderRadius: 8, background: C.alt, border: `1px solid ${C.border}`,
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(5px)',
            transition: `opacity 0.4s ${i * 0.09}s, transform 0.4s ${i * 0.09}s`,
          }}>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}>{k.l}</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: k.c, fontFamily: "'Akshar', sans-serif", letterSpacing: '-0.02em', lineHeight: 1 }}>{k.v}</div>
            <div style={{ fontSize: 9.5, color: C.green, fontWeight: 700, marginTop: 2 }}>▲ {k.d}</div>
          </div>
        ))}
      </div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, fontFamily: "'Akshar', sans-serif" }}>Facility Performance</div>
        {facilities.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 7, opacity: visible ? 1 : 0, transition: `opacity 0.4s ${0.35 + i * 0.07}s` }}>
            <span style={{ fontSize: 11, color: C.body, flex: 1 }}>{f.n}</span>
            <div style={{ width: 72, height: 4, borderRadius: 2, background: C.alt, overflow: 'hidden', flexShrink: 0 }}>
              <div style={{ height: '100%', borderRadius: 2, background: f.c, width: visible ? `${f.pct}%` : '0%', transition: `width 0.9s ${0.35 + i * 0.07}s ease-out` }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: f.c, minWidth: 28, textAlign: 'right' }}>{f.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE SECTIONS
═══════════════════════════════════════════════════════════════════════════ */

/* ─── Hero ──────────────────────────────────────────────────────────────── */
function Hero() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <section style={{
      background: '#07101E',
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '118px 5vw 0',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Dot-grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(138,184,227,0.18) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
      }} />
      {/* Glow blobs */}
      <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: 900, height: 600, borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(20,49,86,0.55) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '30%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, rgba(131,183,98,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '20%', right: '-5%', width: 360, height: 360, borderRadius: '50%', background: `radial-gradient(circle, rgba(217,166,41,0.06) 0%, transparent 65%)`, pointerEvents: 'none' }} />

      {/* ── CENTERED COPY ─────────────────────────────────────── */}
      <div style={{ maxWidth: 860, textAlign: 'center', position: 'relative', zIndex: 1, width: '100%' }}>

        {/* Eyebrow status badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, border: '1px solid rgba(131,183,98,0.35)', background: 'rgba(131,183,98,0.1)', marginBottom: 32, animation: 'fadeUp 0.5s ease both' }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#83B762', boxShadow: '0 0 10px #83B76280' }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#83B762', letterSpacing: '0.07em', textTransform: 'uppercase', fontFamily: "'Akshar', sans-serif" }}>
            The Complete LTC Pharmacy Platform
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Akshar', sans-serif",
          fontSize: 'clamp(3rem, 6.8vw, 5.4rem)',
          fontWeight: 900,
          color: '#FFFFFF',
          letterSpacing: '-0.04em',
          lineHeight: 1.02,
          marginBottom: 24,
          animation: 'fadeUp 0.55s 0.07s ease both',
          textWrap: 'balance',
        }}>
          More Than Automation.
          <br />
          <span style={{
            background: 'linear-gradient(90deg, #ffffff 0%, #C6DBE7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Total LTC Intelligence.
          </span>
        </h1>

        {/* Sub-headline */}
        <p style={{
          fontSize: 'clamp(1rem, 1.2vw, 1.12rem)',
          color: 'rgba(255,255,255,0.92)',
          lineHeight: 1.76,
          maxWidth: 600, margin: '0 auto 36px',
          fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
          fontWeight: 400,
          animation: 'fadeUp 0.55s 0.12s ease both',
        }}>
          SkypondTech is the only platform that combines DEA compliance, controlled substance tracking,
          AI automation, PointClickCare integration, and LTC-specific analytics — from a team that
          works exclusively in LTC pharmacy.
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36, animation: 'fadeUp 0.55s 0.17s ease both' }}>
          <Button variant="primary" size="lg" onClick={() => go('contact')}>Schedule a Demo →</Button>
          <Button variant="secondary" size="lg" onClick={() => go('products')}>Explore Products</Button>
        </div>

        {/* Differentiator chips */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 72, animation: 'fadeUp 0.55s 0.21s ease both' }}>
          {([
            { icon: <Zap size={13} color="#F79043" />, txt: '5 purpose-built products', c: '#F79043' },
            { icon: <Building2 size={13} color="#83B762" />, txt: '100% LTC-only focus', c: '#83B762' },
            { icon: <Users size={13} color="#D9A629" />, txt: 'Real named clients', c: '#D9A629' },
          ] as { icon: React.ReactNode; txt: string; c: string }[]).map(({ icon, txt, c }) => (
            <div key={txt} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 14px', borderRadius: 99, background: `${c}0D`, border: `1px solid ${c}30` }}>
              {icon}
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.95)', fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight: 500 }}>{txt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── PLATFORM PREVIEW ──────────────────────────────────── */}
      <div style={{
        width: '100%', maxWidth: 1100,
        display: 'grid', gridTemplateColumns: '180px 1fr 180px',
        gap: 18, alignItems: 'center',
        position: 'relative', zIndex: 1,
        animation: 'fadeUp 0.7s 0.28s ease both',
      }}>
        {/* Left stat cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {([
            { v: '50+', l: 'Projects', c: '#8AB8E3' },
            { v: '100%', l: 'Satisfaction', c: '#83B762' },
          ] as { v: string; l: string; c: string }[]).map(({ v, l, c }) => (
            <div key={l} style={{ padding: '20px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontFamily: "'Akshar', sans-serif", fontSize: 30, fontWeight: 900, color: c, lineHeight: 1, letterSpacing: '-0.03em' }}>{v}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.86)', marginTop: 5, fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight: 400 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Center — AgentWidget with glow */}
        <div style={{ filter: 'drop-shadow(0 0 48px rgba(20,49,86,0.9))', borderRadius: 16 }}>
          <AgentWidget />
        </div>

        {/* Right stat cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {([
            { v: '5', l: 'Core Products', c: '#D9A629' },
            { v: 'LTC', l: 'Only Focus', c: '#F79043' },
          ] as { v: string; l: string; c: string }[]).map(({ v, l, c }) => (
            <div key={l} style={{ padding: '20px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontFamily: "'Akshar', sans-serif", fontSize: 30, fontWeight: 900, color: c, lineHeight: 1, letterSpacing: '-0.03em' }}>{v}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.86)', marginTop: 5, fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight: 400 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade into trust bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, background: 'linear-gradient(to bottom, transparent, #07101E)', pointerEvents: 'none', zIndex: 2 }} />
    </section>
  )
}


/* ─── Trust Ticker ──────────────────────────────────────────────────────── */
function TrustBar() {
  const pills = [
    { t: 'DEA Compliance', c: C.green },
    { t: 'CS Inventory Tracking', c: C.p2 },
    { t: 'PointClickCare Integration', c: C.p2 },
    { t: 'Power BI Analytics', c: C.amber },
    { t: 'AI Workflow Automation', c: C.red },
    { t: 'Microsoft Azure', c: C.p2 },
    { t: 'Custom LTC Development', c: C.green },
    { t: 'Document Automation', c: C.red },
    { t: '100% LTC Focus', c: C.amber },
  ]
  return (
    <div style={{ background: '#07101E', padding: '14px 0', overflow: 'hidden', whiteSpace: 'nowrap', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ display: 'inline-flex', gap: 44, animation: 'ticker 36s linear infinite' }}>
        {[...pills, ...pills].map((p, i) => (
          <span key={i} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: p.c, fontFamily: "'Akshar', sans-serif", opacity: 0.88 }}>
            ✦ {p.t}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── Products ──────────────────────────────────────────────────────────── */
function Products() {
  const { ref, visible } = useReveal(0.1)
  return (
    <section id="products" style={{ padding: '100px 5vw', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <SectionLabel color={C.p}>6 Core Products</SectionLabel>
          <h2 style={{
            fontFamily: "'Akshar', sans-serif",
            fontSize: 'clamp(2rem, 3vw, 2.8rem)',
            fontWeight: 800, color: C.head,
            letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 16,
          }}>
            Purpose-Built for LTC.<br />Not Adapted from Generic AI.
          </h2>
          <p style={{ fontSize: 16, color: C.body, lineHeight: 1.7, maxWidth: 520, margin: '0 auto', fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif" }}>
            Every product solves a specific LTC pharmacy problem that automation-only platforms don&apos;t touch — DEA compliance, CS inventory, analytics, and EHR integration.
          </p>
        </div>

        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {PRODUCTS.map((p, i) => (
            <Link key={i} href={p.href} style={{ textDecoration: 'none' }}>
              <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(18px)',
                transition: `opacity 0.5s ${i * 0.07}s, transform 0.5s ${i * 0.07}s`,
                background: '#fff', border: `1px solid ${C.border}`,
                borderTop: `3px solid ${p.color}`, borderRadius: 14,
                padding: '26px 24px', height: '100%',
                display: 'flex', flexDirection: 'column',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.transform = 'translateY(-5px)'
                el.style.boxShadow = `0 16px 48px ${p.color}18`
                el.style.borderColor = `${p.color}50`
                el.style.borderTopColor = p.color
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.transform = 'none'
                el.style.boxShadow = 'none'
                el.style.borderColor = C.border
                el.style.borderTopColor = p.color
              }}>
                {/* Icon + tag row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: `${p.color}12`, border: `1px solid ${p.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }} >{p.icon}</div>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: p.color, fontFamily: "'Akshar', sans-serif", padding: '3px 9px', borderRadius: 99, background: `${p.color}0E`, border: `1px solid ${p.color}22` }}>{p.tag}</span>
                </div>
                {/* Title */}
                <h3 style={{ fontFamily: "'Akshar', sans-serif", fontSize: 17, fontWeight: 700, color: C.head, marginBottom: 8, lineHeight: 1.25 }}>{p.title}</h3>
                {/* Description */}
                <p style={{ fontSize: 13.5, color: C.body, lineHeight: 1.65, flex: 1, marginBottom: 18, fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight: 400 }}>{p.desc}</p>
                {/* Metric pill */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 99, background: `${p.color}0E`, border: `1px solid ${p.color}22` }}>
                    <span style={{ fontFamily: "'Akshar', sans-serif", fontSize: 14, fontWeight: 800, color: p.color }}>{p.metric}</span>
                    <span style={{ fontSize: 11, color: p.color, opacity: 0.65 }}>{p.ml}</span>
                  </div>
                  <ChevronRight size={16} color={`${p.color}60`} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Button to="/products" variant="secondary" size="md">View All Products →</Button>
        </div>
      </div>
    </section>
  )
}

/* ─── Platform Depth ────────────────────────────────────────────────────── */
function Dashboards() {
  const { ref, visible } = useReveal(0.1)
  return (
    <section style={{ padding: '100px 5vw', background: `linear-gradient(160deg, ${C.alt} 0%, #DFE9F0 100%)` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: 64, alignItems: 'center', marginBottom: 64 }}>
          <div>
            <SectionLabel color={C.p}>Platform Depth</SectionLabel>
            <h2 style={{ fontFamily: "'Akshar', sans-serif", fontSize: 'clamp(1.9rem, 2.8vw, 2.6rem)', fontWeight: 800, color: C.head, letterSpacing: '-0.028em', lineHeight: 1.1, marginBottom: 16 }}>
              Real Intelligence—<br />Not Just Order Entry
            </h2>
            <p style={{ fontSize: 15, color: C.body, lineHeight: 1.75, fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight: 400, marginBottom: 24 }}>
              SkypondTech gives you DEA compliance visibility, real-time CS tracking, and LTC analytics — capabilities no automation tool offers.
            </p>
            <Button to="/products" variant="primary" size="md">See All Capabilities →</Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: <Shield size={16} />, color: C.green, label: 'DEA compliance dashboard with live audit readiness score' },
              { icon: <BarChart3 size={16} />, color: C.amber, label: 'Multi-facility analytics with KPI benchmarking' },
              { icon: <Pill size={16} />, color: C.p2, label: 'Real-time CS inventory with automated discrepancy detection' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 10, background: '#fff', border: `1px solid ${C.border}` }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${item.color}14`, border: `1px solid ${item.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: item.color }}>{item.icon}</span>
                </div>
                <span style={{ fontSize: 13.5, color: C.body, fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          <DEACard />
          <AnalyticsCard />
          <CSCard />
        </div>
      </div>
    </section>
  )
}

/* ─── Services ──────────────────────────────────────────────────────────── */
function Services() {
  const { ref, visible } = useReveal(0.1)
  return (
    <section id="services" style={{ padding: '100px 5vw', background: C.p }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64, alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 100 }}>
            <SectionLabel color={C.p2}>Full-Service Partner</SectionLabel>
            <h2 style={{ fontFamily: "'Akshar', sans-serif", fontSize: 'clamp(1.9rem, 2.8vw, 2.6rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.028em', lineHeight: 1.1, marginBottom: 16 }}>
              We Build, Integrate, Train, and Support
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.72, fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight: 400, marginBottom: 28 }}>
              TJM Labs and PillSpark are automation tools. SkypondTech is your complete LTC technology partner — from DEA compliance to custom development to Microsoft cloud infrastructure.
            </p>
            <Button to="/services" variant="ctaWhite" size="md">View All Services →</Button>
          </div>

          <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {SERVICES.map((s, i) => (
              <Link key={i} href={s.href} style={{ textDecoration: 'none' }}>
                <div
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'none' : 'translateY(12px)',
                  transition: `opacity 0.4s ${i * 0.07}s, transform 0.4s ${i * 0.07}s`,
                  padding: '22px 20px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderLeft: `3px solid ${s.color}`,
                  height: '100%', display: 'flex', flexDirection: 'column', gap: 10,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'none' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 9, background: `${s.color}28`, border: `1.5px solid ${s.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: s.color }}>{s.icon}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Akshar', sans-serif", fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 5, lineHeight: 1.2 }}>{s.title}</div>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)', lineHeight: 1.6, fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight: 400 }}>{s.desc}</p>
                  </div>
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 4, color: C.green, fontSize: 12, fontWeight: 600 }}>
                    Learn more <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Industries ────────────────────────────────────────────────────────── */
function IndustriesSection() {
  const { ref, visible } = useReveal(0.1)
  const verticals = [
    {
      icon: <Pill size={24} />, color: C.p, bgGrad: `linear-gradient(135deg, ${C.alt} 0%, #D4E5F0 100%)`,
      tag: 'Primary Focus', title: 'LTC Pharmacy',
      desc: 'Our deepest domain. Nearly a decade inside LTC pharmacy operations — dispensing, DEA compliance, PointClickCare, prior auth, and everything in between.',
      href: '/services',
    },
    {
      icon: <Hospital size={24} />, color: C.green, bgGrad: `linear-gradient(135deg, #EEF7E8 0%, #DDEFD5 100%)`,
      tag: 'Near-Primary', title: 'LTC Facilities',
      desc: 'SNF, ALF, memory care, and behavioral health. Same compliance demands, overlapping systems, same need for technology that understands the care setting.',
      href: '/industries',
    },
    {
      icon: <BarChart3 size={24} />, color: C.amber, bgGrad: `linear-gradient(135deg, #FBF4E3 0%, #F5E8C2 100%)`,
      tag: 'Analytics & Dev', title: 'Financial & Retail',
      desc: "Our Data Analytics and Custom Development services travel outside healthcare. We've built analytics platforms and custom applications for financial firms and retail organizations.",
      href: '/industries',
    },
  ]
  return (
    <section id="industries" style={{ padding: '100px 5vw', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <SectionLabel color={C.p}>Who We Serve</SectionLabel>
            <h2 style={{ fontFamily: "'Akshar', sans-serif", fontSize: 'clamp(1.9rem, 2.8vw, 2.6rem)', fontWeight: 800, color: C.head, letterSpacing: '-0.028em', lineHeight: 1.1, marginBottom: 10 }}>
              LTC-Focused.<br />Not LTC-Only.
            </h2>
            <p style={{ fontSize: 15, color: C.body, lineHeight: 1.72, maxWidth: 420, fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif" }}>
              Our expertise is rooted in long-term care. Our analytics and development capabilities extend beyond it.
            </p>
          </div>
          <Button to="/industries" variant="secondary" size="md" style={{ flexShrink: 0 }}>View All Industries →</Button>
        </div>

        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {verticals.map((v, i) => (
            <Link key={i} href={v.href} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{
                borderRadius: 16, overflow: 'hidden', height: '100%',
                display: 'flex', flexDirection: 'column',
                border: `1px solid ${C.border}`,
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(16px)',
                transition: `opacity 0.5s ${i * 0.1}s, transform 0.5s ${i * 0.1}s`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${v.color}15` }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
                {/* Coloured header area */}
                <div style={{ background: v.bgGrad, padding: '28px 24px 20px' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${v.color}16`, border: `1.5px solid ${v.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <span style={{ color: v.color }}>{v.icon}</span>
                  </div>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: v.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, fontFamily: "'Akshar', sans-serif" }}>{v.tag}</div>
                  <div style={{ fontFamily: "'Akshar', sans-serif", fontSize: 20, fontWeight: 700, color: C.head, lineHeight: 1.2 }}>{v.title}</div>
                </div>
                {/* Content area */}
                <div style={{ padding: '20px 24px 24px', background: '#fff', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <p style={{ fontSize: 13.5, color: C.body, lineHeight: 1.68, marginBottom: 18, fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif", flex: 1 }}>{v.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: v.color, fontSize: 13, fontWeight: 600, fontFamily: "'Akshar', sans-serif" }}>
                    Learn more <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Testimonials ──────────────────────────────────────────────────────── */
function Testimonials() {
  const [active, setActive]   = useState(0)
  const [data, setData]       = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    sanityClient.fetch<Testimonial[]>(TESTIMONIALS_QUERY)
      .then((res) => { setData(res); setLoading(false) })
      .catch(() => { setLoading(false) })
  }, [])
  useEffect(() => {
    if (data.length === 0) return
    const t = setInterval(() => setActive((a) => (a + 1) % data.length), 6000)
    return () => clearInterval(t)
  }, [data.length])
  const getInitials = (name: string) =>
    name ? name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) : '??'

  if (loading || data.length === 0) return null

  return (
    <section id="about" style={{ padding: '100px 5vw', background: C.alt }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <SectionLabel color={C.p}>Named Clients. Real Results.</SectionLabel>
        <h2 style={{ fontFamily: "'Akshar', sans-serif", fontSize: 'clamp(1.9rem, 2.8vw, 2.6rem)', fontWeight: 800, color: C.head, letterSpacing: '-0.028em', lineHeight: 1.1, marginBottom: 48 }}>
          Our Clients Put Their Names on It
        </h2>

        <div style={{ position: 'relative', minHeight: 280 }}>
          {data.map((t, i) => (
            <div key={t._id} style={{
              position: i === 0 ? 'relative' : 'absolute', top: 0, left: 0, right: 0,
              opacity: active === i ? 1 : 0,
              transform: active === i ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.99)',
              transition: 'opacity 0.5s, transform 0.5s',
              pointerEvents: active === i ? 'auto' : 'none',
            }}>
              <div style={{
                background: '#fff', borderRadius: 16, padding: '36px 40px', textAlign: 'left',
                border: `1px solid ${C.border}`, position: 'relative', overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(20,49,86,0.07)',
              }}>
                {/* Accent bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.p} 0%, ${C.p2} 100%)` }} />
                <div style={{ fontSize: 52, lineHeight: 0.8, color: C.p2, marginBottom: 16, fontFamily: 'Georgia, serif', opacity: 0.4, marginTop: 8 }}>"</div>
                <p style={{ fontSize: 'clamp(1rem, 1.2vw, 1.08rem)', color: C.head, lineHeight: 1.78, fontStyle: 'italic', marginBottom: 28, fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight: 400 }}>{t.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  {t.avatar ? (
                    <Image src={t.avatar} alt={t.a} width={44} height={44} style={{ borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, ${C.p} 0%, ${C.p2} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontSize: 13, fontFamily: "'Akshar', sans-serif", flexShrink: 0 }}>{getInitials(t.a)}</div>
                  )}
                  <div>
                    <div style={{ color: C.head, fontWeight: 700, fontSize: 15, fontFamily: "'Akshar', sans-serif" }}>{t.a}</div>
                    <div style={{ color: C.muted, fontSize: 12.5, fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif" }}>{t.role} · {t.company}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 24 }}>
          {data.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              width: active === i ? 28 : 8, height: 8, borderRadius: 4,
              background: active === i ? C.p : C.border,
              border: 'none', cursor: 'pointer', transition: 'all 0.3s',
            }} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA Banner ────────────────────────────────────────────────────────── */
function CTABanner() {
  return (
    <section style={{ padding: '100px 5vw', background: `linear-gradient(140deg, #0B1627 0%, #0F2448 50%, #143156 100%)`, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(138,184,227,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(138,184,227,0.03) 1px, transparent 1px)`, backgroundSize: '60px 60px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: -100, right: -60, width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${C.p2}12 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: '10%', width: 360, height: 360, borderRadius: '50%', background: `radial-gradient(circle, ${C.green}0A 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 16px', borderRadius: 99, border: `1px solid ${C.p2}30`, background: `${C.p2}10`, marginBottom: 24 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, boxShadow: `0 0 6px ${C.green}` }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.p2, fontFamily: "'Akshar', sans-serif" }}>One Platform. Every LTC Need.</span>
        </div>
        <h2 style={{ fontFamily: "'Akshar', sans-serif", fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 18 }}>
          The Full LTC Pharmacy Platform.<br />One Partner. Zero Gaps.
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.88)', lineHeight: 1.75, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px', fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight: 400 }}>
          Don&apos;t settle for a narrow automation tool or a general-purpose AI platform. SkypondTech is purpose-built for LTC pharmacy — DEA compliance, CS inventory, AI automation, analytics, and PointClickCare — everything you need, from one team that only works in LTC.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="ctaWhite" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Schedule a Demo →
          </Button>
          <Button variant="secondaryDark" size="lg" href={`tel:${CONTACT_PHONE}`} style={{ fontSize: '0.95rem' }}>
            📞 {CONTACT_PHONE_DISPLAY}
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ─── Contact Form ──────────────────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    company: '', phone: '', areaOfInterest: '', message: '',
  })
  const [sent, setSent]             = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const inp: React.CSSProperties = {
    width: '100%', padding: '11px 14px', borderRadius: 9,
    background: '#fff', border: `1.5px solid ${C.border}`,
    color: C.head, fontSize: 14, outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s', boxSizing: 'border-box',
    fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight: 400,
  }
  const lbl: React.CSSProperties = {
    color: C.body, fontSize: 13, display: 'block', marginBottom: 6, fontWeight: 500,
    fontFamily: "'Akshar', sans-serif",
  }
  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = C.p
    e.target.style.boxShadow   = `0 0 0 3px ${C.p}12`
  }
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = C.border
    e.target.style.boxShadow   = 'none'
  }

  const handleSubmit = async () => {
    if (!form.email) return
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      if (res.ok) {
        setSent(true)
      } else {
        const { error } = await res.json().catch(() => ({ error: 'Something went wrong.' }))
        setSubmitError(error || 'Something went wrong. Please email us directly.')
      }
    } catch {
      setSubmitError('Network error. Please email us at info@skypondtech.com.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" style={{ padding: '100px 5vw', background: C.alt, scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <SectionLabel color={C.p}>Get In Touch</SectionLabel>
          <h2 style={{ fontFamily: "'Akshar', sans-serif", fontSize: 'clamp(1.9rem, 2.8vw, 2.6rem)', fontWeight: 800, color: C.head, letterSpacing: '-0.028em', lineHeight: 1.1, marginBottom: 14 }}>
            Start a Conversation
          </h2>
          <p style={{ fontSize: 15, color: C.body, lineHeight: 1.72, fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif" }}>
            Tell us about your pharmacy&apos;s biggest compliance or operational bottleneck. We&apos;ll come back with a clear, honest plan.
          </p>
        </div>

        {sent ? (
          <div style={{ background: '#fff', borderRadius: 16, padding: '56px 36px', textAlign: 'center', border: `1px solid ${C.border}`, boxShadow: '0 4px 24px rgba(20,49,86,0.06)' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: `${C.green}14`, border: `2px solid ${C.green}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle2 size={28} color={C.green} />
            </div>
            <h3 style={{ fontFamily: "'Akshar', sans-serif", fontSize: 22, fontWeight: 700, color: C.head, marginBottom: 10 }}>We&apos;ll Be in Touch</h3>
            <p style={{ color: C.body, fontSize: 15, lineHeight: 1.7, fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif" }}>
              Your message has been received. Our team responds within one business day.<br />
              Or reach us directly at {CONTACT_EMAIL} or {CONTACT_PHONE_DISPLAY}.
            </p>
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: 16, padding: '36px 32px', border: `1px solid ${C.border}`, boxShadow: '0 4px 24px rgba(20,49,86,0.06)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* First Name + Last Name */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={lbl}>First Name</label>
                  <input style={inp} placeholder="First name"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    onFocus={focus} onBlur={blur} />
                </div>
                <div>
                  <label style={lbl}>Last Name</label>
                  <input style={inp} placeholder="Last name"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    onFocus={focus} onBlur={blur} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={lbl}>Email *</label>
                <input style={inp} type="email" placeholder="you@pharmacy.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={focus} onBlur={blur} />
              </div>

              {/* Company Name */}
              <div>
                <label style={lbl}>Company Name</label>
                <input style={inp} placeholder="Your pharmacy or organization"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  onFocus={focus} onBlur={blur} />
              </div>

              {/* Phone Number */}
              <div>
                <label style={lbl}>Phone Number</label>
                <input style={inp} type="tel" placeholder="+1 (720) 000-0000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  onFocus={focus} onBlur={blur} />
              </div>

              {/* Area of Interest */}
              <div>
                <label style={lbl}>Area of Interest</label>
                <select style={{ ...inp, cursor: 'pointer' }}
                  value={form.areaOfInterest}
                  onChange={(e) => setForm({ ...form, areaOfInterest: e.target.value })}
                  onFocus={focus} onBlur={blur}>
                  <option value="">Select an area…</option>
                  <option value="Long Term Care Pharmacy">Long Term Care Pharmacy</option>
                  <option value="CS Inventory App">CS Inventory App</option>
                  <option value="Microsoft 365">Microsoft 365</option>
                  <option value="Custom Development">Custom Development</option>
                  <option value="AI Automation">AI Automation</option>
                  <option value="Data Analytics">Data Analytics</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label style={lbl}>Message</label>
                <textarea style={{ ...inp, minHeight: 100, resize: 'vertical' }}
                  placeholder="Tell us about your challenge or what you&apos;re looking to solve…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={focus} onBlur={blur} />
              </div>

              {submitError && (
                <p style={{ color: '#C2410C', fontSize: 13, fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif", margin: 0 }}>
                  {submitError}
                </p>
              )}

              <Button variant="primary" size="md" disabled={submitting} onClick={handleSubmit}>
                {submitting ? 'Sending…' : 'Send Message →'}
              </Button>

            </div>
          </div>
        )}
      </div>
    </section>
  )
}


/* ─── Page export ───────────────────────────────────────────────────────── */
export function HomeContent() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <Products />
      <Dashboards />
      <Services />
      <IndustriesSection />
      <Testimonials />
      <CTABanner />
      <Contact />
    </main>
  )
}
