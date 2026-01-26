"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: { name: string; link: string; icon?: JSX.Element }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [initialDelay, setInitialDelay] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => setInitialDelay(false), 800);
    return () => clearTimeout(timeout);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number" && !initialDelay) {
      const direction = current - scrollYProgress.getPrevious()!;
      if (current < 0.02) setVisible(true);
      else setVisible(direction < 0);
    }
  });

  const handleClick = (link: string) => {
    if (link.startsWith("#")) {
      const id = link.substring(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(link);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className={cn(
          "flex fixed top-10 left-1/2 -translate-x-1/2 z-[5000] items-center justify-center space-x-6 rounded-full dark:bg-black bg-white border border-gray-300 dark:border-white/20 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] pr-6 pl-6 py-3",
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          <button
            key={`link-${idx}`}
            onClick={() => handleClick(navItem.link)}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-2 text-neutral-700 dark:hover:text-neutral-300 hover:text-neutral-500 text-base font-semibold"
            )}
          >
            {navItem.icon && <span className="block sm:hidden">{navItem.icon}</span>}
            <span className="hidden sm:block">{navItem.name}</span>
          </button>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
