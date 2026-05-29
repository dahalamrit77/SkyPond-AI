# SEO Score Improvement Plan: 83 → 100
## SkyPond Tech — skypondtech.ai

**Current score: 83/100**
**Target: 95–100/100** (100 is theoretical maximum; 95+ is considered elite)

The 17-point gap breaks down into two buckets:
- **~10 points**: Things Claude can fix directly in the code right now
- **~7 points**: Things that require you personally (accounts, content, real-world actions)

---

## ══════════════════════════════════════════════════
## PART A: THINGS CLAUDE CAN DO FOR YOU
## (No action needed from you — just say "go ahead")
## ══════════════════════════════════════════════════

### A1. Fix orphaned pages (+1.5 points)
**What it is:** Three pages on your website have zero links pointing to them.
Think of links like roads — if no road leads to a page, Google and users
can't easily find it. These pages are currently "islands."

**The three orphaned pages:**
- `/our-values` — no page links to it
- `/services/pointclickcare-integration` — no page links to it  
- `/privacy-policy` — standard to link from footer

**What Claude will do:**
- Add `/our-values` to your Footer navigation
- Add a "Learn more about PointClickCare" link from your Products page
- Add `/privacy-policy` to the Footer legal section (standard industry practice)

---

### A2. Fix footer dead links (+1 point)
**What it is:** Your Footer currently has links to three pages that don't exist:
Case Studies, Blog, and FAQs. When Google or a user clicks these and gets
a "page not found" error, it damages your trust score.

**What Claude will do:** Remove those three broken links from the Footer
until you build those pages. Simple one-line removal.

---

### A3. Add FAQ schema to every product and service page (+2 points)
**What it is:** Schema markup is invisible code that tells Google and AI
assistants (like ChatGPT and Perplexity) exactly what your pages are about.
"FAQ schema" is a special type that packages your questions and answers
in a format AI engines love to cite.

**Important note:** Google stopped showing FAQ "rich results" for commercial
websites in 2023. But ChatGPT, Perplexity, and Google's AI Overviews still
read FAQ schema and cite from it heavily. This is now purely an AI visibility
tool — and a powerful one.

**What Claude will do:** Write 3–4 questions and answers for each of your
12 product/service pages based on the existing page content, then add
them as invisible structured data. Example for DEA Lookup:
- "Does the DEA Lookup Tool query the federal database in real time?"
- "Can I verify multiple DEA numbers at once?"
- "Is a DEA Lookup compliant with HIPAA?"

---

### A4. Add IndexNow protocol (+0.5 points)
**What it is:** IndexNow is a system where your website automatically
"pings" search engines (Bing, Yandex) the moment you publish or update
a page, saying "hey, come look at this immediately." Without it, search
engines discover your new content on their own schedule — which can take
days or weeks.

**What Claude will do:** Create the verification file and add the
protocol configuration to your project.

---

### A5. Add named founder bio to About page (+2 points)
**What it is:** Google's guidelines reward websites where real, named
people stand behind the content. "A team with a decade of experience"
is weaker than "Ramesh KC, who spent 9 years working inside LTC pharmacy
operations before founding SkyPond Tech in 2022." Named individuals
are also much more likely to be cited by AI engines like ChatGPT.

**What Claude will do:** Add a founder bio section to the About page
with a proper "Person" schema — the invisible code that tells Google
this is a real, named expert.

**What you need to provide (just reply with this info):**
- Ramesh's full name
- His title/role
- A 2–3 sentence bio
- His LinkedIn URL (for the schema)
- Optional: a photo URL

Once you provide that, Claude does the rest.

---

### A6. Add blog infrastructure (placeholder) (+1 point for infrastructure)
**What it is:** A blog section isn't just for writing — it's the single
most effective way to build "topical authority." Topical authority means
Google and AI engines trust you as THE expert on LTC pharmacy technology.
Right now, your site only has product and service pages. If a pharmacy
director Googles "how to prepare for a DEA audit," you don't show up —
because you have no educational content.

**What Claude can do:**
- Create the `/blog` route structure
- Create a professional blog index page
- Write 3 SEO-optimised starter articles on topics you already know
  (based on content already in your codebase)

**What you will need to do long-term:** Review and approve the articles,
then keep publishing. Claude can write every future article if you give
it the topic.

---

### A7. Add datePublished to content pages (+0.5 points)
**What it is:** Google and AI engines want to know how fresh your content
is. Adding a "last updated" signal to your pages tells them your content
is current and maintained — not abandoned. This is especially important
for compliance content (DEA regulations change).

**What Claude will do:** Add structured `datePublished` metadata to all
product and service pages in the schema.

---

**TOTAL from Part A: approximately +8.5 points → Score goes from 83 → ~91**

---

## ══════════════════════════════════════════════════
## PART B: THINGS ONLY YOU CAN DO
## (These require your real-world accounts and decisions)
## ══════════════════════════════════════════════════

