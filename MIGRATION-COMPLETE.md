# Migration Complete — Vite SPA → Next.js 15 App Router

**Project:** SkyPond Tech (`skypondtech.ai`)  
**Migration:** Vite + React 18 CSR SPA → Next.js 15 App Router (SSG)  
**Completed:** 2026-05-29  
**TypeScript errors at completion:** 0

---

## Why This Migration Was Done

The original site was a Vite + React single-page application (SPA) with client-side rendering.
SPAs are invisible to search engines until JavaScript executes — Google sees an empty `<div id="root">`.
The migration to Next.js 15 with App Router + SSG gives search engines fully-rendered HTML on every
page load, with complete metadata, structured data, and canonical URLs — essential for a B2B SaaS
company competing on organic search.

---

## 7-Phase Summary

### Phase 1 — Project Initialization & Foundation
Next.js 15 installed alongside the existing Vite project. TypeScript configured with `@/*` path
aliases. Akshar loaded via `next/font/google`. Root `layout.tsx` with Gotham font preload, theme
color, noscript fallback. Default metadata template. `lib/tokens.ts` and `lib/constants.ts`.
Sanity client migrated to `next-sanity`. `.env.example` created.

### Phase 2 — Shared Component Library
Full TypeScript migration of every shared component:
- `components/ui/`: Button, Card, Heading, Badge, Paragraph
- `components/layout/`: Navbar (useRouter + usePathname), Footer, Breadcrumb
- `components/sections/`: ProductHero (title: ReactNode)
- `components/seo/`: JsonLd + 5 schema builders (Organization, WebSite, Software, Service, Breadcrumb)

Key fix: `import.meta.env.BASE_URL` removed from Navbar and Footer; logo paths hardcoded.

### Phase 3 — Core Pages (6 routes)
Home, About, Our Values, Industries, Privacy Policy, Schedule Demo, Not Found (404).

Key patterns established:
- `page.tsx` (Server Component) exports `metadata` + renders `_content.tsx`
- `_content.tsx` (`'use client'`) contains all interactive JSX including Navbar + Footer
- Page-local `H` wrapper preserves per-page font sizes from the original exactly
- Testimonials: `sanityClient.fetch<Testimonial[]>(TESTIMONIALS_QUERY)` with carousel

### Phase 4 — Product Pages (7 routes)
Products index + 6 individual product pages.

Key fix: `extract_main_content()` transformer correctly extracts section components from the
original JSX export function (avoiding the `return (` literal embedding bug from the first pass).
`ProductHero title: string` widened to `ReactNode`.

### Phase 5 — Service Pages (7 routes)
Services index + 6 individual service pages.

Key fix: `useRef`/`useEffect` auto-detected and added to imports. `CONTACT_PHONE` constants
added to all service pages. `C.orange` (non-existent token) replaced with `'#F79043'`.

### Phase 6 — Technical SEO Infrastructure
- `app/sitemap.ts` — 20-route dynamic sitemap with priority + changeFrequency
- `app/robots.ts` — robots.txt with disallow for noindex pages, sitemap reference
- `public/llms.txt` — LLM-readable site index (llmstxt.org spec)
- `next.config.ts` — CSP header + trailing-slash redirects added
- `app/opengraph-image.tsx` — Edge-rendered 1200×630 default OG image

### Phase 7 — Pre-Deploy QA & Documentation
Static analysis: 0 React Router remnants, 0 `import.meta.env` references, all 20 routes
verified. `<img>` → `<Image>` in Testimonials. `DEPLOYMENT-GUIDE.md` written.

---

## Architecture at a Glance

```
app/
├── layout.tsx              Root layout (Akshar font, Gotham preload, noscript)
├── page.tsx                Home — Server Component (OG metadata + 3 JSON-LD)
├── _home-content.tsx       Home — Client Component (~49KB, 10 sections)
├── not-found.tsx           404 — Client Component
├── sitemap.ts              Dynamic /sitemap.xml (20 routes)
├── robots.ts               /robots.txt
├── opengraph-image.tsx     Default OG image (edge-rendered)
├── about/                  Server + Client Component pair
├── our-values/             "
├── industries/             "
├── privacy-policy/         "  (noindex)
├── schedule-demo/          "  (HubSpot embed)
├── products/               Products index + 6 product pages
└── services/               Services index + 6 service pages

components/
├── layout/   Navbar · Footer · Breadcrumb
├── sections/ ProductHero
├── seo/      JsonLd + schema builders
└── ui/       Button · Card · Heading · Badge · Paragraph

lib/
├── tokens.ts           Design tokens
├── constants.ts        SITE_URL, contact info, HubSpot URLs
└── sanity/
    ├── client.ts       next-sanity createClient
    └── queries.ts      GROQ query strings + TypeScript types
```

---

## SEO Signals — Before vs After

| Signal | Before (Vite SPA) | After (Next.js SSG) |
|--------|-------------------|---------------------|
| HTML at first byte | ❌ Empty `<div id="root">` | ✅ Full page content |
| `<title>` per page | ❌ All same | ✅ Unique per route |
| `<meta description>` per page | ❌ None | ✅ Unique per route |
| Canonical URLs | ❌ None | ✅ All 20 routes |
| Open Graph tags | ❌ None | ✅ All routes |
| Twitter Card tags | ❌ None | ✅ All routes |
| JSON-LD structured data | ❌ None | ✅ 4 schema types, 47+ injections |
| BreadcrumbList schema | ❌ None | ✅ All inner pages |
| sitemap.xml | ❌ None | ✅ 20 routes |
| robots.txt | ❌ None | ✅ With sitemap reference |
| llms.txt | ❌ None | ✅ llmstxt.org spec |
| CSP / security headers | ✅ Partial | ✅ Full (added CSP) |
| Default OG image | ❌ None | ✅ Edge-rendered |
| Semantic h1/h2/h3 | ❌ All h2 bug | ✅ Correct tags throughout |
| Fonts: no FOUT | ❌ External Google Fonts | ✅ next/font/google (build-time) |

---

## Next Steps After Deployment

1. Run Lighthouse — target Performance 85+, SEO 100 on all pages
2. Google Search Console — submit sitemap, request indexing
3. Remove `src/` (Vite SPA) and Vite config once Vercel deploy verified
4. Add `og:image` per product/service page (extend `opengraph-image.tsx` with route params)
5. Build the Resource pages (Case Studies, Blog, FAQs) to replace footer placeholder links
6. Add Sanity testimonials in Studio if not yet published
