/*
 * lib/tokens.ts — Design Tokens
 *
 * Migrated from: src/tokens.js
 * Changes: Added TypeScript types. Zero value changes.
 *
 * These are the single source of truth for every color used in the app.
 * All components import from here — nothing is hardcoded.
 */

const C = {
  // ── Backgrounds ─────────────────────────────────────────────────────────
  bg:      '#C6DBE7',   // Page background (light blue)
  surface: '#FFFFFF',   // Card / panel backgrounds
  alt:     '#EAF1F6',   // Alternate section background
  border:  '#B8D0DF',   // Border color

  // ── Brand Blues ─────────────────────────────────────────────────────────
  p:       '#143156',   // Primary brand blue (dark)
  pd:      '#0D2240',   // Primary dark (hover state of p)
  p2:      '#8AB8E3',   // Secondary / accent blue (light)

  // ── Accent Colors ───────────────────────────────────────────────────────
  accent:  '#8AB8E3',   // Same as p2 — used for interactive highlights
  violet:  '#C6DBE7',   // Soft violet tint (same as bg)
  green:   '#83B762',   // Success / positive states
  amber:   '#D9A629',   // Warning / attention states
  red:     '#F79043',   // Error / negative states (actually orange-red)

  // ── Text Colors ─────────────────────────────────────────────────────────
  head:    '#143156',   // Heading text (same as primary brand blue)
  body:    '#1E3A5C',   // Body text (slightly lighter than heading)
  muted:   '#5A7A9A',   // Muted / secondary text

  // ── Special ─────────────────────────────────────────────────────────────
  dark:    '#143156',   // Dark background sections (same as p)
  ms:      '#0078D4',   // Microsoft brand blue (used in Microsoft Cloud page)
} as const

// TypeScript: infer the type from the object so it's always in sync
export type ColorKey = keyof typeof C
export type ColorValue = typeof C[ColorKey]

export default C
