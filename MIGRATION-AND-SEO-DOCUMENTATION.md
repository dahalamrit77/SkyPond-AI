# SkyPond Tech — Complete Migration & SEO Documentation

> This document explains in plain English exactly what was done to migrate
> skypondtech.ai from a React SPA to Next.js, and every SEO improvement made.
> Written for someone who may not be deeply technical.

---

# PART 1: THE MIGRATION — FROM REACT TO NEXT.JS

## Why We Migrated At All

The original SkyPond Tech website was built with **React + Vite** as a
Single-Page Application (SPA). Think of an SPA like a restaurant that
hands you a blank plate and cooks everything at your table. When Google
visits your website to decide how to rank it, it arrives and gets...
a blank plate. The actual content only appears after JavaScript runs —
and Google often doesn't wait.

The result: Google couldn't read your product pages, service descriptions,
or company content. You were essentially invisible to search engines.

**Next.js** flips this model. Think of it like a restaurant that sends a
fully plated meal. When Google arrives, it gets complete HTML with all your
content already there — no waiting required. This is called
**Server-Side Generation (SSG)**.

---

## Phase 1 — Project Foundation
### "Setting up the new house before moving in"

**What was done:**
Next.js 15 was installed inside the existing project folder, running
*alongside* the original Vite code. Nothing was deleted. The two codebases
coexisted while the migration happened gradually.

**Specific files created:**
- `next.config.ts` — The main Next.js configuration file. Security headers
  (HTTPS enforcement, anti-clickjacking, etc.) were added here from day one.
- `app/layout.tsx` — The permanent "frame" of every page. Think of it like
  a picture frame that stays the same while the picture (page content) changes.
  The Navbar and Footer live here so they never reload on navigation.
- `app/globals.css` — All fonts, animations, and base styles. The Gotham
  font (commercial) and Akshar font (Google) were configured here.
- `lib/tokens.ts` — Your brand colours and design constants, converted from
  the original `tokens.js`.
- `lib/constants.ts` — Contact info, site URL, HubSpot URLs — one central
  place instead of scattered throughout the code.
- `lib/sanity/client.ts` — The connection to Sanity CMS (where your
  testimonials live), upgraded to use Next.js-native features.
- `.env.example` — A template showing which secret keys are needed,
  without exposing the actual secrets.

**The key technical change:**
The Akshar font (used for all headings) was switched from loading via an
external Google Fonts link (which slows down the page while it fetches)
to `next/font/google`, which downloads it at build time and serves it from
your own domain. Zero external requests at page load.

---

## Phase 2 — Shared Component Library
### "Building the reusable pieces that every page uses"

**What was done:**
Every shared piece of the website — buttons, the navbar, the footer, SEO
components — was rewritten in TypeScript (a stricter version of JavaScript
that catches errors before they reach users).

**Specific components migrated:**

**Button** — The clickable buttons throughout the site. In the original
React app, these used `react-router-dom` for navigation. In Next.js, they
use `next/link`, which prefetches pages in the background when you hover
over a link — making subsequent page loads near-instant.

**Navbar** — The most complex component. Three key changes:
1. `useLocation()` (React Router) → `usePathname()` (Next.js) — tells
   the navbar which page you're on so it can highlight the active link.
2. `useNavigate()` → `useRouter()` — handles programmatic navigation
   (e.g., clicking "Contact" in the navbar scrolls to the contact section).
