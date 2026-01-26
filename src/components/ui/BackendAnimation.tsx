"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function BackendAnimation() {
  
  return (
    <motion.div
    >
      <video
        src="/BackendAnimation.mp4"
        autoPlay
        loop
        muted
        playsInline
        className=""
      />
    </motion.div>
  );
}
