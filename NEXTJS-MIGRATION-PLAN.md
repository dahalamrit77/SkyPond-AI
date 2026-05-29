# SkyPond Tech — Next.js Migration Plan
## From React CSR SPA → Next.js 15 App Router (SSG)

**Current stack:** Vite 5 · React 18 · react-router-dom v6 · Sanity CMS  
**Target stack:** Next.js 15 · React 18 · App Router · TypeScript · next-sanity  
**Deployment:** GitHub Pages → Vercel  
**Design change:** Zero. Not a single pixel.  
**Total phases:** 7  
**Estimated time:** 3–4 weeks (working at a measured, professional pace)

---

## The Design Preservation Guarantee

This is the first thing to establish clearly, because it's your main concern.

Your entire codebase uses inline `style={{}}` objects — not CSS classes, not Tailwind, not styled-components. This is actually the single biggest migration advantage your project has. Inline styles in React work **identically** in Next.js. The JSX syntax is the same. The style objects are the same. The tokens in `tokens.js` are the same. React itself doesn't change — Next.js is a layer on top of React, not a replacement for it.

**What this means concretely:**
- Every component's visual output: unchanged
- Every color, spacing, font, shadow, border: unchanged
- Every hover animation, transition, and keyframe: unchanged
- Every responsive behavior: unchanged
- The Akshar + Gotham font combination: unchanged
- The brand blue `#143156` and the light blue background `#C6DBE7`: unchanged

The only files where the design could theoretically change are if we touch the wrong things — which is why the plan separates "structural migration" from "visual migration" and we never touch style objects.

---

## What Actually Changes (Technical Architecture Only)

| What | Before | After | Design impact |
|---|---|---|---|
| Routing | `react-router-dom` + `App.jsx` | Next.js file-system routing | None |
| Page titles | One shared `<title>` in `index.html` | Per-page `generateMetadata()` | None |
| HTML delivery | Empty `<div id="root">` | Full pre-rendered HTML | None (visual) |
| Link component | `import { Link } from 'react-router-dom'` | `import Link from 'next/link'` | None |
| Navigation hook | `useNavigate()` | `useRouter()` | None |
| Data fetching | `useEffect` + Sanity client | Server component + next-sanity | None |
| Build tool | Vite | Next.js built-in (Turbopack) | None |
| Fonts | Injected via JS in App.jsx | Declared in root layout | None |
| Images | `<img>` with inline styles | `next/image` | None |
| Deployment | GitHub Pages | Vercel | None |
| Language | JavaScript (.jsx) | TypeScript (.tsx) | None |

---

## Technology Decisions

### TypeScript — Yes, Required for Industry Standard

The current codebase is plain JavaScript. This is fine for a personal or early-stage project, but for a professional codebase in 2026, **TypeScript is not optional** — it is the industry standard for Next.js applications. Every major company, every credible open-source project, and Next.js's own documentation defaults to TypeScript.

What TypeScript adds:
- Type safety — catches bugs before they reach production
- Autocomplete and IntelliSense in your editor
- Self-documenting code — props are typed, so you always know what a component expects
- Industry standard — any developer joining the team will expect TypeScript

This adds some upfront work (adding types to component props) but zero visual or functional change to the site. It simply adds a layer of reliability.

### Next.js 15 App Router — Not Pages Router

Next.js has two routing systems: the old Pages Router (`pages/` directory) and the new App Router (`app/` directory). The App Router is the current standard as of Next.js 13+. We use the App Router. The Pages Router still works but is legacy — new projects should never use it.

### Vercel — Free Tier is Sufficient

Vercel is the company that builds Next.js. Their platform is purpose-built for it. The free Hobby tier supports: unlimited personal projects, custom domains, automatic HTTPS, global CDN, automatic deployments on every git push. For a marketing site at your traffic level, there is no reason to pay anything.

---

## The Folder Structure Transformation

