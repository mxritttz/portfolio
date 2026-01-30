"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ModelStatus = "idle" | "loading" | "ready" | "error";

type WorkerMessage =
  | { type: "progress"; value: number; note?: string }
  | { type: "ready"; backend: string }
  | { type: "error"; message: string }
  | { type: "mask"; data: Uint8ClampedArray; width: number; height: number };

type WorkerRequest =
  | { type: "load"; modelUrl?: string }
  | { type: "segment"; width: number; height: number; feather: number; pixels: Uint8ClampedArray };

export const useModelLoader = () => {
  const workerRef = useRef<Worker | null>(null);
  const [status, setStatus] = useState<ModelStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [backend, setBackend] = useState("WASM");
  const [note, setNote] = useState<string | null>(null);

  const ensureWorker = useCallback(() => {
    if (workerRef.current) return workerRef.current;
    const worker = new Worker(new URL("../workers/ai-image-worker.ts", import.meta.url), {
      type: "module",
    });
    worker.onmessage = (event: MessageEvent<WorkerMessage>) => {
      const data = event.data;
      if (data.type === "progress") {
        setProgress(data.value);
        if (data.note) setNote(data.note);
      }
      if (data.type === "ready") {
        setStatus("ready");
        setBackend(data.backend);
        setProgress(100);
        setNote(null);
      }
      if (data.type === "error") {
        setStatus("error");
        setNote(data.message || "AI failed (fallback)");
      }
    };
    workerRef.current = worker;
    return worker;
  }, []);

  const startLoading = useCallback((modelUrl?: string) => {
    if (status === "loading" || status === "ready") return;
    setStatus("loading");
    setProgress(0);
    setNote("Loading AI model...");
    const worker = ensureWorker();
    worker.postMessage({ type: "load", modelUrl } as WorkerRequest);
  }, [ensureWorker, status]);

  const runSegmentation = useCallback(
    async (imageData: ImageData, feather: number) => {
      const worker = ensureWorker();
      return new Promise<{ data: Uint8ClampedArray; width: number; height: number }>((resolve, reject) => {
        const handleMessage = (event: MessageEvent<WorkerMessage>) => {
          if (event.data.type === "mask") {
            worker.removeEventListener("message", handleMessage);
            const { data, width, height } = event.data;
            resolve({ data: new Uint8ClampedArray(data), width, height });
          }
        };
        worker.addEventListener("message", handleMessage);
        worker.postMessage(
          {
            type: "segment",
            width: imageData.width,
            height: imageData.height,
            feather,
            pixels: imageData.data,
          } as WorkerRequest,
          [imageData.data.buffer]
        );
        setTimeout(() => {
          worker.removeEventListener("message", handleMessage);
          reject(new Error("AI worker timeout"));
        }, 12000);
      });
    },
    [ensureWorker]
  );

  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  return {
    status,
    progress,
    backend,
    note,
    startLoading,
    runSegmentation,
  };
};
