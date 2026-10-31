/**
 * Rate-limit check for the assistant API (AGENTS.md §47).
 *
 * The limiter is the one piece of request handling that is pure logic and
 * easy to regress: a rejected request must not extend its own penalty, the
 * key store must stay bounded on a long-lived process, and `Retry-After`
 * must be a real number. Run with:
 *
 *   npm run check:rate-limit
 *
 * Offline and deterministic, so CI can run it on every push.
 */

import assert from "node:assert/strict";
import { clientIp, createRateLimiter } from "../lib/rate-limit";

const passed: string[] = [];

function check(name: string, fn: () => void) {
  fn();
  passed.push(name);
}

check("allows up to the limit, then rejects", () => {
  const limit = createRateLimiter({ windowMs: 1_000, max: 3 });
  const start = 0;

  assert.equal(limit("a", start).allowed, true);
  assert.equal(limit("a", start + 100).allowed, true);
  assert.equal(limit("a", start + 200).allowed, true);
  assert.equal(limit("a", start + 300).allowed, false);
});

check("rejections do not extend the penalty window", () => {
  const limit = createRateLimiter({ windowMs: 1_000, max: 2 });

  assert.equal(limit("a", 0).allowed, true);
  assert.equal(limit("a", 100).allowed, true);
  assert.equal(limit("a", 200).allowed, false);
  // Retrying every 100ms must not push the reset further out.
  assert.equal(limit("a", 300).allowed, false);
  assert.equal(limit("a", 400).allowed, false);
  // The window started at t=0, so t=1000 frees a slot.
  assert.equal(limit("a", 1_000).allowed, true);
});

check("reports a usable Retry-After", () => {
  const limit = createRateLimiter({ windowMs: 60_000, max: 1 });

  assert.equal(limit("a", 0).allowed, true);
  const rejected = limit("a", 15_000);

  assert.equal(rejected.allowed, false);
  assert.ok(rejected.retryAfterSeconds >= 1);
  assert.ok(rejected.retryAfterSeconds <= 45);
  assert.equal(Number.isInteger(rejected.retryAfterSeconds), true);
});

check("keys are counted separately", () => {
  const limit = createRateLimiter({ windowMs: 1_000, max: 1 });

  assert.equal(limit("a", 0).allowed, true);
  assert.equal(limit("b", 0).allowed, true);
  assert.equal(limit("a", 10).allowed, false);
  assert.equal(limit("b", 10).allowed, false);
});

check("bounded key storage evicts, never rejects new callers", () => {
  const limit = createRateLimiter({ windowMs: 60_000, max: 1, maxKeys: 3 });

  assert.equal(limit("a", 0).allowed, true);
  assert.equal(limit("b", 0).allowed, true);
  assert.equal(limit("c", 0).allowed, true);
  // A fourth distinct address must still be served.
  assert.equal(limit("d", 0).allowed, true);
  // The oldest key was evicted, so it starts a fresh window.
  assert.equal(limit("a", 0).allowed, true);
});

check("expired windows are swept instead of accumulating", () => {
  const limit = createRateLimiter({ windowMs: 1_000, max: 1, maxKeys: 2 });

  assert.equal(limit("a", 0).allowed, true);
  assert.equal(limit("b", 0).allowed, true);
  // Past one window, the sweep clears both buckets.
  assert.equal(limit("c", 5_000).allowed, true);
  assert.equal(limit("d", 5_000).allowed, true);
  assert.equal(limit("e", 5_000).allowed, true);
});

check("client address prefers x-real-ip, then the last forwarded hop", () => {
  const withRealIp = new Request("https://example.test/api/ask", {
    headers: {
      "x-real-ip": "203.0.113.7",
      "x-forwarded-for": "1.1.1.1, 203.0.113.7",
    },
  });
  assert.equal(clientIp(withRealIp), "203.0.113.7");

  // A caller-supplied leftmost entry must not win over the proxy hop.
  const spoofed = new Request("https://example.test/api/ask", {
    headers: { "x-forwarded-for": "10.9.9.9, 203.0.113.7" },
  });
  assert.equal(clientIp(spoofed), "203.0.113.7");

  const none = new Request("https://example.test/api/ask");
  assert.equal(clientIp(none), "unknown");
});

console.log("Assistant rate-limit check");
for (const name of passed) console.log(`  ok  ${name}`);
console.log(`\n${passed.length} check(s) passed.`);
