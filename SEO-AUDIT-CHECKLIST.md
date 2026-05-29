# SkyPond Tech — SEO Audit Checklist
**Audited by:** Claude SEO (seo-technical · seo-schema · seo-audit · seo-sitemap · seo-content · seo-geo)  
**Date:** 2026-05-27  
**Stack:** Vite + React 18 (CSR SPA) · react-router-dom v6 · Sanity CMS · GitHub Pages deployment  
**Scope:** Pre-launch offline audit — no live URL crawl; all findings from static source analysis

---

## Quick Scorecard

| Category | Score | Status |
|---|---|---|
| Technical SEO | 28 / 100 | 🔴 Critical |
| On-Page / Meta | 5 / 100 | 🔴 Critical |
| Semantic HTML Structure | 35 / 100 | 🔴 Critical |
| Schema / Structured Data | 0 / 100 | 🔴 Missing |
| Sitemap Completeness | 45 / 100 | 🟠 Poor |
| Image SEO | 40 / 100 | 🟠 Poor |
| AI Search Readiness (GEO) | 10 / 100 | 🔴 Missing |
| Content Depth / E-E-A-T | 60 / 100 | 🟡 Fair |
| **Overall** | **~32 / 100** | **🔴 Not Ready for Launch** |

---

## 🔴 CRITICAL — Fix Before Launch

These issues actively prevent proper indexing, cause incorrect SERPs, or break crawlability.

### C-1 · JavaScript-Only Rendering (CSR) — No SSR/SSG
**File:** `vite.config.js`, `main.jsx`, all page files  
**Impact:** Googlebot crawls the HTML shell first and renders JavaScript in a second wave, often days later. Product and service page content (headings, body copy, CTAs) lives entirely inside React components — none of it is in the initial HTML response. Until rendering completes, Google indexes a blank page.

- [ ] **Short-term:** Add `react-helmet-async` so at minimum `<title>` and `<meta>` are injectable per page. This does NOT fix the rendering delay — it only fixes meta once the page is rendered.
- [ ] **Long-term (recommended):** Migrate to **Next.js** with Static Site Generation. Every page becomes a pre-rendered HTML file — zero rendering delay, full content in first byte. See the **Next.js Assessment** section at the bottom.
- [ ] **Alternative:** Add Vite SSG via `vite-ssg` or `vite-plugin-ssr` without a framework swap.

---

### C-2 · Single Global Title and Meta Description for All 20+ Pages
**File:** `index.html`  
**Impact:** Every page — `/products/dea-lookup`, `/services/ai-automation`, `/about`, etc. — serves the identical title "SkypondTech.AI — LTC Pharmacy Technology Platform" and one shared description. Google deduplicates these as thin/near-duplicate content. SERP snippets will be wrong on every non-home page.

There is **zero** usage of `react-helmet`, `react-helmet-async`, or any head management library anywhere in the codebase.

- [ ] Install `react-helmet-async`: `npm install react-helmet-async`
- [ ] Wrap App in `<HelmetProvider>` inside `main.jsx`
- [ ] Add a `<Helmet>` block to every page component with a unique title and description
- [ ] Title format: `{Page Name} | SkyPond Tech` (max ~60 chars)
- [ ] Description: 140–160 chars, include primary keyword for that page

**Suggested titles per route:**

