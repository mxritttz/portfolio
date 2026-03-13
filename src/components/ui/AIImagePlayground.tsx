"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useModelLoader } from "@/hooks/useModelLoader";
import { cn } from "@/lib/utils";

const MAX_PREVIEW_SIZE = 960;

const fitToMax = (width: number, height: number, max: number) => {
  const scale = Math.min(1, max / Math.max(width, height));
  return {
    width: Math.round(width * scale),
    height: Math.round(height * scale),
    scale,
  };
};

export default function AIImagePlayground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sourceRef = useRef<HTMLImageElement | null>(null);
  const [mode, setMode] = useState<"instant" | "ai">("instant");
  const [modelTriggered, setModelTriggered] = useState(false);
  const [strength, setStrength] = useState(0.6);
  const [feather, setFeather] = useState(0.4);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [aiExportMask, setAiExportMask] = useState<Uint8ClampedArray | null>(null);
  const [maskStrength, setMaskStrength] = useState(1);
  const [invertMask, setInvertMask] = useState(false);
  const [aiPreview, setAiPreview] = useState<"blur" | "transparent" | "mask" | "glow">("blur");
  const [aiWarning, setAiWarning] = useState<string | null>(null);
  const [userOverride, setUserOverride] = useState(false);
  const [lastAction, setLastAction] = useState("Instant Effects");

  const { status, progress, backend, note, startLoading, runSegmentation } = useModelLoader();

  const canAI = status === "ready";
  const isLoading = status === "loading";

  const renderInstant = useCallback((img: HTMLImageElement, level: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { width, height } = fitToMax(img.naturalWidth || img.width, img.naturalHeight || img.height, MAX_PREVIEW_SIZE);
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (level <= 0.01) {
      ctx.clearRect(0, 0, width, height);
      ctx.filter = "none";
      ctx.drawImage(img, 0, 0, width, height);
      return;
    }

    // background blur layer
    ctx.clearRect(0, 0, width, height);
    ctx.filter = `blur(${Math.max(1, level * 12)}px) saturate(${1 + level * 0.6})`;
    ctx.drawImage(img, 0, 0, width, height);

    // spotlight mask for sharp foreground
    ctx.filter = "none";
    const maskRadiusX = width * (0.28 + level * 0.18);
    const maskRadiusY = height * (0.36 + level * 0.16);
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(width / 2, height / 2, maskRadiusX, maskRadiusY, 0, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, 0, 0, width, height);
    ctx.restore();

    // subtle grain overlay
    ctx.fillStyle = `rgba(255,255,255,${0.02 + level * 0.05})`;
    ctx.fillRect(0, 0, width, height);

    // vignette to make it obvious
    const vignette = ctx.createRadialGradient(
      width / 2,
      height / 2,
      Math.min(width, height) * (0.2 + level * 0.1),
      width / 2,
      height / 2,
      Math.max(width, height) * 0.7
    );
    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(1, `rgba(0,0,0,${0.2 + level * 0.35})`);
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);
  }, []);

  const loadImage = useCallback(
    async (file: File) => {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      const img = new Image();
      img.onload = () => {
        sourceRef.current = img;
        renderInstant(img, strength);
        setAiExportMask(null);
        if (!modelTriggered) {
          startLoading();
          setModelTriggered(true);
        }
      };
      img.src = url;
    },
    [modelTriggered, renderInstant, startLoading, strength]
  );

  const loadExample = useCallback(
    () => {
      const img = new Image();
      img.onload = () => {
        sourceRef.current = img;
        setImageUrl("/images/image.png");
        renderInstant(img, strength);
        setAiExportMask(null);
        if (!modelTriggered) {
          startLoading();
          setModelTriggered(true);
        }
      };
      img.src = "/images/image.png";
    },
    [modelTriggered, renderInstant, startLoading, strength]
  );

  const renderAI = useCallback(async () => {
    const img = sourceRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    setIsProcessingAI(true);
    const { width, height } = fitToMax(img.naturalWidth || img.width, img.naturalHeight || img.height, MAX_PREVIEW_SIZE);
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height);

    try {
      const mask = await runSegmentation(imageData, feather);
      let sum = 0;
      let sumSq = 0;
      for (let i = 0; i < mask.data.length; i += 1) {
        const v = mask.data[i];
        sum += v;
        sumSq += v * v;
      }
      const avg = sum / Math.max(1, mask.data.length);
      const variance = sumSq / Math.max(1, mask.data.length) - avg * avg;
      const std = Math.sqrt(Math.max(0, variance));
      if (avg < 4 || std < 2) {
        renderInstant(img, strength);
        setLastAction("Instant Effects");
        setAiExportMask(null);
        return;
      }
      const previewMode = aiPreview;
      const invert = invertMask;
      const strengthValue = maskStrength;
      let min = 255;
      let max = 0;
      for (let i = 0; i < mask.data.length; i += 1) {
        const v = invert ? 255 - mask.data[i] : mask.data[i];
        if (v < min) min = v;
        if (v > max) max = v;
      }
      const range = Math.max(1, max - min);
      const binaryThreshold = Math.round(min + range * 0.45);
      ctx.clearRect(0, 0, width, height);

      // build binary masks (normal + inverted) and pick the more reasonable one
      const buildMask = (useInvert: boolean) => {
        const bin = new Uint8ClampedArray(mask.data.length);
        let count = 0;
        for (let i = 0; i < mask.data.length; i += 1) {
          const raw = useInvert ? 255 - mask.data[i] : mask.data[i];
          const keep = raw >= binaryThreshold;
          bin[i] = keep ? 255 : 0;
          if (keep) count += 1;
        }
        const ratio = count / Math.max(1, mask.data.length);
        return { bin, ratio };
      };

      const normalMask = buildMask(false);
      const invertedMask = buildMask(true);
      let chosenMask = normalMask;
      if (invert) {
        chosenMask = invertedMask;
      } else if (
        (normalMask.ratio < 0.05 || normalMask.ratio > 0.9) &&
        invertedMask.ratio >= 0.05 &&
        invertedMask.ratio <= 0.9
      ) {
        chosenMask = invertedMask;
      }

      // warning based on the chosen binary mask
      if (chosenMask.ratio < 0.02 || chosenMask.ratio > 0.98) {
        setAiWarning("AI mask is weak on this image — try another photo.");
        setAiExportMask(null);
      } else {
        setAiWarning(null);
        setAiExportMask(chosenMask.bin);
      }

      const softMask = new Uint8ClampedArray(mask.data.length);
      for (let i = 0; i < mask.data.length; i += 1) {
        const raw = invert ? 255 - mask.data[i] : mask.data[i];
        const norm = Math.max(0, Math.min(1, (raw - min) / range));
        softMask[i] = Math.round(Math.pow(norm, 0.8) * 255);
      }

      const buildCanvasFromMask = (alphaMask: Uint8ClampedArray) => {
        const maskCanvas = document.createElement("canvas");
        maskCanvas.width = width;
        maskCanvas.height = height;
        const maskCtx = maskCanvas.getContext("2d");
        if (!maskCtx) return null;
        const maskPreview = maskCtx.createImageData(width, height);
        for (let i = 0; i < alphaMask.length; i += 1) {
          const v = alphaMask[i];
          const idx = i * 4;
          maskPreview.data[idx] = 255;
          maskPreview.data[idx + 1] = 255;
          maskPreview.data[idx + 2] = 255;
          maskPreview.data[idx + 3] = v;
        }
        maskCtx.putImageData(maskPreview, 0, 0);
        return maskCanvas;
      };

      const buildCutoutCanvas = (alphaMask: Uint8ClampedArray) => {
        const cutoutCanvas = document.createElement("canvas");
        cutoutCanvas.width = width;
        cutoutCanvas.height = height;
        const cutoutCtx = cutoutCanvas.getContext("2d");
        const maskCanvas = buildCanvasFromMask(alphaMask);
        if (!cutoutCtx || !maskCanvas) return null;
        cutoutCtx.clearRect(0, 0, width, height);
        cutoutCtx.drawImage(img, 0, 0, width, height);
        cutoutCtx.globalCompositeOperation = "destination-in";
        cutoutCtx.drawImage(maskCanvas, 0, 0);
        cutoutCtx.globalCompositeOperation = "source-over";
        return cutoutCanvas;
      };

      const edgeMask = new Uint8ClampedArray(chosenMask.bin.length);
      for (let y = 1; y < height - 1; y += 1) {
        for (let x = 1; x < width - 1; x += 1) {
          const idx = y * width + x;
          if (!chosenMask.bin[idx]) continue;
          const hasOutsideNeighbor =
            chosenMask.bin[idx - 1] === 0 ||
            chosenMask.bin[idx + 1] === 0 ||
            chosenMask.bin[idx - width] === 0 ||
            chosenMask.bin[idx + width] === 0;
          edgeMask[idx] = hasOutsideNeighbor ? 255 : 0;
        }
      }

      const cutoutCanvas = buildCutoutCanvas(chosenMask.bin);
      const softCutoutCanvas = buildCutoutCanvas(softMask);
      const edgeCanvas = buildCanvasFromMask(edgeMask);

      // draw original image as base for all AI previews (so it never becomes flat)
      if (previewMode !== "mask") {
        ctx.drawImage(img, 0, 0, width, height);
      }

      if (previewMode === "mask") {
        const maskPreview = ctx.createImageData(width, height);
        for (let i = 0; i < chosenMask.bin.length; i += 1) {
          const bw = chosenMask.bin[i];
          const idx = i * 4;
          maskPreview.data[idx] = bw;
          maskPreview.data[idx + 1] = bw;
          maskPreview.data[idx + 2] = bw;
          maskPreview.data[idx + 3] = 255;
        }
        ctx.putImageData(maskPreview, 0, 0);
      } else {
        if (previewMode === "transparent") {
          ctx.fillStyle = "#0b1220";
          ctx.fillRect(0, 0, width, height);
          const tile = Math.max(18, Math.round(Math.min(width, height) / 18));
          for (let y = 0; y < height; y += tile) {
            for (let x = 0; x < width; x += tile) {
              ctx.fillStyle = (Math.floor(x / tile) + Math.floor(y / tile)) % 2 === 0 ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)";
              ctx.fillRect(x, y, tile, tile);
            }
          }
        } else if (previewMode === "blur") {
          ctx.save();
          ctx.filter = `blur(${52 + strengthValue * 36}px) saturate(0.48) brightness(0.42)`;
          ctx.drawImage(img, 0, 0, width, height);
          ctx.restore();
          ctx.fillStyle = "rgba(4,8,16,0.3)";
          ctx.fillRect(0, 0, width, height);
        } else {
          ctx.drawImage(img, 0, 0, width, height);
          ctx.fillStyle = "rgba(6,10,18,0.46)";
          ctx.fillRect(0, 0, width, height);
        }
        if (previewMode === "transparent") {
          if (chosenMask.ratio < 0.02 || chosenMask.ratio > 0.98) {
            ctx.drawImage(img, 0, 0, width, height);
          } else if (cutoutCanvas) {
            ctx.drawImage(cutoutCanvas, 0, 0);
          }
        } else if (previewMode === "blur") {
          if (chosenMask.ratio < 0.02 || chosenMask.ratio > 0.98) {
            ctx.drawImage(img, 0, 0, width, height);
          } else if (softCutoutCanvas) {
            ctx.save();
            ctx.shadowColor = "rgba(0,0,0,0.35)";
            ctx.shadowBlur = 26;
            ctx.drawImage(softCutoutCanvas, 0, 0);
            ctx.restore();
            ctx.drawImage(softCutoutCanvas, 0, 0);
          }
        } else if (previewMode === "glow") {
          if (edgeCanvas) {
            const glowCanvas = document.createElement("canvas");
            glowCanvas.width = width;
            glowCanvas.height = height;
            const glowCtx = glowCanvas.getContext("2d");
            if (glowCtx) {
              glowCtx.drawImage(edgeCanvas, 0, 0);
              glowCtx.globalCompositeOperation = "source-in";
              glowCtx.fillStyle = "rgba(56,189,248,1)";
              glowCtx.fillRect(0, 0, width, height);
            }
            ctx.save();
            ctx.globalAlpha = 1;
            ctx.filter = "blur(24px)";
            ctx.drawImage(glowCanvas, 0, 0);
            ctx.restore();
            ctx.drawImage(glowCanvas, 0, 0);
          }
          if (edgeCanvas) {
            ctx.save();
            ctx.globalAlpha = 0.65;
            ctx.drawImage(edgeCanvas, 0, 0);
            ctx.restore();
          }
        } else if (cutoutCanvas) {
          ctx.save();
          ctx.shadowColor = "rgba(0,0,0,0.45)";
          ctx.shadowBlur = 28;
          ctx.drawImage(cutoutCanvas, 0, 0);
          ctx.restore();
          ctx.drawImage(cutoutCanvas, 0, 0);
        }
      }
      setLastAction("AI Background Removal");
    } catch {
      renderInstant(img, strength);
      setLastAction("Instant Effects");
      setAiExportMask(null);
    } finally {
      setIsProcessingAI(false);
    }
  }, [aiPreview, feather, invertMask, maskStrength, renderInstant, runSegmentation, strength]);

  const handleModeChange = useCallback(
    (next: "instant" | "ai") => {
      setUserOverride(true);
      setMode(next);
      const img = sourceRef.current;
      if (!img) return;
      if (next === "instant") {
        renderInstant(img, strength);
        setLastAction("Instant Effects");
        setAiExportMask(null);
      } else if (canAI) {
        renderAI();
      } else {
        startLoading();
      }
    },
    [canAI, renderAI, renderInstant, startLoading, strength]
  );

  useEffect(() => {
    if (!userOverride && mode === "instant" && canAI && sourceRef.current && modelTriggered) {
      setMode("ai");
      renderAI();
    }
  }, [canAI, modelTriggered, mode, renderAI, userOverride]);

  useEffect(() => {
    if (mode === "ai" && canAI && sourceRef.current) {
      renderAI();
    }
  }, [canAI, mode, renderAI]);

  useEffect(() => {
    if (mode === "ai" && canAI && sourceRef.current) {
      renderAI();
    }
  }, [aiPreview, invertMask, maskStrength, canAI, mode, renderAI]);

  const handleExport = useCallback(
    async (format: "png" | "jpg") => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      setExporting(true);
      const quality = format === "jpg" ? 0.92 : 1;
      if (format === "png" && mode === "ai" && aiPreview === "transparent" && aiExportMask && sourceRef.current) {
        const img = sourceRef.current;
        const { width, height } = fitToMax(img.naturalWidth || img.width, img.naturalHeight || img.height, MAX_PREVIEW_SIZE);
        const exportCanvas = document.createElement("canvas");
        exportCanvas.width = width;
        exportCanvas.height = height;
        const exportCtx = exportCanvas.getContext("2d");
        if (exportCtx) {
          exportCtx.drawImage(img, 0, 0, width, height);
          const imageData = exportCtx.getImageData(0, 0, width, height);
          for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i + 3] = aiExportMask[i / 4];
          }
          exportCtx.putImageData(imageData, 0, 0);
          exportCanvas.toBlob((blob) => {
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `ai-playground.${format}`;
            link.click();
            URL.revokeObjectURL(url);
            setExporting(false);
          }, "image/png");
          return;
        }
      }

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `ai-playground.${format}`;
          link.click();
          URL.revokeObjectURL(url);
          setExporting(false);
        },
        format === "png" ? "image/png" : "image/jpeg",
        quality
      );
    },
    [aiExportMask, aiPreview, mode]
  );

  const hasImage = Boolean(imageUrl);
  const statusLabel = useMemo(() => {
    if (status === "ready") return `AI ready (${backend})`;
    if (status === "loading") return `Loading AI model (${progress}%)`;
    if (status === "error") return "AI failed (fallback)";
    return "AI idle";
  }, [backend, progress, status]);

  return (
    <div className="relative h-full w-full text-white p-6 space-y-6">
      <div className="flex flex-col gap-3 items-center text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em]">
          AI Image Playground
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold">Instant & AI Image Tools</h2>
        <p className="text-gray-300 max-w-3xl">
          Instant effects run immediately. AI mode loads a local model in the background and upgrades the quality.
          No uploads. Everything runs on-device.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleModeChange("instant")}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold border transition",
                  mode === "instant" ? "bg-white text-black border-white" : "border-white/20 text-white"
                )}
              >
                Instant (no ML)
              </button>
              <button
                onClick={() => handleModeChange("ai")}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold border transition",
                  mode === "ai" ? "bg-white text-black border-white" : "border-white/20 text-white"
                )}
              >
                AI (runs locally)
              </button>
            </div>
            <div className="text-xs text-white/70">{statusLabel}</div>
          </div>

          <div className="relative rounded-2xl border border-white/15 bg-black/50 overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-[380px] md:h-[420px] object-contain" />
            {!hasImage && (
              <div className="absolute inset-0 grid place-items-center text-sm text-white/60">
                Upload an image to start
              </div>
            )}
            {hasImage && isProcessingAI && (
              <div className="absolute inset-0 grid place-items-center bg-black/40 text-sm text-white/80">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-10 w-10 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  Applying AI...
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/10 text-sm cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) loadImage(file);
                }}
              />
              Upload image
            </label>
            <button
              onClick={loadExample}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/10 text-sm"
            >
              Example picture
            </button>
            <span className="text-xs text-white/60">Preview capped at 960px for speed.</span>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 space-y-6">
          <div className="space-y-2">
            <div className="text-sm uppercase tracking-[0.2em] text-white/60">Controls</div>
            <div className="flex items-center justify-between text-sm">
              <span>Effect strength</span>
              <span className="text-white/70">{Math.round(strength * 100)}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={strength}
              onChange={(e) => {
                const value = Number(e.target.value);
                setStrength(value);
                const img = sourceRef.current;
                if (img && mode === "instant") {
                  renderInstant(img, value);
                }
              }}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Feather edges (AI)</span>
              <span className="text-white/70">{Math.round(feather * 100)}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={feather}
              onChange={(e) => {
                const value = Number(e.target.value);
                setFeather(value);
                if (mode === "ai" && canAI) {
                  renderAI();
                }
              }}
              className="w-full"
            />
          </div>

          {mode === "ai" && (
            <div className="space-y-2">
              <div className="text-sm uppercase tracking-[0.2em] text-white/60">AI Preview</div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { key: "blur", label: "Blur BG" },
                  { key: "transparent", label: "Cutout" },
                  { key: "mask", label: "Mask" },
                  { key: "glow", label: "Glow" },
                ].map((item) => (
                  <button
                    key={item.key}
                  onClick={() => {
                    setAiPreview(item.key as "blur" | "transparent" | "mask" | "glow");
                  }}
                    className={cn(
                      "rounded-xl border px-3 py-2",
                      aiPreview === item.key
                        ? "bg-white text-black border-white"
                        : "border-white/20 text-white"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {mode === "ai" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Mask strength</span>
                <span className="text-white/70">{Math.round(maskStrength * 100)}%</span>
              </div>
              <input
                type="range"
                min={0.1}
                max={1}
                step={0.01}
                value={maskStrength}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setMaskStrength(value);
                }}
                className="w-full"
              />
              <label className="flex items-center gap-2 text-xs text-white/70">
                <input
                  type="checkbox"
                  checked={invertMask}
                  onChange={(e) => {
                    setInvertMask(e.target.checked);
                  }}
                />
                Invert mask
              </label>
            </div>
          )}

          {(isLoading || status === "error") && (
            <div className="space-y-2">
              <div className={cn("text-xs", status === "error" ? "text-red-300" : "text-white/70")}>
                {note || (status === "error" ? "AI failed (fallback)" : "Loading AI model...")}
              </div>
              {isLoading && (
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-500" style={{ width: `${progress}%` }} />
                </div>
              )}
            </div>
          )}

          {aiWarning && (
            <div className="text-xs text-amber-300">
              {aiWarning}
            </div>
          )}

          {mode === "ai" && canAI && (
            <button
              onClick={renderAI}
              className="w-full rounded-2xl border border-white/20 bg-white/10 py-3 text-sm font-semibold hover:bg-white/20 transition"
            >
              Re-run AI
            </button>
          )}

          <div className="space-y-3">
            <div className="text-sm uppercase tracking-[0.2em] text-white/60">Export</div>
            <div className="grid grid-cols-2 gap-3">
              <button
                disabled={!hasImage || exporting}
                onClick={() => handleExport("png")}
                className="rounded-2xl bg-white text-black py-2 font-semibold disabled:opacity-50"
              >
                Export PNG
              </button>
              <button
                disabled={!hasImage || exporting}
                onClick={() => handleExport("jpg")}
                className="rounded-2xl border border-white/20 py-2 font-semibold disabled:opacity-50"
              >
                Export JPG
              </button>
            </div>
            <div className="text-xs text-white/50">Last action: {lastAction}</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-white/70 space-y-2">
            <div className="flex items-center justify-between">
              <span>No uploads. Runs locally.</span>
              <span className="rounded-full border border-white/20 px-2 py-0.5">{backend}</span>
            </div>
            <p>AI model loads after first upload or when AI mode is toggled.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
