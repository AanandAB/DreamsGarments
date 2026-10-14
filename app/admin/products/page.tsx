import { requireAdmin } from "@/lib/security";
import { prisma } from "@/lib/prisma";
import AdminNav from "@/components/AdminNav";
import ProductsManager from "@/components/admin/ProductsManager";

export const dynamic = "force-dynamic";

export default async function ProductsAdmin() {
  await requireAdmin();
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: { category: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <section className="admin-shell">
      <AdminNav active="/admin/products" />
      {/* Prisma's Json/Date types are serialized to plain values at this boundary. */}
      <ProductsManager products={products as any} categories={categories as any} />
    </section>
  );
}
