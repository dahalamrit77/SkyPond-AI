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
// DEBUG: fetch all raw fields to identify correct schema field names
export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(_createdAt desc) {
    ...
  }
`

// TypeScript type for a single testimonial result
export interface Testimonial {
  _id:      string
  a:        string   // author name  (Sanity field: author)
  role?:    string   // job title    (Sanity field: role)
  company?: string   // company      (Sanity field: company)
  text:     string   // quote text   (Sanity field: quote)
  avatar?:  string
}
