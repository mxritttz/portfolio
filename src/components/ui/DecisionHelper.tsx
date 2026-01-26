"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, ArrowLeftRight, ArrowRight } from "lucide-react";

// ------------------------------
// TYPES
// ------------------------------
type Item = {
  text: string;
  weight: number;
};

type Decision = {
  name: string;
  pros: Item[];
  cons: Item[];
};

// ------------------------------
// MAIN COMPONENT
// ------------------------------
export default function DecisionHelper() {
  const [mode, setMode] = useState<"single" | "compare">("single");
  const [focused, setFocused] = useState<"A" | "B">("A");

  const [decisionA, setDecisionA] = useState<Decision>({
    name: "Decision A",
    pros: [],
    cons: [],
  });

  const [decisionB, setDecisionB] = useState<Decision>({
    name: "Decision B",
    pros: [],
    cons: [],
  });

  const [input, setInput] = useState("");
  const [type, setType] = useState<"pro" | "con">("pro");

  const [editingName, setEditingName] = useState<null | "A" | "B">(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // ------------------------------
  // PERSISTENCE
  // ------------------------------
  useEffect(() => {
    const saved = localStorage.getItem("decision-helper-v8");
    if (saved) {
      const data = JSON.parse(saved);
      setMode(data.mode || "single");
      setFocused(data.focused || "A");
      setDecisionA(data.decisionA || decisionA);
      setDecisionB(data.decisionB || decisionB);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "decision-helper-v8",
      JSON.stringify({ mode, focused, decisionA, decisionB })
    );
  }, [mode, focused, decisionA, decisionB]);

  // ------------------------------
  // HELPERS
  // ------------------------------
  const addItem = () => {
    if (!input.trim()) return;

    const item: Item = { text: input, weight: 5 };

    const setter = focused === "A" ? setDecisionA : setDecisionB;
    setter((prev) => ({
      ...prev,
      [type === "pro" ? "pros" : "cons"]: [
        ...prev[type === "pro" ? "pros" : "cons"],
        item,
      ],
    }));

    setInput("");
  };

  const removeItem = (side: "pros" | "cons", index: number, which: "A" | "B") => {
    const setter = which === "A" ? setDecisionA : setDecisionB;
    setter((prev) => ({
      ...prev,
      [side]: prev[side].filter((_, i) => i !== index),
    }));
  };

  const updateWeight = (
    side: "pros" | "cons",
    index: number,
    value: number,
    which: "A" | "B"
  ) => {
    const setter = which === "A" ? setDecisionA : setDecisionB;
    setter((prev) => {
      const updated = [...prev[side]];
      updated[index] = { ...updated[index], weight: value };
      return { ...prev, [side]: updated };
    });
  };

  const scoreOf = (d: Decision) =>
    d.pros.reduce((s, p) => s + p.weight, 0) -
    d.cons.reduce((s, c) => s + c.weight, 0);

  const verdictOf = (score: number) =>
    score > 5 ? "DO IT" : score < -5 ? "DON'T" : "UNCLEAR";

  const explanationFor = (d: Decision) => {
    const strongestPro = [...d.pros].sort((a, b) => b.weight - a.weight)[0];
    const strongestCon = [...d.cons].sort((a, b) => b.weight - a.weight)[0];

    if (!strongestPro && !strongestCon)
      return "Add pros and cons to evaluate this decision.";

    if (strongestPro && (!strongestCon || strongestPro.weight > strongestCon.weight))
      return `Driven by: \"${strongestPro.text}\".`;

    if (strongestCon)
      return `Main concern: \"${strongestCon.text}\".`;

    return "Balanced decision.";
  };

  // ------------------------------
  // UI BLOCK
  // ------------------------------
  const DecisionColumn = ({ data, which }: { data: Decision; which: "A" | "B" }) => {
    const score = scoreOf(data);
    const verdict = verdictOf(score);

    const setter = which === "A" ? setDecisionA : setDecisionB;

    return (
      <motion.div layout className="flex-1 bg-zinc-900/60 rounded-3xl p-6">
        <div onClick={() => setEditingName(which)}>
          {editingName === which ? (
            <input
              ref={nameInputRef}
              value={data.name}
              onChange={(e) => setter((prev) => ({ ...prev, name: e.target.value }))}
              onBlur={() => setEditingName(null)}
              autoFocus
              className="w-full text-xl font-bold mb-4 bg-transparent border-b border-white/20 focus:outline-none focus:border-white/60"
            />
          ) : (
            <h2 className="text-xl font-bold mb-4">{data.name}</h2>
          )}
        </div>

        {[{ side: "pros", title: "Pros", color: "from-green-400 to-emerald-600" }, { side: "cons", title: "Cons", color: "from-red-400 to-rose-600" }].map(
          ({ side, title, color }) => (
            <div key={side} className="mb-6">
              <h3 className="font-semibold mb-2">{title}</h3>
              <AnimatePresence>
                {data[side as "pros" | "cons"].map((item, i) => (
                  <motion.div
                    key={item.text + i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className={`rounded-2xl p-4 mb-3 bg-gradient-to-br ${color}/20`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm">{item.text}</span>
                      <button onClick={() => removeItem(side as any, i, which)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      step={0.5}
                      value={item.weight}
                      onChange={(e) => updateWeight(side as any, i, Number(e.target.value), which)}
                      className="w-full accent-white"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )
        )}

        <motion.div layout className="mt-4 p-4 rounded-2xl bg-black/40 border border-zinc-700 text-center">
          <p className="text-sm text-zinc-400">Verdict</p>
          <p
            className={`text-2xl font-bold mt-1 ${
              verdict === "DO IT"
                ? "text-green-400"
                : verdict === "DON'T"
                ? "text-red-400"
                : "text-yellow-400"
            }`}
          >
            {verdict}
          </p>
          <p className="text-xs text-zinc-400 mt-1">Score: {score}</p>
          <p className="text-xs text-zinc-500 mt-2">{explanationFor(data)}</p>

          {mode === "compare" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setFocused(which);
                setMode("single");
              }}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-white text-black py-2 rounded-xl"
            >
              Single view
              <ArrowRight size={16} />
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    );
  };

  const activeDecision = focused === "A" ? decisionA : decisionB;

  // ------------------------------
  // RENDER
  // ------------------------------
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-6 flex justify-center">
      <div className="max-w-6xl w-full">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Decision Helper</h1>
            <p className="text-zinc-400">Structured thinking for better decisions</p>
          </div>

          <button
            onClick={() => setMode(mode === "single" ? "compare" : "single")}
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-2xl"
          >
            <ArrowLeftRight size={16} />
            {mode === "single" ? "Compare" : "Single"}
          </button>
        </div>

        <motion.div layout className="flex flex-wrap gap-3 mb-8">
          <div className="text-sm text-zinc-400 self-center">
            Editing: {activeDecision.name}
          </div>

          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="bg-zinc-800 rounded-xl px-4 py-2"
          >
            <option value="pro">Pro</option>
            <option value="con">Con</option>
          </select>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add argument"
            className="flex-1 bg-zinc-800 rounded-xl px-5 py-2 outline-none"
            onKeyDown={(e) => e.key === "Enter" && addItem()}
          />

          <button onClick={addItem} className="bg-white text-black rounded-xl px-4">
            <Plus size={18} />
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {mode === "single" ? (
            <motion.div
              key="single"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <DecisionColumn data={activeDecision} which={focused} />
            </motion.div>
          ) : (
            <motion.div
              key="compare"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <DecisionColumn data={decisionA} which="A" />
              <DecisionColumn data={decisionB} which="B" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
