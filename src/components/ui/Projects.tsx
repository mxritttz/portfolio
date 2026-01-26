"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { CardContainer, CardBody, CardItem } from "../ui/3d-card";
import { CometCard } from "@/components/ui/comet-card";
import DecisionHelper from "./DecisionHelper";
import TradingApp from "./TradingApp";

// ----------------------------------------
// CATEGORY DATA
// ----------------------------------------
const CATEGORIES = [
  { key: "webapps", label: "WebApps (5)" },
  { key: "websites", label: "Websites (4)" },
  { key: "games", label: "Games (1)" },
  { key: "ecommerce", label: "E-Commerce (2)" },
  { key: "social", label: "Social Media (2)" },
  { key: "music", label: "Music (2)" },
];

// Example projects
const PROJECTS: Record<string, any[]> = {
  webapps: [
   {
  type: "comet",
  title: "OINK-Trading",
  image: "/TradingPreview.jpg",
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
                <div className="flex flex-col sm:flex-row gap-6 items-start relative z-10">
                  {/* Image */}
                  <div className="flex-shrink-0 w-full sm:w-1/3 h-64 sm:h-64 rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105">
                    <img
                      src="/OINK.png"
                      alt="OINK Project"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  {/* Text & Badges */}
                  <div className="flex-1 flex flex-col gap-4">
                    <h2 className="text-3xl font-extrabold tracking-wide">
                      OINK
                    </h2>

                    <p className="text-gray-300 leading-relaxed">
                      A demo trading platform created during my 4th semester at
                      university. Dockerized and providing real-time financial
                      data via web scraping.
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mt-2">
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
                {/* Back Button */}
                <button
                  onClick={() => setShowApp(false)}
                  className="absolute top-4 left-4 z-50 px-4 py-2 rounded-xl
                             bg-black/60 text-white backdrop-blur
                             hover:bg-black/80 transition"
                >
                  ← Back
                </button>

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
  image: "/MessangerPreview.jpg",
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
        <div className="w-64 sm:w-80 aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105">
          <img
            src="/chatapp2.png"
            alt="ChatApp Project"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Features */}
      <div className="flex flex-col gap-4 text-gray-300 leading-relaxed relative z-10 max-w-4xl mx-auto text-center">
        <ul className="list-disc list-inside space-y-2">
          <li>Real-time chat via WebSockets</li>
          <li>Mobile-first UI with Angular + Tailwind</li>
          <li>Component & E2E testing</li>
          <li>Dockerized development & deployment</li>
        </ul>
      </div>

      {/* Gallery (Vertical Screens) */}
      <div className="relative z-10">
        <h3 className="text-xl font-semibold mb-4 text-center">Community Preview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
          {["/Community1.png", "/Community2.png", "/Community3.png"].map((img) => (
            <div
              key={img}
              className="w-40 sm:w-48 aspect-[9/16] rounded-xl overflow-hidden shadow-xl
                         hover:scale-105 transition-transform"
            >
              <img src={img} className="w-full h-full object-cover" />
            </div>
          ))}
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
      title: "MyOwnRAG",
      image: "/RAGCover.jpg",
      description: "Classic Retrieval-Augmented Generation that connects uploaded PDFs with OpenAIs ChatGPT.",
      customContent: (
  <div className="relative flex flex-col h-full w-full overflow-y-auto text-white p-6 space-y-6
                  before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),_transparent_60%)]
                  before:pointer-events-none">
    
    {/* Header & Title */}
    <div className="flex flex-col sm:flex-row gap-6 items-start relative z-10">
      {/* Image */}
      <div className="flex-shrink-0 w-full sm:w-1/3 h-64 rounded-xl overflow-hidden shadow-2xl
                      transform transition-transform duration-500 hover:scale-105">
        <img
          src="/RAG1.png"
          alt="MyOwnRAG UI"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text & Badges */}
      <div className="flex-1 flex flex-col gap-4">
        <h2 className="text-3xl font-extrabold tracking-wide animate-fadeIn">
          MyOwnRAG
        </h2>

        <p className="text-gray-300 leading-relaxed animate-fadeIn delay-100">
          MyOwnRAG is a lightweight Retrieval-Augmented Generation (RAG) system.
          Users can upload PDF documents, ask natural language questions, and
          receive precise answers enriched with source citations.
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-2">
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
      image: "/MeetCover.jpg",
      description: "Simple software that lets users find and join groups for different activities.",
      customContent: (
  <div className="relative flex flex-col h-full w-full overflow-y-auto text-white p-6 space-y-6
                  before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.15),_transparent_60%)]
                  before:pointer-events-none">
    
    {/* Header & Title */}
    <div className="flex flex-col sm:flex-row gap-6 items-start relative z-10">
      {/* Images */}
      <div className="flex-shrink-0 w-full sm:w-1/3 grid grid-cols-2 gap-3">
        <img
          src="/Meet1.png"
          alt="Meet App Screenshot 1"
          className="h-40 w-full object-cover rounded-xl shadow-xl hover:scale-105 transition"
        />
        <img
          src="/Meet2.png"
          alt="Meet App Screenshot 2"
          className="h-40 w-full object-cover rounded-xl shadow-xl hover:scale-105 transition"
        />
      </div>

      {/* Text & Badges */}
      <div className="flex-1 flex flex-col gap-4">
        <h2 className="text-3xl font-extrabold tracking-wide animate-fadeIn">
          Meet
        </h2>

        <p className="text-gray-300 leading-relaxed animate-fadeIn delay-100">
          Meet is one of my first university projects. It focuses on building a
          structured desktop application with a clean UI and solid software
          engineering fundamentals.
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-2">
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
  image: "/DHCover.jpg",
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
                <div className="flex flex-col sm:flex-row gap-6 items-start relative z-10">
                  {/* Images */}
                  <div className="flex-shrink-0 w-full sm:w-1/3 grid grid-cols-2 gap-3">
                    <img
                      src="/DH1.png"
                      alt="Decision Helper Screenshot 1"
                      className="h-40 w-full object-cover rounded-xl shadow-xl
                                 transition-transform duration-500 hover:scale-105"
                    />
                    <img
                      src="/DH2.png"
                      alt="Decision Helper Screenshot 2"
                      className="h-40 w-full object-cover rounded-xl shadow-xl
                                 transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 flex flex-col gap-4">
                    <h2 className="text-3xl font-extrabold tracking-wide">
                      Decision Helper
                    </h2>

                    <p className="text-gray-300 leading-relaxed">
                      Decision Helper is a web application designed to support
                      structured decision-making. Users can compare multiple
                      options based on custom criteria and weightings, making
                      complex decisions more transparent and data-driven.
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mt-2">
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
                className="relative h-full w-full"
              >
                <DecisionHelper />
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
        <div className="flex-1 h-[400px] sm:h-[500px] rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105">
          <img
            src="/WS1.png"
            alt="Car Dealership Screenshot 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 h-[400px] sm:h-[500px] rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105">
          <img
            src="/WS2.png"
            alt="Car Dealership Screenshot 2"
            className="w-full h-full object-cover"
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
                       hover:scale-105 transition-transform"
          >
            <img src={img} className="w-full h-full object-cover" />
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
      <div className="flex flex-col sm:flex-row gap-6 items-start relative z-10">
        {/* Images */}
        <div className="flex-shrink-0 w-full sm:w-1/3 grid grid-cols-2 gap-3">
          <img
            src="/GCR1.png"
            alt="CalaxyCrystalRush Screenshot 1"
            className="h-40 w-full object-cover rounded-xl shadow-xl transition-transform duration-500 hover:scale-105"
          />
          <img
            src="/GCR2.png"
            alt="CalaxyCrystalRush Screenshot 2"
            className="h-40 w-full object-cover rounded-xl shadow-xl transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Text */}
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold tracking-wide">
            CalaxyCrystalRush
          </h2>

          <p className="text-gray-300 leading-relaxed">
            CalaxyCrystalRush is a game I developed in LUA using LÖVE during my semester abroad in Lisbon. 
            The universe has fallen into darkness, and one lonely galaxy is trying to save it by spreading light across the world.
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mt-2">
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
  ecommerce: [{ type: "comet", title: "Store Engine", image: "/ChatApp1.png", description: "E-commerce engine with analytics." }],
  social: [{ type: "comet", title: "Planner", image: "/ChatApp1.png", description: "Social planner app." }],
  music: [{ type: "comet", title: "SoundWave", image: "/ChatApp1.png", description: "Music streaming app with playlists." }],
};

