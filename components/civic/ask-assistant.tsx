"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Bot,
  PhoneCall,
  Search,
  SearchX,
  Send,
  TriangleAlert,
} from "lucide-react";
import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { emergencyContacts, nationalHotline } from "@/data/emergency/contacts";
import {
  searchIndex,
  searchRecordsRanked,
  type SearchRecord,
  type SearchResultType,
} from "@/lib/search";
import { isEmergencyQuery } from "@/lib/ask";

const typeBadgeVariant: Record<SearchResultType, BadgeVariant> = {
  service: "primary",
  office: "accent",
  barangay: "success",
  legislative: "primary",
  project: "warning",
  transparency: "neutral",
  location: "success",
  consultation: "accent",
  page: "neutral",
};

const typeLabel: Record<SearchResultType, string> = {
  service: "Service",
  office: "Office",
  barangay: "Barangay",
  legislative: "Legislative",
  project: "Project",
  transparency: "Transparency",
  location: "Location",
  consultation: "Consultation",
  page: "Page",
};

const suggestedQuestions = [
  "How do I get a business permit?",
  "What do I need for a barangay clearance?",
  "Where can I pay real property tax?",
  "I need a birth certificate",
  "Emergency hotlines",
];

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  text: string;
  showEmergency: boolean;
  matches: SearchRecord[];
  /** AI-generated reply from /api/ask; null means deterministic mode. */
  reply?: string | null;
  pending?: boolean;
}

interface AskResponse {
  emergency: boolean;
  matches: SearchRecord[];
  reply: string | null;
}

/**
 * Ask BetterPagsanjan — chat UI (AGENTS.md §16, §48).
 *
 * Conversational presentation: every reply renders retrieved site pages
 * plus the verified emergency panel when urgent. When /api/ask answers,
 * its grounded AI reply leads; otherwise the deterministic page matches
 * cover it — nothing is ever guessed.
 */
