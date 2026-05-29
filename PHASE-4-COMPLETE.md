# Phase 4 — Product Pages Migration: Complete

**Date:** 2026-05-29
**Status:** ✅ Complete

---

## Overview

Phase 4 migrated all 7 product-related pages from the Vite + React SPA (`src/pages/`) to Next.js 15
App Router (`app/`). Each page follows the same `page.tsx` (Server Component + metadata) +
`_content.tsx` (`'use client'` + all JSX) split established in Phase 3.

TypeScript check result: **0 errors** (all source files + generated `.next/types` clean).

---

## Routes Migrated

| Next.js Route | Original File | Canonical URL |
|---------------|---------------|---------------|
| `/products` | `src/pages/ProductsIndex.jsx` | `https://skypondtech.ai/products` |
| `/products/dea-lookup` | `src/pages/products/DeaLookupTool.jsx` | `.../dea-lookup` |
| `/products/dea-compliance-reporting` | `src/pages/products/DeaComplianceReporting.jsx` | `.../dea-compliance-reporting` |
| `/products/cs-inventory` | `src/pages/products/CsInventory.jsx` | `.../cs-inventory` |
| `/products/ltc-analytics` | `src/pages/products/LtcAnalytics.jsx` | `.../ltc-analytics` |
| `/products/pointclickcare-feed` | `src/pages/products/PointclickcareFeed.jsx` | `.../pointclickcare-feed` |
| `/products/document-automation` | `src/pages/products/DocumentAutomation.jsx` | `.../document-automation` |

Routes exactly match the original SPA (`/products/dea-lookup`, not `/products/dea-lookup-tool`)
to preserve all existing inbound links.

---

## Files Created

### Products Index

**`app/products/page.tsx`** — Server Component
- Full metadata: title, description, canonical, OG, Twitter
- Organization JSON-LD schema

**`app/products/_content.tsx`** — `'use client'`
- Tab filter bar: All / Compliance / Operations / Analytics / Integrations (`useState`)
- `useMemo` for filtered product list
- 6-card grid with `ProductCard` (hover translate + box-shadow)
- Each card: dark `C.p` header band, icon, badge, description, 4-item feature list, View/Demo CTAs
- `Link` from `next/link` replacing `react-router-dom` Link

### Individual Product Pages (6 × 2 files each)

Each product page generates a `page.tsx` + `_content.tsx` pair. The `_content.tsx` files were
migrated using an automated AST-like transformation that:
1. Replaces all import paths with `@/` aliases
2. Swaps the shared primitives (Badge, H, P, Card) with properly-typed TypeScript versions
3. Preserves the middle section (mockups, DiagramStrip, Features, HowItWorks, UseCases,
   Compliance, Related, CTA) verbatim from the original JSX
4. Wraps the export default body in a named export with Navbar + Breadcrumb + Footer

#### Sections per product page:

| Section | DEA Lookup | DEA Compliance | CS Inventory | LTC Analytics | PCC Feed | Doc Automation |
|---------|-----------|----------------|--------------|---------------|----------|----------------|
| Hero (ProductHero) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| DiagramStrip/FlowStrip | ✅ | ✅ | ✅ | — | ✅ | ✅ |
| Features (3 mockup panels) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| HowItWorks (4-step) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| UseCases | ✅ | — | ✅ | ✅ | — | ✅ |
| Compliance | ✅ | — | ✅ | — | — | ✅ |
| Related Products | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| CTA | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

### SEO per product page

Each `page.tsx` exports full metadata + 2 JSON-LD schemas:
- `organizationSchema` (shared from Phase 2)
- `buildSoftwareSchema({ name, description, url, price })` (product-specific)

---

## Bugs Fixed During Phase 4

### 1. `buildSoftwareSchema` extra properties

The `page.tsx` files were initially generated with `category`, `operatingSystem`, `offers` properties
that don't exist in `SoftwareSchemaOptions`. Fixed by removing them — the schema builder handles
those internally and only accepts `{ name, description, url, price? }`.

### 2. `buildServiceSchema` extra `provider` property

`app/schedule-demo/page.tsx` had a `provider: { ... }` property not in `ServiceSchemaOptions`.
Removed — the schema builder already adds the SkyPond Tech provider internally.

### 3. `ProductHero title: string → ReactNode`

`ProductHeroProps` originally typed `title` as `string`. Every product page passes JSX like:
```tsx
title={(
  <>
    Instant <span style={{ color: C.p }}>DEA registrant</span>
    <br />
    verification, every time
  </>
)}
```
Fixed by:
1. Adding `import type { ReactNode } from 'react'`
2. Changing `title: string` → `title: ReactNode`
3. Rewriting the full file (Edit tool truncated it mid-`</section>` after the change)

### 4. Double type annotation from `fix_any` script

An automated script added `: { [key: string]: any }` to all destructured function params,
including already-typed ones (Badge, H, P, Card), creating invalid double annotations like:
```tsx
function Badge({ c, children }: { c?: string; children: ReactNode }: { [key: string]: any })
```
Fixed with a targeted regex that removed spurious trailing `: { [key: string]: any }` from
functions that already had explicit type annotations.

### 5. Implicit `any` in extracted JSX sub-components

The middle section extracted from each original JSX file had untyped component props (standard
in JSX, error in strict TypeScript). Two types of fixes applied:
- Destructured function params: added `: { [key: string]: any }` type annotation
- Arrow function params in `.map()` callbacks: added `: any` to each parameter
- Arrow component patterns (`const Foo = ({ x }) =>`): added `: { [key: string]: any }`

### 6. Null bytes

The Edit tool left null bytes in `app/page.tsx` after the `buildSoftwareSchema` fix.
Stripped with `data.replace(b'\x00', b'')`.

---

## Component Updates

### `components/sections/ProductHero.tsx`

- `title` prop type: `string` → `ReactNode` (to accept JSX spans for coloured keywords)
- Added `import type { ReactNode } from 'react'`
- No visual changes — zero pixel differences

---

## Directory Structure After Phase 4

```
app/
├── products/
│   ├── _content.tsx               ← 'use client' — Products index
│   ├── page.tsx                   ← Server Component
│   ├── dea-lookup/
│   │   ├── _content.tsx
│   │   └── page.tsx
│   ├── dea-compliance-reporting/
│   │   ├── _content.tsx
│   │   └── page.tsx
│   ├── cs-inventory/
│   │   ├── _content.tsx
│   │   └── page.tsx
│   ├── ltc-analytics/
│   │   ├── _content.tsx
│   │   └── page.tsx
│   ├── pointclickcare-feed/
│   │   ├── _content.tsx
│   │   └── page.tsx
│   └── document-automation/
│       ├── _content.tsx
│       └── page.tsx
```

---

## What's Next — Phase 5

Phase 5 will migrate the 6 service pages + ServicesIndex:

| Route | Source File |
|-------|------------|
| `/services` | `src/pages/ServicesIndex.jsx` |
| `/services/ltc-pharmacy-it` | `src/pages/services/LTCPharmacyIT.jsx` |
| `/services/ai-automation` | `src/pages/services/AIAutomation.jsx` |
| `/services/data-analytics` | `src/pages/services/DataAnalytics.jsx` |
| `/services/custom-development` | `src/pages/services/CustomDevelopment.jsx` |
| `/services/microsoft-cloud` | `src/pages/services/MicrosoftCloud.jsx` |
| `/services/pointclickcare-integration` | `src/pages/services/PointClickCare.jsx` |

The same transformation script (`transform3.py` approach) can be reused with the service page
source files — the pattern is identical to product pages.
