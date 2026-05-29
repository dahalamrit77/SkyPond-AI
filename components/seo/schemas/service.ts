import type { WithContext, Service } from 'schema-dts'
import { SITE_URL } from '@/lib/constants'

interface ServiceSchemaOptions {
  name:            string
  description:     string
  url:             string
  /** Keywords describing what this service delivers */
  serviceType?:    string
  /** ISO 8601 — e.g. "2025-10-01" */
  datePublished?:  string
  /** ISO 8601 — e.g. "2026-05-29" */
  dateModified?:   string
}

/**
 * Service schema builder — used on every service page.
 * https://schema.org/Service
 */
export function buildServiceSchema(opts: ServiceSchemaOptions): WithContext<Service> {
  return {
    '@context':   'https://schema.org',
    '@type':      'Service',
    name:         opts.name,
    description:  opts.description,
    url:          opts.url,
    serviceType:  opts.serviceType ?? 'LTC Pharmacy Technology',
    provider: {
      '@type': 'Organization',
      name:    'SkyPond Tech',
      url:     SITE_URL,
    },
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified  ? { dateModified:  opts.dateModified  } : {}),
    areaServed: {
      '@type': 'Country',
      name:    'United States',
    },
  }
}
