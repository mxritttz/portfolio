"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function EComAnimation() {
  
  return (
    <motion.div
    >
      <video
        src="/EComAnimation.mp4"
        autoPlay
        loop
        muted
        playsInline
        className=""
      />
    </motion.div>
  );
}
