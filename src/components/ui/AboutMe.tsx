"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { motion } from "motion/react";
import { GlowingEffect } from "./glowing-effect";
import { GlowingHeading } from "./GlowingHeading";
import IPhone from "./iPhone";
import Link from "next/link";
import { ThreeDMarquee } from "./3d-marquee";
import { marqueeImages } from "@/lib/marquee-images";
import { AboutMeGlobe } from "./AboutMeGlobe";


 


const images = marqueeImages;
 
export function AboutMe() {
  return (
    <section className="relative w-full">
      
      {/* Background Transition Layer */}
      <div
        className="
          absolute inset-x-0
          bottom-[-25vh] sm:bottom-[-35vh] md:bottom-[-45vh]
          h-[40vh] sm:h-[50vh] md:h-[60vh]
          z-0
          pointer-events-none
          opacity-20 sm:opacity-30 md:opacity-40
        "
      >
        <ThreeDMarquee images={images} />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 overflow-hidden">
        <GlowingHeading />

        <BentoGrid className="
          w-full max-w-none
          px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-44
          gap-4 sm:gap-5
          md:auto-rows-[18.5rem]
        ">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={cn("[&>p:text-lg]", item.className)}
              containerClassName={item.containerClassName}
              headerClassName={item.headerClassName}
              contentClassName={item.contentClassName}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </div>

    </section>
  );
}


const SkeletonOne = () => {
  return (
    <div className="flex h-full w-full flex-col items-center rounded-2xl px-4 pt-4 pb-4 text-center">
      <div className="relative flex min-h-0 w-full flex-[0_0_75%] items-start justify-center">
        <div className="absolute inset-x-10 bottom-6 h-14 rounded-full bg-cyan-400/10 blur-2xl" />
        <video
          preload="metadata"
          autoPlay
          loop
          muted
          playsInline
          className="relative h-full max-h-full w-auto max-w-full rounded-2xl object-contain"
          src="/1204.mov"
        >
        </video>
      </div>

      <div className="mt-4 flex-[0_0_25%] space-y-3">
        <p className="text-[11px] uppercase tracking-[0.28em] text-neutral-500">
          About me
        </p>
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Building across code, design and digital creativity.
        </h3>
      </div>
    </div>
  );
};
const SkeletonTwo2 = () => {
  return (
    <motion.div className="relative w-full h-full min-h-[26rem] sm:min-h-[32rem] md:min-h-[38rem] flex items-start justify-center">
      <IPhone wrapperClassName="-translate-y-4 scale-[0.92] py-0 sm:-translate-y-5 sm:scale-[0.91] md:-translate-y-6 md:scale-[0.9]" />
    </motion.div>
  );
};