### Before (Current React Structure):
```
skypond-tech/
├── index.html                    ← Single HTML shell for entire app
├── vite.config.js
├── package.json
├── public/
│   ├── fonts/
│   ├── logosymbol.png
│   ├── navbar-logo-blue.png
│   ├── navbar-logo-white.png
│   ├── robots.txt                ← Static, incomplete
│   └── sitemap.xml               ← Static, incomplete, manually maintained
└── src/
    ├── App.jsx                   ← Central router (to be deleted)
    ├── main.jsx                  ← React root mount (to be deleted)
    ├── tokens.js
    ├── sanityClient.js
    ├── config/
    │   └── constants.js
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── Breadcrumb.jsx
    │   ├── ProductHero.jsx
    │   └── ui/
    │       └── Button.jsx
    └── pages/
        ├── Home.jsx
        ├── About.jsx
        ├── Industries.jsx
        ├── OurValues.jsx
        ├── PrivacyPolicy.jsx
        ├── ScheduleDemo.jsx
        ├── NotFound.jsx
        ├── ServicesIndex.jsx
        ├── ProductsIndex.jsx
        ├── products/
        │   ├── DeaLookupTool.jsx
        │   ├── DeaComplianceReporting.jsx
        │   ├── CsInventory.jsx
        │   ├── LtcAnalytics.jsx
        │   ├── PointclickcareFeed.jsx
        │   └── DocumentAutomation.jsx
        └── services/
            ├── AIAutomation.jsx
            ├── CustomDevelopment.jsx
            ├── DataAnalytics.jsx
            ├── LTCPharmacyIT.jsx
            ├── MicrosoftCloud.jsx
            └── PointClickCare.jsx
```

### After (Next.js Industry Standard Structure):
```
skypond-tech/
├── next.config.ts                ← Next.js config (replaces vite.config.js)
├── tsconfig.json                 ← TypeScript config
├── package.json
├── .env.local                    ← Environment variables (never committed)
├── .env.example                  ← Template for env vars (committed)
├── .gitignore
├── public/
│   ├── fonts/                    ← Same font files
│   ├── logosymbol.png
│   ├── navbar-logo-blue.png
│   ├── navbar-logo-white.png
│   └── llms.txt                  ← NEW: AI search optimization
│   (robots.txt and sitemap.xml are now generated by Next.js, not static files)
│
├── app/                          ← Next.js App Router (replaces src/pages/)
│   ├── layout.tsx                ← Root layout (replaces App.jsx + main.jsx + index.html)
│   ├── page.tsx                  ← Home page (/)
│   ├── not-found.tsx             ← 404 page
│   ├── robots.ts                 ← Dynamic robots.txt generator
│   ├── sitemap.ts                ← Dynamic sitemap.xml generator
│   ├── about/
│   │   └── page.tsx
│   ├── industries/
│   │   └── page.tsx
│   ├── our-values/
│   │   └── page.tsx
│   ├── privacy-policy/
│   │   └── page.tsx
│   ├── schedule-demo/
│   │   └── page.tsx
│   ├── services/
│   │   ├── page.tsx              ← Services index
│   │   ├── ai-automation/
│   │   │   └── page.tsx
│   │   ├── ltc-pharmacy-it/
│   │   │   └── page.tsx
│   │   ├── data-analytics/
│   │   │   └── page.tsx
│   │   ├── custom-development/
│   │   │   └── page.tsx
│   │   ├── microsoft-cloud/
│   │   │   └── page.tsx
│   │   └── pointclickcare-integration/
│   │       └── page.tsx
│   └── products/
│       ├── page.tsx              ← Products index
│       ├── dea-lookup/
│       │   └── page.tsx
│       ├── dea-compliance-reporting/
│       │   └── page.tsx
│       ├── cs-inventory/
│       │   └── page.tsx
│       ├── ltc-analytics/
│       │   └── page.tsx
│       ├── pointclickcare-feed/
│       │   └── page.tsx
│       └── document-automation/
│           └── page.tsx
│
├── components/                   ← Shared components (replaces src/components/)
│   ├── layout/
│   │   ├── Navbar.tsx            ← 'use client' (hover states)
│   │   ├── Footer.tsx
│   │   └── Breadcrumb.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx             ← NEW: extracted shared primitive
│   │   ├── Heading.tsx           ← NEW: fixed H component
│   │   ├── Paragraph.tsx         ← NEW: extracted shared primitive
│   │   └── Card.tsx              ← NEW: extracted shared primitive
│   ├── sections/
│   │   └── ProductHero.tsx
│   └── seo/
│       ├── JsonLd.tsx            ← NEW: JSON-LD structured data injector
│       ├── BreadcrumbSchema.tsx  ← NEW: BreadcrumbList JSON-LD
│       └── schemas/
│           ├── organization.ts   ← NEW: Organization schema data
│           ├── website.ts        ← NEW: WebSite schema data
│           ├── software.ts       ← NEW: SoftwareApplication schema builder
│           └── service.ts        ← NEW: Service schema builder
│
└── lib/                          ← Utilities and configuration
    ├── tokens.ts                 ← Same design tokens, now typed
    ├── constants.ts              ← Same constants, now typed
    └── sanity/
        ├── client.ts             ← next-sanity client
        └── queries.ts            ← Sanity GROQ queries
```

