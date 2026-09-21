"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Bot,
  PhoneCall,
  Search,
  SearchX,
  TriangleAlert,
} from "lucide-react";
import { EmptyState } from "@/components/civic/empty-state";
import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { emergencyContacts, nationalHotline } from "@/data/emergency/contacts";
import {
  searchIndex,
  searchRecords,
  type SearchResultType,
} from "@/lib/search";

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

/** Queries that should surface emergency numbers first — 911 always first. */
const emergencyKeywords = [
  "911",
  "emergency",
  "emergencies",
  "hotline",
  "hotlines",
  "police",
  "pnp",
  "fire",
  "bfp",
  "disaster",
  "rescue",
  "ambulance",
  "flood",
  "baha",
  "typhoon",
  "bagyo",
  "earthquake",
  "lindol",
  "mdrrmo",
  "evacuation",
];

const suggestedQuestions = [
  "How do I get a business permit?",
  "What do I need for a barangay clearance?",
  "Where can I pay real property tax?",
  "I need a birth certificate",
  "Emergency hotlines",
];

function isEmergencyQuery(query: string): boolean {
  const lowered = query.toLowerCase();
  return emergencyKeywords.some((keyword) => lowered.includes(keyword));
}

/**
 * Ask BetterPagsanjan — deterministic civic discovery assistant
 * (AGENTS.md §16, §48).
 *
 * Retrieval-only: answers are the site's own pages ranked by the shared
 * search index, plus the verified emergency panel when the question looks
 * urgent. It never guesses fees, requirements, officials, or policies —
 * when nothing on the site matches, it says so.
 */
