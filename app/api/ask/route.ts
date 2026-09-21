import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { emergencyContacts, nationalHotline } from "@/data/emergency/contacts";
import { isEmergencyQuery } from "@/lib/ask";
import { searchIndex, searchRecordsRanked } from "@/lib/search";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MAX_MESSAGE_LENGTH = 500;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;

/**
 * In-memory per-IP rate limit. Enough for single-instance dev and low
 * traffic; switch to a shared store (e.g. Upstash Redis) if the route
 * ever runs on multiple instances.
 */
const rateBuckets = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateBuckets.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );
  hits.push(now);
  rateBuckets.set(ip, hits);
  return hits.length > RATE_LIMIT_MAX;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() ?? "unknown";
}

/**
 * Guardrail prompt (AGENTS.md §16, §48). The model answers ONLY from the
 * retrieved pages below — never from its own knowledge of Pagsanjan,
 * fees, officials, or procedures.
 */
const SYSTEM_PROMPT = `You answer questions about Pagsanjan, Laguna using ONLY the site pages given in each request.

Rules:
- Use only the provided pages. Never state fees, requirements, officials, phone numbers, deadlines, statistics, or procedures that are not in them.
- If the question is not about Pagsanjan civic information, or the pages do not answer it, refuse briefly: say it is outside what you cover and point to the site's Search page. Never answer off-topic questions from your own knowledge.
- Keep replies short (2-4 sentences) in plain language. Cite page titles by name so the UI can link them.
- Reply in the user's language (English or Filipino).
- For emergencies, tell the user to call 911 first.`;

function buildContext(question: string): string {
  const matches = searchRecordsRanked(searchIndex, question, 4, 30);
  return matches
    .map(
      (record) => `- ${record.title} (${record.href}): ${record.description}`,
    )
    .join("\n");
}

/**
 * POST /api/ask — grounded civic answers over Gemini (free tier).
 *
 * Env (never committed, see .gitignore):
 *   LLM_API_KEY  Google AI Studio key (required for AI mode)
 *   LLM_MODEL    e.g. gemini-3.6-flash (default)
 *
 * Always responds 200 with { mode, emergency, matches, reply } so the
 * widget can fall back to deterministic replies when the model is
 * unavailable, over quota, or unconfigured — users never see errors.
 */
export async function POST(request: Request) {
  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    return Response.json(
      { mode: "fallback", emergency: false, matches: [], reply: null },
      { status: 429 },
    );
  }

  const body = (await request.json().catch(() => null)) as {
    message?: unknown;
  } | null;
  const message =
    typeof body?.message === "string"
      ? body.message.trim().slice(0, MAX_MESSAGE_LENGTH)
      : "";
  if (message === "") {
    return Response.json(
      { mode: "fallback", emergency: false, matches: [], reply: null },
      { status: 400 },
    );
  }

  const emergency = isEmergencyQuery(message);
  // Relevance gate: the top page must carry a meaningful term in its
  // title (score >= 30), otherwise the question has no on-site anchor
  // and the model is never called — off-topic questions always fall back.
  // Emergency questions bypass the gate: 911-first numbers need no anchor.
  const matches = searchRecordsRanked(searchIndex, message, 4, 30);

  // Nothing to ground an answer in — skip the model call entirely.
  if (matches.length === 0 && !emergency) {
    return Response.json({ mode: "fallback", emergency, matches, reply: null });
  }

  const apiKey = process.env.LLM_API_KEY;
  if (!apiKey) {
    return Response.json({ mode: "fallback", emergency, matches, reply: null });
  }

  const emergencyContext = emergency
    ? `\n\nVerified emergency numbers (repeat exactly, 911 first): national hotline ${nationalHotline.number}; ${emergencyContacts
        .map(
          (contact) =>
            `${contact.name}: ${contact.numbers.map((n) => n.value).join(", ")}`,
        )
        .join("; ")}.`
    : "";

  try {
    // The key is passed explicitly: the SDK's default env name
    // (GOOGLE_GENERATIVE_AI_API_KEY) differs from this project's
    // LLM_API_KEY, and the default must never silently win.
    const gemini = createGoogleGenerativeAI({ apiKey });
    const { text } = await generateText({
      model: gemini(process.env.LLM_MODEL ?? "gemini-3.6-flash"),
      system: SYSTEM_PROMPT,
      prompt: `Question: ${message}\n\nSite pages:\n${buildContext(message)}${emergencyContext}`,
      maxOutputTokens: 1024,
      temperature: 0,
    });
    return Response.json({
      mode: "ai",
      emergency,
      matches,
      reply: text.trim(),
    });
  } catch (error) {
    // Server terminal only — never sent to the client, since provider
    // errors can contain request details.
    console.error(
      "[ask] Gemini call failed:",
      error instanceof Error ? error.message : String(error),
    );
    return Response.json({ mode: "fallback", emergency, matches, reply: null });
  }
}
