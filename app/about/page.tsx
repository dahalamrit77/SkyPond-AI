import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema } from '@/components/seo/schemas/organization'
import { AboutContent } from './_content'

export const metadata: Metadata = {
  title: 'About SkyPond Tech — LTC Pharmacy IT Specialists',
  description:
    'SkyPond Tech was built from nearly a decade inside LTC pharmacy. Learn our story, mission, and why we serve exclusively long-term care pharmacies and facilities.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title:       'About SkyPond Tech — LTC Pharmacy IT Specialists',
    description: 'Nearly a decade inside LTC pharmacy. Built to fill the gap nobody else was filling.',
    url:         `${SITE_URL}/about`,
    type:        'website',
  },
  twitter: {
    title:       'About SkyPond Tech — LTC Pharmacy IT Specialists',
    description: 'Nearly a decade inside LTC pharmacy. Built to fill the gap nobody else was filling.',
    card:        'summary_large_image',
  },
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <AboutContent />
    </>
  )
}
