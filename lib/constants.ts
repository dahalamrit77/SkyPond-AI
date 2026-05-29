/*
 * lib/constants.ts — Application Constants
 *
 * Migrated from: src/config/constants.js
 * Changes: Added TypeScript types. Zero value changes.
 *
 * Single source of truth for contact info, URLs, and third-party service URLs.
 * Import from here — never hardcode these values in components.
 */

// ── Contact Information ────────────────────────────────────────────────────
export const CONTACT_EMAIL        = 'info@skypondtech.com'
export const CONTACT_PHONE        = '+17207246828'
export const CONTACT_PHONE_DISPLAY = '(720) 724-6828'

// ── Site URL ───────────────────────────────────────────────────────────────
// Used for canonical URLs, OG tags, and schema markup
export const SITE_URL = 'https://skypondtech.ai'

// ── HubSpot Meetings Embed ─────────────────────────────────────────────────
// Used by the Schedule Demo page
export const HUBSPOT_MEETINGS_URL = 'https://meetings-na2.hubspot.com/ramesh-kc?embed=true'
export const HUBSPOT_SCRIPT_URL   = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js'
