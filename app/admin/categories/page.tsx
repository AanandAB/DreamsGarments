import { requireAdmin } from "@/lib/security";
import { prisma } from "@/lib/prisma";
import AdminNav from "@/components/AdminNav";
import CategoriesManager from "@/components/admin/CategoriesManager";

export const dynamic = "force-dynamic";

export default async function CategoriesAdmin() {
  await requireAdmin();
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <section className="admin-shell">
      <AdminNav active="/admin/categories" />
      <CategoriesManager categories={categories as any} />
    </section>
  );
}
