# Phase 5 — Service Pages Migration: Complete

**Date:** 2026-05-29
**Status:** ✅ Complete

---

## Overview

Phase 5 migrated all 7 service-related pages from the Vite + React SPA to Next.js 15 App Router.
The same `page.tsx` + `_content.tsx` architectural pattern is used throughout.

TypeScript check result: **0 errors** across all source files.

---

## Routes Migrated

| Next.js Route | Original File | Canonical URL |
|---------------|---------------|---------------|
| `/services` | `src/pages/ServicesIndex.jsx` | `https://skypondtech.ai/services` |
| `/services/ltc-pharmacy-it` | `src/pages/services/LTCPharmacyIT.jsx` | `.../ltc-pharmacy-it` |
| `/services/ai-automation` | `src/pages/services/AIAutomation.jsx` | `.../ai-automation` |
| `/services/data-analytics` | `src/pages/services/DataAnalytics.jsx` | `.../data-analytics` |
| `/services/custom-development` | `src/pages/services/CustomDevelopment.jsx` | `.../custom-development` |
| `/services/microsoft-cloud` | `src/pages/services/MicrosoftCloud.jsx` | `.../microsoft-cloud` |
| `/services/pointclickcare-integration` | `src/pages/services/PointClickCare.jsx` | `.../pointclickcare-integration` |

---

## Files Created

### Services Index

**`app/services/page.tsx`** — Server Component
- Full metadata + Organization JSON-LD (no Service schema at index level)

**`app/services/_content.tsx`** — `'use client'` (hand-written, ~8.7KB)
- Dark gradient hero with grid overlay + radial glow orbs
- 6-card services grid with hover (translate + box-shadow) — all cards link via `next/link`
- CTA section with `C.p` background and orb decorations
- `ServiceCard` properly typed: `{ icon, color, title, desc, href, tag }` with full TypeScript types
- `Link` from `next/link` replacing `react-router-dom` Link

### Individual Service Pages (6 × 2 files each)

Each `page.tsx` exports `generateMetadata` + 2 JSON-LD schemas (Organization + Service).
Each `_content.tsx` is generated via the proven `transform_final.py` approach.

#### Service schemas used:

| Service | serviceType |
|---------|-------------|
| LTC Pharmacy IT | `'LTC Pharmacy IT'` |
| AI Automation | `'AI Automation'` |
| Data Analytics | `'Data Analytics'` |
| Custom Development | `'Custom Software Development'` |
| Microsoft Cloud | `'Microsoft Cloud Services'` |
| PointClickCare Integration | `'PointClickCare Integration'` |

#### Sections per service page:

| Section | LTC IT | AI Auto | Data | Custom Dev | MS Cloud | PCC |
|---------|--------|---------|------|------------|----------|-----|
| Hero (ProductHero) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Process/HowItWorks | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Automations/Stack/Cases | — | ✅ | ✅ | — | ✅ | ✅ |
| UseCases/FAQ | — | ✅ | ✅ | — | — | — |
| Related Services | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| CTA | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Bugs Fixed During Phase 5

### 1. `return (...)` inside `<main>` — fundamental transformer bug

The Phase 4 transformer extracted the inner body of the export default function using
`find_export_default_inner()`, which returns the full function body including the `return (...)`
statement. Wrapping that in `<main>...</main>` produced:

```tsx
<main>return (
  <>
    <Navbar />
    <main><Hero />...</main>
    <Footer />
  </>
)</main>
```

This was syntactically confusing but TypeScript didn't flag it as a syntax error. However it
would render "return (" as literal text in the browser — a real bug.

**Fix**: Rewrote the extractor to use `extract_main_content()` which specifically locates the
`<main>` tag in the original JSX return statement and extracts its inner content (just the section
components: `<Hero />`, `<Features />`, etc.). This is then placed inside our own `<main>` tag.

All 12 product + service pages were regenerated with this fix.

### 2. Missing `useRef` / `useEffect` imports

Service pages that use `IntersectionObserver` for scroll animations import `useRef` and `useEffect`
from React. The transform script only added `useState` to the header. Fixed by:
- Detecting `useRef`/`useEffect` usage in the source before transformation
- Dynamically adding them to the React import line

### 3. Missing `CONTACT_PHONE` / `CONTACT_PHONE_DISPLAY` constants

All service pages reference phone number constants from the original `config/constants.js`. Added
`import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '@/lib/constants'` to all service pages
via the updated `build_header()` function.

### 4. `C.orange` — non-existent token

`LTCPharmacyIT.jsx` referenced `C.orange` in the Related products section. `tokens.js` has no
`orange` property. Fixed by replacing `C.orange` with `'#F79043'` (the `C.red` orange-red value
from the token file, which was the intended accent color for the Data Analytics service).

### 5. `href: null` in Breadcrumb (residual from Phase 3/4)

The `schedule-demo/page.tsx` still had a `provider` error (fixed in Phase 4), and several service
files had `href: null` in breadcrumb items. Fixed via `src.replace('href: null', '')` in the
transformer, which removes the `href` key entirely so the `BreadcrumbItem` interface is satisfied
(`href?` is optional — absence = current page).

---

## Transformer Improvements (carried forward to all phases)

The `transform_final.py` script now handles:
- **Correct section extraction**: uses `extract_main_content()` to get only `<Hero />`, `<Features />` etc.
- **Dynamic hook detection**: automatically adds `useRef`/`useEffect` if source uses them
- **Constants import**: always includes `CONTACT_PHONE`/`CONTACT_PHONE_DISPLAY`
- **Implicit any patching**: fixes `.map()` callbacks, destructured function params, arrow components
- **Token fixes**: replaces non-existent token references (e.g., `C.orange`)

---

## Directory Structure After Phase 5

```
app/
├── services/
│   ├── _content.tsx                    ← 'use client' — Services index
│   ├── page.tsx                        ← Server Component
│   ├── ltc-pharmacy-it/
│   │   ├── _content.tsx
│   │   └── page.tsx
│   ├── ai-automation/
│   │   ├── _content.tsx
│   │   └── page.tsx
│   ├── data-analytics/
│   │   ├── _content.tsx
│   │   └── page.tsx
│   ├── custom-development/
│   │   ├── _content.tsx
│   │   └── page.tsx
│   ├── microsoft-cloud/
│   │   ├── _content.tsx
│   │   └── page.tsx
│   └── pointclickcare-integration/
│       ├── _content.tsx
│       └── page.tsx
```

---

## What's Next — Phase 6

Phase 6 covers Technical SEO Infrastructure:

- **`app/sitemap.ts`** — Dynamic sitemap.xml with all routes, `lastModified`, `changeFrequency`
- **`app/robots.ts`** — robots.txt with sitemap reference and crawl rules
- **`public/llms.txt`** — LLM-readable site index for AI crawlers
- **`next.config.ts`** — Security headers, image domains, redirects (e.g., trailing slash)
- **`app/opengraph-image.tsx`** — Edge-rendered OG image for social sharing
- **`next/image` audit** — Replace `<img>` tags with `<Image />` where beneficial
