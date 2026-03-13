"use client";

import React, { useEffect, useRef, useState } from "react";
import type { InitProgressReport, WebWorkerMLCEngine } from "@mlc-ai/web-llm";

type Flashcard = {
  question: string;
  answer: string;
};

type QuizItem = {
  prompt: string;
  answer: string;
};

type StudyPack = {
  summary: string[];
  flashcards: Flashcard[];
  quiz: QuizItem[];
  keywords: string[];
};

type SubjectMode = "concept" | "process" | "history" | "science";
type DifficultyMode = "easy" | "medium" | "exam";
type AiStatus = "idle" | "loading" | "ready" | "generating" | "unsupported" | "error";

const DEFAULT_NOTES = `Photosynthesis converts light energy into chemical energy. Chlorophyll in chloroplasts absorbs light, mainly in the blue and red spectrum. During the light-dependent reactions, water is split and oxygen is released. ATP and NADPH are produced and used in the Calvin cycle. In the Calvin cycle, carbon dioxide is fixed into glucose. This process is essential for plant growth and supports most life on Earth.`;
const STORAGE_KEY = "study-companion-state";

const STOPWORDS = new Set([
  "the",
  "and",
  "for",
  "with",
  "that",
  "this",
  "into",
  "from",
  "your",
  "they",
  "them",
  "their",
  "have",
  "has",
  "are",
  "was",
  "were",
  "will",
  "shall",
  "been",
  "being",
  "about",
  "while",
  "where",
  "which",
  "when",
  "what",
  "also",
  "than",
  "then",
  "them",
  "into",
  "through",
  "during",
  "used",
  "uses",
  "using",
  "most",
  "more",
  "like",
  "just",
  "very",
  "over",
  "such",
  "only",
  "mainly",
  "essential",
  "process",
  "because",
  "about",
  "each",
  "other",
  "some",
  "many",
  "much",
  "onto",
  "under",
  "does",
  "make",
  "makes",
  "made",
  "life",
  "earth",
  "plant",
  "plants",
  "notes",
  "study",
  "learning",
  "text",
  "topic",
  "glucose",
]);

const SUBJECT_LABELS: Record<SubjectMode, string> = {
  concept: "Concept",
  process: "Process",
  history: "Historical Event",
  science: "Scientific Topic",
};

const DIFFICULTY_LABELS: Record<DifficultyMode, string> = {
  easy: "Easy",
  medium: "Medium",
  exam: "Exam",
};

const LOCAL_MODEL_ID = "Qwen2.5-1.5B-Instruct-q4f16_1-MLC";
const AI_GENERATION_TIMEOUT_MS = 25000;

const AI_STATUS_STYLES: Record<AiStatus, string> = {
  idle: "border-white/10 bg-white/5 text-white/70",
  loading: "border-amber-300/25 bg-amber-300/10 text-amber-100",
  ready: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  generating: "border-cyan-300/25 bg-cyan-300/10 text-cyan-100",
  unsupported: "border-white/10 bg-white/5 text-white/55",
  error: "border-rose-300/25 bg-rose-300/10 text-rose-100",
};

const AI_STATUS_LABELS: Record<AiStatus, string> = {
  idle: "Idle",
  loading: "Loading Model",
  ready: "Ready",
  generating: "Generating",
  unsupported: "Unsupported",
  error: "Error",
};

function getStoredStudyState() {
  if (typeof window === "undefined") {
    return {
      notes: DEFAULT_NOTES,
      subjectMode: "science" as SubjectMode,
      difficulty: "medium" as DifficultyMode,
    };
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return {
      notes: DEFAULT_NOTES,
      subjectMode: "science" as SubjectMode,
      difficulty: "medium" as DifficultyMode,
    };
  }

  try {
    const parsed = JSON.parse(raw) as {
      notes?: string;
      subjectMode?: SubjectMode;
      difficulty?: DifficultyMode;
    };

    return {
      notes: parsed.notes?.trim() ? parsed.notes : DEFAULT_NOTES,
      subjectMode: parsed.subjectMode ?? ("science" as SubjectMode),
      difficulty: parsed.difficulty ?? ("medium" as DifficultyMode),
    };
  } catch {
    return {
      notes: DEFAULT_NOTES,
      subjectMode: "science" as SubjectMode,
      difficulty: "medium" as DifficultyMode,
    };
  }
}

