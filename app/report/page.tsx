import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, TriangleAlert } from "lucide-react";
import { PageHero } from "@/components/civic/page-hero";
import { SourceAttribution } from "@/components/civic/source-attribution";
import { VerificationBadge } from "@/components/civic/verification-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { emergencyContacts, nationalHotline } from "@/data/emergency/contacts";
import { getOffice } from "@/data/government/offices";
import { reportingCategories } from "@/data/reporting";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Report a community issue",
  description:
    "How to report road damage, flooding, garbage, streetlights, and other community concerns in Pagsanjan through official channels. BetterPagsanjan does not receive reports.",
};

const municipalHall = emergencyContacts.find(
  (contact) => contact.id === "municipal-hall",
);

const reportSteps = [
  {
    step: "Note the details",
    detail:
      "Exact location with street, landmark, and barangay, plus the date and time. A photo from a safe distance helps — only if it is safe to take one.",
  },
  {
    step: "Contact the official channel",
    detail:
      "Call the Municipal Hall trunkline, visit your barangay hall in person, or use the official LGU website. In a life-threatening emergency, call 911 first.",
  },
  {
    step: "Keep a reference",
    detail:
      "Ask for a reference number and note the name of the person you spoke with and the date, so you can follow up through the same channel.",
  },
];

export default function ReportPage() {
  return (
    <>
      <PageHero
        eyebrow="Civic participation"
        title="Report a community issue"
        description="A guide to reporting road damage, flooding, garbage, streetlights, and other local concerns to the right office through official channels."
      />
      <Container className="space-y-12 py-10 sm:py-12">
        <div
          role="note"
          className="max-w-3xl rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900"
        >
          <p>
            <strong>BetterPagsanjan does not receive reports.</strong> Nothing
            on this page sends a complaint to the LGU. To file an official
            report, contact the Municipal Hall, your barangay hall, or — in a
            life-threatening emergency — call{" "}
            <a
              href="tel:911"
              className="font-bold underline underline-offset-2"
            >
              911
            </a>{" "}
            first.{" "}
            <Link
              href="/emergency"
              className="font-medium underline underline-offset-2"
            >
              Open the emergency center
            </Link>
            .
          </p>
        </div>

        <section aria-labelledby="how-to-report">
          <h2
            id="how-to-report"
            className="text-xl font-bold tracking-tight text-ink"
          >
            How to make an official report
          </h2>
          <ol className="mt-4 grid gap-3 sm:grid-cols-3">
            {reportSteps.map((item, index) => (
              <li
                key={item.step}
                className="rounded-lg border border-line bg-white p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">
                  Step {index + 1}
                </p>
                <p className="mt-1 font-semibold text-ink">{item.step}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {item.detail}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="categories-heading">
          <h2
            id="categories-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            What do you want to report?
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
            Choose a category to see what counts, which office usually handles
            it, and what to prepare before you contact the official channel.
            Office mappings are general guidance — confirm routing with the
            Municipal Hall or your barangay hall.
          </p>
          <ul className="mt-6 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reportingCategories.map((category) => {
              const office = category.officeId
                ? getOffice(category.officeId)
                : undefined;
              return (
                <li key={category.id} className="h-full">
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex flex-wrap items-center gap-2">
                        {category.urgent ? (
                          <Badge variant="warning">
                            <TriangleAlert
                              className="mr-1 size-3.5"
                              aria-hidden
                            />
                            Call 911 first if dangerous
                          </Badge>
                        ) : null}
                      </div>
                      <CardTitle className="text-base">
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-slate-600">
                        {category.description}
                      </p>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted">
                        Examples
                      </p>
                      <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-slate-700">
                        {category.examples.map((example) => (
                          <li key={example}>{example}</li>
                        ))}
                      </ul>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted">
                        Where to report
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-700">
                        {office ? (
                          <>
                            {office.name}.{" "}
                            <Link
                              href="/government"
                              className="font-medium text-link hover:underline"
                            >
                              View in the government directory
                            </Link>
                          </>
                        ) : (
                          "Information not yet available."
                        )}
                        {category.officeNote ? (
                          <> {category.officeNote}</>
                        ) : null}
                      </p>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted">
                        What to prepare
                      </p>
                      <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-slate-700">
                        {category.whatToPrepare.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <VerificationBadge
                          verification={category.verification}
                        />
                        {category.lastChecked ? (
                          <span className="text-xs text-muted">
                            Last checked: {category.lastChecked}
                          </span>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="channels-heading">
          <h2
            id="channels-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            Official channels
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
            These are the verified channels where an actual report is filed.
            BetterPagsanjan is not one of them.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {nationalHotline.number} — {nationalHotline.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-slate-600">
                  {nationalHotline.description}
                </p>
                <p className="mt-3">
                  <a
                    href="tel:911"
                    className="inline-flex min-h-11 items-center rounded-lg bg-red-700 px-4 text-sm font-bold text-white hover:bg-red-800"
                  >
                    Call 911
                  </a>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Municipal Hall trunkline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-slate-600">
                  For non-emergency reports and routing to the responsible
                  office. Office hours and department extensions have not yet
                  been verified.
                </p>
                {municipalHall ? (
                  <ul className="mt-3 list-none space-y-1.5">
                    {municipalHall.numbers.map((number) => (
                      <li key={number.value} className="text-sm">
                        <a
                          href={`tel:${number.value.replace(/[^0-9+]/g, "")}`}
                          className="font-semibold text-primary-800 hover:underline"
                        >
                          {number.value}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <p className="mt-3 text-sm">
                  <a
                    href={site.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-link hover:underline"
                  >
                    Official LGU website
                    <ExternalLink className="size-4" aria-hidden />
                  </a>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Your barangay hall in person — ask which office handles your
                  concern and request a reference for follow-up.
                </p>
              </CardContent>
            </Card>
          </div>
          <SourceAttribution
            className="mt-4 max-w-3xl"
            sourceId="dti-cmci"
            note="Municipal Hall trunkline as listed on the DTI CMCI LGU profile (LGU-supplied data). Office routing above is general guidance — confirm with the Municipal Hall or your barangay hall. Reporting guidance written by BetterPagsanjan; it is not an official government procedure."
          />
        </section>
      </Container>
    </>
  );
}
