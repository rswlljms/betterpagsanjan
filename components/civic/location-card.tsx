import { ExternalLink, MapPin } from "lucide-react";
import { VerificationBadge } from "@/components/civic/verification-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { locationCategoryLabels } from "@/data/locations/locations";
import type { CivicLocation } from "@/types/civic";

export function LocationCard({ location }: { location: CivicLocation }) {
  const hasCoords =
    typeof location.latitude === "number" &&
    typeof location.longitude === "number";
  const osmUrl =
    location.osmUrl ??
    (hasCoords
      ? `https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}#map=16/${location.latitude}/${location.longitude}`
      : undefined);

  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col pt-5">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="primary">
            {locationCategoryLabels[location.category]}
          </Badge>
          <VerificationBadge verification={location.verification} />
        </div>
        <p className="mt-3 font-semibold leading-snug text-ink">
          {location.name}
        </p>
        {location.description ? (
          <p className="mt-1.5 text-sm leading-relaxed text-bp-graphite">
            {location.description}
          </p>
        ) : null}
        {location.address ? (
          <p className="mt-2 flex items-start gap-1.5 text-sm text-bp-graphite">
            <MapPin
              className="mt-0.5 size-4 shrink-0 text-bp-graphite"
              aria-hidden
            />
            {location.address}
          </p>
        ) : null}
        <div className="mt-auto pt-3 text-sm">
          {osmUrl ? (
            <a
              href={osmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-link hover:underline"
            >
              View on OpenStreetMap
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
          ) : (
            <p className="text-xs italic text-muted">
              Map pin not yet available — coordinates have not been verified.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
