"use client";

import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ContactForm } from "@/components/ui/ContactForm";

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
  const xSpring = useSpring(xRaw, { mass: 1, stiffness: 40, damping: 30 });
  const secondXRaw = useTransform(
    scrollYProgress,
    [0, 0.4, 0.65, 1],
    [-maxTranslate * 0.6, -maxTranslate * 0.35, 0, 0]
  );
  const xSpringReverse = useSpring(secondXRaw, {
    mass: 1,
    stiffness: 40,
    damping: 30,
  });
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.5, 1, 1, 0.5]
  );
  const subScale = useTransform(scrollYProgress, [0.35, 0.8], [1.7, 2.6]);
  const subY = useTransform(scrollYProgress, [0.35, 0.8], [240, -80]);
  const subOpacity = useTransform(scrollYProgress, [0.3, 0.55], [0.6, 1]);
  const formOpacity = useTransform(scrollYProgress, [0.6, 0.82], [0, 1]);
  const formY = useTransform(scrollYProgress, [0.6, 0.82], [40, 0]);
  const secondOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const secondY = useTransform(scrollYProgress, [0.35, 0.55], [16, 0]);

  useLayoutEffect(() => {
    const update = () => {
      if (!textRef.current) return;
      const textWidth = textRef.current.scrollWidth;
      const viewport = window.innerWidth;
      const next = Math.max(0, textWidth + viewport * 1.2);
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
      <div className="sticky top-0 flex min-h-screen items-start overflow-visible pt-16 pb-16">
        <div className="relative w-full pl-6 md:pl-10">
          <motion.p
            ref={textRef}
            style={{ x: xSpring, skewX: skew, opacity }}
            className="w-max pr-[20vw] origin-bottom-left whitespace-nowrap text-6xl md:text-8xl font-extrabold uppercase leading-[0.9] md:leading-[0.85] will-change-transform text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-400 drop-shadow-[0_8px_24px_rgba(59,130,246,0.25)]"
          >
            Creating incredible stuff, every single day.
          </motion.p>
          <motion.p
            aria-hidden="true"
            style={{
              x: xSpringReverse,
              skewX: skew,
              opacity: secondOpacity,
              y: secondY,
            }}
            className="absolute left-1/2 top-20 -translate-x-1/2 w-max pr-[20vw] origin-bottom-left whitespace-nowrap text-5xl md:text-7xl font-extrabold uppercase leading-[0.9] md:leading-[0.85] text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-purple-400 drop-shadow-[0_8px_24px_rgba(236,72,153,0.2)]"
          >
            Just one message away.
          </motion.p>
          <motion.p
            style={{ scale: subScale, y: subY, opacity: subOpacity }}
            className="absolute left-1/2 top-6 -translate-x-1/2 text-2xl md:text-3xl font-extrabold tracking-[0.18em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)] origin-top"
          >
            Be part of it
          </motion.p>
          <motion.div
            style={{ opacity: formOpacity, y: formY }}
            className="absolute left-1/2 top-40 w-[min(92vw,980px)] -translate-x-1/2"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
