import Link from "next/link";
import { requireAdmin, sessionCookie } from "@/lib/security";
import { prisma } from "@/lib/prisma";
import { inr } from "@/lib/format";
import { ArrowUpRight, Package, Inbox, Boxes, LogOut, Plus, Tags, ClipboardList } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminNav from "@/components/AdminNav";

export const dynamic = "force-dynamic";

async function logout() {
  "use server";
  const c = await cookies();
  c.delete(sessionCookie);
  redirect("/admin/login");
}

export default async function Admin() {
  const session = await requireAdmin();

  let quotes: any[] = [];
  let products = 0;
  let orders = 0;
  let revenue = 0;
  try {
    [quotes, products, orders] = await Promise.all([
      prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
      prisma.product.count({ where: { active: true } }),
      prisma.order.count(),
    ]);
    const agg = await prisma.order.aggregate({ where: { paymentStatus: "PAID" }, _sum: { totalPaise: true } });
    revenue = agg._sum.totalPaise || 0;
  } catch {}

  return (
    <section className="admin-shell">
      <div className="admin-top">
        <div>
          <span className="eyebrow">DREAMS GARMENTS / CONTROL ROOM</span>
          <h1>
            Good morning, <em>team.</em>
          </h1>
          <p>Signed in as {session.email}.</p>
        </div>
        <form action={logout}>
          <button className="button button-outline">
            <LogOut size={15} /> Sign out
          </button>
        </form>
      </div>

      <AdminNav active="/admin" />

      <div className="admin-stats">
        <div><span><ClipboardList size={18} /> ALL ORDERS</span><strong>{orders}</strong><small>Retail &amp; custom orders</small></div>
        <div><span><Boxes size={18} /> ACTIVE PRODUCTS</span><strong>{products}</strong><small>Live in the storefront</small></div>
        <div><span><Package size={18} /> PAID REVENUE</span><strong>{inr(revenue)}</strong><small>Confirmed paid orders</small></div>
        <div><span><Inbox size={18} /> OPEN QUOTES</span><strong>{quotes.filter((q) => ["NEW", "REVIEWING", "QUOTED"].includes(q.status)).length}</strong><small>Awaiting next action</small></div>
      </div>

      <div className="admin-quick">
        <Link href="/admin/products" className="admin-quick-card"><Plus size={18} /><span><strong>Add a product</strong><small>Name, price, MOQ, images</small></span></Link>
        <Link href="/admin/quotes" className="admin-quick-card"><Inbox size={18} /><span><strong>Review quotes</strong><small>Reply, price, convert</small></span></Link>
        <Link href="/admin/categories" className="admin-quick-card"><Tags size={18} /><span><strong>Categories</strong><small>Organise the catalogue</small></span></Link>
      </div>

      <div className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <span className="eyebrow">CUSTOMER ENQUIRIES</span>
            <h2>Latest quote requests</h2>
          </div>
          <Link className="text-link" href="/admin/quotes">View all <ArrowUpRight size={15} /></Link>
        </div>
        {quotes.length ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>REFERENCE</th><th>CUSTOMER</th><th>PRODUCT</th><th>QUANTITY</th><th>STATUS</th><th>RECEIVED</th></tr>
              </thead>
              <tbody>
                {quotes.map((q) => (
                  <tr key={q.id}>
                    <td><strong>{q.reference}</strong></td>
                    <td>{q.name}<small>{q.phone}</small></td>
                    <td>{q.productType}</td>
                    <td>{q.quantity.toLocaleString("en-IN")}</td>
                    <td><span className={`status-pill status-${q.status.toLowerCase()}`}>{q.status}</span></td>
                    <td>{new Date(q.createdAt).toLocaleDateString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="admin-empty">No quote requests yet — new enquiries will appear here.</div>
        )}
      </div>
    </section>
  );
}
