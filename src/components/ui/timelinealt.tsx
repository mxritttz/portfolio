"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const TimelineAlt = ({ data }: { data: TimelineEntry[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // ✅ correct height calculation
  useEffect(() => {
    if (!timelineRef.current) return;

    const updateHeight = () => {
      setHeight(timelineRef.current!.scrollHeight);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    window.addEventListener("load", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("load", updateHeight);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], [0, height]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
    >
      {/* HEADER */}
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white">
          This is what happened so far
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
          A timeline of my journey.
        </p>
      </div>

      {/* TIMELINE */}
      <div
        ref={timelineRef}
        className="relative max-w-7xl mx-auto pb-20"
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-20 md:pt-40 md:gap-10"
          >
            {/* LEFT COLUMN — ALWAYS STICKY */}
            <div className="sticky top-40 z-30 flex items-center max-w-xs md:w-full">
              <div className="absolute left-3 w-10 h-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700" />
              </div>

              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500">
                {item.title}
              </h3>
            </div>

            {/* CONTENT */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 font-bold text-neutral-500">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* 🔵 BLUE ANIMATED LINE ONLY */}
        <motion.div
          style={{
            height: lineHeight,
            opacity: lineOpacity,
          }}
          className="absolute left-8 top-0 w-[2px] bg-gradient-to-b from-purple-500 via-blue-500 to-transparent rounded-full"
        />
      </div>
    </div>
  );
};
