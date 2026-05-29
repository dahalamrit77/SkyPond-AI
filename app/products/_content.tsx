'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Search, ClipboardList, Package, BarChart3, Link2, Zap,
  CheckCircle, Layers,
} from 'lucide-react'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { Button } from '@/components/ui/Button'
import C from '@/lib/tokens'

/* ─── Primitives ─────────────────────────────────────────────────────────── */
function Badge({ c = C.p2, children }: { c?: string; children: React.ReactNode }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 13px',
      borderRadius: 99, border: `1px solid ${c}28`, background: `${c}18`, color: c,
      fontSize: 11.5, letterSpacing: '0.07em', textTransform: 'uppercase', fontWeight: 500,
      fontFamily: "'Akshar', sans-serif",
    }}>{children}</span>
  )
}

/* ─── Product data ───────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    cat: 'compliance',
    href: '/products/dea-compliance-reporting',
    title: 'DEA Compliance Reporting',
    badge: 'Compliance',
    desc: 'Automate CSOS, ARCOS, and DEA Form 222 reporting workflows. Eliminate manual errors and stay ahead of inspection cycles.',
    icon: ClipboardList,
    iconBg: `${C.green}22`,
    iconColor: C.green,
    features: ['CSOS & ARCOS automated filing', 'DEA Form 222 digital workflow', 'Exception flagging & alerts', 'Multi-location reporting rollup'],
  },
  {
    cat: 'operations',
    href: '/products/cs-inventory',
    title: 'CS Inventory',
    badge: 'Operations',
    desc: 'Real-time controlled substance inventory management built for LTC pharmacy workflows. Track, reconcile, and audit with confidence.',
    icon: Package,
    iconBg: `${C.ms}18`,
    iconColor: C.ms,
    features: ['Real-time perpetual inventory', 'Automated discrepancy alerts', 'Schedule II–V tracking', 'One-click biennial inventory export'],
  },
  {
    cat: 'analytics',
    href: '/products/ltc-analytics',
    title: 'LTC Analytics',
    badge: 'Analytics',
    desc: 'Pharmacy-specific dashboards that surface the metrics that matter in long-term care — utilization, adherence, cost trends, and facility KPIs.',
    icon: BarChart3,
    iconBg: `${C.amber}22`,
    iconColor: C.amber,
    features: ['Facility-level performance views', 'Medication utilization trends', 'Cost & margin analytics', 'Configurable KPI dashboards'],
  },
  {
    cat: 'integration',
    href: '/products/pointclickcare-feed',
    title: 'PointClickCare Feed',
    badge: 'Integration',
    desc: 'Bidirectional data integration between your pharmacy system and PointClickCare — eliminating manual re-entry and closing the loop with facilities.',
    icon: Link2,
    iconBg: 'rgba(168,85,247,0.18)',
    iconColor: '#9333ea',
    features: ['Real-time HL7/FHIR data sync', 'ADT admission/discharge triggers', 'MAR reconciliation automation', 'Exception queue & error reporting'],
  },
  {
    cat: 'operations',
    href: '/products/document-automation',
    title: 'Document Automation',
    badge: 'Operations',
    desc: 'Generate, route, and archive pharmacy documents at scale — from prior auth letters to facility agreements — without manual assembly.',
    icon: Zap,
    iconBg: 'rgba(236,72,153,0.16)',
    iconColor: '#db2777',
    features: ['Template-driven document generation', 'e-Signature workflow routing', 'HIPAA-compliant archiving', 'Full audit trail on every document'],
  },
]

/* ─── Sub-components ─────────────────────────────────────────────────────── */
function FeatureLi({ children, last }: { children: React.ReactNode; last: boolean }) {
  return (
    <li style={{
      display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13,
      color: C.head, padding: '6px 0',
      borderBottom: last ? 'none' : `1px solid #eef2f6`,
      fontWeight: 400, fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
    }}>
      <span style={{
        width: 18, height: 18, flexShrink: 0, borderRadius: '50%',
        background: `${C.green}18`, display: 'flex', alignItems: 'center',
        justifyContent: 'center', marginTop: 1,
      }}>
        <CheckCircle size={11} color={C.green} strokeWidth={2.5} aria-hidden />
      </span>
      {children}
    </li>
  )
}

