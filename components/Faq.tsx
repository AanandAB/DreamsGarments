"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/faq";

/**
 * FAQ accordion — single-open behaviour, animated with a pure-CSS grid-rows
 * transition (so the global prefers-reduced-motion block disables it for free).
 * Questions are the objections a bulk buyer has before enquiring. The Q&A
 * content lives in lib/faq.ts so the FAQPage structured data stays in sync.
 */

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`faq-item${isOpen ? " open" : ""}`}>
            <button
              id={`faq-q-${i}`}
              className="faq-q"
              aria-expanded={isOpen}
              aria-controls={`faq-a-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{f.q}</span>
              <Plus className="faq-plus" size={18} />
            </button>
            <div
              id={`faq-a-${i}`}
              className="faq-a-wrap"
              role="region"
              aria-labelledby={`faq-q-${i}`}
            >
              <div className="faq-a-inner">
                <p className="faq-a">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
