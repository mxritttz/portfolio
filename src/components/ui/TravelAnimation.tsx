"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function TravelAnimation() {
  
  return (
    <motion.div
    >
      <video
        src="/TravelAnimation.mp4"
        autoPlay
        loop
        muted
        playsInline
        className=""
      />
    </motion.div>
  );
}
