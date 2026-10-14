import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { business } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "Our cancellation, return and refund policy for orders.",
  robots: { index: false, follow: true },
};

export default function RefundPolicy() {
  return (
    <LegalPage title="Refund & Cancellation Policy" updated={business.lastUpdated}>
      <h2>1. Cancellation</h2>
      <p>
        You may cancel an order by contacting us before production of your items begins. Once production has
        started — particularly for made-to-order or customised items — cancellation may not be possible, or
        may be subject to a deduction for materials and work already done.
      </p>

      <h2>2. Returns and replacements</h2>
      <ul>
        <li>If you receive items that are defective, damaged in transit, or materially different from your confirmed order, notify us within 48 hours of delivery with your order reference and photographs.</li>
        <li>We will repair, replace or refund the affected items, at our option, once we verify the issue.</li>
        <li>Customised / made-to-order items (with your artwork, sizes or print) cannot be returned for change of mind — but will still be replaced or refunded if defective or incorrect.</li>
      </ul>

      <h2>3. Refunds</h2>
      <ul>
        <li>Approved refunds are processed to the original payment method (or bank transfer where the original method is unavailable) within 7–14 working days of approval.</li>
        <li>For orders paid by advance, any non-refundable portion (e.g. material costs for started work) will be communicated to you before refund.</li>
      </ul>

      <h2>4. How to raise a request</h2>
      <p>
        Contact us at {business.phone} or {business.email} with your order/reference number, the reason for
        the request, and photographs where relevant. We will acknowledge your request promptly and resolve it
        in accordance with this policy and the Consumer Protection Act, 2019.
      </p>

      <h2>5. Exceptions</h2>
      <p>
        This policy does not affect your statutory rights under the Consumer Protection Act, 2019. Items
        damaged through misuse after delivery are not covered.
      </p>
    </LegalPage>
  );
}
