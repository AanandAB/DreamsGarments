// FAQ data shared between the FAQ accordion component and the FAQPage
// JSON-LD structured data (so both always stay in sync).

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
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
