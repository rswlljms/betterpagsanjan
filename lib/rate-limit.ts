/**
 * Sliding-window rate limiter for the assistant API (AGENTS.md §47).
 *
 * Deployment note: counters live in module memory. On one long-lived Node
 * process that is a real per-visitor limit. On Vercel each serverless
 * instance keeps its own map, so a visitor can get `max` requests per warm
 * instance rather than per site — still a useful brake on bursts and on
 * repeated traffic to one instance, but not a global quota. Replace the
 * store with a shared one (Upstash Redis, Vercel KV) when the assistant
 * sees traffic that makes the difference matter.
 */

export interface RateLimitResult {
  allowed: boolean;
  /** Seconds until the caller may retry. 0 when allowed. */
  retryAfterSeconds: number;
}

export interface RateLimiterOptions {
  windowMs: number;
  /** Requests allowed per key per window. */
  max: number;
  /**
   * Upper bound on tracked keys. Module memory outlives requests in a
   * long-lived process, so the map must not grow with every address seen.
   */
  maxKeys?: number;
}

const DEFAULT_MAX_KEYS = 5_000;

/**
 * Creates a limiter that never records a rejected request, so a caller
 * cannot extend its own penalty window by retrying.
 */
export function createRateLimiter({
  windowMs,
  max,
  maxKeys = DEFAULT_MAX_KEYS,
}: RateLimiterOptions): (key: string, now?: number) => RateLimitResult {
  const buckets = new Map<string, number[]>();
  let lastSweep = 0;

  function sweep(now: number) {
    lastSweep = now;
    for (const [key, hits] of buckets) {
      const live = hits.filter((time) => now - time < windowMs);
      if (live.length === 0) buckets.delete(key);
      else if (live.length !== hits.length) buckets.set(key, live);
    }
  }

  return function check(key, now = Date.now()) {
    // Lazy cleanup instead of a timer: serverless instances may be frozen
    // between requests, so an interval would not fire reliably.
    if (now - lastSweep >= windowMs) sweep(now);

    const hits = (buckets.get(key) ?? []).filter(
      (time) => now - time < windowMs,
    );

    if (hits.length >= max) {
      const oldest = hits[0] ?? now;
      return {
        allowed: false,
        retryAfterSeconds: Math.max(
          1,
          Math.ceil((windowMs - (now - oldest)) / 1000),
        ),
      };
    }

    hits.push(now);
    buckets.set(key, hits);

    // Evict the oldest key rather than refusing new callers: a flood of
    // distinct addresses must not lock out everyone else.
    if (buckets.size > maxKeys) {
      const oldestKey = buckets.keys().next().value;
      if (oldestKey !== undefined && oldestKey !== key) {
        buckets.delete(oldestKey);
      }
    }

    return { allowed: true, retryAfterSeconds: 0 };
  };
}

/**
 * Best-effort client address for rate limiting.
 *
 * Both headers can be supplied by the caller, and the leftmost
 * `x-forwarded-for` entry always is when a proxy appends. The rightmost
 * entry is the hop our own platform wrote, so it is the least spoofable
 * choice available without trusting a specific proxy configuration. This
 * identifier is only used to meter a free assistant; it is not an
 * authorization boundary.
 */
export function clientIp(request: Request): string {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const hops = forwarded
      .split(",")
      .map((hop) => hop.trim())
      .filter(Boolean);
    const lastHop = hops.at(-1);
    if (lastHop) return lastHop;
  }

  return "unknown";
}
