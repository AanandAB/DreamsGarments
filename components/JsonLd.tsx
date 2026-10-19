/**
 * Renders a Schema.org JSON-LD block. Server-component safe; pass any
 * object and it is serialized into a <script type="application/ld+json">.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
