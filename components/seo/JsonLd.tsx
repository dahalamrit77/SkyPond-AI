import type { Thing, WithContext } from 'schema-dts'

interface JsonLdProps {
  data: WithContext<Thing> | WithContext<Thing>[]
}

/**
 * Injects one or more JSON-LD <script> blocks into the page <head>
 * (or inline when used inside a Server Component body).
 *
 * Usage:
 *   <JsonLd data={organizationSchema} />
 *   <JsonLd data={[softwareSchema, breadcrumbSchema]} />
 */
export function JsonLd({ data }: JsonLdProps) {
  const schemas = Array.isArray(data) ? data : [data]

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