---

## The Seven Phases

---

### Phase 1: Project Initialization & Foundation
**Estimated time:** 1 day  
**Deliverable:** A running Next.js project that builds successfully with the correct config, fonts, global styles, and root layout — but no page content yet.

**What gets done:**

1. **Initialize Next.js 15 project** with TypeScript, App Router, ESLint
   ```bash
   npx create-next-app@latest skypond-tech-next \
     --typescript \
     --app \
     --eslint \
     --no-tailwind \
     --src-dir=false \
     --import-alias="@/*"
   ```

2. **Install dependencies**
   ```bash
   npm install next-sanity @sanity/client lucide-react
   npm install -D @types/node @types/react @types/react-dom
   ```

3. **Configure `next.config.ts`**
   - Security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options)
   - Image domains for Sanity CDN
   - Proper base URL (removes the `/SkyPond-AI/` subpath issue)

4. **Migrate `tokens.ts`** — exact same color values, now TypeScript typed
   ```typescript
   const C = {
     bg: '#C6DBE7',
     surface: '#FFFFFF',
     // ... all existing tokens, unchanged
   } as const
   export default C
   export type ColorToken = typeof C
   ```

5. **Migrate `constants.ts`** — exact same values, now typed

6. **Set up `.env.local`** with Sanity credentials (projectId, dataset, token)

7. **Create `app/layout.tsx`** — the root layout. This replaces `App.jsx`, `main.jsx`, and `index.html` combined:
   - Sets the base HTML structure
   - Declares fonts (Akshar from Google Fonts, Gotham via `@font-face`)
   - Preloads font files
   - Injects global CSS for animations (`fadeUp`, `dropIn`, `ticker`, scrollbar styles)
   - Sets default metadata that all pages inherit
   - Wraps content in a React context for Sanity live preview (future use)

8. **Create `app/globals.css`** — moves the CSS from the `<style>` block in `App.jsx` into a proper CSS file:
   ```css
   @font-face { font-family: 'Gotham'; src: url('/fonts/Gotham-Book.woff2')... }
   @keyframes fadeUp { from { opacity: 0; transform: translateY(22px); } to { ... } }
   @keyframes dropIn { ... }
   @keyframes ticker { ... }
   * { margin: 0; padding: 0; box-sizing: border-box; }
   body { background: #C6DBE7; color: #1E3A5C; ... }
   ::-webkit-scrollbar { width: 5px; }
   ```

9. **Configure `tsconfig.json`** with path aliases (`@/components`, `@/lib`, etc.)

**State at end of Phase 1:** Project runs at `localhost:3000` showing a blank page. No errors. Build succeeds.

---

### Phase 2: Shared Component Library
**Estimated time:** 1.5 days  
**Deliverable:** All shared components migrated, the copy-paste duplication problem eliminated, and the `H` component bug permanently fixed.

**What gets done:**