| Route | Title |
|---|---|
| `/` | `LTC Pharmacy Technology Platform \| SkyPond Tech` |
| `/products/dea-lookup` | `DEA Lookup Tool — Real-Time Prescriber Verification \| SkyPond Tech` |
| `/products/dea-compliance-reporting` | `DEA Compliance Reporting Software for LTC Pharmacies \| SkyPond Tech` |
| `/products/cs-inventory` | `Controlled Substance Inventory Management \| SkyPond Tech` |
| `/products/ltc-analytics` | `LTC Analytics Dashboard — Dispensing Trends & Insights \| SkyPond Tech` |
| `/products/pointclickcare-feed` | `PointClickCare Data Feed Integration \| SkyPond Tech` |
| `/products/document-automation` | `Document Automation for LTC Pharmacies \| SkyPond Tech` |
| `/services/ai-automation` | `AI Workflow Automation for LTC Pharmacies \| SkyPond Tech` |
| `/services/ltc-pharmacy-it` | `LTC Pharmacy IT Services — Telepharmacy & Integrations \| SkyPond Tech` |
| `/services/data-analytics` | `Data Analytics & Power BI for LTC Pharmacies \| SkyPond Tech` |
| `/services/pointclickcare-integration` | `PointClickCare Integration Services \| SkyPond Tech` |
| `/services/custom-development` | `Custom LTC Pharmacy Software Development \| SkyPond Tech` |
| `/services/microsoft-cloud` | `Microsoft Cloud & Azure for LTC Pharmacies \| SkyPond Tech` |
| `/about` | `About SkyPond Tech — LTC Pharmacy Technology Team` |
| `/industries` | `Industries Served — LTC, SNF, ALF & Behavioral Health \| SkyPond Tech` |
| `/schedule-demo` | `Schedule a Demo \| SkyPond Tech` |

---

### C-3 · No Canonical Tags on Any Page
**File:** All pages — no `<link rel="canonical">` anywhere  
**Impact:** Google may choose any URL variant as canonical (with/without trailing slash, with hash, via subpath). With `base: '/SkyPond-AI/'` in `vite.config.js`, this risk is higher.

- [ ] Add a self-referencing canonical tag to every page via `react-helmet-async`:
  ```jsx
  <link rel="canonical" href="https://skypondtech.ai/products/dea-lookup" />
  ```
- [ ] Use the absolute production URL (`https://skypondtech.ai/...`), not the GitHub Pages subpath URL

---

### C-4 · Home Page Hero Has No `<h1>` — Critical Heading Hierarchy Bug
**Files:** `src/pages/Home.jsx` (line 25), `src/pages/About.jsx` and other pages  
**Impact:** The `H` component is intended to be a polymorphic heading but always renders `<h2>` regardless of the `size` prop. The hero headline — what should be the single `<h1>` on the home page — is an `<h2>`. Google uses the `<h1>` as a strong relevance signal.

```js
// CURRENT (wrong) — in Home.jsx and most service pages:
const H = ({ size="h2", style={}, color, children }) => {
  return <h2 style={{ ... }}>{children}</h2>; // always <h2> regardless of size
};

// ProductHero.jsx correctly uses <h1> for its title — but Home, About,
// Services, and Industries pages all lack an <h1>
```

- [ ] Fix the `H` component to use the correct HTML tag:
  ```jsx
  const H = ({ size = "h2", style = {}, color, children }) => {
    const tag = size === "hero" ? "h1" : size === "h3" ? "h3" : "h2";
    return React.createElement(tag, { style: { ... } }, children);
  };
  ```
- [ ] Verify every page has exactly **one `<h1>`** containing the primary keyword
- [ ] Pages needing an `<h1>` fix: `/` (Home), `/about`, `/industries`, `/services`, `/products`, `/our-values`, `/privacy-policy`

---

### C-5 · Production Base URL Mismatch
**File:** `vite.config.js`  
**Impact:** Production build sets `base: '/SkyPond-AI/'`. All asset/script/CSS paths are prefixed with `/SkyPond-AI/`. But the sitemap, robots.txt, and `SITE_URL` in `constants.js` all point to `https://skypondtech.ai/` without the subpath. This creates a broken deployment or a canonical URL mismatch.

- [ ] Clarify canonical deployment URL: is the site at `https://skypondtech.ai/` or `https://skypondtech.ai/SkyPond-AI/`?
- [ ] If deploying to root domain: change `base` to `'/'` for production
- [ ] If keeping the subpath: update all sitemap URLs, canonical tags, and `SITE_URL` to include `/SkyPond-AI/`
- [ ] Update GitHub Pages repository settings to serve from root if using a custom domain

---

### C-6 · Sitemap is Incomplete — 8 Product Pages + 4 Company Pages Missing
**File:** `public/sitemap.xml`  
**Impact:** Sitemap has 12 URLs. The actual site has 22+ routes. All 6 product detail pages and 4 company pages are absent — Google has no direct URL signal to find and prioritize them.

