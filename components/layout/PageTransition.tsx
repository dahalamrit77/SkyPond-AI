'use client'

/**
 * PageTransition — professional route-change animation for Next.js App Router.
 *
 * How it works:
 *   - usePathname() returns the current route path.
 *   - That value is used as the React `key` on the wrapper div.
 *   - Every time the route changes, React sees a new key and re-mounts the div,
 *     which re-triggers the CSS animation.
 *
 * Design choices:
 *   - 220ms duration — fast enough to feel instant, slow enough to register.
 *   - Fade + 6px upward translate — industry standard for SaaS (Vercel, Linear, Stripe).
 *   - cubic-bezier(0.16, 1, 0.3, 1) — ease-out-quint: snappy start, smooth settle.
 *   - No exit animation — App Router doesn't support exit animations without a library.
 *     Entry-only is the correct approach for navigation performance.
 *   - will-change: opacity, transform — hints GPU compositing to prevent layout thrash.
 */

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <div
      key={pathname}
      style={{ animation: 'pageEnter 0.22s cubic-bezier(0.16,1,0.3,1) both' }}
    >
      {children}
    </div>
  )
}
