'use client'

import { useState } from 'react'
import {
  BarChart2, Zap, Plug, RefreshCw, LayoutDashboard,
  LineChart, Activity, Building2, Star, Database,
  CheckCircle, ChevronRight, ClipboardList, Package,
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

/* ── Mockup frame (always dark, regardless of page theme) ── */
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

/* ── Light-themed diagram strip nodes and connectors ──
   This page's diagram strip sits on C.surface (white), unlike the
   dark-bg strip used in CS Inventory / Document Automation. ── */
function DiagNodeLight({ icon, title, sub, pills = [], special = false }: { [key: string]: any }) {
  return (
    <div style={{
      background: special ? `${C.green}18` : C.surface,
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
              fontSize: 10, background: C.bg, border: `1px solid ${C.border}`,
              color: C.body, borderRadius: 6, padding: '4px 8px',
            }}>{p}</div>
          ))}
        </div>
      )}
    </div>
  )
}

function DiagConnLight({ tag }: { [key: string]: any }) {
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

/* ── DiagramStrip is a sibling of Hero in this page, not nested inside it ── */
function DiagramStrip() {
  return (
    <div style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: '44px 5vw 48px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: C.muted, marginBottom: 32, textAlign: 'center',
        }}>How your data becomes insight</div>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 200px 1fr 200px', alignItems: 'center' }}>
          <DiagNodeLight
            icon={<Database size={28} color={C.body} />}
            title="Your Data Sources"
            sub="Pharmacy system, billing, PCC feed, and facility data"
            pills={['Dispense records', 'Claims data', 'Census & payor']}
          />
          <DiagConnLight tag="ingested & normalized" />
          <DiagNodeLight
            icon={<Zap size={28} color={C.green} />}
            title="Skypond Analytics"
            sub="LTC-specific data models, daily refresh"
            special
          />
          <DiagConnLight tag="delivered as dashboards" />
          <DiagNodeLight
            icon={<BarChart2 size={28} color={C.body} />}
            title="Your Dashboards"
            sub="Ops, clinical, finance, and exec views"
            pills={['Facility performance', 'Cost analytics', 'Compliance KPIs']}
          />
        </div>
      </div>
    </div>
  )
}

/* ── Feature mockups ── */
function MockupFacilityPerformance() {
  const muted = 'rgba(255,255,255,0.45)'
  const bright = 'rgba(255,255,255,0.85)'
  const facilities = [
    { name: 'Sunrise SNF',           cost: '$42.18/resident/day',   color: C.green,    bar: '82%', sub: '142 residents · 96% adherence', alert: false },
    { name: 'Maplewood Care Center', cost: '$38.44/resident/day',   color: '#7eb8f7',  bar: '74%', sub: '87 residents · 91% adherence',  alert: false },
    { name: 'Valley View SNF',       cost: '$61.09/resident/day ↑', color: '#f5c96a',  bar: '91%', sub: '⚠ Cost outlier — 203 residents · Review recommended', alert: true },
  ]
  return (
    <Mockup title="Facility Performance — All Locations">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: bright, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Utilization by Facility · April 2026
        </div>
        <div style={{ fontSize: 11, color: muted }}>Updated today</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {facilities.map((f: any, i: any) => (
          <div key={i} style={{
            background: f.alert ? 'rgba(245,158,11,0.07)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${f.alert ? 'rgba(245,158,11,0.18)' : 'rgba(255,255,255,0.07)'}`,
            borderRadius: 10, padding: '12px 14px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: bright, fontWeight: 500 }}>{f.name}</span>
              <span style={{ fontSize: 11, color: f.color, fontWeight: 600 }}>{f.cost}</span>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 100, overflow: 'hidden', marginBottom: 4 }}>
              <div style={{ width: f.bar, height: '100%', background: f.color, borderRadius: 100 }} />
            </div>
            <div style={{ fontSize: 10, color: f.alert ? '#f5c96a' : muted }}>{f.sub}</div>
          </div>
        ))}
      </div>
    </Mockup>
  )
}

