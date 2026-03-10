"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function TravelAnimation() {
  return (
    <motion.div className="w-full flex items-center justify-center">
      <video
        preload="metadata"
        src="/TravelAnimation.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-[70vw] sm:w-[50vw] md:w-[28vw] max-w-[360px] rounded-2xl shadow-xl"
      />
    </motion.div>
  );
}
