
"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, animate, useMotionValue, useMotionTemplate } from "framer-motion";
import AuroraHeroClient from "./AuroraHeroClient";

const TypewriterEffect = dynamic(
  () => import("./ui/typewriter-effect").then((m) => m.TypewriterEffect),
  { ssr: false }
);

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"] as string[];
export const AuroraHero = () => {
  // ← Kein <ColorType> und kein as const mehr nötig
  const color = useMotionValue(COLORS_TOP[0]);
  const [showTypewriter, setShowTypewriter] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const animation = animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });

    return () => animation.stop(); // Cleanup
  }, [color]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setShowTypewriter(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const backgroundImage = useMotionTemplate`
    radial-gradient(ellipse 200% 90% at 50% 0%, ${color} 0%, transparent 45%),
    radial-gradient(ellipse 150% 70% at 50% 0%, ${color}60 20%, transparent 70%),
    #020617
  `;

  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative grid min-h-screen w-full place-content-center overflow-hidden bg-black-950 px-5 sm:px-6 py-20 sm:py-24 text-gray-200"
    >
      <div className="relative z-10 flex flex-col items-center pt-20 sm:pt-28 gap-6 sm:gap-8 text-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/14 via-white/8 to-fuchsia-400/14 blur-lg" />
          <span className="relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/14 bg-white/7 px-5 py-2 text-sm font-medium text-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_8px_24px_rgba(15,23,42,0.2)] backdrop-blur-lg">
            <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.06)_38%,rgba(255,255,255,0.02)_60%,rgba(255,255,255,0.1))]" />
            <span className="absolute inset-y-[2px] left-[10%] w-1/4 rounded-full bg-white/12 blur-md" />
            <span className="relative size-2 rounded-full bg-emerald-300/90 shadow-[0_0_10px_rgba(110,231,183,0.55)]" />
            <span className="relative tracking-[0.08em] text-white/90">
              Available for freelance & part-time
            </span>
          </span>
        </div>


        <div className="relative">
          <div className="absolute inset-x-6 top-1/2 h-10 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-400/20 via-fuchsia-400/25 to-pink-400/20 blur-3xl" />
          <h1 className="relative text-4xl font-black uppercase tracking-[0.08em] leading-tight sm:text-5xl md:text-7xl lg:text-8xl">
            <span className="animate-vision-glow bg-[linear-gradient(135deg,#ffffff_0%,#dbeafe_18%,#67e8f9_38%,#c084fc_62%,#f9a8d4_82%,#ffffff_100%)] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(103,232,249,0.2)]">
              Moritz Renner
            </span>
          </h1>
        </div>

        {showTypewriter ? (
          <TypewriterEffect
            words={[
              {
                text: "Development, design and creative technology.",
                className: "text-center md:text-left",
              },
            ]}
          />
        ) : (
          <div className="font-semibold text-center text-lg sm:text-2xl md:text-3xl lg:text-4xl">
            Development, design and creative technology.
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <motion.button
            type="button"
            onClick={() => scrollToSection("contact")}
            style={{ border, boxShadow }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
          >
            Contact me
          </motion.button>

          <motion.button
            type="button"
            onClick={() => scrollToSection("projects")}
            style={{ border, boxShadow }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
          >
            View projects
          </motion.button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-44 overflow-hidden sm:h-52">
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black via-black/75 to-transparent" />
        <svg
          viewBox="0 0 1440 260"
          className="absolute inset-x-0 bottom-0 h-full w-full opacity-75"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="pyramidFillLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(103,232,249,0.18)" />
              <stop offset="100%" stopColor="rgba(15,23,42,0.05)" />
            </linearGradient>
            <linearGradient id="pyramidFillRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(192,132,252,0.16)" />
              <stop offset="100%" stopColor="rgba(15,23,42,0.04)" />
            </linearGradient>
            <linearGradient id="pyramidStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="50%" stopColor="rgba(103,232,249,0.32)" />
              <stop offset="100%" stopColor="rgba(192,132,252,0.18)" />
            </linearGradient>
          </defs>

          <g className="animate-hero-pyramids">
            <g>
              <polygon points="56,260 222,102 222,260" fill="url(#pyramidFillLeft)" stroke="url(#pyramidStroke)" strokeWidth="1.1" />
              <polygon points="222,102 388,260 222,260" fill="url(#pyramidFillRight)" stroke="url(#pyramidStroke)" strokeWidth="1.1" />
              <line x1="222" y1="102" x2="222" y2="260" stroke="rgba(255,255,255,0.14)" strokeWidth="0.9" />
              <line x1="140" y1="181" x2="222" y2="102" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
              <line x1="222" y1="102" x2="304" y2="181" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
            </g>

            <g>
              <polygon points="318,260 544,46 544,260" fill="url(#pyramidFillLeft)" stroke="url(#pyramidStroke)" strokeWidth="1.2" />
              <polygon points="544,46 786,260 544,260" fill="url(#pyramidFillRight)" stroke="url(#pyramidStroke)" strokeWidth="1.2" />
              <line x1="544" y1="46" x2="544" y2="260" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <line x1="431" y1="153" x2="544" y2="46" stroke="rgba(255,255,255,0.09)" strokeWidth="0.85" />
              <line x1="544" y1="46" x2="665" y2="153" stroke="rgba(255,255,255,0.09)" strokeWidth="0.85" />
            </g>

            <g>
              <polygon points="742,260 930,128 930,260" fill="url(#pyramidFillLeft)" stroke="url(#pyramidStroke)" strokeWidth="1" />
              <polygon points="930,128 1110,260 930,260" fill="url(#pyramidFillRight)" stroke="url(#pyramidStroke)" strokeWidth="1" />
              <line x1="930" y1="128" x2="930" y2="260" stroke="rgba(255,255,255,0.11)" strokeWidth="0.8" />
              <line x1="836" y1="194" x2="930" y2="128" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7" />
              <line x1="930" y1="128" x2="1020" y2="194" stroke="rgba(255,255,255,0.07)" strokeWidth="0.7" />
            </g>

            <g>
              <polygon points="1036,260 1214,82 1214,260" fill="url(#pyramidFillLeft)" stroke="url(#pyramidStroke)" strokeWidth="1.1" />
              <polygon points="1214,82 1394,260 1214,260" fill="url(#pyramidFillRight)" stroke="url(#pyramidStroke)" strokeWidth="1.1" />
              <line x1="1214" y1="82" x2="1214" y2="260" stroke="rgba(255,255,255,0.13)" strokeWidth="0.9" />
              <line x1="1125" y1="171" x2="1214" y2="82" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75" />
              <line x1="1214" y1="82" x2="1304" y2="171" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75" />
            </g>
          </g>
        </svg>
      </div>

      {/* 3D Stars (lazy) */}
      <div className="absolute inset-0 z-0">
        <AuroraHeroClient />
      </div>
    </motion.section>
  );
};

export default AuroraHero;
