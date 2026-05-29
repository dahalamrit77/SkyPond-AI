import type { Metadata } from 'next'
import { CustomDevelopmentContent } from './_content'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema } from '@/components/seo/schemas/organization'
import { buildServiceSchema } from '@/components/seo/schemas/service'
import { SITE_URL } from '@/lib/constants'

const serviceSchema = buildServiceSchema({
  name: 'Custom Software Development for LTC Pharmacy',
  description: 'Full-stack application development for long-term care pharmacy — custom tools, system integrations, and HIPAA-compliant builds using React, Node.js, and Azure.',
  url: `${SITE_URL}/services/custom-development`,
  serviceType:   'Custom Software Development',
  datePublished: '2025-10-01',
  dateModified:  '2026-05-29',
})

export const metadata: Metadata = {
  title: 'Custom Software Development for LTC Pharmacy — React, Node.js & Azure',
  description: 'Full-stack custom applications, internal tools, and system integrations built specifically for LTC pharmacy workflows — React, Node.js, and Azure with HIPAA compliance built in.',
  alternates: {
    canonical: `${SITE_URL}/services/custom-development`,
  },
  openGraph: {
    title: 'Custom Development for LTC Pharmacy',
    description: 'Full-stack applications built around your LTC pharmacy workflows. React, Node.js, Azure. HIPAA-compliant builds with LTC domain expertise from day one.',
    url: `${SITE_URL}/services/custom-development`,
    type: 'website',
  },
  twitter: {
    title: 'Custom Development for LTC Pharmacy',
    description: 'Full-stack applications built around your LTC pharmacy workflows. React, Node.js, Azure. HIPAA-compliant builds with LTC domain expertise from day one.',
    card: 'summary_large_image',
  },
}

export default function Page() {
  return (
    <>
      <JsonLd data={[organizationSchema, serviceSchema]} />
      <CustomDevelopmentContent />
    </>
  )
}