function MockupCostMargin() {
  const muted = 'rgba(255,255,255,0.45)'
  const bright = 'rgba(255,255,255,0.88)'
  const drivers = [
    { label: 'Specialty injectables', value: '+$8.42/res/day', color: C.red   },
    { label: 'Wound care supplies',   value: '+$3.16/res/day', color: '#f5c96a' },
    { label: 'Formulary conversions', value: '-$1.88/res/day', color: C.green },
  ]
  return (
    <Mockup title="Cost & Margin Dashboard">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        <div style={{ background: `${C.green}14`, border: `1px solid ${C.green}33`, borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 11, color: muted, marginBottom: 6 }}>Avg Cost / Resident Day</div>
          <div style={{ fontFamily: "'Akshar', sans-serif", fontSize: 28, fontWeight: 900, color: C.green }}>$44.21</div>
          <div style={{ fontSize: 11, color: C.green }}>↓ $2.14 vs last month</div>
        </div>
        <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 11, color: muted, marginBottom: 6 }}>Portfolio Margin</div>
          <div style={{ fontFamily: "'Akshar', sans-serif", fontSize: 28, fontWeight: 900, color: '#7eb8f7' }}>18.4%</div>
          <div style={{ fontSize: 11, color: '#7eb8f7' }}>↑ 1.2% vs last quarter</div>
        </div>
      </div>
      <div style={{ fontSize: 11, color: muted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
        Top Cost Drivers This Month
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {drivers.map((d: any, i: any) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '8px 12px' }}>
            <span style={{ color: bright }}>{d.label}</span>
            <span style={{ color: d.color, fontWeight: 600 }}>{d.value}</span>
          </div>
        ))}
      </div>
    </Mockup>
  )
}

function MockupKPIDashboard() {
  const muted = 'rgba(255,255,255,0.45)'
  const bright = 'rgba(255,255,255,0.85)'
  return (
    <Mockup title="Custom KPI Dashboard Builder">
      <div style={{ fontSize: 12, fontWeight: 600, color: bright, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
        Operations Director View
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 14, textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: muted, marginBottom: 6 }}>Active Facilities</div>
          <div style={{ fontFamily: "'Akshar', sans-serif", fontSize: 28, fontWeight: 900, color: bright }}>24</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 14, textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: muted, marginBottom: 6 }}>Portfolio Adherence</div>
          <div style={{ fontFamily: "'Akshar', sans-serif", fontSize: 28, fontWeight: 900, color: C.green }}>93.4%</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ background: `${C.red}12`, border: `1px solid ${C.red}30`, borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 12, color: C.red, fontWeight: 600 }}>Facilities needing attention</div>
            <div style={{ fontSize: 11, color: muted }}>Cost outlier or adherence below 85%</div>
          </div>
          <div style={{ fontFamily: "'Akshar', sans-serif", fontSize: 20, color: C.red, fontWeight: 800 }}>3</div>
        </div>
        <div style={{ background: `${C.green}0A`, border: `1px solid ${C.green}2E`, borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>Top performing facilities</div>
            <div style={{ fontSize: 11, color: muted }}>On target cost and adherence</div>
          </div>
          <div style={{ fontFamily: "'Akshar', sans-serif", fontSize: 20, color: C.green, fontWeight: 800 }}>18</div>
        </div>
      </div>
    </Mockup>
  )
}

/* ── Page sections ── */

function Hero() {
  return (
    <ProductHero
      badge="Analytics Platform"
      title={(
        <>
          Pharmacy analytics built for
          <br />
          <span style={{ color: C.p }}>long-term care</span>
          {' '}— not retail
        </>
      )}
      description="Surface the metrics that actually drive LTC pharmacy performance: utilization by facility, medication adherence rates, cost per resident day, and compliance KPIs. Built on data models that make sense for how LTC pharmacy actually works."
      stats={[
        { num: '50+', label: 'Pre-built LTC-specific reports' },
        { num: 'Daily', label: 'Data refresh cadence' },
        { num: 'Multi-facility', label: 'Benchmarking views' },
        { num: 'Custom', label: 'KPI dashboard builder' },
      ]}
    />
  )
}

