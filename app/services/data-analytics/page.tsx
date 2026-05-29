import type { Metadata } from 'next'
import { DataAnalyticsContent } from './_content'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema } from '@/components/seo/schemas/organization'
import { buildServiceSchema } from '@/components/seo/schemas/service'
import { SITE_URL } from '@/lib/constants'

const serviceSchema = buildServiceSchema({
  name: 'Data Analytics & Power BI for LTC Pharmacy',
  description: 'Custom Power BI dashboards and automated data pipelines for long-term care pharmacy — LTC-specific metrics, real-time pipelines, and scheduled reporting.',
  url: `${SITE_URL}/services/data-analytics`,
  serviceType:   'Data Analytics',
  datePublished: '2025-10-01',
  dateModified:  '2026-05-29',
})

export const metadata: Metadata = {
  title: 'LTC Pharmacy Data Analytics & Power BI — Custom Dashboards & Data Pipelines',
  description: 'Custom Power BI dashboards, automated data pipelines, and LTC-specific analytics that turn pharmacy data into actionable decisions. Real-time, facility-level, and executive-ready.',
  alternates: {
    canonical: `${SITE_URL}/services/data-analytics`,
  },
  openGraph: {
    title: 'Data Analytics & Power BI for LTC Pharmacy',
    description: 'Custom Power BI dashboards and automated data pipelines that make your LTC pharmacy data genuinely actionable. Real-time, LTC-specific, automated delivery.',
    url: `${SITE_URL}/services/data-analytics`,
    type: 'website',
  },
  twitter: {
    title: 'Data Analytics & Power BI for LTC Pharmacy',
    description: 'Custom Power BI dashboards and automated data pipelines that make your LTC pharmacy data genuinely actionable. Real-time, LTC-specific, automated delivery.',
    card: 'summary_large_image',
  },
}

export default function Page() {
  return (
    <>
      <JsonLd data={[organizationSchema, serviceSchema]} />
      <DataAnalyticsContent />
    </>
  )
}
