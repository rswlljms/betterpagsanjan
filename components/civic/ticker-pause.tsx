"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Pause/resume control for the emergency hotline ticker (WCAG 2.2.2).
 * Toggles the animation state through a class on the shared `.bp-ticker`
 * element so the server-rendered strip stays a server component.
 */
export function TickerPause() {
  const [paused, setPaused] = useState(false);

  function toggle() {
    const next = !paused;
    setPaused(next);
    document
      .querySelector(".bp-ticker")
      ?.classList.toggle("bp-ticker--paused", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      aria-label={
        paused
          ? "Resume emergency hotline ticker"
          : "Pause emergency hotline ticker"
      }
      className="absolute right-1.5 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-red-800 text-white hover:bg-red-900 focus-visible:outline-white"
    >
      {paused ? (
        <Play className="size-3.5" aria-hidden />
      ) : (
        <Pause className="size-3.5" aria-hidden />
      )}
    </button>
  );
}
