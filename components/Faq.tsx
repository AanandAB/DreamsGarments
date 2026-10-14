"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

/**
 * FAQ accordion — single-open behaviour, animated with a pure-CSS grid-rows
 * transition (so the global prefers-reduced-motion block disables it for free).
 * Questions are the objections a bulk buyer has before enquiring.
 */
const faqs = [
  {
    q: "What's the minimum order quantity?",
    a: "We take small runs and large orders alike. Bulk pricing kicks in at higher quantities — tell us your number and we'll work out the best rate for it.",
  },
  {
    q: "Can I use my own design or artwork?",
    a: "Yes. Custom sizes, colours and printing are all supported. Share your artwork or a rough idea and we'll guide you on what prints well on fabric.",
  },
  {
    q: "How long will my order take?",
    a: "Design and sample approval typically take 2–4 days, and production 5–14 days depending on quantity. We confirm a delivery date up front, before you commit.",
  },
  {
    q: "Do you deliver outside Kannur?",
    a: "Yes — we plan delivery across Kerala and beyond. Delivery options and costs are confirmed as part of your quote.",
  },
  {
    q: "What do you need from me to start?",
    a: "Just three things: your design or idea, an approximate quantity, and your event date. We handle the rest.",
  },
  {
    q: "Can I see a sample before the full run?",
    a: "Yes. We share a sample for your approval before starting production, so you know exactly what you're getting.",
  },
];

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
