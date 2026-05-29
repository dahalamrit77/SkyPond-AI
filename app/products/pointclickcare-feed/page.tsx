import type { Metadata } from 'next'
import { PointClickCareFeedContent } from './_content'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema } from '@/components/seo/schemas/organization'
import { buildSoftwareSchema } from '@/components/seo/schemas/software'
import { SITE_URL } from '@/lib/constants'

const softwareSchema = buildSoftwareSchema({
  name: 'SkyPond Tech PointClickCare Data Feed',
  description: 'Real-time bidirectional PointClickCare integration for LTC pharmacy — ADT event handling, MAR reconciliation, and automated census/payor change delivery.',
  url: `${SITE_URL}/products/pointclickcare-feed`,
  price:         'Contact for pricing',
  datePublished: '2025-10-01',
  dateModified:  '2026-05-29',
})

export const metadata: Metadata = {
  title: 'PointClickCare Data Feed — Real-Time Pharmacy Integration',
  description: 'Bidirectional PointClickCare integration for LTC pharmacy: real-time ADT events, MAR reconciliation, census and payor changes delivered automatically with zero manual re-entry.',
  alternates: {
    canonical: `${SITE_URL}/products/pointclickcare-feed`,
  },
  openGraph: {
    title: 'PointClickCare Data Feed — Real-Time LTC Integration',
    description: 'Real-time PCC change detection with zero manual report runs. ADT triggers, MAR reconciliation, and HIPAA-compliant data transmission for LTC pharmacy.',
    url: `${SITE_URL}/products/pointclickcare-feed`,
    type: 'website',
  },
  twitter: {
    title: 'PointClickCare Data Feed — Real-Time LTC Integration',
    description: 'Real-time PCC change detection with zero manual report runs. ADT triggers, MAR reconciliation, and HIPAA-compliant data transmission for LTC pharmacy.',
    card: 'summary_large_image',
  },
}

export default function Page() {
  return (
    <>
      <JsonLd data={[organizationSchema, softwareSchema]} />
      <PointClickCareFeedContent />
    </>
  )
}
