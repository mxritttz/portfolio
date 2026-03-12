"use client";
import React from "react";
import { FlipWords } from "./flip-words";
import { StickyScroll } from "./sticky-scroll-reveal";
import { SkillBars } from "./SkillBars";
import AIAnimation from "./AIAnimation";
import FrontendAnimation from "./FrontendAnimation";
import BackendAnimation from "./BackendAnimation";
import SocialAnimation from "./SocialAnimation";
import MusicAnimation from "./MusicAnimation";
import EComAnimation from "./EComAnimation";

const skillWords = [
  "BUILD",
  "DESIGN",
  "DO",
  "LOVE",
  "CARE ABOUT",
  "THINK",
  "CREATE",
  "EXPLORE",
  "IMAGINE",
  "BELIEVE IN",
  "DREAM ABOUT",
];

const sticky = [
  // --- BLOCK 1: AI-Powered Workflow & Strategy (The Strategic Hook) ---
  {
    title: "AI-Powered Workflow & Strategy",
    description: (
      <div className="space-y-6">
        <p className="text-xl text-slate-200">
          I use AI to speed up research, concepting, content, and feature delivery.
        </p>
        <p className="text-base text-slate-300">
          My focus is practical: shorter iteration loops, faster prototyping, and better output across product and creative work.
        </p>
        <SkillBars
          skills={[
            {
              name: "GenAI for Ideation & Workflow Speed",
              level: 85,
              experience: "2+ years experience",
              tag: "Expert",
            },
            {
              name: "AI Tools for Visual Media",
              level: 75,
              experience: "2+ years experience",
              tag: "Advanced",
            },
            {
              name: "Feature Thinking & Product Mapping",
              level: 70,
              experience: "1+ year experience",
              tag: "Advanced",
            },
          ]}
        />
      </div>
    ),
    content: (
      <div className="w-full h-full flex items-center justify-center">
        <AIAnimation />
      </div>
    ),
  },

  // --- BLOCK 2: Frontend Engineering & UX ---
  {
    title: "Frontend Engineering & UX",
    description: (
      <div className="space-y-6">
        <p className="text-xl text-slate-200">
          I build polished interfaces that feel fast, clear, and intentional.
        </p>
        <p className="text-base text-slate-300">
          My focus is strong UI, smooth interaction, and clean frontend architecture in React, Next.js, and TypeScript.
        </p>
        <SkillBars
          skills={[
            {
              name: "Next.js / React / TypeScript",
              level: 90,
              experience: "3+ years experience",
              tag: "Expert",
            },
            {
              name: "UI Implementation / CSS / Angular",
              level: 80,
              experience: "3+ years experience",
              tag: "Advanced",
            },
            {
              name: "LLM/API Integration",
              level: 75,
              experience: "1+ year experience",
              tag: "Advanced",
            },
            {
              name: "Motion Design (Framer Motion)",
              level: 75,
              experience: "2+ years experience",
              tag: "Advanced",
            },
          ]}
        />
      </div>
    ),
    content: (
      <div className="w-full h-full flex items-center justify-center">
        {/* Hier bleibt deine Coding Animation */}
        <FrontendAnimation />
      </div>
    ),
  },
  
  // --- BLOCK 3: Backend & System Architecture ---
  {
    title: "Backend & System Architecture",
    description: (
      <div className="space-y-6">
        <p className="text-xl text-slate-200">
          I build the server-side foundation behind products: APIs, data flows, and integrations.
        </p>
        <p className="text-base text-slate-300">
          The goal is reliability and scalability through clean API design, structured data handling, and solid deployment workflows.
        </p>
        <SkillBars
          skills={[
            {
              name: "Node.js / Serverless APIs",
              level: 80,
              experience: "2+ years experience",
              tag: "Advanced",
            },
            {
              name: "Databases (SQL/NoSQL)",
              level: 75,
              experience: "2+ years experience",
              tag: "Advanced",
            },
            {
              name: "Git / Docker / Deployment",
              level: 65,
              experience: "2+ years experience",
              tag: "Intermediate",
            },
          ]}
        />
      </div>
    ),
    content: (
      <div className="w-full h-full flex items-center justify-center">
        <BackendAnimation />
      </div>
    ),
  },

  // --- BLOCK 4: Digital Content & Brand Growth ---
  {
    title: "Digital Content & Brand Growth",
    description: (
      <div className="space-y-6">
        <p className="text-xl text-slate-200">
          I turn products into content people actually notice.
        </p>
        <p className="text-base text-slate-300">
          That includes ideation, filming, editing, and adapting content for platforms where design, story, and reach all matter.
        </p>
        <SkillBars
          skills={[
            {
              name: "Video Editing (CapCut / Final Cut Pro)",
              level: 90,
              experience: "3+ years experience",
              tag: "Expert",
            },
            {
              name: "Content Strategy & Filming",
              level: 85,
              experience: "2+ years experience",
              tag: "Advanced",
            },
            {
              name: "Social Media Optimization",
              level: 80,
              experience: "2+ years experience",
              tag: "Advanced",
            },
          ]}
        />
      </div>
    ),
    content: (
      <div className="w-full h-full flex items-center justify-center">
        <SocialAnimation />
      </div>
    ),
  },
  
  // --- BLOCK 5: E-Commerce & Digital Business (Learning Field) ---
  {
    title: "E-Commerce & Digital Business",
    description: (
      <div className="space-y-6">
        <p className="text-xl text-slate-200">
          <span className="font-bold text-cyan-400">Active learning field:</span> I’m building a stronger understanding of how products turn into revenue.
        </p>
        <p className="text-base text-slate-300">
          Right now that means Shopify, conversion basics, and fulfillment models like print-on-demand.
        </p>
        <SkillBars
          skills={[
            {
              name: "Custom Shopify Stores / Liquid",
              level: 60,
              experience: "1+ year experience",
              tag: "Intermediate",
            },
            {
              name: "Print-on-Demand & Fulfillment",
              level: 55,
              experience: "1+ year experience",
              tag: "Beginner",
            },
            {
              name: "Digital Marketing Basics",
              level: 60,
              experience: "1+ year experience",
              tag: "Intermediate",
            },
          ]}
        />
      </div>
    ),
    content: (
      <div className="w-full h-full flex items-center justify-center">
        <EComAnimation />   
      </div>
    ),
  },
  
  // --- BLOCK 6: Audio Production & Sound Design (Learning Field) ---
  {
    title: "Audio Production & Sound Design",
    description: (
      <div className="space-y-6">
        <p className="text-xl text-slate-200">
          <span className="font-bold text-cyan-400">Active learning field:</span> Music production sharpens my creative instincts and attention to detail.
        </p>
        <p className="text-base text-slate-300">
          I’m currently developing my workflow in Logic Pro, with a focus on production, mixing, and sound design basics.
        </p>
        <SkillBars
          skills={[
            {
              name: "Music Production (Logic Pro)",
              level: 50,
              experience: "1+ year experience",
              tag: "Beginner",
            },
            {
              name: "Basic Mixing & Sound Design",
              level: 45,
              experience: "1+ year experience",
              tag: "Beginner",
            },
          ]}
        />
      </div>
    ),
    content: (
      <div className="w-full h-full flex items-center justify-center">
        <MusicAnimation />
      </div>
    ),
  },
];



export function Skills() {
  return (
    <section className="h-full w-full flex flex-col pt-12 sm:pt-20">

        <div className="sticky top-2 sm:top-4 z-50 bg-black/70 backdrop-blur-xl rounded-3xl mx-3 sm:mx-4 md:mx-20 py-4 sm:py-6 flex flex-col items-center text-center shadow-lg border-4 border-white/10">
  {/* Main Heading with Gradient */}
  <p className="relative z-20 text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-text-gradient">
    This is what I
  </p>

  {/* FlipWords with subtle glow */}
  {skillWords && (
    <FlipWords
      words={skillWords}
      duration={2000}
      className="relative z-10 text-2xl sm:text-3xl md:text-5xl font-bold text-cyan-400/90 pt-2 sm:pt-3 tracking-wide drop-shadow-lg"
    />
  )}
</div>

      
      {/* Sticky Scroll Area */}
      <div className="flex-1 w-full">
        <StickyScroll
          content={sticky}
          className="h-screen w-full"
          textClassName="pt-16 sm:pt-24"
        />
      </div>

    </section>
  );
}