1. **Extract and fix shared UI primitives** into `components/ui/`

   The current codebase copy-pastes `H`, `Badge`, `P`, and `Card` into every single page file (10+ copies each). This is the most significant code quality problem in the project. We extract them into single shared files, fix the `H` bug permanently, and every page imports from one source of truth.

   **`components/ui/Heading.tsx`** — the fixed H component:
   ```tsx
   // THE FIX: uses the correct HTML tag based on size prop
   type HeadingSize = 'hero' | 'h2' | 'h3'
   interface HeadingProps {
     size?: HeadingSize
     style?: React.CSSProperties
     color?: string
     children: React.ReactNode
   }
   
   export function Heading({ size = 'h2', style = {}, color, children }: HeadingProps) {
     const fontSizes = {
       hero: 'clamp(2.5rem,5.2vw,4.2rem)',
       h2: 'clamp(1.85rem,2.8vw,2.6rem)',
       h3: '1.22rem'
     }
     const Tag = size === 'hero' ? 'h1' : size === 'h3' ? 'h3' : 'h2'
     //    ^^^^ This is the fix — correct HTML tag for each size
     return (
       <Tag style={{ fontSize: fontSizes[size], ... }}>
         {children}
       </Tag>
     )
   }
   ```

   **`components/ui/Badge.tsx`**, **`components/ui/Paragraph.tsx`**, **`components/ui/Card.tsx`** — same pattern, single source, properly typed.

2. **Migrate `Button.tsx`** — nearly identical to current, just TypeScript props interface added. The `Link` import changes from react-router-dom to next/link.

3. **Migrate `Navbar.tsx`** — this is the most complex component because it has significant client-side interactivity (hover states, mobile menu, scroll detection). It gets `'use client'` at the top. The `useNavigate` hook becomes `useRouter`, `useLocation` becomes `usePathname`.

   ```tsx
   'use client'
   // ^ This single line tells Next.js: this component uses browser APIs
   // It still pre-renders on the server, but it also hydrates in the browser
   
   import { useRouter, usePathname } from 'next/navigation'
   import Link from 'next/link'
   // Rest of the component is visually and functionally identical
   ```

4. **Migrate `Footer.tsx`** — straightforward. `Link` import changes. No `'use client'` needed (no browser hooks).

5. **Migrate `Breadcrumb.tsx`** — migrated + the BreadcrumbList JSON-LD schema is added directly here, so every page using the breadcrumb automatically gets proper structured data:
   ```tsx
   // Breadcrumb now has TWO outputs:
   // 1. The visual breadcrumb (unchanged appearance)
   // 2. The JSON-LD schema injected into <head> via Next.js metadata
   ```

6. **Migrate `ProductHero.tsx`** — straightforward migration, already uses `<h1>` correctly.

7. **Create `components/seo/` schema components** — these are invisible to visitors but critical for Google:
   - `JsonLd.tsx` — a simple wrapper that injects a `<script type="application/ld+json">` tag
   - `schemas/organization.ts` — the Organization schema for SkyPond Tech (used on home page)
   - `schemas/website.ts` — WebSite schema with SearchAction
   - `schemas/software.ts` — function that generates SoftwareApplication schema for any product
   - `schemas/service.ts` — function that generates Service schema for any service page

**State at end of Phase 2:** All shared components exist, are properly typed, and are importable. The H component bug is fixed permanently. Zero visual changes.

---

### Phase 3: Core Pages Migration
**Estimated time:** 1.5 days  
**Deliverable:** Home, About, Industries, Our Values, Privacy Policy, Schedule Demo, and 404 pages — all migrated, all with full SEO metadata, all pre-rendered.

**What gets done for EACH page (template):**

Each page gets three things that don't exist at all in the current codebase:

**A. `generateMetadata()` — per-page SEO metadata:**
```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About SkyPond Tech — LTC Pharmacy Technology Team',
  description: 'SkyPond Tech was built by people who spent close to a decade inside LTC pharmacy operations. Not consultants — practitioners who saw the gap firsthand.',
  alternates: {
    canonical: 'https://skypondtech.ai/about',
  },
  openGraph: {
    title: 'About SkyPond Tech',
    description: '...',
    url: 'https://skypondtech.ai/about',
    siteName: 'SkyPond Tech',
    images: [{ url: '/og/about.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About SkyPond Tech',
    description: '...',
    images: ['/og/about.png'],
  },
}
```

