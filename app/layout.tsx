import type { Metadata } from 'next'
import { Akshar } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { NavigationProgress } from '@/components/layout/NavigationProgress'

const akshar = Akshar({
  weight: ['500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-akshar',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://skypondtech.ai'),

  title: {
    default:  'SkyPond Tech — LTC Pharmacy Technology Platform',
    template: '%s | SkyPond Tech',
  },

  description:
    'The complete LTC pharmacy technology platform. DEA compliance, AI automation, analytics, PointClickCare integration, and more.',

  openGraph: {
    siteName: 'SkyPond Tech',
    type:     'website',
    locale:   'en_US',
  },

  twitter: {
    card: 'summary_large_image',
  },

  robots: {
    index:     true,
    follow:    true,
    googleBot: {
      index:  true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={akshar.variable}>
      <head>
        <link
          rel="preload"
          href="/fonts/Gotham-Book.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Gotham-Light.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <meta name="theme-color" content="#143156" />
      </head>

      {/*
       * suppressHydrationWarning: browser extensions inject attributes onto <body>
       * before React hydrates. Suppresses that harmless mismatch warning.
       */}
      <body suppressHydrationWarning>
        <noscript>
          <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
            <p>
              <strong>SkyPond Tech</strong> requires JavaScript. Contact us at{' '}
              <a href="mailto:info@skypondtech.com">info@skypondtech.com</a>.
            </p>
          </div>
        </noscript>

        {/*
         * NavigationProgress — 2px accent bar at top of viewport.
         * Appears within one frame of clicking any internal link.
         * Industry standard pattern (GitHub, YouTube, Vercel, Linear).
         * Zero impact on navigation speed — runs entirely in parallel.
         */}
        <NavigationProgress />

        {/*
         * Navbar persists across all route changes — never remounts.
         * Active link state updates via usePathname() inside Navbar.
         */}
        <Navbar />

        {/*
         * Page content — rendered directly, no animation wrapper.
         * Navigation speed is determined by Next.js chunk loading + React render,
         * not by artificial CSS animation. In production (next build), <Link>
         * prefetches on hover, making navigations near-instant.
         */}
        {children}

        {/*
         * Footer persists across all routes.
         */}
        <Footer />
      </body>
    </html>
  )
}
