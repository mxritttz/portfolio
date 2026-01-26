"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({ content, contentClassName }) => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<any>(null);

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
    let currentIndex = 0;

    sections.forEach((section: any, idx: number) => {
      if (scrollTop >= section.offsetTop - section.clientHeight / 2) {
        currentIndex = idx;
      }
    });

    setActiveCard(currentIndex);
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={cn(
        "relative w-full h-screen overflow-y-scroll snap-y snap-mandatory"
      )}
    >
      {content.map((item, idx) => (
        <section
          key={idx}
          className={cn(
            "relative h-screen w-full flex justify-between items-center px-10 md:px-20 lg:px-28 snap-center"
          )}
        >
          {/* LEFT SIDE SCROLLING TEXT */}
          <div className="w-[70%] flex flex-col justify-center h-full">
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
