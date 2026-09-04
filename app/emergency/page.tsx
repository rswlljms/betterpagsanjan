import type { Metadata } from "next";
import {
  Backpack,
  Droplets,
  House,
  TriangleAlert,
} from "lucide-react";
import { PageHero } from "@/components/civic/page-hero";
import { SourceAttribution } from "@/components/civic/source-attribution";
import { VerificationBadge } from "@/components/civic/verification-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import {
  emergencyContacts,
  nationalHotline,
} from "@/data/emergency/contacts";

export const metadata: Metadata = {
  title: "Emergency & disaster information",
  description:
    "Emergency hotlines, disaster preparedness guides, and safety information for Pagsanjan, Laguna. In a life-threatening emergency, call 911.",
};

const typhoonFloodTips = [
  "Monitor PAGASA weather updates and official LGU advisories — not rumors.",
  "Know whether your home is in a flood- or landslide-prone area, and where your nearest evacuation center is.",
  "Store drinking water and food that needs no cooking — good for at least three days.",
  "Charge phones and power banks before the storm arrives; keep flashlights and spare batteries ready.",
  "Keep important documents in waterproof bags, and prepare a go-bag you can grab in one minute.",
  "Stay away from rivers, creeks, and low-lying areas during heavy rain — water rises fast in a river town.",
  "Never wade or drive through floodwaters. Turn around — do not drown.",
  "When officials order an evacuation, leave early. Do not wait for the water to rise.",
];

const earthquakeTips = [
  "During shaking: Drop, Cover, and Hold On. Stay away from windows and heavy objects that can fall.",
  "If you are outdoors, move away from buildings, trees, and power lines.",
  "Expect aftershocks after a strong earthquake.",
  "Check family members for injuries, then check your home for damage before re-entering any building.",
  "Use stairs, never elevators, in damaged buildings.",
  "Listen to official advisories before entering structures that may be unsafe.",
];

const kitItems = [
  "Drinking water — good for at least three days",
  "Food that needs no cooking",
  "Medicines and a basic first-aid kit",
  "Flashlight and spare batteries",
  "Battery-powered or hand-crank radio",
  "Whistle to signal for help",
  "Power bank and charging cables",
  "Copies of important documents in a waterproof bag",
  "Cash in small bills",
  "Hygiene items and extra clothes",
  "Comfort items for children and pets",
];

export default function EmergencyPage() {
  return (
    <>
      <PageHero
        eyebrow="Emergency"
        title="Emergency & disaster information"
        description="Verified hotlines and practical preparedness guidance for Pagsanjan residents. Local numbers are shown with their sources — anything unverified is clearly labeled."
      />

      <Container className="space-y-12 py-10 sm:py-12">
        {/* National hotline */}
        <section aria-labelledby="hotline-911">
          <h2 id="hotline-911" className="sr-only">
            National emergency hotline
          </h2>
          <div className="rounded-lg border-2 border-red-700 bg-red-50 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-800">
              National emergency hotline
            </p>
            <p className="mt-2 text-5xl font-bold tracking-tight text-red-800 sm:text-6xl">
              {nationalHotline.number}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-red-900">
              {nationalHotline.description}
            </p>
          </div>
          <SourceAttribution
            className="mt-3 max-w-3xl"
            sourceId={nationalHotline.sourceId}
            sourceUrl={nationalHotline.sourceUrl}
            lastChecked={nationalHotline.lastChecked}
            note="Verified from the DILG announcement of the nationwide Unified 911 launch."
          />
        </section>

        {/* Local contacts */}
        <section aria-labelledby="local-contacts">
          <h2 className="text-xl font-bold tracking-tight text-ink">
            Local contacts
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {emergencyContacts.map((contact) => (
              <Card key={contact.id}>
                <CardHeader>
                  <CardTitle className="text-base">{contact.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted">
                    {contact.description}
                  </p>
                  <ul className="mt-3 list-none space-y-1.5">
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
                  {contact.caution ? (
                    <p className="mt-3 flex items-start gap-1.5 rounded-lg border border-amber-200 bg-amber-50 p-2.5 text-xs leading-relaxed text-amber-900">
                      <TriangleAlert
                        className="mt-0.5 size-3.5 shrink-0"
                        aria-hidden
                      />
                      {contact.caution}
                    </p>
                  ) : null}
                  <div className="mt-3">
                    <VerificationBadge verification={contact.verification} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
            Local numbers can change. BetterPagsanjan reproduces them exactly as
            posted by the cited source, with a caution when the transcription
            still needs confirmation. For life-threatening emergencies, always
            call 911 first.
          </p>
        </section>

        {/* Preparedness */}
        <section aria-labelledby="preparedness">
          <h2 className="text-xl font-bold tracking-tight text-ink">
            Disaster preparedness
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
            General guidance prepared by BetterPagsanjan for Philippine
            disasters. Always follow official advisories from the MDRRMO,
            PAGASA, and the NDRRMC.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Droplets
                    className="size-5 shrink-0 text-primary-700"
                    aria-hidden
                  />
                  Typhoon &amp; flood safety
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                  {typhoonFloodTips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <House
                    className="size-5 shrink-0 text-primary-700"
                    aria-hidden
                  />
                  Earthquake safety
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                  {earthquakeTips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Backpack
                    className="size-5 shrink-0 text-primary-700"
                    aria-hidden
                  />
                  Emergency kit checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                  {kitItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">
                Sa panahon ng kalamidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="max-w-3xl text-sm leading-relaxed text-slate-700">
                Kapag may bagyo, baha, o lindol: tumawag sa 911 kapag may
                emergency. Maghanda ng tubig, pagkain, gamot, flashlight, at
                mahahalagang dokumento sa waterproof na supot. Manatiling
                updated sa lagay ng panahon mula sa mga opisyal na babala ng
                PAGASA at ng MDRRMO — hindi mula sa balitang kalye. Mag-evacuate
                agad kapag inutos ito ng mga opisyal, at lumayo sa ilog at mga
                mabababang lugar tuwing malakas ang ulan.
              </p>
            </CardContent>
          </Card>

          <SourceAttribution
            className="mt-4 max-w-3xl"
            sourceId="betterpagsanjan"
            note="General preparedness guidance written by BetterPagsanjan. It is not an official government advisory."
          />
        </section>
      </Container>
    </>
  );
}
