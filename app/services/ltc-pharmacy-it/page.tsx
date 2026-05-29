import type { Metadata } from 'next'
import { LtcPharmacyItContent } from './_content'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema } from '@/components/seo/schemas/organization'
import { buildServiceSchema } from '@/components/seo/schemas/service'
import { SITE_URL } from '@/lib/constants'

const serviceSchema = buildServiceSchema({
  name: 'LTC Pharmacy IT Services',
  description: 'Telepharmacy applications, DEA compliance systems, pharmacy-facility integration, and custom reporting for long-term care pharmacy.',
  url: `${SITE_URL}/services/ltc-pharmacy-it`,
  serviceType:   'LTC Pharmacy IT',
  datePublished: '2025-10-01',
  dateModified:  '2026-05-29',
})

export const metadata: Metadata = {
  title: 'LTC Pharmacy IT Services — Telepharmacy, DEA Compliance & Integrations',
  description: 'Telepharmacy apps, pharmacy-facility integration, DEA compliance systems, and custom reporting — built exclusively for long-term care pharmacy by specialists with real LTC operational experience.',
  alternates: {
    canonical: `${SITE_URL}/services/ltc-pharmacy-it`,
  },
  openGraph: {
    title: 'LTC Pharmacy IT — Specialized Long-Term Care Technology',
    description: 'Telepharmacy apps, DEA compliance, pharmacy-facility integration, and custom reporting — built exclusively for LTC pharmacy.',
    url: `${SITE_URL}/services/ltc-pharmacy-it`,
    type: 'website',
  },
  twitter: {
    title: 'LTC Pharmacy IT — Specialized Long-Term Care Technology',
    description: 'Telepharmacy apps, DEA compliance, pharmacy-facility integration, and custom reporting — built exclusively for LTC pharmacy.',
    card: 'summary_large_image',
  },
}

export default function Page() {
  return (
    <>
      <JsonLd data={[organizationSchema, serviceSchema]} />
      <LtcPharmacyItContent />
    </>
  )
}
