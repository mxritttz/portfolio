"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { motion } from "motion/react";
import { GlowingEffect } from "./glowing-effect";
import WorldMap from "./world-map";
import { GlowingHeading } from "./GlowingHeading";
import IPhone from "./iPhone";
import Link from "next/link";
import { ThreeDMarquee } from "./3d-marquee";
import { marqueeImages } from "@/lib/marquee-images";


 


const images = marqueeImages;
 
export function AboutMe() {
  return (
    <section className="relative w-full">
      
      {/* Background Transition Layer */}
      <div
        className="
          absolute inset-x-0
          bottom-[-45vh]
          h-[60vh]
          z-0
          pointer-events-none
          opacity-40
        "
      >
        <ThreeDMarquee images={images} />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 overflow-hidden">
        <GlowingHeading />

        <BentoGrid className="
          w-full max-w-none
          px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-44
          md:auto-rows-[20rem]
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
    // Das ist alles. Nur ein div mit voller Höhe + Video drin
    <div className="w-full h-full relative overflow-hidden rounded-2xl">
      <video preload="metadata" src="/LaptopLoop.webm"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover rounded-2xl"
      />
    </div>
  );
};
const SkeletonTwo2 = () => {
  return (
    <motion.div className="relative w-full h-full min-h-[38rem]">
      <IPhone />
    </motion.div>
  );
};










const SkeletonThree = () => {
  return (
    <motion.div className="h-full w-full flex flex-col items-center justify-center p-6 text-center gap-6">
      
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
      {/* Overlay Text */}
      <motion.div
        className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-center px-4 py-2 bg-black/50 dark:bg-white/20 rounded-xl backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-white dark:text-cyan-400 text-lg md:text-xl font-semibold drop-shadow-lg">
          Working across time zones 🌐
        </p>
        <p className="text-white/80 dark:text-cyan-200/70 text-sm mt-1 drop-shadow">
          Building projects wherever I go — flexible & international
        </p>
      </motion.div>

      {/* Map */}
      <div className="absolute inset-x-0 bottom-0 h-[70%] md:h-[75%]">
        <WorldMap
          className="w-full h-full"
          dots={[
            { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: 34.0522, lng: -118.2437 } },
            { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: -15.7975, lng: -47.8919 } },
            { start: { lat: -15.7975, lng: -47.8919 }, end: { lat: 38.7223, lng: -9.1393 } },
            { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 28.6139, lng: 77.209 } },
            { start: { lat: 28.6139, lng: 77.209 }, end: { lat: 43.1332, lng: 131.9113 } },
            { start: { lat: 28.6139, lng: 77.209 }, end: { lat: -1.2921, lng: 36.8219 } },
          ]}
        />
      </div>
    </motion.div>
  );
};


 
const SkeletonFive = () => {
  return (
    <motion.div className="h-full w-full p-6 flex flex-col items-center justify-center text-center gap-6">

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
        <div className="w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="w-40 h-40 bg-purple-400/10 rounded-full blur-3xl absolute -translate-x-8 translate-y-6" />
        <div className="w-32 h-32 bg-pink-400/10 rounded-full blur-3xl absolute translate-x-10 -translate-y-6" />
      </div>

      {/* Perfect center claim */}
      <div className="absolute inset-0 grid place-items-center text-center px-6">
        <h3 className="text-3xl md:text-4xl font-semibold text-black dark:text-white leading-tight">
          Turning{" "}
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
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
    className: "md:col-span-1 row-span-2",
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
      "bg-black/35 dark:bg-black/45 border-4 border-neutral-200/50 dark:border-white/10 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-0 overflow-hidden",
    headerClassName: "h-full mb-0",
    contentClassName: "hidden",
   // icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];
