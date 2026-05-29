/*
 * lib/sanity/queries.ts — GROQ Query Strings
 *
 * All Sanity GROQ queries live here — not scattered across components.
 * This makes them easy to audit, update, and test in one place.
 *
 * GROQ (Graph-Relational Object Queries) is Sanity's query language.
 * Each query is a template string that gets passed to sanityClient.fetch().
 */

// Testimonials — used on the Home page
// Sorted by creation date, newest first
export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    a,
    role,
    company,
    text,
    "avatar": avatar.asset->url
  }
`

// TypeScript type for a single testimonial result
export interface Testimonial {
  _id:     string
  a:       string   // author name
  role?:   string
  company?: string
  text:    string
  avatar?: string
}
