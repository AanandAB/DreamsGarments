"use client";

import { motion } from "framer-motion";

/**
 * SplitText splits a phrase into per-character spans and staggers them in
 * with a kinetic overshoot (the character rises out of an overflow mask).
 * Screen readers get the clean phrase via aria-label; the split spans are
 * aria-hidden. Reduced-motion is handled globally by <MotionConfig
 * reducedMotion="user"> in the root layout, so no branching here (keeps
 * SSR and hydration identical).
 */
export default function SplitText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="split-word" aria-hidden="true">
          {[...word].map((char) => {
            const i = charIndex++;
            return (
              <motion.span
                key={i}
                className="split-char"
                initial={{ y: "120%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.7,
                  ease: [0.18, 0.89, 0.32, 1.28],
                  delay: delay + i * 0.03,
                }}
              >
                {char}
              </motion.span>
            );
          })}
          {wi < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </span>
  );
}
