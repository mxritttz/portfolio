"use client";

import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import React, { useRef, useEffect } from "react";

export const SideScroll = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const x = useMotionValue(0);
  const velocity = useVelocity(scrollYProgress);

  // Dezenter Skew-Effekt
  const skewX = useTransform(velocity, [-0.3, 0.3], ["5deg", "-5deg"]);
  const skew = useSpring(skewX, { mass: 1, stiffness: 20, damping: 15 });

  // Sanfteres Scrollen
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -1500]);
  const xSpring = useSpring(xRaw, { mass: 1, stiffness: 30, damping: 20 });

  useEffect(() => {
    const unsubscribe = xSpring.onChange((v) => x.set(v));
    return () => unsubscribe();
  }, [xSpring, x]);

  return (
    <section
      ref={targetRef}
      className="h-[1000vh] bg-neutral-50 text-neutral-950 max-w-full"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.p
          style={{ x, skewX: skew }}
          className="origin-bottom-left whitespace-nowrap text-6xl md:text-8xl font-extrabold uppercase leading-[0.9] md:leading-[0.85]"
        >
          Creating incredible stuff, every single day.
        </motion.p>
      </div>
    </section>
  );
};
