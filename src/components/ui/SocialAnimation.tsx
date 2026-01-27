"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function SocialAnimation() {
  
  return (
    <motion.div
    >
      <video preload="metadata" src="/SocialAnimation.mp4"
        autoPlay
        loop
        muted
        playsInline
        className=""
      />
    </motion.div>
  );
}
