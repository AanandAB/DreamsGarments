import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import BackToTop from "@/components/BackToTop";
import JsonLd from "@/components/JsonLd";
import {
  site,
  organizationJsonLd,
  localBusinessJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { MotionConfig } from "framer-motion";

const homeTitle =
  "Flags, Toranams & Custom Event Merchandise in Kannur | Dreams Garments";

export const metadata: Metadata = {
  title: {
    default: homeTitle,
    template: "%s | Dreams Garments",
  },
  description: site.description,
  metadataBase: new URL(site.url),
  applicationName: site.name,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: homeTitle,
    description: site.description,
    locale: "en_IN",
    images: [{ url: "/images/flag1.jpeg", alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flags, Toranams & Custom Event Merchandise in Kannur",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={localBusinessJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <MotionConfig reducedMotion="user">
          <SmoothScroll>
            <div className="announcement">
              <span className="announcement-star">✳</span> MADE IN KERALA · BUILT
              FOR YOUR BIG MOMENTS{" "}
              <a href="/bulk-quote">Bulk orders welcome ↗</a>
            </div>
            <Header />
            <main>{children}</main>
            <Footer />
            <BackToTop />
            <StickyCTA />
          </SmoothScroll>
        </MotionConfig>
      </body>
    </html>
  );
}
