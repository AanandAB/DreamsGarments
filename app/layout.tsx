import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import BackToTop from "@/components/BackToTop";
import { MotionConfig } from "framer-motion";

export const metadata: Metadata = {
  title: {
    default: "Dreams Garments Flag Centre | Flags, Eventwear & Custom Orders",
    template: "%s | Dreams Garments",
  },
  description:
    "Flags, toranams, volunteer uniforms and custom event merchandise, made in Kuthuparamba, Kannur, Kerala. Shop retail or request a bulk quote.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
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