function splitSentences(text: string) {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function normalizeSentence(sentence: string) {
  return sentence.replace(/\s+/g, " ").trim();
}

function stripLeadingConnector(text: string) {
  return text
    .replace(/^(during|in|for|through|by|because|when|while)\s+/i, "")
    .replace(/^(the|a|an)\s+/i, "")
    .trim();
}

function extractKeywords(text: string) {
  const counts = new Map<string, number>();
  const words = text.toLowerCase().match(/[a-zA-Z]{4,}/g) ?? [];

  for (const word of words) {
    if (STOPWORDS.has(word)) continue;
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([word]) => word);
}

function buildQuestion(sentence: string, mode: SubjectMode, index: number) {
  const clean = normalizeSentence(sentence).replace(/[.!?]+$/, "");
  const lower = clean.toLowerCase();

  if (mode === "process") {
    if (lower.includes("converts")) {
      const [subject, action] = clean.split(" converts ");
      if (subject && action) {
        return `What does ${stripLeadingConnector(subject)} convert into another form?`;
      }
    }

    if (lower.includes("produced")) {
      return `Which outputs are produced in this step?`;
    }

    return `What happens in step ${index + 1} of the process?`;
  }

  if (mode === "history") {
    if (lower.includes("because")) {
      return `Why was this event significant?`;
    }

    return `What is the key takeaway from event ${index + 1}?`;
  }

  if (mode === "science") {
    if (lower.includes("absorbs")) {
      const [subject] = clean.split(" absorbs ");
      return `What is the role of ${stripLeadingConnector(subject)}?`;
    }

    if (lower.includes("used in")) {
      const [subject] = clean.split(" used in ");
      return `Where is ${stripLeadingConnector(subject)} used?`;
    }

    return `What scientific idea is explained here?`;
  }

  if (lower.includes("is ")) {
    const [subject] = clean.split(" is ");
    return `What is ${stripLeadingConnector(subject)}?`;
  }

  return `What is the core idea behind point ${index + 1}?`;
}

function buildQuizPrompt(keyword: string, mode: SubjectMode, difficulty: DifficultyMode) {
  if (difficulty === "easy") {
    return `Define "${keyword}" in one short sentence.`;
  }

  if (difficulty === "exam") {
    if (mode === "process") {
      return `Explain how "${keyword}" fits into the full process and why it matters.`;
    }
    if (mode === "history") {
      return `Evaluate the importance of "${keyword}" in its historical context.`;
    }
    return `Explain "${keyword}" with enough depth for an exam answer.`;
  }

  return `How would you explain "${keyword}" to someone revising this topic?`;
}

function buildSummary(sentences: string[], difficulty: DifficultyMode) {
  const count = difficulty === "easy" ? 2 : difficulty === "exam" ? 3 : 2;
  return sentences
    .slice(0, count)
    .map((sentence) => sentence.replace(/\s+/g, " ").trim())
    .map((sentence) => {
      if (sentence.length <= 120) return sentence;
      const shortened = sentence.slice(0, 117).trim();
      return `${shortened}...`;
    });
}

function buildStudyPack(text: string, mode: SubjectMode, difficulty: DifficultyMode): StudyPack {
  const sentences = splitSentences(text);
  const summary = buildSummary(sentences, difficulty);
  const keywords = extractKeywords(text);

  const flashcards = sentences.slice(0, 4).map((sentence, index) => ({
    question: buildQuestion(sentence, mode, index),
    answer: normalizeSentence(sentence),
  }));

  const quiz = keywords.slice(0, 4).map((keyword) => ({
    prompt: buildQuizPrompt(keyword, mode, difficulty),
    answer: keyword,
  }));

  return {
    summary,
    flashcards,
    quiz,
    keywords,
  };
}

function buildStudyPackWithAiSummary(
  text: string,
  mode: SubjectMode,
  difficulty: DifficultyMode,
  aiSummary: string[],
  aiKeywords: string[],
  aiFlashcards: Flashcard[] = [],
  aiQuiz: QuizItem[] = []
): StudyPack {
  const basePack = buildStudyPack(text, mode, difficulty);
  return {
    summary: aiSummary.length ? aiSummary.slice(0, 4) : basePack.summary,
    flashcards: aiFlashcards.length ? aiFlashcards.slice(0, 5) : basePack.flashcards,
    quiz: aiQuiz.length ? aiQuiz.slice(0, 5) : basePack.quiz,
    keywords: aiKeywords.length ? aiKeywords.slice(0, 8) : basePack.keywords,
  };
}

function parseDelimitedStudyPack(raw: string): {
  summary: string[];
  keywords: string[];
  flashcards: Flashcard[];
  quiz: QuizItem[];
} | null {
  const getSection = (label: string) => {
    const match = raw.match(new RegExp(`\\[${label}\\]([\\s\\S]*?)(?=\\n\\[[A-Z_]+\\]|$)`));
    return match?.[1]?.trim() ?? "";
  };

  const summary = getSection("SUMMARY")
    .split("\n")
    .map((line) => line.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);

  const keywords = getSection("KEYWORDS")
    .split("\n")
    .flatMap((line) => line.split(","))
    .map((keyword) => keyword.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);

  const flashcards = getSection("FLASHCARDS")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [question, answer] = line.split("||").map((part) => part?.trim() ?? "");
      return { question, answer };
    })
    .filter((card) => card.question && card.answer);

  const quiz = getSection("QUIZ")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [prompt, answer] = line.split("||").map((part) => part?.trim() ?? "");
      return { prompt, answer };
    })
    .filter((item) => item.prompt && item.answer);

  if (!summary.length) {
    return null;
  }

  return {
    summary,
    keywords,
    flashcards,
    quiz,
  };
}

