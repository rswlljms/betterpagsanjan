"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LoaderOne } from "@/components/ui/loader";
import { cn } from "@/lib/utils";

const MIN_DISPLAY_MS = 900;
const MAX_WAIT_MS = 3000;
const FADE_MS = 300;

/**
 * BootSplash — full-screen brand loader shown once on initial page load
 * (logo + LoaderOne dots), then faded out.
 *
 * The root layout persists across client-side navigation, so this only runs
 * on a full page open — matching the "opening the website" loading moment.
 * Route-to-route loading is handled separately by `app/loading.tsx`.
 */
export function BootSplash() {
  const [phase, setPhase] = useState<"show" | "fade" | "done">("show");

  useEffect(() => {
    const startedAt = Date.now();
    let settled = false;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };
    const beginFade = () => {
      if (settled) return;
      settled = true;
      const wait = Math.max(0, MIN_DISPLAY_MS - (Date.now() - startedAt));
      later(() => setPhase("fade"), wait);
      later(() => setPhase("done"), wait + FADE_MS);
    };

    if (document.readyState === "complete") {
      beginFade();
    } else {
      window.addEventListener("load", beginFade, { once: true });
      // Fallback so a slow subresource never traps the splash on screen.
      later(beginFade, MAX_WAIT_MS);
    }

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("load", beginFade);
    };
  }, []);

  // Lock scroll while the splash covers the page; restored via cleanup
  // whenever the phase changes (including the transition to "done").
  useEffect(() => {
    if (phase === "done") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading BetterPagsanjan"
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-bp-paper transition-opacity duration-300",
        phase === "fade" ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <Image
        src="/images/logo/better-pagsanjan-logo.svg"
        alt="BetterPagsanjan"
        width={240}
        height={91}
        priority
        className="h-16 w-auto"
      />
      <LoaderOne />
      <span className="sr-only">Loading BetterPagsanjan…</span>
    </div>
  );
}
