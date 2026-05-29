import type { Metadata } from 'next'
import { DocumentAutomationContent } from './_content'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema } from '@/components/seo/schemas/organization'
import { buildSoftwareSchema } from '@/components/seo/schemas/software'
import { SITE_URL } from '@/lib/constants'

const softwareSchema = buildSoftwareSchema({
  name: 'SkyPond Tech Document Automation',
  description: 'Pharmacy document automation — template-driven prior auth generation, e-signature workflows, HIPAA-compliant archiving, and full audit trail for LTC pharmacy.',
  url: `${SITE_URL}/products/document-automation`,
  price:         'Contact for pricing',
  datePublished: '2025-10-01',
  dateModified:  '2026-05-29',
})

export const metadata: Metadata = {
  title: 'Document Automation — Generate, Route & Archive Pharmacy Documents at Scale',
  description: 'Template-driven pharmacy document automation: prior auth generation, e-signature routing, HIPAA-compliant archiving, and full audit trail — 90% reduction in assembly time.',
  alternates: {
    canonical: `${SITE_URL}/products/document-automation`,
  },
  openGraph: {
    title: 'Document Automation — Pharmacy Document Generation at Scale',
    description: '90% reduction in document assembly time. Template-driven generation, e-signature workflows, HIPAA archiving, and full audit trail for LTC pharmacy.',
    url: `${SITE_URL}/products/document-automation`,
    type: 'website',
  },
  twitter: {
    title: 'Document Automation — Pharmacy Document Generation at Scale',
    description: '90% reduction in document assembly time. Template-driven generation, e-signature workflows, HIPAA archiving, and full audit trail for LTC pharmacy.',
    card: 'summary_large_image',
  },
}

export default function Page() {
  return (
    <>
      <JsonLd data={[organizationSchema, softwareSchema]} />
      <DocumentAutomationContent />
    </>
  )
}
