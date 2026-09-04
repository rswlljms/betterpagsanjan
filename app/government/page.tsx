import type { Metadata } from "next";
import Link from "next/link";
import {
  ExternalLink,
  Info,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { PageHero } from "@/components/civic/page-hero";
import { SourceAttribution } from "@/components/civic/source-attribution";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { offices } from "@/data/government/offices";
import { officials } from "@/data/government/officials";
import { site } from "@/data/site";
import type { OfficeGroup } from "@/types/civic";

export const metadata: Metadata = {
  title: "Government directory",
  description:
    "Municipal offices of Pagsanjan, their functions, and Municipal Hall contact details — published only when verifiable from official sources.",
};

const groupOrder: OfficeGroup[] = [
  "executive",
  "legislative",
  "finance",
  "administration",
  "health-social",
  "safety",
];

const groupLabels: Record<OfficeGroup, string> = {
  executive: "Executive",
  legislative: "Legislative",
  finance: "Finance & treasury",
  administration: "Administration",
  "health-social": "Health & social services",
  safety: "Public safety & disaster risk",
};

const municipalHall = {
  address:
    "2F Municipal Hall, J. Rizal St., Brgy. Poblacion I, Pagsanjan, Laguna 4008",
  phone: "(049) 808-4057",
  email: "officeofthemayor.pagsanjan@gmail.com",
};

export default function GovernmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Government"
        title="Government directory"
        description="The standard offices of a Philippine municipality and what they do, plus the verified Municipal Hall details of Pagsanjan. Officials and office contacts appear here only when they can be checked against an official government source."
      />

      <Container className="space-y-14 py-10 sm:py-12">
        {/* Municipal Hall */}
        <section aria-labelledby="municipal-hall-heading">
          <h2
            id="municipal-hall-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            Municipal Hall
          </h2>
          <Card className="mt-4">
            <CardContent className="grid gap-4 pt-5 text-sm sm:grid-cols-2 sm:pt-6">
              <p className="flex items-start gap-2 text-slate-700">
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-primary-700"
                  aria-hidden
                />
                {municipalHall.address}
              </p>
              <p className="flex items-start gap-2 text-slate-700">
                <Phone
                  className="mt-0.5 size-4 shrink-0 text-primary-700"
                  aria-hidden
                />
                <span>
                  {municipalHall.phone}
                  <span className="block text-xs text-muted">
                    Trunkline — ask for the office you need
                  </span>
                </span>
              </p>
              <p className="flex items-start gap-2 text-slate-700">
                <Mail
                  className="mt-0.5 size-4 shrink-0 text-primary-700"
                  aria-hidden
                />
                {municipalHall.email}
              </p>
              <a
                href={site.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-2 font-medium text-primary-700 hover:underline"
              >
                <ExternalLink className="mt-0.5 size-4 shrink-0" aria-hidden />
                pagsanjan.gov.ph — official website
              </a>
            </CardContent>
          </Card>
          <SourceAttribution
            className="mt-3 max-w-3xl"
            sourceId="dti-cmci"
            lastChecked="September 2026"
            note="LGU-supplied profile data published on the DTI CMCI website. Office hours and department extensions have not yet been verified."
          />
        </section>

        {/* Officials */}
        <section aria-labelledby="officials-heading">
          <h2
            id="officials-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            Public officials
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {officials.map((official) => (
              <Card key={official.id}>
                <CardContent className="pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {official.position}
                  </p>
                  <p className="mt-1 font-semibold text-ink">{official.name}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    Source: DTI CMCI LGU profile · Last checked: September 2026
                  </p>
                </CardContent>
              </Card>
            ))}
            <div className="flex flex-col justify-center rounded-lg border border-dashed border-slate-300 bg-surface p-5 text-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Vice Mayor
              </p>
              <p className="mt-1 italic text-muted">Not yet available</p>
            </div>
            <div className="flex flex-col justify-center rounded-lg border border-dashed border-slate-300 bg-surface p-5 text-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Sangguniang Bayan members
              </p>
              <p className="mt-1 italic text-muted">Not yet available</p>
            </div>
          </div>
          <p className="mt-4 flex max-w-3xl items-start gap-2 text-sm leading-relaxed text-muted">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            BetterPagsanjan publishes officials only when their names can be
            checked against an official government source. For the complete and
            current roster, verify with the official channels of the
            Municipality of Pagsanjan.
          </p>
        </section>

        {/* Offices by group */}
        <section aria-labelledby="offices-heading">
          <h2
            id="offices-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            Municipal offices
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
            These offices exist in Philippine municipalities under the Local
            Government Code and related laws. Their descriptions cover standard
            functions — Pagsanjan-specific contact details are added as they are
            verified.
          </p>

          {groupOrder.map((group) => {
            const groupOffices = offices.filter(
              (office) => office.group === group,
            );
            if (groupOffices.length === 0) return null;
            return (
              <div key={group} className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-700">
                  {groupLabels[group]}
                </h3>
                <ul className="mt-3 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {groupOffices.map((office) => (
                    <li key={office.id} className="h-full">
                      <Card className="h-full">
                        <CardContent className="flex h-full flex-col pt-5">
                          <p className="font-semibold leading-snug text-ink">
                            {office.name}
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                            {office.description}
                          </p>
                          {office.statutoryBasis ? (
                            <p className="mt-2 text-xs text-muted">
                              Legal basis: {office.statutoryBasis}
                            </p>
                          ) : null}
                          {office.services && office.services.length > 0 ? (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {office.services.map((slug) => (
                                <Link key={slug} href={`/services/${slug}`}>
                                  <Badge variant="primary">
                                    View service
                                  </Badge>
                                </Link>
                              ))}
                            </div>
                          ) : null}
                          <p className="mt-auto pt-3 text-xs italic text-muted">
                            Contact details not yet verified
                          </p>
                        </CardContent>
                      </Card>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>
      </Container>
    </>
  );
}
