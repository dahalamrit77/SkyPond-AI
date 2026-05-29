import type { Metadata } from 'next'
import { ServicesIndexContent } from './_content'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema } from '@/components/seo/schemas/organization'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'LTC Pharmacy IT Services — AI Automation, Analytics, Microsoft Cloud & More',
  description: 'Six specialized IT services for long-term care pharmacy: LTC Pharmacy IT, AI Automation, Data Analytics & Power BI, Custom Development, Microsoft Cloud, and PointClickCare Integration.',
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: 'SkyPond Tech Services — Full-Service LTC Pharmacy Technology',
    description: 'Six specialized services for LTC pharmacy. No generalist IT. No retrofitted solutions.',
    url: `${SITE_URL}/services`,
    type: 'website',
  },
  twitter: {
    title: 'SkyPond Tech Services — Full-Service LTC Pharmacy Technology',
    description: 'Six specialized services for LTC pharmacy. No generalist IT. No retrofitted solutions.',
    card: 'summary_large_image',
  },
}

export default function Page() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <ServicesIndexContent />
    </>
  )
}