const SkeletonThree = () => {
  return (
    <motion.div className="relative h-full w-full flex flex-col items-center justify-center p-6 text-center gap-6">
      <div className="absolute right-4 top-4 scale-[0.68] origin-top-right opacity-80 sm:scale-[0.74]">
        <div className="relative flex h-20 w-24 items-center justify-center [perspective:1100px]">
          <div className="absolute inset-y-1 left-1/2 w-[2px] -translate-x-1/2 rounded-full bg-white/12" />
          <div className="absolute inset-0 rounded-[18px] bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 blur-xl" />
          <div className="absolute inset-y-0 left-[10px] w-[44px] rounded-l-[14px] rounded-r-[6px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_20px_rgba(0,0,0,0.25)]" />
          <div className="absolute inset-y-[7px] left-[17px] w-[30px] rounded-l-[9px] rounded-r-[4px] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(226,232,240,0.52))]" />
          <div className="absolute inset-y-0 right-[10px] w-[44px] rounded-r-[14px] rounded-l-[6px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_20px_rgba(0,0,0,0.2)]" />
          <div className="absolute inset-y-[7px] right-[17px] w-[30px] rounded-r-[9px] rounded-l-[4px] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(226,232,240,0.52))]" />
          <div className="absolute inset-y-[12px] right-[22px] w-[20px] space-y-1.5 opacity-55">
            <div className="h-[2px] rounded-full bg-slate-500/35" />
            <div className="h-[2px] rounded-full bg-slate-500/28" />
            <div className="h-[2px] w-4/5 rounded-full bg-slate-500/22" />
          </div>
          <motion.div
            className="absolute inset-y-0 left-1/2 w-[40px] origin-left"
            animate={{ rotateY: [0, -152, 0] }}
            transition={{ duration: 7.2, times: [0, 0.45, 1], ease: "easeInOut", repeat: Infinity, repeatDelay: 2.2 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 rounded-[12px] border border-white/12 bg-[linear-gradient(180deg,rgba(241,245,249,0.96),rgba(203,213,225,0.82))] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_20px_rgba(0,0,0,0.25)] [backface-visibility:hidden]" />
            <div className="absolute inset-y-[7px] right-[6px] left-[6px] rounded-[8px] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(226,232,240,0.78))] [backface-visibility:hidden]" />
            <div className="absolute inset-y-[12px] left-[12px] right-[12px] space-y-1.5 opacity-70 [backface-visibility:hidden]">
              <div className="h-[2px] rounded-full bg-slate-500/50" />
              <div className="h-[2px] rounded-full bg-slate-500/35" />
              <div className="h-[2px] w-3/4 rounded-full bg-slate-500/30" />
            </div>
            <div
              className="absolute inset-0 rounded-[12px] border border-slate-200/85 bg-[linear-gradient(180deg,rgba(248,250,252,0.98),rgba(226,232,240,0.9))] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]"
              style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
            >
              <div className="absolute inset-y-[10px] left-[10px] right-[10px] space-y-1.5 opacity-60">
                <div className="h-[2px] rounded-full bg-slate-500/40" />
                <div className="h-[2px] rounded-full bg-slate-500/32" />
                <div className="h-[2px] w-4/5 rounded-full bg-slate-500/24" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Big Signal */}
      <div>
        <p className="text-xs uppercase tracking-widest text-neutral-500">
          Education
        </p>
        <h3 className="mt-2 text-2xl font-semibold">
          Media Informatics
        </h3>
      </div>

      {/* Visual Status */}
      <div className="flex gap-2 flex-wrap justify-center">
        <span className="px-3 py-1 rounded-full text-xs bg-cyan-500/10 text-cyan-600">
          Bachelor completed
        </span>
        <span className="px-3 py-1 rounded-full text-xs bg-neutral-500/10 text-neutral-500">
          Master planned
        </span>
        <span className="px-3 py-1 rounded-full text-xs bg-purple-500/10 text-purple-500">
          Research-oriented
        </span>
      </div>

      {/* CTA */}
     <Link href="/CV" className="text-sm text-neutral-500">
        View academic journey →
      </Link>

    </motion.div>
  );
};



