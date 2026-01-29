"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Skills = dynamic(() => import("./ui/Skills").then((m) => m.Skills), {
  ssr: false,
  loading: () => <div className="min-h-screen" />,
});

export default function SkillsClient() {
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
      { rootMargin: "400px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [shouldRender]);

  return <div ref={containerRef}>{shouldRender ? <Skills /> : null}</div>;
}
