# Phase 3 — Core Pages Migration: Complete

**Date:** 2026-05-28
**Status:** ✅ Complete

---

## Overview

Phase 3 migrated all 6 core pages from the Vite + React SPA (`src/pages/`) to Next.js 15 App Router
(`app/`). Every page follows the same architectural pattern: a Server Component `page.tsx` that exports
`metadata` and renders a Client Component `_content.tsx` that contains all interactive code.

TypeScript check result (source files): **0 errors**.
Note: `.next/types/routes.d.ts` and `.next/types/validator.ts` contain 2 stale parse errors from a
previous dev server run — these are write-protected auto-generated files that Next.js will regenerate
cleanly on the next `next dev` invocation.

---

## Architecture Pattern (applied to every page)

### Why the split?

`generateMetadata()` cannot be exported from a `'use client'` component. Every page in this codebase
requires `'use client'` because it uses `useState`, `useEffect`, `onMouseEnter/Leave`, or other
interactive hooks. The solution:

```
app/<route>/
├── page.tsx        ← Server Component: exports metadata, renders _content
└── _content.tsx    ← 'use client': all interactive JSX, imports Navbar + Footer
```

The underscore prefix (`_content`) is a Next.js App Router convention for private files — they are
NOT treated as routes.

---

## Files Created

### Home Page

**`app/page.tsx`** — Server Component (replaces Phase 1 placeholder)
- Full metadata: title, description, canonical, OG, Twitter
- Injects 3 JSON-LD schemas: Organization + WebSite + SoftwareApplication
- Renders `<HomeContent />`

**`app/_home-content.tsx`** — `'use client'`, ~48 KB
- `AgentWidget` — animated AI pipeline with `setInterval` cycling through 7 steps
- `DEACard`, `CSCard`, `AnalyticsCard` — `IntersectionObserver` reveal animations
- `Hero` — two-column layout with scroll-to-section buttons
- `TrustBar` — CSS ticker animation (no state, pure animation)
- `Products` — 6-product tabbed selector with `useState`
- `Dashboards` — 3-column card grid using the IntersectionObserver cards
- `Services` — 6-service card grid with hover
- `IndustriesSection` — 3-column vertical cards with hover
- `Testimonials` — `sanityClient.fetch<Testimonial[]>()` with carousel + dots nav
- `CTABanner` — static CTA with gradient orbs
- `Contact` — full contact form with `useState`, onFocus/onBlur border transitions

**Key migration decisions:**
- `useLocation()` / `useNavigate()` → removed. Hash navigation (`/#contact`) handled natively by Next.js.
- `client.fetch()` (old Sanity) → `sanityClient.fetch<Testimonial[]>(TESTIMONIALS_QUERY)` from `lib/sanity/`
- Testimonial fields updated: `q` → `text`, `r` → `role`, `co` → `company` (matches new GROQ query)
- `import.meta.env.BASE_URL` → not needed (no logo imports in Home)

---

### Not Found (404)

**`app/not-found.tsx`** — `'use client'`
- Proper HTTP 404 via Next.js built-in `not-found.tsx` convention
- Dark gradient background, 404 numeral, back-home + services buttons
- Email link with inline hover

---

### About Page

**`app/about/page.tsx`** — Server Component
- Canonical: `${SITE_URL}/about`
- Organization JSON-LD schema

**`app/about/_content.tsx`** — `'use client'`
- Hero, StorySection, Mission (hover cards), WhatWeAreNot, Location, CTA
- Page-local font sizes: `{ hero: 'clamp(2.4rem,5vw,3.8rem)', h2: 'clamp(1.8rem,2.7vw,2.4rem)', h3: '1.15rem' }`

---

### Our Values Page

**`app/our-values/page.tsx`** — Server Component
- Canonical: `${SITE_URL}/our-values`

**`app/our-values/_content.tsx`** — `'use client'`
- Hero, AboutSection, IdentityCards (IntersectionObserver + CSS variable stagger), ValuesGrid, CTA
- IdentityCards uses `--accent` and `--delay` CSS custom properties for staggered reveal

---

### Industries Page

**`app/industries/page.tsx`** — Server Component
- Canonical: `${SITE_URL}/industries`

**`app/industries/_content.tsx`** — `'use client'`
- Hero, PrimaryVerticals, BroaderIndustries (hover cards), RightFit, CTA
- Page-local font sizes: `{ hero: 'clamp(2.2rem,4.5vw,3.6rem)', h2: 'clamp(1.7rem,2.5vw,2.3rem)', h3: '1.15rem' }`

---

### Privacy Policy Page

**`app/privacy-policy/page.tsx`** — Server Component
- Canonical: `${SITE_URL}/privacy-policy`
- `robots: { index: false, follow: true }` — privacy policy pages are conventionally noindexed

