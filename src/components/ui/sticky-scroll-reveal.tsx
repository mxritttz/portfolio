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
  const containerRef = useRef<any>(null);
  const isLockedRef = useRef(false);
  const canLockRef = useRef(true);
  const lastScrollTopRef = useRef(0);
  const lastLockAtRef = useRef(0);

  const gradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)",
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
    "linear-gradient(to bottom right, #f97316, #eab308)",
  ];

  const skillWords = [
    "BUILD",
    "DESIGN",
    "DO",
    "LOVE",
    "CARE ABOUT",
    "THINK",
    "CREATE",
    "EXPLORE",
    "IMAGINE",
    "BELIEVE IN",
    "DREAM ABOUT",
  ];

  const [bgGradient, setBgGradient] = useState(gradients[0]);

  useEffect(() => {
    setBgGradient(gradients[activeCard % gradients.length]);
  }, [activeCard]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const sections = containerRef.current.querySelectorAll("section");
    const scrollTop = containerRef.current.scrollTop;
    const containerHeight = containerRef.current.clientHeight;
    const center = scrollTop + containerHeight / 2;
    let currentIndex = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    sections.forEach((section: any, idx: number) => {
      const sectionCenter = section.offsetTop + section.clientHeight / 2;
      const distance = Math.abs(center - sectionCenter);
      if (distance < minDistance) {
        minDistance = distance;
        currentIndex = idx;
      }
    });

    setActiveCard(currentIndex);
    lastScrollTopRef.current = scrollTop;
  };

  useEffect(() => {
    const handleWindowScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = Math.abs(elementCenter - viewportCenter);
      const threshold = window.innerHeight * 0.16;
      const intersectsCenter = rect.top <= viewportCenter && rect.bottom >= viewportCenter;

      const isOutOfView = rect.bottom < 0 || rect.top > window.innerHeight;
      if (isOutOfView) {
        canLockRef.current = true;
        if (isLockedRef.current) {
          isLockedRef.current = false;
          setIsActive(false);
        }
        return;
      }

      if (!canLockRef.current && distance > threshold * 1.8) {
        canLockRef.current = true;
      }

      const now = Date.now();
      if (
        canLockRef.current &&
        !isLockedRef.current &&
        intersectsCenter &&
        distance <= threshold &&
        now - lastLockAtRef.current > 700
      ) {
        isLockedRef.current = true;
        setIsActive(true);
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
        if (!containerRef.current || !isLockedRef.current) return;
        const el = containerRef.current;
        const atTop = el.scrollTop <= 0;
        const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
        if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
          isLockedRef.current = false;
          canLockRef.current = false;
          setIsActive(false);
        }
      }}
      className={cn(
        "relative w-full h-screen snap-y snap-mandatory",
        isActive ? "overflow-y-scroll" : "overflow-y-hidden"
        ,className
      )}
    >
      {content.map((item, idx) => (
        <section
          key={idx}
          className={cn(
            "relative h-screen w-full flex justify-between items-center px-10 md:px-20 lg:px-28 snap-center",
            sectionClassName
          )}
        >
          {/* LEFT SIDE SCROLLING TEXT */}
          <div
            className={cn(
              "w-[70%] flex flex-col justify-center h-full",
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
                    <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
                      {item.title}
                    </h2>
                    <p className="mt-8 max-w-2xl text-2xl text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT SIDE STICKY CONTENT */}
          <div className="w-[30%] flex items-center justify-center h-full">
            <div className="sticky top-1/2 -translate-y-1/2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCard}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  style={{ background: bgGradient }}
                  className={cn(
                    "h-[480px] w-[380px] rounded-2xl shadow-xl overflow-hidden flex items-center justify-center",
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
