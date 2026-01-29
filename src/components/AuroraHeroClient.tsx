"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const AuroraHeroStars = dynamic(() => import("./AuroraHeroStars"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
  ),
});

export default function AuroraHeroClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!containerRef.current || shouldRender) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-black/70 to-black" />
      <div className="absolute inset-0 pointer-events-none [background:radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.25),transparent_45%),radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.2),transparent_50%)]" />
      {shouldRender ? <AuroraHeroStars /> : null}
    </div>
  );
}