3. Logo paths hardcoded — the original used `import.meta.env.BASE_URL`
   (a Vite-specific trick that doesn't work in Next.js). Fixed to direct paths.

**Footer** — Same pattern as Navbar. `react-router-dom` links replaced
with `next/link`.

**SEO Components (new in this phase):**
- `JsonLd.tsx` — Injects structured data (the invisible code that tells
  Google and AI assistants what your pages are about) into every page.
- `schemas/organization.ts` — Your company's "identity card" for Google:
  name, address, logo, contact info, social links.
- `schemas/website.ts` — Tells Google about your website's search feature
  (enables Google Sitelinks Searchbox).
- `schemas/software.ts` — Describes each product as software (DEA Lookup Tool,
  CS Inventory, etc.) in Google's language.
- `schemas/service.ts` — Describes each service (LTC Pharmacy IT, AI
  Automation, etc.) in Google's language.
- `schemas/breadcrumb.ts` — Creates the "Home > Products > DEA Lookup Tool"
  trail that appears in Google search results.
- `Breadcrumb.tsx` — The visual breadcrumb navigation component that also
  injects the invisible breadcrumb schema automatically.

**ProductHero.tsx** — The shared hero section used on every product and
service page. Updated to accept JSX (styled text with coloured spans) as
the title, not just plain text.

---

## Phase 3 — Core Pages (6 pages)
### "Migrating the main pages of the site"

**Pages migrated:** Home, About, Our Values, Industries, Privacy Policy,
Schedule Demo, 404 (Not Found)

**The architecture pattern established here (used for all pages):**

Every page was split into exactly two files:

```
app/about/
├── page.tsx        ← Server Component: handles SEO metadata only
└── _content.tsx    ← Client Component: all the interactive content
```

**Why this split?**
Next.js has two types of components:
- **Server Components** run on the server, generate HTML, and are invisible
  to the browser. Perfect for SEO metadata.
- **Client Components** run in the browser and handle interactivity
  (hover effects, animations, form submissions).

The SEO metadata (page title, description, etc.) must live in a Server
Component — it can't go in a Client Component. But all the interactive
elements (hover states, scroll effects, HubSpot embed) require a Client
Component. The split solves this cleanly.

**Key fixes made on all pages:**
The original React code had a bug: the `H` (heading) component always
rendered an `<h2>` HTML tag regardless of the heading level. Google's
guidelines say each page should have exactly one `<h1>` (the main title)
and then `<h2>`, `<h3>` below it. This was fixed so every page now has
the correct heading hierarchy — a real SEO improvement.

**The Home page** was the most complex:
- The animated AI pipeline widget (AgentWidget) uses `setInterval` to
  cycle through pipeline steps.
- Three dashboard cards (DEACard, CSCard, AnalyticsCard) use
  `IntersectionObserver` to trigger animations when you scroll to them.
- Testimonials fetch live data from Sanity CMS using `useEffect`.
- The Contact form manages state with `useState`.

All of this was migrated from Vite-specific patterns to Next.js patterns
while keeping the exact same visual appearance.

**The Schedule Demo page:**
HubSpot's calendar embed requires injecting a `<script>` tag after
the container `<div>` exists in the DOM. This uses `useRef` +
`useEffect` to inject the script at exactly the right moment. Also
made to use `useCdn: false` in dev mode to avoid CORS errors when
running locally.

---

## Phase 4 — Product Pages (7 pages)
### "Migrating the 6 product pages + products index"

**Pages migrated:** Products Index, DEA Lookup, DEA Compliance Reporting,
CS Inventory, LTC Analytics, PointClickCare Feed, Document Automation

**The transformation approach:**
Each original JSX file was 500–800 lines. Rather than rewriting manually,
a transformation script was written that:
1. Extracted the shared primitive components (Badge, H, P, Card) and
   replaced them with properly-typed TypeScript versions
2. Extracted the product sections (Hero, Features, HowItWorks, etc.)
   and placed them inside the correct `<main>` structure
3. Added proper imports pointing to the new `@/` path aliases

**A critical bug fixed during this phase:**
The first version of the transformer accidentally placed the original
`return (...)` JavaScript statement inside a JSX `<main>` tag, which
would have rendered "return (" as visible text on the page. Caught
and fixed before any user saw it.

**Route URLs preserved exactly:**
The original routes were kept identical:
- `/products/dea-lookup` (not `/products/dea-lookup-tool`)

This matters because changing URLs breaks any existing links from other
websites pointing to your pages.

---

## Phase 5 — Service Pages (7 pages)
### "Migrating the 6 service pages + services index"

**Pages migrated:** Services Index, LTC Pharmacy IT, AI Automation,
Data Analytics, Custom Development, Microsoft Cloud, PointClickCare Integration

**Same approach as Phase 4**, with additional fixes:
- Some service pages use `IntersectionObserver` for scroll-reveal
  animations. The transformation script was updated to automatically
  detect which pages needed `useRef` and `useEffect` imports.
- Service pages reference `CONTACT_PHONE` constants — the transformer
  was updated to always include the constants import.
- `C.orange` — one page referenced a colour token that doesn't exist
  in the token file. Found and replaced with the correct hex value.

---

## Phase 6 — Technical SEO Infrastructure
### "Adding everything Google needs to find and rank the site"

**Files created:**

`app/sitemap.ts` — Generates the sitemap.xml file automatically.
A sitemap is like a map you hand to Google saying "here are all the
pages on my site." Without it, Google has to discover pages on its own.
19 routes listed with priority scores and how often they change.

`app/robots.txt` — Tells search engine crawlers what they're allowed
to read. Privacy policy excluded from indexing (standard practice).
All AI crawlers (ChatGPT, Perplexity, Claude) explicitly permitted.

`public/llms.txt` — A new standard for AI search engines. When
ChatGPT or Perplexity crawls your site, this file explains in plain
English what SkyPond Tech does, what each product is, and where to
find information. Increases the chance of being cited in AI answers.

`next.config.ts` updates — Added:
- Content-Security-Policy header (controls which external services
  can load in your pages — prevents certain types of attacks)
- Trailing-slash redirects (so `/about/` automatically goes to `/about`)

`app/opengraph-image.tsx` — The image that appears when someone shares
your website on LinkedIn, Slack, or Twitter. Edge-rendered at 1200×630
pixels showing the SkyPond Tech brand with product pillars listed.

---

## Phase 7 — Pre-Deploy QA & Fixes

**Issues caught and fixed:**
- `public/sitemap.xml` (a leftover from the old Vite build) was
  overriding the new dynamic `app/sitemap.ts`, and it was missing
  8 product pages. Fixed by overwriting it with the correct content.
- `about/page.tsx` referenced an OG image file (`/og-about.png`)
  that didn't exist. Removed.
- 3 pages missing Twitter Card metadata — added.
- `public/robots.txt` (also a Vite leftover) missing the
  privacy policy exclusion — corrected.
- `<img>` tag in Testimonials replaced with Next.js `<Image>`
  component for better performance.
- Error pages created (`app/error.tsx`, `app/global-error.tsx`) so
  any unexpected crash shows a branded page instead of a blank screen.

**Navigation architecture fix:**
Originally, the Navbar and Footer were inside every page's `_content.tsx`.
This meant every navigation triggered a full remount of the Navbar —
causing a visible flash. Fixed by moving Navbar and Footer to `layout.tsx`
so they persist across all navigations and never remount.

**Navigation progress bar:**
The original Vite SPA felt instant because all pages were already loaded
in JavaScript. Next.js loads each page's JavaScript on first visit. A
`NavigationProgress` component was added — a 2px accent-coloured bar
that sweeps across the top of the screen when you click a link, giving
instant visual feedback (exactly like GitHub, YouTube, and Vercel do it).

---

# PART 2: SEO — WHAT WAS DONE AND WHY IT MATTERS

## What is SEO, briefly?

SEO (Search Engine Optimisation) is the practice of making your website
easy for Google (and AI assistants like ChatGPT) to understand and rank.
Think of it as writing a very clear sign for your shop window, plus
filling out a detailed profile that tells Google exactly what you sell,
who you are, and why you're trustworthy.

The migration from React to Next.js was done *specifically* for SEO —
the old site was essentially invisible to search engines.

---

## 1. Server-Side Rendering (The Foundation)

**What it is:** Every page on the site now delivers complete, readable
HTML the moment Google visits — before any JavaScript runs.

**Why it matters:** The old React SPA delivered a blank page to Google.
Google would see `<div id="root"></div>` (empty). Now Google sees all
your content — product descriptions, service details, company info —
immediately. This is the single most important SEO change made.

**Score impact:** This change alone is responsible for the site being
indexable at all. Without it, everything else is irrelevant.

---

## 2. Unique Page Titles (All 20 Pages)

**What it is:** Every page has a unique `<title>` tag in its HTML.
This is the blue clickable text that appears in Google search results.

**Examples:**
- Home: "SkyPond Tech — The Complete LTC Pharmacy Technology Platform"
- DEA Lookup: "DEA Lookup Tool — Live Prescriber Verification for LTC Pharmacy"
- LTC Pharmacy IT: "LTC Pharmacy IT Services — Telepharmacy, DEA Compliance & Integrations"

**Why it matters:** Google uses the title to understand what a page is
about and to decide how to match it to search queries. If every page had
the same title ("SkyPond Tech"), Google would have no way to distinguish
them. Unique, descriptive titles directly influence search rankings.

**Implemented via:** `export const metadata` in each `page.tsx` file.
Next.js also has a `title.template: '%s | SkyPond Tech'` in layout.tsx,
which automatically appends "| SkyPond Tech" to every page title without
having to type it manually each time.

---

## 3. Meta Descriptions (All 20 Pages)

**What it is:** The short paragraph of grey text under the blue title
in Google search results.

**Why it matters:** While not a direct ranking factor, the description
is your advertisement in search results. A well-written description
improves click-through rate — more people click your link. Each page's
description is targeted to the specific thing that page is about.

**Example for DEA Compliance Reporting:**
"Automate DEA compliance reporting: ARCOS submissions, CSOS electronic
orders, DEA Form 222 tracking, and multi-site rollup — eliminating
manual filing risk."

---

## 4. Canonical URLs (All 20 Pages)

**What it is:** A "canonical" URL is the official, single address for
each page. It's invisible to users but tells Google: "if you find this
content at multiple URLs, this is the one that counts."

**Why it matters:** Without canonicals, Google might find your homepage at:
- `https://skypondtech.ai`
- `https://skypondtech.ai/`
- `https://www.skypondtech.ai`

And treat them as three separate pages competing with each other
(called "duplicate content"). Canonical tags prevent this.

**Implemented via:** `alternates: { canonical: '...' }` in each page's
metadata, and 301 redirects in `next.config.ts` for trailing-slash variants.

---

## 5. Open Graph Tags (All 20 Pages)

**What it is:** Invisible metadata that controls what appears when
someone shares your page on LinkedIn, Slack, Twitter, or iMessage.
Without it, shares look generic or broken.

**Why it matters:** Professional appearances on social sharing builds
trust and encourages clicks. Google also reads OG tags as a trust signal.

**What's set on every page:**
- `og:title` — The headline shown in the social preview
- `og:description` — The description shown in the preview
- `og:url` — The canonical URL of the page
- `og:type` — The type of content ("website" for most pages)

---

## 6. Twitter Card Tags (All 20 Pages)

**What it is:** Similar to Open Graph but specifically for Twitter/X.
These control the "card" that appears when a link is tweeted.

**Set on every page:** `twitter:card: 'summary_large_image'` — tells
Twitter to display a large image preview card when your links are shared.

---

## 7. JSON-LD Structured Data — Organization Schema

**What it is:** Invisible code (not visible to users) embedded in every
page that tells Google exactly who SkyPond Tech is. Like filling out a
detailed Google Business Profile but in code.

**What it contains:**
- Company name: "SkyPond Tech"
- Website URL
- Logo URL
- Contact phone and email
- Three physical addresses (Lafayette CO, Omaha NE, Kathmandu Nepal)
- Social media links (LinkedIn, Instagram)

**Why it matters:** Google uses this to build a "knowledge graph" about
your company. It improves how your brand appears in search results,
increases the chance of Google showing a knowledge panel for your company,
and makes you more citable by AI assistants.

**Implemented via:** `components/seo/schemas/organization.ts` —
injected on every single page via `JsonLd` component.

---

## 8. JSON-LD Structured Data — WebSite + SearchAction Schema

**What it is:** Tells Google that skypondtech.ai has a search function.

**Why it matters:** Enables "Sitelinks Searchbox" — a special feature
where Google shows a search bar inside your search result listing, letting
users search your site directly from Google results. This only works if
you tell Google about it via this schema.

**Implemented on:** Home page only (correct — this schema goes on the
homepage).

---

## 9. JSON-LD Structured Data — SoftwareApplication Schema

**What it is:** Tells Google each product is a software application with
specific properties: what it does, who made it, what it costs (or that
pricing is by contact), and when it was published.

**Why it matters:** Google can show richer results for software products —
including price, rating, and category — in search results. Also improves
how AI assistants like ChatGPT describe your products.

**Implemented on:** Home page (combined platform schema) + all 6 individual
product pages. Each schema includes:
- Product name and description
- URL
- Price: "Contact for pricing"
- datePublished: "2025-10-01"
- dateModified: "2026-05-29"
- Provider: SkyPond Tech (with organization details)

---

## 10. JSON-LD Structured Data — Service Schema

**What it is:** Tells Google each service is a professional service with
specific properties: what type of service it is, who provides it,
and what area it serves.

**Why it matters:** Service schema helps Google understand the difference
between a product (software you buy) and a service (work you hire someone
to do). It improves matching to search queries like "LTC pharmacy IT
consulting" or "PointClickCare integration service."

**Implemented on:** Schedule Demo page + all 6 individual service pages.
Each schema includes:
- Service name, description, URL
- serviceType (e.g., "LTC Pharmacy IT", "AI Automation")
- Provider: SkyPond Tech
- areaServed: United States
- datePublished and dateModified

---

## 11. JSON-LD Structured Data — BreadcrumbList Schema

**What it is:** Tells Google the path to each page. For the DEA Lookup
page: Home → Products → DEA Lookup Tool.

**Why it matters:** Google often shows this path under your title in search
results (e.g., "skypondtech.ai › products › dea-lookup"). This makes your
result look more professional and helps users understand where they're
landing before they click.

**Implemented on:** All 18 inner pages (Home and 404 correctly excluded).
The `Breadcrumb` component automatically generates both the visual breadcrumb
navigation AND the invisible JSON-LD schema simultaneously.

---

## 12. H1/H2/H3 Heading Hierarchy Fix

**What it is:** HTML headings have levels — H1 is the main title, H2 is
a section heading, H3 is a sub-section. Google uses these to understand
the structure and importance of content.

**The bug:** The original React code had a bug where ALL headings used
`<h2>` regardless of their actual level. Every page had zero H1 tags
and dozens of H2 tags — Google couldn't determine what the main topic
of any page was.

**The fix:** Every page now has exactly one `<h1>` (the main page title)
and properly nested `<h2>` and `<h3>` tags below it.

**Why it matters:** Google explicitly uses heading hierarchy as a content
signal. Having the correct structure can directly improve rankings for
the keyword that matches your H1.

---

## 13. Sitemap.xml (19 Routes)

**What it is:** An XML file at `https://skypondtech.ai/sitemap.xml` that
lists every page on the site with priority and update frequency.

**Why it matters:** Like handing Google a complete directory of your
website. Without it, Google discovers pages by following links — which
is slower and may miss pages. With it, Google knows every page exists
and how important each one is.

**How it works:** `app/sitemap.ts` generates this automatically.
Priority scores assigned:
- Home: 1.0 (most important)
- Products/Services index: 0.9
- Individual product/service pages: 0.8
- About, Industries: 0.7
- Our Values: 0.6
- Privacy Policy: excluded (noindexed page)

---

## 14. robots.txt

**What it is:** A text file at `https://skypondtech.ai/robots.txt` that
tells search engine crawlers which pages they're allowed to visit.

**What it says:**
- Allow: / (crawl everything)
- Disallow: /privacy-policy (don't index the privacy policy — standard practice)
- Sitemap reference (tells crawlers where to find the sitemap)

**Why the Privacy Policy is excluded:** Privacy policy pages contain legal
boilerplate, not business content. Having it appear in search results would
waste your "crawl budget" (the number of pages Google will crawl per visit)
and dilute your content quality signals.

---

## 15. noindex on Privacy Policy

**What it is:** A meta tag inside the Privacy Policy page telling Google
"don't include this page in search results."

**Why it matters:** Privacy policy pages contain repeated legal text found
across thousands of websites. Google considers this "thin content" when
it appears in search results, and it slightly hurts the overall quality
signal of your domain if indexed.

---

## 16. llms.txt (AI Search Optimisation)

**What it is:** A plain-text file at `https://skypondtech.ai/llms.txt`
written specifically for AI search engines (ChatGPT, Perplexity, Claude).

**Why it matters:** AI assistants crawl websites to build knowledge for
answering user questions. Without guidance, they may misunderstand or
misrepresent what SkyPond Tech does. The `llms.txt` file explains in
plain English — per the emerging llmstxt.org standard — exactly what
each product and service does, with direct URLs to the right pages.

**What it contains:** Company description, all 6 products with plain-English
explanations, all 6 services, company background, and contact/scheduling info.

---

## 17. Security Headers (Trust Signals)

**What they are:** HTTP headers sent with every page that tell browsers
and search engines how secure the site is.

**Headers implemented:**
- `Strict-Transport-Security` — Forces HTTPS for 2 years. Google
  gives a ranking boost to HTTPS sites.
- `X-Frame-Options: SAMEORIGIN` — Prevents your pages from being
  embedded in iframes on other sites (clickjacking protection).
- `Content-Security-Policy` — Controls which external services can
  load (Google Fonts, HubSpot, Sanity). Blocks malicious scripts.
- `X-Content-Type-Options` — Prevents browsers from misinterpreting
  file types (a common attack vector).
- `Referrer-Policy` — Controls what information is shared when
  someone follows a link from your site to another.

**Why it matters for SEO:** Google uses HTTPS and security signals as
direct ranking factors. A site with HSTS scores higher than one without.

---

## 18. Open Graph Image (Social Sharing)

**What it is:** When someone shares `skypondtech.ai` on LinkedIn or
Slack, a preview card appears. This is an automatically generated image
(1200×630 pixels) showing the SkyPond Tech branding.

**Why it matters:** Branded, professional social previews increase
click-through rates when your site is shared. They also signal to
social platforms that your site is properly configured, which affects
how links perform on those platforms.

**How it works:** `app/opengraph-image.tsx` generates this image
dynamically using Next.js's edge rendering — it runs at the CDN level
so it's fast globally.

---

## 19. Favicon

**What it is:** The small icon that appears in browser tabs, bookmarks,
and mobile home screens.

**Why it matters:** While not a direct ranking factor, it's a brand signal.
More importantly, it prevents browsers from making a 404 request to
`/favicon.ico` on every page load — a small performance improvement.

**Implemented as:** `app/icon.svg` — an SVG with the "SP" monogram in
the SkyPond brand navy and accent blue.

---

## 20. IndexNow Protocol

**What it is:** An API standard supported by Bing, Yandex, and others
that lets you instantly notify search engines when a page is published
or updated.

**Why it matters:** Without IndexNow, search engines discover your new
or updated pages on their own schedule — which can take days or weeks.
With IndexNow, you send a single API call after deployment and Bing knows
about every page update within hours.

**How it works:**
1. A key file (`public/skypondtech-indexnow-b8f4e2d1a9c7.txt`) proves
   you own the domain.
2. `lib/indexnow.ts` contains the utility functions to ping the API.
3. `app/api/indexnow/route.ts` exposes a POST endpoint you can trigger
   from a Vercel deploy hook — so every deployment automatically notifies
   Bing of all 19 pages.

**To activate:** Register at `bing.com/indexnow` after going live and
replace the placeholder key with your official Bing-assigned key.

---

## 21. Content Quality & E-E-A-T Signals

E-E-A-T stands for Experience, Expertise, Authoritativeness, and
Trustworthiness — Google's framework for evaluating content quality.

**What was done in the codebase:**

**Experience signals:**
- Every product and service page contains specific, technical content
  (ARCOS reporting, DEA Form 222, HL7/FHIR protocols) written from
  operational experience. This specificity signals real first-hand
  knowledge to Google.

**Expertise signals:**
- 77 mentions of HIPAA compliance across all pages — signals deep
  understanding of healthcare compliance requirements.
- Detailed technical mockups (the DEA Scorecard, CS Inventory widget,
  Analytics Dashboard) demonstrate product depth.

**Authoritativeness signals:**
- Named client testimonials (Cory K., Tyler J., Director of Pharmacy Ops)
  loaded from Sanity CMS with real names, roles, and companies.
- Three physical addresses with city names specified.

**Trustworthiness signals:**
- Contact email and phone on every page (28 references).
- Privacy Policy with effective date and company details.
- Transparent "Who We're NOT a Fit For" section on the Industries page
  — an unusually honest signal that builds trust.
- Complete security headers.

---

## 22. Internal Linking Architecture

**What it is:** How pages on your site link to each other.

**Why it matters:** Google uses internal links to understand which pages
are most important (pages with more links pointing to them are treated
as more important) and to discover all your pages.

**What was verified:**
- All 6 products link to each other via "Related Products" sections.
- All 6 services link to each other via "Related Services" sections.
- Home page links to all major sections (Products, Services, Industries).
- Footer has complete navigation to all products, services, and company pages.
- PointClickCare product page links to PointClickCare service page.
- Privacy Policy, Our Values linked from Footer.

---

## Current SEO Score: 83/100

The site scores 83 out of 100 on the claude-seo framework audit.
The remaining 17 points require content and real-world actions that
cannot be done purely in code:
- A blog section with educational articles (+5–7 points, long-term)
- Named founder bio with Person schema (+2 points)
- Google Search Console setup and sitemap submission (+2 points)
- YouTube channel with LTC pharmacy explainer videos (+2 points)
- Customer Google reviews (+1.5 points)

The technical SEO foundation is complete and production-ready.
