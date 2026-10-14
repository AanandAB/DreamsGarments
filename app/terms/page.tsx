import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { business } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms governing the use of the Dreams Garments Flag Centre website and services.",
  robots: { index: false, follow: true },
};

export default function Terms() {
  return (
    <LegalPage title="Terms & Conditions" updated={business.lastUpdated}>
      <h2>1. Acceptance of terms</h2>
      <p>
        By accessing or using this website, you agree to be bound by these Terms &amp; Conditions. If you do
        not agree, please do not use the website. These terms apply to all visitors, users and customers.
      </p>

      <h2>2. About us</h2>
      <p>
        This website is operated by {business.legalName} (&quot;{business.brand}&quot;, &quot;we&quot;, &quot;us&quot;), at{" "}
        {business.address}. We manufacture and supply flags, toranams/festoons, volunteer wear, bags and
        custom event merchandise.
      </p>

      <h2>3. Products and custom orders</h2>
      <ul>
        <li>Many of our products are made to order based on your artwork, sizes and quantities.</li>
        <li>Product images and descriptions are indicative; colours and finishes may vary slightly from what you see on screen.</li>
        <li>Custom orders are subject to a minimum order quantity (MOQ) where stated, and to your approval of the sample or artwork before production begins.</li>
      </ul>

      <h2>4. Pricing and payments</h2>
      <ul>
        <li>All prices are quoted in Indian Rupees (₹) and may be revised. Final pricing for custom/bulk orders is confirmed in our quotation.</li>
        <li>Payment terms (advance, balance on delivery, or otherwise) will be stated in your quotation or invoice.</li>
        <li>We are not responsible for additional duties, taxes or charges imposed by any authority.</li>
      </ul>

      <h2>5. Orders and acceptance</h2>
      <p>
        Submitting an enquiry or quote request does not create a binding contract. An order is confirmed only
        when we accept it in writing and the agreed advance (if any) is received. We may decline or cancel an
        order where it is unlawful or cannot be fulfilled.
      </p>

      <h2>6. Intellectual property</h2>
      <ul>
        <li>All content on this website — text, images, logos and design — is our property or used with permission, and is protected by applicable law. You may not copy or reuse it without our written consent.</li>
        <li>If you provide artwork, logos or designs for a custom order, you warrant that you own or are authorised to use that material, and you agree to indemnify us against any claim arising from its use.</li>
      </ul>

      <h2>7. Acceptable use</h2>
      <p>
        You agree not to misuse this website — including attempting to gain unauthorised access, interfere with
        its operation, or use it for any unlawful purpose. We reserve the right to restrict access for any
        breach of these terms.
      </p>

      <h2>8. Disclaimer</h2>
      <p>
        This website and its content are provided &quot;as is&quot; without warranties of any kind, express or implied,
        to the fullest extent permitted by law. We do not warrant that the website will be uninterrupted or
        error-free.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, we shall not be liable for any indirect, incidental or
        consequential loss, or for loss of profits, arising out of your use of this website or of our products.
        Nothing in these terms limits any liability that cannot be limited under the Consumer Protection Act,
        2019 or other applicable Indian law.
      </p>

      <h2>10. Indemnification</h2>
      <p>
        You agree to indemnify us against any claims, losses or expenses arising from your breach of these terms
        or from any artwork/content you submit that infringes a third party&apos;s rights.
      </p>

      <h2>11. Governing law and jurisdiction</h2>
      <p>
        These terms are governed by the laws of India, and any dispute shall be subject to the exclusive
        jurisdiction of the courts at Kannur, Kerala, India.
      </p>

      <h2>12. Grievance redressal</h2>
      <p>For any complaint regarding these terms or the website, contact our Grievance Officer:</p>
      <p className="legal-callout">
        <strong>{business.grievanceOfficer}</strong>
        <br />
        {business.legalName}, {business.address}
        <br />
        {business.grievanceContact}
      </p>

      <h2>13. Changes and contact</h2>
      <p>
        We may amend these terms at any time; the updated terms will be posted here. For questions, contact us
        at {business.email} or {business.phone}.
      </p>
    </LegalPage>
  );
}
