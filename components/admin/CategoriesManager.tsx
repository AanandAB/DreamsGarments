"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";

type Category = {
  id: string;
  name: string;
  uniqueSlug: string;
  description: string | null;
  active: boolean;
  sortOrder: number;
  _count?: { products: number };
};

const emptyForm = { name: "", description: "", active: true, sortOrder: "0" };

export default function CategoriesManager({ categories }: { categories: Category[] }) {
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
  function openEdit(c: Category) {
    setEditingId(c.id);
    setForm({ name: c.name, description: c.description || "", active: c.active, sortOrder: String(c.sortOrder) });
    setError("");
    setShowForm(true);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const payload = {
      name: form.name.trim(),
      description: form.description,
      active: form.active,
      sortOrder: Math.max(0, Number(form.sortOrder) || 0),
    };
    try {
      const res = await fetch(editingId ? `/api/admin/categories/${editingId}` : "/api/admin/categories", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't save the category.");
      setShowForm(false);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(c: Category) {
    if (!confirm(`Delete "${c.name}"? Products in it will become uncategorised.`)) return;
    try {
      const res = await fetch(`/api/admin/categories/${c.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Couldn't delete the category.");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="admin-crud">
      <div className="admin-crud-head">
        <div>
          <span className="eyebrow">ORGANISE</span>
          <h2>
            Categories <em>({categories.length})</em>
          </h2>
        </div>
        <button className="button button-red" onClick={openAdd}>
          <Plus size={16} /> Add category
        </button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={submit}>
          <div className="form-section-label"><span>✦</span> {editingId ? "EDIT CATEGORY" : "NEW CATEGORY"}</div>
          <div className="form-row">
            <label>
              Category name *
              <input required name="name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Flags" maxLength={100} />
            </label>
            <label>
              Sort order
              <input type="number" min="0" name="sortOrder" value={form.sortOrder} onChange={(e) => set("sortOrder", e.target.value)} />
            </label>
          </div>
          <label>
            Description (optional)
            <textarea name="description" value={form.description} onChange={(e) => set("description", e.target.value)} rows={2} maxLength={500} />
          </label>
          <div className="admin-toggles">
            <label className="admin-check"><input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} /> Active</label>
          </div>
          {error && <p role="alert" className="form-error">{error}</p>}
          <div className="admin-form-actions">
            <button type="button" className="button button-outline" onClick={() => setShowForm(false)}>Cancel</button>
            <button type="submit" className="button button-red" disabled={busy}>
              {busy ? "Saving…" : editingId ? "Save changes" : "Add category"}
            </button>
          </div>
        </form>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>NAME</th><th>SLUG</th><th>PRODUCTS</th><th>ORDER</th><th>STATUS</th><th></th></tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id}>
                <td><strong>{c.name}</strong></td>
                <td>{c.uniqueSlug}</td>
                <td>{c._count?.products ?? 0}</td>
                <td>{c.sortOrder}</td>
                <td>{c.active ? "Active" : "Hidden"}</td>
                <td className="admin-row-actions">
                  <button onClick={() => openEdit(c)} aria-label={`Edit ${c.name}`}><Pencil size={15} /></button>
                  <button onClick={() => remove(c)} aria-label={`Delete ${c.name}`}><Trash2 size={15} /></button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr><td colSpan={6} className="admin-empty">No categories yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
