"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Pause/resume control for the homepage hero photo marquee (WCAG 2.2.2).
 * Toggles a class on the decorative mosaic so the motion stops without
 * remounting or reloading any image.
 */
export function HeroMotionToggle() {
  const [paused, setPaused] = useState(false);

  function toggle() {
    const next = !paused;
    setPaused(next);
    document
      .getElementById("hero-mosaic")
      ?.classList.toggle("bp-hero-paused", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-bp-ink/85 px-3 text-xs font-medium text-white backdrop-blur-sm hover:bg-bp-ink focus-visible:outline-white"
    >
      {paused ? (
        <Play className="size-3.5" aria-hidden />
      ) : (
        <Pause className="size-3.5" aria-hidden />
      )}
      {paused ? "Resume background photos" : "Pause background photos"}
    </button>
  );
}
