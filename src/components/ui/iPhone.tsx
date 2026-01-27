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
  const messages: Array<
    | { text: string; tone: "primary" }
    | { tone: "cta"; links: Array<{ label: string; href: string }> }
  > = [
    { text: "Hey 👋 I’m Moritz.", tone: "primary" },
    { text: "I’m based in Germany 🇩🇪", tone: "primary" },
    { text: "I make some cool stuff — look around.", tone: "primary" },
    {
      tone: "cta",
      links: [
        { label: "Projects", href: "/#projects" },
        { label: "Skills", href: "/#skills" },
        { label: "Contact", href: "/#iphone" },
      ],
    },
    { text: "Available for freelancing and fully remote part‑time.", tone: "primary" },
  ];

  return (
    <div className="absolute inset-0 bg-[#F2F2F7] flex flex-col">

      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b bg-white text-sm font-medium">
        <div className="leading-tight">
          <p className="text-sm font-semibold text-black">Moritz</p>
          <div className="flex items-center gap-1 text-[10px] text-neutral-400">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Online
          </div>
        </div>
        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-cyan-400 via-pink-400 to-purple-500" />
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-hidden">
        <div className="text-[10px] text-neutral-400 text-center">Today</div>
        {messages.map((msg, i) => {
          const isCta = msg.tone === "cta";
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.2, duration: 0.45, ease: "easeOut" }}
              className={`
                ml-auto max-w-[78%]
                px-4 py-2 rounded-2xl
                ${
                  isCta
                    ? "bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 text-white font-semibold shadow-[0_8px_20px_rgba(236,72,153,0.35)]"
                    : "bg-gradient-to-br from-[#22D3EE] via-[#38BDF8] to-[#A855F7] text-white shadow-[0_6px_16px_rgba(56,189,248,0.35)]"
                }
                text-sm leading-snug
                rounded-br-md
                backdrop-blur
              `}
            >
              {isCta ? (
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  {msg.links.map((link, idx) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="underline underline-offset-2 hover:opacity-90 transition"
                    >
                      {link.label}
                      {idx < msg.links.length - 1 ? " •" : ""}
                    </a>
                  ))}
                </div>
              ) : (
                msg.text
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Input Bar */}
      <div className="h-12 bg-white border-t flex items-center px-3 text-xs text-neutral-400">
        iMessage
      </div>
    </div>
  );
};
