
"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
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
      className="relative grid min-h-screen w-screen place-content-center overflow-hidden bg-black-950 px-4 py-24 text-gray-200"
    >
      <div className="relative z-10 flex flex-col items-center pt-20 gap-8 text-center">
        <span className="rounded-full bg-gray-800/60 px-5 py-2 text-sm font-medium backdrop-blur-md">
          Available for freelance & part-time
        </span>


        <h1 className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-5xl font-black leading-tight text-transparent sm:text-6xl md:text-7xl lg:text-8xl">
          Moritz Renner
        </h1>

        {showTypewriter ? (
          <TypewriterEffect
            words={[
              {
                text:
                  "Full Stack Developer aus Deutschland – Next.js · TypeScript · Node.js · React · Tailwind",
                className: "text-center md:text-left",
              },
            ]}
          />
        ) : (
          <div className="font-semibold text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Full Stack Developer from Germany – Next.js · Node.js · React · And much more
          </div>
        )}


        <motion.button
          style={{ border, boxShadow }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-4 rounded-full bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
        >
          Let’s work together
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-2" />
        </motion.button>
      </div>

      {/* 3D Stars (lazy) */}
      <div className="absolute inset-0 z-0">
        <AuroraHeroClient />
      </div>
    </motion.section>
  );
};

export default AuroraHero;
