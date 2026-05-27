import C from '../tokens.js'
import { Button } from './ui/Button.jsx'

export const STAT_GREEN = '#4a8c3f'
/** Supporting copy — shared by hero paragraph + stat labels (darker than C.muted) */
export const HERO_SUPPORTING = C.body

/**
 * Centered product-page hero (Document Automation reference layout).
 * Same spacing, typography, colors, and stat bar on every product page.
 */
export function ProductHero({ badge, title, description, stats, after = null }) {
  return (
    <>
      <section style={{ minHeight: 'auto', padding: '28px 5vw 72px', background: C.bg }}>
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          animation: 'fadeUp 0.6s ease both',
        }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 14px',
            borderRadius: 999,
            background: 'rgba(21,40,68,0.08)',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: C.p,
            fontFamily: "'Akshar', sans-serif",
            marginBottom: 22,
          }}>
            <span style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: STAT_GREEN,
              flexShrink: 0,
            }} />
            {badge}
          </span>

          <h1 style={{
            fontFamily: "'Akshar', sans-serif",
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: '-1.5px',
            lineHeight: 1.12,
            color: C.head,
            marginBottom: 18,
            maxWidth: 780,
            width: '100%',
            textWrap: 'balance',
          }}>
            {title}
          </h1>

          <p style={{
            fontSize: 15,
            color: HERO_SUPPORTING,
            lineHeight: 1.7,
            maxWidth: 760,
            width: '100%',
            marginBottom: 32,
            fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: 400,
          }}>
            {description}
          </p>

          <div style={{
            display: 'flex',
            gap: 14,
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: 52,
          }}>
            <Button variant="primary" size="lg" to="/schedule-demo">Schedule a Demo →</Button>
            <Button variant="secondary" size="lg" onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}>
              See How It Works ↓
            </Button>
          </div>

          <div style={{
            width: '100%',
            maxWidth: 900,
            borderTop: `1px solid ${C.border}`,
            borderBottom: `1px solid ${C.border}`,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
          }}>
            {stats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: '28px 20px',
                  borderRight: i < stats.length - 1 ? `1px solid ${C.border}` : 'none',
                }}
              >
                <div style={{
                  fontFamily: "'Akshar', sans-serif",
                  fontSize: 28,
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: 8,
                  color: STAT_GREEN,
                }}>
                  {s.num}
                </div>
                <div style={{
                  fontSize: 11,
                  color: HERO_SUPPORTING,
                  lineHeight: 1.45,
                  fontWeight: 500,
                  fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {after}
    </>
  )
}
