import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { inr } from "@/lib/format";
import JsonLd from "@/components/JsonLd";
import { productListJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Flags, Toranams & Custom Merchandise",
  description:
    "Browse flags, toranams, volunteer wear, bags and custom event merchandise made in Kannur, Kerala — with prices, bulk MOQ and instant quotes.",
  alternates: { canonical: "/shop" },
};

// Fallback shown only if the database isn't reachable yet.
const fallback = [
  { id: "f1", name: "Everyday Country Flag", slug: "country-flag", description: "A versatile flag for everyday displays and events.", pricePaise: 8000, imageUrl: "/images/flags.webp", category: { name: "Flags" }, bulkOrder: false, minOrderQty: 1, compareAtPaise: null },
  { id: "f2", name: "Event Festoons", slug: "event-festoons", description: "Colourful decorative festoons for celebrations.", pricePaise: 18000, imageUrl: "/images/toranams.webp", category: { name: "Toranams" }, bulkOrder: true, minOrderQty: 5, compareAtPaise: null },
  { id: "f3", name: "Custom Volunteer Wear", slug: "volunteer-wear", description: "Event uniforms made for your team.", pricePaise: null, imageUrl: "/images/volunteer-wear.webp", category: { name: "Volunteer wear" }, bulkOrder: true, minOrderQty: 10, compareAtPaise: null },
  { id: "f4", name: "Event Keepsake Gift", slug: "event-keepsake", description: "A thoughtful memento for a meaningful occasion.", pricePaise: null, imageUrl: "/images/mementos.webp", category: { name: "Mementos" }, bulkOrder: true, minOrderQty: 50, compareAtPaise: null },
];

export default async function Shop() {
  let products: any[] = fallback;
  try {
    const rows = await prisma.product.findMany({
      where: { active: true },
      include: { category: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
    if (rows.length) products = rows;
  } catch {}

  return (
    <>
      <JsonLd data={productListJsonLd(products)} />
      <section className="page-shell">
        <div className="page-intro">
        <span className="eyebrow">THE COLLECTION / 01</span>
        <h1>
          Made for your
          <br />
          <em>kind of gathering.</em>
        </h1>
        <p>From everyday flags to custom-made event essentials. Browse the collection or talk to us about a bigger order.</p>
        <Link className="button button-red" href="/bulk-quote">
          Need 50+ pieces? Get a quote <ArrowUpRight size={17} />
        </Link>
      </div>

      <div className="shop-toolbar">
        <span>{products.length} products</span>
        <span><SlidersHorizontal size={15} /> Thoughtfully made in Kerala</span>
      </div>

      <div className="shop-grid">
        {products.map((p: any) => {
          const bulk = Boolean(p.bulkOrder);
          const badge = bulk ? "BULK ORDER" : p.pricePaise != null ? "READY TO ORDER" : "MADE TO ORDER";
          return (
            <article key={p.id} className="product-card">
              <Link href={`/bulk-quote?product=${encodeURIComponent(p.name)}`} className="product-photo">
                <Image src={p.imageUrl || "/images/flags.webp"} alt={p.name} fill sizes="(max-width:700px) 50vw, 33vw" />
                <span className="product-badge">{badge}</span>
                <span className="product-quick">Enquire <ArrowUpRight size={16} /></span>
              </Link>
              <div className="product-info">
                <span className="product-category">{p.category?.name || "Dreams collection"}</span>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <div className="product-price">
                  {p.pricePaise != null ? (
                    <span>
                      {inr(p.pricePaise)}
                      {p.compareAtPaise != null && <s className="product-was">{inr(p.compareAtPaise)}</s>}
                    </span>
                  ) : (
                    <span>{bulk ? "Bulk pricing" : "Request pricing"}</span>
                  )}
                  <Link href={`/bulk-quote?product=${encodeURIComponent(p.name)}`} aria-label={`Enquire about ${p.name}`}>
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
                {p.minOrderQty > 1 && <small className="product-moq">Min order: {p.minOrderQty} pieces</small>}
              </div>
            </article>
          );
        })}
      </div>

      <div className="shop-bottom">
        <span>Need a custom size, print or quantity?</span>
        <Link className="text-link" href="/bulk-quote">Start a custom order <ArrowUpRight size={16} /></Link>
      </div>
      </section>
    </>
  );
}
