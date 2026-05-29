'use client'

/**
 * app/error.tsx — Route segment error boundary.
 *
 * Next.js renders this component when an unhandled runtime error occurs
 * in any page or layout BELOW the root layout. It replaces the broken
 * route with a graceful, branded error UI instead of a blank white screen.
 *
 * Must be a Client Component ('use client') — it receives the error object
 * and a reset function from React's Error Boundary API.
 */

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'

interface ErrorProps {
  error:  Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to error monitoring service in production (e.g. Sentry)
    console.error('[SkyPond Error Boundary]', error)
  }, [error])

  return (
    <main style={{
      minHeight:      '80vh',
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      padding:        '80px 5vw',
      background:     '#C6DBE7',
      textAlign:      'center',
    }}>
      <div style={{
        fontSize:      13,
        fontWeight:    700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color:         '#5A7A9A',
        marginBottom:  16,
        fontFamily:    "'Akshar', sans-serif",
      }}>
        Something went wrong
      </div>

      <h1 style={{
        fontSize:      'clamp(2rem, 4vw, 3rem)',
        fontWeight:    700,
        color:         '#143156',
        letterSpacing: '-0.03em',
        lineHeight:    1.1,
        marginBottom:  16,
        fontFamily:    "'Akshar', sans-serif",
      }}>
        Unexpected error
      </h1>

      <p style={{
        fontSize:   15,
        color:      '#1E3A5C',
        lineHeight: 1.7,
        maxWidth:   480,
        marginBottom: 36,
        fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
        fontWeight: 400,
      }}>
        An unexpected error occurred. Our team has been notified. You can try
        again, or return to the home page.
      </p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button variant="primary" size="md" onClick={reset}>
          Try again
        </Button>
        <Button variant="secondary" size="md" to="/">
          Back to Home
        </Button>
      </div>
    </main>
  )
}
