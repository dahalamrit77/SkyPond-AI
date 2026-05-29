import Link from 'next/link'
import C from '@/lib/tokens'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema, type BreadcrumbItem } from '@/components/seo/schemas/breadcrumb'

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  tone?: 'default' | 'light'
}

/**
 * Visual breadcrumb nav + automatic BreadcrumbList JSON-LD.
 * Server component — no client hooks needed.
 * Replaces src/components/Breadcrumb.jsx (which had no structured data).
 */
export function Breadcrumb({ items, tone = 'default' }: BreadcrumbProps) {
  const isLight = tone === 'light'

  const sepStyle = {
    color:      isLight ? 'rgba(255,255,255,0.45)' : C.muted,
    fontSize:   13,
    fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
    fontWeight: 300,
  }

  const linkStyle = {
    color:          isLight ? 'rgba(255,255,255,0.68)' : C.muted,
    fontSize:       13,
    textDecoration: 'none' as const,
    fontWeight:     300,
    fontFamily:     "'Gotham', 'Helvetica Neue', Arial, sans-serif",
  }

  const currentStyle = {
    color:      isLight ? '#fff' : C.body,
    fontSize:   13,
    fontWeight: 300,
    fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
  }

  return (
    <>
      {/* Structured data — parsed by Google, invisible to users */}
      <JsonLd data={buildBreadcrumbSchema(items)} />

      <div
        style={{
          background:   'transparent',
          borderBottom: 'none',
          padding:      '10px 5vw',
          marginTop:    64,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {i > 0 && <span style={sepStyle}>/</span>}
              {item.href ? (
                <Link
                  href={item.href}
                  style={linkStyle}
                  // Inline hover via CSS variable would require a class; keeping
                  // the original pattern: hover is handled declaratively here.
                >
                  {item.label}
                </Link>
              ) : (
                <span style={currentStyle}>{item.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