function Features() {
  const features = [
    {
      title: 'Facility-level performance benchmarking',
      desc: 'Break down utilization, adherence rates, and cost metrics facility by facility. Identify outliers, underperformers, and opportunities across your entire book of business — without pulling a dozen spreadsheets together.',
      checks: [
        'Per-facility cost per resident day tracking',
        'Medication adherence rate by facility and unit',
        'Side-by-side facility benchmarking views',
        'Automatic flagging of cost or adherence outliers',
      ],
      mockup: <MockupFacilityPerformance />,
      reverse: false,
    },
    {
      title: 'Cost and margin analytics — by facility, drug, and month',
      desc: 'Monitor cost per resident day, cost per dispense, and facility-level margin. Surface high-cost outliers and identify formulary optimization opportunities that finance and ops can actually act on.',
      checks: [
        'Cost per resident day tracked and trended over time',
        'Top cost drivers surfaced automatically each period',
        'Margin analytics by facility and portfolio',
        'Formulary optimization opportunity identification',
      ],
      mockup: <MockupCostMargin />,
      reverse: true,
    },
    {
      title: 'Custom KPI dashboards — configured for each role',
      desc: 'Your VP of Operations, your clinical pharmacist, and your finance team all need different views of the same data. The dashboard builder lets each role configure exactly the metrics they own — without needing IT to build it.',
      desc2: 'Reports can be scheduled for automated delivery to facility partners, management, or compliance stakeholders.',
      checks: [
        'Drag-and-drop dashboard builder — no IT required',
        'Role-specific views: ops, clinical, finance, exec',
        'Scheduled report delivery on any cadence',
        'Export to PDF or Excel for stakeholder meetings',
      ],
      mockup: <MockupKPIDashboard />,
      reverse: false,
    },
  ]
  return (
    <section id="features" style={{ padding: '88px 5vw', background: C.surface }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 52 }}>
          <div style={{ marginBottom: 14 }}><Badge c={C.p}>Capabilities</Badge></div>
          <H size="h2" style={{ marginBottom: 12 }}>The metrics that matter in LTC pharmacy, surfaced automatically</H>
          <P style={{ maxWidth: 580 }}>Most analytics tools were built for retail pharmacy. LTC Analytics was built for long-term care — with the data models and KPIs that reflect how your operation actually works.</P>
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
    { n: '01', icon: <Plug size={26} color={C.green} />,           bg: `${C.green}18`, title: 'Connect data sources',          desc: 'We ingest data from your pharmacy system, billing platform, and facility feeds. Most integrations complete in days, not months.' },
    { n: '02', icon: <RefreshCw size={26} color={C.p} />,          bg: `${C.p}18`,     title: 'Data normalized to LTC models',  desc: 'Incoming data is cleaned, validated, and organized into LTC-specific data models with consistent metric definitions.' },
    { n: '03', icon: <BarChart2 size={26} color={C.amber} />,       bg: `${C.amber}18`, title: '50+ reports ready on day one',   desc: 'Pre-built LTC pharmacy reports covering facility performance, drug utilization, and compliance KPIs are available immediately.' },
    { n: '04', icon: <LayoutDashboard size={26} color={C.green} />, bg: `${C.green}18`, title: 'Build and share custom views',   desc: 'Use the dashboard builder to create custom views for each team and schedule automated delivery to stakeholders.' },
  ]
  return (
    <section id="how" style={{ padding: '88px 5vw', background: C.bg }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ marginBottom: 14 }}><Badge c={C.p}>How It Works</Badge></div>
          <H size="h2" style={{ marginBottom: 14 }}>From data connection to working dashboards</H>
          <P style={{ maxWidth: 440, margin: '0 auto' }}>Most integrations are live within days. Pre-built reports are available on day one — no configuration required.</P>
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

/* UseCases: C.alt background with WHITE cards, dark text, navy result links.
   Completely different card style from the dark-themed product pages. */