const SkeletonFour = () => {
  return (
    <motion.div className="w-full h-full relative">
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <AboutMeGlobe />
      </div>
    </motion.div>
  );
};


 
const SkeletonFive = () => {
  return (
    <motion.div className="relative h-full w-full p-6 flex flex-col items-center justify-center text-center gap-6">
      <div className="absolute right-4 top-4 flex h-14 w-20 items-end justify-center gap-1.5 rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm">
        {[
          { height: "36%", delay: 0 },
          { height: "62%", delay: 0.2 },
          { height: "82%", delay: 0.45 },
          { height: "52%", delay: 0.3 },
        ].map((bar, index) => (
          <motion.span
            key={`build-bar-${index}`}
            className="w-2 rounded-full bg-gradient-to-t from-cyan-400 via-sky-300 to-purple-400 shadow-[0_0_10px_rgba(56,189,248,0.2)]"
            style={{ height: bar.height }}
            animate={{ scaleY: [0.92, 1.08, 0.92], opacity: [0.72, 1, 0.72] }}
            transition={{
              duration: 3.8,
              delay: bar.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Big Signal */}
      <div>
        <p className="text-xs uppercase tracking-widest text-neutral-500">
          Projects
        </p>
        <h3 className="mt-2 text-2xl font-semibold">
          Real-world builds
        </h3>
      </div>

      {/* Visual Counters */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-xs text-center">
        <div className="flex flex-col items-center">
          <p className="text-3xl font-semibold">10+</p>
          <p className="text-xs text-neutral-500">Web Apps</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-3xl font-semibold">3</p>
          <p className="text-xs text-neutral-500">No-Code Platforms</p>
        </div>
      </div>

      {/* CTA */}
      <span
        className="text-sm text-neutral-500 cursor-pointer"
        onClick={() => {
        const el = document.getElementById("projects");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        >
           Explore projects →
      </span>


    </motion.div>
  );
};

const SkeletonFive2 = () => {
  return (
    <motion.div
      className="relative w-full h-full min-h-[18rem] overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Top label stays fixed */}
      <div className="relative z-10 pt-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">
          Passion
        </p>
      </div>

      {/* Subtle ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-48 h-48 bg-cyan-400/6 rounded-full blur-3xl" />
        <div className="w-40 h-40 bg-purple-400/6 rounded-full blur-3xl absolute -translate-x-8 translate-y-6" />
        <div className="w-32 h-32 bg-pink-400/5 rounded-full blur-3xl absolute translate-x-10 -translate-y-6" />
      </div>

      {/* Perfect center claim */}
      <div className="absolute inset-0 grid place-items-center text-center px-6">
        <h3 className="text-3xl md:text-4xl font-semibold text-black dark:text-white leading-tight">
          Turning{" "}
          <span className="animate-vision-glow font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-purple-400 drop-shadow-[0_0_16px_rgba(56,189,248,0.4)]">
            vision
          </span>{" "}
          into reality.
        </h3>
      </div>
    </motion.div>
  );
};






const items = [
  {
   // title: "Hey my name is Moritz",
    //description: (
     // <span className="text-sm">
     //   I am a full stack developer from Germany. I also do video editing, social media and music production.🤗 
     // </span>
    //),
    header: <SkeletonOne />,
    className: "md:col-span-1 md:row-span-2",
    containerClassName: "p-0 overflow-hidden",
    headerClassName: "h-full mb-0",
    contentClassName: "hidden",
    icon: "",
  },
  {
   /*  title: "Automated Proofreading",
    description: (
      <span className="text-sm">
        Let AI handle the proofreading of your documents.
      </span>
    ), */
    header: <SkeletonTwo2 />,
    className: "md:col-span-1 md:row-span-2",
    containerClassName: "p-0 overflow-hidden",
    headerClassName: "h-full mb-0",
    contentClassName: "hidden",
    icon: "",
  },
  {
  /*   title: "Contextual Suggestions",
    description: (
      <span className="text-sm">
        Get AI-powered suggestions based on your writing context.
      </span>
    ), */
    header: <SkeletonThree />,
    className: "md:col-span-1",
   // icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
    {
   /*  title: "Text Summarization",
    description: (
      <span className="text-sm">
        Summarize your lengthy documents with AI technology.
      </span>
    ), */
    header: <SkeletonFive />,
    className: "md:col-span-1",
   // icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
  {
   /*  title: "Text Summarization",
    description: (
      <span className="text-sm">
        Summarize your lengthy documents with AI technology.
      </span>
    ), */
    header: <SkeletonFive2 />,
    className: "md:col-span-1 md:h-full",
    containerClassName:
      "bg-black/35 dark:bg-black/45 border-4 border-neutral-200/50 dark:border-white/10 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]",
   // icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
  {
   /*  title: "Sentiment Analysis",
    description: (
      <span className="text-sm">
        Understand the sentiment of your text with AI analysis.
      </span>
    ), */
    header: <SkeletonFour />,
    className: "md:col-span-2",
    containerClassName:
      "bg-black/35 dark:bg-black/45 border-4 border-neutral-200/50 dark:border-white/10 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-0 pb-0 overflow-hidden",
    headerClassName: "h-full mb-0",
    contentClassName: "hidden",
   // icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];