type ProductItem = typeof PRODUCTS[number]

function ProductCard({ product, animDelay }: { product: ProductItem; animDelay: number }) {
  const Icon = product.icon
  return (
    <div
      data-cat={product.cat}
      style={{
        background: C.surface, borderRadius: 18, border: `1px solid ${C.border}`,
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        transition: 'transform 0.25s, box-shadow 0.25s',
        animation: `fadeUpProd 0.45s ease ${animDelay}s both`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)'
        e.currentTarget.style.boxShadow = '0 18px 52px rgba(13,31,60,0.13)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{
        background: C.p, padding: '30px 28px 26px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', bottom: -30, right: -30,
          width: 110, height: 110, borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)', pointerEvents: 'none',
        }} />
        <div style={{
          width: 46, height: 46, borderRadius: 12, background: product.iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 16, position: 'relative', zIndex: 1,
        }}>
          <Icon size={22} color={product.iconColor} strokeWidth={2} aria-hidden />
        </div>
        <h2 style={{
          fontFamily: "'Akshar', sans-serif", fontSize: 21, fontWeight: 800,
          color: '#fff', marginBottom: 8, lineHeight: 1.2, position: 'relative', zIndex: 1,
        }}>{product.title}</h2>
        <span style={{
          display: 'inline-block', background: `${C.green}2e`, color: C.green,
          fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
          padding: '3px 10px', borderRadius: 100, border: `1px solid ${C.green}44`,
          position: 'relative', zIndex: 1,
        }}>{product.badge}</span>
      </div>
      <div style={{ padding: '24px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{
          fontSize: 14, color: C.body, lineHeight: 1.65, marginBottom: 20,
          fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight: 400,
        }}>{product.desc}</p>
        <ul style={{ listStyle: 'none', marginBottom: 24, flex: 1 }}>
          {product.features.map((f: any, idx: any, arr: any) => (
            <FeatureLi key={f} last={idx === arr.length - 1}>{f}</FeatureLi>
          ))}
        </ul>
      </div>
      <div style={{
        padding: '16px 28px 24px', borderTop: '1px solid #eef2f6',
        display: 'flex', gap: 10,
      }}>
        <Link href={product.href} style={{
          flex: 1, background: C.p, color: '#fff', border: 'none', borderRadius: 8,
          padding: '11px 16px', fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
          fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center', gap: 6, textDecoration: 'none',
          transition: 'background 0.2s',
        }}>
          View Product →
        </Link>
        <Link href="/schedule-demo" style={{
          background: 'none', border: `1px solid ${C.border}`, borderRadius: 8,
          padding: '11px 16px', fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
          fontSize: 13, fontWeight: 500, color: C.head, cursor: 'pointer',
          textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
          transition: 'border-color 0.2s, background 0.2s',
        }}>
          Demo
        </Link>
      </div>
    </div>
  )
}

function TabsBar({ tab, setTab }: { tab: string; setTab: (t: string) => void }) {
  const tabs = [
    { id: 'all', label: 'All Products' },
    { id: 'compliance', label: 'Compliance' },
    { id: 'operations', label: 'Operations' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'integration', label: 'Integrations' },
  ]
  return (
    <div style={{
      background: C.pd, borderBottom: `1px solid rgba(255,255,255,0.1)`,
      padding: '0 max(24px, 5vw)', display: 'flex', gap: 0, overflowX: 'auto',
    }}>
      {tabs.map((t: any) => {
        const active = tab === t.id
        return (
          <button key={t.id} type="button" onClick={() => setTab(t.id)} style={{
            background: 'none', border: 'none',
            borderBottom: `2px solid ${active ? C.green : 'transparent'}`,
            padding: '15px 20px', color: active ? C.green : 'rgba(255,255,255,0.58)',
            fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
            fontSize: 13, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
            transition: 'color 0.2s, border-color 0.2s', marginBottom: -1,
          }}>
            {t.label}
          </button>
        )
      })}
    </div>
  )
}

