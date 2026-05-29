import type { MetadataRoute } from 'next'

const SITE_URL = 'https://skypondtech.ai'

/**
 * Next.js App Router sitemap generation.
 * Returns a MetadataRoute.Sitemap array — Next.js serialises it to /sitemap.xml automatically.
 *
 * Priority guide:
 *   1.0  Home
 *   0.9  Primary index pages (products, services)
 *   0.8  Individual product/service pages + schedule demo
 *   0.7  About, industries
 *   0.6  Our values
 *
 * Privacy policy is intentionally excluded (noindex).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // ── Helper ─────────────────────────────────────────────────────────────────
  const url = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
    lastModified: Date = now,
  ): MetadataRoute.Sitemap[number] => ({
    url:             `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  })

  return [
    // ── Core pages ────────────────────────────────────────────────────────────
    url('/',              1.0, 'weekly'),
    url('/about',         0.7, 'monthly'),
    url('/our-values',    0.6, 'monthly'),
    url('/industries',    0.7, 'monthly'),
    url('/schedule-demo', 0.8, 'yearly'),

    // ── Product index + 6 product pages ──────────────────────────────────────
    url('/products',                         0.9, 'weekly'),
    url('/products/dea-compliance-reporting',0.8, 'monthly'),
    url('/products/cs-inventory',            0.8, 'monthly'),
    url('/products/ltc-analytics',           0.8, 'monthly'),
    url('/products/pointclickcare-feed',     0.8, 'monthly'),
    url('/products/document-automation',     0.8, 'monthly'),

    // ── Service index + 6 service pages ──────────────────────────────────────
    url('/services',                                0.9, 'weekly'),
    url('/services/ltc-pharmacy-it',                0.8, 'monthly'),
    url('/services/ai-automation',                  0.8, 'monthly'),
    url('/services/data-analytics',                 0.8, 'monthly'),
    url('/services/custom-development',             0.8, 'monthly'),
    url('/services/microsoft-cloud',                0.8, 'monthly'),
    url('/services/pointclickcare-integration',     0.8, 'monthly'),
  ]
}
