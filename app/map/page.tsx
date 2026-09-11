import type { Metadata } from "next";
import Link from "next/link";
import { CivicMapLoader } from "@/components/civic/civic-map-loader";
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
        description="All 16 barangays plus verified and pending facility locations in Pagsanjan — every entry carries its source. Hover a barangay for its name, or select it to open its directory page. Blue pins are verified; amber pins are candidate leads not yet confirmed."
      />
      <Container className="py-10 sm:py-12">
        {mappable.length > 0 ? (
          <>
            <CivicMapLoader locations={mappable} />
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Map tiles and barangay boundaries © OpenStreetMap contributors
              (boundaries under ODbL — community-mapped and approximate, not a
              legal survey). Pins show approximate locations — amber pins are
              unverified leads. The directory below is the text alternative for
              screen readers and offline use.
            </p>
          </>
        ) : (
          <p className="mt-6 max-w-2xl rounded-lg border border-line bg-surface p-4 text-sm leading-relaxed text-slate-600">
            No map pins yet — coordinates have not been verified for any
            location, so no decorative map is shown. Locations below are listed
            with their verified addresses. When coordinates are confirmed, pins
            will appear here on an OpenStreetMap-based map, each carrying its
            own source.
          </p>
        )}

        <h2 className="mt-10 text-lg font-semibold text-ink">All locations</h2>
        {civicLocations.length > 0 ? (
          <ul className="mt-4 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
          note="Municipal Hall address from the DTI CMCI LGU profile (LGU-supplied data). Amber pins are candidate leads from map pins, kept pending until confirmed against an authoritative source."
        />
        <SourceAttribution
          className="mt-3 max-w-3xl"
          sourceId="openstreetmap"
          lastChecked="September 2026"
          note="The 16 barangay polygons are OpenStreetMap admin_level 10 boundary relations, fetched via the Overpass API and vendored as static data. Relations named Uno/Dos are shown as Barangay I/II (Poblacion) by name inference — confirm with the LGU before formal citation."
        />
      </Container>
    </>
  );
}
