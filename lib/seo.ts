import { faqs } from "./faq";

// Central SEO/GEO configuration + Schema.org JSON-LD builders.
// ⚠️ Set NEXT_PUBLIC_SITE_URL to the real HTTPS domain before launch —
// every `@id`, `url` and `logo` below derives from it. Geo coords are
// approximate for Kuthuparamba; confirm the exact location.

const url = process.env.NEXT_PUBLIC_SITE_URL || "https://dreamsgarments.in";

export const site = {
  name: "Dreams Garments Flag Centre",
  legalName: "The Kuthuparamba Garments Making Society",
  url,
  description:
    "Flags, toranams, volunteer uniforms and custom event merchandise made in Kuthuparamba, Kannur, Kerala. Shop retail or request a bulk quote.",
  phone: "+918547008888",
  email: "admin@dreamsgarments.in",
  address: {
    locality: "Kuthuparamba",
    region: "Kerala",
    postalCode: "670643",
    country: "IN",
  },
  geo: { latitude: 11.83, longitude: 75.58 },
  logo: "/brand/logo.png",
};

const postalAddress = {
  "@type": "PostalAddress",
  addressLocality: site.address.locality,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url,
    logo: `${url}${site.logo}`,
    email: site.email,
    telephone: site.phone,
    address: postalAddress,
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}/#localbusiness`,
    name: site.name,
    image: `${url}${site.logo}`,
    url,
    telephone: site.phone,
    email: site.email,
    priceRange: "₹₹",
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    url,
    name: site.name,
    description: site.description,
  };
}

export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function productListJsonLd(products: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => {
      const item: Record<string, unknown> = {
        "@type": "Product",
        name: p.name,
        description: p.description,
      };
      if (p.imageUrl) {
        item.image = p.imageUrl.startsWith("http") ? p.imageUrl : `${url}${p.imageUrl}`;
      }
      if (p.pricePaise != null) {
        item.offers = {
          "@type": "Offer",
          priceCurrency: "INR",
          price: (p.pricePaise / 100).toFixed(2),
          availability: "https://schema.org/InStock",
        };
      }
      return { "@type": "ListItem", position: i + 1, item };
    }),
  };
}
