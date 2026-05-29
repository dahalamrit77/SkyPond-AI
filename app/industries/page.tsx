import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema } from '@/components/seo/schemas/organization'
import { IndustriesContent } from './_content'

export const metadata: Metadata = {
  title: 'Industries We Serve — LTC Pharmacy, Long-Term Care & Beyond',
  description:
    'SkyPond Tech serves LTC pharmacies and long-term care facilities as our core focus, with analytics and custom development capabilities extending to financial services and retail.',
  alternates: { canonical: `${SITE_URL}/industries` },
  openGraph: {
    title:       'Industries We Serve — SkyPond Tech',
    description: 'Deep expertise in LTC pharmacy and long-term care. Analytics and development capabilities beyond it.',
    url:         `${SITE_URL}/industries`,
    type:        'website',
  },
  twitter: {
    title:       'Industries We Serve — SkyPond Tech',
    description: 'Deep expertise in LTC pharmacy and long-term care. Analytics and development capabilities beyond it.',
    card:        'summary_large_image',
  },
}

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <IndustriesContent />
    </>
  )
}
