"use client";
import { useEffect, useMemo, useState } from "react";
import { speech, KOKORO_VOICES, ELEVEN_DEFAULT_VOICES, RATE_MIN, RATE_MAX, type EngineId } from "@/lib/speech";
import { useSpeech } from "@/lib/use-speech";
import { GearIcon, PauseIcon, PlayIcon, SkipBack, SkipFwd, StopIcon, XIcon } from "./Icons";

const PRESETS = [0.25, 0.5, 0.65, 0.75, 1, 1.25, 1.5];
const SAMPLE = "Cold food must be kept at forty one degrees Fahrenheit or below, and hot food at one hundred forty or above.";

function useBrowserVoices() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", load);
  }, []);
  return voices;
}

export function VoiceUI() {
  const st = useSpeech();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setOpen(true);
    window.addEventListener("fpc:voice-settings", h);
    return () => window.removeEventListener("fpc:voice-settings", h);
  }, []);

  const active = st.status !== "idle";
  const rate = st.settings.rate;

  return (
    <>
      {active && (
        <div className="voicebar fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
            <div className="flex items-center gap-1">
              <button aria-label="Previous" onClick={() => speech.prev()} className="rounded-full p-2 hover:bg-surface2">
                <SkipBack />
              </button>
              <button
                aria-label={st.status === "paused" ? "Resume" : "Pause"}
                onClick={() => (st.status === "paused" ? speech.resume() : speech.pause())}
                className="rounded-full bg-brand p-3 text-brandink hover:opacity-90"
              >
                {st.status === "paused" ? <PlayIcon /> : <PauseIcon />}
              </button>
              <button aria-label="Next" onClick={() => speech.next()} className="rounded-full p-2 hover:bg-surface2">
                <SkipFwd />
              </button>
              <button aria-label="Stop" onClick={() => speech.stop()} className="rounded-full p-2 hover:bg-surface2">
                <StopIcon />
              </button>
            </div>

            <div className="min-w-0 flex-1 basis-40">
              <div className="truncate text-sm font-semibold">{st.title}</div>
              <div className="text-xs text-muted">
                {st.status === "loading"
                  ? `Loading neural voice${st.loadProgress ? ` ${st.loadProgress}%` : "..."} (first time only)`
                  : st.error
                    ? <span className="text-bad">{st.error}</span>
                    : `Part ${Math.min(st.unitIndex + 1, st.totalUnits)} of ${st.totalUnits}`}
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <span className="text-muted">Speed</span>
              <input
                type="range"
                min={RATE_MIN}
                max={RATE_MAX}
                step={0.05}
                value={rate}
                onChange={(e) => speech.setSettings({ rate: Number(e.target.value) })}
                className="w-28 accent-[var(--brand)]"
                aria-label="Speech speed"
              />
              <span className="w-12 tabular-nums font-semibold">{rate.toFixed(2)}x</span>
            </label>
            <button onClick={() => setOpen(true)} className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm hover:bg-surface2">
              <GearIcon width={16} height={16} /> Voice
            </button>
          </div>
        </div>
      )}
      {open && <VoiceSettings onClose={() => setOpen(false)} />}
    </>
  );
}

