import { NextResponse } from 'next/server'
import { pingAllPages } from '@/lib/indexnow'

/**
 * POST /api/indexnow
 *
 * Pings IndexNow for all 19 site pages.
 * Call this from your Vercel deploy hook or CI pipeline after each deploy.
 *
 * Example Vercel deploy hook command:
 *   curl -X POST https://skypondtech.ai/api/indexnow
 *
 * Security: in production, add an Authorization header check here.
 */
export async function POST() {
  const result = await pingAllPages()
  return NextResponse.json(result, { status: result.ok ? 200 : 500 })
}
