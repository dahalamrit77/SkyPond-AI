'use client'

/**
 * NavigationProgress — thin top-of-viewport progress bar for route changes.
 *
 * This is the industry standard pattern (GitHub, YouTube, Vercel, Linear):
 * a 2px accent-coloured bar sweeps left → right and fades out on navigation.
 *
 * Why this instead of a page entry animation:
 *   - Appears INSTANTLY on link click (< 1 frame delay via click event)
 *   - Gives clear "navigation started" feedback without hiding content
 *   - Does not add perceptible time to the navigation — it runs in parallel
 *   - No blank-screen flash (the old page stays visible until new one is ready)
 *
 * How it works:
 *   1. A global click listener detects internal anchor clicks → shows bar immediately
 *   2. usePathname() detects when navigation completes → triggers completion animation
 *   3. Bar sweeps to ~85% during loading, snaps to 100% on completion, then fades out
 */

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

// Brand accent — matches C.p2 from tokens
const BAR_COLOR = '#8AB8E3'

export function NavigationProgress() {
  const pathname             = usePathname()
  const [phase, setPhase]    = useState<'idle' | 'loading' | 'done'>('idle')
  const prevPath             = useRef(pathname)
  const doneTimer            = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Detect navigation START via click on any internal <a> ────────────────
  useEffect(() => {
    const onLinkClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href') ?? ''
      // Skip external links, mailto, tel, hash-only anchors
      if (!href || /^(https?:|mailto:|tel:|#)/.test(href)) return
      // Skip if same page (just a hash change)
      const dest = href.split('#')[0] || href
      const curr = window.location.pathname
      if (dest === curr) return

      if (doneTimer.current) clearTimeout(doneTimer.current)
      setPhase('loading')
    }

    document.addEventListener('click', onLinkClick)
    return () => document.removeEventListener('click', onLinkClick)
  }, [])

  // ── Detect navigation COMPLETE via pathname change ────────────────────────
  useEffect(() => {
    if (pathname === prevPath.current) return
    prevPath.current = pathname

    setPhase('done')
    if (doneTimer.current) clearTimeout(doneTimer.current)
    doneTimer.current = setTimeout(() => setPhase('idle'), 450)

    return () => {
      if (doneTimer.current) clearTimeout(doneTimer.current)
    }
  }, [pathname])

  if (phase === 'idle') return null

  return (
    <div
      aria-hidden="true"
      style={{
        position:        'fixed',
        top:             0,
        left:            0,
        right:           0,
        height:          2,
        zIndex:          9999,
        background:      BAR_COLOR,
        transformOrigin: 'left center',
        pointerEvents:   'none',
        // loading: sweep to ~80% and hold   done: snap to 100% and fade out
        animation: phase === 'done'
          ? 'navDone 0.35s ease-out both'
          : 'navLoading 2.5s ease-out both',
      }}
    />
  )
}
