import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Phone, MapPin, Mail } from "lucide-react";
import { business, legalNav } from "@/lib/legal";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <span className="eyebrow">MADE WITH PURPOSE IN KERALA</span>
          <h2>
            Big ideas.
            <br />
            <em>Made to order.</em>
          </h2>
        </div>
        <Link className="circle-link" href="/bulk-quote" aria-label="Request a quote">
          <ArrowUpRight size={28} />
        </Link>
      </div>

      <div className="footer-bottom">
        {/* Logo on a light plate so the dark-red wordmark stays legible. */}
        <div className="footer-brand">
          <div className="footer-logo-plate">
            <Image
              src="/brand/logo.png"
              alt="Dreams Garments Flag Centre"
              width={226}
              height={120}
              className="footer-logo"
            />
          </div>
          <p>
            {business.legalName}
            <br />
            {business.address}
          </p>
        </div>

        <div className="footer-contact">
          <a href="tel:+918547008888"><Phone size={15} /> 85470 08888</a>
          <a href="tel:+919495745049"><Phone size={15} /> 94957 45049</a>
          <a href="https://wa.me/918547008888" target="_blank" rel="noopener noreferrer"><MapPin size={15} /> WhatsApp us</a>
          <a href={`mailto:${business.email}`}><Mail size={15} /> {business.email}</a>
        </div>

        <div className="footer-links">
          <span className="footer-links-title">Explore</span>
          <Link href="/shop">Shop</Link>
          <Link href="/bulk-quote">Bulk orders</Link>
          <Link href="/admin">Admin</Link>
        </div>
      </div>

      {/* Legal links + grievance redressal (disclosures required under the
          IT Rules 2021 and Consumer Protection (E-Commerce) Rules 2020). */}
      <div className="footer-legal">
        {legalNav.map((l) => (
          <Link key={l.href} href={l.href}>{l.label}</Link>
        ))}
      </div>
      <div className="footer-grievance">
        <span>
          Grievance Officer: {business.grievanceOfficer} · {business.grievanceContact}
        </span>
      </div>

      <div className="copyright">
        <span>© {new Date().getFullYear()} {business.brand}</span>
        <span>Built for every gathering.</span>
      </div>
    </footer>
  );
}