**B. JSON-LD Structured Data — per-page schema:**
```tsx
// Injected into <head> automatically, invisible to visitors
<JsonLd schema={webPageSchema({ 
  name: 'About SkyPond Tech',
  url: 'https://skypondtech.ai/about',
  description: '...'
})} />
```

**C. The page component itself** — migrated from the current JSX, using shared components from Phase 2, with no visual changes.

**Special handling per page:**

- **Home page** — `generateMetadata()` + Organization JSON-LD + WebSite JSON-LD (with SearchAction for Sitelinks Searchbox). The Sanity testimonials fetch moves from `useEffect` to an `async` server component, meaning testimonials are in the pre-rendered HTML.

- **About page** — already has the correct `<main>` wrapper. Gets `WebPage` schema.

- **Industries page** — gets `WebPage` schema.

- **Our Values + Privacy Policy** — get `noindex` robots directive (these pages don't need to rank):
  ```tsx
  export const metadata: Metadata = {
    robots: { index: false, follow: false }
  }
  ```

- **Schedule Demo** — gets HubSpot embed migrated. Since HubSpot injects external scripts via `document.createElement`, this section becomes a `'use client'` component. The page itself can still be server-rendered; only the embed widget needs client-side JavaScript.

- **Not Found (404)** — Next.js has a dedicated `not-found.tsx` file. The current `NotFound.jsx` content migrates here.

**State at end of Phase 3:** 7 core pages are live, pre-rendered, with full SEO metadata. Visiting any of them in a browser returns complete HTML with proper titles.

---

### Phase 4: Product Pages Migration
**Estimated time:** 1.5 days  
**Deliverable:** All 6 product detail pages + the Products Index page — fully migrated, each with unique metadata, SoftwareApplication JSON-LD schema, and BreadcrumbList schema.

**The SEO work specific to product pages:**

Each product page gets `SoftwareApplication` schema — this tells Google these are software products, which can enable rich results:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "DEA Lookup Tool",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "Real-time DEA registrant verification for LTC pharmacies...",
  "url": "https://skypondtech.ai/products/dea-lookup",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock"
  },
  "provider": {
    "@type": "Organization",
    "name": "SkyPond Tech",
    "url": "https://skypondtech.ai"
  }
}
```

Each product page also gets `BreadcrumbList` schema matching the visual breadcrumb that already exists:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skypondtech.ai" },
    { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://skypondtech.ai/products" },
    { "@type": "ListItem", "position": 3, "name": "DEA Lookup Tool" }
  ]
}
```

**All 6 product pages:**
- `/products/dea-lookup` — DEA Lookup Tool
- `/products/dea-compliance-reporting` — DEA Compliance Reporting
- `/products/cs-inventory` — CS Inventory Management
- `/products/ltc-analytics` — LTC Analytics Dashboard
- `/products/pointclickcare-feed` — PointClickCare Data Feed
- `/products/document-automation` — Document Automation

**Interactive components** (mockup widgets, animated charts with IntersectionObserver) get `'use client'` directives. The page shells are server-rendered; only the interactive sections hydrate in the browser.

**State at end of Phase 4:** 7 product-related pages live and pre-rendered. Each has a unique title, description, canonical URL, OG tags, SoftwareApplication schema, and BreadcrumbList schema.

---

### Phase 5: Service Pages Migration
**Estimated time:** 1.5 days  
**Deliverable:** All 6 service pages + the Services Index page — fully migrated, each with `Service` JSON-LD schema and complete metadata.

**The SEO work specific to service pages:**

