"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * Sticky bottom-right "Get a quote" pill that appears once the visitor has
 * scrolled past the hero. Links to the bulk-quote form (the conversion goal).
 */
export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sticky-cta${visible ? " sticky-cta-show" : ""}`}
      aria-hidden={!visible}
    >
      <Link href="/bulk-quote" className="sticky-cta-btn" tabIndex={visible ? 0 : -1}>
        <span className="sticky-cta-dot" aria-hidden="true" />
        <span>Get a quote</span>
        <ArrowUpRight size={16} />
      </Link>
    </div>
  );
}
