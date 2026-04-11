import C from '../tokens.js'
import { useState } from 'react'
import { Button } from '../components/ui/Button.jsx'
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'
import { Search, ClipboardList, Pill, TrendingUp, Link as LinkIcon, FileText } from 'lucide-react'

const Badge = ({ c = C.p2, children }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '4px 13px',
      borderRadius: 99,
      border: `1px solid ${c}28`,
      background: `${c}18`,
      color: c,
      fontSize: 11.5,
      letterSpacing: '0.07em',
      textTransform: 'uppercase',
      fontWeight: 500,
      fontFamily: "'Akshar', sans-serif",
    }}
  >
    {children}
  </span>
)

const PRODUCTS = [
  {
    icon: <Search size={30} />,
    color: C.p,
    tag: 'Compliance',
    title: 'DEA Lookup Tool',
    desc: 'Real-time DEA registration verification, bulk prescriber lookups, instant flags on expired/invalid registrations — with full audit trail.',
    metric: '90% faster',
    ml: 'vs manual lookup',
    href: '/products/dea-lookup',
  },
  {
    icon: <ClipboardList size={30} />,
    color: C.accent,
    tag: 'Compliance',
    title: 'DEA Compliance Reporting',
    desc: 'Automated ARCOS reporting, DEA Form 222 tracking, discrepancy detection, and scheduled archival.',
    metric: '8 hrs saved',
    ml: 'per week',
    href: '/products/dea-compliance-reporting',
  },
  {
    icon: <Pill size={30} />,
    color: C.violet,
    tag: 'Inventory',
    title: 'CS Inventory Management',
    desc: 'Real-time CS tracking, discrepancy alerts, per-transaction audit trails, biennial inventory support, and multi-facility management.',
    metric: '99.8%',
    ml: 'inventory accuracy',
    href: '/products/cs-inventory',
  },
  {
    icon: <TrendingUp size={30} />,
    color: C.p,
    tag: 'Analytics',
    title: 'LTC Analytics Dashboard',
    desc: 'Dispensing trends, facility benchmarking, error rate tracking, census-to-dispensing correlation, and executive-ready report exports.',
    metric: '3×',
    ml: 'faster decisions',
    href: '/products/ltc-analytics',
  },
  {
    icon: <LinkIcon size={30} />,
    color: C.accent,
    tag: 'Integration',
    title: 'PointClickCare Data Feed',
    desc: 'Live bidirectional PCC sync — MAR updates, ADT event handling, order reconciliation, and HIPAA-compliant data transmission.',
    metric: 'Zero',
    ml: 'duplicate manual entry',
    href: '/products/pointclickcare-feed',
  },
  {
    icon: <FileText size={30} />,
    color: C.violet,
    tag: 'Automation',
    title: 'Document Automation',
    desc: 'AI-powered prior auth generation, compliance document templating, e-signature integration, fax automation, and audit-ready archival.',
    metric: '75% less',
    ml: 'processing time',
    href: '/products/document-automation',
  },
]

function ProductCard({ icon, color, tag, title, desc }) {
  const [h, setH] = useState(false)
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: C.surface,
        border: `1.5px solid ${h ? C.p2 : C.border}`,
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
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
        <span style={{ fontSize: 30, lineHeight: 1 }}>{icon}</span>
        <Badge c={color}>{tag}</Badge>
      </div>
      <h3
        style={{
          fontSize: 'clamp(1.05rem,1.2vw,1.22rem)',
          fontWeight: 500,
          color: C.head,
          letterSpacing: '-0.02em',
          marginBottom: 10,
          fontFamily: "'Akshar', sans-serif",
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
          marginBottom: 0,
          fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
          fontWeight: 400,
        }}
      >
        {desc}
      </p>
    </div>
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
          <Badge c={C.p2}>📦 All Products</Badge>
        </div>
        <h1
          style={{
            fontSize: 'clamp(2.1rem,4.6vw,3.5rem)',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.028em',
            lineHeight: 1.1,
            fontFamily: "'Akshar', sans-serif",
            marginBottom: 22,
            animation: 'fadeUp 0.5s 0.08s ease both',
          }}
        >
          Six Products Built for Problems No One Else Is Solving
        </h1>
        <p
          style={{
            maxWidth: 640,
            margin: '0 auto',
            color: 'rgba(255,255,255,0.68)',
            fontSize: '1.06rem',
            lineHeight: 1.78,
            animation: 'fadeUp 0.5s 0.14s ease both',
            fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: 400,
          }}
        >
          DEA compliance, controlled substance tracking, LTC analytics, and more — purpose-built for LTC pharmacy.
        </p>
      </div>
    </section>
  )
}

function ProductsGrid() {
  return (
    <section style={{ padding: '88px 5vw', background: C.alt }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 22,
          }}
        >
          {PRODUCTS.map((p) => (
            <ProductCard key={p.href} {...p} />
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
        background: C.p,
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
          background: 'radial-gradient(circle at 70% 50%, rgba(255,255,255,0.04) 0%, transparent 60%)',
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
          background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <h2
          style={{
            fontSize: 'clamp(1.65rem,2.4vw,2.1rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            marginBottom: 20,
            fontFamily: "'Akshar', sans-serif",
            lineHeight: 1.15,
          }}
        >
          See the Platform in Action
        </h2>
        <Button variant="primaryDark" size="md" to="/schedule-demo">
          Schedule a Demo →
        </Button>
      </div>
    </section>
  )
}

export default function ProductsIndex() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductsGrid />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
