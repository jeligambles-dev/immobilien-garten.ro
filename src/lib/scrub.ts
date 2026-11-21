// Scroll-scrub helpers for the story video. No imports (unit-tested with node --test).

export function segmentAt(t: number, starts: number[]): number {
  let k = 0;
  for (let i = 0; i < starts.length; i++) if (t >= starts[i]) k = i;
  return k;
}

export function snapToFrame(t: number, fps: number): number {
  return Math.round(t * fps) / fps;
}

/** Frame-rate independent exponential ease toward target. dtFrames = elapsed time in 60fps frames. */
export function easeStep(cur: number, target: number, dtFrames: number, k = 0.1): number {
  const next = cur + (target - cur) * (1 - Math.pow(1 - k, dtFrames));
  return Math.abs(target - next) < 1e-5 ? target : next;
}
