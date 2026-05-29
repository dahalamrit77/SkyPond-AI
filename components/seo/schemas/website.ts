import type { WithContext, WebSite } from 'schema-dts'
import { SITE_URL } from '@/lib/constants'

/**
 * WebSite schema — enables Google Sitelinks Searchbox potential.
 * https://schema.org/WebSite
 */
export const websiteSchema: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type':    'WebSite',
  name:       'SkyPond Tech',
  url:        SITE_URL,
  potentialAction: {
    '@type':       'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    // @ts-expect-error schema-dts doesn't model query-input as a string
    'query-input': 'required name=search_term_string',
  },
}
