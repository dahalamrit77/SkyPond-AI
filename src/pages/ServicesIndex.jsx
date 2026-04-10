import C from '../tokens.js'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'

const Badge = ({ c = C.p, children }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '4px 13px',
      borderRadius: 99,
      border: `1px solid ${c}28`,
      background: `${c}0B`,
      color: c,
      fontSize: 11.5,
      letterSpacing: '0.07em',
      textTransform: 'uppercase',
      fontWeight: 700,
    }}
  >
    {children}
  </span>
)

const SERVICES = [
  {
    icon: '🏥',
    color: C.p,
    title: 'LTC Pharmacy IT',
    desc: 'Telepharmacy apps, pharmacy-facility integration, migration, and custom reporting — exclusively for LTC.',
    href: '/services/ltc-pharmacy-it',
    tag: 'Core Service',
  },
  {
    icon: '⚙️',
    color: C.accent,
    title: 'AI Automation',
    desc: 'Intelligent workflow automation replacing manual bottlenecks: order entry, prior auth, compliance reporting, and more.',
    href: '/services/ai-automation',
    tag: 'High Demand',
  },
  {
    icon: '📊',
    color: C.violet,
    title: 'Data Analytics & Power BI',
    desc: 'Custom Power BI dashboards and automated data pipelines that make your pharmacy data genuinely actionable.',
    href: '/services/data-analytics',
    tag: 'Analytics',
  },
  {
    icon: '💻',
    color: C.p,
    title: 'Custom Development',
    desc: 'Full-stack applications — React, Node.js, Azure — built around your specific LTC workflows and integrations.',
    href: '/services/custom-development',
    tag: 'Development',
  },
  {
    icon: '☁️',
    color: C.accent,
    title: 'Microsoft Cloud',
    desc: 'Microsoft 365, Azure, and Power Platform properly configured for healthcare compliance and LTC operations.',
    href: '/services/microsoft-cloud',
    tag: 'Cloud',
  },
  {
    icon: '🔗',
    color: C.violet,
    title: 'PointClickCare Integration',
    desc: 'End-to-end PCC data bridges built and maintained by specialists who know both systems inside and out.',
    href: '/services/pointclickcare-integration',
    tag: 'Integration',
  },
]

function ServiceCard({ icon, color, title, desc, href, tag }) {
  const [h, setH] = useState(false)
  return (
    <Link
      to={href}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      <div
        style={{
          background: C.surface,
          border: `1.5px solid ${h ? color + '44' : C.border}`,
          borderRadius: 16,
          transition: 'all 0.2s',
          transform: h ? 'translateY(-4px)' : 'none',
          boxShadow: h ? `0 16px 40px ${color}1A` : '0 2px 8px rgba(0,0,0,0.04)',
          padding: '28px 24px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <span style={{ fontSize: 28, lineHeight: 1 }}>{icon}</span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              color,
            }}
          >
            {tag}
          </span>
        </div>
        <h3
          style={{
            fontSize: 'clamp(1.05rem,1.2vw,1.2rem)',
            fontWeight: 800,
            color: C.head,
            letterSpacing: '-0.02em',
            marginBottom: 10,
            fontFamily: "'DM Sans',system-ui,sans-serif",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 'clamp(0.93rem,1.05vw,1.02rem)',
            color: C.body,
            lineHeight: 1.72,
            flex: 1,
            marginBottom: 18,
          }}
        >
          {desc}
        </p>
        <span style={{ color, fontWeight: 700, fontSize: 14 }}>Learn more →</span>
      </div>
    </Link>
  )
}

function Hero() {
  return (
    <section
      style={{
        minHeight: '68vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 5vw 76px',
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(160deg,${C.dark} 0%,#0D2040 100%)`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(${C.p2}09 1px,transparent 1px),linear-gradient(90deg,${C.p2}09 1px,transparent 1px)`,
          backgroundSize: '52px 52px',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: -160,
          right: -60,
          width: 620,
          height: 620,
          borderRadius: '50%',
          background: `radial-gradient(circle,${C.p2}22 0%,transparent 68%)`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -60,
          left: -40,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle,${C.accent}26 0%,transparent 68%)`,
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ marginBottom: 20, animation: 'fadeUp 0.5s ease both' }}>
          <Badge c={C.p2}>⚙ All Services</Badge>
        </div>
        <h1
          style={{
            fontSize: 'clamp(2.2rem,4.8vw,3.6rem)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.028em',
            lineHeight: 1.1,
            fontFamily: "'DM Sans',system-ui,sans-serif",
            marginBottom: 22,
            animation: 'fadeUp 0.5s 0.08s ease both',
          }}
        >
          Everything Your LTC Pharmacy Needs — From One Team
        </h1>
        <p
          style={{
            maxWidth: 640,
            margin: '0 auto',
            color: 'rgba(255,255,255,0.68)',
            fontSize: '1.06rem',
            lineHeight: 1.78,
            animation: 'fadeUp 0.5s 0.14s ease both',
          }}
        >
          Six specialized services built exclusively for long-term care pharmacy. No generalist IT. No retrofitted solutions.
        </p>
      </div>
    </section>
  )
}

function ServicesGrid() {
  return (
    <section style={{ padding: '88px 5vw', background: C.surface }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 22,
          }}
        >
          {SERVICES.map((s) => (
            <ServiceCard key={s.href} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section
      style={{
        padding: '80px 5vw',
        background: `linear-gradient(160deg,${C.dark} 0%,#0D2040 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -120,
          right: -60,
          width: 460,
          height: 460,
          borderRadius: '50%',
          background: `radial-gradient(circle,${C.p2}22 0%,transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -50,
          left: 0,
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: `radial-gradient(circle,${C.accent}28 0%,transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <h2
          style={{
            fontSize: 'clamp(1.65rem,2.4vw,2.1rem)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.02em',
            marginBottom: 20,
            fontFamily: "'DM Sans',system-ui,sans-serif",
            lineHeight: 1.15,
          }}
        >
          Not sure which service fits your situation?
        </h2>
        <Link
          to="/schedule-demo"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 26px',
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 14.5,
            textDecoration: 'none',
            fontFamily: 'inherit',
            transition: 'all 0.15s',
            background: C.surface,
            color: C.p,
            boxShadow: '0 2px 14px rgba(0,0,0,0.1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none'
          }}
        >
          Schedule a Free Discovery Call →
        </Link>
      </div>
    </section>
  )
}

export default function ServicesIndex() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServicesGrid />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
