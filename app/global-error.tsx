'use client'

/**
 * app/global-error.tsx — Global error boundary for the root layout.
 *
 * This catches errors thrown inside app/layout.tsx itself (e.g. a crash
 * in the Navbar or Footer). It replaces the entire document — including
 * <html> and <body> — so it must render its own HTML shell.
 *
 * In practice this should never fire unless there is a bug in the root
 * layout. It acts as the final safety net.
 */

export default function GlobalError({
  error,
  reset,
}: {
  error:  Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body style={{
        margin:      0,
        padding:     '80px 24px',
        background:  '#C6DBE7',
        fontFamily:  "'Helvetica Neue', Arial, sans-serif",
        textAlign:   'center',
        color:       '#143156',
      }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
          Something went wrong
        </h1>
        <p style={{ fontSize: '1rem', marginBottom: 32, opacity: 0.7 }}>
          A critical error occurred. Please refresh the page.
        </p>
        <button
          onClick={reset}
          style={{
            padding:      '12px 28px',
            background:   '#143156',
            color:        '#fff',
            border:       'none',
            borderRadius: 10,
            fontSize:     '0.95rem',
            fontWeight:   600,
            cursor:       'pointer',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