**Missing from sitemap:**
- [ ] `/products/dea-lookup`
- [ ] `/products/dea-compliance-reporting`
- [ ] `/products/cs-inventory`
- [ ] `/products/ltc-analytics`
- [ ] `/products/pointclickcare-feed`
- [ ] `/products/document-automation`
- [ ] `/about`
- [ ] `/our-values`
- [ ] `/privacy-policy`
- [ ] ~~`/compare`~~ — **Remove this URL** (in sitemap but no route exists in `App.jsx`)

**Additional fixes:**
- [ ] Add `<lastmod>` dates to all entries
- [ ] Add `<changefreq>` (e.g., `monthly` for product pages, `yearly` for privacy policy)
- [ ] Auto-generate the sitemap at build time using `vite-plugin-sitemap` so it stays in sync with routes

---

### C-7 · No Schema.org Structured Data Anywhere
**Files:** All pages — zero JSON-LD in any file  
**Impact:** No rich results possible. No brand entity established in Google's Knowledge Graph. No BreadcrumbList trails in SERPs. Product pages have no `SoftwareApplication` or `Service` markup.

- [ ] **Organization schema** — Add to home page:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SkyPond Tech",
    "url": "https://skypondtech.ai",
    "logo": "https://skypondtech.ai/logosymbol.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+17207246828",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.linkedin.com/company/skypond-tech-llc/",
      "https://www.instagram.com/skypondtech/"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lafayette",
      "addressRegion": "CO",
      "addressCountry": "US"
    }
  }
  ```
- [ ] **WebSite schema** with SearchAction — Add to home page for Sitelinks Searchbox eligibility
- [ ] **SoftwareApplication schema** — Add to each product page (DeaLookupTool, CsInventory, LtcAnalytics, etc.)
- [ ] **Service schema** — Add to each service page (AIAutomation, LTCPharmacyIT, etc.)
- [ ] **BreadcrumbList schema** — The visual `Breadcrumb` component exists on every product/service page but has **no corresponding JSON-LD**. Add schema alongside each breadcrumb render
- [ ] **WebPage schema** — Add generic WebPage markup to remaining pages (About, Industries, etc.)

---

## 🟠 HIGH PRIORITY — Fix Before Launch (Week 1)

### H-1 · No Open Graph or Twitter Card Meta Tags
**File:** `index.html` and all pages  
**Impact:** Links shared on LinkedIn, Twitter/X, Slack show no image, wrong title, and no description. For a B2B SaaS targeting pharmacy IT buyers, LinkedIn sharing is critical.

- [ ] Add OG tags to every page via `react-helmet-async`:
  ```jsx
  <meta property="og:title" content="Page Title | SkyPond Tech" />
  <meta property="og:description" content="Page description..." />
  <meta property="og:url" content="https://skypondtech.ai/products/dea-lookup" />
  <meta property="og:image" content="https://skypondtech.ai/og-images/dea-lookup.png" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="SkyPond Tech" />
  ```
- [ ] Add Twitter Card tags (`summary_large_image` card type)
- [ ] Create OG images (1200×630px) for: Home, each product page, each service page
- [ ] A single default OG image on the brand blue background is acceptable as a starting point

---

### H-2 · No `<noscript>` Fallback — Blank Page When JS Disabled
**File:** `index.html`  
**Impact:** If JS is blocked, users and some crawlers see a completely empty page.

- [ ] Add a `<noscript>` tag inside `<body>` with minimal text describing the site and contact info

---

### H-3 · Missing Semantic HTML Landmarks — No `<main>` Wrapper
**Files:** All page files; layout uses exclusively `<div>` and `<section>`  
**Impact:** Accessibility and SEO share landmark requirements. Only `About.jsx` has a `<main>` element. `<nav>` is correctly used in Navbar ✅. `<footer>` is correctly used in Footer ✅.

- [ ] Wrap each page's primary content in `<main>` (excluding Navbar and Footer)
- [ ] For product and service content, consider `<article>` for the primary content block
- [ ] Ensure heading hierarchy per page: exactly one `<h1>`, logical `<h2>`/`<h3>` nesting (see C-4)

---

### H-4 · Google Fonts and Gotham Font Render-Blocking — LCP Risk
**File:** `index.html`, `App.jsx`  
**Impact:** Akshar loaded from Google Fonts via `<link>` stylesheet (blocks rendering). Gotham loaded via `@font-face` injected inside JavaScript — loads even later, after JS executes.

- [ ] Move `@font-face` declarations for Gotham from `App.jsx` into a CSS file or `index.html` `<style>` block
- [ ] Add `<link rel="preload">` for the primary Gotham woff2 file in `index.html`
- [ ] Consider self-hosting Akshar font to eliminate the external render-blocking Google Fonts request

---

### H-5 · robots.txt Missing Explicit AI Crawler Policy
**File:** `public/robots.txt`  
**Impact:** No explicit rules for GPTBot, ClaudeBot, PerplexityBot, Bytespider. For a B2B company seeking AI search visibility, adding explicit `Allow` rules for key AI crawlers is recommended best practice.

- [ ] Add explicit declarations for key AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bytespider)
- [ ] Decide on strategy: for maximum AI search visibility, allow all AI crawlers (current blanket `Allow: /` already does this, but being explicit signals intent)

---

### H-6 · Images Missing `width`/`height` Attributes — CLS Risk
**Files:** `Footer.jsx`, `Navbar.jsx` (logo), `Home.jsx` (testimonial avatars)  
**Impact:** Images without explicit width/height cause Cumulative Layout Shift (CLS) — a Core Web Vital and direct ranking factor.

- [ ] Add HTML `width` and `height` attributes to all `<img>` tags
- [ ] Add `loading="lazy"` to below-the-fold images (testimonial avatars, footer logo)
- [ ] Add `fetchpriority="high"` to the above-the-fold Navbar logo

---

### H-7 · No Favicon Suite — Missing Apple Touch Icon and Web Manifest
**File:** `index.html`  
**Impact:** Only a single `.png` favicon is defined. Missing: apple-touch-icon, `manifest.json`, multiple favicon sizes.

- [ ] Add `<link rel="apple-touch-icon" href="/apple-touch-icon.png">` (180×180px)
- [ ] Create `public/site.webmanifest` with name, icons, theme_color (#1E3A5C), background_color
- [ ] Add `<link rel="manifest" href="/site.webmanifest">` to `index.html`
- [ ] Add `<meta name="theme-color" content="#1E3A5C">` for browser chrome color

---

## 🟡 MEDIUM PRIORITY — Fix in First Month Post-Launch

### M-1 · No `llms.txt` File — AI Search (GEO) Readiness
- [ ] Create `/public/llms.txt` with company description, canonical URLs, key facts, products listed with brief descriptions
- [ ] Reference it in `robots.txt`

### M-2 · `/compare` URL in Sitemap Has No Route
- [ ] **Remove `/compare` from sitemap** immediately (no matching route in `App.jsx`)
- [ ] OR build a `/compare` competitive comparison landing page (high-value B2B SEO opportunity)

### M-3 · Breadcrumb Component Has No BreadcrumbList JSON-LD
- [ ] Add BreadcrumbList JSON-LD to the `Breadcrumb` component based on the `items` prop
- [ ] Inject via `<script type="application/ld+json">` using `react-helmet-async`

### M-4 · Sanity CMS Blog/Resource Pages Not Routed or in Sitemap
- [ ] Decide whether blog/case studies live on `skypondtech.com` or `skypondtech.ai`
- [ ] If migrating to `.ai` domain: create `/blog`, `/resources`, `/case-studies` routes with proper meta
- [ ] Update footer links to point to the canonical domain
- [ ] Add dynamic sitemap generation that includes Sanity-sourced content pages

### M-5 · Brand / Domain Name Inconsistency
- [ ] Standardize brand name across all title tags, alt text, schema, and copy (recommend: `SkyPond Tech`)
- [ ] Address: `SkypondTech.AI` (title tag) vs `Skypond Tech` (alt text) vs `Skypond Tech Pvt. Ltd.` (footer) vs `skypondtech.com` (email domain)
- [ ] Consider setting up `info@skypondtech.ai` to align email domain with primary domain

### M-6 · No Per-Page `<meta name="robots">` Control
- [ ] Decide which pages should be `noindex` (typically: `/privacy-policy`, `/schedule-demo`, `/our-values`)
- [ ] Add `<meta name="robots" content="noindex, nofollow" />` via `react-helmet-async` where appropriate

### M-7 · Contact Is a Hash Anchor — No Standalone `/contact` Page
- [ ] Create a `/contact` page with NAP data (Name, Address, Phone) and contact form
- [ ] This enables full **LocalBusiness schema** with address/phone markup
- [ ] Add `/contact` to sitemap

---

## 🔵 LOW PRIORITY — Polish

### L-1 · No Preconnect to Sanity CDN
- [ ] Add `<link rel="preconnect" href="https://cdn.sanity.io" />` to `index.html`

### L-2 · ProductHero Stats Lack Published Sources (E-E-A-T)
- [ ] Add footnote citations or methodology links to key stats on product pages
- [ ] Consider a `/methodology` or `/research` page sourcing the claims

### L-3 · No AggregateRating / Review Schema
- [ ] Once 3+ client testimonials are published via Sanity, add `Review` + `AggregateRating` schema

### L-4 · Consider Sitemap Index for Future Scale
- [ ] As blog content grows via Sanity: split into `sitemap-index.xml` → `sitemap-pages.xml` + `sitemap-blog.xml`

---

## 📐 React vs Next.js — SEO Assessment

### The Core Problem with React CSR

This is a **Client-Side Rendered (CSR) React SPA**. The HTML served to Googlebot on first request is:
```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

