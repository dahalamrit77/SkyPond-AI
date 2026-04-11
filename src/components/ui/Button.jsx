import { useState } from 'react'
import { Link } from 'react-router-dom'
import C from '../../tokens.js'

const VARIANTS = {

  primary: {
    base: {
      background: C.p,
      color: '#FFFFFF',
      border: 'none',
    },
    hover: {
      background: C.pd,
      color: '#FFFFFF',
    },
  },

  primaryDark: {
    base: {
      background: C.p2,
      color: C.p,
      border: 'none',
    },
    hover: {
      background: C.violet,
      color: C.p,
    },
  },

  ctaWhite: {
    base: {
      background: '#FFFFFF',
      color: C.p,
      border: 'none',
    },
    hover: {
      background: 'rgba(255,255,255,0.9)',
      color: C.p,
    },
  },

  secondary: {
    base: {
      background: 'transparent',
      color: C.p,
      border: `1.5px solid ${C.p}`,
    },
    hover: {
      background: `${C.p}0F`,
      color: C.p,
    },
  },

  secondaryDark: {
    base: {
      background: 'transparent',
      color: '#FFFFFF',
      border: '1.5px solid rgba(255,255,255,0.45)',
    },
    hover: {
      background: 'rgba(255,255,255,0.08)',
      color: '#FFFFFF',
    },
  },

  ghost: {
    base: {
      background: 'transparent',
      color: C.p2,
      border: 'none',
      textDecoration: 'none',
    },
    hover: {
      background: 'transparent',
      color: C.p,
      textDecoration: 'underline',
    },
  },

}

const SIZES = {
  sm: {
    padding: '8px 18px',
    fontSize: '0.85rem',
    borderRadius: 8,
  },
  md: {
    padding: '12px 26px',
    fontSize: '0.95rem',
    borderRadius: 10,
  },
  lg: {
    padding: '15px 34px',
    fontSize: '1.05rem',
    borderRadius: 12,
  },
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  style = {},
  disabled = false,
}) {
  const [hovered, setHovered] = useState(false)

  const v = VARIANTS[variant] || VARIANTS.primary
  const s = SIZES[size] || SIZES.md

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontFamily: "'Akshar', sans-serif",
    fontWeight: 500,
    letterSpacing: '0.02em',
    cursor: disabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none',
    transition: 'all 0.18s ease',
    whiteSpace: 'nowrap',
    opacity: disabled ? 0.5 : 1,
    ...s,
    ...v.base,
    ...(hovered && !disabled ? v.hover : {}),
    ...style,
  }

  const events = {
    onMouseEnter: () => !disabled && setHovered(true),
    onMouseLeave: () => setHovered(false),
  }

  if (to) {
    return (
      <Link to={to} style={base} onClick={onClick} {...events}>
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
        {...events}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} disabled={disabled} style={base} {...events}>
      {children}
    </button>
  )
}
