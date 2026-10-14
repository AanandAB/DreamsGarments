import Link from "next/link";
import { LayoutDashboard, Boxes, Tags, ClipboardList } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", Icon: Boxes },
  { href: "/admin/categories", label: "Categories", Icon: Tags },
  { href: "/admin/quotes", label: "Quotes", Icon: ClipboardList },
];

/** Shared admin section nav — rendered at the top of every admin page. */
export default function AdminNav({ active }: { active: string }) {
  return (
    <nav className="admin-nav" aria-label="Admin sections">
      {links.map(({ href, label, Icon }) => (
        <Link key={href} href={href} className={active === href ? "active" : ""}>
          <Icon size={15} /> {label}
        </Link>
      ))}
    </nav>
  );
}
