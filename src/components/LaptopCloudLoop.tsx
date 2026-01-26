"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LaptopCloudLoop() {
  return (
    <motion.div
      className="pointer-events-none absolute z-50 inset-0 flex items-center justify-center"
      animate={{
        x: [0, 20, -15, 10, 0],   // kleinere horizontale Bewegung
        y: [0, -15, 10, -10, 0],  // kleinere vertikale Bewegung
        rotate: [0, 3, -2, 2, 0], // sanftere Rotation
        scale: [1, 1.02, 0.99, 1.01, 1], // leichte Skalierung
      }}
      transition={{
        duration: 26,  // langsam und smooth
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <video
        src="/1204.mov"
        autoPlay
        loop
        muted
        playsInline
        className="w-1/6 h-auto -translate-y-40 -translate-x-120"
      />
    </motion.div>
  );
}
