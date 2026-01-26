"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { useState, useEffect } from "react";

export const Meteors = ({
  number = 20,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const meteors = new Array(number).fill(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-x-0 top-0 z-[0] pointer-events-none overflow-hidden"
      style={{ height: "800px" }} // only at the top of the page
    >
      {meteors.map((_, idx) => {
        const left = Math.random() * width;

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
              animationDelay: Math.random() * 5 + "s",
              animationDuration: `${Math.random() * 5 + 5}s`,
            }}
          />
        );
      })}
    </motion.div>
  );
};
