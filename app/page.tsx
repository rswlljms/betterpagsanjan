import Link from "next/link";
import {
  BarChart3,
  FileSearch,
  HardHat,
  Landmark,
  Map,
  Mountain,
  ScrollText,
  Users,
} from "lucide-react";
import { CivicMapLoader } from "@/components/civic/civic-map-loader";
import { LinkCard } from "@/components/civic/link-card";
import { ServiceCard } from "@/components/civic/service-card";
import { StatCard } from "@/components/civic/stat-card";
import { WeatherCard } from "@/components/civic/weather-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { announcements } from "@/data/announcements";
import { getMappableLocations } from "@/data/locations/locations";
import { getFeaturedServices } from "@/data/services";
import { site } from "@/data/site";
import { statistics } from "@/data/statistics";

const popularSearches = [
  "Business permit",
  "Barangay clearance",
  "Birth certificate",
  "Real property tax",
];

export default function HomePage() {
  const featured = getFeaturedServices();
  // Homepage embed mirrors the reference layout: barangay areas with only
  // the Municipal Hall pinned.
  const municipalHall = getMappableLocations().find(
    (location) => location.id === "municipal-hall",
  );
  const homeLocations = municipalHall ? [municipalHall] : [];
  const glanceStats = statistics.filter((item) =>
    ["population-2024", "barangays"].includes(item.id),
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    alternateName: "BetterPagsanjan",
    url: site.url,
    description: site.description,
    inLanguage: "en-PH",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero — BP rhythm: quiet paper canvas, white civic surface */}
      <section className="bg-surface">
        <Container className="py-10 sm:py-16">
          <div className="rounded-xl bg-white px-6 py-12 text-center shadow-bp-sm-4 sm:px-12 sm:py-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Independent civic technology project · Pagsanjan, Laguna
            </p>
            <h1 className="font-display mx-auto mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {site.tagline}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-bp-graphite">
              Access government services, information, and resources for the
              people of Pagsanjan, Laguna.
            </p>
            <form
              action="/search"
              method="get"
              role="search"
              className="mx-auto mt-8 flex max-w-xl flex-col gap-2 sm:flex-row"
            >
              <label htmlFor="home-search" className="sr-only">
                Search BetterPagsanjan
              </label>
              <input
                id="home-search"
                name="q"
                type="search"
                placeholder="Try “business permit” or “birth certificate”…"
                className="min-h-12 flex-1 rounded-lg border border-line bg-white px-4 text-sm text-ink placeholder:text-bp-stone"
              />
              <Button type="submit" size="lg">
                Search
              </Button>
            </form>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="text-muted">Popular:</span>
              {popularSearches.map((term) => (
                <Link
                  key={term}
                  href={`/services?q=${encodeURIComponent(term)}`}
                  className="rounded-full border border-line bg-white px-3 py-1.5 text-bp-graphite hover:border-bp-graphite hover:text-bp-ink"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Today in Pagsanjan — live weather + civic map */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Today in Pagsanjan"
            title="Weather & map of Pagsanjan"
            description="Live conditions and barangay map — Pagsanjan, Laguna."
          />
          <div className="mt-8 grid gap-3 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <WeatherCard />
            </div>
            <div className="lg:col-span-3">
              <CivicMapLoader locations={homeLocations} showFilters={false} />
              <p className="mt-3 text-xs leading-relaxed text-muted">
                Municipal Hall pin: approximate location — address from the DTI
                CMCI LGU profile, coordinates from a contributor map pin.
                Confirm on site.{" "}
                <Link
                  href="/map"
                  className="text-sm font-medium text-link hover:underline"
                >
                  Open the full civic map
                  <span aria-hidden> →</span>
                </Link>
              </p>
            </div>
          </div>
          {announcements.length === 0 ? (
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
              No announcements published yet — BetterPagsanjan does not publish
              unverified announcements. For current advisories, check the{" "}
              <Link
                href="/announcements"
                className="font-medium text-link hover:underline"
              >
                announcements page
              </Link>{" "}
              or the{" "}
              <a
                href={site.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-link hover:underline"
              >
                official channels of the Municipality of Pagsanjan
              </a>
              . For emergencies, call{" "}
              <a href="tel:911" className="font-bold text-ink">
                911
              </a>{" "}
              or visit the{" "}
              <Link
                href="/emergency"
                className="font-medium text-link hover:underline"
              >
                emergency center
              </Link>
              .
            </p>
          ) : (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {announcements.slice(0, 2).map((announcement) => (
                <li key={announcement.id} className="text-sm">
                  <p className="font-medium text-ink">{announcement.title}</p>
                  <p className="mt-0.5 text-muted">{announcement.summary}</p>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      {/* Popular services */}
      <section className="border-y border-line bg-surface py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Service finder"
            title="Popular services"
            description="Plain-language guides for the most common Pagsanjan services. Details are verified step by step — anything unverified is clearly labeled."
            action={{ label: "Browse all services", href: "/services" }}
          />
          <ul className="mt-8 grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((service) => (
              <li key={service.id} className="h-full">
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Government & transparency */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Government"
            title="Government & transparency"
            description="Who does what in the municipal government, and where public records live."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <LinkCard
              href="/government"
              title="Government directory"
              description="Municipal offices, their functions, and Municipal Hall contact details."
              icon={Landmark}
            />
            <LinkCard
              href="/transparency"
              title="Transparency"
              description="Budget, procurement, projects, and public documents — as they become verifiable."
              icon={FileSearch}
            />
            <LinkCard
              href="/ordinances"
              title="Ordinances & resolutions"
              description="A searchable public index of legislative documents — records appear only from verified official sources."
              icon={ScrollText}
            />
            <LinkCard
              href="/projects"
              title="Public projects"
              description="Project directory with status — only from verifiable public records."
              icon={HardHat}
            />
          </div>
        </Container>
      </section>

      {/* Explore Pagsanjan */}
      <section className="border-y border-line bg-surface py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Explore"
            title="Pagsanjan at a glance"
            description="Verified figures and local identity — every number carries its source and year."
          />
          {/* Row 1 fills all four columns: the two headline stats, then
              All statistics with Explore Pagsanjan lined up beside it. */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {glanceStats.map((item) => (
              <StatCard key={item.id} item={item} />
            ))}
            <LinkCard
              href="/statistics"
              title="All statistics"
              description="Population, geography, and classification — with sources and caveats."
              icon={BarChart3}
            />
            <LinkCard
              href="/tourism"
              title="Explore Pagsanjan"
              description="The falls, the gorge, the rivers, and 350+ years of town history."
              icon={Mountain}
            />
          </div>
          {/* Row 2 is a symmetric pair that fills the full row, so no
              trailing empty column is left on desktop. */}
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <LinkCard
              href="/barangays"
              title="Barangays"
              description="Directory of the 16 barangays of Pagsanjan."
              icon={Users}
            />
            <LinkCard
              href="/map"
              title="Civic map"
              description="Verified public locations in Pagsanjan, with sources — pins appear as coordinates are confirmed."
              icon={Map}
            />
          </div>
        </Container>
      </section>

      {/* Independent project notice — informational banner treatment */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="max-w-3xl rounded-xl bg-bp-info-banner-bg p-6 sm:p-8">
            <h2 className="font-display text-lg font-semibold text-ink">
              An independent civic project
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-bp-graphite">
              BetterPagsanjan is not an official website of the Municipality of
              Pagsanjan. It is an independent project that organizes publicly
              available information, clearly labels what has and has not been
              verified, and directs official transactions to the appropriate
              government office.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <ButtonLink href="/about" variant="secondary" size="sm">
                About the project
              </ButtonLink>
              <ButtonLink href="/sources" variant="secondary" size="sm">
                View sources
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
