"use client";

import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export default function AuroraHeroStars() {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Stars radius={50} count={3000} factor={4} saturation={0} fade speed={2} />
    </Canvas>
  );
}
