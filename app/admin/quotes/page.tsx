import { requireAdmin } from "@/lib/security";
import { prisma } from "@/lib/prisma";
import AdminNav from "@/components/AdminNav";
import QuotesManager from "@/components/admin/QuotesManager";

export const dynamic = "force-dynamic";

export default async function QuotesAdmin() {
  await requireAdmin();
  const quotes = await prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <section className="admin-shell">
      <AdminNav active="/admin/quotes" />
      <QuotesManager quotes={quotes as any} />
    </section>
  );
}
