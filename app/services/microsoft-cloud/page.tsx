import type { Metadata } from 'next'
import { MicrosoftCloudContent } from './_content'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema } from '@/components/seo/schemas/organization'
import { buildServiceSchema } from '@/components/seo/schemas/service'
import { SITE_URL } from '@/lib/constants'

const serviceSchema = buildServiceSchema({
  name: 'Microsoft Cloud for LTC Pharmacy',
  description: 'Microsoft 365, Azure, and Power Platform deployment for long-term care pharmacy — HIPAA BAA, healthcare compliance, and LTC-specific configuration.',
  url: `${SITE_URL}/services/microsoft-cloud`,
  serviceType:   'Microsoft Cloud Services',
  datePublished: '2025-10-01',
  dateModified:  '2026-05-29',
})

export const metadata: Metadata = {
  title: 'Microsoft Cloud for LTC Pharmacy — Microsoft 365, Azure & Power Platform',
  description: 'Microsoft 365, Azure, and Power Platform deployed for LTC pharmacy — HIPAA BAA in place, LTC workflows configured, and healthcare compliance built in from the start.',
  alternates: {
    canonical: `${SITE_URL}/services/microsoft-cloud`,
  },
  openGraph: {
    title: 'Microsoft Cloud for LTC Pharmacy',
    description: 'Microsoft 365, Azure, and Power Platform properly configured for LTC pharmacy. HIPAA BAA, LTC-specific configuration, and Power BI analytics included.',
    url: `${SITE_URL}/services/microsoft-cloud`,
    type: 'website',
  },
  twitter: {
    title: 'Microsoft Cloud for LTC Pharmacy',
    description: 'Microsoft 365, Azure, and Power Platform properly configured for LTC pharmacy. HIPAA BAA, LTC-specific configuration, and Power BI analytics included.',
    card: 'summary_large_image',
  },
}

export default function Page() {
  return (
    <>
      <JsonLd data={[organizationSchema, serviceSchema]} />
      <MicrosoftCloudContent />
    </>
  )
}
