"use client";

import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

export const SideScroll = () => {
  const targetRef = useRef(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const [maxTranslate, setMaxTranslate] = useState(2000);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const velocity = useVelocity(scrollYProgress);

  // Dezenter Skew-Effekt
  const skewX = useTransform(velocity, [-0.5, 0.5], ["4deg", "-4deg"]);
  const skew = useSpring(skewX, { mass: 1, stiffness: 30, damping: 20 });

  // Sanfteres Scrollen
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);
  const xSpring = useSpring(xRaw, { mass: 1, stiffness: 60, damping: 25 });
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.5, 1, 1, 0.5]
  );

  useLayoutEffect(() => {
    const update = () => {
      if (!textRef.current) return;
      const textWidth = textRef.current.scrollWidth;
      const viewport = window.innerWidth;
      const next = Math.max(0, textWidth - viewport + 200);
      setMaxTranslate(next);
    };

    const raf = requestAnimationFrame(update);
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    if (textRef.current) observer.observe(textRef.current);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={targetRef}
      className="relative h-[700vh] w-full bg-neutral-50 text-neutral-950 max-w-full"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.14),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(236,72,153,0.16),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(147,197,253,0.12),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/0 to-white/30" />
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="relative w-full pl-6 md:pl-10">
          <motion.p
            ref={textRef}
            style={{ x: xSpring, skewX: skew, opacity }}
            className="w-max pr-[20vw] origin-bottom-left whitespace-nowrap text-6xl md:text-8xl font-extrabold uppercase leading-[0.9] md:leading-[0.85] will-change-transform text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-400 drop-shadow-[0_8px_24px_rgba(59,130,246,0.25)]"
          >
            Creating incredible stuff, every single day.
          </motion.p>
          <p className="absolute left-1/2 top-full mt-5 -translate-x-1/2 text-xl md:text-2xl font-semibold text-neutral-600 tracking-wide">
            Be part of it
          </p>
        </div>
      </div>
    </section>
  );
};
