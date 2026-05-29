# Phase 1 Complete — Project Initialization & Foundation

**Status:** Complete  
**Date:** 2026-05-28  
**Next phase:** Phase 2 — Shared Component Library

---

## What Phase 1 Does

Phase 1 sets up the entire structural foundation of the Next.js project.
No page content is migrated yet — this phase is purely infrastructure.
At the end of Phase 1, the app runs, builds, and is correctly configured
for SEO, security, fonts, and TypeScript. Every later phase builds on top of this.

---

## Files Created

### Configuration Files (project root)

| File | Status | Description |
|---|---|---|
| `package.json` | **Replaced** | Updated from Vite+React to Next.js 15. Removed `react-router-dom`. Added `next`, `next-sanity`, TypeScript types. |
| `tsconfig.json` | **Created** | TypeScript configuration. Enables strict mode, path aliases (`@/*`), Next.js plugin. |
| `next.config.ts` | **Created** | Replaces `vite.config.js`. Configures: Sanity image domains, security headers (HSTS, CSP, X-Frame-Options, etc.). |
| `.eslintrc.json` | **Created** | ESLint using `next/core-web-vitals` + `next/typescript` rulesets. |
| `.gitignore` | **Created** | Ignores: `.next/`, `node_modules/`, `.env.local`, `*.tsbuildinfo`. |
| `.env.example` | **Created** | Template showing required environment variables. Safe to commit. |
| `.env.local` | **Created** | Actual Sanity credentials. **Gitignored — never committed.** |

### App Directory (`app/`)

| File | Status | Description |
|---|---|---|
| `app/layout.tsx` | **Created** | **Root layout — replaces `index.html`, `main.jsx`, and the global style injection in `App.jsx` combined.** Loads Akshar font via `next/font/google` (no render-blocking request). Sets default metadata template. Contains `<noscript>` fallback. Preloads Gotham woff2 files. |
| `app/globals.css` | **Created** | **Replaces the `<style>` block inside `App.jsx`.** Contains: Gotham `@font-face` declarations, CSS reset, body defaults, all keyframe animations (`fadeUp`, `dropIn`, `ticker`, `navMobilePanelIn`), scrollbar styles. |
| `app/page.tsx` | **Created** | Phase 1 placeholder for the home page route (`/`). Confirms routing and rendering work. Replaced with full content in Phase 3. |
| `app/not-found.tsx` | **Created** | Dedicated 404 handler. Returns a real HTTP 404 status (unlike the old SPA which returned 200 for every URL). Full design migrated in Phase 3. |

### Library Directory (`lib/`)

| File | Status | Description |
|---|---|---|
| `lib/tokens.ts` | **Created** | Migrated from `src/tokens.js`. Identical values, now TypeScript typed with `as const` and exported types. |
| `lib/constants.ts` | **Created** | Migrated from `src/config/constants.js`. Identical values, now TypeScript typed. |
| `lib/sanity/client.ts` | **Created** | Migrated from `src/sanityClient.js`. Now uses `next-sanity` instead of `@sanity/client` directly. Credentials from env vars (not hardcoded). |
| `lib/sanity/queries.ts` | **Created** | **New file.** Centralises all GROQ queries. Previously, queries were written inline inside `useEffect` calls in components. |

### Directories Created (empty, ready for future phases)

| Directory | Used in Phase |
|---|---|
| `components/layout/` | Phase 2 — Navbar, Footer, Breadcrumb |
| `components/ui/` | Phase 2 — Button, Heading, Badge, Paragraph, Card |
| `components/sections/` | Phase 2 — ProductHero |
| `components/seo/` | Phase 2 — JsonLd, BreadcrumbSchema |
| `components/seo/schemas/` | Phase 2 — Organization, WebSite, SoftwareApplication, Service schemas |
| `public/fonts/` | Exists, empty — Gotham font files added here manually |

---

## Files Preserved (Untouched)

These files are kept as reference material for Phases 2–5.
They are NOT deleted and NOT modified. The `src/` folder and its contents
remain the authoritative source for component logic throughout the migration.

