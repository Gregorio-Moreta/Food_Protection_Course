// Client-side read-aloud controller. Three engines share one player:
//  - "browser": the voices built into the device (Web Speech API)
//  - "kokoro":  free neural voices that run inside the browser (downloaded once, about 90 MB)
//  - "eleven":  optional ElevenLabs voices using the visitor's own free-tier API key
// Speed uses playbackRate on the audio engines so it can go well below normal speed.

import { chunkText, type Unit } from "./speak-text";

export type EngineId = "browser" | "kokoro" | "eleven";
export type Status = "idle" | "loading" | "playing" | "paused";

export type Settings = {
  engine: EngineId;
  rate: number;
  pitch: number;
  browserVoice: string;
  kokoroVoice: string;
  elevenVoice: string;
  elevenKey: string;
};

export type SpeechState = {
  status: Status;
  title: string;
  unitId: string | null;
  unitIndex: number;
  totalUnits: number;
  loadProgress: number; // 0 to 100 while a neural model downloads
  error: string | null;
  settings: Settings;
};

export const RATE_MIN = 0.25;
export const RATE_MAX = 2;

export const KOKORO_VOICES: { id: string; label: string; note: string }[] = [
  { id: "af_heart", label: "Heart", note: "American woman, warm (best quality)" },
  { id: "af_bella", label: "Bella", note: "American woman, expressive" },
  { id: "af_nicole", label: "Nicole", note: "American woman, calm and soft" },
  { id: "af_sarah", label: "Sarah", note: "American woman, clear" },
  { id: "af_sky", label: "Sky", note: "American woman, bright" },
  { id: "af_nova", label: "Nova", note: "American woman, steady" },
  { id: "am_michael", label: "Michael", note: "American man, friendly" },
  { id: "am_fenrir", label: "Fenrir", note: "American man, deep" },
  { id: "am_puck", label: "Puck", note: "American man, lively" },
  { id: "am_adam", label: "Adam", note: "American man, neutral" },
  { id: "bf_emma", label: "Emma", note: "British woman, polished" },
  { id: "bf_isabella", label: "Isabella", note: "British woman, gentle" },
  { id: "bm_george", label: "George", note: "British man, authoritative" },
  { id: "bm_fable", label: "Fable", note: "British man, storyteller" },
];

export const ELEVEN_DEFAULT_VOICES: { id: string; label: string }[] = [
  { id: "21m00Tcm4TlvDq8ikWAM", label: "Rachel (calm, clear)" },
  { id: "EXAVITQu4vr4xnSDxMaL", label: "Bella (soft)" },
  { id: "MF3mGyEYCl7XYWbV9V6O", label: "Elli (young, friendly)" },
  { id: "AZnzlk1XvdvUeBnXmlld", label: "Domi (strong)" },
  { id: "pNInz6obpgDQGcFmaJgB", label: "Adam (deep)" },
  { id: "ErXwobaYiN019PkySvjV", label: "Antoni (well rounded)" },
  { id: "TxGEqnHWrfWFTfGW9XjX", label: "Josh (deep, narration)" },
  { id: "yoZ06aMxZJJ28mfd3POQ", label: "Sam (raspy)" },
];

const DEFAULTS: Settings = {
  engine: "browser",
  rate: 0.85,
  pitch: 1,
  browserVoice: "",
  kokoroVoice: "af_heart",
  elevenVoice: ELEVEN_DEFAULT_VOICES[0].id,
  elevenKey: "",
};

const STORAGE_KEY = "fpc-voice-v1";

type Chunk = { unitIndex: number; text: string };

class SpeechController {
  private listeners = new Set<() => void>();
  private state: SpeechState = {
    status: "idle",
    title: "",
    unitId: null,
    unitIndex: 0,
    totalUnits: 0,
    loadProgress: 0,
    error: null,
    settings: { ...DEFAULTS },
  };
  private units: Unit[] = [];
  private chunks: Chunk[] = [];
  private cursor = 0;
  private run = 0;
  private audio: HTMLAudioElement | null = null;
  private cache = new Map<string, Promise<string>>();
  private worker: Worker | null = null;
  private workerReady: Promise<void> | null = null;
  private pending = new Map<number, { resolve: (v: { samples: Float32Array; sampleRate: number }) => void; reject: (e: Error) => void }>();
  private nextId = 1;
  private loaded = false;

  subscribe = (fn: () => void) => {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  };

  getState = () => this.state;
  getServerState = () => this.state;

  private emit(patch: Partial<SpeechState>) {
    this.state = { ...this.state, ...patch };
    this.listeners.forEach((l) => l());
  }

