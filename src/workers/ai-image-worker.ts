type LoadMessage = { type: "load"; modelUrl?: string };
type SegmentMessage = {
  type: "segment";
  width: number;
  height: number;
  feather: number;
  pixels: Uint8ClampedArray;
};
type Incoming = LoadMessage | SegmentMessage;

let modelReady = false;
let backend = "WASM";
let session: any = null;
let inputName = "input";
let outputName = "output";
let inputWidth = 512;
let inputHeight = 512;

const DEFAULT_MODEL_URL = "/models/modnet.onnx";
const toAbsoluteUrl = (path: string) => {
  if (/^https?:\/\//i.test(path)) return path;
  try {
    return new URL(path, self.location.origin).toString();
  } catch {
    return path;
  }
};

const postProgress = (value: number, note?: string) => {
  self.postMessage({ type: "progress", value, note });
};

const postError = (message: string) => {
  self.postMessage({ type: "error", message });
};

const postReady = () => {
  self.postMessage({ type: "ready", backend });
};

const softBlur = (data: Uint8ClampedArray, width: number, height: number, radius: number) => {
  if (radius <= 0) return data;
  const out = new Uint8ClampedArray(data.length);
  const r = Math.min(8, Math.max(1, Math.floor(radius)));
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let sum = 0;
      let count = 0;
      for (let dy = -r; dy <= r; dy += 1) {
        for (let dx = -r; dx <= r; dx += 1) {
          const nx = Math.min(width - 1, Math.max(0, x + dx));
          const ny = Math.min(height - 1, Math.max(0, y + dy));
          sum += data[ny * width + nx];
          count += 1;
        }
      }
      out[y * width + x] = sum / count;
    }
  }
  return out;
};

type NormMode = "zero_one" | "neg_one";
type ChannelOrder = "rgb" | "bgr";

const resizeToFloat32 = (
  pixels: Uint8ClampedArray,
  srcW: number,
  srcH: number,
  dstW: number,
  dstH: number,
  norm: NormMode,
  order: ChannelOrder
) => {
  const data = new Float32Array(1 * 3 * dstW * dstH);
  for (let y = 0; y < dstH; y += 1) {
    const sy = Math.min(srcH - 1, Math.round((y / (dstH - 1)) * (srcH - 1)));
    for (let x = 0; x < dstW; x += 1) {
      const sx = Math.min(srcW - 1, Math.round((x / (dstW - 1)) * (srcW - 1)));
      const srcIdx = (sy * srcW + sx) * 4;
      const dstIdx = y * dstW + x;
      const r = pixels[srcIdx] / 255;
      const g = pixels[srcIdx + 1] / 255;
      const b = pixels[srcIdx + 2] / 255;
      const a = order === "bgr" ? b : r;
      const c = g;
      const d = order === "bgr" ? r : b;
      const n0 = norm === "neg_one" ? (a - 0.5) / 0.5 : a;
      const n1 = norm === "neg_one" ? (c - 0.5) / 0.5 : c;
      const n2 = norm === "neg_one" ? (d - 0.5) / 0.5 : d;
      data[dstIdx] = n0;
      data[dstW * dstH + dstIdx] = n1;
      data[2 * dstW * dstH + dstIdx] = n2;
    }
  }
  return data;
};

const resizeMask = (mask: Float32Array | Uint8ClampedArray, srcW: number, srcH: number, dstW: number, dstH: number) => {
  const out = new Uint8ClampedArray(dstW * dstH);
  for (let y = 0; y < dstH; y += 1) {
    const sy = Math.min(srcH - 1, Math.round((y / (dstH - 1)) * (srcH - 1)));
    for (let x = 0; x < dstW; x += 1) {
      const sx = Math.min(srcW - 1, Math.round((x / (dstW - 1)) * (srcW - 1)));
      const value = mask[sy * srcW + sx];
      const alpha = typeof value === "number" ? Math.min(1, Math.max(0, value)) : value / 255;
      out[y * dstW + x] = Math.floor(alpha * 255);
    }
  }
  return out;
};

const sigmoidInPlace = (data: Float32Array) => {
  for (let i = 0; i < data.length; i += 1) {
    const v = data[i];
    data[i] = 1 / (1 + Math.exp(-v));
  }
};

