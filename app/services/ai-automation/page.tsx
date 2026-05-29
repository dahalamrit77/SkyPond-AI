import type { Metadata } from 'next'
import { AiAutomationContent } from './_content'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema } from '@/components/seo/schemas/organization'
import { buildServiceSchema } from '@/components/seo/schemas/service'
import { SITE_URL } from '@/lib/constants'

const serviceSchema = buildServiceSchema({
  name: 'AI Automation for LTC Pharmacy',
  description: 'Intelligent workflow automation for LTC pharmacy — prior authorization, DEA compliance reporting, order triage, and fax processing with full audit trails.',
  url: `${SITE_URL}/services/ai-automation`,
  serviceType:   'AI Automation',
  datePublished: '2025-10-01',
  dateModified:  '2026-05-29',
})

export const metadata: Metadata = {
  title: 'AI Automation for LTC Pharmacy — Prior Auth, Order Triage & Compliance Workflows',
  description: 'AI workflow automation purpose-designed for LTC pharmacy: prior authorization, DEA compliance reporting, order triage, fax processing — automated end-to-end with full audit trails.',
  alternates: {
    canonical: `${SITE_URL}/services/ai-automation`,
  },
  openGraph: {
    title: 'AI Automation for LTC Pharmacy',
    description: '89% average time reduction. AI workflows for prior auth, DEA compliance reporting, order triage, and fax processing — purpose-built for LTC pharmacy.',
    url: `${SITE_URL}/services/ai-automation`,
    type: 'website',
  },
  twitter: {
    title: 'AI Automation for LTC Pharmacy',
    description: '89% average time reduction. AI workflows for prior auth, DEA compliance reporting, order triage, and fax processing — purpose-built for LTC pharmacy.',
    card: 'summary_large_image',
  },
}

export default function Page() {
  return (
    <>
      <JsonLd data={[organizationSchema, serviceSchema]} />
      <AiAutomationContent />
    </>
  )
}
