/*
 * lib/sanity/client.ts — Sanity CMS Client
 *
 * Migrated from: src/sanityClient.js
 *
 * Key differences from the old client:
 *
 * 1. Uses next-sanity instead of @sanity/client directly.
 *    next-sanity wraps @sanity/client with Next.js-specific optimisations:
 *    - Data fetching integrates with Next.js caching (fetch cache)
 *    - Supports Incremental Static Regeneration (ISR) out of the box
 *    - Enables Sanity Live Preview in development
 *
 * 2. Credentials are now environment variables (not hardcoded).
 *    The actual values live in .env.local (gitignored).
 *    See .env.example for the required variable names.
 *
 * 3. `perspective: 'published'` explicitly fetches only published content,
 *    not drafts — correct behaviour for production.
 */
import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-12',
  // useCdn in production only — apicdn.sanity.io has CORS restrictions that
  // block requests from localhost during development.
  useCdn: process.env.NODE_ENV === 'production',
  // 'published' in production, 'previewDrafts' in dev so drafts show locally
  perspective: process.env.NODE_ENV === 'production' ? 'published' : 'previewDrafts',
})