**`app/privacy-policy/_content.tsx`** — `'use client'`, ~25 KB
- Hero (dark gradient), SummaryStrip (3-cell card strip), PolicyBody
- `TableOfContents` — sticky sidebar with hover effects (requires `'use client'`)
- `PolicySections` — 13 SectionCard items using CheckList, Callout, SubBlock components
- Mobile responsive: `privacy-toc-desktop`/`privacy-toc-mobile` CSS classes swap at 900px
- Page-local font sizes: `{ hero: 'clamp(2.4rem,5vw,3.8rem)', h2: 'clamp(1.5rem,2.4vw,2rem)', h3: '1.05rem' }`

---

### Schedule Demo Page

**`app/schedule-demo/page.tsx`** — Server Component
- Canonical: `${SITE_URL}/schedule-demo`
- Two JSON-LD schemas: Organization + Service

**`app/schedule-demo/_content.tsx`** — `'use client'`
- `HubSpotEmbed` — `useRef<HTMLDivElement>` + `useEffect` injects HubSpot meetings script after container mounts; cleans up on HMR to prevent duplicate embeds
- Hero header with grid background + radial gradient
- Trust chips bar (4 badges)
- Two-column grid: calendar embed (left) + WhatToExpect + alternate contact (right)
- Uses `HUBSPOT_MEETINGS_URL` and `HUBSPOT_SCRIPT_URL` from `lib/constants.ts`

---

## Bug Fixes Applied

### 1. Unescaped apostrophes in single-quoted JSX string arrays (pre-existing)

**`app/about/_content.tsx` line 196:**
```tsx
// Before (syntax error):
'Honest advisors who tell you what's realistic'
// After:
'Honest advisors who tell you what's realistic'
```

**`app/industries/_content.tsx` line 140:**
```tsx
// Before (syntax error):
'off-the-shelf analytics tools aren't giving them what they need'
// After:
'off-the-shelf analytics tools aren\'t giving them what they need'
```

### 2. Stale type comparison in PrivacyPolicy H component

`size === 'h1'` compared against union `'hero' | 'h2' | 'h3'` — `'h1'` not in the union.
Fixed: removed dead `|| size === 'h1'` from the ternary.

### 3. Null bytes in privacy-policy/_content.tsx

Python heredoc write left 17 null bytes at end of file → TS1127 "Invalid character" errors.
Fixed with `data.rstrip(b'\x00')`.

---

## Semantic HTML Fixes

All pages use a page-local `H` wrapper that fixes the original codebase bug where every `H` component
always rendered `<h2>` regardless of `size` prop:

```tsx
// Original bug (Vite SPA) — always <h2>:
return <h2 style={...}>{children}</h2>

// Fixed (Next.js) — correct semantic tag:
const Tag = size === 'hero' ? 'h1' : size === 'h3' ? 'h3' : 'h2'
return <Tag style={...}>{children}</Tag>
```

Each page's H component preserves that page's original font sizes exactly (no pixel changes).

---

## SEO Enhancements Added

| Page | Metadata | JSON-LD | Canonical | OG/Twitter |
|------|----------|---------|-----------|------------|
| Home | ✅ | Organization + WebSite + SoftwareApplication | ✅ | ✅ |
| About | ✅ | Organization | ✅ | ✅ |
| Our Values | ✅ | Organization | ✅ | ✅ |
| Industries | ✅ | Organization | ✅ | ✅ |
| Privacy Policy | ✅ noindex | Organization | ✅ | ✅ |
| Schedule Demo | ✅ | Organization + Service | ✅ | ✅ |
| Not Found | — | — | — | — |

---

## Directory Structure After Phase 3

```
app/
├── _home-content.tsx          ← 'use client' — full Home page
├── layout.tsx                 ← Root layout (Navbar/Footer NOT here — in each _content)
├── not-found.tsx              ← 'use client' — 404 page
├── page.tsx                   ← Server Component — Home metadata + renders _home-content
├── globals.css
│
├── about/
│   ├── _content.tsx           ← 'use client'
│   └── page.tsx               ← Server Component
│
├── industries/
│   ├── _content.tsx
│   └── page.tsx
│
├── our-values/
│   ├── _content.tsx
│   └── page.tsx
│
├── privacy-policy/
│   ├── _content.tsx
│   └── page.tsx
│
└── schedule-demo/
    ├── _content.tsx
    └── page.tsx
```

---

## What's Next — Phase 4

Phase 4 will migrate the 6 product pages + ProductsIndex:

| Route | Source File |
|-------|------------|
| `/products` | `src/pages/ProductsIndex.jsx` |
| `/products/dea-lookup-tool` | `src/pages/products/DeaLookupTool.jsx` |
| `/products/dea-compliance-reporting` | `src/pages/products/DeaComplianceReporting.jsx` |
| `/products/cs-inventory` | `src/pages/products/CsInventory.jsx` |
| `/products/ltc-analytics` | `src/pages/products/LtcAnalytics.jsx` |
| `/products/pointclickcare-feed` | `src/pages/products/PointclickcareFeed.jsx` |
| `/products/document-automation` | `src/pages/products/DocumentAutomation.jsx` |

Each product page uses the shared `ProductHero` component and `buildSoftwareSchema()`.
