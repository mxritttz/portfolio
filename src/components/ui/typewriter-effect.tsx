"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
  speed = 40,
  loopDelay = 10000,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
  speed?: number;
  loopDelay?: number;
}) => {
  const fullText = words.map((w) => w.text).join("");
  const [index, setIndex] = useState(0);

  // Typewriter animation
  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, fullText, speed]);

  // Restart animation every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(0);
    }, loopDelay);

    return () => clearInterval(interval);
  }, [loopDelay]);

  return (
    <div
      className={cn(
        // ⬇️ GRÖSSERE SCHRIFT
        "font-semibold text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl",
        className
      )}
    >
      <span className="whitespace-pre-wrap">
        {fullText.slice(0, index)}
      </span>

      {/* Cursor */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block ml-[2px] w-[3px] h-[1em] align-bottom bg-blue-500",
          cursorClassName
        )}
      />
    </div>
  );
};
