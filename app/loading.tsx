/**
 * app/loading.tsx — Root loading UI for Next.js App Router.
 *
 * Next.js shows this component IMMEDIATELY (within one frame) when navigating
 * to a new route while its JavaScript chunk is being loaded/compiled.
 *
 * Design: a blank page that exactly matches the site body background (#C6DBE7)
 * with a subtle pulsing indicator. This prevents the blank white flash that
 * would otherwise appear while the new page's JS is loading.
 *
 * In production (next build), pages are prefetched on Link hover so this
 * rarely shows — navigations are typically < 100ms. In next dev, Turbopack
 * compiles pages on demand (first visit only), which is why dev navigation
 * can feel slower than production.
 */
export default function Loading() {
  return (
    <div
      style={{
        minHeight:   '100vh',
        background:  '#C6DBE7',   // C.bg — body background, prevents white flash
        display:     'flex',
        alignItems:  'center',
        justifyContent: 'center',
      }}
    >
      {/* Minimal pulsing dot — matches the brand colour, not distracting */}
      <div
        style={{
          width:        8,
          height:       8,
          borderRadius: '50%',
          background:   '#143156',   // C.p — brand navy
          animation:    'loadingPulse 1s ease-in-out infinite',
          opacity:      0.35,
        }}
      />
    </div>
  )
}
