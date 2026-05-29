import type { MetadataRoute } from 'next'

const SITE_URL = 'https://skypondtech.ai'

/**
 * Next.js App Router robots.txt generation.
 * Served at /robots.txt automatically.
 *
 * Rules:
 * - All standard crawlers: index everything except /privacy-policy (noindex page)
 * - GPTBot, ClaudeBot, PerplexityBot: allowed (site provides LLM-friendly content via /llms.txt)
 * - Sitemap reference injected automatically.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow:     '/',
        disallow:  ['/privacy-policy'],
      },
    ],
    sitemap:   `${SITE_URL}/sitemap.xml`,
    host:      SITE_URL,
  }
}