Each service page gets `Service` schema:
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Workflow Automation for LTC Pharmacies",
  "description": "Intelligent workflow automation replacing manual bottlenecks...",
  "url": "https://skypondtech.ai/services/ai-automation",
  "provider": {
    "@type": "Organization",
    "name": "SkyPond Tech",
    "url": "https://skypondtech.ai"
  },
  "areaServed": "US",
  "serviceType": "Software Development"
}
```

**All 6 service pages:**
- `/services/ltc-pharmacy-it`
- `/services/ai-automation`
- `/services/data-analytics`
- `/services/custom-development`
- `/services/microsoft-cloud`
- `/services/pointclickcare-integration`

**State at end of Phase 5:** All 22 routes are live, pre-rendered, and SEO-ready. The full site is functional.

---

### Phase 6: Technical SEO Infrastructure
**Estimated time:** 1 day  
**Deliverable:** Dynamic sitemap, robots.txt, security headers, image optimization, and all remaining SEO infrastructure — making the site fully production-ready.

**1. Dynamic Sitemap (`app/sitemap.ts`)**

This replaces the manually maintained static `public/sitemap.xml` that was missing half the pages. The dynamic version generates itself automatically and always stays in sync:

```typescript
import type { MetadataRoute } from 'next'

const SITE_URL = 'https://skypondtech.ai'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  
  const pages = [
    { url: '/',                                       priority: 1.0, changeFreq: 'monthly' },
    { url: '/services',                               priority: 0.9, changeFreq: 'monthly' },
    { url: '/products',                               priority: 0.9, changeFreq: 'monthly' },
    { url: '/products/dea-lookup',                    priority: 0.8, changeFreq: 'monthly' },
    { url: '/products/dea-compliance-reporting',      priority: 0.8, changeFreq: 'monthly' },
    { url: '/products/cs-inventory',                  priority: 0.8, changeFreq: 'monthly' },
    { url: '/products/ltc-analytics',                 priority: 0.8, changeFreq: 'monthly' },
    { url: '/products/pointclickcare-feed',           priority: 0.8, changeFreq: 'monthly' },
    { url: '/products/document-automation',           priority: 0.8, changeFreq: 'monthly' },
    { url: '/services/ltc-pharmacy-it',               priority: 0.8, changeFreq: 'monthly' },
    { url: '/services/ai-automation',                 priority: 0.8, changeFreq: 'monthly' },
    { url: '/services/data-analytics',                priority: 0.8, changeFreq: 'monthly' },
    { url: '/services/custom-development',            priority: 0.8, changeFreq: 'monthly' },
    { url: '/services/microsoft-cloud',               priority: 0.8, changeFreq: 'monthly' },
    { url: '/services/pointclickcare-integration',    priority: 0.8, changeFreq: 'monthly' },
    { url: '/industries',                             priority: 0.7, changeFreq: 'monthly' },
    { url: '/about',                                  priority: 0.7, changeFreq: 'yearly'  },
    { url: '/schedule-demo',                          priority: 0.6, changeFreq: 'yearly'  },
  ]
  
  return pages.map(page => ({
    url: `${SITE_URL}${page.url}`,
    lastModified: now,
    changeFrequency: page.changeFreq as any,
    priority: page.priority,
  }))
}
```

**2. Dynamic robots.ts (`app/robots.ts`)**

Replaces the static `public/robots.txt`:
```typescript
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: 'https://skypondtech.ai/sitemap.xml',
  }
}
```

**3. Security Headers (`next.config.ts`)**

Industry standard security headers — these improve both security and SEO trust signals:
```typescript
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control',      value: 'on' },
  { key: 'Strict-Transport-Security',   value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options',             value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options',      value: 'nosniff' },
  { key: 'Referrer-Policy',             value: 'origin-when-cross-origin' },
  { key: 'Permissions-Policy',          value: 'camera=(), microphone=(), geolocation=()' },
]
```

**4. Image Optimization**

Replace all `<img>` tags with `next/image`. This is a small change (5 images in the codebase) with significant performance impact — Next.js automatically converts images to WebP, lazy-loads them, prevents CLS with reserved space, and serves size-appropriate images per device:

```tsx
// Before:
<img src="/navbar-logo-white.png" alt="Skypond Tech" style={{ width: 250, height: 46 }} />

