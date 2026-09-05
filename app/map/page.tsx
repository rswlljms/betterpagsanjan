import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/civic/page-hero";
import { LocationCard } from "@/components/civic/location-card";
import { SourceAttribution } from "@/components/civic/source-attribution";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import {
  civicLocations,
  getMappableLocations,
  locationCategoryLabels,
} from "@/data/locations/locations";

export const metadata: Metadata = {
  title: "Civic map",
  description:
    "Verified civic locations in Pagsanjan — government offices, emergency facilities, health centers, barangay halls, and evacuation centers.",
};

const plannedCategories = Object.values(locationCategoryLabels);

export default function MapPage() {
  const mappable = getMappableLocations();

  return (
    <>
      <PageHero
        eyebrow="Civic map"
        title="Civic map of Pagsanjan"
        description="Verified public locations in Pagsanjan — every entry carries its source. The interactive map launches once facility coordinates can be confirmed from authoritative sources; until then, this verified directory is the map's foundation."
      />
      <Container className="py-10 sm:py-12">
        {civicLocations.length > 0 ? (
          <ul className="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {civicLocations.map((location) => (
              <li key={location.id} className="h-full">
                <LocationCard location={location} />
              </li>
            ))}
          </ul>
        ) : null}

        {mappable.length === 0 ? (
          <p className="mt-6 max-w-2xl rounded-lg border border-line bg-surface p-4 text-sm leading-relaxed text-slate-600">
            No map pins yet — coordinates have not been verified for any
            location, so no decorative map is shown. Locations above are listed
            with their verified addresses. When coordinates are confirmed, pins
            will appear here on an OpenStreetMap-based map, each carrying its
            own source.
          </p>
        ) : null}

        <div className="mt-8 max-w-2xl">
          <p className="text-sm font-semibold text-ink">Categories</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {plannedCategories.map((category) => (
              <Badge key={category} variant="outline">
                {category}
              </Badge>
            ))}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Meanwhile: emergency contacts and preparedness guidance are on the{" "}
            <Link
              href="/emergency"
              className="font-medium text-primary-700 hover:underline"
            >
              Emergency page
            </Link>
            , and the Municipal Hall address is on the{" "}
            <Link
              href="/government"
              className="font-medium text-primary-700 hover:underline"
            >
              Government page
            </Link>
            .
          </p>
        </div>

        <SourceAttribution
          className="mt-8 max-w-3xl"
          sourceId="dti-cmci"
          lastChecked="September 2026"
          note="Municipal Hall address from the DTI CMCI LGU profile (LGU-supplied data). Additional locations are added only when verified."
        />
      </Container>
    </>
  );
}
