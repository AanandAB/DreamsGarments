"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { inr } from "@/lib/format";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  sku: string | null;
  categoryId: string | null;
  imageUrl: string | null;
  images: string[] | null;
  pricePaise: number | null;
  compareAtPaise: number | null;
  minOrderQty: number;
  stockQty: number;
  bulkOrder: boolean;
  active: boolean;
  featured: boolean;
  category?: { name: string } | null;
};
type Category = { id: string; name: string };

const emptyForm = {
  name: "",
  categoryId: "",
  description: "",
  sku: "",
  price: "",
  compareAt: "",
  minOrderQty: "1",
  stockQty: "0",
  bulkOrder: false,
  active: true,
  featured: false,
  imageUrl: "",
  gallery: "",
};

/**
 * Products CRUD: add / edit / delete with price (₹), compare-at, MOQ,
 * stock, a "bulk / made-to-order" toggle, active/featured flags, a main
 * image and an optional gallery (one URL per line). Prices are entered in
 * rupees and converted to paise for the API.
 */
export default function ProductsManager({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  }

  function openEdit(p: Product) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      categoryId: p.categoryId || "",
      description: p.description || "",
      sku: p.sku || "",
      price: p.pricePaise != null ? String(p.pricePaise / 100) : "",
      compareAt: p.compareAtPaise != null ? String(p.compareAtPaise / 100) : "",
      minOrderQty: String(p.minOrderQty),
      stockQty: String(p.stockQty),
      bulkOrder: p.bulkOrder,
      active: p.active,
      featured: p.featured,
      imageUrl: p.imageUrl || "",
      gallery: (p.images || []).join("\n"),
    });
    setError("");
    setShowForm(true);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const pricePaise = form.price.trim() === "" ? null : Math.round(Number(form.price) * 100);
    const compareAtPaise = form.compareAt.trim() === "" ? null : Math.round(Number(form.compareAt) * 100);
    const payload = {
      name: form.name.trim(),
      description: form.description,
      sku: form.sku.trim(),
      categoryId: form.categoryId || null,
      imageUrl: form.imageUrl.trim(),
      images: form.gallery.split("\n").map((s) => s.trim()).filter(Boolean).slice(0, 8),
      pricePaise,
      compareAtPaise,
      minOrderQty: Math.max(1, Number(form.minOrderQty) || 1),
      stockQty: Math.max(0, Number(form.stockQty) || 0),
      bulkOrder: form.bulkOrder,
      active: form.active,
      featured: form.featured,
    };
    try {
      const res = await fetch(editingId ? `/api/admin/products/${editingId}` : "/api/admin/products", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't save the product.");
      setShowForm(false);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(p: Product) {
    if (!confirm(`Delete "${p.name}"? This can't be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/products/${p.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Couldn't delete the product.");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="admin-crud">
      <div className="admin-crud-head">
        <div>
          <span className="eyebrow">CATALOGUE</span>
          <h2>
            Products <em>({products.length})</em>
          </h2>
        </div>
        <button className="button button-red" onClick={openAdd}>
          <Plus size={16} /> Add product
        </button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={submit}>
          <div className="form-section-label"><span>✦</span> {editingId ? "EDIT PRODUCT" : "NEW PRODUCT"}</div>
          <div className="form-row">
            <label>
              Product name *
              <input required name="name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Custom Event Flag" maxLength={120} />
            </label>
            <label>
              Category
              <select value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)}>
                <option value="">— No category —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-row">
            <label>
              Price (₹)
              <input type="number" min="0" step="0.01" name="price" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="Leave empty for 'on request'" />
            </label>
            <label>
              Compare-at price (₹, optional)
              <input type="number" min="0" step="0.01" name="compareAt" value={form.compareAt} onChange={(e) => set("compareAt", e.target.value)} placeholder="Strike-through price" />
            </label>
          </div>
          <div className="form-row">
            <label>
              Minimum order quantity (MOQ)
              <input type="number" min="1" name="minOrderQty" value={form.minOrderQty} onChange={(e) => set("minOrderQty", e.target.value)} />
            </label>
            <label>
              Stock (0 = made to order)
              <input type="number" min="0" name="stockQty" value={form.stockQty} onChange={(e) => set("stockQty", e.target.value)} />
            </label>
          </div>
          <div className="form-row">
            <label>
              SKU (optional)
              <input name="sku" value={form.sku} onChange={(e) => set("sku", e.target.value)} placeholder="DG-FLAG-001" maxLength={50} />
            </label>
            <label>
              Main image URL
              <input name="imageUrl" value={form.imageUrl} onChange={(e) => set("imageUrl", e.target.value)} placeholder="/images/flags.webp or https://…" maxLength={500} />
            </label>
          </div>
          <label>
            Description
            <textarea name="description" value={form.description} onChange={(e) => set("description", e.target.value)} rows={2} maxLength={2000} placeholder="Material, sizes, what it's used for…" />
          </label>
          <label>
            Gallery (one image URL per line, optional)
            <textarea name="gallery" value={form.gallery} onChange={(e) => set("gallery", e.target.value)} rows={2} placeholder={"https://…\nhttps://…"} />
          </label>
          <div className="admin-toggles">
            <label className="admin-check"><input type="checkbox" checked={form.bulkOrder} onChange={(e) => set("bulkOrder", e.target.checked)} /> Bulk / made-to-order</label>
            <label className="admin-check"><input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} /> Active (visible on shop)</label>
            <label className="admin-check"><input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} /> Featured</label>
          </div>
          {error && <p role="alert" className="form-error">{error}</p>}
          <div className="admin-form-actions">
            <button type="button" className="button button-outline" onClick={() => setShowForm(false)}>Cancel</button>
            <button type="submit" className="button button-red" disabled={busy}>
              {busy ? "Saving…" : editingId ? "Save changes" : "Add product"}
            </button>
          </div>
        </form>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>PRODUCT</th><th>CATEGORY</th><th>PRICE</th><th>MOQ</th><th>TYPE</th><th>STATUS</th><th></th></tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="admin-product-cell">
                    {p.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.imageUrl} alt="" loading="lazy" />
                    )}
                    <div>
                      <strong>{p.name}</strong>
                      <small>{p.sku || p.slug}</small>
                    </div>
                  </div>
                </td>
                <td>{p.category?.name || "—"}</td>
                <td>{p.pricePaise != null ? inr(p.pricePaise) : "On request"}</td>
                <td>{p.minOrderQty}</td>
                <td>{p.bulkOrder ? <span className="status-pill status-reviewing">BULK</span> : <span className="status-pill">RETAIL</span>}</td>
                <td>{p.active ? "Active" : "Hidden"}{p.featured ? " · Featured" : ""}</td>
                <td className="admin-row-actions">
                  <button onClick={() => openEdit(p)} aria-label={`Edit ${p.name}`}><Pencil size={15} /></button>
                  <button onClick={() => remove(p)} aria-label={`Delete ${p.name}`}><Trash2 size={15} /></button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan={7} className="admin-empty">No products yet — add your first one.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
