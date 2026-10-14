import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { business } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description: "Delivery areas, timelines and charges for our products.",
  robots: { index: false, follow: true },
};

export default function ShippingPolicy() {
  return (
    <LegalPage title="Shipping & Delivery Policy" updated={business.lastUpdated}>
      <h2>1. Delivery areas</h2>
      <p>
        We deliver across Kerala and to other states in India. Delivery availability and charges for your
        location will be confirmed as part of your quotation or order.
      </p>

      <h2>2. Timelines</h2>
      <ul>
        <li>Ready-to-order items are dispatched within 2–4 working days of order confirmation.</li>
        <li>Made-to-order / custom items take additional production time (typically 5–14 working days, depending on quantity and complexity).</li>
        <li>Estimated delivery dates are indicative and may vary due to courier delays or events beyond our control.</li>
      </ul>

      <h2>3. Shipping charges</h2>
      <p>
        Shipping charges depend on the weight, size and destination of the order. They are confirmed in your
        quotation or invoice, and may be waived on eligible bulk orders.
      </p>

      <h2>4. Delivery partner</h2>
      <p>
        We use third-party courier services. Risk in the goods passes to you on delivery; please inspect your
        order on receipt and report any damage within 48 hours (see our Refund &amp; Cancellation Policy).
      </p>

      <h2>5. Delays</h2>
      <p>
        We are not liable for delays caused by courier services, weather, restrictions, or other events outside
        our reasonable control. We will keep you informed of any material delay.
      </p>

      <h2>6. Contact</h2>
      <p>
        For delivery queries, contact us at {business.phone} or {business.email}.
      </p>
    </LegalPage>
  );
}
