import C from '../tokens.js'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <section
          style={{
            minHeight: 'calc(100vh - 64px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '88px 5vw 64px',
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
              top: -140,
              right: -80,
              width: 520,
              height: 520,
              borderRadius: '50%',
              background: `radial-gradient(circle,${C.p2}20 0%,transparent 68%)`,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -80,
              left: -60,
              width: 400,
              height: 400,
              borderRadius: '50%',
              background: `radial-gradient(circle,${C.accent}24 0%,transparent 68%)`,
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
              maxWidth: 520,
              animation: 'fadeUp 0.55s ease both',
            }}
          >
            <div
              style={{
                fontSize: 'clamp(4rem, 14vw, 7.5rem)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.05em',
                fontFamily: "'DM Sans',system-ui,sans-serif",
                background: `linear-gradient(135deg,${C.p},${C.accent})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: 16,
              }}
            >
              404
            </div>
            <h1
              style={{
                fontSize: 'clamp(1.5rem,3vw,2rem)',
                fontWeight: 800,
                color: '#fff',
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                fontFamily: "'DM Sans',system-ui,sans-serif",
                marginBottom: 12,
              }}
            >
              Page Not Found
            </h1>
            <p
              style={{
                color: 'rgba(255,255,255,0.65)',
                fontSize: 'clamp(0.98rem,1.2vw,1.06rem)',
                lineHeight: 1.65,
                marginBottom: 32,
              }}
            >
              The page you&apos;re looking for doesn&apos;t exist or may have moved.
            </p>
            <div
              style={{
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: 28,
              }}
            >
              <Link
                to="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 14.5,
                  textDecoration: 'none',
                  fontFamily: 'inherit',
                  transition: 'all 0.15s',
                  background: `linear-gradient(135deg,${C.p},${C.pd})`,
                  color: '#fff',
                  boxShadow: `0 4px 22px ${C.p}50`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none'
                }}
              >
                ← Back to Home
              </Link>
              <Link
                to="/services"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 14.5,
                  textDecoration: 'none',
                  fontFamily: 'inherit',
                  transition: 'all 0.15s',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.88)',
                  border: '1.5px solid rgba(255,255,255,0.28)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                View Our Services →
              </Link>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 1.6 }}>
              Looking for something specific? Email us at{' '}
              <a
                href="mailto:info@skypondtech.com"
                style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600, textDecoration: 'none' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none'
                }}
              >
                info@skypondtech.com
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
