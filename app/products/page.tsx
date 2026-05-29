import type { Metadata } from 'next'
import { ProductsIndexContent } from './_content'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema } from '@/components/seo/schemas/organization'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'LTC Pharmacy Products — DEA Compliance, CS Inventory, Analytics & More',
  description: 'Five purpose-built LTC pharmacy technology products: DEA Compliance Reporting, Controlled Substance Inventory, LTC Analytics, PointClickCare Feed, and Document Automation.',
  alternates: {
    canonical: `${SITE_URL}/products`,
  },
  openGraph: {
    title: 'SkyPond Tech Product Suite — LTC Pharmacy Technology',
    description: 'Six products purpose-built for LTC pharmacy: DEA compliance, CS inventory, analytics, PointClickCare integration, and more.',
    url: `${SITE_URL}/products`,
    type: 'website',
  },
  twitter: {
    title: 'SkyPond Tech Product Suite — LTC Pharmacy Technology',
    description: 'Six products purpose-built for LTC pharmacy: DEA compliance, CS inventory, analytics, PointClickCare integration, and more.',
    card: 'summary_large_image',
  },
}

export default function Page() {
  return (
    <>
      <JsonLd data={[organizationSchema]} />
      <ProductsIndexContent />
    </>
  )
}
