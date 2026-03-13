"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "motion/react";
import { cn } from "@/lib/utils";
import { CardContainer, CardBody, CardItem } from "../ui/3d-card";
import { CometCard } from "@/components/ui/comet-card";
import DecisionHelper from "./DecisionHelper";
import TradingApp from "./TradingApp";
import AIImagePlayground from "./AIImagePlayground";
import MusicLab from "./MusicLab";
import RestaurantOps from "./RestaurantOps";
import {
  IconApps,
  IconWorldWww,
  IconDeviceGamepad2,
  IconShoppingBag,
  IconUsers,
  IconMusic,
  IconPlayerTrackPrev,
  IconPlayerTrackNext,
  IconPlayerPlay,
  IconPlayerPause,
} from "@tabler/icons-react";

// ----------------------------------------
// CATEGORY DATA
// ----------------------------------------
const CATEGORIES = [
  { key: "webapps", label: "WebApps" },
  { key: "websites", label: "Websites" },
  { key: "games", label: "Games" },
  { key: "ecommerce", label: "E-Commerce" },
  { key: "social", label: "Social Media" },
  { key: "music", label: "Music" },
];

const MUSIC_TRACKS = [
  {
    title: "NachtsWach.Demo",
    artist: "Moritz",
    length: "Demo",
    src: "/music/NachtsWach.demo.m4a",
    cover: "/music/NachtsWachCover.png",
  },
];