function GridSection({ visibleProducts }: { visibleProducts: typeof PRODUCTS }) {
  return (
    <div style={{ padding: '64px max(24px, 5vw)', maxWidth: 1260, margin: '0 auto' }}>
      <div style={{ marginBottom: 42 }}>
        <h2 style={{
          fontFamily: "'Akshar', sans-serif", fontSize: 32, fontWeight: 800,
          color: C.head, marginBottom: 8,
        }}>The Complete LTC Pharmacy Stack</h2>
        <p style={{
          fontSize: 15, color: C.body, fontWeight: 400,
          fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
        }}>Six products. One team that knows the space.</p>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24,
      }}>
        {visibleProducts.map((p: any, i: any) => (
          <ProductCard key={p.href} product={p} animDelay={0.05 + i * 0.06} />
        ))}
      </div>
    </div>
  )
}

function CTASection() {
  return (
    <section style={{
      padding: '72px max(24px, 5vw)', background: C.surface,
      borderTop: `1px solid ${C.border}`, textAlign: 'center',
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: "'Akshar', sans-serif",
          fontSize: 'clamp(1.65rem, 3vw, 2.35rem)', fontWeight: 800,
          color: C.head, marginBottom: 12, lineHeight: 1.12, letterSpacing: '-0.02em',
          textWrap: 'balance',
        }}>Ready to see it in action?</h2>
        <p style={{
          fontSize: 16, color: C.body, marginBottom: 34, fontWeight: 400,
          lineHeight: 1.65, fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
          textWrap: 'pretty',
        }}>
          Walk through any product with someone who actually knows LTC pharmacy.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" size="lg" to="/schedule-demo">Schedule a Demo →</Button>
          <Button variant="secondary" size="lg" to="/schedule-demo">Talk to Sales</Button>
        </div>
      </div>
    </section>
  )
}

/* ─── Page export ────────────────────────────────────────────────────────── */
export function ProductsIndexContent() {
  const [tab, setTab] = useState('all')
  const visibleProducts = useMemo(
    () => (tab === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === tab)),
    [tab],
  )

  return (
    <>
      <style>{`
        @keyframes fadeUpProd {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Products' }]} />

      <main>
        {/* Hero */}
        <section style={{
          padding: '96px max(24px, 5vw) 88px', background: C.dark,
          position: 'relative', overflow: 'hidden', textAlign: 'center',
        }}>
          <div style={{
            position: 'absolute', pointerEvents: 'none', borderRadius: '50%',
            top: -120, right: -80, width: 480, height: 480,
            background: `radial-gradient(circle, ${C.green}14 0%, transparent 68%)`,
          }} />
          <div style={{
            position: 'absolute', pointerEvents: 'none', borderRadius: '50%',
            bottom: -100, left: -60, width: 380, height: 380,
            background: 'radial-gradient(circle, rgba(138,184,227,0.08) 0%, transparent 68%)',
          }} />
          <div style={{
            maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 1,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            <div style={{ marginBottom: 22 }}>
              <Badge c={C.green}>
                <Layers size={13} strokeWidth={2} aria-hidden />
                Product Suite
              </Badge>
            </div>
            <h1 style={{
              fontFamily: "'Akshar', sans-serif",
              fontSize: 'clamp(2.35rem, 4.8vw, 3.35rem)', fontWeight: 900,
              color: '#ffffff', lineHeight: 1.12, letterSpacing: '-0.026em',
              marginBottom: 22, maxWidth: 720, textWrap: 'balance',
            }}>
              Purpose-built tools for{' '}
              <span style={{ color: C.green }}>LTC pharmacy</span>
              {' '}operations
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 1.08vw, 1.06rem)', color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.76, maxWidth: 620, marginBottom: 36,
              fontWeight: 400, fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
              textWrap: 'pretty',
            }}>
              Every product was designed from inside the industry — not adapted from generic software. DEA compliance, CS inventory, LTC analytics, facility integrations, and more.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button variant="ctaWhite" size="lg" to="/schedule-demo">Schedule a Demo →</Button>
              <Button variant="secondaryDark" size="lg" to="/schedule-demo">Talk to Sales</Button>
            </div>
          </div>
        </section>

        <TabsBar tab={tab} setTab={setTab} />
        <GridSection visibleProducts={visibleProducts} />
        <CTASection />
      </main>

    </>
  )
}
