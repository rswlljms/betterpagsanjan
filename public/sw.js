/*
 * BetterPagsanjan service worker — minimal offline foundation (AGENTS.md §19).
 *
 * Strategy:
 * - Navigations: network-first, cached copy as fallback, then /offline.
 * - Static assets: stale-while-revalidate.
 * - Only same-origin GET requests are handled.
 *
 * Cached content can be stale. The /offline page says so explicitly.
 */
const VERSION = "v1";
const CACHE_NAME = `betterpagsanjan-${VERSION}`;
const PRECACHE = ["/offline", "/emergency", "/manifest.webmanifest", "/icon.svg"];
const MAX_RUNTIME_ENTRIES = 60;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

async function putAndTrim(request, response) {
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response.clone());
  const keys = await cache.keys();
  if (keys.length > MAX_RUNTIME_ENTRIES) {
    await cache.delete(keys[0]);
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navigations: network-first with offline fallback.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          event.waitUntil(putAndTrim(request, response));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          return cached ?? (await caches.match("/offline"));
        }),
    );
    return;
  }

  // Same-origin static assets: stale-while-revalidate.
  const isStatic =
    url.pathname.startsWith("/_next/static") ||
    /\.(css|js|woff2?|svg|png|jpe?g|webp|ico)$/.test(url.pathname);

  if (isStatic) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const network = fetch(request)
          .then((response) => {
            event.waitUntil(putAndTrim(request, response));
            return response;
          })
          .catch(() => cached);
        return cached ?? network;
      }),
    );
  }
});