  /** Call once on the client to restore saved settings. */
  hydrate() {
    if (this.loaded || typeof window === "undefined") return;
    this.loaded = true;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) this.state = { ...this.state, settings: { ...DEFAULTS, ...JSON.parse(raw) } };
    } catch {}
    this.listeners.forEach((l) => l());
  }

  setSettings(patch: Partial<Settings>) {
    const settings = { ...this.state.settings, ...patch };
    this.emit({ settings, error: null });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {}
    const live = this.state.status === "playing" || this.state.status === "paused";
    if (!live) return;
    if (patch.rate !== undefined && this.audio && settings.engine !== "browser") {
      this.audio.playbackRate = settings.rate;
      return;
    }
    if (patch.engine !== undefined || patch.rate !== undefined || patch.pitch !== undefined || patch.browserVoice !== undefined || patch.kokoroVoice !== undefined || patch.elevenVoice !== undefined) {
      // restart the current chunk with the new voice settings
      const wasPaused = this.state.status === "paused";
      this.restartAt(this.cursor, wasPaused);
    }
  }

  // ---- public transport controls ----

  play(units: Unit[], title: string, startUnit = 0) {
    this.units = units;
    this.chunks = units.flatMap((u, i) => chunkText(u.text).map((t) => ({ unitIndex: i, text: t })));
    this.emit({ title, totalUnits: units.length, error: null });
    const start = Math.max(0, this.chunks.findIndex((c) => c.unitIndex >= startUnit));
    this.restartAt(start, false);
  }

  pause() {
    if (this.state.status !== "playing") return;
    if (this.state.settings.engine === "browser") window.speechSynthesis.pause();
    else this.audio?.pause();
    this.emit({ status: "paused" });
  }

  resume() {
    if (this.state.status !== "paused") return;
    if (this.state.settings.engine === "browser") window.speechSynthesis.resume();
    else void this.audio?.play();
    this.emit({ status: "playing" });
  }

  stop() {
    this.run++;
    this.killOutput();
    this.emit({ status: "idle", unitId: null, unitIndex: 0 });
  }

  next() {
    const target = this.chunks.findIndex((c) => c.unitIndex > this.currentUnit());
    if (target >= 0) this.restartAt(target, false);
    else this.stop();
  }

  prev() {
    const cu = this.currentUnit();
    // if we are partway through a unit go to its start, otherwise go to the previous unit
    const startOfCurrent = this.chunks.findIndex((c) => c.unitIndex === cu);
    const target =
      this.cursor > startOfCurrent ? startOfCurrent : this.chunks.findIndex((c) => c.unitIndex === Math.max(0, cu - 1));
    this.restartAt(Math.max(0, target), false);
  }

  jumpToUnit(unitIndex: number) {
    const t = this.chunks.findIndex((c) => c.unitIndex >= unitIndex);
    if (t >= 0) this.restartAt(t, false);
  }

  private currentUnit() {
    return this.chunks[this.cursor]?.unitIndex ?? 0;
  }

  // ---- playback loop ----

  private killOutput() {
    if (typeof window === "undefined") return;
    window.speechSynthesis?.cancel();
    if (this.audio) {
      this.audio.pause();
      this.audio.src = "";
      this.audio = null;
    }
  }

  private restartAt(chunkIndex: number, startPaused: boolean) {
    this.run++;
    const run = this.run;
    this.killOutput();
    this.cursor = chunkIndex;
    void this.loop(run, startPaused);
  }

  private async loop(run: number, startPaused: boolean) {
    const engine = this.state.settings.engine;
    try {
      if (engine === "kokoro") {
        this.emit({ status: "loading", loadProgress: 0 });
        await this.ensureKokoro();
        if (run !== this.run) return;
      }
      for (let i = this.cursor; i < this.chunks.length; i++) {
        if (run !== this.run) return;
        this.cursor = i;
        const c = this.chunks[i];
        const u = this.units[c.unitIndex];
        this.emit({ status: startPaused && i === this.cursor ? "paused" : "playing", unitId: u.id, unitIndex: c.unitIndex });
        if (engine === "browser") await this.speakBrowser(c.text, run, startPaused);
        else await this.speakAudio(i, run, startPaused);
        startPaused = false;
        if (run !== this.run) return;
      }
      if (run === this.run) this.emit({ status: "idle", unitId: null, unitIndex: 0 });
    } catch (e) {
      if (run !== this.run) return;
      this.killOutput();
      this.emit({ status: "idle", unitId: null, error: String((e as Error)?.message ?? e) });
    }
  }

  private speakBrowser(text: string, run: number, startPaused: boolean) {
    return new Promise<void>((resolve, reject) => {
      const synth = window.speechSynthesis;
      const u = new SpeechSynthesisUtterance(text);
      const s = this.state.settings;
      u.rate = s.rate;
      u.pitch = s.pitch;
      const voice = synth.getVoices().find((v) => v.voiceURI === s.browserVoice);
      if (voice) {
        u.voice = voice;
        u.lang = voice.lang;
      }
      u.onend = () => resolve();
      u.onerror = (ev) => {
        if (run !== this.run || ev.error === "canceled" || ev.error === "interrupted") resolve();
        else reject(new Error(`Speech failed: ${ev.error}`));
      };
      synth.speak(u);
      if (startPaused) synth.pause();
    });
  }

  private async speakAudio(chunkIndex: number, run: number, startPaused: boolean) {
    const url = await this.audioFor(chunkIndex);
    if (run !== this.run) return;
    // warm the next chunk while this one plays
    if (chunkIndex + 1 < this.chunks.length) void this.audioFor(chunkIndex + 1).catch(() => {});
    await new Promise<void>((resolve, reject) => {
      const a = new Audio(url);
      this.audio = a;
      a.preservesPitch = true;
      (a as HTMLAudioElement & { webkitPreservesPitch?: boolean }).webkitPreservesPitch = true;
      a.playbackRate = this.state.settings.rate;
      a.onended = () => resolve();
      a.onerror = () => reject(new Error("Could not play audio"));
      if (!startPaused) a.play().catch((e) => (run !== this.run ? resolve() : reject(e)));
    });
  }

  private audioFor(chunkIndex: number): Promise<string> {
    const s = this.state.settings;
    const text = this.chunks[chunkIndex].text;
    const voice = s.engine === "kokoro" ? s.kokoroVoice : s.elevenVoice;
    const key = `${s.engine}|${voice}|${text}`;
    let p = this.cache.get(key);
    if (!p) {
      p = s.engine === "kokoro" ? this.genKokoro(text, voice) : this.genEleven(text, voice, s.elevenKey);
      p.catch(() => this.cache.delete(key));
      this.cache.set(key, p);
      if (this.cache.size > 400) this.cache.delete(this.cache.keys().next().value as string);
    }
    return p;
  }

  // ---- Kokoro (free, in-browser neural) ----

  private ensureKokoro() {
    if (this.workerReady) return this.workerReady;
    this.workerReady = new Promise<void>((resolve, reject) => {
      try {
        const w = new Worker(new URL("./kokoro.worker.ts", import.meta.url), { type: "module" });
        this.worker = w;
        w.onmessage = (e: MessageEvent) => {
          const m = e.data;
          if (m.type === "progress") this.emit({ loadProgress: Math.round(m.progress ?? 0) });
          else if (m.type === "ready") resolve();
          else if (m.type === "audio") {
            this.pending.get(m.id)?.resolve({ samples: m.samples, sampleRate: m.sampleRate });
            this.pending.delete(m.id);
          } else if (m.type === "error") {
            if (m.id && this.pending.has(m.id)) {
              this.pending.get(m.id)?.reject(new Error(m.message));
              this.pending.delete(m.id);
            } else {
              this.workerReady = null;
              reject(new Error(m.message));
            }
          }
        };
        w.onerror = (e) => {
          this.workerReady = null;
          reject(new Error(e.message || "The neural voice could not start"));
        };
        w.postMessage({ type: "init" });
      } catch (e) {
        this.workerReady = null;
        reject(e as Error);
      }
    });
    return this.workerReady;
  }

  private async genKokoro(text: string, voice: string): Promise<string> {
    await this.ensureKokoro();
    const id = this.nextId++;
    const res = await new Promise<{ samples: Float32Array; sampleRate: number }>((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.worker!.postMessage({ type: "gen", id, text, voice, speed: 1 });
    });
    return URL.createObjectURL(floatToWav(res.samples, res.sampleRate));
  }

  // ---- ElevenLabs (optional, visitor's own key) ----

  private async genEleven(text: string, voice: string, key: string): Promise<string> {
    if (!key) throw new Error("Add your free ElevenLabs API key in Voice settings first.");
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_64`, {
      method: "POST",
      headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body: JSON.stringify({ text, model_id: "eleven_flash_v2_5" }),
    });
    if (!r.ok) {
      let detail = "";
      try {
        detail = (await r.json())?.detail?.message ?? "";
      } catch {}
      if (r.status === 401) throw new Error("ElevenLabs rejected the API key.");
      if (r.status === 429 || /quota/i.test(detail)) throw new Error("ElevenLabs free quota used up. Switch to the free in-browser voices.");
      throw new Error(detail || `ElevenLabs error ${r.status}`);
    }
    return URL.createObjectURL(await r.blob());
  }
}

function floatToWav(samples: Float32Array, sampleRate: number): Blob {
  const buf = new ArrayBuffer(44 + samples.length * 2);
  const v = new DataView(buf);
  const w = (o: number, s: string) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  w(0, "RIFF");
  v.setUint32(4, 36 + samples.length * 2, true);
  w(8, "WAVE");
  w(12, "fmt ");
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true);
  v.setUint16(22, 1, true);
  v.setUint32(24, sampleRate, true);
  v.setUint32(28, sampleRate * 2, true);
  v.setUint16(32, 2, true);
  v.setUint16(34, 16, true);
  w(36, "data");
  v.setUint32(40, samples.length * 2, true);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    v.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return new Blob([buf], { type: "audio/wav" });
}

export const speech = new SpeechController();
