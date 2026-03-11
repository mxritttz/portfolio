"use client";

import { motion } from "motion/react";
import { Globe } from "./globe";

export function AboutMeGlobe() {
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden rounded-[inherit] border-0 bg-transparent px-10 pt-6 pb-6 md:px-14 md:pt-8 md:pb-8">
      <svg
        viewBox="0 0 100 24"
        className="pointer-events-none absolute top-4 z-10 h-10 w-[82%] max-w-[460px] overflow-visible md:top-5 md:h-12"
        aria-hidden="true"
      >
        {[
          "M6 18 Q20 2 33 13",
          "M33 13 Q50 2 66 11",
          "M33 13 Q55 25 94 7",
        ].map((path, index) => (
          <motion.path
            key={path}
            d={path}
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeDasharray="3 3"
            initial={{ pathLength: 0.15, opacity: 0.2 }}
            animate={{ pathLength: 1, opacity: 0.75 }}
            transition={{
              duration: 2,
              delay: index * 0.15,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        ))}
        {[
          { cx: 6, cy: 18 },
          { cx: 33, cy: 13 },
          { cx: 66, cy: 11 },
          { cx: 94, cy: 7 },
        ].map((point) => (
          <g key={`${point.cx}-${point.cy}`}>
            <circle cx={point.cx} cy={point.cy} r="1.6" fill="rgba(251,100,21,0.95)" />
            <circle
              cx={point.cx}
              cy={point.cy}
              r="3.4"
              fill="none"
              stroke="rgba(251,100,21,0.35)"
              strokeWidth="0.5"
            />
          </g>
        ))}
      </svg>
      <span className="pointer-events-none absolute top-5 z-10 max-w-[80%] bg-linear-to-b from-white to-white/15 bg-clip-text text-center text-3xl leading-[0.92] font-semibold text-transparent md:top-7 md:max-w-[72%] md:text-5xl">
        Working across{"\n"}time zones
      </span>
      <Globe className="top-20 scale-110 md:top-24 md:scale-115" />
    </div>
  );
}
