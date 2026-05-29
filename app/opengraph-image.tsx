/**
 * app/opengraph-image.tsx — Default Open Graph image
 *
 * Rendered at the edge via @vercel/og (bundled in next/og).
 * Served at /opengraph-image and automatically referenced by Next.js as the
 * default OG image for any page that doesn't define its own.
 *
 * Dimensions: 1200 × 630 (standard OG image ratio).
 *
 * Design: dark brand background (C.dark = #143156), Akshar wordmark,
 * tagline, and the six product pillars listed below the fold.
 * Uses only system/web-safe fonts + embedded SVG — no external font fetching
 * at edge runtime (Akshar is not available via @vercel/og's font API yet).
 */
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt     = 'SkyPond Tech — The Complete LTC Pharmacy Technology Platform'
export const size    = { width: 1200, height: 630 }
export const contentType = 'image/png'

const DARK    = '#143156'
const LIGHT   = '#C6DBE7'
const ACCENT  = '#8AB8E3'
const GREEN   = '#83B762'
const WHITE   = '#FFFFFF'
const MUTED   = 'rgba(255,255,255,0.55)'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width:          '100%',
          height:         '100%',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'space-between',
          background:     DARK,
          padding:        '64px 72px',
          position:       'relative',
          overflow:       'hidden',
        }}
      >
        {/* Background radial glow */}
        <div style={{
          position:     'absolute',
          top:          -120,
          right:        -80,
          width:        520,
          height:       520,
          borderRadius: '50%',
          background:   `radial-gradient(circle, ${ACCENT}22 0%, transparent 68%)`,
        }} />
        <div style={{
          position:     'absolute',
          bottom:       -80,
          left:         -60,
          width:        380,
          height:       380,
          borderRadius: '50%',
          background:   `radial-gradient(circle, ${ACCENT}14 0%, transparent 68%)`,
        }} />

        {/* Top: Logo + badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Green dot + wordmark */}
            <div style={{
              width: 10, height: 10, borderRadius: '50%',
              background: GREEN, boxShadow: `0 0 10px ${GREEN}`,
              marginTop: 2,
            }} />
            <span style={{
              fontSize:      32,
              fontWeight:    700,
              color:         WHITE,
              letterSpacing: '-0.02em',
              fontFamily:    'system-ui, sans-serif',
            }}>SkyPond Tech</span>
          </div>
          <span style={{
            fontSize:      13,
            fontWeight:    600,
            color:         ACCENT,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            border:        `1px solid ${ACCENT}44`,
            padding:       '6px 16px',
            borderRadius:  999,
            background:    `${ACCENT}18`,
          }}>LTC Pharmacy Technology</span>
        </div>

        {/* Main headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{
            fontSize:      68,
            fontWeight:    800,
            color:         WHITE,
            lineHeight:    1.08,
            letterSpacing: '-0.03em',
            fontFamily:    'system-ui, sans-serif',
          }}>
            The Complete LTC
            <br />
            <span style={{ color: ACCENT }}>Pharmacy Platform.</span>
          </div>
          <div style={{
            fontSize:   22,
            color:      MUTED,
            lineHeight: 1.55,
            maxWidth:   680,
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 400,
          }}>
            DEA compliance · CS inventory · AI automation ·
            PointClickCare integration · LTC analytics
          </div>
        </div>

        {/* Bottom: 6 product pills */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[
            'DEA Compliance Reporting',
            'CS Inventory',
            'LTC Analytics',
            'PointClickCare Feed',
            'Document Automation',
          ].map((label) => (
            <div
              key={label}
              style={{
                fontSize:     13,
                fontWeight:   600,
                color:        LIGHT,
                background:   'rgba(255,255,255,0.07)',
                border:       '1px solid rgba(255,255,255,0.14)',
                borderRadius: 8,
                padding:      '8px 16px',
                fontFamily:   'system-ui, sans-serif',
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
