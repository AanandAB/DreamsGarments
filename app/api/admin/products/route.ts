import { NextResponse } from "next/server";
import { z } from "zod";
import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { safeText, slugify } from "@/lib/format";
import { requireAdminApi } from "@/lib/security";

export const runtime = "nodejs";

// Prices arrive in paise (₹1 = 100). pricePaise null = made-to-order / bulk pricing only.
const schema = z.object({
  name: z.string().trim().min(1).max(120),
  description: z.string().max(2000).optional().default(""),
  sku: z.string().trim().max(50).optional().default(""),
  categoryId: z.string().nullable().optional(),
  imageUrl: z.string().max(500).optional().default(""),
  images: z.array(z.string().max(500)).max(8).optional(),
  pricePaise: z.number().int().min(0).nullable().optional(),
  compareAtPaise: z.number().int().min(0).nullable().optional(),
  minOrderQty: z.number().int().min(1).max(1000000).optional().default(1),
  stockQty: z.number().int().min(0).optional().default(0),
  bulkOrder: z.boolean().optional().default(false),
  active: z.boolean().optional().default(true),
  featured: z.boolean().optional().default(false),
});

export async function POST(req: Request) {
  const session = await requireAdminApi();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Please check the product details." }, { status: 400 });
    const d = parsed.data;

    // Slug from name; append a short random suffix on collision so it stays unique.
    const base = slugify(d.name);
    const clash = await prisma.product.findUnique({ where: { slug: base } });
    const slug = clash ? `${base}-${randomBytes(2).toString("hex")}` : base;

    const product = await prisma.product.create({
      data: {
        name: safeText(d.name, 120),
        slug,
        description: safeText(d.description, 2000),
        sku: safeText(d.sku, 50) || null,
        categoryId: d.categoryId || null,
        imageUrl: safeText(d.imageUrl, 500) || null,
        images: d.images ?? undefined,
        pricePaise: d.pricePaise ?? null,
        compareAtPaise: d.compareAtPaise ?? null,
        minOrderQty: d.minOrderQty,
        stockQty: d.stockQty,
        bulkOrder: d.bulkOrder,
        active: d.active,
        featured: d.featured,
      },
    });
    return NextResponse.json({ ok: true, id: product.id }, { status: 201 });
  } catch (e) {
    console.error("Product create error", e);
    return NextResponse.json({ error: "Couldn't save the product." }, { status: 500 });
  }
}