// After:
import Image from 'next/image'
<Image src="/navbar-logo-white.png" alt="SkyPond Tech" width={250} height={46} priority />
// priority={true} on the navbar logo tells Next.js to preload it — improves LCP
```

**5. `public/llms.txt`** — AI search optimization:
```
# SkyPond Tech — LTC Pharmacy Technology Platform
# https://skypondtech.ai

SkyPond Tech is a specialized LTC (Long-Term Care) pharmacy technology company 
based in Lafayette, Colorado. Founded by practitioners with close to a decade of 
hands-on LTC pharmacy experience.

## Products
- DEA Lookup Tool: https://skypondtech.ai/products/dea-lookup
- DEA Compliance Reporting: https://skypondtech.ai/products/dea-compliance-reporting
- CS Inventory Management: https://skypondtech.ai/products/cs-inventory
- LTC Analytics Dashboard: https://skypondtech.ai/products/ltc-analytics
- PointClickCare Data Feed: https://skypondtech.ai/products/pointclickcare-feed
- Document Automation: https://skypondtech.ai/products/document-automation

## Services
[...all 6 services with URLs]

## Contact
Email: info@skypondtech.com
Phone: (720) 724-6828
Location: Lafayette, CO
```

**6. `web.config` / Vercel config** — proper 404 handling so unknown routes return actual 404 status codes (not 200 with a React "not found" page).

**State at end of Phase 6:** Complete technical SEO infrastructure. Dynamic sitemap, proper robots.txt, security headers, image optimization, and AI search readiness.

---

### Phase 7: Deployment, QA & Launch
**Estimated time:** 0.5 days  
**Deliverable:** Site live on Vercel at `skypondtech.ai`, Google Search Console connected, sitemap submitted.

**What gets done:**

1. **Deploy to Vercel**
   - Connect GitHub repository to Vercel
   - Set environment variables in Vercel dashboard (Sanity projectId, dataset, token)
   - Vercel auto-detects Next.js and configures the build

2. **Configure custom domain**
   - Point `skypondtech.ai` DNS to Vercel
   - Vercel auto-provisions HTTPS certificate

3. **Pre-launch QA checklist**
   - Every page loads without errors
   - View page source on each page — confirm content is in the raw HTML (not rendered by JS)
   - Confirm each page has a unique `<title>` in the HTML source
   - Confirm canonical URLs are correct on every page
   - Confirm `sitemap.xml` accessible and all 18+ URLs present
   - Confirm `robots.txt` accessible and correct
   - Test mobile responsiveness on all pages
   - Test all navigation links
   - Confirm Sanity testimonials appear in page source (not loaded by JS)
   - Run Google's Rich Results Test on home, one product page, one service page
   - Run Lighthouse audit — target 90+ on Performance, Accessibility, Best Practices, SEO

4. **Google Search Console setup**
   - Add property for `skypondtech.ai`
   - Verify ownership (Vercel makes this easy via DNS record)
   - Submit `https://skypondtech.ai/sitemap.xml`
   - Request indexing for priority pages

5. **Final robots meta audit**
   - Confirm `/privacy-policy` has `noindex`
   - Confirm `/our-values` has `noindex`
   - Confirm all product and service pages are `index, follow`

**State at end of Phase 7:** Site is live, fully indexed by Google, SEO infrastructure complete. Mission accomplished.

---

## Complete SEO Checklist — What Gets Implemented

This is everything the migration delivers, mapped to each phase.

### On-Page SEO
- [x] **Phase 3–5** Unique `<title>` for every page (in raw HTML, not JS-rendered)
- [x] **Phase 3–5** Unique `<meta description>` for every page
- [x] **Phase 3–5** Canonical URL tag on every page
- [x] **Phase 3–5** Open Graph tags (title, description, image, url) on every page
- [x] **Phase 3–5** Twitter Card tags on every page
- [x] **Phase 2** Fixed `<h1>` heading on every page (the H component bug)
- [x] **Phase 2** Proper heading hierarchy (h1 → h2 → h3) throughout
- [x] **Phase 2–5** `<main>` semantic wrapper on every page
- [x] **Phase 3–5** `noindex` on appropriate pages (Privacy Policy, Our Values)
- [x] **Phase 2** Descriptive alt text on all images

