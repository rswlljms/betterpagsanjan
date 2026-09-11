"use client";

import dynamic from "next/dynamic";
import type { CivicLocation } from "@/types/civic";

const CivicMap = dynamic(
  () => import("@/components/civic/civic-map").then((mod) => mod.CivicMap),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        className="h-80 w-full animate-pulse rounded-xl border border-line bg-surface sm:h-96"
      />
    ),
  },
);

export function CivicMapLoader({
  locations,
  showFilters,
}: {
  locations: CivicLocation[];
  showFilters?: boolean;
}) {
  return <CivicMap locations={locations} showFilters={showFilters} />;
}