All page content — headings, body copy, product descriptions, service details — is injected by JavaScript **after** the initial HTML. Google processes these pages in two waves: fast HTML-only crawl (immediate, content-free) and a rendering queue (delayed by hours to days). Your pages land in the rendering queue as empty documents and may wait days before content is indexed.

### What React CSR Cannot Fix Without SSR/SSG

| SEO Requirement | React CSR + helmet | Next.js SSG |
|---|---|---|
| Per-page title and meta tags | ✅ (via react-helmet-async) | ✅ |
| Content in first HTML byte | ❌ Never | ✅ Always |
| Zero render delay for Googlebot | ❌ Never | ✅ Always |
| Fast LCP (no JS parse before content) | ❌ | ✅ |
| Per-page canonical in raw HTML | ❌ Never | ✅ |
| JSON-LD in raw HTML (Product/Offer schemas) | ❌ | ✅ |
| Built-in image optimization and CLS prevention | ❌ Manual | ✅ Built-in |
| Sanity CMS with Incremental Static Regeneration | ❌ | ✅ (next-sanity) |

### Recommendation: Yes, React Is Weak for SEO Here

**For this specific use case — B2B SaaS in pharmacy compliance with product pages that need to rank for high-intent commercial queries — Next.js App Router with SSG is the right architecture.**

Reasons specific to SkyPond Tech:
1. Product pages (DEA Lookup Tool, CS Inventory, etc.) target high-value, low-volume B2B queries. Every day of rendering delay is lost traffic.
2. Sanity CMS integration is a first-class Next.js use case — the official `next-sanity` package supports ISR natively.
3. Current route structure maps 1:1 to Next.js App Router `page.js` files — no major restructuring of component logic.
4. Next.js `<Image>` component handles WebP conversion, lazy loading, and CLS prevention automatically.
5. GitHub Pages → Vercel migration is zero-friction; Vercel is built for Next.js with free tier.

**Applying `react-helmet-async` now** gets you from ~32/100 to ~60/100 and unblocks launch.  
**Migrating to Next.js** gets you to ~90/100 and eliminates the rendering delay permanently.

---

*Generated using claude-seo v2 (seo-technical · seo-schema · seo-sitemap · seo-content · seo-geo · seo-audit frameworks)*  
*Primary sources: Google Search Central docs, Schema.org v26, Google AI Optimization Guide (2025), Core Web Vitals thresholds (2024 revision)*
