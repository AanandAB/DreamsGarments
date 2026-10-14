import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { safeText } from "@/lib/format";
import { requireAdminApi } from "@/lib/security";

export const runtime = "nodejs";

const QuoteStatus = ["NEW", "REVIEWING", "QUOTED", "APPROVED", "CONVERTED", "DECLINED"] as const;

const patchSchema = z.object({
  status: z.enum(QuoteStatus).optional(),
  quotedTotalPaise: z.number().int().min(0).nullable().optional(),
  adminNotes: z.string().max(2000).nullable().optional(),
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
    if (!parsed.success) return NextResponse.json({ error: "Please check the quote details." }, { status: 400 });
    const d = parsed.data;

    const data: Record<string, unknown> = {};
    if (d.status !== undefined) data.status = d.status;
    if (d.quotedTotalPaise !== undefined) data.quotedTotalPaise = d.quotedTotalPaise;
    if (d.adminNotes !== undefined) data.adminNotes = d.adminNotes ? safeText(d.adminNotes, 2000) : null;

    await prisma.quoteRequest.update({ where: { id }, data });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Quote update error", e);
    return NextResponse.json({ error: "Couldn't update the quote." }, { status: 500 });
  }
}
