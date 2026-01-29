"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const placeholder = useMemo(
    () => words.reduce((longest, word) => (word.length > longest.length ? word : longest), words[0] ?? ""),
    [words]
  );

  // thanks for the fix Julian - https://github.com/Julian-AT
  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating)
      setTimeout(() => {
        startAnimation();
      }, duration);
  }, [isAnimating, duration, startAnimation]);

  return (
    <span
      className={cn(
        "relative inline-block align-baseline text-center text-neutral-900 dark:text-neutral-100 px-2",
        className
      )}
    >
      <span className="invisible block whitespace-nowrap">{placeholder}</span>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          setIsAnimating(false);
        }}
      >
        <motion.span
          key={currentWord}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap"
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
