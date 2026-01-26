"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { useState } from "react";

export default function IPhone() {
  const [unlocked, setUnlocked] = useState(false);

  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, -120], [1, 0]);
  const scale = useTransform(y, [0, -120], [1, 0.96]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative h-full aspect-[10/19.5] bg-black rounded-[2.5rem] shadow-xl overflow-hidden">

        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30" />

        {/* LOCK SCREEN */}
        {!unlocked && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-black text-white z-20"
            style={{ opacity, scale }}
            drag="y"
            dragConstraints={{ top: -150, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y < -120) setUnlocked(true);
            }}
          >
            {/* Time */}
            <div className="pt-20 flex flex-col items-center">
              <p className="text-[4.5rem] font-semibold tracking-tight leading-none">
                20:01
              </p>
              <p className="mt-1 text-sm opacity-80">
                Monday, September 23
              </p>
            </div>

            {/* Notification */}
            <div className="mt-10 px-4">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-lg">
                <div className="flex items-center gap-2 text-xs uppercase opacity-70">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  Messages
                </div>
                <p className="mt-1 text-sm font-medium">
                  New message from <span className="font-semibold">Moritz</span>
                </p>
              </div>
            </div>

            {/* Swipe hint */}
<motion.div
  className="absolute bottom-8 w-full flex flex-col items-center gap-2"
  animate={{
    y: [0, -6, 0],
  }}
  transition={{
    duration: 1.6,
    ease: "easeInOut",
    repeat: Infinity,
  }}
>
  <motion.p
    className="text-xs"
    animate={{
      opacity: [0.6, 1, 0.6],
      textShadow: [
        "0px 0px 0px rgba(255,255,255,0)",
        "0px 0px 8px rgba(255,255,255,0.6)",
        "0px 0px 0px rgba(255,255,255,0)",
      ],
    }}
    transition={{
      duration: 1.6,
      ease: "easeInOut",
      repeat: Infinity,
    }}
  >
    Swipe up to unlock
  </motion.p>

  <motion.div
    className="w-16 h-1 rounded-full bg-white/50"
    animate={{
      boxShadow: [
        "0px 0px 0px rgba(255,255,255,0)",
        "0px 0px 10px rgba(255,255,255,0.7)",
        "0px 0px 0px rgba(255,255,255,0)",
      ],
    }}
    transition={{
      duration: 1.6,
      ease: "easeInOut",
      repeat: Infinity,
    }}
  />
</motion.div>

          </motion.div>
        )}

        {/* iMessage */}
        {unlocked && <IMessageChat />}
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* iMessage Screen */
/* ---------------------------------- */

const IMessageChat = () => {
  const messages = [
    { text: "Hey 👋" },
    { text: "I’m Moritz." },
    { text: "Full-Stack Developer from Germany 🇩🇪" },
    { text: "I design & build modern web apps." },
    { text: "Scroll my site to explore more." },
  ];

  return (
    <div className="absolute inset-0 bg-[#F2F2F7] flex flex-col">

      {/* Header */}
      <div className="h-14 flex items-center justify-center border-b bg-white text-sm font-medium">
        Moritz
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-2 overflow-hidden">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.25 }}
            className="
              ml-auto max-w-[75%]
              px-4 py-2 rounded-2xl
              bg-[#0A84FF] text-white
              text-sm leading-snug
              rounded-br-md
            "
          >
            {msg.text}
          </motion.div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="h-12 bg-white border-t flex items-center px-3 text-xs text-neutral-400">
        iMessage
      </div>
    </div>
  );
};
