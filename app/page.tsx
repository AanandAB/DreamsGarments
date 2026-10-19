import Link from "next/link";
import Image from "next/image";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import Tilt from "@/components/Tilt";
import SplitText from "@/components/SplitText";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/* ------------------------------------------------------------------ */
/*  Content (honest, editable placeholders — no invented stats)         */
/* ------------------------------------------------------------------ */

const categories = [
  { n: "01", title: "Flags", desc: "Country, state, sports & custom flags", slug: "flags", image: "/images/flag1.jpeg" },
  { n: "02", title: "Toranams & festoons", desc: "Bring every street and venue to life", slug: "toranams", image: "/images/toranams.webp" },
  { n: "03", title: "Volunteer wear", desc: "Uniforms, caps, vests & event kits", slug: "volunteer-wear", image: "/images/Uniform.jpeg" },
  { n: "04", title: "Gifts & mementos", desc: "Made to remember the occasion", slug: "mementos", image: "/images/mementos.webp" },
];

// Trust bar — only real, verifiable facts. No invented "500+ happy customers".
const trust = [
  { value: "4", label: "Product lines — flags, toranams, volunteer wear & mementos" },
  { value: "Bulk + retail", label: "Single pieces or thousands, from the same workshop" },
  { value: "Custom", label: "Your artwork, sizes and colours, made to order" },
  { value: "Kannur", label: "Made by the Kuthuparamba Garments Making Society" },
];

// Process — every step carries a time estimate to remove uncertainty.
const process = [
  { n: "01", title: "Enquiry", time: "Day 1", desc: "Tell us your design, quantity and event date. We come back within one working day." },
  { n: "02", title: "Design & sample", time: "2–4 days", desc: "We confirm materials and pricing, then share a sample for your approval before anything is produced." },
  { n: "03", title: "Production & delivery", time: "5–14 days", desc: "Made in our Kannur workshop and delivered in time for your event." },
];