export function AskAssistant() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  function applyParams(nextQuery: string) {
    const params = new URLSearchParams();
    if (nextQuery) params.set("q", nextQuery);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const trimmed = query.trim();
  const showEmergency = trimmed !== "" && isEmergencyQuery(trimmed);
  const matches = useMemo(
    () => (trimmed === "" ? [] : searchRecords(searchIndex, trimmed)),
    [trimmed],
  );
  const topMatches = matches.slice(0, 5);

  return (
    <div>
      <form
        role="search"
        onSubmit={(event) => event.preventDefault()}
        className="flex max-w-xl gap-2"
      >
        <label htmlFor="ask-input" className="sr-only">
          Ask BetterPagsanjan a question
        </label>
        <div className="relative flex-1">
          <Bot
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <input
            id="ask-input"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              applyParams(event.target.value);
            }}
            placeholder="Ask about a permit, office, barangay…"
            autoComplete="off"
            className="min-h-11 w-full rounded-lg border border-line bg-white pl-9 pr-3 text-sm text-ink placeholder:text-bp-stone"
          />
        </div>
      </form>

      <p className="mt-3 max-w-2xl text-xs leading-relaxed text-muted">
        Ask finds pages on this site that answer your question — it only repeats
        what is already published here. It never guesses fees, requirements,
        officials, or policies.
      </p>

      {trimmed === "" ? (
        <div className="mt-8">
          <h2 className="text-sm font-semibold text-ink">Try asking</h2>
          <div className="mt-3 flex max-w-2xl flex-wrap gap-2">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => {
                  setQuery(question);
                  applyParams(question);
                }}
                className="rounded-full border border-line bg-white px-3 py-1.5 text-left text-sm text-bp-graphite hover:border-bp-stone hover:text-bp-ink"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div aria-live="polite" className="mt-8 max-w-3xl space-y-6">
          {showEmergency ? (
            <section aria-labelledby="ask-emergency">
              <h2
                id="ask-emergency"
                className="flex items-center gap-2 text-base font-bold text-ink"
              >
                <PhoneCall
                  className="size-4 shrink-0 text-red-700"
                  aria-hidden
                />
                Emergency numbers first
              </h2>
              <div className="mt-3 rounded-lg border-2 border-red-700 bg-red-50 p-5 text-center sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-800">
                  National emergency hotline
                </p>
                <a
                  href="tel:911"
                  className="mt-1 inline-block text-4xl font-bold tracking-tight text-red-800 underline-offset-4 hover:underline sm:text-5xl"
                >
                  911
                </a>
                <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-red-900">
                  {nationalHotline.description}
                </p>
              </div>
              <ul className="mt-3 grid list-none gap-3 sm:grid-cols-2">
                {emergencyContacts.map((contact) => (
                  <li key={contact.id}>
                    <Card className="h-full">
                      <CardContent className="pt-4">
                        <p className="text-sm font-semibold text-ink">
                          {contact.name}
                        </p>
                        <ul className="mt-2 list-none space-y-1">
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
                        <p className="mt-2 text-xs text-muted">
                          {contact.verification.status === "verified"
                            ? "Verified"
                            : "Unverified — call 911 first"}
                          {contact.lastChecked
                            ? ` · Last checked: ${contact.lastChecked}`
                            : null}
                        </p>
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Full preparedness guides live on the{" "}
                <Link
                  href="/emergency"
                  className="font-medium text-primary-700 hover:underline"
                >
                  Emergency page
                </Link>
                .
              </p>
            </section>
          ) : null}

          {topMatches.length > 0 ? (
            <section aria-labelledby="ask-matches">
              <h2 id="ask-matches" className="text-base font-bold text-ink">
                {showEmergency
                  ? "Related pages"
                  : `Here's what I found for “${trimmed}”`}
              </h2>
              <ul className="mt-3 list-none space-y-3">
                {topMatches.map((record) => (
                  <li key={record.id}>
                    <Link
                      href={record.href}
                      className="group flex flex-col gap-1.5 rounded-xl bg-white p-4 shadow-bp-sm-4 transition hover:shadow-bp-sm sm:flex-row sm:items-start sm:gap-4"
                    >
                      <span className="shrink-0 pt-0.5">
                        <Badge variant={typeBadgeVariant[record.type]}>
                          {record.badge ?? typeLabel[record.type]}
                        </Badge>
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-1.5 font-semibold text-ink">
                          {record.title}
                          <ArrowRight
                            className="size-4 shrink-0 text-bp-stone transition-transform group-hover:translate-x-0.5"
                            aria-hidden
                          />
                        </span>
                        <span className="mt-0.5 line-clamp-2 block text-sm leading-relaxed text-bp-graphite">
                          {record.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              {matches.length > topMatches.length ? (
                <p className="mt-3 text-sm text-muted">
                  <Link
                    href={`/search?q=${encodeURIComponent(trimmed)}`}
                    className="inline-flex items-center gap-1 font-medium text-primary-700 hover:underline"
                  >
                    <Search className="size-3.5" aria-hidden />
                    See all {matches.length} results in Search
                  </Link>
                </p>
              ) : null}
              <p className="mt-4 max-w-2xl text-xs leading-relaxed text-muted">
                Summarized from pages on this site. For official requirements,
                fees, and policies, verify with the responsible government
                office.
              </p>
            </section>
          ) : (
            <EmptyState
              icon={SearchX}
              title={`I couldn't verify that from this site's pages`}
              description={`I only answer from what's published on BetterPagsanjan, and nothing here matches yet. Try fewer words — for example the name of a service, office, or barangay — or browse Search.`}
              action={
                <div className="flex flex-wrap justify-center gap-2">
                  <Link
                    href={`/search?q=${encodeURIComponent(trimmed)}`}
                    className="inline-flex min-h-11 items-center rounded-full bg-bp-ink px-6 text-sm font-semibold text-white hover:opacity-90"
                  >
                    Try in Search
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-6 text-sm font-semibold text-bp-graphite hover:border-bp-stone hover:text-bp-ink"
                  >
                    Browse services
                  </Link>
                </div>
              }
            />
          )}

          {trimmed !== "" && !showEmergency && topMatches.length > 0 ? (
            <p className="flex items-start gap-1.5 text-xs leading-relaxed text-muted">
              <TriangleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden />
              In a life-threatening emergency, skip this page and call 911
              first.
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}
