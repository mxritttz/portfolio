"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const STEPS = 16;
const LANES = [
  { name: "Kick", semitone: -12 },
  { name: "Snare", semitone: -5 },
  { name: "Hat", semitone: 7 },
  { name: "Sample", semitone: 0 },
];

const NOTES = [
  { label: "C", semitone: 0, black: false },
  { label: "C#", semitone: 1, black: true },
  { label: "D", semitone: 2, black: false },
  { label: "D#", semitone: 3, black: true },
  { label: "E", semitone: 4, black: false },
  { label: "F", semitone: 5, black: false },
  { label: "F#", semitone: 6, black: true },
  { label: "G", semitone: 7, black: false },
  { label: "G#", semitone: 8, black: true },
  { label: "A", semitone: 9, black: false },
  { label: "A#", semitone: 10, black: true },
  { label: "B", semitone: 11, black: false },
];

const NOTE_ORDER = NOTES.filter((n) => !n.black).map((n) => n.label);
const PAD_COUNT = 8;

const createDemoBuffer = (ctx: AudioContext) => {
  const duration = 0.6;
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 8);
    const noise = (Math.random() * 2 - 1) * 0.2;
    const tone = Math.sin(2 * Math.PI * 140 * t) * 0.6;
    data[i] = (tone + noise) * env;
  }
  return buffer;
};

