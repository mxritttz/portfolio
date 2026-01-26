"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "2020",
      content: (
        <div className="min-h-[100vh] flex items-center">
          <p className="text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Finished my general high school diploma with a grade of 1.5.
          </p>
        </div>
      ),
    },
    {
      title: "2021",
      content: (
        <div className="min-h-[100vh] flex items-center">
          <p className="text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Started my studies in media informatics at HdM Stuttgart, developing several projects.
          </p>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div className="min-h-[100vh] flex items-center">
          <p className="text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Participated in hackathons and side projects, focusing on web and game development.
          </p>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div className="min-h-[100vh] flex items-center">
          <p className="text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Internship at doubleSlash in Stuttgart, developing enterprise applications with Java and SpringBoot.
          </p>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div className="min-h-[100vh] flex items-center">
          <p className="text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            6th semester abroad in Lisbon, developing games and learning character modeling.
          </p>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div className="min-h-[100vh] flex items-center">
          <p className="text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Finished my bachelor's degree in media informatics at HdM Stuttgart with a grade of 1.2 and worked as an entertainer in Greece.
          </p>
        </div>
      ),
    },
    {
      title: "2026",
      content: (
        <div className="min-h-[100vh] flex items-center">
          <p className="text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Currently looking for exciting opportunities worldwide to grow personally and professionally.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full">
      <Timeline data={data} />
    </div>
  );
}
