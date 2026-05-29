import type { Metadata } from 'next'
import { PointClickCareIntegrationContent } from './_content'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema } from '@/components/seo/schemas/organization'
import { buildServiceSchema } from '@/components/seo/schemas/service'
import { SITE_URL } from '@/lib/constants'

const serviceSchema = buildServiceSchema({
  name: 'PointClickCare Integration for LTC Pharmacy',
  description: 'Direct PointClickCare Marketplace API integration delivering complete resident records, ADT events, and real-time census data for LTC pharmacy — no facility portal access required.',
  url: `${SITE_URL}/services/pointclickcare-integration`,
  serviceType:   'PointClickCare Integration',
  datePublished: '2025-10-01',
  dateModified:  '2026-05-29',
})

export const metadata: Metadata = {
  title: 'PointClickCare Integration for LTC Pharmacy — Complete Census & ADT Data',
  description: 'Direct PointClickCare Marketplace API integration for LTC pharmacy — complete resident records, ADT events, payer data, and real-time webhooks without requiring facility portal access.',
  alternates: {
    canonical: `${SITE_URL}/services/pointclickcare-integration`,
  },
  openGraph: {
    title: 'PointClickCare Integration for LTC Pharmacy',
    description: 'Complete PCC census data via Marketplace API — demographics, payer info, ADT records, and real-time webhooks. No portal access required from facilities.',
    url: `${SITE_URL}/services/pointclickcare-integration`,
    type: 'website',
  },
  twitter: {
    title: 'PointClickCare Integration for LTC Pharmacy',
    description: 'Complete PCC census data via Marketplace API — demographics, payer info, ADT records, and real-time webhooks. No portal access required from facilities.',
    card: 'summary_large_image',
  },
}

export default function Page() {
  return (
    <>
      <JsonLd data={[organizationSchema, serviceSchema]} />
      <PointClickCareIntegrationContent />
    </>
  )
}
