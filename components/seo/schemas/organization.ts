import type { WithContext, Organization } from 'schema-dts'
import { SITE_URL, CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/constants'

/**
 * Organization schema — placed on every page via the root layout.
 * https://schema.org/Organization
 */
export const organizationSchema: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type':    'Organization',
  name:       'SkyPond Tech',
  url:        SITE_URL,
  logo: {
    '@type':       'ImageObject',
    url:           `${SITE_URL}/navbar-logo-blue.png`,
    width:         '250',
    height:        '56',
  },
  description:
    'The complete LTC pharmacy technology platform — DEA compliance, AI automation, analytics, PointClickCare integration, and custom development.',
  email:          CONTACT_EMAIL,
  telephone:      CONTACT_PHONE,
  address: {
    '@type':           'PostalAddress',
    addressLocality:   'Lafayette',
    addressRegion:     'CO',
    addressCountry:    'US',
  },
  sameAs: [
    'https://www.linkedin.com/company/skypond-tech-llc/',
    'https://www.instagram.com/skypondtech/',
  ],
}
