"use client";

import { useState } from "react";
import { Upload, Film, ImageIcon, Info } from "lucide-react";
import { resolveStoryVideo, DEFAULT_STORY_VIDEO, type StoryVideo } from "@/lib/contentMerge";
import { TabHead } from "./ui";

type Key = keyof StoryVideo;

/** Upload with progress (videos are 10–80 MB). */
function uploadWithProgress(url: string, file: File, onProgress: (p: number) => void): Promise<{ url: string } | { error: string }> {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    const form = new FormData();
    form.append("file", file);
    xhr.open("POST", url);
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress(e.loaded / e.total);
    xhr.onload = () => {
      try {
        const d = JSON.parse(xhr.responseText);
        resolve(xhr.status < 300 ? d : { error: d.error || "Eroare la încărcare" });
      } catch {
        resolve({ error: "Eroare la încărcare" });
      }
    };
    xhr.onerror = () => resolve({ error: "Eroare de conexiune" });
    xhr.send(form);
  });
}

const SLOTS: { key: Key; title: string; desc: string; accept: string; endpoint: string }[] = [
  { key: "desktop", title: "Video desktop", desc: "Afișat pe laptopuri și monitoare. Recomandat 2560×1440, MP4, max 80 MB.", accept: "video/mp4,video/webm", endpoint: "/api/admin/videos" },
  { key: "mobile", title: "Video telefon", desc: "Afișat pe telefoane și la conexiuni lente. Recomandat 1280×720, sub 15 MB.", accept: "video/mp4,video/webm", endpoint: "/api/admin/videos" },
  { key: "poster", title: "Imagine de start", desc: "Apare instant, până se încarcă video-ul. JPG/WebP, primul cadru al video-ului.", accept: "image/*", endpoint: "/api/admin/images" },
];

export default function VideoTab({ value, onSave }: { value: unknown; onSave: (v: Partial<StoryVideo>) => Promise<void> }) {
  const current = resolveStoryVideo(value);
  const [progress, setProgress] = useState<Partial<Record<Key, number>>>({});
  const [error, setError] = useState("");

  async function upload(slot: (typeof SLOTS)[number], file: File) {
    setError("");
    setProgress((p) => ({ ...p, [slot.key]: 0 }));
    const res = await uploadWithProgress(slot.endpoint, file, (x) => setProgress((p) => ({ ...p, [slot.key]: x })));
    setProgress((p) => ({ ...p, [slot.key]: undefined }));
    if ("error" in res) return setError(res.error);
    await onSave({ ...(value as object), [slot.key]: res.url });
  }

  return (
    <div>
      <TabHead title="Video principal" desc="Video-ul de pe prima pagină care se derulează odată cu scroll-ul, prin toate serviciile." />

      <div className="glass mb-6 flex gap-3 !rounded-2xl p-4 text-sm text-ink/85">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
        <p>
          Pentru o derulare fluidă, video-ul trebuie exportat cu <b>keyframe la fiecare ~8 cadre</b> (ex. ffmpeg <code className="rounded bg-white/10 px-1">-g 8 -bf 0</code>).
          Un video exportat normal funcționează, dar se poate mișca sacadat la scroll. Capitolele (Pavaje, Tuns gazon…) sunt legate de secunde fixe, deci noul video trebuie să păstreze aceeași ordine și durată (~30 s).
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {SLOTS.map((slot) => {
          const url = current[slot.key];
          const isDefault = url === DEFAULT_STORY_VIDEO[slot.key];
          const p = progress[slot.key];
          return (
            <div key={slot.key} className="glass flex flex-col !rounded-2xl p-4">
              <div className="mb-3 flex items-center gap-2 font-semibold">
                {slot.key === "poster" ? <ImageIcon className="h-4 w-4 text-accent" /> : <Film className="h-4 w-4 text-accent" />}
                {slot.title}
              </div>
              <div className="mb-3 aspect-video overflow-hidden rounded-xl bg-black">
                {slot.key === "poster" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <video src={url} muted controls preload="metadata" className="h-full w-full object-cover" />
                )}
              </div>
              <p className="mb-3 text-xs text-muted">{slot.desc}</p>
              <p className="mb-3 truncate text-xs text-ink/50">{isDefault ? "Original (inclus în site)" : url}</p>
              {p !== undefined ? (
                <div className="mt-auto h-10 overflow-hidden rounded-xl bg-white/10">
                  <div className="flex h-full items-center bg-accent/80 px-3 text-xs font-bold text-accent-ink transition-all" style={{ width: `${Math.max(8, p * 100)}%` }}>
                    {Math.round(p * 100)}%
                  </div>
                </div>
              ) : (
                <div className="mt-auto flex flex-wrap gap-2">
                  <label className="btn-cta cursor-pointer !py-2.5">
                    <Upload className="h-4 w-4" /> Încarcă
                    <input type="file" accept={slot.accept} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(slot, f); e.target.value = ""; }} />
                  </label>
                  {!isDefault && (
                    <button onClick={() => onSave({ ...(value as object), [slot.key]: "" })} className="btn-ghost glass !py-2.5">
                      Revino la original
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {error && <p className="mt-4 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}
    </div>
  );
}
