"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Direction = "up" | "left" | "right" | "zoom";

/**
 * Reveal wraps a block and fades/slides it in when it scrolls into view
 * (IntersectionObserver — no GSAP needed for this). Direction variants slide
 * from the left/right or scale in; `delay` staggers siblings. Reduced-motion
 * users get the element shown immediately (no animation).
 */
export default function Reveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Static but fully visible for reduced-motion users.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("revealed");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          if (once) io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  // "up" is the default reveal; other directions add a variant class that
  // overrides the base transform (order matters — see globals.css).
  const variant = direction === "up" ? "" : ` reveal-${direction}`;

  return (
    <div
      ref={ref}
      className={`reveal${variant}${className ? " " + className : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
