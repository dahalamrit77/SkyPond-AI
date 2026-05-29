import type { Metadata } from 'next'
import { DeaLookupContent } from './_content'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema } from '@/components/seo/schemas/organization'
import { buildSoftwareSchema } from '@/components/seo/schemas/software'
import { SITE_URL } from '@/lib/constants'

const softwareSchema = buildSoftwareSchema({
  name: 'SkyPond Tech DEA Lookup Tool',
  description: 'Real-time DEA registration verification tool for LTC pharmacy — validates prescriber DEA numbers against live federal databases with full audit trail.',
  url: `${SITE_URL}/products/dea-lookup`,
  price:         'Contact for pricing',
  datePublished: '2025-10-01',
  dateModified:  '2026-05-29',
})

export const metadata: Metadata = {
  title: 'DEA Lookup Tool — Live Prescriber Verification for LTC Pharmacy',
  description: 'Validate DEA registrations against live federal databases in under a second. Bulk CSV upload, expiration monitoring, and automated audit trail for LTC pharmacy compliance.',
  alternates: {
    canonical: `${SITE_URL}/products/dea-lookup`,
  },
  openGraph: {
    title: 'DEA Lookup Tool — Instant Prescriber Verification',
    description: 'Validate DEA numbers against live federal databases in under a second. Bulk validation, expiration monitoring, and automated audit trail.',
    url: `${SITE_URL}/products/dea-lookup`,
    type: 'website',
  },
  twitter: {
    title: 'DEA Lookup Tool — Instant Prescriber Verification',
    description: 'Validate DEA numbers against live federal databases in under a second. Bulk validation, expiration monitoring, and automated audit trail.',
    card: 'summary_large_image',
  },
}

export default function Page() {
  return (
    <>
      <JsonLd data={[organizationSchema, softwareSchema]} />
      <DeaLookupContent />
    </>
  )
}
