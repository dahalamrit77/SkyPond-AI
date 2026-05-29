import type { Metadata } from 'next'
import { PrivacyPolicyContent } from './_content'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema } from '@/components/seo/schemas/organization'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy — SkyPond Tech',
  description:
    'How SkyPond Tech collects, uses, stores, and protects your information when you use our website and services. HIPAA-compliant data handling for LTC pharmacy technology.',
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
  openGraph: {
    title: 'Privacy Policy — SkyPond Tech',
    description:
      'How SkyPond Tech collects, uses, stores, and protects your information when you use our website and services.',
    url: `${SITE_URL}/privacy-policy`,
    type: 'website',
  },
  twitter: {
    title: 'Privacy Policy — SkyPond Tech',
    description: 'How SkyPond Tech collects, uses, stores, and protects your information.',
    card: 'summary',
  },
  robots: {
    index: false,   // Privacy policy pages are conventionally noindexed
    follow: true,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <PrivacyPolicyContent />
    </>
  )
}
