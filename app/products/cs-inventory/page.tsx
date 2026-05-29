import type { Metadata } from 'next'
import { CsInventoryContent } from './_content'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema } from '@/components/seo/schemas/organization'
import { buildSoftwareSchema } from '@/components/seo/schemas/software'
import { SITE_URL } from '@/lib/constants'

const softwareSchema = buildSoftwareSchema({
  name: 'SkyPond Tech CS Inventory',
  description: 'Real-time controlled substance inventory management for LTC pharmacy — perpetual tracking, discrepancy alerts, and full audit trails for CII–CV.',
  url: `${SITE_URL}/products/cs-inventory`,
  price:         'Contact for pricing',
  datePublished: '2025-10-01',
  dateModified:  '2026-05-29',
})

export const metadata: Metadata = {
  title: 'Controlled Substance Inventory — Real-Time CS Tracking for LTC Pharmacy',
  description: 'Real-time perpetual inventory for controlled substances CII–CV. Automated discrepancy alerts, biennial inventory support, and full transaction audit trails for LTC pharmacy.',
  alternates: {
    canonical: `${SITE_URL}/products/cs-inventory`,
  },
  openGraph: {
    title: 'CS Inventory — Real-Time Controlled Substance Tracking',
    description: 'Real-time CS inventory management built for LTC pharmacy volume. Automated discrepancy alerts, 100% transaction auditability, CII–CV coverage.',
    url: `${SITE_URL}/products/cs-inventory`,
    type: 'website',
  },
  twitter: {
    title: 'CS Inventory — Real-Time Controlled Substance Tracking',
    description: 'Real-time CS inventory management built for LTC pharmacy volume. Automated discrepancy alerts, 100% transaction auditability, CII–CV coverage.',
    card: 'summary_large_image',
  },
}

export default function Page() {
  return (
    <>
      <JsonLd data={[organizationSchema, softwareSchema]} />
      <CsInventoryContent />
    </>
  )
}