export function AskAssistant({ idPrefix = "ask" }: { idPrefix?: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const nextId = useRef(1);
  const pendingId = useRef<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const awaitingReply = messages.some((message) => message.pending);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  async function send(raw: string) {
    const text = raw.trim();
    if (text === "" || pendingId.current !== null) return;
    const userId = nextId.current++;
    const assistantId = nextId.current++;
    pendingId.current = assistantId;
    setMessages((prev) => [
      ...prev,
      {
        id: userId,
        role: "user",
        text,
        showEmergency: false,
        matches: [],
      },
      {
        id: assistantId,
        role: "assistant",
        text,
        showEmergency: false,
        matches: [],
        reply: null,
        pending: true,
      },
    ]);
    setDraft("");

    const fallback = (): ChatMessage => ({
      id: assistantId,
      role: "assistant",
      text,
      showEmergency: isEmergencyQuery(text),
      // Same relevance gate as /api/ask: no title-anchored page, no answer.
      matches: searchRecordsRanked(searchIndex, text, 4, 30),
      reply: null,
      pending: false,
    });

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 35000);
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (!response.ok) throw new Error(`Ask API ${response.status}`);
      const data = (await response.json()) as AskResponse;
      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantId
            ? {
                ...message,
                pending: false,
                showEmergency: data.emergency,
                matches: data.matches ?? [],
                reply: data.reply ?? null,
              }
            : message,
        ),
      );
    } catch {
      // Model unavailable, over quota, or offline — the deterministic
      // reply covers it so users never see an error.
      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantId ? fallback() : message,
        ),
      );
    } finally {
      pendingId.current = null;
    }
  }

  return (
    <div className="max-w-3xl">
      <div
        role="log"
        aria-live="polite"
        aria-label="Conversation with Ask BetterPagsanjan"
        className="space-y-4"
      >
        {/* Greeting — capabilities and limits up front. */}
        <div className="flex gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-bp-ink text-white">
            <Bot className="size-4" aria-hidden />
          </span>
          <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm border border-line bg-white p-4 shadow-bp-sm-4">
            <p className="text-sm leading-relaxed text-ink">
              Hi! Ask me about permits, offices, barangays, and civic
              information in Pagsanjan. I answer with links to pages already
              published on this site — I never guess requirements, fees, or
              policies.
            </p>
          </div>
        </div>

        {messages.map((message) =>
          message.role === "user" ? (
            <div key={message.id} className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-bp-ink px-4 py-2.5 text-sm leading-relaxed text-white">
                {message.text}
              </p>
            </div>
          ) : (
            <div key={message.id} className="flex gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-bp-ink text-white">
                <Bot className="size-4" aria-hidden />
              </span>
              <div className="min-w-0 flex-1 space-y-3 rounded-2xl rounded-tl-sm border border-line bg-white p-4 shadow-bp-sm-4">
                {message.pending ? (
                  <p
                    className="flex items-center gap-1.5 text-sm text-muted"
                    aria-label="Finding pages to answer"
                  >
                    <span className="flex gap-1" aria-hidden>
                      <span className="size-1.5 animate-bounce rounded-full bg-bp-stone" />
                      <span
                        className="size-1.5 animate-bounce rounded-full bg-bp-stone"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="size-1.5 animate-bounce rounded-full bg-bp-stone"
                        style={{ animationDelay: "300ms" }}
                      />
                    </span>
                    Finding pages…
                  </p>
                ) : (
                  <>
                    {message.reply ? (
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink">
                        {message.reply}
                      </p>
                    ) : null}
                    {message.showEmergency ? (
                      <div>
                        <p className="flex items-center gap-1.5 text-sm font-bold text-ink">
                          <PhoneCall
                            className="size-4 shrink-0 text-red-700"
                            aria-hidden
                          />
                          Emergency numbers first
                        </p>
                        <div className="mt-2 rounded-lg border-2 border-red-700 bg-red-50 p-4 text-center">
                          <p className="text-xs font-semibold uppercase tracking-wider text-red-800">
                            National emergency hotline
                          </p>
                          <a
                            href="tel:911"
                            className="mt-1 inline-block text-3xl font-bold tracking-tight text-red-800 underline-offset-4 hover:underline"
                          >
                            911
                          </a>
                          <p className="mx-auto mt-1 text-xs leading-relaxed text-red-900">
                            {nationalHotline.description}
                          </p>
                        </div>
                        <ul className="mt-2 list-none space-y-2">
                          {emergencyContacts.map((contact) => (
                            <li
                              key={contact.id}
                              className="rounded-lg border border-line p-3"
                            >
                              <p className="text-sm font-semibold text-ink">
                                {contact.name}
                              </p>
                              <ul className="mt-1 list-none space-y-0.5">
                                {contact.numbers.map((number) => (
                                  <li
                                    key={number.value}
                                    className="flex items-center justify-between gap-3 text-sm"
                                  >
                                    <span className="text-muted">
                                      {number.label ?? "Phone"}
                                    </span>
                                    <a
                                      href={`tel:${number.value.replace(/[^0-9+]/g, "")}`}
                                      className="font-semibold text-primary-800 hover:underline"
                                    >
                                      {number.value}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {message.matches.length > 0 ? (
                      <div>
                        <p className="text-sm font-bold text-ink">
                          {message.showEmergency
                            ? "Related pages"
                            : "Here's what I found"}
                        </p>
                        <ul className="mt-2 list-none space-y-2">
                          {message.matches.map((record) => (
                            <li key={record.id}>
                              <Link
                                href={record.href}
                                className="group flex items-start gap-2.5 rounded-xl border border-line p-3 transition hover:border-bp-stone"
                              >
                                <Badge
                                  variant={typeBadgeVariant[record.type]}
                                  className="mt-0.5 shrink-0"
                                >
                                  {record.badge ?? typeLabel[record.type]}
                                </Badge>
                                <span className="min-w-0">
                                  <span className="flex items-center gap-1 text-sm font-semibold text-ink">
                                    {record.title}
                                    <ArrowRight
                                      className="size-3.5 shrink-0 text-bp-stone transition-transform group-hover:translate-x-0.5"
                                      aria-hidden
                                    />
                                  </span>
                                  <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-bp-graphite">
                                    {record.description}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <p className="mt-2 text-xs text-muted">
                          <Link
                            href={`/search?q=${encodeURIComponent(message.text)}`}
                            className="inline-flex items-center gap-1 font-medium text-primary-700 hover:underline"
                          >
                            <Search className="size-3.5" aria-hidden />
                            See everything in Search
                          </Link>{" "}
                          · Summarized from site pages — verify official details
                          with the responsible office.
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2">
                        <SearchX
                          className="mt-0.5 size-4 shrink-0 text-muted"
                          aria-hidden
                        />
                        <div className="text-sm leading-relaxed">
                          <p className="font-semibold text-ink">
                            I couldn&apos;t verify that from this site&apos;s
                            pages.
                          </p>
                          <p className="mt-1 text-bp-graphite">
                            I only answer from what&apos;s published on
                            BetterPagsanjan. Try fewer words — like the name of
                            a service, office, or barangay.
                          </p>
                          <p className="mt-2 flex flex-wrap gap-2">
                            <Link
                              href={`/search?q=${encodeURIComponent(message.text)}`}
                              className="font-medium text-primary-700 hover:underline"
                            >
                              Try in Search
                            </Link>
                            <Link
                              href="/services"
                              className="font-medium text-primary-700 hover:underline"
                            >
                              Browse services
                            </Link>
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ),
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length === 0 ? (
        <div className="mt-4">
          <p className="text-sm font-semibold text-ink">Try asking</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => send(question)}
                className="rounded-full border border-line bg-white px-3 py-1.5 text-left text-sm text-bp-graphite hover:border-bp-stone hover:text-bp-ink"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => setMessages([])}
            className="text-sm font-medium text-muted hover:text-ink"
          >
            Clear chat
          </button>
        </div>
      )}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          send(draft);
        }}
        className="mt-3 flex gap-2"
      >
        <label htmlFor={`${idPrefix}-input`} className="sr-only">
          Message Ask BetterPagsanjan
        </label>
        <input
          id={`${idPrefix}-input`}
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask about a permit, office, barangay…"
          autoComplete="off"
          className="min-h-11 flex-1 rounded-full border border-line bg-white px-4 text-sm text-ink placeholder:text-bp-stone"
        />
        <button
          type="submit"
          disabled={draft.trim() === "" || awaitingReply}
          aria-label="Send message"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-bp-ink text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send className="size-4" aria-hidden />
        </button>
      </form>
      <p className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-muted">
        <TriangleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden />
        AI answers are generated only from site pages — never guesses. If live
        answers are unavailable you&apos;ll get matching pages instead. In a
        life-threatening emergency, call 911 first.
      </p>
    </div>
  );
}
