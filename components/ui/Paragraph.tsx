import type { CSSProperties } from 'react'
import C from '@/lib/tokens'

interface ParagraphProps {
  style?: CSSProperties
  children: React.ReactNode
}

/**
 * Body-copy paragraph primitive — replaces the local `P` component
 * copy-pasted across every page. Matches the original inline-style exactly.
 */
export function Paragraph({ style = {}, children }: ParagraphProps) {
  return (
    <p
      style={{
        fontSize:   'clamp(0.96rem,1.1vw,1.04rem)',
        color:      C.body,
        lineHeight: 1.76,
        fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
        fontWeight: 400,
        ...style,
      }}
    >
      {children}
    </p>
  )
}