| Preserved | Reason |
|---|---|
| `src/` (entire directory) | Reference for all component migration in Phases 2–5 |
| `index.html` | Reference only — replaced by `app/layout.tsx` |
| `vite.config.js` | Reference only — replaced by `next.config.ts` |
| `public/logosymbol.png` | Still used — `public/` is shared |
| `public/navbar-logo-*.png` | Still used |
| `public/robots.txt` | Will be replaced by dynamic `app/robots.ts` in Phase 6 |
| `public/sitemap.xml` | Will be replaced by dynamic `app/sitemap.ts` in Phase 6 |

---

## Key Architectural Decisions Made in Phase 1

### 1. `next/font/google` for Akshar (instead of a `<link>` tag)
The old `index.html` had:
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Akshar..." />
```
This is a render-blocking external request — the page cannot show text until
Google Fonts responds. The new layout uses `next/font/google`, which downloads
Akshar at **build time** and serves it from the SkyPond Tech domain.
Zero external request at runtime. Zero render block. Font still named 'Akshar'.
All existing inline styles using `font-family: "'Akshar', sans-serif"` work unchanged.

### 2. `globals.css` replaces inline `<style>` in App.jsx
The old App.jsx injected a `<style>` tag via JSX — meaning CSS only loaded
after JavaScript executed. All CSS (reset, fonts, animations, scrollbar) is now
in a proper CSS file imported at the top of the layout. It loads immediately,
before any JavaScript.

### 3. Environment variables for Sanity (not hardcoded)
The old `sanityClient.js` had `projectId: '9onhlsbk'` hardcoded.
This is a security risk for anything beyond a public project ID.
All Sanity config is now in `.env.local` (gitignored). Anyone cloning the
repo copies `.env.example` to `.env.local` and fills in their own values.

### 4. `next-sanity` instead of `@sanity/client` directly
`next-sanity` wraps `@sanity/client` with Next.js caching. When we migrate
the home page in Phase 3, the Sanity testimonials fetch will be a server-side
async call at build time — not a client-side `useEffect`. This means testimonials
appear in the pre-rendered HTML that Google reads on first crawl.

### 5. Real 404 status codes
The old React SPA returned HTTP 200 for every URL, including ones that didn't
exist — Google calls this a "soft 404." Next.js's `not-found.tsx` returns
a proper HTTP 404 status, which Google handles correctly.

---

## What This Phase Does NOT Do

- Does not migrate any page content (that's Phases 3–5)
- Does not migrate any components (that's Phase 2)
- Does not add any JSON-LD schema (that's Phases 3–5)
- Does not add the sitemap or robots.ts (that's Phase 6)
- Does not touch any existing design, colors, or styles

---

## How to Verify Phase 1

Run these commands in your terminal from the `skypond-tech/` folder:

```bash
# 1. Install dependencies (first time only — takes 1–2 minutes)
npm install

# 2. Start the development server
npm run dev
```

Then open `http://localhost:3000` in your browser. You should see:

> **SkyPond Tech**
> ✅ Phase 1 complete — Next.js 15 is running with TypeScript and App Router.

**Also verify:**
- Visit `http://localhost:3000/anything-that-doesnt-exist` → should show "404" in the brand blue style
- Right-click the page → View Page Source → you should see a full `<html>` document with actual content (not just `<div id="root">`)
- The `<title>` tag in the source should read `"SkyPond Tech — LTC Pharmacy Technology Platform"`

If all three work, Phase 1 is confirmed successful. Proceed to Phase 2.

---

## Dependency Changes

### Removed
| Package | Reason |
|---|---|
| `vite` | Replaced by Next.js built-in build system (Turbopack) |
| `@vitejs/plugin-react` | No longer needed |
| `react-router-dom` | Replaced by Next.js file-system routing |

### Added
| Package | Reason |
|---|---|
| `next` | The framework itself |
| `next-sanity` | Next.js-optimised Sanity client with ISR support |
| `typescript` | Industry-standard type safety |
| `@types/node` | TypeScript types for Node.js APIs |
| `@types/react` | TypeScript types for React |
| `@types/react-dom` | TypeScript types for React DOM |
| `eslint-config-next` | Next.js-specific ESLint rules |

### Unchanged
| Package | Reason |
|---|---|
| `react` | Still React 18 — Next.js uses React internally |
| `react-dom` | Still needed |
| `@sanity/client` | Kept as peer dependency of `next-sanity` |
| `lucide-react` | Icon library, framework-agnostic |

---

*Phase 1 of 7 complete. Proceed to Phase 2 — Shared Component Library.*
