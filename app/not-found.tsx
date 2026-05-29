'use client'

import { Button } from '@/components/ui/Button'
import C from '@/lib/tokens'
import { CONTACT_EMAIL } from '@/lib/constants'

/**
 * 404 Not Found — migrated from src/pages/NotFound.jsx.
 * Zero style changes.
 * Must be 'use client' for onMouseEnter on the email link.
 */
export default function NotFound() {
  return (
    <>
      <main>
        <section
          style={{
            minHeight:      'calc(100vh - 64px)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            padding:        '88px 5vw 64px',
            position:       'relative',
            overflow:       'hidden',
            background:     `linear-gradient(160deg,${C.dark} 0%,#0D2040 100%)`,
          }}
        >
          {/* Background grid */}
          <div style={{
            position:            'absolute', inset: 0,
            backgroundImage:     `linear-gradient(${C.p2}09 1px,transparent 1px),linear-gradient(90deg,${C.p2}09 1px,transparent 1px)`,
            backgroundSize:      '52px 52px',
            pointerEvents:       'none',
          }} />
          {/* Glow orbs */}
          <div style={{ position:'absolute', top:-140, right:-80, width:520, height:520, borderRadius:'50%',
            background:`radial-gradient(circle,${C.p2}20 0%,transparent 68%)`, pointerEvents:'none' }} />
          <div style={{ position:'absolute', bottom:-80, left:-60, width:400, height:400, borderRadius:'50%',
            background:`radial-gradient(circle,${C.accent}24 0%,transparent 68%)`, pointerEvents:'none' }} />

          <div style={{
            position:  'relative', zIndex: 1, textAlign: 'center',
            maxWidth:  520,
            animation: 'fadeUp 0.55s ease both',
          }}>
            {/* 404 numeral */}
            <div style={{
              fontSize:              'clamp(4rem,14vw,7.5rem)',
              fontWeight:            700,
              lineHeight:            0.95,
              letterSpacing:         '-0.05em',
              fontFamily:            "'Akshar', sans-serif",
              background:            `linear-gradient(135deg,${C.p},${C.accent})`,
              WebkitBackgroundClip:  'text',
              WebkitTextFillColor:   'transparent',
              backgroundClip:        'text',
              marginBottom:          16,
            }}>
              404
            </div>

            <h1 style={{
              fontSize:      'clamp(1.5rem,3vw,2rem)',
              fontWeight:    700,
              color:         '#fff',
              letterSpacing: '-0.03em',
              lineHeight:    1.2,
              fontFamily:    "'Akshar', sans-serif",
              marginBottom:  12,
            }}>
              Page Not Found
            </h1>

            <p style={{
              color:       'rgba(255,255,255,0.65)',
              fontSize:    'clamp(0.98rem,1.2vw,1.06rem)',
              lineHeight:  1.65,
              marginBottom:32,
              fontFamily:  "'Gotham', 'Helvetica Neue', Arial, sans-serif",
              fontWeight:  400,
            }}>
              The page you&apos;re looking for doesn&apos;t exist or may have moved.
            </p>

            <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', marginBottom:28 }}>
              <Button variant="primaryDark" size="md" to="/">← Back to Home</Button>
              <Button variant="secondaryDark" size="md" to="/services">View Our Services →</Button>
            </div>

            <p style={{
              color:      'rgba(255,255,255,0.45)',
              fontSize:   13,
              lineHeight: 1.6,
              fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
              fontWeight: 300,
            }}>
              Looking for something specific? Email us at{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                style={{ color:'rgba(255,255,255,0.75)', fontWeight:600, textDecoration:'none' }}
                onMouseEnter={e => { e.currentTarget.style.textDecoration = 'underline' }}
                onMouseLeave={e => { e.currentTarget.style.textDecoration = 'none' }}
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