export default function MusicLab() {
  const ctxRef = useRef<AudioContext | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const stepRef = useRef(0);
  const intervalRef = useRef<number | null>(null);
  const activeSourcesRef = useRef<AudioScheduledSourceNode[]>([]);
  const noiseBufferRef = useRef<AudioBuffer | null>(null);
  const keySourceRef = useRef<AudioScheduledSourceNode | null>(null);
  const keySemitoneRef = useRef(0);
  const keyHasBufferRef = useRef(false);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const dryGainRef = useRef<GainNode | null>(null);
  const wetGainRef = useRef<GainNode | null>(null);
  const convolverRef = useRef<ConvolverNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const vizWrapRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const vizDataRef = useRef<Uint8Array<ArrayBuffer>>(new Uint8Array(new ArrayBuffer(0)));
  const startVizRef = useRef<(() => void) | null>(null);
  const lastAudioRef = useRef(0);
  const suspendTimerRef = useRef<number | null>(null);
  const trimStartRef = useRef(0);
  const trimEndRef = useRef(0);

  const [bpm, setBpm] = useState(112);
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const [octave, setOctave] = useState(0);
  const [scale, setScale] = useState("Chromatic");
  const [activePitch, setActivePitch] = useState(0);
  const [sampleSpeed, setSampleSpeed] = useState(1);
  const knobRef = useRef<HTMLDivElement | null>(null);
  const sampleSpeedRef = useRef(1);
  const [padPitches, setPadPitches] = useState<number[]>(
    () => Array.from({ length: PAD_COUNT }, (_, i) => i - 3)
  );
  const [selectedPad, setSelectedPad] = useState<number | null>(null);
  const [sampleDuration, setSampleDuration] = useState(0);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [reverbOn, setReverbOn] = useState(false);
  const [reverbMix, setReverbMix] = useState(0.25);
  const [trimStartInput, setTrimStartInput] = useState("0");
  const [trimEndInput, setTrimEndInput] = useState("0");
  const [pattern, setPattern] = useState<boolean[][]>(
    () => LANES.map(() => Array.from({ length: STEPS }, () => false))
  );
  const [samplePitches, setSamplePitches] = useState<(number | null)[]>(
    () => Array.from({ length: STEPS }, () => null)
  );
  const [status, setStatus] = useState("Load a sample or use the demo.");

  const ensureContext = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    if (!analyserRef.current || !masterGainRef.current) {
      const ctx = ctxRef.current;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.86;
      const masterGain = ctx.createGain();
      masterGain.gain.value = 1;
      const dryGain = ctx.createGain();
      const wetGain = ctx.createGain();
      const convolver = ctx.createConvolver();
      const impulseLength = Math.floor(ctx.sampleRate * 1.2);
      const impulse = ctx.createBuffer(2, impulseLength, ctx.sampleRate);
      for (let ch = 0; ch < impulse.numberOfChannels; ch += 1) {
        const channel = impulse.getChannelData(ch);
        for (let i = 0; i < impulseLength; i += 1) {
          const decay = Math.pow(1 - i / impulseLength, 2);
          channel[i] = (Math.random() * 2 - 1) * decay;
        }
      }
      convolver.buffer = impulse;

      masterGain.connect(dryGain);
      masterGain.connect(convolver);
      convolver.connect(wetGain);
      dryGain.connect(analyser);
      wetGain.connect(analyser);
      analyser.connect(ctx.destination);
      analyserRef.current = analyser;
      masterGainRef.current = masterGain;
      dryGainRef.current = dryGain;
      wetGainRef.current = wetGain;
      convolverRef.current = convolver;
    }
    if (!noiseBufferRef.current) {
      const ctx = ctxRef.current;
      const length = ctx.sampleRate * 0.5;
      const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < length; i += 1) {
        data[i] = Math.random() * 2 - 1;
      }
      noiseBufferRef.current = buffer;
    }
    return ctxRef.current;
  }, []);

  const playSample = useCallback(
    (
      semitone: number,
      gainValue = 0.9,
      storePitch = false,
      speed = 1,
      stopPrevious = false
    ) => {
      const ctx = ensureContext();
      const buffer = bufferRef.current;
      const rate = Math.pow(2, semitone / 12) * speed;
      if (storePitch) {
        setActivePitch(semitone);
        keySemitoneRef.current = semitone;
      }
      lastAudioRef.current = performance.now();
      startVizRef.current?.();
      if (suspendTimerRef.current) {
        window.clearTimeout(suspendTimerRef.current);
        suspendTimerRef.current = null;
      }
      if (stopPrevious && keySourceRef.current) {
        try {
          keySourceRef.current.stop();
        } catch {
          // ignore
        }
        keySourceRef.current = null;
      }
      if (buffer) {
        const start = Math.max(0, Math.min(trimStartRef.current, buffer.duration - 0.05));
        const end = trimEndRef.current > 0 ? trimEndRef.current : buffer.duration;
        const safeEnd = Math.max(start + 0.05, Math.min(end, buffer.duration));
        const duration = Math.max(0.05, safeEnd - start);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.playbackRate.value = rate;
        const gain = ctx.createGain();
        gain.gain.value = gainValue;
        source.connect(gain).connect(masterGainRef.current ?? ctx.destination);
        activeSourcesRef.current.push(source);
        if (stopPrevious) {
          keySourceRef.current = source;
          keyHasBufferRef.current = true;
        }
        source.onended = () => {
          activeSourcesRef.current = activeSourcesRef.current.filter((s) => s !== source);
          if (keySourceRef.current === source) {
            keySourceRef.current = null;
          }
        };
        source.start(0, start, duration);
      } else {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = 220 * rate;
        gain.gain.value = gainValue * 0.4;
        osc.connect(gain).connect(masterGainRef.current ?? ctx.destination);
        activeSourcesRef.current.push(osc);
        if (stopPrevious) {
          keySourceRef.current = osc;
          keyHasBufferRef.current = false;
        }
        osc.onended = () => {
          activeSourcesRef.current = activeSourcesRef.current.filter((s) => s !== osc);
          if (keySourceRef.current === osc) {
            keySourceRef.current = null;
          }
        };
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      }
    },
    [ensureContext]
  );

  const playDrum = useCallback(
    (laneName: string) => {
      const ctx = ensureContext();
      const now = ctx.currentTime;
      const master = masterGainRef.current ?? ctx.destination;
      lastAudioRef.current = performance.now();
      startVizRef.current?.();
      if (suspendTimerRef.current) {
        window.clearTimeout(suspendTimerRef.current);
        suspendTimerRef.current = null;
      }

      if (laneName === "Kick") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(42, now + 0.22);
        gain.gain.setValueAtTime(0.9, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.connect(gain).connect(master);
        activeSourcesRef.current.push(osc);
        osc.onended = () => {
          activeSourcesRef.current = activeSourcesRef.current.filter((s) => s !== osc);
        };
        osc.start(now);
        osc.stop(now + 0.3);
        return;
      }

      if (laneName === "Snare") {
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBufferRef.current;
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = "highpass";
        noiseFilter.frequency.value = 900;
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.5, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        noiseSource.connect(noiseFilter).connect(noiseGain).connect(master);

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(200, now);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain).connect(master);

        activeSourcesRef.current.push(noiseSource, osc);
        noiseSource.start(now);
        noiseSource.stop(now + 0.2);
        osc.start(now);
        osc.stop(now + 0.14);
        return;
      }

      const hat = ctx.createBufferSource();
      hat.buffer = noiseBufferRef.current;
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 5000;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      hat.connect(filter).connect(gain).connect(master);
      activeSourcesRef.current.push(hat);
      hat.start(now);
      hat.stop(now + 0.1);
    },
    [ensureContext]
  );

  const stopAll = useCallback(() => {
    activeSourcesRef.current.forEach((source) => {
      try {
        source.stop();
      } catch {
        // ignore
      }
    });
    activeSourcesRef.current = [];
    keySourceRef.current = null;
    lastAudioRef.current = 0;
    if (suspendTimerRef.current) {
      window.clearTimeout(suspendTimerRef.current);
      suspendTimerRef.current = null;
    }
    if (ctxRef.current && ctxRef.current.state === "running") {
      suspendTimerRef.current = window.setTimeout(() => {
        ctxRef.current?.suspend();
      }, 1500);
    }
  }, []);

  const updateSpeed = useCallback((value: number) => {
    const next = Math.max(0.5, Math.min(2, value));
    sampleSpeedRef.current = next;
    setSampleSpeed(next);
    if (keySourceRef.current) {
      const rate = Math.pow(2, keySemitoneRef.current / 12) * next;
      if (keyHasBufferRef.current && "playbackRate" in keySourceRef.current) {
        (keySourceRef.current as AudioBufferSourceNode).playbackRate.value = rate;
      } else if ("frequency" in keySourceRef.current) {
        (keySourceRef.current as OscillatorNode).frequency.value = 220 * rate;
      }
    }
  }, []);

  useEffect(() => {
    trimStartRef.current = trimStart;
  }, [trimStart]);

  useEffect(() => {
    trimEndRef.current = trimEnd;
  }, [trimEnd]);

  useEffect(() => {
    setTrimStartInput(trimStart.toFixed(2));
  }, [trimStart]);

  useEffect(() => {
    setTrimEndInput(trimEnd.toFixed(2));
  }, [trimEnd]);

  useEffect(() => {
    const dry = dryGainRef.current;
    const wet = wetGainRef.current;
    if (!dry || !wet) return;
    const wetValue = reverbOn ? reverbMix : 0;
    const dryValue = 1 - wetValue;
    dry.gain.value = Math.max(0, Math.min(1, dryValue));
    wet.gain.value = Math.max(0, Math.min(1, wetValue));
  }, [reverbOn, reverbMix]);

  const handleKnobPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    const startX = event.clientX;
    const startValue = sampleSpeed;
    const onMove = (e: PointerEvent) => {
      const delta = (e.clientX - startX) / 120;
      updateSpeed(startValue + delta);
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const toggleStep = (laneIdx: number, stepIdx: number) => {
    setPattern((prev) => {
      const next = prev.map((lane) => [...lane]);
      next[laneIdx][stepIdx] = !next[laneIdx][stepIdx];
      return next;
    });
    if (LANES[laneIdx]?.name === "Sample") {
      setSamplePitches((prev) => {
        const next = [...prev];
        if (pattern[laneIdx][stepIdx]) {
          next[stepIdx] = null;
        } else {
          next[stepIdx] = activePitch;
        }
        return next;
      });
    }
  };

  const handleUpload = async (file: File) => {
    const ctx = ensureContext();
    const buffer = await file.arrayBuffer();
    const decoded = await ctx.decodeAudioData(buffer);
    bufferRef.current = decoded;
    setSampleDuration(decoded.duration);
    setTrimStart(0);
    setTrimEnd(decoded.duration);
    setTrimStartInput("0.00");
    setTrimEndInput(decoded.duration.toFixed(2));
    setStatus(`Loaded sample: ${file.name}`);
  };

  const handleDemo = () => {
    const ctx = ensureContext();
    const demo = createDemoBuffer(ctx);
    bufferRef.current = demo;
    setSampleDuration(demo.duration);
    setTrimStart(0);
    setTrimEnd(demo.duration);
    setTrimStartInput("0.00");
    setTrimEndInput(demo.duration.toFixed(2));
    setStatus("Demo sample loaded.");
  };

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    if (!isPlaying) return;
    const intervalMs = (60 / bpm) * 1000 / 4;
    intervalRef.current = window.setInterval(() => {
      const next = (stepRef.current + 1) % STEPS;
      stepRef.current = next;
      setStep(next);
        LANES.forEach((lane, laneIdx) => {
          if (pattern[laneIdx][next]) {
            if (lane.name === "Sample") {
              const semitone = samplePitches[next] ?? activePitch;
              const speed = sampleSpeedRef.current;
              playSample(semitone, 0.85, false, speed);
            } else {
              playDrum(lane.name);
            }
          }
        });
    }, intervalMs);
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [bpm, isPlaying, pattern, playSample]);

  useEffect(() => {
    if (!isPlaying && ctxRef.current && ctxRef.current.state === "running") {
      if (suspendTimerRef.current) {
        window.clearTimeout(suspendTimerRef.current);
      }
      suspendTimerRef.current = window.setTimeout(() => {
        ctxRef.current?.suspend();
      }, 1500);
    }
    if (isPlaying && ctxRef.current && ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
  }, [isPlaying]);

  useEffect(() => {
    const handleStop = () => {
      stopAll();
      setIsPlaying(false);
    };
    window.addEventListener("musiclab:stop", handleStop);
    return () => window.removeEventListener("musiclab:stop", handleStop);
  }, [stopAll]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = vizWrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    resize();

    const render = () => {
      const analyser = analyserRef.current;
      if (analyser) {
        if (vizDataRef.current.length !== analyser.frequencyBinCount) {
          vizDataRef.current = new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount));
        }
        if (vizDataRef.current.length) analyser.getByteFrequencyData(vizDataRef.current);
      }
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const cx = width / 2;
      const cy = height / 2;
      const baseRadius = Math.min(width, height) * 0.22;
      const maxBoost = Math.min(width, height) * 0.18;
      const points = 96;

      ctx.clearRect(0, 0, width, height);

      const glowGradient = ctx.createRadialGradient(cx, cy, baseRadius * 0.2, cx, cy, baseRadius * 1.4);
      glowGradient.addColorStop(0, "rgba(110, 231, 255, 0.18)");
      glowGradient.addColorStop(1, "rgba(110, 231, 255, 0)");
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineWidth = 1.6;
      ctx.strokeStyle = "rgba(145, 255, 214, 0.95)";
      ctx.shadowColor = "rgba(120, 255, 214, 0.6)";
      ctx.shadowBlur = 14;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      ctx.beginPath();
      for (let i = 0; i < points; i += 1) {
        const angle = (i / points) * Math.PI * 2 - Math.PI / 2;
        const freqIndex = Math.floor((i / points) * vizDataRef.current.length);
        const energy = vizDataRef.current.length ? vizDataRef.current[freqIndex] / 255 : 0;
        const radius = baseRadius + energy * maxBoost;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = "rgba(170, 255, 235, 0.45)";
      ctx.beginPath();
      for (let i = 0; i < points; i += 1) {
        const angle = (i / points) * Math.PI * 2 - Math.PI / 2;
        const freqIndex = Math.floor((i / points) * vizDataRef.current.length);
        const energy = vizDataRef.current.length ? vizDataRef.current[freqIndex] / 255 : 0;
        const radius = baseRadius * 0.7 + energy * maxBoost * 0.6;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();

      const recentlyActive = performance.now() - lastAudioRef.current < 500;
      if (!isPlaying && !recentlyActive) {
        rafRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(render);
    };

    startVizRef.current = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(render);
      }
    };
    if (isPlaying) {
      startVizRef.current();
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      observer.disconnect();
    };
  }, [isPlaying]);

  return (
    <div className="relative h-full w-full text-white p-6 space-y-6">
      <div className="flex flex-col items-center text-center gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em]">
          MusicLab
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold">Sampler + Sequencer</h2>
        <p className="text-gray-300 max-w-3xl">
          Load a sound, pitch it across a mini keyboard, and program a 16‑step beat.
          Runs fully in the browser.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/10 text-sm cursor-pointer">
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(file);
                }}
              />
              Upload sample
            </label>
            <button
              onClick={handleDemo}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/10 text-sm"
            >
              Use demo sample
            </button>
            <span className="text-xs text-white/60">{status}</span>
          </div>

          <div className="flex items-end gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-white/60">
              <span>Octave</span>
              <button
                onClick={() => setOctave((prev) => Math.max(-2, prev - 1))}
                className="px-2 py-1 rounded border border-white/20"
              >
                –
              </button>
              <span className="w-6 text-center">{octave}</span>
              <button
                onClick={() => setOctave((prev) => Math.min(4, prev + 1))}
                className="px-2 py-1 rounded border border-white/20"
              >
                +
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <span>Scale</span>
              <select
                value={scale}
                onChange={(e) => setScale(e.target.value)}
                className="bg-black/40 border border-white/20 rounded px-2 py-1 text-xs"
              >
                <option>Chromatic</option>
                <option>Major</option>
                <option>Minor</option>
                <option>Pentatonic</option>
              </select>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/60">
              <span>Speed</span>
              <div
                ref={knobRef}
                onPointerDown={handleKnobPointerDown}
                onWheel={(e) => {
                  e.preventDefault();
                  updateSpeed(sampleSpeed + (e.deltaY > 0 ? -0.03 : 0.03));
                }}
                className="h-12 w-12 rounded-full border border-white/20 bg-black/40 relative cursor-ew-resize select-none"
                style={{
                  transform: `rotate(${(sampleSpeed - 1.25) * 110}deg)`,
                }}
              >
                <div className="absolute top-2 left-1/2 -translate-x-1/2 h-3 w-1 rounded-full bg-white" />
                <div className="absolute inset-2 rounded-full bg-white/5" />
              </div>
              <span className="text-white/70">{sampleSpeed.toFixed(2)}x</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
              <span>Trim Sample</span>
              <span className="text-white/40">
                {sampleDuration ? `${sampleDuration.toFixed(2)}s` : "--"}
              </span>
            </div>
            <div className="relative h-3 rounded-full bg-white/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/20 to-white/5 opacity-60" />
              {sampleDuration > 0 && (
                <div
                  className="absolute inset-y-0 rounded-full bg-gradient-to-r from-cyan-400/60 to-emerald-400/60 shadow-[0_0_12px_rgba(34,211,238,0.4)]"
                  style={{
                    left: `${(trimStart / sampleDuration) * 100}%`,
                    width: `${Math.max(
                      2,
                      ((trimEnd - trimStart) / sampleDuration) * 100
                    )}%`,
                  }}
                />
              )}
            </div>
            <div className="grid gap-3">
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>Start</span>
                <span className="font-mono">{trimStart.toFixed(2)}s</span>
              </div>
              <input
                type="range"
                min={0}
                max={sampleDuration || 1}
                step={0.01}
                value={Math.min(trimStart, Math.max(0, (sampleDuration || 0) - 0.05))}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  const maxStart = Math.max(0, (trimEnd || sampleDuration) - 0.05);
                  setTrimStart(Math.min(next, maxStart));
                }}
                disabled={!sampleDuration}
                className="w-full"
              />
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>End</span>
                <span className="font-mono">{trimEnd.toFixed(2)}s</span>
              </div>
              <input
                type="range"
                min={0}
                max={sampleDuration || 1}
                step={0.01}
                value={trimEnd || sampleDuration || 0}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  const minEnd = Math.min(sampleDuration || 0, trimStart + 0.05);
                  setTrimEnd(Math.max(next, minEnd));
                }}
                disabled={!sampleDuration}
                className="w-full"
              />
              <div className="grid grid-cols-2 gap-3">
                <label className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                  Start (s)
                  <input
                    type="text"
                    inputMode="decimal"
                    value={trimStartInput}
                    onChange={(e) => setTrimStartInput(e.target.value)}
                    onBlur={() => {
                      const parsed = Number(trimStartInput.replace(",", "."));
                      const maxStart = Math.max(0, (trimEnd || sampleDuration) - 0.05);
                      const next = Number.isFinite(parsed) ? parsed : 0;
                      setTrimStart(Math.min(Math.max(0, next), maxStart));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        (e.target as HTMLInputElement).blur();
                      }
                    }}
                    disabled={!sampleDuration}
                    className="mt-2 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
                  />
                </label>
                <label className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                  End (s)
                  <input
                    type="text"
                    inputMode="decimal"
                    value={trimEndInput}
                    onChange={(e) => setTrimEndInput(e.target.value)}
                    onBlur={() => {
                      const parsed = Number(trimEndInput.replace(",", "."));
                      const minEnd = Math.min(sampleDuration || 0, trimStart + 0.05);
                      const maxEnd = sampleDuration || 0;
                      const next = Number.isFinite(parsed) ? parsed : maxEnd;
                      setTrimEnd(Math.max(Math.min(next, maxEnd), minEnd));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        (e.target as HTMLInputElement).blur();
                      }
                    }}
                    disabled={!sampleDuration}
                    className="mt-2 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
                  />
                </label>
              </div>
              <div className="flex items-center gap-3 text-xs text-white/60">
                <button
                  onClick={() => playSample(activePitch, 0.85, false, sampleSpeed, true)}
                  className="px-3 py-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 transition"
                  disabled={!sampleDuration}
                >
                  Preview trim
                </button>
                <span>Trim applies to pads + sequencer.</span>
              </div>
            </div>
          </div>

          <div className="relative w-full max-w-3xl h-32">
            {NOTES.map((note, idx) => {
              const isBlack = note.black;
              const label = note.label;
              const shouldPlay =
                scale === "Chromatic" ||
                (scale === "Major" && [0, 2, 4, 5, 7, 9, 11].includes(note.semitone)) ||
                (scale === "Minor" && [0, 2, 3, 5, 7, 8, 10].includes(note.semitone)) ||
                (scale === "Pentatonic" && [0, 2, 4, 7, 9].includes(note.semitone));

              if (!shouldPlay && !isBlack) {
                return (
                  <div
                    key={label}
                    className="absolute bottom-0 h-28 w-12 rounded-lg border border-white/10 bg-black/20"
                    style={{ left: `${(NOTE_ORDER.indexOf(label) / NOTE_ORDER.length) * 100}%` }}
                  />
                );
              }

              if (isBlack) {
                const prevWhiteIndex = NOTE_ORDER.indexOf(label.replace("#", ""));
                const leftPos = ((prevWhiteIndex + 1) / NOTE_ORDER.length) * 100 - 4.5;
                return (
                  <button
                    key={label}
                    onClick={() =>
                      playSample(note.semitone + octave * 12, 0.9, true, sampleSpeed, true)
                    }
                className="absolute bottom-12 h-16 w-8 rounded-md bg-black text-white text-[10px] shadow-md hover:bg-zinc-800"
                style={{ left: `${leftPos}%` }}
              >
                    {label}
                  </button>
                );
              }

              const leftPos = (NOTE_ORDER.indexOf(label) / NOTE_ORDER.length) * 100;
              return (
                <button
                  key={label}
                onClick={() =>
                  playSample(note.semitone + octave * 12, 0.9, true, sampleSpeed, true)
                }
                className="absolute bottom-0 h-28 w-12 rounded-lg border border-white/20 bg-white text-black text-xs shadow-lg hover:bg-white/90"
                style={{ left: `${leftPos}%` }}
              >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
              <span>Pad Bank</span>
              <span className="text-white/40">Assign & Trigger</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: PAD_COUNT }).map((_, idx) => {
                const semitone = padPitches[idx];
                const label = `Pad ${idx + 1}`;
                return (
                  <button
                    key={label}
                    onClick={() => playSample(semitone, 0.95, false, sampleSpeed)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setSelectedPad(idx);
                    }}
                    className={cn(
                      "h-16 rounded-2xl border-2 font-semibold text-xs uppercase tracking-wide transition",
                      selectedPad === idx
                        ? "border-white bg-white/20 text-white"
                        : "border-white/15 bg-white/5 text-white/80 hover:border-white/40"
                    )}
                  >
                    {label}
                    <div className="text-[10px] opacity-70 mt-1">{semitone} st</div>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-3 text-xs text-white/70">
              <button
                onClick={() => {
                  if (selectedPad === null) return;
                  setPadPitches((prev) => {
                    const next = [...prev];
                    next[selectedPad] = activePitch;
                    return next;
                  });
                }}
                className="px-3 py-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 transition"
              >
                Assign selected pad to current pitch
              </button>
              <span>Right‑click a pad to select it.</span>
            </div>
          </div>

          <div className="space-y-3">
            {LANES.map((lane, laneIdx) => (
              <div key={lane.name} className="flex items-center gap-3">
                <div className="w-16 text-xs uppercase tracking-[0.2em] text-white/60">{lane.name}</div>
                <div className="grid grid-cols-16 gap-1 flex-1">
                  {Array.from({ length: STEPS }).map((_, stepIdx) => {
                    const isSample = lane.name === "Sample";
                    const isActive = pattern[laneIdx][stepIdx];
                    const pitchLabel =
                      isSample && samplePitches[stepIdx] !== null
                        ? `${samplePitches[stepIdx]}st`
                        : "";
                    return (
                      <button
                        key={`${lane.name}-${stepIdx}`}
                        onClick={() => toggleStep(laneIdx, stepIdx)}
                        className={cn(
                          "h-7 rounded-md border border-white/10 transition text-[10px]",
                          isActive
                            ? "bg-white text-black"
                            : "bg-black/30 hover:bg-white/10 text-white/60",
                          step === stepIdx && "ring-2 ring-pink-400/60"
                        )}
                      >
                        {pitchLabel}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 space-y-4">
          <div
            ref={vizWrapRef}
            className="relative h-56 w-full rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 via-[#0b1a23]/60 to-black/60 overflow-hidden"
          >
            <canvas ref={canvasRef} className="absolute inset-0" />
            <div className="absolute inset-x-0 bottom-3 text-center text-[11px] uppercase tracking-[0.3em] text-white/50">
              Audio Visualizer
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
              <span>Effects</span>
              <span className="text-white/40">Low CPU</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Reverb</span>
              <button
                onClick={() => setReverbOn((prev) => !prev)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs border transition",
                  reverbOn
                    ? "border-white/40 bg-white/20 text-white"
                    : "border-white/15 bg-white/5 text-white/60"
                )}
              >
                {reverbOn ? "On" : "Off"}
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>Mix</span>
                <span>{Math.round(reverbMix * 100)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={0.6}
                step={0.01}
                value={reverbMix}
                onChange={(e) => setReverbMix(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm uppercase tracking-[0.2em] text-white/60">Transport</div>
            <div className="text-xs text-white/70">Step {step + 1}</div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              className="flex-1 rounded-2xl bg-white text-black py-3 font-semibold hover:scale-[1.01] transition"
            >
              {isPlaying ? "Stop" : "Play"}
            </button>
            <button
              onClick={() => {
                setPattern(LANES.map(() => Array.from({ length: STEPS }, () => false)));
                setStep(0);
                setSamplePitches(Array.from({ length: STEPS }, () => null));
                stopAll();
              }}
              className="rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold"
            >
              Clear
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Tempo</span>
              <span className="text-white/70">{bpm} BPM</span>
            </div>
            <input
              type="range"
              min={70}
              max={160}
              step={1}
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-xs text-white/70 space-y-2">
            <div>No backend required. Everything runs in the browser.</div>
            <div>Supports pitch shifts per lane and real‑time playback.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