const maskStats = (data: Float32Array) => {
  let sum = 0;
  let sumSq = 0;
  for (let i = 0; i < data.length; i += 1) {
    const v = data[i];
    sum += v;
    sumSq += v * v;
  }
  const mean = sum / Math.max(1, data.length);
  const variance = sumSq / Math.max(1, data.length) - mean * mean;
  const std = Math.sqrt(Math.max(0, variance));
  const score = std - Math.abs(mean - 0.5);
  return { mean, std, score };
};

const fetchModel = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok || !response.body) {
    throw new Error("Failed to fetch model");
  }
  const length = Number(response.headers.get("Content-Length") || 0);
  const reader = response.body.getReader();
  let received = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
      received += value.length;
      if (length) {
        const progress = Math.min(90, Math.round((received / length) * 80) + 10);
        postProgress(progress, "Downloading MODNet weights...");
      }
    }
  }
  const total = chunks.reduce((sum, c) => sum + c.length, 0);
  const buffer = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.length;
  }
  return buffer.buffer;
};

self.onmessage = async (event: MessageEvent<Incoming>) => {
  if (event.data.type === "load") {
    if (modelReady) return;
    try {
      postProgress(5, "Initializing ONNX Runtime...");
      const ort = await import("onnxruntime-web");
      ort.env.wasm.wasmPaths = toAbsoluteUrl("/ort/");
      ort.env.wasm.numThreads = Math.min(4, (navigator as any)?.hardwareConcurrency || 4);

      postProgress(10, "Fetching MODNet...");
      const modelUrl = toAbsoluteUrl(event.data.modelUrl || DEFAULT_MODEL_URL);
      const modelBuffer = await fetchModel(modelUrl);

      postProgress(92, "Creating session...");
      const providers = (ort as any).wasm?.wasmPaths ? ["wasm"] : ["wasm"];
      session = await ort.InferenceSession.create(modelBuffer, {
        executionProviders: providers,
        graphOptimizationLevel: "all",
      });

      inputName = session.inputNames?.[0] || inputName;
      outputName = session.outputNames?.[0] || outputName;
      const meta = session.inputMetadata?.[inputName];
      const dims = meta?.dimensions || [1, 3, 512, 512];
      inputHeight = typeof dims[2] === "number" ? dims[2] : 512;
      inputWidth = typeof dims[3] === "number" ? dims[3] : 512;

      modelReady = true;
      backend = "WASM";
      postReady();
    } catch (error: any) {
      const message =
        error?.message ||
        error?.toString?.() ||
        "Failed to load MODNet. Check /public/models/modnet.onnx and /public/ort/.";
      postError(message);
    }
    return;
  }

  if (event.data.type === "segment") {
    if (!modelReady) {
      postError("AI model not ready yet.");
      return;
    }
    const { width, height, feather, pixels } = event.data;
    try {
      const ort = await import("onnxruntime-web");

      const runOnce = async (norm: NormMode, order: ChannelOrder) => {
        const inputData = resizeToFloat32(pixels, width, height, inputWidth, inputHeight, norm, order);
        const tensor = new ort.Tensor("float32", inputData, [1, 3, inputHeight, inputWidth]);
        const outputs = await session.run({ [inputName]: tensor });
        const out = outputs[outputName];
        const outData = out.data as Float32Array;
        const outDims = out.dims || [1, 1, inputHeight, inputWidth];
        let maskData: Float32Array;
        let outH = inputHeight;
        let outW = inputWidth;
        if (outDims.length === 4) {
          outH = outDims[2] as number;
          outW = outDims[3] as number;
          maskData = outData.slice(0, outH * outW);
        } else {
          maskData = outData.slice();
        }
        sigmoidInPlace(maskData);
        const stats = maskStats(maskData);
        return { maskData, stats, outW, outH };
      };

      const primary = await runOnce("zero_one", "rgb");
      let chosen = primary;
      if (primary.stats.std < 0.05 || primary.stats.mean < 0.02 || primary.stats.mean > 0.98) {
        const alt = await runOnce("neg_one", "bgr");
        chosen = alt.stats.score > primary.stats.score ? alt : primary;
      }

      const resized = resizeMask(chosen.maskData, chosen.outW, chosen.outH, width, height);
      const feathered = softBlur(resized, width, height, feather * 8);
      self.postMessage({ type: "mask", data: feathered, width, height });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : String(error || "AI inference failed.");
      postError(message);
    }
  }
};
