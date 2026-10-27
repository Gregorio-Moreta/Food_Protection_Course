/// <reference lib="webworker" />
// Runs the Kokoro neural text to speech model in a worker so the page never freezes.
import { KokoroTTS } from "kokoro-js";

let tts: KokoroTTS | null = null;
const ctx = self as unknown as DedicatedWorkerGlobalScope;

ctx.onmessage = async (e: MessageEvent) => {
  const msg = e.data;
  try {
    if (msg.type === "init") {
      if (!tts) {
        tts = await KokoroTTS.from_pretrained("onnx-community/Kokoro-82M-v1.0-ONNX", {
          dtype: "q8",
          device: "wasm",
          progress_callback: (p: { status?: string; progress?: number; file?: string }) => {
            if (p.status === "progress") ctx.postMessage({ type: "progress", progress: p.progress ?? 0, file: p.file });
          },
        });
      }
      ctx.postMessage({ type: "ready" });
    } else if (msg.type === "gen") {
      if (!tts) throw new Error("Model not loaded");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const audio: any = await tts.generate(msg.text, { voice: msg.voice, speed: msg.speed ?? 1 });
      const samples: Float32Array = audio.audio;
      ctx.postMessage({ type: "audio", id: msg.id, samples, sampleRate: audio.sampling_rate }, [samples.buffer]);
    }
  } catch (err) {
    ctx.postMessage({ type: "error", id: msg.id, message: String((err as Error)?.message ?? err) });
  }
};
