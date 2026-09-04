"use client";

import { useEffect } from "react";

/**
 * Registers the service worker in production builds only, so it never
 * interferes with local development.
 */
export function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // A failed registration must never break the site.
    });
  }, []);

  return null;
}
