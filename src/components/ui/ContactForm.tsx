"use client";

import React, { useEffect, useState } from "react";

export function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    _gotcha: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [toast, setToast] = useState<null | "success" | "error">(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      if (formState._gotcha.trim()) {
        setStatus("success");
        setToast("success");
        setFormState({ name: "", email: "", message: "", _gotcha: "" });
        return;
      }
      const response = await fetch("https://formspree.io/f/xdannzlq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "", _gotcha: "" });
        setToast("success");
      } else {
        setStatus("error");
        setToast("error");
      }
    } catch (error) {
      setStatus("error");
      setToast("error");
    }
  };

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden py-14 sm:py-20 px-4 sm:px-6 bg-zinc-950 text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-[90px]" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-sky-500/20 blur-[110px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        
        {/* Left Side: Contact Info */}
        <div className="flex flex-col justify-center space-y-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-emerald-200">
            Open for collaborations
          </span>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            Let&apos;s build something
            <span className="block bg-gradient-to-r from-emerald-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
              unforgettable
            </span>
          </h2>
          <p className="text-lg text-zinc-300">
            Contact me for projects, collaborations or just to say hi! 
            I’d love to hear from you.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="text-lg">📝</span>
              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-400">Contact</p>
                <p className="text-white">Please use the form to reach me.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="text-lg">📍</span>
              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-400">Location</p>
                <p className="text-white">70565 Stuttgart</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_60px_rgba(16,185,129,0.12)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
          <form onSubmit={handleSubmit} className="relative space-y-5">
            <div className="grid grid-cols-1 gap-4">
              <label className="sr-only">
                Website
                <input
                  type="text"
                  name="_gotcha"
                  value={formState._gotcha}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
              <label className="space-y-2 text-sm text-zinc-300">
                Name
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Dein Name"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-3 text-white outline-none ring-0 transition focus:border-emerald-400/60 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.2)]"
                />
              </label>
              <label className="space-y-2 text-sm text-zinc-300">
                Email
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="dein@email.de"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-3 text-white outline-none ring-0 transition focus:border-emerald-400/60 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.2)]"
                />
              </label>
              <label className="space-y-2 text-sm text-zinc-300">
                Nachricht
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Erzähl mir kurz von deinem Projekt..."
                  rows={6}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-3 text-white outline-none ring-0 transition focus:border-emerald-400/60 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.2)]"
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-400 px-6 py-4 font-semibold text-zinc-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="relative z-10">
                {status === "sending" ? "Sending..." : "Send Message"}
              </span>
              <span className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <span className="absolute -left-8 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-white/30 blur-2xl" />
              </span>
            </button>
          </form>
          {toast && (
            <div
              role="status"
              className={`pointer-events-none absolute bottom-6 right-6 rounded-full px-4 py-2 text-xs font-semibold shadow-lg ${
                toast === "success"
                  ? "bg-emerald-400/90 text-black"
                  : "bg-rose-400/90 text-black"
              }`}
            >
              {toast === "success" ? "Message sent ✓" : "Something went wrong"}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
