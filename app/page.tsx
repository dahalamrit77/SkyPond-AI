import type { Metadata } from 'next'
import { HomeContent } from './_home-content'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema } from '@/components/seo/schemas/organization'
import { websiteSchema } from '@/components/seo/schemas/website'
import { buildSoftwareSchema } from '@/components/seo/schemas/software'
import { SITE_URL } from '@/lib/constants'

/*
 * Combined SoftwareApplication schema for the full platform.
 * Individual product pages each define their own more-specific schema.
 */
const platformSchema = buildSoftwareSchema({
  name: 'SkyPond Tech LTC Pharmacy Platform',
  description:
    'The complete LTC pharmacy technology platform — DEA compliance, controlled substance inventory, AI automation, PointClickCare integration, analytics, and custom development.',
  url: SITE_URL,
  price: 'Contact for pricing',
})

export const metadata: Metadata = {
  title: 'SkyPond Tech — The Complete LTC Pharmacy Technology Platform',
  description:
    'DEA compliance software, controlled substance inventory, AI automation, PointClickCare integration, and LTC analytics. Built exclusively for long-term care pharmacy.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'SkyPond Tech — The Complete LTC Pharmacy Technology Platform',
    description:
      'DEA compliance, CS inventory, AI automation, PointClickCare integration, and analytics — built exclusively for LTC pharmacy.',
    url: SITE_URL,
    type: 'website',
  },
  twitter: {
    title: 'SkyPond Tech — LTC Pharmacy Technology',
    description:
      'DEA compliance, CS inventory, AI automation, PointClickCare integration, and analytics — built exclusively for LTC pharmacy.',
    card: 'summary_large_image',
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationSchema, websiteSchema, platformSchema]} />
      <HomeContent />
    </>
  )
}
