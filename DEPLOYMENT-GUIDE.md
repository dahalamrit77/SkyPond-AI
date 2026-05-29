# SkyPond Tech — Deployment Guide

**Stack:** Next.js 15 · App Router · SSG · Vercel  
**Pre-deploy status:** TypeScript 0 errors · 20 routes · All phases complete

---

## Before You Push

### 1. Run the production build locally

```bash
cd skypond-tech
npm run build
```

This catches runtime errors that TypeScript misses (missing env vars, invalid JSON-LD,
Sanity schema mismatches, etc.). The sandbox build failed due to network restrictions —
run this on your local machine before pushing.

**Expected output:**
```
Route (app)                              Size     First Load JS
┌ ○ /                                   ...
├ ○ /about                              ...
├ ○ /products                           ...
...
○  (Static)   prerendered as static content
```

All 20 routes should show `○ (Static)` — fully pre-rendered at build time.

### 2. Set environment variables in `.env.local`

Copy `.env.example` and fill in your Sanity values:

```bash
cp .env.example .env.local
```

Then edit `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<your project ID from sanity.io/manage>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-12
```

> ⚠️ `.env.local` is gitignored. Never commit it.

### 3. Verify public assets exist

The site references these files — confirm they are in `/public/`:

| File | Used by |
|------|---------|
| `/fonts/Gotham-Book.woff2` | Layout preload + globals.css |
| `/fonts/Gotham-Light.woff2` | Layout preload + globals.css |
| `/navbar-logo-white.png` | Navbar (logo on dark backgrounds) |
| `/navbar-logo.png` | Navbar (logo on light backgrounds) |
| `/favicon.ico` or `/icon.png` | Browser tab icon |

If any are missing, the site still works (Gotham falls back to Helvetica Neue; logo falls
back to text) — but add them before launch for a polished result.

---

## Vercel Deployment

### 1. Push to GitHub

```bash
git add -A
git commit -m "feat: complete Next.js 15 migration — 7 phases"
git push origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repository
3. Framework: **Next.js** (auto-detected)
4. Root directory: `.` (leave as default)
5. Click **Deploy** — first deploy will fail because env vars are missing (that's expected)

### 3. Add environment variables

In Vercel Dashboard → Project → Settings → Environment Variables:

| Variable | Value | Environments |
|----------|-------|--------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | your project ID | Production, Preview, Development |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Production, Preview, Development |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2026-05-12` | Production, Preview, Development |

### 4. Redeploy

Vercel Dashboard → Deployments → Redeploy latest. All 20 routes should build successfully.

### 5. Custom domain

Vercel Dashboard → Project → Settings → Domains → Add `skypondtech.ai`.

Set DNS at your registrar:
```
A     @    76.76.21.21
CNAME www  cname.vercel-dns.com
```

---

## Post-Deploy Checklist

### Functional checks

- [ ] Home page loads — AgentWidget animates, hero renders correctly
- [ ] `/schedule-demo` — HubSpot calendar embed loads inside the card
- [ ] `/products/dea-lookup` — ProductHero renders, JSX title (styled span) displays correctly
- [ ] `/services/ai-automation` — IntersectionObserver scroll animations fire on scroll
- [ ] `/our-values` — IdentityCards reveal animation on scroll
- [ ] `/#contact` deep link from Navbar — scrolls to Contact form
- [ ] Testimonials on Home — Sanity data loads (requires Sanity env vars + published content)
- [ ] 404 page — visit `/nonexistent-route`, confirm branded 404 renders
- [ ] Privacy policy — `robots.txt` should disallow it; verify noindex meta is set

### SEO checks

- [ ] `https://skypondtech.ai/sitemap.xml` — returns XML with 20 URLs
- [ ] `https://skypondtech.ai/robots.txt` — shows Allow, Disallow /privacy-policy, Sitemap reference
- [ ] `https://skypondtech.ai/llms.txt` — LLM index serves correctly
- [ ] `https://skypondtech.ai/opengraph-image` — OG image renders (1200×630 dark card)
- [ ] Google Rich Results Test (`search.google.com/test/rich-results`) — test Home, a product page, and a service page; should show Organization + SoftwareApplication/Service schemas

### Google Search Console

1. Verify property ownership (DNS TXT record or HTML file method)
2. Submit sitemap: **Sitemaps** → Add `https://skypondtech.ai/sitemap.xml`
3. Use **URL Inspection** to request indexing for:
   - `https://skypondtech.ai/`
   - `https://skypondtech.ai/products`
   - `https://skypondtech.ai/services`

### Lighthouse audit

Run in Chrome DevTools → Lighthouse → Desktop mode:

| Page | Target |
|------|--------|
| Home (`/`) | Performance 85+, SEO 100 |
| `/products/dea-lookup` | Performance 90+, SEO 100 |
| `/services/ai-automation` | Performance 90+, SEO 100 |

---

## Known items to address before launch

### Footer resource links point to `skypondtech.com`

`components/layout/Footer.tsx` has placeholder resource links pointing to the old domain:
```tsx
['Case Studies', 'https://skypondtech.com/resources/case-studies/'],
['Blog',         'https://skypondtech.com/resources/blogs/'],
['FAQs',         'https://skypondtech.com/resources/faqs/'],
```
These pages don't exist yet on the new site. Either:
- Replace with `https://skypondtech.ai/...` once those pages are built, or
- Remove the links temporarily until the pages are ready

### `skypondtech.com` vs `skypondtech.ai`

`lib/constants.ts` has `CONTACT_EMAIL = 'info@skypondtech.com'` — the email domain is
intentionally `skypondtech.com` (email, not site URL). No change needed.

### Sanity testimonials

If no testimonials are published in Sanity, the Testimonials section on the Home page
silently hides itself (`if (data.length === 0) return null`). Publish at least one
testimonial in Sanity Studio before launch.

---

## Files changed by this migration

```
app/                          All new — 20 page.tsx + 20 _content.tsx files
components/layout/            Navbar.tsx, Footer.tsx, Breadcrumb.tsx (migrated)
components/sections/          ProductHero.tsx (migrated + title: ReactNode fix)
components/ui/                Button.tsx, Card.tsx, Heading.tsx, Badge.tsx, Paragraph.tsx
components/seo/               JsonLd.tsx + 5 schema builders
lib/                          tokens.ts, constants.ts, sanity/client.ts, sanity/queries.ts
app/sitemap.ts                New
app/robots.ts                 New
app/opengraph-image.tsx       New
app/globals.css               Updated (Gotham @font-face, animations)
app/layout.tsx                New (root layout with Akshar via next/font)
next.config.ts                Updated (CSP header, redirects added)
public/llms.txt               New
.env.example                  New
PHASE-1-COMPLETE.md           New
PHASE-2-COMPLETE.md           New
PHASE-3-COMPLETE.md           New
PHASE-4-COMPLETE.md           New
PHASE-5-COMPLETE.md           New
PHASE-6-COMPLETE.md           New
PHASE-7-COMPLETE.md           New
MIGRATION-COMPLETE.md         New
```

**Original Vite files are untouched in `src/`.** Once the Vercel deployment is verified,
delete `src/`, `index.html`, `vite.config.ts`, and remove Vite from `package.json`.