function VoiceSettings({ onClose }: { onClose: () => void }) {
  const st = useSpeech();
  const s = st.settings;
  const browserVoices = useBrowserVoices();

  const sorted = useMemo(() => {
    const score = (v: SpeechSynthesisVoice) =>
      (v.lang.startsWith("en") ? 0 : 100) + (/natural|neural|premium|enhanced|siri|online/i.test(v.name) ? 0 : 10) + (v.localService ? 1 : 0);
    return [...browserVoices].sort((a, b) => score(a) - score(b) || a.name.localeCompare(b.name));
  }, [browserVoices]);

  const engines: { id: EngineId; name: string; sub: string }[] = [
    { id: "browser", name: "Device voices", sub: "Built in, instant, quality varies" },
    { id: "kokoro", name: "Neural (free)", sub: "Natural voices, runs in your browser" },
    { id: "eleven", name: "ElevenLabs", sub: "Optional, your own free key" },
  ];

  const test = () => speech.play([{ id: "test", text: SAMPLE }], "Voice test");

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Voice settings">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-surface p-6 shadow-2xl sm:rounded-3xl">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold">Voice settings</h2>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-2 hover:bg-surface2">
            <XIcon />
          </button>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-3">
          {engines.map((e) => (
            <button
              key={e.id}
              onClick={() => speech.setSettings({ engine: e.id })}
              className={`rounded-xl border px-3 py-3 text-left ${s.engine === e.id ? "border-brand bg-brandsoft" : "border-line hover:bg-surface2"}`}
            >
              <div className="text-sm font-semibold">{e.name}</div>
              <div className="text-xs text-muted">{e.sub}</div>
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-xl bg-surface2 p-4">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-semibold">Speed</span>
            <span className="font-display text-2xl font-semibold text-brand">{s.rate.toFixed(2)}x</span>
          </div>
          <input
            type="range"
            min={RATE_MIN}
            max={RATE_MAX}
            step={0.05}
            value={s.rate}
            onChange={(e) => speech.setSettings({ rate: Number(e.target.value) })}
            className="mt-2 w-full accent-[var(--brand)]"
            aria-label="Speech speed"
          />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {PRESETS.map((r) => (
              <button
                key={r}
                onClick={() => speech.setSettings({ rate: r })}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${Math.abs(s.rate - r) < 0.01 ? "bg-brand text-brandink" : "border border-line hover:bg-surface"}`}
              >
                {r}x
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">Goes down to 0.25x. Neural and ElevenLabs voices keep their pitch when slowed, so they stay natural. Device voices depend on your browser and may not slow below about 0.5x.</p>
        </div>

        {s.engine === "browser" && (
          <div className="mt-5 space-y-4">
            <label className="block text-sm font-semibold">
              Voice
              <select
                value={s.browserVoice}
                onChange={(e) => speech.setSettings({ browserVoice: e.target.value })}
                className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 font-normal"
              >
                <option value="">Browser default</option>
                {sorted.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-semibold">
              Pitch ({s.pitch.toFixed(1)})
              <input type="range" min={0.5} max={1.5} step={0.1} value={s.pitch} onChange={(e) => speech.setSettings({ pitch: Number(e.target.value) })} className="mt-1 w-full accent-[var(--brand)]" />
            </label>
            <p className="text-xs text-muted">Tip: voices marked Natural, Neural, Premium or Enhanced sound best. On Windows Edge, the Online Natural voices are excellent. On Mac, download Premium voices in System Settings, Accessibility, Spoken Content.</p>
          </div>
        )}

        {s.engine === "kokoro" && (
          <div className="mt-5 space-y-3">
            <label className="block text-sm font-semibold">
              Voice
              <select
                value={s.kokoroVoice}
                onChange={(e) => speech.setSettings({ kokoroVoice: e.target.value })}
                className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 font-normal"
              >
                {KOKORO_VOICES.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.label}: {v.note}
                  </option>
                ))}
              </select>
            </label>
            <p className="rounded-lg bg-brandsoft p-3 text-sm">
              Free and private. The first time you play, your browser downloads a voice model of roughly 90 MB, then it is stored for next time. After that it works offline. Each sentence takes a moment to generate, and the next one is prepared while you listen.
            </p>
          </div>
        )}

        {s.engine === "eleven" && <ElevenPanel />}

        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={test} className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brandink hover:opacity-90">
            Test this voice
          </button>
          <button onClick={() => speech.stop()} className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold hover:bg-surface2">
            Stop
          </button>
          <button onClick={onClose} className="ml-auto rounded-full border border-line px-5 py-2.5 text-sm font-semibold hover:bg-surface2">
            Done
          </button>
        </div>
        {st.error && <p className="mt-3 text-sm text-bad">{st.error}</p>}
        {st.status === "loading" && <p className="mt-3 text-sm text-muted">Loading neural voice {st.loadProgress}%...</p>}
      </div>
    </div>
  );
}

function ElevenPanel() {
  const st = useSpeech();
  const s = st.settings;
  const [voices, setVoices] = useState(ELEVEN_DEFAULT_VOICES);
  const [status, setStatus] = useState("");

  async function refresh() {
    if (!s.elevenKey) return;
    setStatus("Checking key...");
    try {
      const r = await fetch("https://api.elevenlabs.io/v1/voices", { headers: { "xi-api-key": s.elevenKey } });
      if (!r.ok) throw new Error(r.status === 401 ? "Key rejected" : `Error ${r.status}`);
      const j = await r.json();
      const list = (j.voices as { voice_id: string; name: string; category?: string; labels?: Record<string, string> }[])
        .filter((v) => v.category === "premade")
        .map((v) => ({ id: v.voice_id, label: `${v.name}${v.labels?.descriptive ? ` (${v.labels.descriptive})` : ""}` }));
      if (list.length) setVoices(list);
      setStatus(`Key works. ${list.length} free voices found.`);
    } catch (e) {
      setStatus((e as Error).message);
    }
  }

  return (
    <div className="mt-5 space-y-3">
      <ol className="list-decimal space-y-1 pl-5 text-sm">
        <li>
          Make a free account at{" "}
          <a href="https://elevenlabs.io" target="_blank" rel="noreferrer" className="font-semibold text-brand underline">
            elevenlabs.io
          </a>{" "}
          (no card needed, about 10,000 characters a month).
        </li>
        <li>Open Profile, then API Keys, create a key and paste it below.</li>
      </ol>
      <label className="block text-sm font-semibold">
        API key
        <input
          type="password"
          value={s.elevenKey}
          onChange={(e) => speech.setSettings({ elevenKey: e.target.value.trim() })}
          placeholder="Paste your key"
          autoComplete="off"
          className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 font-normal"
        />
      </label>
      <label className="block text-sm font-semibold">
        Voice
        <select value={s.elevenVoice} onChange={(e) => speech.setSettings({ elevenVoice: e.target.value })} className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 font-normal">
          {voices.map((v) => (
            <option key={v.id} value={v.id}>
              {v.label}
            </option>
          ))}
        </select>
      </label>
      <div className="flex items-center gap-3">
        <button onClick={refresh} className="rounded-full border border-line px-4 py-1.5 text-sm font-semibold hover:bg-surface2">
          Check key
        </button>
        <span className="text-xs text-muted">{status}</span>
      </div>
      <p className="text-xs text-muted">Your key stays in this browser only. Audio is cached while the page is open so replays do not use more of your free quota. Reading a whole lesson uses a lot of characters, so the free voices above are better for long listening.</p>
    </div>
  );
}
