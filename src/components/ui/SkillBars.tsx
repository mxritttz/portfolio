"use client";

import { motion } from "motion/react";

type Skill = {
  name: string;
  level: number;
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
              {skill.level}%
            </span>
          </div>

          {/* Bar */}
          <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-cyan-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
