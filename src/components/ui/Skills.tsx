"use client";
import React from "react";
import { LayoutTextFlip } from "./layout-text-flip";
import { FlipWords } from "./flip-words";
import { StickyScroll } from "./sticky-scroll-reveal";
import LaptopCloudLoop from "../LaptopCloudLoop";
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
          In a rapidly evolving tech landscape, I utilize generative AI (LLMs) not just as a tool, but as a strategic partner. My focus is on massively accelerating workflows and developing innovative features that go beyond standard solutions.
        </p>
        <p className="text-base text-slate-300">
          I consciously deploy AI to shorten design iterations, optimize code snippets, and maximize efficiency across all phases of product development and content creation.
        </p>
        <SkillBars
          skills={[
            {
              name: "Use of GenAI for Ideation & Efficiency",
              level: 85,
              experience: "2+ years experience",
              tag: "Expert",
            },
            {
              name: "AI Tools for Media Creation (Sora/Firefly)",
              level: 75,
              experience: "2+ years experience",
              tag: "Advanced",
            },
            {
              name: "Product Strategy & Mapping",
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
          My goal is to build applications that don't just work, but delight. I create high-performance, intuitive interfaces and use motion design to make the user experience smoother and more engaging.
        </p>
        <p className="text-base text-slate-300">
          I'm experienced in modern frameworks like React/Next.js (typed with TypeScript) and can quickly adapt to established enterprise environments like Angular. Connecting dynamic endpoints, including LLM APIs, is an integral part of my frontend architecture.
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
              name: "HTML / CSS / Angular (Proficiency)",
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
          A strong product requires a robust backbone. I ensure reliable server-side logic, efficient data management, and clean, versioned API interfaces.
        </p>
        <p className="text-base text-slate-300">
          The focus is on scalability through Node.js and serverless approaches. I master common tools for deployment and version control (Git, Docker) to ensure seamless continuous delivery pipelines and product stability.
        </p>
        <SkillBars
          skills={[
            {
              name: "Node.js / Serverless (APIs)",
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
          I bridge the gap between development and market. The ability to tell visual stories and optimize content for social platforms is crucial for product success and brand building.
        </p>
        <p className="text-base text-slate-300">
          I master the entire process: from strategic content ideation and filming to final video editing with tools like CapCut and Final Cut Pro. This helps me build digital reach and present products effectively.
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
          <span className="font-bold text-cyan-400">Active Learning Field:</span> My goal is to understand digital business models and build value chains independently—from idea to transaction.
        </p>
        <p className="text-base text-slate-300">
          I am actively acquiring knowledge in building custom Shopify stores (Liquid) and logistics (Print-on-Demand/Dropshipping). This deepens my understanding of conversion optimization and the interplay between code and revenue.
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
          <span className="font-bold text-cyan-400">Active Learning Field:</span> Music production is my creative outlet. This discipline trains my technical ear and fosters my ability to structure and complete complex, detail-oriented projects (Mixing/Sound Design).
        </p>
        <p className="text-base text-slate-300">
          I am actively working to deepen my skills in music production and audio engineering, primarily utilizing Logic Pro.
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
    <section className="h-full w-full flex flex-col pt-20">

        <div className="sticky top-4 z-50 bg-black/70 backdrop-blur-xl rounded-3xl mx-4 md:mx-20 py-6 flex flex-col items-center text-center shadow-lg border-4 border-white/10">
  {/* Main Heading with Gradient */}
  <p className="text-4xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-text-gradient">
    This is what I
  </p>

  {/* FlipWords with subtle glow */}
  {skillWords && (
    <FlipWords
      words={skillWords}
      duration={2000}
      className="text-3xl md:text-5xl font-bold text-cyan-400/90 pt-3 tracking-wide drop-shadow-lg"
    />
  )}
</div>

      
      {/* Sticky Scroll Area */}
      <div className="flex-1 w-full">
        <StickyScroll
          content={sticky}
          className="h-full w-full"
        />
      </div>

    </section>
  );
}
