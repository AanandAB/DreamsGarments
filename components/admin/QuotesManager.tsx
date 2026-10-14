"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, MapPin } from "lucide-react";
import { inr } from "@/lib/format";

type Quote = {
  id: string;
  reference: string;
  name: string;
  phone: string;
  email: string | null;
  organization: string | null;
  productType: string;
  quantity: number;
  customisation: string | null;
  deliveryDate: string | null;
  deliveryPincode: string | null;
  deliveryAddress: string | null;
  notes: string | null;
  status: string;
  quotedTotalPaise: number | null;
  adminNotes: string | null;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
};

const STATUSES = ["NEW", "REVIEWING", "QUOTED", "APPROVED", "CONVERTED", "DECLINED"];

function fmtDate(d: string | null) {
  return d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";
}

/**
 * Quotes: change status inline (auto-saves), expand a row to see the full
 * enquiry (with a Google Maps link when the customer shared a location) and
 * set the quoted price + internal notes.
 */
export default function QuotesManager({ quotes }: { quotes: Quote[] }) {
  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>(null);
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function setStatus(q: Quote, status: string) {
    try {
      const res = await fetch(`/api/admin/quotes/${q.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Couldn't update status.");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    }
  }

  function openRow(q: Quote) {
    setOpenId(openId === q.id ? null : q.id);
    setPrice(q.quotedTotalPaise != null ? String(q.quotedTotalPaise / 100) : "");
    setNotes(q.adminNotes || "");
    setError("");
  }

  async function saveDetails(q: Quote) {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/quotes/${q.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quotedTotalPaise: price.trim() === "" ? null : Math.round(Number(price) * 100),
          adminNotes: notes,
        }),
      });
      if (!res.ok) throw new Error("Couldn't save the quote.");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-crud">
      <div className="admin-crud-head">
        <div>
          <span className="eyebrow">ENQUIRIES</span>
          <h2>
            Quotes <em>({quotes.length})</em>
          </h2>
        </div>
      </div>

      {error && <p role="alert" className="form-error">{error}</p>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>REFERENCE</th><th>CUSTOMER</th><th>PRODUCT</th><th>QTY</th><th>STATUS</th><th>RECEIVED</th><th></th></tr>
          </thead>
          <tbody>
            {quotes.map((q) => (
              <QuoteRows key={q.id} q={q} open={openId === q.id} onToggle={() => openRow(q)} onStatus={setStatus} price={price} notes={notes} setPrice={setPrice} setNotes={setNotes} busy={busy} onSave={() => saveDetails(q)} />
            ))}
            {quotes.length === 0 && (
              <tr><td colSpan={7} className="admin-empty">No quote requests yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QuoteRows({ q, open, onToggle, onStatus, price, notes, setPrice, setNotes, busy, onSave }: any) {
  return (
    <>
      <tr>
        <td><strong>{q.reference}</strong></td>
        <td>{q.name}<small>{q.phone}</small></td>
        <td>{q.productType}</td>
        <td>{q.quantity.toLocaleString("en-IN")}</td>
        <td>
          <select
            className="status-select"
            value={q.status}
            onChange={(e) => onStatus(q, e.target.value)}
            aria-label={`Status for ${q.reference}`}
          >
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </td>
        <td>{fmtDate(q.createdAt)}</td>
        <td className="admin-row-actions">
          <button onClick={onToggle} aria-expanded={open} aria-label={`Details for ${q.reference}`}>
            <ChevronDown size={15} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
          </button>
        </td>
      </tr>
      {open && (
        <tr className="admin-detail-row">
          <td colSpan={7}>
            <div className="admin-quote-detail">
              <div className="aq-grid">
                <div><small>Contact</small><strong>{q.name}</strong><span>{q.phone}{q.email ? ` · ${q.email}` : ""}</span></div>
                <div><small>Organisation</small><strong>{q.organization || "—"}</strong></div>
                <div><small>Product</small><strong>{q.productType}</strong><span>Qty {q.quantity.toLocaleString("en-IN")}</span></div>
                <div><small>Delivery</small><strong>{fmtDate(q.deliveryDate)}</strong><span>{[q.deliveryAddress, q.deliveryPincode].filter(Boolean).join(" · ") || "—"}</span></div>
              </div>
              {q.customisation && <p className="aq-note"><small>Customisation</small>{q.customisation}</p>}
              {q.notes && <p className="aq-note"><small>Customer notes</small>{q.notes}</p>}
              {q.latitude != null && q.longitude != null && (
                <a className="aq-maplink" href={`https://maps.google.com/?q=${q.latitude},${q.longitude}`} target="_blank" rel="noreferrer">
                  <MapPin size={14} /> Open exact location in Google Maps ↗
                </a>
              )}
              <div className="aq-edit">
                <label>Quoted total (₹)<input type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Leave empty for none" /></label>
                <label>Internal notes<textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} maxLength={2000} placeholder="Pricing agreed, sample sent…" /></label>
                <button className="button button-red" onClick={onSave} disabled={busy}>{busy ? "Saving…" : "Save"}</button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