### B1. Google Search Console setup (+2 points)
**What it is:** Google Search Console is Google's free tool that shows
you how Google sees your website. More importantly, you use it to
officially TELL Google your website exists and to ask it to index
your pages. Without this, Google discovers your site on its own
timeline — which could take weeks or months.

**How to do it (10–15 minutes):**
1. Go to https://search.google.com/search-console
2. Sign in with your Google account
3. Click "Add Property" → enter `https://skypondtech.ai`
4. Choose "HTML file" verification method
5. Download the small HTML file they give you
6. Drop it into your `/public/` folder and deploy
7. Click "Verify" in Search Console
8. Go to Sitemaps → enter `https://skypondtech.ai/sitemap.xml`
9. Click "Submit"

**Why only you can do this:** Search Console requires ownership
verification tied to a Google account — only the actual site owner
can do this.

---

### B2. YouTube channel creation (+2 points)
**What it is:** Research shows YouTube is the single strongest signal
for getting cited by AI engines like ChatGPT and Perplexity (0.737
correlation — much stronger than backlinks). You don't need a viral
channel. Even 2–3 short explainer videos (5–10 minutes each) on
topics like "What is LTC pharmacy DEA compliance?" would dramatically
increase how often AI assistants mention SkyPond Tech.

**The minimum viable approach (3 videos):**
1. "What is ARCOS reporting? A guide for LTC pharmacies"
2. "How PointClickCare integration works for LTC pharmacies"
3. "SkyPond Tech platform walkthrough"

**Why only you can do this:** Recording videos requires you (or someone
at SkyPond) on camera or screensharing. Claude cannot film videos.

---

### B3. Deploy the website and connect the domain (+1 point)
**What it is:** None of the SEO work matters until the site is live.
Search engines can't index what they can't reach.

**Steps:**
1. Push to GitHub (you said you'd do this)
2. Connect Vercel to your GitHub repo
3. Add your 3 Sanity environment variables in Vercel dashboard
4. Point `skypondtech.ai` DNS records to Vercel

Full step-by-step is in your `DEPLOYMENT-GUIDE.md`.

---

### B4. Collect and publish customer reviews (+1.5 points — future)
**What it is:** AggregateRating schema (stars + review count) is one of
the strongest trust signals in Google. Your three named testimonials
(Cory K., Tyler J., Director of Pharmacy Ops) are already great for
E-E-A-T. Getting even 5–10 Google reviews would unlock star ratings
in search results and add a significant authority signal.

**How to get reviews:**
- Ask your existing clients directly (Cory K., Tyler J., etc.)
- Send them a direct Google review link
- Add the link to your email signature

**Why only you can do this:** Collecting reviews requires your
personal relationships with clients.

---

**TOTAL from Part B: approximately +6.5 points → Score goes from ~91 → ~97–98**

---

## REALISTIC FINAL SCORE BREAKDOWN

| Action | Who | Points | Effort |
|--------|-----|--------|--------|
| Fix orphaned pages | Claude | +1.5 | 20 min |
| Fix footer dead links | Claude | +1.0 | 5 min |
| FAQ schema on 12 pages | Claude | +2.0 | 1 hour |
| IndexNow protocol | Claude | +0.5 | 30 min |
| Named founder bio + schema | Claude (you provide info) | +2.0 | 30 min |
| Blog infrastructure + 3 articles | Claude | +1.0 | 2 hours |
| datePublished on pages | Claude | +0.5 | 30 min |
| **Subtotal: Claude actions** | | **+8.5** | ~5 hours |
| Google Search Console | You | +2.0 | 15 min |
| YouTube channel (3 videos) | You | +2.0 | Weeks |
| Deploy live website | You | +1.0 | 1 hour |
| Customer reviews | You | +1.5 | Ongoing |
| **Subtotal: Your actions** | | **+6.5** | — |
| **Total potential gain** | Both | **+15** | |
| **Projected final score** | | **97–98/100** | |

---

## HOW TO PROCEED

Reply with ONE of the following:

**Option 1: "Go ahead with all of Part A"**
Claude implements everything in Part A in one session.
You just need to provide Ramesh's bio details when asked.

**Option 2: "Start with quick wins first"**
Claude does A1 (orphan links) + A2 (footer) + A7 (dates) first —
these take 30 minutes and add 3 points with no decisions needed.

**Option 3: "Skip the blog for now"**
Claude does everything in Part A except the blog section.

**For all options, you should do in parallel:**
1. Prepare Ramesh's bio (2–3 sentences)
2. Book time to set up Google Search Console on deploy day
3. Think about whether a YouTube channel is feasible

---

## WHY 100/100 IS THEORETICAL

The last 2–3 points (YouTube presence, Wikipedia entity, rich backlink
profile from industry publications) take 6–12 months of real-world
marketing to accumulate. They can't be coded. A score of 97–98 out of
100 is considered elite-level SEO — better than the vast majority of
B2B SaaS companies in any industry.
