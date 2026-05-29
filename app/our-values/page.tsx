import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema } from '@/components/seo/schemas/organization'
import { OurValuesContent } from './_content'

export const metadata: Metadata = {
  title: 'Our Values — SkyPond Tech',
  description:
    'The six principles behind every engagement at SkyPond Tech — innovation, integrity, excellence, human-centered tech, customer focus, and collaboration.',
  alternates: { canonical: `${SITE_URL}/our-values` },
  openGraph: {
    title:       'Our Values — SkyPond Tech',
    description: 'Six values. Not slogans — the decisions we make every day.',
    url:         `${SITE_URL}/our-values`,
    type:        'website',
  },
  twitter: {
    title:       'Our Values — SkyPond Tech',
    description: 'Six values. Not slogans — the decisions we make every day.',
    card:        'summary_large_image',
  },
}

export default function OurValuesPage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <OurValuesContent />
    </>
  )
}
