import type { Metadata } from 'next'
import { LtcAnalyticsContent } from './_content'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema } from '@/components/seo/schemas/organization'
import { buildSoftwareSchema } from '@/components/seo/schemas/software'
import { SITE_URL } from '@/lib/constants'

const softwareSchema = buildSoftwareSchema({
  name: 'SkyPond Tech LTC Analytics Dashboard',
  description: 'LTC pharmacy analytics platform — facility benchmarking, utilization trends, cost analytics, and custom KPI dashboards with 50+ pre-built reports.',
  url: `${SITE_URL}/products/ltc-analytics`,
  price:         'Contact for pricing',
  datePublished: '2025-10-01',
  dateModified:  '2026-05-29',
})

export const metadata: Metadata = {
  title: 'LTC Analytics Dashboard — Pharmacy Intelligence for Long-Term Care',
  description: 'Purpose-built analytics for LTC pharmacy: facility benchmarking, medication utilization trends, cost & margin analytics, and custom KPI dashboards powered by Power BI.',
  alternates: {
    canonical: `${SITE_URL}/products/ltc-analytics`,
  },
  openGraph: {
    title: 'LTC Analytics Dashboard — Pharmacy Intelligence Platform',
    description: '50+ pre-built LTC-specific reports, daily data refresh, multi-facility benchmarking, and custom KPI dashboards for long-term care pharmacy.',
    url: `${SITE_URL}/products/ltc-analytics`,
    type: 'website',
  },
  twitter: {
    title: 'LTC Analytics Dashboard — Pharmacy Intelligence Platform',
    description: '50+ pre-built LTC-specific reports, daily data refresh, multi-facility benchmarking, and custom KPI dashboards for long-term care pharmacy.',
    card: 'summary_large_image',
  },
}

export default function Page() {
  return (
    <>
      <JsonLd data={[organizationSchema, softwareSchema]} />
      <LtcAnalyticsContent />
    </>
  )
}