// ----------------------------------------
// CARD RENDERER
// ----------------------------------------
function ProjectCard({ project, onClick }: any) {
  const baseClass = "cursor-pointer";

  if (project.type === "3d") {
    return (
      <CardContainer className="inter-var">
        <CardBody
          onClick={onClick}
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
    return (
      <CometCard>
        <div onClick={onClick} className={`${baseClass} w-[20vw] sm:w-[20vw] h-[45vh] bg-[#1F2121] p-3 rounded-3xl flex flex-col`}>
          <div className="relative flex-1">
            <img src={project.image} className="absolute inset-0 h-full w-full rounded-2xl object-cover" />
          </div>
          <div className="p-4 text-white text-sm font-mono opacity-90">{project.title}</div>
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
        className="self-start px-4 py-2 bg-black dark:bg-white dark:text-black text-white rounded-xl font-semibold hover:scale-105 transition"
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
            <img key={idx} src={img} className="w-full h-64 object-cover rounded-xl shadow-lg" />
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

  return (
    <div className="w-full h-full flex flex-col gap-5 bg-gray-100 dark:bg-red-900 overflow-hidden relative">
      <AnimatePresence mode="wait">
        {gridVisible && !selectedProject && (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col"
          >
            {/* CATEGORY SELECTOR */}
            <div className="flex items-center justify-center p-4">
              <div className="flex bg-white dark:bg-neutral-800 border dark:border-neutral-700 rounded-3xl p-2 overflow-x-auto">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setActive(category.key)}
                    className={cn(
                      "px-6 py-3 rounded-2xl text-base whitespace-nowrap transition-all",
                      active === category.key
                        ? "bg-black text-white dark:bg-white dark:text-black shadow-lg"
                        : "text-neutral-600 dark:text-neutral-300"
                    )}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* PROJECT CARDS */}
            <div className="flex-1 relative">
              <div className="flex gap-8 overflow-x-scroll snap-x snap-mandatory pb-10 pt-4 h-full scrollbar-none">
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
            </div>
          </motion.div>
        )}

        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onBack={() => {
              setSelectedProject(null);
              setGridVisible(true);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
