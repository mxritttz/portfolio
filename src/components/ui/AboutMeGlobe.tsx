"use client";

import { Globe } from "./globe";

export function AboutMeGlobe() {
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden rounded-[inherit] border-0 bg-transparent px-10 pt-6 pb-6 md:px-14 md:pt-8 md:pb-8">
      <span className="pointer-events-none absolute top-5 z-10 max-w-[80%] bg-linear-to-b from-white to-white/15 bg-clip-text text-center text-3xl leading-[0.92] font-semibold text-transparent md:top-7 md:max-w-[72%] md:text-5xl">
        Working across{"\n"}time zones
      </span>
      <Globe className="top-20 scale-110 md:top-24 md:scale-115" />
    </div>
  );
}
