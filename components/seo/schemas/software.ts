import type { WithContext, SoftwareApplication } from 'schema-dts'
import { SITE_URL } from '@/lib/constants'

interface SoftwareSchemaOptions {
  name:            string
  description:     string
  url:             string
  /** Short price description, e.g. "Contact for pricing" */
  price?:          string
  /** ISO 8601 — e.g. "2025-10-01" */
  datePublished?:  string
  /** ISO 8601 — e.g. "2026-05-29" */
  dateModified?:   string
}

/**
 * SoftwareApplication schema builder — used on every product page.
 * https://schema.org/SoftwareApplication
 */
export function buildSoftwareSchema(opts: SoftwareSchemaOptions): WithContext<SoftwareApplication> {
  return {
    '@context':          'https://schema.org',
    '@type':             'SoftwareApplication',
    name:                opts.name,
    description:         opts.description,
    url:                 opts.url,
    applicationCategory: 'BusinessApplication',
    operatingSystem:     'Web',
    offers: {
      '@type':       'Offer',
      price:         opts.price ?? 'Contact for pricing',
      priceCurrency: 'USD',
      seller: {
        '@type': 'Organization',
        name:    'SkyPond Tech',
        url:     SITE_URL,
      },
    },
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified  ? { dateModified:  opts.dateModified  } : {}),
    provider: {
      '@type': 'Organization',
      name:    'SkyPond Tech',
      url:     SITE_URL,
    },
  }
}
