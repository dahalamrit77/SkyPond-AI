import type { WithContext, BreadcrumbList } from 'schema-dts'
import { SITE_URL } from '@/lib/constants'

export interface BreadcrumbItem {
  label: string
  href?:  string
}

/**
 * BreadcrumbList schema builder.
 * Pass the same `items` array used by the visual <Breadcrumb> component.
 * https://schema.org/BreadcrumbList
 */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type':   'ListItem',
      position:  i + 1,
      name:      item.label,
      item:      item.href ? `${SITE_URL}${item.href}` : undefined,
    })),
  }
}
