import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Seed a realistic starting catalogue for a Kerala flag/garments shop.
 * Prices are in paise (₹1 = 100); `pricePaise: null` means "made to order /
 * bulk pricing only". `bulkOrder` marks products sold in bulk with an MOQ.
 * Re-running is idempotent (upsert by slug).
 */

const categories = [
  { name: "Flags", uniqueSlug: "flags", sortOrder: 1 },
  { name: "Toranams & Festoons", uniqueSlug: "toranams", sortOrder: 2 },
  { name: "Volunteer Wear", uniqueSlug: "volunteer-wear", sortOrder: 3 },
  { name: "Bags", uniqueSlug: "bags", sortOrder: 4 },
  { name: "Gifts & Mementos", uniqueSlug: "mementos", sortOrder: 5 },
];

// slug, name, category, pricePaise, compareAtPaise, moq, bulkOrder, stock, featured, image, sku, desc
type ProductSeed = [string, string, string, number | null, number | null, number, boolean, number, boolean, string, string, string];

const products: ProductSeed[] = [
  ["national-flag-cloth", "National Flag (Cloth, 2×3 ft)", "flags", 8000, null, 1, false, 50, true, "/images/flag1.jpeg", "DG-FLAG-001", "Stitched tricolour in durable cloth for homes, offices and events. Confirm pole/hoist size when ordering."],
  ["hand-flag-paper", "Hand Flag (Paper, 12×18 in)", "flags", 2500, null, 100, true, 0, false, "/images/flag1.jpeg", "DG-FLAG-002", "Lightweight printed paper flags on sticks — ideal for rallies, campaigns and school events. Bulk pricing applies."],
  ["custom-event-flag", "Custom Event Flag (Printed)", "flags", null, null, 10, true, 0, true, "/images/flag1.jpeg", "DG-FLAG-003", "Made-to-order flags with your logo, colours or artwork. Ask us about sizing and quantity pricing."],
  ["marigold-toranam", "Marigold Toranam (Artificial)", "toranams", 12000, 15000, 1, false, 30, true, "/images/toranams.webp", "DG-TOR-001", "Traditional yellow-orange marigold garland for doorways, stages and festivals. Approx 6 ft length."],
  ["festoon-bunting-10m", "Festoon / Bunting (10 m)", "toranams", 18000, null, 5, true, 0, false, "/images/toranams.webp", "DG-TOR-002", "Colourful fabric bunting string for streets, halls and celebrations. Custom colour combinations available."],
  ["volunteer-cap", "Volunteer Cap (Printed)", "volunteer-wear", 6000, null, 20, true, 0, false, "/images/Uniform.jpeg", "DG-VW-001", "Cotton caps with your event or organisation print. Bulk pricing from 20 pieces."],
  ["volunteer-vest", "Volunteer Vest (Printed)", "volunteer-wear", 22000, null, 10, true, 0, true, "/images/Uniform2.jpeg", "DG-VW-002", "Reflective or coloured vests with custom print — made to order for events and campaigns."],
  ["event-tshirt", "Event T-shirt (Custom Print)", "volunteer-wear", 25000, null, 20, true, 0, false, "/images/Uniform.jpeg", "DG-VW-003", "Round-neck tees with single or multi-colour print. Sizes S–XXL; quantity pricing applies."],
  ["cloth-bag-printed", "Cloth Bag (Custom Print)", "bags", 9000, null, 25, true, 0, false, "/images/volunteer-wear.webp", "DG-BAG-001", "Reusable cloth carry bags with your print — a practical giveaway for events and stores."],
  ["keychain-custom", "Keychain (Custom)", "mementos", 4000, null, 50, true, 0, false, "/images/mementos.webp", "DG-MEM-001", "Custom keychains as event keepsakes or giveaways. Bulk pricing from 50 pieces."],
  ["wooden-clock", "Wooden Clock (Memento)", "mementos", 35000, null, 1, false, 10, true, "/images/mementos.webp", "DG-MEM-002", "Engraved wooden wall clock — a lasting memento for inaugurations and honours."],
  ["certificate-frame", "Certificate Frame / Memento", "mementos", 45000, null, 1, false, 5, false, "/images/mementos.webp", "DG-MEM-003", "Wooden frame for certificates, awards and mementos. Custom engraving available."],
];

async function main() {
  const catIds: Record<string, string> = {};
  for (const c of categories) {
    const cat = await prisma.category.upsert({
      where: { uniqueSlug: c.uniqueSlug },
      update: { name: c.name, sortOrder: c.sortOrder },
      create: c,
    });
    catIds[c.uniqueSlug] = cat.id;
  }

  for (const [slug, name, category, pricePaise, compareAtPaise, moq, bulkOrder, stock, featured, image, sku, desc] of products) {
    const data = {
      name,
      description: desc,
      sku,
      categoryId: catIds[category],
      pricePaise,
      compareAtPaise,
      minOrderQty: moq,
      stockQty: stock,
      bulkOrder,
      active: true,
      featured,
      imageUrl: image,
    };
    await prisma.product.upsert({ where: { slug }, update: data, create: { slug, ...data } });
  }

  console.log(`Seeded ${categories.length} categories and ${products.length} products.`);
}

main().finally(() => prisma.$disconnect());
