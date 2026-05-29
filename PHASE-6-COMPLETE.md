# Phase 6 — Technical SEO Infrastructure: Complete

**Date:** 2026-05-29
**Status:** ✅ Complete

---

## Overview

Phase 6 added all technical SEO infrastructure: dynamic sitemap, robots.txt, LLM index file,
Content-Security-Policy header, trailing-slash redirects, and an edge-rendered Open Graph image.

TypeScript check result: **0 errors** across all source files.

---

## Files Created / Modified

### `app/sitemap.ts` — Dynamic Sitemap

Next.js App Router generates `/sitemap.xml` automatically from this file.

- **20 routes** covered across core, product, and service pages
- `privacy-policy` intentionally excluded (noindex page)
- Priority scheme:
  - `1.0` — Home
  - `0.9` — `/products`, `/services` index pages
  - `0.8` — All individual product and service pages + `/schedule-demo`
  - `0.7` — `/about`, `/industries`
  - `0.6` — `/our-values`
- `changeFrequency`: weekly for indexes, monthly for leaf pages, yearly for static pages
- Uses `MetadataRoute.Sitemap` type — fully typed, zero runtime overhead

### `app/robots.ts` — Robots.txt

Next.js App Router serves `/robots.txt` automatically.

- `Allow: /` for all user agents
- `Disallow: /privacy-policy` (noindex page excluded from crawl)
- `Sitemap:` reference injected pointing to `/sitemap.xml`
- `Host:` canonical domain declared
- GPTBot, ClaudeBot, PerplexityBot — allowed (not disallowed, site provides LLM content via llms.txt)

### `public/llms.txt` — LLM-Readable Site Index

Following the [llmstxt.org](https://llmstxt.org) spec. Served at `/llms.txt`.

Structure:
- `# SkyPond Tech` — Site name
- `>` — One-paragraph site description with domain context
- `## Core Products` — 6 product entries with URLs + plain-English descriptions
- `## Core Services` — 6 service entries with URLs + descriptions
- `## Company` — About, Industries, Our Values
- `## Contact & Scheduling` — Schedule Demo with contact info
- `## Optional` — Privacy Policy

Optimised for AI crawlers (GPTBot, ClaudeBot, Perplexity) to accurately understand and
summarise SkyPond Tech's products and services in AI-generated answers.

### `next.config.ts` — CSP Header + Trailing-Slash Redirects

**Added `Content-Security-Policy` header** (was missing from the existing config):

```
default-src 'self'
script-src 'self' 'unsafe-inline' 'unsafe-eval' static.hsappstatic.net
style-src 'self' 'unsafe-inline' fonts.googleapis.com
font-src 'self' fonts.gstatic.com data:
img-src 'self' data: blob: cdn.sanity.io
frame-src meetings-na2.hubspot.com
connect-src 'self' *.sanity.io *.hubspot.com
```

- `unsafe-inline` / `unsafe-eval` required for Next.js hydration and inline styles
- HubSpot meetings embed allowed in `frame-src` + `script-src`
- Sanity CDN allowed in `img-src` + `connect-src`

**Added `redirects()`** — 7 trailing-slash redirects (301 permanent):
- `/about/` → `/about`
- `/products/` → `/products`
- etc. for all top-level slugs

Existing headers (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy,
Permissions-Policy, X-DNS-Prefetch-Control) preserved unchanged.

### `app/opengraph-image.tsx` — Default OG Image

Edge-rendered Open Graph image using `next/og` (`ImageResponse`).

- Dimensions: 1200×630 (standard OG ratio)
- `export const runtime = 'edge'` — no cold starts, global CDN
- Design: dark `#143156` background, radial glow orbs, SkyPond Tech wordmark with green dot,
  large headline with `#8AB8E3` accent colour, 6 product pills at the bottom
- Used as default OG image for any page that doesn't define its own `openGraph.images`
- Font: `system-ui, sans-serif` (edge runtime doesn't support custom font fetching without
  explicit font loading via `fetch()` — added as a future improvement)

---

## SEO Coverage Summary (Phases 1–6)

| Signal | Status |
|--------|--------|
| Server-side rendering (SSG) | ✅ Next.js App Router |
| Per-page `<title>` + `<meta description>` | ✅ All 20 routes |
| Canonical URLs | ✅ All routes |
| Open Graph tags (OG title, description, URL, type) | ✅ All routes |
| Twitter Card tags | ✅ All routes |
| Default OG image | ✅ Edge-rendered `/opengraph-image` |
| JSON-LD structured data (Organization) | ✅ All routes |
| JSON-LD structured data (WebSite + SearchAction) | ✅ Home page |
| JSON-LD structured data (SoftwareApplication) | ✅ All 6 product pages + Home |
| JSON-LD structured data (Service) | ✅ All 6 service pages + Schedule Demo |
| JSON-LD structured data (BreadcrumbList) | ✅ All inner pages |
| Dynamic sitemap.xml | ✅ 20 routes |
| robots.txt | ✅ With sitemap reference |
| llms.txt (AI crawler index) | ✅ llmstxt.org spec |
| Content-Security-Policy | ✅ next.config.ts |
| HSTS / X-Frame-Options / MIME protection | ✅ next.config.ts |
| Trailing-slash canonical redirects | ✅ next.config.ts |
| Akshar font via next/font/google | ✅ app/layout.tsx |
| Gotham font preload links | ✅ app/layout.tsx |
| Semantic HTML (h1/h2/h3 correct tags) | ✅ Fixed in all migrated pages |

---

## What's Next — Phase 7

Phase 7 — Deployment to Vercel + final QA:

- Push to GitHub and connect Vercel project
- Configure environment variables (`.env.local` → Vercel dashboard)
- Verify sitemap.xml and robots.txt live
- Google Search Console: submit sitemap, request indexing
- Run Lighthouse audit on Home, a product page, and a service page
- Verify HubSpot embed loads on `/schedule-demo`
- Verify Sanity testimonials load on home page
- Check 404 page renders correctly
- Confirm all JSON-LD schemas valid via Google Rich Results Test
