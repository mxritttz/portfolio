
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
            <span className="bg-[linear-gradient(135deg,#ffffff_0%,#dbeafe_18%,#67e8f9_38%,#c084fc_62%,#f9a8d4_82%,#ffffff_100%)] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(103,232,249,0.2)]">
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

      {/* 3D Stars (lazy) */}
      <div className="absolute inset-0 z-0">
        <AuroraHeroClient />
      </div>
    </motion.section>
  );
};

export default AuroraHero;
