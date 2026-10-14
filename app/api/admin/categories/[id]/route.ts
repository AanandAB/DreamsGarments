import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { safeText } from "@/lib/format";
import { requireAdminApi } from "@/lib/security";

export const runtime = "nodejs";

const patchSchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  description: z.string().max(500).nullable().optional(),
  imageUrl: z.string().max(500).nullable().optional(),
  active: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
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
    if (!parsed.success) return NextResponse.json({ error: "Please check the category details." }, { status: 400 });
    const d = parsed.data;

    const data: Record<string, unknown> = {};
    if (d.name !== undefined) data.name = safeText(d.name, 100);
    if (d.description !== undefined) data.description = d.description;
    if (d.imageUrl !== undefined) data.imageUrl = d.imageUrl;
    if (d.active !== undefined) data.active = d.active;
    if (d.sortOrder !== undefined) data.sortOrder = d.sortOrder;

    await prisma.category.update({ where: { id }, data });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Category update error", e);
    return NextResponse.json({ error: "Couldn't update the category." }, { status: 500 });
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
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Category delete error", e);
    return NextResponse.json({ error: "Couldn't delete the category." }, { status: 500 });
  }
}
