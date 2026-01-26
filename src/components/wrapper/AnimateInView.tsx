// components/AnimateInView.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AnimateInView({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn("w-full h-full", className)}   // ✅ keeps sizing chain intact
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