function UseCases() {
  const cases = [
    { icon: <LineChart size={30} color={C.green} />,  iconBg: `${C.green}18`,         title: 'Facility contract reviews',        desc: 'Go into quarterly reviews with facility administrators armed with data — utilization trends, adherence rates, and cost benchmarks — not gut feel. Make the case for your value with numbers.',           result: 'Data-backed contract conversations' },
    { icon: <Activity size={30} color="#7eb8f7" />,   iconBg: 'rgba(59,130,246,0.12)', title: 'Clinical program monitoring',      desc: 'Track high-risk medication utilization, polypharmacy patterns, and adherence gaps to support clinical pharmacist interventions — before a resident event triggers a formal review.',                    result: 'Early identification of clinical risk' },
    { icon: <Building2 size={30} color="#f5c96a" />,  iconBg: 'rgba(245,158,11,0.12)', title: 'Operations leadership visibility', desc: 'Give your VP of Operations a single view across all facilities and locations — cost, adherence, and outliers — without pulling a dozen spreadsheets together every week.',                              result: 'Portfolio visibility in one view' },
    { icon: <Star size={30} color="#c79cf7" />,       iconBg: 'rgba(168,85,247,0.12)', title: 'Business development',             desc: 'Use facility-level benchmarking data to demonstrate value when pitching new facility accounts — or to renegotiate contracts where your performance clearly exceeds expectations.',                result: 'Data that wins and retains facility contracts' },
  ]
  return (
    <section style={{ padding: '96px 5vw 100px', background: C.alt }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 52 }}>
          <div style={{ marginBottom: 14 }}><Badge c={C.green}>Who It's For</Badge></div>
          <H size="h2" style={{ marginBottom: 12 }}>Analytics that drive real LTC pharmacy decisions</H>
          <P style={{ maxWidth: 580 }}>The best analytics are the ones that show up at exactly the right moment — before the meeting, before the review, before the problem becomes a crisis.</P>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {cases.map((c: any, i: any) => (
            <div key={i}
              style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 18, padding: 32, display: 'grid', gridTemplateColumns: '64px 1fr', gap: 20, alignItems: 'start', boxShadow: '0 2px 12px rgba(20,49,86,0.06)', transition: 'border-color 0.25s, box-shadow 0.25s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.green}88`; e.currentTarget.style.boxShadow = '0 10px 32px rgba(20,49,86,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = '0 2px 12px rgba(20,49,86,0.06)' }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: c.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.icon}</div>
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: C.head, marginBottom: 8, lineHeight: 1.3, fontFamily: "'Akshar', sans-serif" }}>{c.title}</h4>
                <p style={{ fontSize: 13.5, color: C.body, lineHeight: 1.65, fontWeight: 300, fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif" }}>{c.desc}</p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 14, fontSize: 12, fontWeight: 600, color: C.p }}>→ {c.result}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Security() {
  const items = [
    { title: 'HIPAA BAA Included',              sub: 'Business Associate Agreement with every deployment' },
    { title: 'Role-Based Data Access',           sub: 'Granular permissions on who sees which facilities' },
    { title: 'SOC 2 Type II',                    sub: 'Independently audited security controls' },
    { title: 'Encrypted Data Pipeline',          sub: 'All data encrypted in transit and at rest' },
    { title: 'Audit-Ready Export',               sub: 'All reports available for compliance or inspection use' },
    { title: 'No PHI Leaves Your Environment',   sub: 'Patient data stays within your data perimeter' },
  ]
  return (
    <section style={{ padding: '0 5vw 88px', background: C.dark }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 64 }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ marginBottom: 14 }}><Badge c={C.green}>Security &amp; Compliance</Badge></div>
          <H size="h2" color="#fff" style={{ marginBottom: 12 }}>Data you can trust. Security you can rely on.</H>
          <P style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 580 }}>All pharmacy and patient data is handled under HIPAA Business Associate Agreement. Role-based access ensures the right people see the right data — nothing more.</P>
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
    { icon: <Plug size={20} color={C.p} />,          title: 'PointClickCare Feed',      desc: 'Connect PCC census and payor data for a complete facility performance picture.',             href: '/products/pointclickcare-feed' },
    { icon: <ClipboardList size={20} color={C.p} />, title: 'DEA Compliance Reporting', desc: 'Add compliance reporting metrics alongside your operational analytics.',                       href: '/products/dea-compliance-reporting' },
    { icon: <Package size={20} color={C.p} />,       title: 'CS Inventory',             desc: 'Pull CS dispensing data into analytics for a full controlled substance utilization view.',     href: '/products/cs-inventory' },
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

/* CTA: light-themed (C.bg) — matches hero. Dark text, standard Button variants. */
function CTA() {
  return (
    <section style={{ padding: '80px 5vw', background: C.bg, borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
        <div>
          <H size="h2" style={{ marginBottom: 12 }}>See your data come to life</H>
          <P style={{ color: C.muted, maxWidth: 520 }}>
            We'll connect to your data and show you a working dashboard in your first demo — not a slide deck.
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
export function LtcAnalyticsContent() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'LTC Analytics' }]} />
      <main>
        <Hero />
        <DiagramStrip />
        <Features />
        <HowItWorks />
        <UseCases />
        <Security />
        <Related />
        <CTA />
      </main>
    </>
  )
}