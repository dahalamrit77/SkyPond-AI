import type { CSSProperties } from 'react'
import C from '@/lib/tokens'

interface BadgeProps {
  c?: string
  style?: CSSProperties
  children: React.ReactNode
}

/**
 * Inline badge pill — replaces the local `Badge` primitive copy-pasted
 * across every page. Matches the original inline-style exactly.
 */
export function Badge({ c = C.p2, style = {}, children }: BadgeProps) {
  return (
    <span
      style={{
        display:       'inline-flex',
        alignItems:    'center',
        gap:           5,
        padding:       '4px 13px',
        borderRadius:  99,
        border:        `1px solid ${c}28`,
        background:    `${c}18`,
        color:         c,
        fontSize:      11.5,
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        fontWeight:    500,
        fontFamily:    "'Akshar', sans-serif",
        ...style,
      }}
    >
      {children}
    </span>
  )
}
