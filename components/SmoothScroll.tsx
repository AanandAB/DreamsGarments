"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * SmoothScroll mounts Lenis (buttery smooth scrolling) + GSAP ScrollTrigger
 * once at the root, and renders the fixed scroll-progress bar and grain
 * overlay that sit above every page. Everything is gated on
 * `prefers-reduced-motion` so reduced-motion users get a plain, static page.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Respect the user's OS motion preference — skip the whole layer.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    // lerp 0.1 = gentle easing. `anchors` makes in-page `#section` links
    // smooth-scroll; the negative offset keeps the target below the
    // floating pill header (~64px pill + breathing room).
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      anchors: { offset: -80 },
    });

    // Wire Lenis's native scroll into GSAP's ticker so ScrollTrigger stays
    // in sync (Lenis 1.x animates window.scrollY, so both work together).
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Scroll progress bar: a fixed 3px line that fills left→right.
    const bar = document.getElementById("scroll-progress");
    const onScroll = () => {
      if (!bar) return;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* Fixed top progress bar (filled via inline transform in the effect). */}
      <div id="scroll-progress" className="scroll-progress" aria-hidden="true" />
      {/* Organic grain texture that drifts subtly; pointer-events:none. */}
      <div className="grain-overlay" aria-hidden="true" />
      {children}
    </>
  );
}