### Structured Data (JSON-LD)
- [x] **Phase 3** Organization schema (home page)
- [x] **Phase 3** WebSite schema with SearchAction (home page)
- [x] **Phase 4** SoftwareApplication schema (all 6 product pages)
- [x] **Phase 5** Service schema (all 6 service pages)
- [x] **Phase 2** BreadcrumbList schema (all product + service pages, via Breadcrumb component)
- [x] **Phase 3–5** WebPage schema (remaining pages)

### Technical SEO
- [x] **Phase 1** Pre-rendered HTML — content in first byte, no rendering queue
- [x] **Phase 6** Dynamic sitemap.xml (always complete, always accurate)
- [x] **Phase 6** Dynamic robots.txt with AI crawler declarations
- [x] **Phase 6** Security headers (HSTS, X-Frame-Options, CSP, etc.)
- [x] **Phase 6** `next/image` — WebP conversion, lazy loading, CLS prevention
- [x] **Phase 1** Font preloading (Gotham woff2 preloaded in `<head>`)
- [x] **Phase 1** `<noscript>` fallback
- [x] **Phase 7** Proper 404 status codes (not soft 404s)
- [x] **Phase 6** `llms.txt` for AI search optimization

### Performance (Core Web Vitals)
- [x] **Phase 1** Fonts loaded at document level (not injected via JS)
- [x] **Phase 6** `fetchpriority="high"` on above-fold images
- [x] **Phase 6** `loading="lazy"` on below-fold images
- [x] **Phase 6** Correct `width`/`height` on all images (eliminates CLS)
- [x] **Phase 6** `<link rel="preconnect">` for Sanity CDN in layout

### Code Quality (Industry Standard)
- [x] **Phase 1** TypeScript throughout
- [x] **Phase 2** Shared component library — no more copy-pasted primitives
- [x] **Phase 2** H component bug fixed permanently in one place
- [x] **Phase 1** ESLint configured
- [x] **Phase 1** Environment variables in `.env.local`
- [x] **All phases** No hardcoded URLs — `SITE_URL` constant used everywhere
- [x] **Phase 7** Vercel deployment with automatic HTTPS

---

## What Each Phase Leaves Working

This is important — every phase ends with a deployable, functional site. We never have a broken-in-the-middle state.

| After Phase | State |
|---|---|
| Phase 1 | Project runs. Blank pages. No errors. |
| Phase 2 | Shared components available. Pages still blank. |
| Phase 3 | 7 core pages working with full SEO. Product/service pages blank. |
| Phase 4 | All 13 pages working. Service pages blank. |
| Phase 5 | All 22 pages working. Full site functional. |
| Phase 6 | Full site + technical SEO infrastructure. |
| Phase 7 | Live on Vercel, Google Search Console connected. |

---

## Answering Your Design Question — Definitively

**No, the design will not change even a single pixel.** Here is why this is guaranteed and not just a promise:

Every visual property in your codebase — every color, every spacing value, every border radius, every shadow, every animation — lives in two places:

1. `tokens.js` (design tokens) — migrates to `tokens.ts` with identical values
2. Inline `style={{}}` objects in components — these are just JavaScript objects. They work identically in Next.js as they do in React.

There is no CSS framework to reconfigure. There is no class system to port. There is no theme provider to update. Your styling system is `{ color: '#143156', padding: '92px 5vw' }` — plain JavaScript objects. Those don't care whether they're running in Vite+React or Next.js. They just work.

The only visual risk would be if we accidentally changed a value somewhere, which is why we do it systematically file-by-file and validate each page against the original after migration.

---

## Ready When You Are

This plan covers every file, every SEO requirement, and every industry standard concern. When you say go, we start with Phase 1 — project initialization — and work through each phase in order. Each phase has a clear start state, a clear end state, and produces a working deliverable.

Say **"start Phase 1"** when you're ready to begin.
