import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bulk & Custom Order Quote",
  description:
    "Request a bulk or custom quote for flags, toranams, volunteer wear and event merchandise. Made in Kannur, Kerala — with MOQ and quantity-based pricing.",
  alternates: { canonical: "/bulk-quote" },
};

export default function BulkQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
