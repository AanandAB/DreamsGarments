import type { ReactNode } from "react";

/**
 * Shared layout for the legal pages — consistent title block + prose width.
 * The pages themselves set `robots: { index: false }` so this boilerplate
 * stays out of search results (it would dilute topical authority).
 */
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <section className="page-shell legal-page">
      <div className="legal-head">
        <span className="eyebrow">LEGAL</span>
        <h1>{title}</h1>
        {updated && <p className="legal-updated">Last updated: {updated}</p>}
      </div>
      <div className="legal-body">{children}</div>
    </section>
  );
}
