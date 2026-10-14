import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { safeText } from "@/lib/format";
import { requireAdminApi } from "@/lib/security";

export const runtime = "nodejs";

// Every field optional — PATCH applies only what's sent.
const patchSchema = z.object({
  name: z.string().trim().min(1).max(120).optional(),
  description: z.string().max(2000).optional(),
  sku: z.string().trim().max(50).nullable().optional(),
  categoryId: z.string().nullable().optional(),
  imageUrl: z.string().max(500).nullable().optional(),
  images: z.array(z.string().max(500)).max(8).nullable().optional(),
  pricePaise: z.number().int().min(0).nullable().optional(),
  compareAtPaise: z.number().int().min(0).nullable().optional(),
  minOrderQty: z.number().int().min(1).max(1000000).optional(),
  stockQty: z.number().int().min(0).optional(),
  bulkOrder: z.boolean().optional(),
  active: z.boolean().optional(),
  featured: z.boolean().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminApi();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Please check the product details." }, { status: 400 });
    const d = parsed.data;

    const data: Record<string, unknown> = {};
    if (d.name !== undefined) data.name = safeText(d.name, 120);
    if (d.description !== undefined) data.description = safeText(d.description, 2000);
    if (d.sku !== undefined) data.sku = d.sku ? safeText(d.sku, 50) : null;
    if (d.categoryId !== undefined) data.categoryId = d.categoryId || null;
    if (d.imageUrl !== undefined) data.imageUrl = d.imageUrl || null;
    if (d.images !== undefined) data.images = d.images;
    if (d.pricePaise !== undefined) data.pricePaise = d.pricePaise;
    if (d.compareAtPaise !== undefined) data.compareAtPaise = d.compareAtPaise;
    if (d.minOrderQty !== undefined) data.minOrderQty = d.minOrderQty;
    if (d.stockQty !== undefined) data.stockQty = d.stockQty;
    if (d.bulkOrder !== undefined) data.bulkOrder = d.bulkOrder;
    if (d.active !== undefined) data.active = d.active;
    if (d.featured !== undefined) data.featured = d.featured;

    await prisma.product.update({ where: { id }, data });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Product update error", e);
    return NextResponse.json({ error: "Couldn't update the product." }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminApi();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Product delete error", e);
    return NextResponse.json({ error: "Couldn't delete the product." }, { status: 500 });
  }
}
