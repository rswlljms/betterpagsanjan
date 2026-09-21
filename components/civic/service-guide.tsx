"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { ServiceCard } from "@/components/civic/service-card";
import { getServiceBySlug } from "@/data/services";

interface GuideRefinement {
  id: string;
  label: string;
  hint: string;
  /** Service slugs from data/services — resolved defensively below. */
  services: string[];
}

interface GuideNeed {
  id: string;
  label: string;
  hint: string;
  /** Service Finder category used for the "open in finder" link. */
  category: string;
  services?: string[];
  refinements?: GuideRefinement[];
}

/**
 * Need-first service guide (AGENTS.md §15). Citizens pick what they want
 * to do in plain language instead of guessing category names like "civil
 * registry". Every outcome resolves to real service records — nothing is
 * invented, and missing slugs are dropped rather than rendered as gaps.
 * No accounts, nothing stored (§46).
 */
const needs: GuideNeed[] = [
  {
    id: "business",
    label: "Start or run a business, or build",
    hint: "Business permits and building permits",
    category: "business",
    refinements: [
      {
        id: "business-new",
        label: "I'm starting a new business",
        hint: "First-time business permit application",
        services: ["business-permit"],
      },
      {
        id: "business-renew",
        label: "I'm renewing my business permit",
        hint: "Annual renewal for an existing business",
        services: ["business-permit-renewal"],
      },
      {
        id: "business-build",
        label: "I'm building or renovating",
        hint: "Construction-related permit",
        services: ["building-permit"],
      },
    ],
  },
  {
    id: "civil",
    label: "Get a birth, marriage, or death certificate",
    hint: "Civil registry documents",
    category: "civil-registry",
    refinements: [
      {
        id: "civil-birth",
        label: "Birth certificate",
        hint: "For a newborn or a certified copy",
        services: ["birth-certificate"],
      },
      {
        id: "civil-marriage",
        label: "Marriage certificate",
        hint: "Certified copy of a marriage record",
        services: ["marriage-certificate"],
      },
      {
        id: "civil-death",
        label: "Death certificate",
        hint: "Certified copy of a death record",
        services: ["death-certificate"],
      },
    ],
  },
  {
    id: "tax",
    label: "Pay real property tax",
    hint: "Annual tax on land, buildings, and improvements",
    category: "taxation",
    services: ["real-property-tax"],
  },
  {
    id: "health",
    label: "See a doctor or get a check-up",
    hint: "Public health consultations",
    category: "health",
    services: ["health-services"],
  },
  {
    id: "senior",
    label: "Senior citizen ID or assistance",
    hint: "Benefits for residents aged 60 and above",
    category: "social",
    services: ["senior-citizen-id"],
  },
  {
    id: "barangay",
    label: "Get a barangay clearance",
    hint: "Issued by the barangay where you live",
    category: "barangay",
    services: ["barangay-clearance"],
  },
];

export function ServiceGuide() {
  const [needId, setNeedId] = useState<string | null>(null);
  const [refinementId, setRefinementId] = useState<string | null>(null);

  const need = needs.find((item) => item.id === needId) ?? null;
  const refinement =
    need?.refinements?.find((item) => item.id === refinementId) ?? null;

  const resultSlugs = refinement?.services ?? need?.services ?? [];
  const results = resultSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((service) => service !== undefined);
  const showResult = need !== null && (need.services ?? refinement) !== null;

  const step = !need ? 1 : showResult ? 3 : 2;
  const stepLabel =
    step === 1
      ? "Step 1 of 2 — What do you need to do?"
      : step === 2
        ? "Step 2 of 2 — Tell us a little more"
        : "Your service";

  function reset() {
    setNeedId(null);
    setRefinementId(null);
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">
        {stepLabel}
      </p>

      {step === 1 ? (
        <ul className="mt-4 grid max-w-2xl list-none gap-3">
          {needs.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => {
                  setNeedId(item.id);
                  setRefinementId(null);
                }}
                className="group flex w-full items-center justify-between gap-4 rounded-xl border border-line bg-white p-4 text-left transition hover:border-bp-stone hover:shadow-bp-sm-4"
              >
                <span>
                  <span className="block font-semibold text-ink">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted">
                    {item.hint}
                  </span>
                </span>
                <ArrowRight
                  className="size-5 shrink-0 text-bp-stone transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {step === 2 && need?.refinements ? (
        <div className="max-w-2xl">
          <ul className="mt-4 list-none space-y-3">
            {need.refinements.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setRefinementId(item.id)}
                  className="group flex w-full items-center justify-between gap-4 rounded-xl border border-line bg-white p-4 text-left transition hover:border-bp-stone hover:shadow-bp-sm-4"
                >
                  <span>
                    <span className="block font-semibold text-ink">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted">
                      {item.hint}
                    </span>
                  </span>
                  <ArrowRight
                    className="size-5 shrink-0 text-bp-stone transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setNeedId(null)}
            className="mt-4 inline-flex min-h-9 items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to all needs
          </button>
        </div>
      ) : null}

      {showResult && need ? (
        <div aria-live="polite" className="max-w-3xl">
          {results.length > 0 ? (
            <>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {results.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                Each page explains the requirements and points you to the
                responsible office. BetterPagsanjan never processes applications
                or payments.
              </p>
            </>
          ) : (
            <p className="mt-4 max-w-2xl rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
              That guide path has no matching service page yet. Browse the
              Service Finder instead — the guides there always reflect the
              current dataset.
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={`/services?category=${need.category}`}
              className="inline-flex min-h-11 items-center rounded-full bg-bp-ink px-6 text-sm font-semibold text-white hover:opacity-90"
            >
              Open in Service Finder
            </Link>
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-white px-6 text-sm font-semibold text-bp-graphite hover:border-bp-stone hover:text-bp-ink"
            >
              <RotateCcw className="size-4" aria-hidden />
              Start over
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
