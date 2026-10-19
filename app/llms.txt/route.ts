import { site } from "@/lib/seo";

// Serves /llms.txt — a plain-text guide that helps AI crawlers (GPTBot,
// ClaudeBot, PerplexityBot, etc.) understand the site's structure and facts.

export const runtime = "nodejs";

export function GET() {
  const body = `# ${site.name}

> ${site.description}

${site.name} is operated by ${site.legalName} in ${site.address.locality}, ${site.address.region}, India. We manufacture and supply flags, toranams (marigold garlands), festoons, volunteer wear, bags and custom event merchandise — retail or bulk/custom orders with a minimum order quantity (MOQ).

## Key facts

- Location: ${site.address.locality}, ${site.address.region}, India
- Phone: ${site.phone}
- Email: ${site.email}
- Products: flags, toranams & festoons, volunteer wear, bags, gifts & mementos
- Custom and bulk orders accepted, with MOQ and quantity-based pricing

## Pages

- [Home](${site.url}/): company overview and product categories
- [Shop](${site.url}/shop): product catalogue with prices and MOQ
- [Bulk & custom quote](${site.url}/bulk-quote): request a quote for bulk/custom orders
- [Privacy Policy](${site.url}/privacy)
- [Terms & Conditions](${site.url}/terms)
- [Refund & Cancellation Policy](${site.url}/refund)
- [Shipping & Delivery Policy](${site.url}/shipping)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