function looksLikePlaceholderOutput(payload: {
  summary: string[];
  keywords: string[];
  flashcards: Flashcard[];
  quiz: QuizItem[];
}) {
  const combined = [
    ...payload.summary,
    ...payload.flashcards.flatMap((card) => [card.question, card.answer]),
    ...payload.quiz.flatMap((item) => [item.prompt, item.answer]),
    ...payload.keywords,
  ]
    .join(" ")
    .toLowerCase();

  const placeholderPatterns = [
    "keyword",
    "summary",
    "question || answer",
    "prompt || answer",
    "flashcards",
    "quiz",
    "study pack",
    "item",
    "notes below",
    "[keywords]",
  ];

  const placeholderHits = placeholderPatterns.filter((pattern) => combined.includes(pattern)).length;
  return placeholderHits >= 3;
}

export default function StudyCompanion() {
  const workerRef = useRef<Worker | null>(null);
  const engineRef = useRef<WebWorkerMLCEngine | null>(null);
  const [initialState] = useState(getStoredStudyState);
  const [notes, setNotes] = useState(initialState.notes);
  const [subjectMode, setSubjectMode] = useState<SubjectMode>(initialState.subjectMode);
  const [difficulty, setDifficulty] = useState<DifficultyMode>(initialState.difficulty);
  const [pack, setPack] = useState<StudyPack>(() =>
    buildStudyPack(initialState.notes, initialState.subjectMode, initialState.difficulty)
  );
  const [activeTab, setActiveTab] = useState<"summary" | "flashcards" | "quiz">("summary");
  const [aiStatus, setAiStatus] = useState<AiStatus>("idle");
  const [aiMessage, setAiMessage] = useState("Runs fully in your browser with a local WebGPU model.");
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiElapsedSeconds, setAiElapsedSeconds] = useState(0);
  const [aiDebugLog, setAiDebugLog] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        notes,
        subjectMode,
        difficulty,
      })
    );
  }, [notes, subjectMode, difficulty]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("gpu" in navigator)) {
      setAiStatus("unsupported");
      setAiMessage("This device or browser does not expose WebGPU, so the local model cannot run.");
      return;
    }
    setAiStatus("idle");
    setAiMessage("Local model ready to load on first run. The first start can take a while.");

    return () => {
      engineRef.current?.unload().catch(() => undefined);
      engineRef.current = null;
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (aiStatus !== "loading" && aiStatus !== "generating") {
      setAiElapsedSeconds(0);
      return;
    }

    setAiElapsedSeconds(0);
    const startedAt = Date.now();
    const interval = window.setInterval(() => {
      setAiElapsedSeconds(Math.max(0, Math.floor((Date.now() - startedAt) / 1000)));
    }, 250);

    return () => {
      window.clearInterval(interval);
    };
  }, [aiStatus]);

  const pushAiLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setAiDebugLog((current) => [`${timestamp} ${message}`, ...current].slice(0, 12));
  };

  const ensureLocalEngine = async () => {
    if (engineRef.current) {
      pushAiLog("Reusing cached local engine.");
      return engineRef.current;
    }

    if (typeof window === "undefined" || !("gpu" in navigator)) {
      setAiStatus("unsupported");
      setAiMessage("WebGPU is required to run the model locally in the browser.");
      return null;
    }

    setAiStatus("loading");
    setAiMessage("Preparing local model...");
    setDownloadProgress(0);
    pushAiLog(`Loading local model ${LOCAL_MODEL_ID}.`);

    try {
      const { CreateWebWorkerMLCEngine } = await import("@mlc-ai/web-llm");
      const worker = new Worker(new URL("../../workers/study-companion-llm-worker.ts", import.meta.url), {
        type: "module",
      });

      const engine = await CreateWebWorkerMLCEngine(worker, LOCAL_MODEL_ID, {
        initProgressCallback: (report: InitProgressReport) => {
          const normalized = report.progress <= 1 ? report.progress * 100 : report.progress;
          setAiStatus("loading");
          setDownloadProgress(Math.max(0, Math.min(100, Math.round(normalized))));
          setAiMessage(report.text || "Loading local model...");
          if (report.text) {
            pushAiLog(`Model load: ${report.text}`);
          }
        },
      });

      workerRef.current = worker;
      engineRef.current = engine;
      setAiStatus("ready");
      setAiMessage("Local model loaded. Generation stays fully in the browser.");
      setDownloadProgress(100);
      pushAiLog("Local model loaded successfully.");
      return engine;
    } catch (error) {
      workerRef.current?.terminate();
      workerRef.current = null;
      engineRef.current = null;
      setAiStatus("error");
      setAiMessage(
        error instanceof Error
          ? error.message
          : "The local browser model could not be started."
      );
      setDownloadProgress(null);
      pushAiLog(
        `Engine load failed: ${error instanceof Error ? error.message : "unknown error"}`
      );
      return null;
    }
  };

  const regeneratePack = () => {
    setPack(buildStudyPack(notes, subjectMode, difficulty));
  };

  const stopLocalAiGeneration = () => {
    engineRef.current?.interruptGenerate();
    setIsGeneratingAi(false);
    setAiStatus("error");
    setAiMessage("Local generation was stopped.");
    pushAiLog("Generation stopped manually.");
  };

  const generateWithLocalAi = async () => {
    const engine = await ensureLocalEngine();
    if (!engine) {
      return;
    }

    setIsGeneratingAi(true);
    setAiStatus("generating");
    setAiMessage("Generating study pack with the local model...");
    pushAiLog(
      `Generation started. Notes length: ${notes.trim().length} chars. Mode: ${subjectMode}. Difficulty: ${difficulty}.`
    );

    let timeoutId: number | undefined;
    try {
      const request = engine.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are a study assistant. Only use the user's notes. Do not invent facts. Return only the requested plain-text sections.",
          },
          {
            role: "user",
            content: `
Create a compact study pack from the notes below.
Use only the provided notes.
Subject mode: ${SUBJECT_LABELS[subjectMode]}.
Difficulty: ${DIFFICULTY_LABELS[difficulty]}.

Return exactly in this format and nothing else:
[SUMMARY]
- item
- item

[FLASHCARDS]
question || answer
question || answer

[QUIZ]
prompt || answer
prompt || answer

[KEYWORDS]
keyword, keyword, keyword

Rules:
- summary: 2 to 3 items
- flashcards: 3 to 4 items
- quiz: 3 to 4 items
- keywords: 3 to 8 short items
- no markdown code fences
- each flashcard must be concrete and short
- each quiz prompt must test understanding, not just repeat a heading
- every flashcard and quiz line must use "||"
- stop after [KEYWORDS]
- make the summary concrete and based on the actual notes
- do not repeat the template words like "item" or "keyword"
- keep each summary bullet short and compressed
- prefer fewer words over full sentences when possible
- remove filler and obvious repetition

Notes:
${notes}
            `.trim(),
          },
        ],
        temperature: 0.2,
        max_tokens: 140,
        stop: ["\n\n[END]", "\n[END]"],
      });
      pushAiLog("Request sent to local model.");

      const response = await Promise.race([
        request,
        new Promise<never>((_, reject) => {
          timeoutId = window.setTimeout(() => {
            engine.interruptGenerate();
            pushAiLog("Generation hit timeout threshold and was interrupted.");
            reject(new Error("Local generation timed out after 25 seconds."));
          }, AI_GENERATION_TIMEOUT_MS);
        }),
      ]);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      pushAiLog("Model returned a response.");

      const raw = response.choices[0]?.message.content?.trim();
      if (!raw) {
        pushAiLog("Response content was empty.");
        throw new Error("The local model returned an empty response.");
      }
      pushAiLog(`Raw response preview: ${raw.slice(0, 160).replace(/\s+/g, " ")}`);

      const aiPayload = parseDelimitedStudyPack(raw);
      if (!aiPayload) {
        pushAiLog("Response parsing failed.");
        throw new Error(`Could not parse local model output. Partial response: ${raw.slice(0, 160)}`);
      }
      if (looksLikePlaceholderOutput(aiPayload)) {
        pushAiLog("Model returned template placeholders instead of real study content.");
        throw new Error("The local model returned placeholder output instead of real study content.");
      }

      const nextPack = buildStudyPackWithAiSummary(
        notes,
        subjectMode,
        difficulty,
        aiPayload.summary,
        aiPayload.keywords.length ? aiPayload.keywords : extractKeywords(notes),
        aiPayload.flashcards,
        aiPayload.quiz
      );
      setPack(nextPack);
      setAiStatus("ready");
      setAiMessage("Study pack generated with the local browser model.");
      pushAiLog("Study pack parsed successfully.");
    } catch (error) {
      const fallbackPack = buildStudyPack(notes, subjectMode, difficulty);
      setPack(fallbackPack);
      setAiStatus("error");
      setAiMessage(
        error instanceof Error
          ? `${error.message} Showing the rule-based study pack instead.`
          : "Local model generation failed. Showing the rule-based study pack instead."
      );
      pushAiLog(
        `Generation failed: ${error instanceof Error ? error.message : "unknown error"}`
      );
      pushAiLog("Fallback study pack generated with the built-in rule-based logic.");
    } finally {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      setIsGeneratingAi(false);
    }
  };

  const updateSummaryItem = (index: number, value: string) => {
    setPack((current) => ({
      ...current,
      summary: current.summary.map((item, itemIndex) => (itemIndex === index ? value : item)),
    }));
  };

  const updateFlashcard = (index: number, field: keyof Flashcard, value: string) => {
    setPack((current) => ({
      ...current,
      flashcards: current.flashcards.map((card, cardIndex) =>
        cardIndex === index ? { ...card, [field]: value } : card
      ),
    }));
  };

  const updateQuizItem = (index: number, field: keyof QuizItem, value: string) => {
    setPack((current) => ({
      ...current,
      quiz: current.quiz.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.16),transparent_40%),linear-gradient(180deg,#07111f_0%,#0b1220_55%,#111827_100%)] text-white">
      <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
      <div className="relative z-10 flex h-full flex-col gap-5 p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-200">
              Browser Study Tool
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Study Companion</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Paste notes and turn them into a summary, flashcards, and quick quiz prompts in one view.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-right">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/45">Session</div>
            <div className="mt-2 text-2xl font-bold text-cyan-200">{pack.keywords.length}</div>
            <div className="text-xs text-white/55">focus tags</div>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.3em] text-white/50">Source Notes</div>
                <div className="mt-1 text-sm text-white/70">Drop in a topic and generate a compact study pack.</div>
              </div>
              <button
                type="button"
                onClick={regeneratePack}
                className="rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Generate
              </button>
            </div>

            <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="text-[10px] uppercase tracking-[0.28em] text-white/45">Local AI</div>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${AI_STATUS_STYLES[aiStatus]}`}
                    >
                      {AI_STATUS_LABELS[aiStatus]}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-white/70">{aiMessage}</div>
                  {(aiStatus === "loading" || aiStatus === "generating") && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-cyan-200">
                      <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
                      <span>{aiElapsedSeconds}s elapsed</span>
                    </div>
                  )}
                  {downloadProgress !== null && (
                    <div className="mt-2 text-xs text-cyan-200">{downloadProgress}% downloaded</div>
                  )}
                  {aiStatus === "error" && (
                    <div className="mt-2 text-xs text-rose-200">
                      If this keeps happening, reload the page or fall back to the normal Generate button.
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={isGeneratingAi ? stopLocalAiGeneration : generateWithLocalAi}
                  disabled={aiStatus === "unsupported" || aiStatus === "loading"}
                  className="rounded-2xl border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {aiStatus === "loading"
                    ? "Loading model..."
                    : isGeneratingAi
                      ? "Stop"
                      : "Generate with AI"}
                </button>
              </div>
            </div>

            <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="text-[10px] uppercase tracking-[0.28em] text-white/45">Debug Log</div>
                <button
                  type="button"
                  onClick={() => setAiDebugLog([])}
                  className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 transition hover:text-white"
                >
                  Clear
                </button>
              </div>
              <div className="mt-3 max-h-32 space-y-1 overflow-y-auto rounded-2xl border border-white/5 bg-black/20 p-3 text-[11px] text-white/65">
                {aiDebugLog.length ? (
                  aiDebugLog.map((entry) => (
                    <div key={entry} className="font-mono leading-relaxed">
                      {entry}
                    </div>
                  ))
                ) : (
                  <div className="font-mono text-white/35">No debug events yet.</div>
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-3">
                <div className="text-[10px] uppercase tracking-[0.28em] text-white/45">Topic Type</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(Object.keys(SUBJECT_LABELS) as SubjectMode[]).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setSubjectMode(mode)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                        subjectMode === mode
                          ? "bg-white text-slate-950"
                          : "border border-white/10 bg-white/5 text-white/65 hover:text-white"
                      }`}
                    >
                      {SUBJECT_LABELS[mode]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-3">
                <div className="text-[10px] uppercase tracking-[0.28em] text-white/45">Difficulty</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(Object.keys(DIFFICULTY_LABELS) as DifficultyMode[]).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setDifficulty(mode)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                        difficulty === mode
                          ? "bg-cyan-300 text-slate-950"
                          : "border border-white/10 bg-white/5 text-white/65 hover:text-white"
                      }`}
                    >
                      {DIFFICULTY_LABELS[mode]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="mt-4 h-[18rem] w-full resize-none rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-100 outline-none transition focus:border-cyan-400/40"
              placeholder="Paste your study notes here..."
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {pack.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100"
                >
                  {keyword}
                </span>
              ))}
            </div>

            <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/60">
              Current mode: <span className="font-semibold text-white">{SUBJECT_LABELS[subjectMode]}</span>
              {" · "}
              Difficulty: <span className="font-semibold text-white">{DIFFICULTY_LABELS[difficulty]}</span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-[0.3em] text-white/50">Study Pack</div>
                <div className="mt-1 text-sm text-white/70">Compact outputs for quick revision.</div>
              </div>
              <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
                {(["summary", "flashcards", "quiz"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] transition ${
                      activeTab === tab
                        ? "bg-white text-slate-950"
                        : "text-white/55 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 h-[22rem] overflow-y-auto rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-4">
              {activeTab === "summary" && (
                <div className="space-y-3">
                  {pack.summary.map((item, index) => (
                    <label
                      key={`${item}-${index}`}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-200"
                    >
                      <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-cyan-200/70">
                        Summary point {index + 1}
                      </div>
                      <textarea
                        value={item}
                        onChange={(event) => updateSummaryItem(index, event.target.value)}
                        className="min-h-20 w-full resize-none bg-transparent text-sm text-slate-200 outline-none"
                      />
                    </label>
                  ))}
                </div>
              )}

              {activeTab === "flashcards" && (
                <div className="grid gap-3">
                  {pack.flashcards.map((card, index) => (
                    <div
                      key={`${card.question}-${index}`}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                    >
                      <div className="text-[10px] uppercase tracking-[0.3em] text-fuchsia-200/70">
                        Flashcard {index + 1}
                      </div>
                      <textarea
                        value={card.question}
                        onChange={(event) => updateFlashcard(index, "question", event.target.value)}
                        className="mt-2 min-h-16 w-full resize-none bg-transparent text-sm font-semibold text-white outline-none"
                      />
                      <textarea
                        value={card.answer}
                        onChange={(event) => updateFlashcard(index, "answer", event.target.value)}
                        className="mt-2 min-h-20 w-full resize-none bg-transparent text-sm text-slate-300 outline-none"
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "quiz" && (
                <div className="space-y-3">
                  {pack.quiz.map((item, index) => (
                    <div
                      key={`${item.prompt}-${index}`}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                    >
                      <div className="text-[10px] uppercase tracking-[0.3em] text-emerald-200/70">
                        Quiz prompt {index + 1}
                      </div>
                      <textarea
                        value={item.prompt}
                        onChange={(event) => updateQuizItem(index, "prompt", event.target.value)}
                        className="mt-2 min-h-20 w-full resize-none bg-transparent text-sm text-white outline-none"
                      />
                      <input
                        value={item.answer}
                        onChange={(event) => updateQuizItem(index, "answer", event.target.value)}
                        className="mt-3 w-full rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-100 outline-none"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
