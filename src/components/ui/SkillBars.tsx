"use client";

import { motion } from "motion/react";

type Skill = {
  name: string;
  level: number;
  experience: string;
  tag: string;
};

interface SkillBarsProps {
  skills: Skill[];
}

export function SkillBars({ skills }: SkillBarsProps) {
  return (
    <div className="space-y-3 w-full">
      {skills.map((skill, i) => (
        <div key={i}>
          {/* Label */}
          <div className="flex justify-between text-sm mb-1">
            <span className="text-neutral-800 dark:text-neutral-200">
              {skill.name}
            </span>
            <span className="text-neutral-400">
              {skill.experience}
            </span>
          </div>

          {/* Bar */}
          <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-500 shadow-[0_0_12px_rgba(236,72,153,0.55)]"
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="mt-2">
            <span className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-900 px-2.5 py-1 text-xs font-semibold text-neutral-700 dark:text-neutral-200">
              {skill.tag}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
