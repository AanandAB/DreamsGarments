"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag, ArrowUpRight } from "lucide-react";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/#collections", label: "Collection" },
  { href: "/bulk-quote", label: "Bulk orders" },
  { href: "/#story", label: "Our story" },
];

/**
 * Original sticky header bar (not the floating pill) with the real logo.
 * A subtle shadow appears once the page scrolls, and mobile shows a
 * slide-down menu with roomy tap targets.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <Link
        href="/"
        className="brand"
        aria-label="Dreams Garments Flag Centre — home"
      >
        <Image
          src="/brand/logo.png"
          alt="Dreams Garments Flag Centre"
          width={226}
          height={120}
          priority
          className="brand-logo"
        />
      </Link>

      <nav className="desktop-nav" aria-label="Primary">
        {links.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <Link className="header-quote" href="/bulk-quote">
          Get a quote <ArrowUpRight size={16} />
        </Link>
        <Link aria-label="Shopping bag" className="bag-link" href="/cart">
          <ShoppingBag size={19} />
        </Link>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="menu-toggle"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="Mobile">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link
            href="/bulk-quote"
            className="mobile-nav-cta"
            onClick={() => setOpen(false)}
          >
            Get a quote <ArrowUpRight size={16} />
          </Link>
        </nav>
      )}
    </header>
  );
}