// Example projects
const PROJECTS: Record<string, any[]> = {
  webapps: [
   {
  type: "comet",
  title: "OINK-Trading",
  image: "/images/OINK.png",
  description:
    "A futuristic trading app for your crypto assets. Smooth UI and advanced analytics.",
  customContent: (() => {
    const TradingWrapper = () => {
      const [showApp, setShowApp] = useState(false);

      return (
        <div className="relative h-full w-full">
          <AnimatePresence mode="wait">
            {!showApp ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative flex flex-col h-full w-full overflow-y-auto text-white p-6 space-y-6
                           before:absolute before:top-0 before:left-0 before:w-full before:h-full
                           before:bg-[url('/abstract-pattern.svg')] before:bg-cover before:bg-center
                           before:opacity-10 before:pointer-events-none"
              >
                {/* Header & Title */}
                <div className="flex flex-col gap-4 items-center text-center relative z-10">
                  <h2 className="text-3xl font-extrabold tracking-wide">
                    OINK
                  </h2>

                  <p className="text-gray-300 leading-relaxed max-w-3xl">
                    A demo trading platform created during my 4th semester at
                    university. Dockerized and providing real-time financial
                    data via web scraping.
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mt-2 justify-center">
                    {["Python", "Vue", "venv", "SQLite"].map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-1 rounded-full text-sm font-semibold
                                   bg-gradient-to-r from-purple-600 to-emerald-400
                                   text-black shadow-md transition hover:scale-110"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image */}
                <div className="flex justify-center relative z-10">
                  <div className="w-full sm:w-3/4 h-72 sm:h-80 rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 flex items-center justify-center">
                    <img
                      src="/OINK.png"
                      alt="OINK Project"
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                </div>

                {/* Features & Description */}
                <div className="flex flex-col gap-4 text-gray-300 leading-relaxed relative z-10">
                  <p>
                    Users can simulate trading of stocks, crypto, and other
                    assets. Track profits and losses in real time, and compare
                    performance with friends.
                  </p>
                  <p>
                    Note: The demo accessible via the app view does not include
                    all features of the full version.
                  </p>
                </div>

                {/* Try Now Button */}
                <div className="flex justify-center relative z-10 pt-4">
                  <button
                    onClick={() => setShowApp(true)}
                    className="px-8 py-3 bg-gradient-to-r from-green-400 to-emerald-600
                               text-black font-bold rounded-2xl shadow-lg
                               hover:scale-105 hover:shadow-xl transition"
                  >
                    Try now
                  </button>
                </div>

                {/* Study Info */}
                <p className="text-gray-500 text-sm relative z-10">
                  University project, 4th semester
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="app"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="relative h-full w-full"
              >
                <TradingApp />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    };

    return <TradingWrapper />;
  })(),

    },
    {
  type: "comet",
  title: "ChatApp-Messanger",
  image: "/images/chatApp copy.png",
  description: "A sleek messaging app with full emoji support and privacy-first design.",
  customContent: (
    <div className="relative h-full w-full text-white p-6 space-y-10
                    before:absolute before:top-0 before:left-0 before:w-full before:h-full
                    before:pointer-events-none">

      {/* Header */}
      <div className="flex flex-col gap-4 items-center relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-wide text-center">
          ChatApp
        </h2>

        {/* Technologies Badges */}
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          {["Node.js", "Express", "Angular", "Tailwind", "Sockets", "Docker", "E2E Tests"].map((tech, i) => (
            <span
              key={tech}
              className="px-5 py-2 rounded-full text-sm font-semibold
                         bg-gradient-to-r from-cyan-400 to-emerald-500 text-black
                         shadow-md transform transition hover:scale-110"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>

        <p className="text-gray-300 text-center max-w-3xl leading-relaxed mt-4">
          Mobile-first real-time messenger built with Angular & Node.js using WebSockets for instant communication.
        </p>
      </div>

      {/* Hero Image (Vertical) */}
      <div className="flex justify-center relative z-10">
        <div className="w-64 sm:w-80 aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 flex items-center justify-center">
          <img
            src="/chatapp2.png"
            alt="ChatApp Project"
            className="w-full h-full object-contain p-2"
          />
        </div>
      </div>

      {/* Features + Gallery */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-xl font-semibold text-center mb-4">Key Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-200">
            {[
              "Real-time chat via WebSockets",
              "Mobile-first UI with Angular + Tailwind",
              "Component & E2E testing",
              "Dockerized development & deployment",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-center"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-xl font-semibold text-center mb-4">Community Preview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {["/Community1.png", "/Community2.png", "/Community3.png"].map((img) => (
              <div
                key={img}
                className="aspect-[9/16] rounded-xl overflow-hidden shadow-xl
                           hover:scale-105 transition-transform bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 flex items-center justify-center"
              >
                <img src={img} className="w-full h-full object-contain p-2" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <p className="text-gray-500 text-sm text-center relative z-10">
        University project · 7th semester
      </p>
    </div>
  )
}
,
    {
  type: "comet",
  title: "AI Image Playground",
  image: "/images/AIImagePlayground.png",
  description: "Client-only AI image tools running fully in the browser.",
  customContent: <AIImagePlayground />,
},
    {
  type: "comet",
  title: "Orderly",
  image: "/images/OrderlyAppIcon.svg",
  description:
    "Restaurant order management with online checkout, Telegram bot flows, live tracking, and status-based operations.",
  customContent: (() => {
    const OrderlyWrapper = () => {
      const [showApp, setShowApp] = useState(false);

      return (
        <div className="relative h-full w-full">
          <AnimatePresence mode="wait">
            {!showApp ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="relative flex h-full w-full flex-col overflow-y-auto p-6 text-white"
              >
                <div className="relative z-10 flex flex-col gap-6">
                  <div className="relative flex flex-col gap-4 text-center">
                    <div className="absolute left-0 top-0 hidden xl:block">
                      <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/95 shadow-[0_18px_60px_rgba(0,0,0,0.25)]">
                        <img
                          src="/images/OrderlyLogo.png"
                          alt="Orderly logo"
                          className="h-24 w-auto object-contain sm:h-28"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center xl:hidden">
                      <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/95 shadow-[0_18px_60px_rgba(0,0,0,0.25)]">
                        <img
                          src="/images/OrderlyLogo.png"
                          alt="Orderly logo"
                          className="h-24 w-auto object-contain sm:h-28"
                        />
                      </div>
                    </div>
                    <div className="inline-flex items-center self-center gap-2 rounded-full border border-orange-300/20 bg-orange-300/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.34em] text-orange-100">
                      Restaurant Operations Platform
                    </div>
                    <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Orderly</h2>
                    <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-300">
                      Multi-channel ordering system for restaurants with direct online checkout,
                      Telegram bot flows, live customer tracking, and one central ops dashboard for
                      the team.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {[
                        "Node.js",
                        "React",
                        "PostgreSQL",
                        "Telegram Bot API",
                        "Role-based Dashboard",
                        "Live Tracking",
                      ].map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-1.5 text-sm font-semibold text-slate-950 shadow-md transition hover:scale-105"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-[11px] uppercase tracking-[0.32em] text-white/45">
                            Product Mockups
                          </div>
                          <div className="mt-2 text-2xl font-bold">Across ops dashboard, checkout, and live tracking</div>
                        </div>
                        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                          Real mockups
                        </div>
                      </div>

                      <div className="mt-5 space-y-5">
                        <div className="mx-auto w-[72%] overflow-hidden rounded-[2rem] border border-white/10 bg-black/20 shadow-[0_32px_90px_rgba(0,0,0,0.38)]">
                          <img
                            src="/images/MockupAll.png"
                            alt="Orderly multi-device platform overview"
                            className="h-auto w-full object-cover"
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.72fr_1fr]">
                          <div className="grid grid-cols-1 gap-5">
                            <div className="overflow-hidden rounded-[1.9rem] border border-white/10 bg-black/20 shadow-[0_28px_80px_rgba(0,0,0,0.28)]">
                              <img
                                src="/images/OrderlyFlow copy.png"
                                alt="Orderly operations overview"
                                className="h-auto w-full object-cover"
                              />
                            </div>
                            <div className="overflow-hidden rounded-[1.9rem] border border-white/10 bg-black/20 shadow-[0_28px_80px_rgba(0,0,0,0.28)]">
                              <img
                                src="/images/OrderlyOrder.png"
                                alt="Orderly direct ordering checkout"
                                className="h-auto w-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="self-start">
                            <div className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/20 shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
                              <img
                                src="/images/TelegramBot-portrait.png"
                                alt="Orderly Telegram bot portrait mockup"
                                className="h-auto w-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
                        <div className="text-[11px] uppercase tracking-[0.32em] text-white/45">
                          Why It Matters
                        </div>
                        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-300">
                          <p>
                            Restaurants get a single system for checkout, reservations, Telegram
                            automation, and operational order handling instead of juggling multiple
                            disconnected tools.
                          </p>
                          <p>
                            Customers can order online, receive live pickup tracking, or reserve
                            tables through chat. Staff sees every request inside one status-based
                            workflow.
                          </p>
                        </div>
                      </div>

                      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
                        <div className="text-[11px] uppercase tracking-[0.32em] text-white/45">
                          Core Modules
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-3">
                          {[
                            "Ops dashboard for incoming orders and fulfillment states",
                            "Direct order page with clean checkout and ETA display",
                            "Telegram bot for ordering and table reservations",
                            "Customer live-tracking page after checkout",
                            "Future AI voice agent for phone-based orders",
                          ].map((item) => (
                            <div
                              key={item}
                              className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/72"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-[2rem] border border-fuchsia-300/15 bg-fuchsia-300/[0.08] p-5">
                        <div className="text-[11px] uppercase tracking-[0.32em] text-fuchsia-100/80">
                          Build Direction
                        </div>
                        <div className="mt-3 text-sm leading-relaxed text-fuchsia-50/85">
                          Built as a product-focused restaurant workflow concept with React on the
                          frontend, Node.js services for orchestration, Telegram integrations, and a
                          roadmap toward AI-assisted call intake.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center pt-2">
                    <div className="flex flex-col items-center gap-3 text-center">
                      <button
                        onClick={() => setShowApp(true)}
                        className="rounded-2xl bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 px-8 py-3 font-bold text-slate-950 shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
                      >
                        Open demo
                      </button>
                      <p className="max-w-2xl text-sm leading-relaxed text-white/55">
                        This demo is a visualized product walkthrough, not the full live system. It
                        is meant to show how Orderly works across dashboard, checkout, and tracking.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="app"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="relative h-full w-full"
              >
                <RestaurantOps />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    };

    return <OrderlyWrapper />;
  })(),
},
    {
  type: "comet",
  title: "NachtsWach.Demo",
  image: "/images/musiclab.png",
  description: "Browser sampler + 16-step sequencer for building beats.",
  customContent: <MusicLab />,
},
    {
      type: "comet",
      title: "MyOwnRAG",
      image: "/images/RAG copy.png",
      description: "Classic Retrieval-Augmented Generation that connects uploaded PDFs with OpenAIs ChatGPT.",
      customContent: (
  <div className="relative flex flex-col h-full w-full overflow-y-auto text-white p-6 space-y-6
                  before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),_transparent_60%)]
                  before:pointer-events-none">
    
    {/* Header & Title */}
    <div className="flex flex-col gap-4 items-center text-center relative z-10">
      <h2 className="text-3xl font-extrabold tracking-wide animate-fadeIn">
        MyOwnRAG
      </h2>

      <p className="text-gray-300 leading-relaxed animate-fadeIn delay-100 max-w-3xl">
        MyOwnRAG is a lightweight Retrieval-Augmented Generation (RAG) system.
        Users can upload PDF documents, ask natural language questions, and
        receive precise answers enriched with source citations.
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mt-2 justify-center">
        {[
          "FastAPI",
          "Qdrant",
          "Node.js",
          "MongoDB",
          "React",
          "OpenAI GPT-4o",
          "Azure"
        ].map((tech, i) => (
          <span
            key={tech}
            className="px-4 py-1 rounded-full text-sm font-semibold
                       bg-gradient-to-r from-cyan-400 to-blue-600 text-black
                       shadow-md transform transition hover:scale-110
                       animate-fadeIn"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>

    {/* Image */}
    <div className="flex justify-center relative z-10">
      <div className="w-full sm:w-3/4 h-72 rounded-xl overflow-hidden shadow-2xl
                      transform transition-transform duration-500 hover:scale-105 bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 flex items-center justify-center">
        <img
          src="/images/RAG copy 2.png"
          alt="MyOwnRAG UI"
          className="w-full h-full object-contain p-2"
        />
      </div>
    </div>

    {/* Description */}
    <div className="flex flex-col gap-4 text-gray-300 leading-relaxed animate-fadeIn delay-200 relative z-10">
      <p>
        The system follows a microservice architecture: document embeddings are
        generated and stored in Qdrant, metadata and chat history are managed via
        MongoDB, and the React frontend provides a clean chat-based UI.
      </p>
      <p>
        Deployed in Microsoft Azure, MyOwnRAG demonstrates scalable AI-assisted
        document analysis in a production-like environment.
      </p>
    </div>

    {/* Study Info */}
    <p className="text-gray-500 text-sm animate-fadeIn delay-300 relative z-10">
      Personal project · AI / RAG system
    </p>
  </div>
),

    },
    {
      type: "comet",
      title: "Meet",
      image: "/images/Meet copy.png",
      description: "Simple software that lets users find and join groups for different activities.",
      customContent: (
  <div className="relative flex flex-col h-full w-full overflow-y-auto text-white p-6 space-y-6
                  before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.15),_transparent_60%)]
                  before:pointer-events-none">
    
    {/* Header & Title */}
    <div className="flex flex-col gap-4 items-center text-center relative z-10">
      <h2 className="text-3xl font-extrabold tracking-wide animate-fadeIn">
        Meet
      </h2>

      <p className="text-gray-300 leading-relaxed animate-fadeIn delay-100 max-w-3xl">
        Meet is one of my first university projects. It focuses on building a
        structured desktop application with a clean UI and solid software
        engineering fundamentals.
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mt-2 justify-center">
        {[
          "Java",
          "JavaFX",
          "H2 Database",
          "Unit Tests",
          "JavaDoc"
        ].map((tech, i) => (
          <span
            key={tech}
            className="px-4 py-1 rounded-full text-sm font-semibold
                       bg-gradient-to-r from-purple-500 to-pink-500 text-black
                       shadow-md transform transition hover:scale-110
                       animate-fadeIn"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>

    {/* Images */}
    <div className="flex justify-center relative z-10">
      <div className="w-full sm:w-3/4 grid grid-cols-2 gap-4">
        <div className="h-48 w-full rounded-xl shadow-xl hover:scale-105 transition overflow-hidden bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 flex items-center justify-center">
          <img
            src="/Meet1.png"
            alt="Meet App Screenshot 1"
            className="h-full w-full object-contain p-2"
          />
        </div>
        <div className="h-48 w-full rounded-xl shadow-xl hover:scale-105 transition overflow-hidden bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 flex items-center justify-center">
          <img
            src="/Meet2.png"
            alt="Meet App Screenshot 2"
            className="h-full w-full object-contain p-2"
          />
        </div>
      </div>
    </div>

    {/* Description */}
    <div className="flex flex-col gap-4 text-gray-300 leading-relaxed animate-fadeIn delay-200 relative z-10">
      <p>
        The application was developed using Java and JavaFX for the frontend and
        an H2 database for persistence.
      </p>
      <p>
        A strong focus was placed on clean code, unit testing, and documentation
        using JavaDoc, making this project a solid foundation for later,
        more complex systems.
      </p>
    </div>

    {/* Study Info */}
    <p className="text-gray-500 text-sm animate-fadeIn delay-300 relative z-10">
      University project · 3rd semester
    </p>
  </div>
),
    },
    {
  type: "comet",
  title: "Decision Helper",
  image: "/images/DecisionHelper copy.png",
  description: "Modern portfolio website template.",
  customContent: (() => {
    const DecisionHelperWrapper = () => {
      const [showApp, setShowApp] = useState(false);

      return (
        <div className="relative h-full w-full">
          <AnimatePresence mode="wait">
            {!showApp ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative flex flex-col h-full w-full overflow-y-auto text-white p-6 space-y-6
                           before:absolute before:inset-0
                           before:pointer-events-none"
              >
                {/* Header & Title */}
                <div className="flex flex-col gap-4 items-center text-center relative z-10">
                  <h2 className="text-3xl font-extrabold tracking-wide">
                    Decision Helper
                  </h2>

                  <p className="text-gray-300 leading-relaxed max-w-3xl">
                    Decision Helper is a web application designed to support
                    structured decision-making. Users can compare multiple
                    options based on custom criteria and weightings, making
                    complex decisions more transparent and data-driven.
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mt-2 justify-center">
                    {[
                      "React",
                      "Framer Motion",
                      "Tailwind CSS",
                      "Web App",
                      "UX-focused Design",
                    ].map((tech, i) => (
                      <span
                        key={tech}
                        className="px-4 py-1 rounded-full text-sm font-semibold
                                   bg-gradient-to-r from-green-400 to-emerald-600 text-black
                                   shadow-md transition hover:scale-110"
                        style={{ animationDelay: `${i * 80}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Images */}
                <div className="flex justify-center relative z-10">
                  <div className="w-full sm:w-3/4 grid grid-cols-2 gap-4">
                    <div className="h-48 w-full rounded-xl shadow-xl transition-transform duration-500 hover:scale-105 overflow-hidden bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 flex items-center justify-center">
                      <img
                        src="/DH1.png"
                        alt="Decision Helper Screenshot 1"
                        className="h-full w-full object-contain p-2"
                      />
                    </div>
                    <div className="h-48 w-full rounded-xl shadow-xl transition-transform duration-500 hover:scale-105 overflow-hidden bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 flex items-center justify-center">
                      <img
                        src="/DH2.png"
                        alt="Decision Helper Screenshot 2"
                        className="h-full w-full object-contain p-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-4 text-gray-300 leading-relaxed relative z-10">
                  <p>
                    The application guides users through a step-by-step process
                    where options, criteria, and priorities can be defined
                    interactively.
                  </p>
                  <p>
                    Smooth animations powered by Framer Motion create a polished,
                    professional user experience.
                  </p>
                </div>

                {/* Try Now Button */}
                <div className="flex justify-center pt-4 relative z-10">
                  <button
                    onClick={() => setShowApp(true)}
                    className="px-8 py-3 rounded-2xl font-bold text-black
                               bg-gradient-to-r from-green-400 to-emerald-600
                               shadow-lg hover:scale-105 transition"
                  >
                    Try now
                  </button>
                </div>

                <p className="text-gray-500 text-sm relative z-10">
                  Web application · UX & frontend-focused project
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="app"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="relative h-full w-full flex items-center justify-center"
              >
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-black/40 shadow-[0_25px_60px_rgba(0,0,0,0.4)]">
                  <DecisionHelper />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    };

    return <DecisionHelperWrapper />;
  })(),
},
  ],
  websites: [
   {
  type: "comet",
  title: "Car Dealership Website",
  image: "/WSCover.jpg",
  description: "One of my first websites, built for a local car dealership using Wix.",
  customContent: (
    <div className="relative h-full w-full text-white p-6 space-y-10
                    before:absolute before:inset-0 before:pointer-events-none">

      {/* Header */}
      <div className="flex flex-col gap-4 items-center relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-wide text-center">
          Car Dealership Website
        </h2>

        {/* Technologies Badges */}
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          {["Wix", "Low-Code", "Responsive Design", "Web Design", "Frontend-focused"].map((tech, i) => (
            <span
              key={tech}
              className="px-5 py-2 rounded-full text-sm font-semibold
                         bg-gradient-to-r from-green-400 to-emerald-600 text-black
                         shadow-md transform transition hover:scale-110"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>

        <p className="text-gray-300 text-center max-w-3xl leading-relaxed mt-4">
          One of the first websites I built, for a local car dealership using the low-code platform Wix. 
          The goal was to keep the design calm and concise, focusing on presenting services and enabling customers to contact the team easily.
        </p>
      </div>

      {/* Hero Images */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
        <div className="flex-1 h-[400px] sm:h-[500px] rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 flex items-center justify-center">
          <img
            src="/WS1.png"
            alt="Car Dealership Screenshot 1"
            className="w-full h-full object-contain p-2"
          />
        </div>
        <div className="flex-1 h-[400px] sm:h-[500px] rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 flex items-center justify-center">
          <img
            src="/WS2.png"
            alt="Car Dealership Screenshot 2"
            className="w-full h-full object-contain p-2"
          />
        </div>
      </div>

      {/* Detailed Description */}
      <div className="flex flex-col gap-4 text-gray-300 leading-relaxed relative z-10 max-w-4xl mx-auto text-center">
        <p>
          Visitors can browse the dealership’s services and get in touch with the team effortlessly. 
          The design focuses on clarity and simplicity rather than flashy visuals.
        </p>
        <p>
          This project helped me understand client requirements and how to quickly build functional, clean websites using low-code platforms.
        </p>
      </div>

      {/* Footer Info */}
      <p className="text-gray-500 text-sm text-center relative z-10">
        Low-code website · Frontend & UX-focused project
      </p>
    </div>
  ),
},


{
  type: "comet",
  title: "KeniaHub",
  image: "/KeniaCover.jpg",
  description: "Website in progress for a Kenyan safari guide and charity initiative, built with Lovable.",
  customContent: (
    <div className="relative h-full w-full text-white p-6 space-y-10
                    before:absolute before:inset-0
                    before:pointer-events-none">

      {/* Header & Title */}
      <div className="flex flex-col gap-6 items-center relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-wide text-center">
          KeniaHub
        </h2>

        {/* Technologies Badges */}
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          {["Lovable", "Low-Code", "Responsive Design", "Web Design", "Frontend-focused"].map((tech, i) => (
            <span
              key={tech}
              className="px-5 py-2 rounded-full text-sm font-semibold
                         bg-gradient-to-r from-green-400 to-emerald-600 text-black
                         shadow-md transform transition hover:scale-110"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>

        <p className="text-gray-300 text-center max-w-3xl leading-relaxed mt-4">
          KeniaHub is a website in progress for a friend in Kenya, built with the low-code platform Lovable. 
          The project combines his safari business with a charity initiative supporting orphaned children. 
          Legal processes are ongoing, so the site is still being finalized.
        </p>
      </div>

      {/* Hero Images (Horizontal) */}
      <div className="flex flex-wrap justify-center gap-6 relative z-10">
        {["/Kenia1.png", "/Kenia2.png"].map((img) => (
          <div
            key={img}
            className="w-72 sm:w-96 aspect-video rounded-xl overflow-hidden shadow-2xl
                       hover:scale-105 transition-transform bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 flex items-center justify-center"
          >
            <img src={img} className="w-full h-full object-contain p-2" />
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-4 text-gray-300 leading-relaxed relative z-10 max-w-4xl mx-auto text-center">
        <p>
          The website will allow visitors to explore safari options, learn about the charitable work, 
          and easily get in touch or contribute. Design focuses on clarity and a professional, welcoming feel.
        </p>
        <p>
          This project demonstrates working with clients internationally and creating functional sites using low-code platforms, even while some processes are pending.
        </p>
      </div>

      {/* Footer Info */}
      <p className="text-gray-500 text-sm text-center relative z-10">
        Low-code website · Frontend & UX-focused project · In progress
      </p>
    </div>
  )
}


  ],
  games: [{
  type: "comet",
  title: "CalaxyCrystalRush",
  image: "/GCRCover.png",
  description: "A game built in LUA with LÖVE during my semester abroad in Lisbon.",
  customContent: (
    <div className="relative h-full w-full text-white p-6 space-y-6
                    before:absolute before:inset-0
                    before:pointer-events-none">
      {/* Header & Title */}
      <div className="flex flex-col gap-4 items-center text-center relative z-10">
        <h2 className="text-3xl font-extrabold tracking-wide">
          CalaxyCrystalRush
        </h2>

        <p className="text-gray-300 leading-relaxed max-w-3xl">
          CalaxyCrystalRush is a game I developed in LUA using LÖVE during my semester abroad in Lisbon. 
          The universe has fallen into darkness, and one lonely galaxy is trying to save it by spreading light across the world.
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-2 justify-center">
          {["LUA", "LÖVE", "2D Game", "Game Development", "Semester Project"].map((tech, i) => (
            <span
              key={tech}
              className="px-4 py-1 rounded-full text-sm font-semibold
                         bg-gradient-to-r from-green-400 to-emerald-600 text-black
                         shadow-md transition hover:scale-110"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Images */}
      <div className="flex justify-center relative z-10">
        <div className="w-full sm:w-3/4 grid grid-cols-2 gap-4">
          <div className="h-48 w-full rounded-xl shadow-xl transition-transform duration-500 hover:scale-105 overflow-hidden bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 flex items-center justify-center">
            <img
              src="/GCR1.png"
              alt="CalaxyCrystalRush Screenshot 1"
              className="h-full w-full object-contain p-2"
            />
          </div>
          <div className="h-48 w-full rounded-xl shadow-xl transition-transform duration-500 hover:scale-105 overflow-hidden bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 flex items-center justify-center">
            <img
              src="/GCR2.png"
              alt="CalaxyCrystalRush Screenshot 2"
              className="h-full w-full object-contain p-2"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-4 text-gray-300 leading-relaxed relative z-10">
        <p>
          The game challenges players to navigate the last shining galaxy through a dark universe, collecting crystals and spreading light to restore balance.
        </p>
        <p>
          This project allowed me to experiment with game mechanics, 2D graphics, and LUA programming, combining creative storytelling with technical skills.
        </p>
      </div>

      <p className="text-gray-500 text-sm relative z-10">
        2D Game · LUA & LÖVE · Semester Abroad Project
      </p>
    </div>
  ),
}
],
  ecommerce: [{
    type: "comet",
    title: "Print on Demand",
    image: "/images/PrintOnDemand.svg",
    description: "Niche print-on-demand experiments launched across multiple marketplaces.",
    customContent: (
      <div className="relative flex h-full w-full flex-col overflow-y-auto p-6 text-white space-y-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
            Side Project
          </div>
          <h2 className="text-3xl font-extrabold tracking-wide sm:text-4xl">
            Print on Demand
          </h2>
          <p className="max-w-3xl text-gray-300 leading-relaxed">
            A small side project where I tested niche-based print-on-demand ideas across multiple marketplaces,
            built simple design batches, and used short-form content to see what could actually get attention.
          </p>
          <div className="mt-1 flex flex-wrap justify-center gap-2">
            {["Redbubble", "Teespring", "TikTok", "Niche Design Tests", "Side Project"].map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-gradient-to-r from-amber-300 to-orange-500 px-4 py-1 text-sm font-semibold text-black shadow-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),rgba(255,255,255,0.02)_34%,rgba(0,0,0,0.65)_100%)] p-6">
              <img
                src="/images/PrintOnDemand.svg"
                alt="Print on Demand project"
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-[11px] uppercase tracking-[0.32em] text-white/45">
                What I tested
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/72">
                I launched print-on-demand stores on three platforms, including Redbubble and Teespring,
                using niche-topic design concepts to test demand instead of building one big brand from day one.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-[11px] uppercase tracking-[0.32em] text-white/45">
                Growth channel
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/72">
                Traffic experiments were pushed mainly through TikTok, where I tested short-form creative angles
                to see which designs, niches, and hooks could generate clicks and early interest.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Platforms", value: "3 launched" },
            { label: "Strategy", value: "Niche tests" },
            { label: "Traffic", value: "TikTok-first" },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-[11px] uppercase tracking-[0.28em] text-white/45">{item.label}</div>
              <div className="mt-2 text-2xl font-semibold text-white">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="text-[11px] uppercase tracking-[0.32em] text-white/45">
            Context
          </div>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-white/72">
            This was never meant to be a full-scale company build. It was a side project I ran alongside everything else,
            mainly to learn how marketplace launches, design iteration, and lightweight content-driven acquisition behave in practice.
          </p>
        </div>
      </div>
    ),
  }],
  social: [
    {
      type: "comet",
      title: "mxritttz",
      image: "/images/Insta4.PNG",
      description: "Personal social profile + content hub.",
      feedImages: [
        "/images/Insta4.PNG",
        "/images/Insta3.PNG",
        "/images/Insta2.jpg",
        "/images/Insta1.jpg",
        "/images/Insta5.PNG",
      ],
      customContent: (
        <div className="w-full space-y-5 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-2xl font-semibold">@mxritttz</div>
              <div className="text-sm text-white/70">Instagram profile</div>
            </div>
            <button
              onClick={() => window.open("https://www.instagram.com/mxritttz", "_blank")}
              className="px-4 py-2 rounded-full bg-white text-black text-sm font-semibold"
            >
              Open in Instagram
            </button>
          </div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-pink-500/10 via-black/40 to-black/70 p-5">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-full border border-white/15 bg-white/10">
                <img src="/images/InstaPB.PNG" alt="Moritz profile picture" className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="text-lg font-semibold">Moritz</div>
                <div className="text-sm text-white/60">Creative dev • UI experiments</div>
                <div className="mt-2 flex items-center gap-3 text-xs text-white/60">
                  <span>Posts 24</span>
                  <span>Followers 1.2k</span>
                  <span>Following 180</span>
                </div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                "/images/Insta1.jpg",
                "/images/Insta3.PNG",
                "/images/Insta2.jpg",
                "/images/Insta4.PNG",
                "/images/Insta5.PNG",
              ].map((img) => (
                <div
                  key={img}
                  className="aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                >
                  <img src={img} alt="Instagram post preview" className="h-full w-full object-cover" />
                </div>
              ))}
              <div className="aspect-square rounded-2xl border border-dashed border-white/15 bg-white/[0.03] grid place-items-center text-[11px] uppercase tracking-[0.24em] text-white/40">
                More
              </div>
            </div>
          </div>
          <div className="text-sm text-white/60">
            Instagram blocks full-profile embeds in iframes. Use the button to view the real profile.
          </div>
        </div>
      ),
    },
    {
      type: "comet",
      title: "More to come soon",
      image: "/images/Insta5.PNG",
      description: "More content formats, social concepts, and platform experiments are on the way.",
    },
  ],
  music: [{ type: "comet", title: "SoundWave", image: "/ChatApp1.png", description: "Music streaming app with playlists." }],
};

// ----------------------------------------
// CARD RENDERER
// ----------------------------------------
function ProjectCard({ project, onClick, compact = false }: any) {
  const baseClass = "cursor-pointer";
  const compactClass = compact
    ? "w-[30vw] sm:w-[16.5vw] md:w-[8vw] h-[14.5vh] sm:h-[16.5vh]"
    : "w-[70vw] sm:w-[40vw] md:w-[17vw] h-[36vh] sm:h-[42vh] p-4";

  if (project.type === "3d") {
    return (
      <CardContainer className="inter-var">
        <CardBody
          className={`${baseClass} bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[80vw] sm:w-[60vw] h-[70vh] rounded-xl p-6 border`}
        >
          <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
            {project.title}
          </CardItem>
          <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
            {project.description || "Hover over this card to unleash the power of CSS perspective"}
          </CardItem>
          <CardItem translateZ="100" rotateX={20} rotateZ={-10} className="w-full mt-4 flex-1">
            <img src={project.image} className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl" alt="thumbnail" />
          </CardItem>
        </CardBody>
      </CardContainer>
    );
  }

  if (project.type === "comet") {
    if (compact) {
      return (
        <div className="flex flex-col items-center gap-2">
          <CometCard springConfig={{ stiffness: 160, damping: 22, mass: 0.85 }} rotateDepth={8} translateDepth={6}>
            <div
              onClick={onClick}
              className={`${baseClass} ${compactClass} bg-[#141516] rounded-[2.2rem] shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-white/5 overflow-hidden`}
            >
              <img src={project.image} className="h-full w-full object-cover" />
            </div>
          </CometCard>
          <div className="text-[11px] text-white/80 font-medium text-center leading-tight">
            {project.title}
          </div>
        </div>
      );
    }

    return (
      <CometCard>
        <div
          onClick={onClick}
          className={`${baseClass} ${compactClass} bg-[#141516] rounded-[2.2rem] flex flex-col gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-white/5`}
        >
          <div className="relative flex-1 rounded-2xl overflow-hidden border border-white/10">
            <img src={project.image} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
          </div>

          <div className="px-1 text-white text-sm font-mono opacity-90">
            {project.title}
          </div>
        </div>
      </CometCard>
    );
  }

  return null;
}

// ----------------------------------------
// FULL SCREEN PROJECT DETAIL VIEW
// ----------------------------------------
function ProjectDetail({ project, onBack }: any) {
  return (
    <motion.div
      key={project.title}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="absolute inset-0 bg-gradient-to-tr from-purple-900 via-indigo-900 to-black dark:bg-zinc-900 z-50 flex flex-col overflow-y-auto p-8 gap-6"
    >
      <motion.button
        onClick={onBack}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -50, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="self-start px-4 py-2 rounded-xl font-semibold text-white
                   bg-white/10 border border-white/30 backdrop-blur-xl
                   shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:bg-white/20
                   hover:scale-105 transition"
      >
        ← Back
      </motion.button>

    

      {/* Custom content or fallback description */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-lg text-gray-700 dark:text-gray-300"
      >
        {project.customContent || <p>{project.description}</p>}
      </motion.div>

      {/* Images / media */}
      {project.images && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
        >
          {project.images.map((img: string, idx: number) => (
            <div
              key={idx}
              className="w-full h-64 rounded-xl shadow-lg bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 flex items-center justify-center overflow-hidden"
            >
              <img src={img} className="w-full h-full object-contain p-2" />
            </div>
          ))}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-6 flex gap-4"
      >
        {project.primaryAction && (
          <button className="px-6 py-3 bg-black dark:bg-white dark:text-black text-white rounded-xl font-bold hover:scale-105 transition">
            {project.primaryAction.label}
          </button>
        )}
        {project.secondaryAction && (
          <button className="px-6 py-3 border border-black dark:border-white rounded-xl font-bold hover:scale-105 transition">
            {project.secondaryAction.label}
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}

// ----------------------------------------
// MAIN COMPONENT
// ----------------------------------------
export function Projects() {
  const [active, setActive] = useState("webapps");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [gridVisible, setGridVisible] = useState(true);
  const [dockPulseIndex, setDockPulseIndex] = useState(0);
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [now, setNow] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const [lockDragging, setLockDragging] = useState(false);
  const [unlockPulse, setUnlockPulse] = useState(0);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const sliderControls = useAnimation();
  const wasLockedRef = React.useRef(isLocked);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("projects-unlocked");
    if (!seen) {
      setIsLocked(true);
    }
  }, []);

  useEffect(() => {
    if (wasLockedRef.current && !isLocked) {
      setUnlockPulse((prev) => prev + 1);
    }
    wasLockedRef.current = isLocked;
  }, [isLocked]);

  useEffect(() => {
    if (isLocked) {
      sliderControls.set({ x: 0 });
    }
  }, [isLocked, sliderControls]);

  useEffect(() => {
    setMounted(true);
    const tick = () => setNow(new Date());
    tick();
    const interval = window.setInterval(tick, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let timeoutId: number;
    const count = 6;
    const stepDelay = 1400;
    const pauseDelay = 5000;

    const tick = () => {
      setDockPulseIndex((prev) => {
        const next = prev + 1;
        return next >= count ? 0 : next;
      });
    };

    const schedule = (current: number) => {
      const isLast = current >= count - 1;
      timeoutId = window.setTimeout(() => {
        tick();
      }, isLast ? pauseDelay : stepDelay);
    };

    schedule(dockPulseIndex);
    return () => window.clearTimeout(timeoutId);
  }, [dockPulseIndex]);

  const handleTrackPlay = (index: number) => {
    const track = MUSIC_TRACKS[index];
    if (!track?.src) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(track.src);
      audioRef.current.preload = "metadata";
    }
    const audio = audioRef.current;
    const currentSrc = audio.src ? new URL(audio.src).pathname : "";
    if (currentSrc !== track.src) {
      audio.src = track.src;
    }
    if (playingTrack === index && !audio.paused) {
      audio.pause();
      setPlayingTrack(null);
      return;
    }
    audio.play();
    setPlayingTrack(index);
    audio.onended = () => {
      setPlayingTrack(null);
    };
  };

  const stopMusicPreview = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayingTrack(null);
    window.dispatchEvent(new Event("musiclab:stop"));
  };

  const timeLabel = mounted
    ? new Intl.DateTimeFormat("de-DE", { hour: "2-digit", minute: "2-digit" }).format(now)
    : "—:—";
  const dateLabel = mounted
    ? new Intl.DateTimeFormat("de-DE", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }).format(now)
    : "—";

  return (
    <div className="w-full h-full flex flex-col gap-5 bg-gradient-to-b from-neutral-100 via-neutral-100 to-neutral-200 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 overflow-visible relative">
      <AnimatePresence>
        {isLocked && (
          <motion.div
            onClick={() => {
              // tap no longer unlocks; use slider
            }}
            className="absolute inset-0 z-[60] rounded-2xl overflow-hidden text-left"
            aria-label="Unlock projects"
            initial={{ opacity: 0, scale: 1.02, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(125,211,252,0.32),transparent_38%),radial-gradient(circle_at_82%_18%,rgba(196,181,253,0.26),transparent_34%),radial-gradient(circle_at_50%_88%,rgba(244,114,182,0.18),transparent_36%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_24%,rgba(255,255,255,0.05)_68%,rgba(255,255,255,0.1))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(255,255,255,0.22),transparent_48%)]" />
            <div className="absolute inset-0 opacity-[0.16] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.35)_50%,transparent_100%)] [background-size:220px_100%]" />

            <div className="relative z-10 flex h-full flex-col justify-between px-8 py-8 text-white md:px-10 md:py-9">
              <div className="flex items-start justify-between text-[11px] uppercase tracking-[0.28em] text-white/55">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 backdrop-blur-md">
                  unlocked apps
                </span>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-4 rounded-full bg-white/70" />
                  <span className="h-1.5 w-3 rounded-full bg-white/60" />
                  <span className="h-1.5 w-2 rounded-full bg-white/50" />
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 pt-3">
                <div className="text-[5.6rem] md:text-[7.5rem] font-medium tracking-[-0.04em] leading-none drop-shadow-[0_14px_30px_rgba(0,0,0,0.42)]">
                  {timeLabel}
                </div>
                <div className="text-sm md:text-base tracking-[0.32em] text-white/65">
                  {dateLabel}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 px-1">
                <div className="rounded-[2rem] border border-white/12 bg-white/[0.07] px-5 py-4 backdrop-blur-2xl shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
                  <div className="text-[11px] uppercase tracking-[0.32em] text-white/55">
                    Focus
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="h-8 w-8 rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-400 to-indigo-500 shadow-[0_8px_18px_rgba(56,189,248,0.35)]" />
                    <div>
                      <div className="text-sm font-semibold">Project Library</div>
                      <div className="text-xs text-white/60">Ready to explore</div>
                    </div>
                  </div>
                </div>
                <div className="rounded-[2rem] border border-white/12 bg-white/[0.07] px-5 py-4 backdrop-blur-2xl shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
                  <div className="text-[11px] uppercase tracking-[0.32em] text-white/55">
                    Status
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl font-semibold tracking-tight">7 apps</div>
                    <div className="mt-1 text-xs text-white/60">Web apps available now</div>
                    <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-violet-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 text-white/70">
                <div className="relative h-11 w-72 rounded-full border border-white/20 bg-white/[0.08] px-2 flex items-center overflow-hidden backdrop-blur-xl shadow-[0_20px_45px_rgba(0,0,0,0.28)]">
                  <motion.div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.0),rgba(255,255,255,0.22),rgba(255,255,255,0.0))] opacity-70"
                    animate={{ x: lockDragging ? 0 : ["-40%", "40%"] }}
                    transition={
                      lockDragging
                        ? { duration: 0 }
                        : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                    }
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-[11px] uppercase tracking-[0.32em] text-white/55">
                    swipe across to open
                  </div>
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 140 }}
                    dragElastic={0.1}
                    onDragStart={() => setLockDragging(true)}
                    onDragEnd={(_, info) => {
                      setLockDragging(false);
                      if (info.offset.x > 110) {
                        sliderControls
                          .start({ x: 140, transition: { duration: 0.2 } })
                          .then(() => {
                            setIsLocked(false);
                            if (typeof window !== "undefined") {
                              sessionStorage.setItem("projects-unlocked", "true");
                            }
                          });
                      } else {
                        sliderControls.start({
                          x: 0,
                          transition: { type: "spring", stiffness: 400, damping: 30 },
                        });
                      }
                    }}
                    animate={sliderControls}
                    className="relative z-10 h-8 w-8 rounded-full bg-white/90 shadow-[0_8px_20px_rgba(0,0,0,0.35)] flex items-center justify-center text-xs text-black"
                  >
                    →
                  </motion.div>
                </div>
                <div className="h-1.5 w-28 rounded-full bg-white/30" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isLocked && (
        <button
          onClick={() => {
            setIsLocked(true);
            if (typeof window !== "undefined") {
              sessionStorage.removeItem("projects-unlocked");
            }
          }}
          className="absolute right-3 top-3 z-[55] flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition hover:bg-white/20 hover:scale-[1.03]"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          Lock
        </button>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-2 z-40 flex justify-center">
        <div className="flex items-center gap-2 rounded-full border border-black/8 bg-white/55 px-3 py-1 shadow-[0_4px_18px_rgba(0,0,0,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-black/35">
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] dark:bg-neutral-100" />
          <span className="h-1.5 w-8 rounded-full bg-neutral-900/80 dark:bg-neutral-100/80" />
        </div>
      </div>
      {/* iPad-like status bar */}
      <div className="absolute top-0 inset-x-0 z-30 h-10 px-4 flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-300 pointer-events-none">
        <span>{timeLabel}</span>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-4 rounded-full bg-neutral-400/70 dark:bg-neutral-500/70" />
          <span className="h-1.5 w-3 rounded-full bg-neutral-400/60 dark:bg-neutral-500/60" />
          <span className="h-1.5 w-2 rounded-full bg-neutral-400/50 dark:bg-neutral-500/50" />
        </div>
      </div>
      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.6),transparent_45%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.6),transparent_45%)]" />
      <AnimatePresence mode="wait">
        {gridVisible && !selectedProject && (
          <motion.div
            key={`grid-${active}-${unlockPulse}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col pt-8 min-h-0"
          >
            {/* CATEGORY HEADING */}
            <div className="flex flex-col items-center justify-center pt-6 pb-2 relative z-10">
              <span className="text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">
                Library
              </span>
              <div className="relative w-full flex items-center justify-center">
                <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                  {(() => {
                    const label =
                      CATEGORIES.find((category) => category.key === active)?.label ??
                      "Projects";
                    const count = PROJECTS[active]?.length ?? 0;
                    return `${label} (${count})`;
                  })()}
                </h2>
                {active === "webapps" && null}
              </div>
            </div>

            {/* PROJECT CARDS */}
            <div className="flex-1 relative min-h-0">
              {active === "webapps" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-8 pb-20 sm:pb-28 pt-4 sm:pt-6 h-full place-items-center">
                  {PROJECTS[active].map((p, i) => (
                    <motion.div
                      key={i}
                      className="flex justify-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <ProjectCard
                        project={p}
                        compact
                        onClick={() => {
                          setGridVisible(false);
                          setSelectedProject(p);
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : active === "music" ? (
                <div className="px-4 sm:px-8 pb-20 sm:pb-28 pt-4 sm:pt-6 h-full">
                  <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] gap-4 sm:gap-6 h-full">
                    <div className="rounded-3xl border border-white/10 bg-black/40 p-4 flex flex-col gap-4">
                      <div className="text-xs uppercase tracking-[0.4em] text-white/50 text-center">
                        Now Playing
                      </div>
                      {(() => {
                        const nowPlaying =
                          MUSIC_TRACKS[playingTrack ?? 0] ?? MUSIC_TRACKS[0];
                        return (
                          <>
                        <div className="relative aspect-square w-40 max-w-full rounded-3xl overflow-hidden border border-white/10 bg-white/5 mx-auto flex items-center justify-center">
                          {nowPlaying?.cover ? (
                            <img
                              src={nowPlaying.cover}
                              alt="Music cover"
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-purple-500/20 to-black/60" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          {!nowPlaying?.cover && (
                            <IconMusic className="h-10 w-10 text-white/80" strokeWidth={1.8} />
                          )}
                        </div>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          className="h-11 w-11 rounded-full border border-white/20 text-white/80 flex items-center justify-center"
                          onClick={() => handleTrackPlay(0)}
                          aria-label="Previous"
                        >
                          <IconPlayerTrackPrev className="h-5 w-5" strokeWidth={2} />
                        </button>
                        <button
                          className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center"
                          onClick={() => handleTrackPlay(0)}
                          aria-label={playingTrack === 0 ? "Pause" : "Play"}
                        >
                          {playingTrack === 0 ? (
                            <IconPlayerPause className="h-5 w-5" strokeWidth={2.5} />
                          ) : (
                            <IconPlayerPlay className="h-5 w-5" strokeWidth={2.5} />
                          )}
                        </button>
                        <button
                          className="h-11 w-11 rounded-full border border-white/20 text-white/80 flex items-center justify-center"
                          onClick={() => handleTrackPlay(0)}
                          aria-label="Next"
                        >
                          <IconPlayerTrackNext className="h-5 w-5" strokeWidth={2} />
                        </button>
                      </div>
                          </>
                        );
                      })()}
                      <div className="text-center">
                        <div className="text-xl font-semibold text-white">
                          {(MUSIC_TRACKS[playingTrack ?? 0] ?? MUSIC_TRACKS[0])?.title ?? "NachtsWach"}
                        </div>
                        <div className="text-sm text-white/60">
                          {(MUSIC_TRACKS[playingTrack ?? 0] ?? MUSIC_TRACKS[0])?.artist ?? "Moritz"}
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <button className="px-4 py-2 rounded-full border border-white/20 text-white/70 text-sm">
                          Shuffle
                        </button>
                        <button
                          onClick={() => {
                            setGridVisible(false);
                            setSelectedProject(PROJECTS.music[0]);
                          }}
                          className="px-4 py-2 rounded-full bg-white text-black text-sm font-semibold hover:scale-[1.02] transition"
                        >
                          Open project
                        </button>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-black/30 p-4 sm:p-6 flex flex-col gap-5 sm:gap-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs uppercase tracking-[0.4em] text-white/50">
                            Playlist
                          </div>
                          <div className="text-2xl font-semibold text-white mt-2">
                            Studio Beats
                          </div>
                        </div>
                      <div className="text-sm text-white/50">
                        {MUSIC_TRACKS.length} track
                      </div>
                      </div>
                      <div className="flex flex-col gap-3 overflow-y-auto">
                        {MUSIC_TRACKS.map((track, idx) => (
                          <div
                            key={track.title}
                            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                          >
                            <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl overflow-hidden border border-white/10 bg-white/5">
                              {track.cover ? (
                                <img
                                  src={track.cover}
                                  alt={`${track.title} cover`}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center text-white/60 text-sm">
                                  {String(idx + 1).padStart(2, "0")}
                                </div>
                              )}
                            </div>
                              <div>
                                <div className="text-white font-medium">{track.title}</div>
                                <div className="text-xs text-white/50">{track.artist}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-white/50 text-sm">
                              <span>{track.length}</span>
                              <button
                                className="h-9 w-9 rounded-full border border-white/20 text-white/70"
                                onClick={() => handleTrackPlay(idx)}
                              >
                                {playingTrack === idx ? "❚❚" : "▶"}
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                          Demo track only for now — more songs will drop soon.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : active === "websites" ? (
                <div className="px-4 sm:px-8 pb-20 sm:pb-28 pt-4 sm:pt-6 h-full">
                  <div className="rounded-3xl border border-white/10 bg-white/10 dark:bg-black/40 p-5 h-full flex flex-col gap-4">
                    {/* Browser chrome */}
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <span className="h-3 w-3 rounded-full bg-red-400/80" />
                        <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                        <span className="h-3 w-3 rounded-full bg-green-400/80" />
                      </div>
                      <div className="flex-1 rounded-full border border-white/10 bg-white/20 dark:bg-white/5 px-4 py-2 text-xs text-white/70">
                        https://portfolio.moritz.dev
                      </div>
                      <div className="text-xs text-white/50">⌘L</div>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      {PROJECTS.websites.map((p, idx) => (
                        <div
                          key={p.title}
                          className={cn(
                            "px-3 py-1.5 rounded-full border border-white/10 bg-white/5",
                            idx === 0 && "bg-white/20 text-white"
                          )}
                        >
                          {p.title}
                        </div>
                      ))}
                    </div>

                    {/* Website cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 flex-1 overflow-y-auto">
                      {PROJECTS.websites.map((p, i) => (
                        <motion.div
                          key={p.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                        >
                          <button
                            onClick={() => {
                              setGridVisible(false);
                              setSelectedProject(p);
                            }}
                            className="group relative rounded-3xl border border-white/10 bg-white/5 overflow-hidden text-left w-full"
                          >
                            <img src={p.image} className="h-36 w-full object-cover" />
                            <div className="p-4">
                              <div className="text-white font-semibold">{p.title}</div>
                              <div className="text-xs text-white/60 mt-1">{p.description}</div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex justify-center pt-1">
                      <div className="rounded-full border border-white/12 bg-white/[0.05] px-5 py-2 text-xs font-medium uppercase tracking-[0.28em] text-white/55">
                        More coming soon
                      </div>
                    </div>
                  </div>
                </div>
              ) : active === "games" ? (
                <div className="px-4 sm:px-8 pb-20 sm:pb-28 pt-4 sm:pt-6 h-full">
                  <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/20 via-blue-900/40 to-black/80 p-4 h-full flex flex-col gap-4">
                    <div className="flex items-center justify-between text-white/70 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
                        <span className="uppercase tracking-[0.35em]">Games</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        Online
                      </div>
                    </div>

                    <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2">
                      {PROJECTS.games.map((p, i) => (
                        <motion.div
                          key={p.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                        >
                          <button
                            onClick={() => {
                              setGridVisible(false);
                              setSelectedProject(p);
                            }}
                            className={cn(
                              "relative rounded-3xl border border-white/10 bg-white/5 overflow-hidden text-left flex-shrink-0",
                              i === 0 ? "w-64 h-40" : "w-44 h-28"
                            )}
                          >
                            <img src={p.image} className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                            <div className="absolute bottom-3 left-3 text-white">
                              <div className={cn("font-semibold", i === 0 ? "text-lg" : "text-sm")}>
                                {p.title}
                              </div>
                              <div className="text-[10px] text-white/70">
                                {i === 0 ? "Featured" : "Quick launch"}
                              </div>
                            </div>
                          </button>
                        </motion.div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4 flex-1">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12 }}
                        className="rounded-3xl border border-white/10 bg-black/35 p-4 flex flex-col gap-3"
                      >
                        <div className="text-xs uppercase tracking-[0.3em] text-white/50">What&apos;s New</div>
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-white/10" />
                          <div>
                            <div className="text-white font-semibold">{PROJECTS.games[0]?.title}</div>
                            <div className="text-[11px] text-white/60">New build deployed • 2h ago</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const first = PROJECTS.games[0];
                              if (!first) return;
                              setGridVisible(false);
                              setSelectedProject(first);
                            }}
                            className="px-3 py-1 rounded-full bg-white text-black text-[10px] font-semibold"
                          >
                            Play
                          </button>
                          <button
                            onClick={() => {
                              const first = PROJECTS.games[0];
                              if (!first) return;
                              setGridVisible(false);
                              setSelectedProject(first);
                            }}
                            className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px]"
                          >
                            Details
                          </button>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-3xl border border-white/10 bg-black/35 p-4 flex flex-col gap-3"
                      >
                        <div className="text-xs uppercase tracking-[0.3em] text-white/50">Now Playing</div>
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-xl bg-white/10" />
                          <div>
                            <div className="text-white font-semibold">Arcade Session</div>
                            <div className="text-[11px] text-white/60">Quest mode • 18 min</div>
                          </div>
                        </div>
                        <div className="mt-auto flex items-center justify-between text-[11px] text-white/60">
                          <span>Trophies</span>
                          <span>12</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full w-[55%] bg-gradient-to-r from-indigo-400 to-purple-500" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              ) : active === "ecommerce" ? (
                <div className="px-4 sm:px-8 pb-20 sm:pb-28 pt-4 sm:pt-6 h-full overflow-y-auto overscroll-contain min-h-0">
                  <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-black/50 to-black/70 p-4 h-full flex flex-col gap-3 overflow-hidden min-h-0">
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <div className="uppercase tracking-[0.35em]">Storefront</div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        Live
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-3 flex-1 min-h-0 overflow-hidden">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 }}
                        className="rounded-3xl border border-white/10 bg-black/40 p-3 flex flex-col gap-3 overflow-y-auto min-h-0 h-full"
                      >
                        <div className="text-xs uppercase tracking-[0.3em] text-white/50">Projects</div>
                        <div className="grid h-1/2 flex-none auto-rows-fr content-start grid-cols-2 gap-3">
                          {PROJECTS.ecommerce.map((project) => (
                            <div key={project.title} className="flex items-start">
                              <button
                                onClick={() => {
                                  setGridVisible(false);
                                  setSelectedProject(project);
                                }}
                                className="group relative h-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 text-left w-full min-h-[78px] flex flex-col"
                              >
                                <div className="h-[38%] w-full overflow-hidden">
                                  <img
                                    src={project.image}
                                    alt={project.title}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                                  />
                                </div>
                                <div className="p-2.5 flex-1">
                                <div className="text-white font-semibold">{project.title}</div>
                                <div className="text-[11px] text-white/60 mt-1">
                                  {project.description}
                                </div>
                                </div>
                              </button>
                            </div>
                          ))}
                          <div className="flex items-start">
                            <div className="relative h-full rounded-2xl overflow-hidden border border-dashed border-white/15 bg-white/[0.04] text-left w-full min-h-[78px] flex flex-col justify-between p-3">
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
                              <div className="relative">
                                <div className="text-[10px] uppercase tracking-[0.28em] text-white/45">
                                  E-Commerce
                                </div>
                                <div className="mt-2 text-base font-semibold text-white">
                                  More coming soon
                                </div>
                                <div className="mt-1.5 text-[10px] leading-relaxed text-white/55">
                                  More store concepts and product experiments are already in progress.
                                </div>
                              </div>
                              <div className="relative mt-2 text-[9px] uppercase tracking-[0.24em] text-white/30">
                                Next launches
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.16 }}
                        className="rounded-3xl border border-white/10 bg-black/40 p-3 flex flex-col gap-3 overflow-y-auto min-h-0 h-full"
                      >
                        <div className="text-xs uppercase tracking-[0.3em] text-white/50">Revenue Snapshot</div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                          <div className="flex items-center justify-between text-[11px] text-white/60">
                            <span>Learning demo</span>
                            <span>~€120</span>
                          </div>
                          <div className="mt-2 h-16 rounded-xl bg-gradient-to-r from-emerald-400/30 via-teal-400/20 to-transparent relative overflow-hidden">
                            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.25)_1px,transparent_1px)] bg-[length:20px_100%] opacity-40" />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[length:100%_20px] opacity-40" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: "Revenue", value: "≈ €120" },
                            { label: "Stores", value: "2" },
                            { label: "Orders", value: "Demo only" },
                            { label: "Conversion", value: "Learning" },
                          ].map((item) => (
                            <div
                              key={item.label}
                              className="rounded-2xl border border-white/10 bg-white/5 p-2"
                            >
                              <div className="text-[11px] text-white/50">{item.label}</div>
                              <div className="text-white font-semibold mt-1">{item.value}</div>
                            </div>
                          ))}
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-2 text-[11px] text-white/60">
                          Active learning field — independent practice, not professional yet.
                        </div>
                        <button
                          onClick={() => {
                            const first = PROJECTS.ecommerce[0];
                            if (!first) return;
                            setGridVisible(false);
                            setSelectedProject(first);
                          }}
                          className="mt-auto px-4 py-2 rounded-full bg-white text-black text-sm font-semibold"
                        >
                          Open store project
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              ) : active === "social" ? (
                <div className="px-4 sm:px-8 pb-20 sm:pb-28 pt-4 sm:pt-6 h-full">
                  <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-pink-500/10 via-black/40 to-black/70 p-4 h-full flex flex-col gap-4">
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <div className="uppercase tracking-[0.35em]">Social Feed</div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-pink-400" />
                        Live
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xl font-semibold text-white">Socialgram</div>
                      <div className="flex items-center gap-2 text-white/60 text-xs">
                        <span className="px-3 py-1 rounded-full border border-white/20 bg-white/5">Search</span>
                        <span className="px-3 py-1 rounded-full border border-white/20 bg-white/5">DMs</span>
                      </div>
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {PROJECTS.social.map((p) => (
                        <div key={`${p.title}-story`} className="flex flex-col items-center gap-1">
                          <div className="h-14 w-14 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-amber-400">
                            <div className="h-full w-full overflow-hidden rounded-full border border-black/40 bg-black/70">
                              <img
                                src={p.title === "mxritttz" ? "/images/InstaPB.PNG" : p.image}
                                alt={`${p.title} story`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="text-[10px] text-white/60">{p.title}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                      {PROJECTS.social.map((p, i) => (
                        <motion.button
                          key={p.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          onClick={() => {
                            setGridVisible(false);
                            setSelectedProject(p);
                          }}
                          className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden text-left w-full hover:border-white/30 hover:bg-white/10 transition"
                        >
                          <div className="flex items-center gap-3 px-4 py-3">
                          <div className="h-9 w-9 overflow-hidden rounded-full border border-white/15 bg-white/10">
                            <img src="/images/InstaPB.PNG" alt={`${p.title} profile picture`} className="h-full w-full object-cover" />
                          </div>
                            <div>
                              <div className="text-white font-semibold text-sm">{p.title}</div>
                              <div className="text-[11px] text-white/50">2h ago • @{p.title.toLowerCase()}</div>
                            </div>
                          </div>
                          {"feedImages" in p && Array.isArray(p.feedImages) ? (
                            <div className="grid h-56 w-full grid-cols-[1.3fr_0.9fr] gap-[2px] overflow-hidden bg-black/40">
                              <div className="overflow-hidden">
                                <img src={p.feedImages[0]} alt={`${p.title} feed preview`} className="h-full w-full object-cover object-center" />
                              </div>
                              <div className="grid grid-cols-2 grid-rows-2 gap-[2px]">
                                {p.feedImages.slice(1, 5).map((img: string) => (
                                  <div key={img} className="overflow-hidden">
                                    <img src={img} alt={`${p.title} feed preview`} className="h-full w-full object-cover object-center" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="grid h-56 w-full place-items-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),rgba(255,255,255,0.02)_38%,rgba(0,0,0,0.55)_100%)] p-3">
                              <img src={p.image} alt={p.title} className="h-full w-auto max-w-full object-contain" />
                            </div>
                          )}
                          <div className="px-4 py-3 text-white/70 text-sm">
                            {p.description}
                          </div>
                          <div className="px-4 pb-4 flex items-center justify-between text-white/50 text-xs">
                            <span>♥ 1.2k • 💬 120 • ↗︎ 38</span>
                            <span className="px-3 py-1 rounded-full border border-white/20 text-white/70 text-[11px]">
                              Open project
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : active === "websites" ? (
                <div className="px-4 sm:px-8 pb-20 sm:pb-28 pt-4 sm:pt-6 h-full">
                  <div className="h-full">
                    <div className="mb-4 flex items-center gap-3">
                      {PROJECTS.websites.map((p) => (
                        <span
                          key={`${p.title}-badge`}
                          className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/75"
                        >
                          {p.title}
                        </span>
                      ))}
                      <span className="rounded-full border border-dashed border-white/15 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white/60">
                        More coming soon
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                    {PROJECTS.websites.map((p, i) => (
                      <motion.div
                        key={p.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <ProjectCard
                          project={p}
                          onClick={() => {
                            setGridVisible(false);
                            setSelectedProject(p);
                          }}
                        />
                      </motion.div>
                    ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={cn(
                    "flex gap-6 overflow-x-scroll overflow-y-visible snap-x snap-mandatory pb-28 pt-4 h-full items-end scrollbar-none relative z-20",
                    (active === "websites" || active === "games") && "pl-6"
                  )}
                >
                  {PROJECTS[active].map((p, i) => (
                    <motion.div
                      key={i}
                      className="snap-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <ProjectCard
                        project={p}
                        onClick={() => {
                          setGridVisible(false);
                          setSelectedProject(p);
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onBack={() => {
              stopMusicPreview();
              window.dispatchEvent(new Event("musiclab:stop"));
              setSelectedProject(null);
              setGridVisible(true);
            }}
          />
        )}
      </AnimatePresence>
      {/* iPad-like dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 h-16 w-[78%] rounded-3xl bg-white/70 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-[0_12px_34px_rgba(0,0,0,0.16)] flex items-center justify-center gap-5 z-30">
        {[
          {
            key: "webapps",
            label: "WebApps",
            icon: IconApps,
            gradient: "from-cyan-400 to-blue-500",
            glow: "rgba(56,189,248,0.35)",
          },
          {
            key: "websites",
            label: "Websites",
            icon: IconWorldWww,
            gradient: "from-fuchsia-400 to-pink-500",
            glow: "rgba(236,72,153,0.35)",
          },
          {
            key: "games",
            label: "Games",
            icon: IconDeviceGamepad2,
            gradient: "from-purple-400 to-indigo-500",
            glow: "rgba(139,92,246,0.35)",
          },
          {
            key: "ecommerce",
            label: "E-Commerce",
            icon: IconShoppingBag,
            gradient: "from-emerald-400 to-teal-500",
            glow: "rgba(16,185,129,0.35)",
          },
          {
            key: "social",
            label: "Social",
            icon: IconUsers,
            gradient: "from-amber-400 to-orange-500",
            glow: "rgba(245,158,11,0.35)",
          },
          {
            key: "music",
            label: "Music",
            icon: IconMusic,
            gradient: "from-lime-400 to-green-500",
            glow: "rgba(132,204,22,0.35)",
          },
        ].map((item, index) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          const shouldPulse = dockPulseIndex === index;
          return (
            <button
              key={item.key}
              onClick={() => {
                stopMusicPreview();
                setActive(item.key);
              }}
              aria-label={item.label}
              className={cn(
                "h-11 w-11 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-[0_10px_18px_rgba(0,0,0,0.24)] transition",
                item.gradient,
                isActive && "scale-110 ring-2 ring-white/70",
                shouldPulse && "animate-dock-bounce"
              )}
              style={{ boxShadow: `0 8px 16px ${item.glow}` }}
            >
              <Icon className="h-5 w-5 text-white drop-shadow" strokeWidth={2} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
