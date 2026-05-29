/**
 * lib/indexnow.ts — IndexNow protocol helper
 *
 * IndexNow lets you instantly notify Bing (and other supporting search engines)
 * when a page is published or updated, instead of waiting for their crawler
 * to discover it on its own schedule.
 *
 * HOW TO USE:
 *   import { pingIndexNow } from '@/lib/indexnow'
 *   await pingIndexNow(['/products/dea-lookup', '/about'])
 *
 * HOW TO ACTIVATE ON DEPLOY:
 *   In Vercel → Settings → Deploy Hooks, create a hook.
 *   Or call this function from a Next.js Route Handler after content updates.
 *
 * SETUP (one-time):
 *   1. Go to https://www.bing.com/indexnow to verify you own the site
 *   2. Replace INDEX_NOW_KEY below with the key Bing assigns you
 *   3. The key file (public/skypondtech-indexnow-b8f4e2d1a9c7.txt) is already created and will be deployed
 */

const INDEX_NOW_KEY = 'skypondtech-indexnow-b8f4e2d1a9c7'
const SITE_URL      = 'https://skypondtech.ai'
const INDEXNOW_API  = 'https://api.indexnow.org/indexnow'

/**
 * Pings IndexNow for one or more URL paths.
 * Safe to call in server-side code (Route Handlers, server actions).
 *
 * @param paths - Array of absolute paths, e.g. ['/products/dea-lookup']
 * @returns The API response status
 */
export async function pingIndexNow(paths: string[]): Promise<{ status: number; ok: boolean }> {
  const urls = paths.map((p) => `${SITE_URL}${p}`)

  try {
    const res = await fetch(INDEXNOW_API, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host:        'skypondtech.ai',
        key:         INDEX_NOW_KEY,
        keyLocation: `${SITE_URL}/${INDEX_NOW_KEY}.txt`,
        urlList:     urls,
      }),
    })
    return { status: res.status, ok: res.ok }
  } catch (err) {
    console.error('[IndexNow] ping failed:', err)
    return { status: 0, ok: false }
  }
}

/**
 * Pings IndexNow for ALL 19 indexable routes on the site.
 * Call this after a full deploy to ensure every page is fresh-indexed.
 */
export async function pingAllPages(): Promise<{ status: number; ok: boolean }> {
  const allPaths = [
    '/',
    '/about', '/our-values', '/industries', '/schedule-demo',
    '/products',
    '/products/dea-lookup', '/products/dea-compliance-reporting',
    '/products/cs-inventory', '/products/ltc-analytics',
    '/products/pointclickcare-feed', '/products/document-automation',
    '/services',
    '/services/ltc-pharmacy-it', '/services/ai-automation',
    '/services/data-analytics', '/services/custom-development',
    '/services/microsoft-cloud', '/services/pointclickcare-integration',
  ]
  return pingIndexNow(allPaths)
}
