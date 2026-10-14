"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

/**
 * Tilt gives a card a subtle 3D lean toward the cursor (max a few degrees).
 * Cheap, dependency-free, and skipped entirely for reduced-motion users.
 * Keep the multiplier small — the card should lean, not flail.
 */
export default function Tilt({
  children,
  className = "",
  max = 5,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transition = "transform 0.08s ease-out";
    el.style.transform = `perspective(1000px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-4px)`;
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    // Slower spring-back than the attraction, for a tactile feel.
    el.style.transition = "transform 0.45s cubic-bezier(.22,1,.36,1)";
    el.style.transform = "";
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}
