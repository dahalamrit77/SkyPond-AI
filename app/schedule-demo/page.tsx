import type { Metadata } from 'next'
import { ScheduleDemoContent } from './_content'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema } from '@/components/seo/schemas/organization'
import { buildServiceSchema } from '@/components/seo/schemas/service'
import { SITE_URL } from '@/lib/constants'

const serviceSchema = buildServiceSchema({
  name: 'LTC Pharmacy Technology Consultation',
  description: '30-minute discovery call with SkyPond Tech LTC pharmacy IT specialists. No pitch deck — just a straight conversation about your setup and how to fix it.',
  url: `${SITE_URL}/schedule-demo`,
  serviceType:   'LTC Pharmacy Technology Consultation',
  datePublished: '2025-10-01',
  dateModified:  '2026-05-29',
})

export const metadata: Metadata = {
  title: 'Schedule a Demo — SkyPond Tech LTC Pharmacy Technology',
  description:
    '30 minutes. No pitch deck. Talk to an LTC pharmacy IT specialist about your DEA compliance, CS inventory, PointClickCare integration, or analytics challenges.',
  alternates: {
    canonical: `${SITE_URL}/schedule-demo`,
  },
  openGraph: {
    title: 'Schedule a Demo — SkyPond Tech',
    description:
      '30 minutes. No pitch deck. Talk to an LTC pharmacy IT specialist about your specific situation.',
    url: `${SITE_URL}/schedule-demo`,
    type: 'website',
  },
  twitter: {
    title: 'Schedule a Demo — SkyPond Tech',
    description:
      '30 minutes. No pitch deck. LTC pharmacy IT specialists ready to talk through your setup.',
    card: 'summary_large_image',
  },
}

export default function ScheduleDemoPage() {
  return (
    <>
      <JsonLd data={[organizationSchema, serviceSchema]} />
      <ScheduleDemoContent />
    </>
  )
}
