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

const SECTION_HEIGHT = "h-[300vh] sm:h-[340vh] lg:h-[380vh]";
const INTRO_TEXT_OFFSET = "left-4 sm:left-6 md:left-10";
const LOCK_THRESHOLD = 0.16;
const LOCK_COOLDOWN_MS = 700;

export const SideScroll = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const isLockedRef = useRef(false);
  const canLockRef = useRef(true);
  const lastLockAtRef = useRef(0);
  const unlockDirectionRef = useRef<"up" | "down" | null>(null);
  const [maxTranslate, setMaxTranslate] = useState(2000);
  const [isActive, setIsActive] = useState(false);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const velocity = useVelocity(scrollYProgress);

  const skewX = useTransform(velocity, [-0.5, 0.5], ["4deg", "-4deg"]);
  const skew = useSpring(skewX, { mass: 1, stiffness: 30, damping: 20 });

  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);
  const xSpring = useSpring(xRaw, {
    mass: 1.1,
    stiffness: 55,
    damping: 35,
    restDelta: 0.001,
  });
  const introOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.42, 0.52],
    [0.45, 1, 1, 0]
  );
  const introYRaw = useTransform(scrollYProgress, [0, 0.35], [0, -36]);
  const introY = useSpring(introYRaw, { stiffness: 80, damping: 26 });

  const headingFontSizeRaw = useTransform(scrollYProgress, [0.3, 0.58], [20, 84]);
  const headingFontSize = useSpring(headingFontSizeRaw, { stiffness: 110, damping: 32 });
  const headingYRaw = useTransform(scrollYProgress, [0.3, 0.58], [110, -12]);
  const headingY = useSpring(headingYRaw, { stiffness: 110, damping: 32 });
  const headingOpacity = useTransform(scrollYProgress, [0.22, 0.3, 0.82, 1], [0, 1, 1, 0.92]);

  const formOpacityRaw = useTransform(scrollYProgress, [0.58, 0.72, 1], [0, 1, 1]);
  const formOpacity = useSpring(formOpacityRaw, { stiffness: 90, damping: 30 });
  const formYRaw = useTransform(scrollYProgress, [0.58, 0.72], [80, 0]);
  const formY = useSpring(formYRaw, { stiffness: 90, damping: 30 });

  const lockSection = () => {
    isLockedRef.current = true;
    canLockRef.current = true;
    unlockDirectionRef.current = null;
    setIsActive(true);
  };

  const unlockSection = (direction: "up" | "down") => {
    isLockedRef.current = false;
    canLockRef.current = false;
    unlockDirectionRef.current = direction;
    setIsActive(false);
  };

  useLayoutEffect(() => {
    const update = () => {
      if (!textRef.current) return;
      const textWidth = textRef.current.scrollWidth;
      const viewport = window.innerWidth;
      const next = Math.max(0, textWidth + viewport * 1.05);
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

  useEffect(() => {
    const handleWindowScroll = () => {
      if (!containerRef.current) return;
      const { current: element } = containerRef;
      const rect = element.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = Math.abs(elementCenter - viewportCenter);
      const threshold = window.innerHeight * LOCK_THRESHOLD;
      const intersectsCenter = rect.top <= viewportCenter && rect.bottom >= viewportCenter;
      const isOutOfView = rect.bottom < 0 || rect.top > window.innerHeight;
      const passedAbove = rect.bottom < viewportCenter;
      const passedBelow = rect.top > viewportCenter;

      if (isOutOfView) {
        canLockRef.current = true;
        unlockDirectionRef.current = null;
        if (isLockedRef.current) {
          isLockedRef.current = false;
          setIsActive(false);
        }
        return;
      }

      if (!canLockRef.current) {
        const canRelockAfterDown = unlockDirectionRef.current === "down" && passedAbove;
        const canRelockAfterUp = unlockDirectionRef.current === "up" && passedBelow;

        if (canRelockAfterDown || canRelockAfterUp) {
          canLockRef.current = true;
          unlockDirectionRef.current = null;
        }

        if (unlockDirectionRef.current === null && distance > threshold * 1.8) {
          canLockRef.current = true;
        }
      }

      const now = Date.now();
      if (
        canLockRef.current &&
        !isLockedRef.current &&
        intersectsCenter &&
        distance <= threshold &&
        now - lastLockAtRef.current > LOCK_COOLDOWN_MS
      ) {
        lockSection();
        lastLockAtRef.current = now;
        const target =
          window.scrollY +
          rect.top -
          (window.innerHeight / 2 - rect.height / 2);

        window.scrollTo({ top: target, behavior: "smooth" });
      }
    };

    handleWindowScroll();
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    window.addEventListener("resize", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("resize", handleWindowScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onWheel={(event) => {
        if (!containerRef.current) return;
        const { current: element } = containerRef;
        const rect = element.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const intersectsCenter = rect.top <= viewportCenter && rect.bottom >= viewportCenter;
        const atTop = element.scrollTop <= 0;
        const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 1;
        const pageAtTop = window.scrollY <= 1;
        const pageAtBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
        const shouldRelockFromBottom =
          !isLockedRef.current &&
          intersectsCenter &&
          unlockDirectionRef.current === "down" &&
          event.deltaY < 0;
        const shouldRelockFromTop =
          !isLockedRef.current &&
          intersectsCenter &&
          unlockDirectionRef.current === "up" &&
          event.deltaY > 0;

        if (shouldRelockFromBottom || shouldRelockFromTop) {
          lockSection();
          return;
        }

        if (!isLockedRef.current) return;

        const shouldUnlockUp = event.deltaY < 0 && atTop && !pageAtTop;
        const shouldUnlockDown = event.deltaY > 0 && atBottom && !pageAtBottom;

        if (shouldUnlockUp || shouldUnlockDown) {
          unlockSection(event.deltaY > 0 ? "down" : "up");
        }
      }}
      className={`relative h-screen w-full snap-y snap-mandatory overflow-x-hidden bg-neutral-50 text-neutral-950 ${
        isActive ? "overflow-y-scroll" : "overflow-y-hidden"
      }`}
    >
      <section className={`relative w-full ${SECTION_HEIGHT}`}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.14),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(236,72,153,0.16),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(147,197,253,0.12),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/0 to-white/30" />
        <div className="sticky top-0 flex min-h-screen items-center overflow-visible py-8">
          <div className="relative flex min-h-screen w-full items-center justify-center overflow-visible px-4 sm:px-6 md:px-10">
            <motion.p
              ref={textRef}
              style={{ x: xSpring, skewX: skew, opacity: introOpacity, y: introY }}
              className={`absolute top-[16vh] z-10 w-max pr-[20vw] origin-bottom-left whitespace-nowrap text-4xl font-extrabold uppercase leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-400 drop-shadow-[0_8px_24px_rgba(59,130,246,0.25)] will-change-transform sm:text-6xl md:text-8xl md:leading-[0.85] ${INTRO_TEXT_OFFSET}`}
            >
              Creating incredible stuff, every single day.
            </motion.p>
            <motion.p
              style={{ fontSize: headingFontSize, y: headingY, opacity: headingOpacity, lineHeight: 0.9 }}
              className="absolute left-1/2 top-[28vh] z-30 -translate-x-1/2 text-center font-extrabold uppercase tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)] [text-rendering:geometricPrecision] [backface-visibility:hidden] will-change-[font-size,transform,opacity]"
            >
              Be part of it
            </motion.p>
            <motion.div
              style={{ opacity: formOpacity, y: formY }}
              className="absolute left-1/2 top-[42vh] z-40 w-[min(96vw,1240px)] -translate-x-1/2"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
