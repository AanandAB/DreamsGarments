"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import Link from "next/link";

/**
 * Bulk/custom quote form. Posts to /api/quotes (persisted to Postgres) and,
 * on success, offers a "Continue on WhatsApp" link whose message includes the
 * enquiry reference and — when the customer used "Use my current location" —
 * a Google Maps link to their exact co-ordinates.
 */
function QuoteForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    organization: "",
    productType: params.get("product") || "Flags",
    quantity: "100",
    customisation: "",
    deliveryDate: "",
    deliveryPincode: "",
    deliveryAddress: "",
    latitude: null as number | null,
    longitude: null as number | null,
    notes: "",
  });

  const update = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  /**
   * "Use my current location": geolocate, then reverse-geocode keylessly with
   * BigDataCloud. Fills the address (Town, State) + pincode when available,
   * and always stores the exact lat/lng for the WhatsApp maps link. Falls back
   * to raw co-ordinates if the reverse geocode fails, and shows a friendly
   * message if the user denies permission.
   */
  async function locate() {
    if (!("geolocation" in navigator)) {
      setLocError("Location isn't available on this device — please type your address instead.");
      return;
    }
    setLocating(true);
    setLocError("");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        // Store exact co-ordinates immediately (before the address lookup).
        setForm((f) => ({ ...f, latitude, longitude }));
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
          );
          const data = await res.json();
          const town = data.locality || data.city || "";
          const state = data.principalSubdivision || "";
          const addr = [town, state].filter(Boolean).join(", ");
          const pincode =
            typeof data.postcode === "string" && /^\d{6}$/.test(data.postcode)
              ? data.postcode
              : "";
          setForm((f) => ({
            ...f,
            deliveryAddress: addr || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            deliveryPincode: pincode || f.deliveryPincode,
          }));
        } catch {
          // Reverse geocode failed — raw co-ordinates are still a usable answer.
          setForm((f) => ({
            ...f,
            deliveryAddress: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          }));
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocating(false);
        setLocError("We couldn't get your location — allow location access, or type your address manually.");
      },
      { timeout: 10000, maximumAge: 60000 },
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity),
          // JSON.stringify drops undefined keys, so a null co-ordinate is omitted.
          latitude: form.latitude ?? undefined,
          longitude: form.longitude ?? undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Please check the details and try again.");
      setStatus(`success:${data.reference}`);
    } catch (err: any) {
      setStatus(`error:${err.message}`);
    } finally {
      setBusy(false);
    }
  }

  if (status.startsWith("success:")) {
    const ref = status.split(":")[1];
    const hasLocation = form.latitude != null && form.longitude != null;
    const mapsLink = hasLocation
      ? `https://maps.google.com/?q=${form.latitude},${form.longitude}`
      : "";
    const waText =
      `Hello Dreams Garments, I submitted bulk quote request ${ref}. Please help me with the next steps.` +
      (hasLocation
        ? `\n\n📍 My location: ${form.deliveryAddress ? form.deliveryAddress + "\n" : ""}${mapsLink}`
        : "");
    return (
      <div className="quote-success">
        <CheckCircle2 size={48} />
        <span className="eyebrow">REQUEST RECEIVED</span>
        <h2>
          Let&apos;s make it <em>happen.</em>
        </h2>
        <p>
          Your enquiry reference is <strong>{ref}</strong>. Our team can review your
          requirements and contact you with the next steps.
        </p>
        <a
          className="button button-red"
          target="_blank"
          rel="noreferrer"
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918547008888"}?text=${encodeURIComponent(waText)}`}
        >
          Continue on WhatsApp <ArrowRight size={16} />
        </a>
      </div>
    );
  }

  return (
    <section className="quote-layout">
      <div className="quote-aside">
        <Link href="/" className="back-link">
          <ArrowLeft size={15} /> Back to home
        </Link>
        <span className="eyebrow">BULK &amp; CUSTOM / 02</span>
        <h1>
          Good things
          <br />
          come in <em>quantities.</em>
        </h1>
        <p>
          Tell us a little about your event. We&apos;ll help you figure out the product,
          quantity, customisation and timeline.
        </p>
        <div className="quote-steps">
          <div>
            <span>01</span>
            <p>
              <strong>Tell us your plan</strong>
              <small>Share the basics. No long brief needed.</small>
            </p>
          </div>
          <div>
            <span>02</span>
            <p>
              <strong>We&apos;ll work out the details</strong>
              <small>Pricing, samples, artwork and timing.</small>
            </p>
          </div>
          <div>
            <span>03</span>
            <p>
              <strong>Approve and produce</strong>
              <small>We&apos;ll confirm the details before production.</small>
            </p>
          </div>
        </div>
        <div className="quote-contact">
          <span>Prefer a quick conversation?</span>
          <a href="tel:+918547008888">+91 85470 08888 ↗</a>
        </div>
      </div>

      <div className="quote-form-wrap">
        <div className="form-heading">
          <span className="eyebrow">YOUR PROJECT, YOUR WAY</span>
          <h2>
            Let&apos;s get the <em>details.</em>
          </h2>
          <p>Fields marked * are required.</p>
        </div>

        <form className="quote-form" onSubmit={submit}>
          <div className="form-section-label">
            <span>01</span> ABOUT YOU
          </div>
          <div className="form-row">
            <label>
              Your name *
              <input required name="name" value={form.name} onChange={update} placeholder="Full name" maxLength={100} />
            </label>
            <label>
              Phone number *
              <input required name="phone" value={form.phone} onChange={update} placeholder="10-digit mobile number" inputMode="tel" pattern="[+]?[0-9 ()-]{10,18}" maxLength={18} />
            </label>
          </div>
          <div className="form-row">
            <label>
              Email address
              <input type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" maxLength={150} />
            </label>
            <label>
              Organisation / event
              <input name="organization" value={form.organization} onChange={update} placeholder="Optional" maxLength={150} />
            </label>
          </div>

          <div className="form-section-label">
            <span>02</span> WHAT ARE WE MAKING?
          </div>
          <div className="form-row">
            <label>
              Product type *
              <select name="productType" value={form.productType} onChange={update}>
                <option>Flags</option>
                <option>Party / organisation flags</option>
                <option>National / country flags</option>
                <option>Toranams &amp; festoons</option>
                <option>Volunteer dresses</option>
                <option>Caps &amp; vests</option>
                <option>Bags &amp; cloth bags</option>
                <option>Keychains, files &amp; mementos</option>
                <option>Clocks &amp; wooden mementos</option>
                <option>Other / multiple products</option>
              </select>
            </label>
            <label>
              Estimated quantity *
              <input required type="number" min="1" max="1000000" name="quantity" value={form.quantity} onChange={update} />
            </label>
          </div>
          <label>
            Customisation / print details
            <textarea name="customisation" value={form.customisation} onChange={update} placeholder="Sizes, fabric, colours, logo or print requirements…" rows={3} maxLength={2000} />
          </label>

          <div className="form-section-label">
            <span>03</span> DELIVERY &amp; TIMING
          </div>
          <div className="form-row">
            <label>
              Target delivery date
              <input type="date" name="deliveryDate" value={form.deliveryDate} onChange={update} min={new Date().toISOString().slice(0, 10)} />
            </label>
            <label>
              Delivery pincode
              <input name="deliveryPincode" value={form.deliveryPincode} onChange={update} placeholder="6-digit pincode" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} />
            </label>
          </div>
          <label>
            Delivery location / address
            <textarea name="deliveryAddress" value={form.deliveryAddress} onChange={update} placeholder="Town, district and any helpful details" rows={2} maxLength={1000} />
          </label>
          <button type="button" className="locate-btn" onClick={locate} disabled={locating}>
            <MapPin size={14} /> {locating ? "Locating…" : "Use my current location"}
          </button>
          {locError && (
            <p role="alert" className="locate-error">
              {locError}
            </p>
          )}

          <label>
            Anything else we should know?
            <textarea name="notes" value={form.notes} onChange={update} placeholder="Event date, sample needs, budget range…" rows={2} maxLength={2000} />
          </label>
          <p className="privacy-note">
            By submitting, you consent to us processing your details to respond to this
            request, as described in our <Link href="/privacy">Privacy Policy</Link>. Please
            don&apos;t include sensitive personal information.
          </p>
          {status.startsWith("error:") && (
            <p role="alert" className="form-error">
              {status.slice(6)}
            </p>
          )}
          <button disabled={busy} className="button button-red submit-button" type="submit">
            {busy ? "Sending request…" : "Send my quote request"}
            <ArrowRight size={17} />
          </button>
        </form>
      </div>
    </section>
  );
}

export default function BulkQuote() {
  return (
    <Suspense fallback={<div className="page-shell">Loading quote form…</div>}>
      <QuoteForm />
    </Suspense>
  );
}
