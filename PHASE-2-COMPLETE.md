# Phase 2 Complete — Shared Component Library

**Status:** ✅ Done  
**TypeScript:** `npx tsc --noEmit` → 0 errors  
**Design change:** None — all inline styles preserved pixel-for-pixel from originals

---

## What Was Built

Phase 2 creates the entire shared component library that every page in Phases 3–5 will import.
No page routes were created yet — this phase is purely the reusable building blocks.

---

## Files Created

### UI Primitives — `components/ui/`

| File | Replaces | Key change |
|------|----------|------------|
| `Heading.tsx` | Local `H` component (copy-pasted in 10+ files) | **Bug fixed:** now renders `<h1>`, `<h2>`, or `<h3>` based on `size` prop. Original always rendered `<h2>` regardless. Sizes: `hero`→h1, `h1`→h1, `h2`→h2, `h3`→h3 |
| `Badge.tsx` | Local `Badge` component (copy-pasted in 10+ files) | Zero changes. Extracted to single source of truth |
| `Paragraph.tsx` | Local `P` component (copy-pasted in 10+ files) | Zero changes. Extracted to single source of truth |
| `Card.tsx` | Local `Card` component (copy-pasted in 10+ files) | `'use client'` added for `useState` hover. Zero style changes |
| `Button.tsx` | `src/components/ui/Button.jsx` | `Link` from `react-router-dom` → `Link` from `next/link`. Props identical |

### SEO Infrastructure — `components/seo/`

| File | Purpose |
|------|---------|
| `JsonLd.tsx` | Injects `<script type="application/ld+json">` blocks. Accepts single schema or array |
| `schemas/organization.ts` | `Organization` schema — SkyPond Tech identity, contact, social, logo |
| `schemas/website.ts` | `WebSite` schema — enables Google Sitelinks Searchbox potential |
| `schemas/software.ts` | `buildSoftwareSchema(opts)` — builder function used on each product page |
| `schemas/service.ts` | `buildServiceSchema(opts)` — builder function used on each service page |
| `schemas/breadcrumb.ts` | `buildBreadcrumbSchema(items)` — builder function, also exported `BreadcrumbItem` type |

All schemas use `schema-dts` TypeScript types for compile-time correctness.
`schema-dts` added to `package.json` devDependencies.

### Layout Components — `components/layout/`

| File | Replaces | Key changes |
|------|----------|-------------|
| `Breadcrumb.tsx` | `src/components/Breadcrumb.jsx` | **New:** injects `BreadcrumbList` JSON-LD automatically. `Link` → `next/link`. Server component (no client hooks needed) |
| `Footer.tsx` | `src/components/Footer.jsx` | `'use client'` for hover state. `import.meta.env.BASE_URL` removed → `/navbar-logo-white.png` hardcoded. `Link` → `next/link`. Zero style changes |
| `Navbar.tsx` | `src/components/Navbar.jsx` | See full change log below |

### Section Components — `components/sections/`

| File | Replaces | Key changes |
|------|----------|-------------|
| `ProductHero.tsx` | `src/components/ProductHero.jsx` | `'use client'` for `document.getElementById` onClick. Zero style changes |

---

## Navbar Change Log (Most Complex Migration)

The Navbar was the most involved component. Every change is documented here:

| Original (React) | Next.js replacement | Reason |
|-----------------|---------------------|--------|
| `import.meta.env.BASE_URL` | Removed — `/navbar-logo-white.png` hardcoded | Vite-specific API, does not exist in Next.js |
| `useNavigate()` from react-router-dom | `useRouter()` from next/navigation | Next.js navigation hook |
| `useLocation()` from react-router-dom | `usePathname()` from next/navigation | Next.js pathname hook |
| `{ pathname, hash }` from useLocation | `pathname` from usePathname + `hash` from useState + hashchange listener | Next.js has no built-in hash hook |
| `navigate({ pathname:"/", hash:"#contact" })` | `router.push('/#contact')` | Equivalent navigation |
| `Link as RouterLink` from react-router-dom | `Link` from next/link | Standard Next.js link |
| `pathname.startsWith(...)` | `p.startsWith(...)` where `p = pathname ?? '/'` | `usePathname()` types as `string \| null` |

**Hash tracking:** A `useEffect` listens to the `hashchange` window event and keeps a `hash` state variable in sync, enabling the `Contact` nav item active state to work correctly.

---

## TypeScript Notes

- All components typed with proper interfaces
- `usePathname()` null-safety: `const p = pathname ?? '/'` guards all comparisons
- `schema-dts` provides compile-time Schema.org type checking
- `'use client'` applied only where browser APIs are needed:
  - `Heading`, `Badge`, `Paragraph`, `Breadcrumb` — **Server components** (no state/effects)
  - `Card`, `Button`, `Footer`, `ProductHero`, `Navbar` — **Client components** (useState/useEffect/DOM)

---

## Import Paths for Phase 3+

```typescript
// UI primitives
import { Heading }   from '@/components/ui/Heading'
import { Badge }     from '@/components/ui/Badge'
import { Paragraph } from '@/components/ui/Paragraph'
import { Card }      from '@/components/ui/Card'
import { Button }    from '@/components/ui/Button'

// Layout
import { Navbar }     from '@/components/layout/Navbar'
import { Footer }     from '@/components/layout/Footer'
import { Breadcrumb } from '@/components/layout/Breadcrumb'

// Sections
import { ProductHero } from '@/components/sections/ProductHero'

// SEO
import { JsonLd }              from '@/components/seo/JsonLd'
import { organizationSchema }  from '@/components/seo/schemas/organization'
import { websiteSchema }       from '@/components/seo/schemas/website'
import { buildSoftwareSchema } from '@/components/seo/schemas/software'
import { buildServiceSchema }  from '@/components/seo/schemas/service'
import { buildBreadcrumbSchema, type BreadcrumbItem } from '@/components/seo/schemas/breadcrumb'
```

---

## Ready for Phase 3

Phase 3 will build the core pages:
- `app/page.tsx` — Home (replaces placeholder, migrates full Home.jsx with Sanity testimonials)
- `app/about/page.tsx`
- `app/our-values/page.tsx`
- `app/industries/page.tsx`
- `app/privacy-policy/page.tsx`
- `app/schedule-demo/page.tsx`
- `app/not-found.tsx` (upgrade from placeholder)
