"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { useMemo, useRef, useState, useEffect } from "react";

export const Meteors = ({
  number = 20,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [width, setWidth] = useState(0);
  const [mounted, setMounted] = useState(false);
  const seedRef = useRef(Math.random());

  useEffect(() => {
    setMounted(true);
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const meteors = useMemo(() => new Array(number).fill(true), [number]);
  const random = useMemo(() => {
    let seed = Math.floor(seedRef.current * 1_000_000) || 1;
    return () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-x-0 top-0 z-[0] pointer-events-none overflow-hidden"
      style={{ height: "800px" }} // only at the top of the page
    >
      {meteors.map((_, idx) => {
        const left = random() * width;

        return (
          <span
            key={"meteor-" + idx}
            className={cn(
              "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-1/2 before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
              className
            )}
            style={{
              top: "-40px",
              left: `${left}px`,
              animationDelay: random() * 7 + "s",
              animationDuration: `${random() * 7 + 9}s`,
            }}
          />
        );
      })}
    </motion.div>
  );
};
