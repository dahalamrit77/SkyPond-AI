'use client'

import { useState } from 'react'
import type { CSSProperties, MouseEventHandler } from 'react'
import Link from 'next/link'
import C from '@/lib/tokens'

/* ─── Variant & size tokens ─────────────────────────────────────────────── */

const VARIANTS = {
  primary: {
    base:  { background: C.p,                        color: '#FFFFFF', border: 'none' },
    hover: { background: C.pd,                       color: '#FFFFFF' },
  },
  primaryDark: {
    base:  { background: C.p2,                       color: C.p,       border: 'none' },
    hover: { background: C.violet,                   color: C.p },
  },
  ctaWhite: {
    base:  { background: '#FFFFFF',                  color: C.p,       border: 'none' },
    hover: { background: 'rgba(255,255,255,0.9)',    color: C.p },
  },
  secondary: {
    base:  { background: 'transparent',              color: C.p,       border: `1.5px solid ${C.p}` },
    hover: { background: `${C.p}0F`,                 color: C.p },
  },
  secondaryDark: {
    base:  { background: 'transparent',              color: '#FFFFFF',  border: '1.5px solid rgba(255,255,255,0.45)' },
    hover: { background: 'rgba(255,255,255,0.08)',   color: '#FFFFFF' },
  },
  ghost: {
    base:  { background: 'transparent',              color: C.p2,      border: 'none', textDecoration: 'none' as const },
    hover: { background: 'transparent',              color: C.p,       textDecoration: 'underline' as const },
  },
} as const

const SIZES = {
  sm: { padding: '8px 18px',  fontSize: '0.85rem', borderRadius: 8  },
  md: { padding: '12px 26px', fontSize: '0.95rem', borderRadius: 10 },
  lg: { padding: '15px 34px', fontSize: '1.05rem', borderRadius: 12 },
} as const

type Variant = keyof typeof VARIANTS
type Size    = keyof typeof SIZES

/* ─── Props ─────────────────────────────────────────────────────────────── */

interface ButtonProps {
  children: React.ReactNode
  variant?:  Variant
  size?:     Size
  /** Internal Next.js route — renders an <a> via next/link */
  to?:       string
  /** External or mailto/tel href — renders a plain <a> */
  href?:     string
  onClick?:  MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  style?:    CSSProperties
  disabled?: boolean
}

/**
 * Universal button / link component.
 * - `to` → next/link internal navigation
 * - `href` → plain <a> (external links open in new tab automatically)
 * - neither → <button type="button">
 */
export function Button({
  children,
  variant  = 'primary',
  size     = 'md',
  to,
  href,
  onClick,
  style    = {},
  disabled = false,
}: ButtonProps) {
  const [hovered, setHovered] = useState(false)

  const v = VARIANTS[variant] ?? VARIANTS.primary
  const s = SIZES[size]       ?? SIZES.md

  const base: CSSProperties = {
    display:        'inline-flex',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            8,
    fontFamily:     "'Akshar', sans-serif",
    fontWeight:     500,
    letterSpacing:  '0.02em',
    cursor:         disabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none',
    transition:     'all 0.18s ease',
    whiteSpace:     'nowrap',
    opacity:        disabled ? 0.5 : 1,
    ...s,
    ...v.base,
    ...(hovered && !disabled ? v.hover : {}),
    ...style,
  }

  const events = {
    onMouseEnter: () => { if (!disabled) setHovered(true)  },
    onMouseLeave: () => { setHovered(false) },
  }

  if (to) {
    return (
      <Link href={to} style={base} onClick={onClick as MouseEventHandler<HTMLAnchorElement>} {...events}>
        {children}
      </Link>
    )
  }

  if (href) {
    const external = /^https?:\/\//i.test(href)
    return (
      <a
        href={href}
        style={base}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
        {...events}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
      disabled={disabled}
      style={base}
      {...events}
    >
      {children}
    </button>
  )
}
