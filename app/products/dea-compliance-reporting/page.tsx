import type { Metadata } from 'next'
import { DeaComplianceContent } from './_content'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema } from '@/components/seo/schemas/organization'
import { buildSoftwareSchema } from '@/components/seo/schemas/software'
import { SITE_URL } from '@/lib/constants'

const softwareSchema = buildSoftwareSchema({
  name: 'SkyPond Tech DEA Compliance Reporting',
  description: 'Automated DEA compliance reporting for LTC pharmacy — ARCOS, CSOS, and Form 222 workflows with multi-site rollup and zero missed deadlines.',
  url: `${SITE_URL}/products/dea-compliance-reporting`,
  price:         'Contact for pricing',
  datePublished: '2025-10-01',
  dateModified:  '2026-05-29',
})

export const metadata: Metadata = {
  title: 'DEA Compliance Reporting — Automated ARCOS, CSOS & Form 222 for LTC Pharmacy',
  description: 'Automate DEA compliance reporting: ARCOS submissions, CSOS electronic orders, DEA Form 222 tracking, and multi-site rollup — eliminating manual filing risk.',
  alternates: {
    canonical: `${SITE_URL}/products/dea-compliance-reporting`,
  },
  openGraph: {
    title: 'DEA Compliance Reporting — Automated Filing for LTC Pharmacy',
    description: 'Automate ARCOS, CSOS, and DEA Form 222 workflows. 80% reduction in manual reporting time with zero missed filing deadlines.',
    url: `${SITE_URL}/products/dea-compliance-reporting`,
    type: 'website',
  },
  twitter: {
    title: 'DEA Compliance Reporting — Automated Filing for LTC Pharmacy',
    description: 'Automate ARCOS, CSOS, and DEA Form 222 workflows. 80% reduction in manual reporting time with zero missed filing deadlines.',
    card: 'summary_large_image',
  },
}

export default function Page() {
  return (
    <>
      <JsonLd data={[organizationSchema, softwareSchema]} />
      <DeaComplianceContent />
    </>
  )
}
