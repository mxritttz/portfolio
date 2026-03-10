"use client";
import React, { useEffect, useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);
  const isLockedRef = useRef(false);
  const canLockRef = useRef(true);
  const animFrameRef = useRef<number | null>(null);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const handleWindowScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = Math.abs(elementCenter - viewportCenter);
      const threshold = window.innerHeight * 0.45;
      const intersectsCenter = rect.top <= viewportCenter && rect.bottom >= viewportCenter;

      const isOutOfView = rect.bottom < 0 || rect.top > window.innerHeight;
      if (isOutOfView) {
        isLockedRef.current = false;
        return;
      }

      if (!canLockRef.current && distance > threshold * 1.6) {
        canLockRef.current = true;
      }

      if (canLockRef.current && !isLockedRef.current && (intersectsCenter || distance <= threshold)) {
        isLockedRef.current = true;
        canLockRef.current = false;
        const start = window.scrollY;
        const target =
          start + rect.top - (window.innerHeight / 2 - rect.height / 2);
        const duration = 500;
        const startTime = performance.now();

        const easeInOut = (t: number) =>
          t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

        const step = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / duration);
          const eased = easeInOut(progress);
          window.scrollTo(0, start + (target - start) * eased);
          if (progress < 1) {
            animFrameRef.current = requestAnimationFrame(step);
          } else {
            isLockedRef.current = false;
          }
        };

        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
        }
        animFrameRef.current = requestAnimationFrame(step);
      }
    };

    handleWindowScroll();
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    window.addEventListener("resize", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("resize", handleWindowScroll);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      className="h-full md:h-full w-full flex items-center justify-center relative p-2 sm:p-8 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 sm:py-20 md:py-40 w-full relative h-full"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-7xl -mt-6 sm:-mt-12 mx-auto h-[32rem] sm:h-[38rem] md:h-[46rem] w-full border-4 border-[#6C6C6C] p-2 md:p-4 bg-[#000000] rounded-[30px] shadow-2xl"
    >
      <div className=" h-full w-full  overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl  ">
        {children}
      </div>
    </motion.div>
  );
};
