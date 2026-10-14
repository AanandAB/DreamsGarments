# Dreams Garments Flag Centre — Storefront starter

A custom Next.js App Router + PostgreSQL starter for Dreams Garments Flag Centre, the Kuthuparamba Garments Making Society brand in Kannur, Kerala. Design direction: red / charcoal / warm white, editorial typography, light motion, responsive mobile-first layouts, and two distinct journeys for retail browsing and bulk/custom quote requests. The UX direction is informed by the [Impeccable project](https://github.com/pbakaus/impeccable).

## Included in this starter

- Responsive branded homepage, category landing grid and product browsing page.
- Bulk/custom quote form with Zod validation, generated enquiry references and PostgreSQL persistence.
- Protected admin login using bcrypt password verification and signed, HttpOnly session cookie.
- Initial admin dashboard with order/product/revenue counts and recent quote requests.
- Prisma schema for products, categories, quantity price tiers, customers, quotes, orders, order items, settings and audit logs.
- Product/category seed data, SEO metadata, robots.txt and sitemap.
- Accessible focus styles, reduced-motion support, responsive layouts and server-side quote validation.

## Run locally

Requirements: Node.js 20.9+, npm and a PostgreSQL database.

1. Copy `.env.example` to `.env` and set `DATABASE_URL`, `SESSION_SECRET` (32+ random characters), `ADMIN_EMAIL`, and `ADMIN_PASSWORD_HASH`.
2. Install dependencies: `npm install`.
3. Generate Prisma client: `npx prisma generate`.
4. Create database tables: `npx prisma migrate dev --name init`. If you have not created a migration yet, this command will prompt/build one from `prisma/schema.prisma`.
5. Seed initial categories/products: `npm run db:seed`.
6. Start development: `npm run dev`. Open `http://localhost:3000`; admin login is at `/admin/login`.

### Create an admin password hash

Run this one-off command in your terminal, replacing the sample password with a strong unique password: `node -e "require('bcryptjs').hash('REPLACE_WITH_A_STRONG_PASSWORD', 12).then(console.log)"`. Put the resulting hash in `ADMIN_PASSWORD_HASH`. Do not put the plain password in `.env`, source control, or chat. Set a long random `SESSION_SECRET`; never use the example value in production.

## Important implementation boundaries

This is a working foundation, not a finished production commerce platform. **Do not accept live orders or payments until the remaining production items are implemented and tested.** Specifically:

- The cart page is currently a clear placeholder. Cart persistence, guest checkout, shipping calculation, GST/HSN rules, order creation and order tracking still need implementation.
- Razorpay is not wired in. Add server-created orders, signature verification, webhook verification/idempotency, and never trust client-submitted totals.
- Bulk enquiries are persisted in PostgreSQL. Email/WhatsApp alerts are not automatically sent yet; configure a mail/WhatsApp provider and handle retries.
- Admin login and a read-only dashboard are present. Product CRUD, quote status/reply/conversion, order fulfilment actions, staff-role management, audit views, rate limiting and 2FA remain to be completed. The schema includes role and audit foundations but does not yet enforce per-role authorisation for admin actions.
- Product photographs and prices in the storefront fallback are illustrative. Replace them with owned/approved product photography and verified prices. Use database-managed products for launch.
- Add upload storage with MIME/type/size validation and malware scanning before accepting artwork files.
- Add rate limiting / bot protection to public forms and login, CSRF/origin protections appropriate to deployment, privacy/retention rules, backups, monitoring and security review.
- Confirm Indian National Flag Code/BIS compliance for relevant products, GST/HSN/tax treatment, shipping terms, custom-item returns, and permitted party/organisation designs before launch.

## Design and UX notes

- Red is reserved for key actions and the star brand motif. Warm white and charcoal provide contrast without visual noise.
- Animations use opacity/transform transitions and support `prefers-reduced-motion`. Keep large images optimised and replace external demo images with compressed, owned assets before launch.
- Bulk buyers are routed to a dedicated enquiry workflow; retail browsing does not pretend all made-to-order products have fixed prices.
- Do not hide admin security behind an obscure URL: authentication and authorisation are the security boundary. `robots.ts` disallows indexing `/admin/` only as a supplemental measure.

## Deploy

Deploy the Next.js app to a Node-compatible host and use managed PostgreSQL. Set all environment variables in the hosting dashboard, run Prisma migrations as a controlled release step (`npx prisma migrate deploy`), and seed only deliberately. Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS domain. Use a separate least-privilege database user, automated backups, error monitoring and a rollback plan.