// Pricing — indicative "starting at" ranges, clearly labelled as such.
const pricing = [
  { name: "Flags", from: "₹18–40", unit: "per piece", note: "Country, state, sports & custom", features: ["Custom sizes", "Bulk rates", "Your artwork"] },
  { name: "Toranams & festoons", from: "₹25", unit: "per piece", note: "Streets, venues & celebrations", features: ["Custom length", "Bulk rates", "Colour choice"] },
  { name: "Volunteer wear", from: "₹120", unit: "per piece", note: "Uniforms, caps, vests & event kits", features: ["Custom print", "Bulk rates", "Event kits"] },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqPageJsonLd()} />
      {/* ------------------------------------------------------------ HERO */}
      <section className="hero">
        <div className="hero-copy">
          <Reveal className="eyebrow">
            <span className="live-dot" /> KUTHUPARAMBA, KERALA · EST. WITH PURPOSE
          </Reveal>

          <h1>
            <SplitText text="Made for the" delay={0.05} />
            <br />
            <SplitText text="moments that" delay={0.35} />{" "}
            <SplitText text="matter." className="headline-italic" delay={0.55} />
          </h1>

          <Reveal delay={150} className="hero-description">
            From a single flag to thousands of pieces for your next big event.
            We make the details that bring people together.
          </Reveal>

          <Reveal delay={240} className="hero-ctas">
            <Link className="button button-red" href="/shop">
              Explore the collection <ArrowUpRight size={17} />
            </Link>
            <Link className="button button-light" href="/bulk-quote">
              Planning an event? <ArrowRight size={17} />
            </Link>
          </Reveal>

          <Reveal delay={320} className="hero-proof">
            <div className="proof-stars">✳ ✳ ✳ ✳ ✳</div>
            <span>Thoughtfully made. Ready for your crowd.</span>
          </Reveal>
        </div>

        <div className="hero-art">
          <div className="hero-image-wrap">
            <Image
              src="/images/hero.webp"
              alt="Indian tricolour flag flying against a blue sky"
              fill
              priority
              sizes="(max-width: 800px) 100vw, 54vw"
              className="hero-image"
            />
            <div className="image-shade" />
            <div className="hero-image-caption">
              <span>01 / MADE FOR GATHERINGS</span>
              <span>Kannur, Kerala ↗</span>
            </div>
          </div>
          <div className="floating-stamp">
            <span>MADE</span>
            <strong>
              WITH
              <br />
              PURPOSE
            </strong>
            <span>IN KERALA ✳</span>
          </div>
          <div className="vertical-note">FLAGS · FABRIC · COMMUNITY</div>
        </div>

        <a className="scroll-cue" href="#trust">
          <span>SCROLL TO DISCOVER</span>
          <ArrowDownRight size={17} />
        </a>
        <div className="hero-index">01 — 04</div>
      </section>

      {/* ------------------------------------------------------------ TICKER */}
      <section className="ticker" aria-label="Our products">
        <div className="ticker-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i}>
              FLAGS <b>✳</b> FESTOONS <b>✳</b> VOLUNTEER WEAR <b>✳</b> CUSTOM
              MERCHANDISE <b>✳</b> MADE IN KERALA <b>✳</b>
            </span>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ TRUST BAR */}
      <section id="trust" className="trust-section" aria-label="Why choose us">
        <div className="trust-grid">
          {trust.map((t, i) => (
            <Reveal key={i} className="trust-item" delay={i * 90}>
              <strong>{t.value}</strong>
              <span>{t.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ COLLECTIONS */}
      <section id="collections" className="section collections">
        <div className="section-heading">
          <Reveal>
            <span className="eyebrow">01 / THE COLLECTION</span>
            <h2>
              Whatever the occasion.
              <br />
              <em>We make it happen.</em>
            </h2>
          </Reveal>
          <Reveal delay={120} className="section-heading-note">
            <p>Small runs or thousands of pieces. Find what you need, then make it your own.</p>
          </Reveal>
        </div>

        <div className="category-grid">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 90}>
              <Tilt className="category-tilt" max={5}>
                <Link href={`/shop?category=${c.slug}`} className={`category-card category-${i}`}>
                  <div className="category-image">
                    <Image src={c.image} alt={c.title} fill sizes="(max-width:700px) 100vw, 50vw" />
                    <span className="category-number">{c.n}</span>
                    <span className="category-arrow"><ArrowUpRight size={22} /></span>
                  </div>
                  <div className="category-meta">
                    <div>
                      <h3>{c.title}</h3>
                      <p>{c.desc}</p>
                    </div>
                    <span className="tiny-arrow">↗</span>
                  </div>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ BULK */}
      <section className="bulk-section">
        <div className="bulk-orbit orbit-one" />
        <div className="bulk-orbit orbit-two" />
        <Reveal className="bulk-content">
          <span className="eyebrow eyebrow-light">
            <Sparkles size={14} /> MADE FOR THE BIG STUFF
          </span>
          <h2>
            One design.
            <br />
            <em>A thousand possibilities.</em>
          </h2>
          <p>
            Organising a conference, campaign, tournament or celebration? Tell us
            what you have in mind. We&apos;ll help with quantities, custom printing,
            materials and timelines.
          </p>
          <div className="bulk-checks">
            <span><Check size={16} /> Custom sizes &amp; artwork</span>
            <span><Check size={16} /> Bulk-friendly pricing</span>
            <span><Check size={16} /> Delivery planning</span>
          </div>
          <Link className="button button-white" href="/bulk-quote">
            Let&apos;s plan your order <ArrowUpRight size={17} />
          </Link>
        </Reveal>
        <div className="bulk-side-note">YOUR IDEA → OUR WORKSHOP → YOUR EVENT</div>
      </section>

      {/* ------------------------------------------------------------ PROCESS */}
      <section id="process" className="section process-section" aria-label="How it works">
        <div className="section-heading">
          <Reveal>
            <span className="eyebrow">02 / HOW IT WORKS</span>
            <h2>
              From your idea to the
              <br />
              <em>finished pieces.</em>
            </h2>
          </Reveal>
          <Reveal delay={120} className="section-heading-note">
            <p>Three clear steps, with real timelines — so you always know where things stand.</p>
          </Reveal>
        </div>

        <div className="process-grid">
          {process.map((s, i) => (
            <Reveal key={s.n} className="process-step" delay={i * 120} direction={i === 1 ? "up" : i === 0 ? "left" : "right"}>
              <span className="process-num">{s.n}</span>
              <div>
                <span className="process-time">{s.time}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ PRICING */}
      <section id="pricing" className="section pricing-section" aria-label="Pricing">
        <div className="section-heading">
          <Reveal>
            <span className="eyebrow">03 / PRICING</span>
            <h2>
              Honest starting points.
              <br />
              <em>No surprises.</em>
            </h2>
          </Reveal>
          <Reveal delay={120} className="section-heading-note">
            <p>Indicative starting prices — your exact rate is confirmed in your quote.</p>
          </Reveal>
        </div>

        <div className="pricing-grid">
          {pricing.map((p, i) => (
            <Reveal key={p.name} className="pricing-card" delay={i * 110}>
              <span className="pricing-name">{p.name}</span>
              <div className="pricing-price">
                <strong>from {p.from}</strong>
                <span>{p.unit}</span>
              </div>
              <p className="pricing-note">{p.note}</p>
              <ul className="pricing-features">
                {p.features.map((f) => (
                  <li key={f}>
                    <Check size={15} /> {f}
                  </li>
                ))}
              </ul>
              <Link className="text-link" href="/bulk-quote">
                Request a quote <ArrowUpRight size={16} />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ STORY */}
      <section id="story" className="story-section">
        <Reveal direction="left" className="story-image story-image-press">
          <div className="press-stack">
            <Image
              src="/images/news%20article2.jpeg"
              alt="Newspaper article featuring Dreams Garments Flag Centre"
              fill
              sizes="(max-width: 800px) 100vw, 45vw"
            />
          </div>
          <div className="press-stack">
            <Image
              src="/images/news%20aticle.jpeg"
              alt="Newspaper article featuring Dreams Garments Flag Centre"
              fill
              sizes="(max-width: 800px) 100vw, 45vw"
            />
          </div>
          <span className="press-caption">AS FEATURED IN THE NEWS</span>
        </Reveal>

        <Reveal direction="right" className="story-copy">
          <span className="eyebrow">04 / OUR STORY</span>
          <h2>
            Rooted here.
            <br />
            <em>Made for everywhere.</em>
          </h2>
          <p>
            Dreams Garments Flag Centre is made by The Kuthuparamba Garments Making
            Society in Kannur, Kerala. We create the flags, garments and event
            essentials that help communities show up together.
          </p>
          <p>
            We believe good work starts with listening: to your design, your
            quantity, your deadline and the people you&apos;re making it for.
          </p>
          <Link href="/bulk-quote" className="text-link">
            Tell us what you&apos;re planning <ArrowUpRight size={17} />
          </Link>
          <div className="story-signoff">
            <span className="signature-star">✳</span>
            <span>PROUDLY MADE IN KERALA</span>
          </div>
        </Reveal>
      </section>

      {/* ------------------------------------------------------------ FAQ */}
      <section id="faq" className="section faq-section" aria-label="Frequently asked questions">
        <div className="section-heading">
          <Reveal>
            <span className="eyebrow">05 / QUESTIONS</span>
            <h2>
              Before you ask,
              <br />
              <em>we&apos;ve answered.</em>
            </h2>
          </Reveal>
          <Reveal delay={120} className="section-heading-note">
            <p>The things bulk buyers usually want to know before getting in touch.</p>
          </Reveal>
        </div>
        <Reveal delay={80}>
          <Faq />
        </Reveal>
      </section>

      {/* ------------------------------------------------------------ CLOSING CTA */}
      <section className="closing-cta">
        <Reveal>
          <span className="eyebrow">HAVE SOMETHING IN MIND?</span>
          <h2>
            Let&apos;s make it <em>real.</em>
          </h2>
          <div className="closing-actions">
            <Link className="button button-red" href="/shop">
              Start shopping <ArrowUpRight size={17} />
            </Link>
            <Link className="button button-outline" href="/bulk-quote">
              Request a bulk quote <ArrowRight size={17} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
