import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { business } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Dreams Garments Flag Centre collects, uses and protects your personal data.",
  robots: { index: false, follow: true },
};

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy" updated={business.lastUpdated}>
      <h2>1. Who we are</h2>
      <p>
        {business.brand} is operated by {business.legalName}, at {business.address}.
        For the purposes of the Digital Personal Data Protection Act, 2023 (&quot;DPDP Act&quot;) and the
        Information Technology Act, 2000 (&quot;IT Act&quot;), we are the Data Fiduciary of the personal data
        you provide to us.
      </p>

      <h2>2. Information we collect</h2>
      <p>We collect only the personal data that is necessary to respond to your enquiries and supply our products:</p>
      <ul>
        <li>Identity and contact details you provide — name, phone number, email address and organisation.</li>
        <li>Order details — product type, quantity, customisation/artwork details, delivery date and delivery address.</li>
        <li>Location data — only if you choose &quot;Use my current location&quot; on the quote form; this is processed on your device to pre-fill your address.</li>
        <li>Technical data — standard server logs and cookies (see Section 8).</li>
      </ul>

      <h2>3. How we use your information</h2>
      <p>We use your personal data to:</p>
      <ul>
        <li>Respond to your enquiries and provide a quotation.</li>
        <li>Process, produce and deliver the products you order.</li>
        <li>Provide customer support and respond to complaints or requests.</li>
        <li>Comply with applicable law, including record-keeping obligations.</li>
      </ul>

      <h2>4. Legal basis and consent</h2>
      <p>
        We process your personal data on the basis of your consent, which you provide when you submit an
        enquiry or order. You may withdraw your consent at any time by contacting our Grievance Officer
        (Section 10). Withdrawal does not affect processing that was lawful before withdrawal, or processing
        we must continue for legal reasons.
      </p>

      <h2>5. Sharing of information</h2>
      <p>
        We do not sell, rent or trade your personal data. We share it only where necessary to fulfil your
        order — for example, with courier/delivery partners for shipping, or with payment processors if and
        when you make a payment. Such parties use the data only for that limited purpose.
      </p>

      <h2>6. Retention</h2>
      <p>
        We keep your personal data only for as long as needed to fulfil the purpose it was collected for,
        and for any period required by applicable law, after which it is securely deleted or anonymised.
      </p>

      <h2>7. Security</h2>
      <p>
        We implement reasonable security practices and procedures, commensurate with the sensitivity of the
        data, as required under Section 43A of the IT Act and the rules thereunder. However, no method of
        transmission or storage is completely secure, and we cannot guarantee absolute security.
      </p>

      <h2>8. Cookies</h2>
      <p>
        Our website uses a session cookie solely to keep signed-in administrators logged in. We do not use
        third-party advertising or tracking cookies. You can disable cookies in your browser, though some
        parts of the site may not function correctly.
      </p>

      <h2>9. Children&apos;s data</h2>
      <p>
        Our products and services are directed at adults. We do not knowingly collect personal data from
        children under 18 without verifiable parental consent, as required under the DPDP Act.
      </p>

      <h2>10. Your rights and grievance redressal</h2>
      <p>Under the DPDP Act, you have the right to:</p>
      <ul>
        <li>Access and obtain a copy of your personal data.</li>
        <li>Request correction of inaccurate or incomplete data.</li>
        <li>Request erasure of your personal data.</li>
        <li>Withdraw consent and nominate a representative.</li>
        <li>Lodge a grievance regarding how we handle your data.</li>
      </ul>
      <p>
        To exercise any of these rights, or to raise a complaint, contact our Grievance Officer:
      </p>
      <p className="legal-callout">
        <strong>{business.grievanceOfficer}</strong>
        <br />
        {business.legalName}, {business.address}
        <br />
        {business.grievanceContact}
      </p>
      <p>
        We will acknowledge your complaint within 24 hours and resolve it within 15 days from receipt, as
        required under the IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021.
      </p>

      <h2>11. Location of data</h2>
      <p>
        Your personal data is stored and processed on servers located in India.
      </p>

      <h2>12. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The revised policy will be posted on this page with an
        updated &quot;Last updated&quot; date. Please review it periodically.
      </p>

      <h2>13. Contact us</h2>
      <p>
        For any questions about this policy, contact us at {business.email} or {business.phone}.
      </p>
    </LegalPage>
  );
}
