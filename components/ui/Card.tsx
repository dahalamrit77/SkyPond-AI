'use client'

import { useState } from 'react'
import type { CSSProperties } from 'react'
import C from '@/lib/tokens'

interface CardProps {
  children: React.ReactNode
  style?: CSSProperties
  /** Optional accent colour used for the hover box-shadow tint */
  ac?: string
  /** Set to false to disable the lift-on-hover effect */
  hover?: boolean
}

/**
 * Surface card with optional lift-on-hover — replaces the local `Card`
 * component copy-pasted across every page. Needs `'use client'` for useState.
 */
export function Card({ children, style = {}, ac, hover = true }: CardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        background:   C.surface,
        border:       `1.5px solid ${hovered ? C.p2 : C.border}`,
        borderRadius: 16,
        transition:   'all 0.2s',
        transform:    hovered && hover ? 'translateY(-4px)' : 'none',
        boxShadow:    hovered && hover
          ? `0 16px 40px ${ac ? ac + '1A' : 'rgba(0,0,0,0.08)'}`
          : '0 2px 8px rgba(0,0,0,0.04)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
