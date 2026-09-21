"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircleQuestion, X } from "lucide-react";
import { AskAssistant } from "@/components/civic/ask-assistant";

/**
 * Site-wide floating chat widget (AGENTS.md §16). The same retrieval-only
 * Ask assistant, available from every page via a floating button that
 * expands into a chat panel. Non-modal: it never blocks page content,
 * Escape closes it, and focus returns to the toggle button.
 */
export function AskWidget() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!open) return;
    document.getElementById("ask-widget-input")?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Return focus to the toggle only when the panel actually closes —
  // never on first render.
  useEffect(() => {
    if (wasOpen.current && !open) toggleRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  return (
    <>
      {open ? (
        <section
          id="ask-widget-panel"
          role="dialog"
          aria-label="Ask BetterPagsanjan chat"
          className="fixed inset-x-3 bottom-20 z-50 flex max-h-[70vh] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-bp-sm sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-[400px] sm:max-h-[600px]"
        >
          <header className="flex items-center justify-between gap-3 border-b border-line bg-white px-4 py-3">
            <div>
              <p className="text-sm font-bold text-ink">Ask BetterPagsanjan</p>
              <p className="text-xs text-muted">
                Answers from site pages — never guesses
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted hover:bg-bp-paper hover:text-ink"
            >
              <X className="size-5" aria-hidden />
            </button>
          </header>
          <div className="flex-1 overflow-y-auto bg-surface px-3 py-4">
            <AskAssistant idPrefix="ask-widget" />
          </div>
        </section>
      ) : null}

      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="ask-widget-panel"
        aria-label={
          open
            ? "Close Ask BetterPagsanjan chat"
            : "Open Ask BetterPagsanjan chat"
        }
        className="fixed bottom-4 right-4 z-50 flex size-14 items-center justify-center rounded-full bg-bp-ink text-white shadow-bp-sm transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 sm:bottom-6 sm:right-6"
      >
        {open ? (
          <X className="size-6" aria-hidden />
        ) : (
          <MessageCircleQuestion className="size-6" aria-hidden />
        )}
      </button>
    </>
  );
}
