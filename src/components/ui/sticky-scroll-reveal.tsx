"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
  className,
  sectionClassName,
  textClassName,
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isLockedRef = useRef(false);
  const canLockRef = useRef(true);
  const lastLockAtRef = useRef(0);
  const unlockDirectionRef = useRef<"up" | "down" | null>(null);

  const gradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)",
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
    "linear-gradient(to bottom right, #f97316, #eab308)",
  ];

  const bgGradient = gradients[activeCard % gradients.length];

  const handleScroll = () => {
    if (!containerRef.current) return;
    const sections = containerRef.current.querySelectorAll("section");
    const scrollTop = containerRef.current.scrollTop;
    const containerHeight = containerRef.current.clientHeight;
    const center = scrollTop + containerHeight / 2;
    let currentIndex = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    sections.forEach((section, idx) => {
      const sectionCenter = section.offsetTop + section.clientHeight / 2;
      const distance = Math.abs(center - sectionCenter);
      if (distance < minDistance) {
        minDistance = distance;
        currentIndex = idx;
      }
    });

    setActiveCard(currentIndex);
  };

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

  useEffect(() => {
    const handleWindowScroll = () => {
      if (!containerRef.current) return;
      const { current: element } = containerRef;
      const rect = element.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = Math.abs(elementCenter - viewportCenter);
      const threshold = window.innerHeight * 0.16;
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
        now - lastLockAtRef.current > 700
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
      onScroll={handleScroll}
      onWheel={(e) => {
        if (!containerRef.current) return;
        const { current: el } = containerRef;
        const rect = el.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const intersectsCenter = rect.top <= viewportCenter && rect.bottom >= viewportCenter;
        const atTop = el.scrollTop <= 0;
        const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
        const pageAtTop = window.scrollY <= 1;
        const pageAtBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;

        const shouldRelockFromBottom =
          !isLockedRef.current &&
          intersectsCenter &&
          unlockDirectionRef.current === "down" &&
          e.deltaY < 0;
        const shouldRelockFromTop =
          !isLockedRef.current &&
          intersectsCenter &&
          unlockDirectionRef.current === "up" &&
          e.deltaY > 0;

        if (shouldRelockFromBottom || shouldRelockFromTop) {
          lockSection();
          return;
        }

        if (!isLockedRef.current) return;

        const shouldUnlockUp = e.deltaY < 0 && atTop && !pageAtTop;
        const shouldUnlockDown = e.deltaY > 0 && atBottom && !pageAtBottom;

        if (shouldUnlockUp || shouldUnlockDown) {
          unlockSection(e.deltaY > 0 ? "down" : "up");
        }
      }}
      className={cn(
        "relative w-full h-[80vh] sm:h-screen snap-y snap-mandatory overscroll-contain",
        isActive ? "overflow-y-scroll" : "overflow-y-hidden"
        ,className
      )}
    >
      {content.map((item, idx) => (
        <section
          key={idx}
          className={cn(
            "relative h-screen w-full flex flex-col md:flex-row justify-between items-center px-4 sm:px-8 md:px-20 lg:px-28 snap-center",
            sectionClassName
          )}
        >
          {/* LEFT SIDE SCROLLING TEXT */}
          <div
            className={cn(
              "w-full md:w-[70%] flex flex-col justify-center h-full pb-6 md:pb-0",
              textClassName
            )}
          >
            <div className="flex flex-col justify-center h-full">
              <AnimatePresence mode="wait">
                {activeCard === idx && (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight">
                      {item.title}
                    </h2>
                    <div className="mt-6 md:mt-8 max-w-2xl text-base sm:text-lg md:text-2xl text-slate-300 leading-relaxed">
                      {item.description}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT SIDE STICKY CONTENT */}
          <div className="w-full md:w-[30%] flex items-center justify-center h-full">
            <div className="sticky top-1/2 -translate-y-[42%]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCard}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  style={{ background: bgGradient }}
                  className={cn(
                    "h-[260px] w-[280px] sm:h-[320px] sm:w-[320px] md:h-[480px] md:w-[380px] rounded-2xl shadow-xl overflow-hidden flex items-center justify-center",
                    contentClassName
                  )}
                >
                  {content[activeCard].content}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};
