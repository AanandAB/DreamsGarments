import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { safeText, slugify } from "@/lib/format";
import { requireAdminApi } from "@/lib/security";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  description: z.string().max(500).optional().default(""),
  imageUrl: z.string().max(500).optional().default(""),
  active: z.boolean().optional().default(true),
  sortOrder: z.number().int().min(0).optional().default(0),
});

export async function POST(req: Request) {
  const session = await requireAdminApi();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Please check the category details." }, { status: 400 });
    const d = parsed.data;
    const slug = slugify(d.name);
    const clash = await prisma.category.findUnique({ where: { uniqueSlug: slug } });
    const category = await prisma.category.create({
      data: {
        name: safeText(d.name, 100),
        uniqueSlug: clash ? `${slug}-${Date.now()}` : slug,
        description: safeText(d.description, 500) || null,
        imageUrl: safeText(d.imageUrl, 500) || null,
        active: d.active,
        sortOrder: d.sortOrder,
      },
    });
    return NextResponse.json({ ok: true, id: category.id }, { status: 201 });
  } catch (e) {
    console.error("Category create error", e);
    return NextResponse.json({ error: "Couldn't save the category." }, { status: 500 });
  }
}
