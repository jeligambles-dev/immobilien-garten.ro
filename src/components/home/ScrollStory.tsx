"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { SERVICES, STORY_STARTS, priceFor } from "@/lib/services";
import { usePrices } from "@/components/services/usePrices";
import { segmentAt, snapToFrame, easeStep } from "@/lib/scrub";
import s from "./ScrollStory.module.css";

const DURATION = 30;
const FPS = 24;
const LABELS = ["Sosire", ...SERVICES.map((x) => x.title)];

function pickSource(): string {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const small = Math.min(screen.width, screen.height) * devicePixelRatio < 900 || innerWidth < 760 || !!conn?.saveData;
  return small ? "/video/story-720.mp4" : "/video/story-1440.mp4";
}

export default function ScrollStory() {
  const track = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const hero = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const prices = usePrices();

  // load the video into a blob after the page has loaded → every seek is local
  useEffect(() => {
    let cancelled = false;
    let url = "";
    const ctrl = new AbortController();
    const start = async () => {
      try {
        const res = await fetch(pickSource(), { signal: ctrl.signal });
        if (!res.ok || !res.body) {
          setFailed(true);
          return;
        }
        const total = Number(res.headers.get("content-length")) || 0;
        const reader = res.body.getReader();
        const parts: BlobPart[] = [];
        let got = 0;
        for (;;) {
          const { done, value } = await reader.read();
          if (done || cancelled) break;
          parts.push(value);
          got += value.length;
          if (total && bar.current) bar.current.style.width = `${(got / total) * 100}%`;
        }
        if (cancelled || !video.current) return;
        url = URL.createObjectURL(new Blob(parts, { type: "video/mp4" }));
        video.current.src = url;
        const v = video.current;
        v.addEventListener("loadeddata", () => setLoaded(true), { once: true });
        v.load();
        // iOS Safari won't decode frames of a never-played video: prime it with play→pause
        v.play()
          .then(() => v.pause())
          .catch(() => {});
      } catch {
        /* aborted or network error: poster stays; scrolling still drives captions */
        if (!cancelled) setFailed(true);
      }
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      cancelled = true;
      ctrl.abort(); // leaving the page stops the 11–28 MB download
      window.removeEventListener("load", start);
      if (url) URL.revokeObjectURL(url);
    };
  }, []);

  // scroll → eased progress → frame-snapped seek (only when the decoder is free)
  useEffect(() => {
    const v = video.current!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer: fine)").matches;
    const progress = () => {
      const r = track.current!.getBoundingClientRect();
      return Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
    };
    let target = progress();
    let cur = target;
    let last = performance.now();
    let lastK = -1;
    let mx = 0, my = 0, px = 0, py = 0;
    let visible = true;
    let raf = 0;
    const onScroll = () => (target = progress());
    const onResize = () => (target = progress());
    const onMove = (e: PointerEvent) => {
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onResize, { passive: true });
    addEventListener("orientationchange", onResize);
    if (fine && !reduce) addEventListener("pointermove", onMove, { passive: true });
    const tick = (now: number) => {
      const dt = Math.min(64, now - last) / 16.67;
      last = now;
      cur = easeStep(cur, target, dt, 0.1);
      const t = snapToFrame(cur * (DURATION - 0.05), FPS);
      if (v.readyState >= 2 && !v.seeking && Math.abs(v.currentTime - t) > 0.5 / FPS) v.currentTime = t;
      if (fine && !reduce) {
        px += (mx - px) * 0.06 * dt;
        py += (my - py) * 0.06 * dt;
        v.style.transform = `translate3d(${-px * 20}px,${-py * 12}px,0)`;
      }
      if (hero.current) {
        hero.current.style.opacity = String(Math.max(0, 1 - t / 1.6));
        hero.current.style.pointerEvents = t > 1.2 ? "none" : "";
        const hide = t > 1.2; // faded CTAs must not take keyboard focus
        if (hero.current.inert !== hide) hero.current.inert = hide;
      }
      const k = segmentAt(t, STORY_STARTS);
      if (k !== lastK) {
        lastK = k;
        setActive(k);
      }
      raf = visible ? requestAnimationFrame(tick) : 0;
    };
    raf = requestAnimationFrame(tick);
    // stop the loop while the story is off-screen; resume when it comes back
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) {
        last = performance.now();
        target = progress();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(track.current!);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      removeEventListener("resize", onResize);
      removeEventListener("orientationchange", onResize);
      removeEventListener("scroll", onScroll);
      removeEventListener("pointermove", onMove);
    };
  }, []);

  const jump = (i: number) => {
    const el = track.current!;
    const t = STORY_STARTS[i] + (i ? 0.4 : 0);
    const top = el.offsetTop + (t / DURATION) * (el.offsetHeight - innerHeight);
    scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div ref={track} className={s.track}>
      <div className={s.pin}>
        <div className={s.stage}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={s.poster} src="/img/story-poster.webp" alt="" fetchPriority="high" />
          <video ref={video} muted playsInline preload="none" disablePictureInPicture aria-hidden="true" />
          <div className={s.shade} />
          <div className={`${s.load} ${loaded || failed ? s.loadDone : ""}`}>
            <i ref={bar} />
          </div>
        </div>

        <div ref={hero} className={`glass ${s.hero}`}>
          <div className={s.badge}>
            <b>●</b> Timișoara &amp; împrejurimi
          </div>
          <h1 className="h-hero">
            Grădina ta,
            <br />
            <em>cartea noastră</em>
            <br />
            de vizită.
          </h1>
          <p>Derulează și vezi cum transformăm o grădină — de la pavaj până la irigații, totul cu o singură echipă.</p>
          <div className="flex flex-wrap gap-3">
            <a href="tel:0747469681" className="btn-cta">
              <Phone className="h-4 w-4" /> Sună acum
            </a>
            <Link href="/portofoliu" className="btn-ghost glass">
              Vezi lucrările <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {SERVICES.map((svc, i) => (
          <div key={svc.slug} className={`glass ${s.cap} ${active === i + 1 ? s.capOn : ""}`} aria-hidden={active !== i + 1}>
            <div className={s.num}>{String(i + 1).padStart(2, "0")}</div>
            <div>
              <div className={s.k}>{svc.eyebrow}</div>
              <h3>{svc.title}</h3>
              <div className={s.d}>{svc.blurb}</div>
              <span className="pill-price !text-lg">{priceFor(svc, prices).label}</span>
              <Link href={`/servicii/${svc.slug}`} className={s.more} tabIndex={active === i + 1 ? 0 : -1}>
                Detalii →
              </Link>
            </div>
          </div>
        ))}

        <nav className={`glass ${s.rail}`} aria-label="Capitole video">
          {LABELS.map((label, i) => (
            <button key={label} className={active === i ? s.dotOn : ""} onClick={() => jump(i)} aria-label={label}>
              <span>{label}</span>
              <i />
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
