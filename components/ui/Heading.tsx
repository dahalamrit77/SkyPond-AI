import type { CSSProperties } from 'react'
import C from '@/lib/tokens'

type HeadingSize = 'hero' | 'h1' | 'h2' | 'h3'

interface HeadingProps {
  size?: HeadingSize
  style?: CSSProperties
  color?: string
  children: React.ReactNode
}

const FONT_SIZES: Record<HeadingSize, string> = {
  hero: 'clamp(2.5rem,5.2vw,4.2rem)',
  h1:   'clamp(2.5rem,5.2vw,4.2rem)',
  h2:   'clamp(1.85rem,2.8vw,2.6rem)',
  h3:   '1.22rem',
}

const TAG_MAP: Record<HeadingSize, 'h1' | 'h2' | 'h3'> = {
  hero: 'h1',
  h1:   'h1',
  h2:   'h2',
  h3:   'h3',
}

/**
 * Shared heading primitive — replaces the local `H` component that was
 * copy-pasted across every page. The original always rendered `<h2>`
 * regardless of `size`; this version uses the semantically correct tag.
 */
export function Heading({ size = 'h2', style = {}, color, children }: HeadingProps) {
  const Tag = TAG_MAP[size]
  const fontWeight = size === 'h3' ? 500 : 700

  const headingStyle: CSSProperties = {
    fontSize:     FONT_SIZES[size],
    fontWeight,
    color:        color || C.head,
    letterSpacing: '-0.028em',
    lineHeight:   1.08,
    fontFamily:   "'Akshar', sans-serif",
    ...style,
  }

  return <Tag style={headingStyle}>{children}</Tag>
}
