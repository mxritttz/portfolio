"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function FrontendAnimation() {
  
  return (
    <motion.div
    >
      <video
        src="/FrontendAnimation.mp4"
        autoPlay
        loop
        muted
        playsInline
        className=""
      />
    </motion.div>
  );
}
