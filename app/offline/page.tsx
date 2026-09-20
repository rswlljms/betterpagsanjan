import type { Metadata } from "next";
import { PhoneCall, WifiOff } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { emergencyContacts, nationalHotline } from "@/data/emergency/contacts";

export const metadata: Metadata = {
  title: "Offline",
  description:
    "You are offline. Core emergency numbers cached on this device are shown below, but cached content can be outdated.",
};

const goBagItems = [
  "Drinking water — good for at least three days",
  "Food that needs no cooking",
  "Medicines and a basic first-aid kit",
  "Flashlight and spare batteries",
  "Copies of important documents in a waterproof bag",
  "Power bank and charging cables",
];

export default function OfflinePage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-surface text-muted">
          <WifiOff className="size-6" aria-hidden />
        </span>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          You&rsquo;re offline
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          The page you requested isn&rsquo;t cached on this device. The core
          emergency numbers below are baked into this page so they work offline
          — but cached content can be outdated, so verify anything
          time-sensitive once you&rsquo;re back online.
        </p>
        <p className="mt-2 text-xs text-muted">
          Last checked: {nationalHotline.lastChecked}. Saved or printed copies
          can go stale.
        </p>
      </div>

      {/* Self-sufficient offline core: 911 always first, no network needed. */}
      <div className="mx-auto mt-8 max-w-2xl rounded-lg border-2 border-red-700 bg-red-50 p-6 text-center sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-red-800">
          National emergency hotline — works from any phone
        </p>
        <a
          href="tel:911"
          className="mt-2 inline-block text-5xl font-bold tracking-tight text-red-800 underline-offset-4 hover:underline sm:text-6xl"
        >
          911
        </a>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-red-900">
          {nationalHotline.description}
        </p>
      </div>

      <div className="mx-auto mt-6 grid max-w-3xl gap-4 sm:grid-cols-2">
        {emergencyContacts.map((contact) => (
          <Card key={contact.id}>
            <CardHeader>
              <CardTitle className="text-base">{contact.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-none space-y-1.5">
                {contact.numbers.map((number) => (
                  <li
                    key={number.value}
                    className="flex items-center justify-between gap-4 text-sm"
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
              <p className="mt-3 text-xs text-muted">
                {contact.verification.status === "verified"
                  ? "Verified"
                  : "Unverified — call 911 first"}
                {contact.lastChecked
                  ? ` · Last checked: ${contact.lastChecked}`
                  : null}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mx-auto mt-6 max-w-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <PhoneCall
              className="size-5 shrink-0 text-primary-700"
              aria-hidden
            />
            Grab-and-go checklist (offline copy)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-700">
            {goBagItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            General guidance written by BetterPagsanjan — not an official
            government advisory. Always follow official advisories from the
            MDRRMO, PAGASA, and the NDRRMC once you are back online.
          </p>
        </CardContent>
      </Card>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <ButtonLink href="/emergency" variant="danger">
          Emergency information
        </ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Try the homepage
        </ButtonLink>
      </div>
    </Container>
  );
}
