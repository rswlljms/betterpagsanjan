"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";
import { barangays } from "@/data/barangays/barangays";
import { locationCategoryLabels } from "@/data/locations/locations";
import type { CivicLocation, CivicLocationCategory } from "@/types/civic";

interface CivicMapProps {
  locations: CivicLocation[];
  /** Hide the category filter chips (e.g. compact homepage embed). */
  showFilters?: boolean;
}

interface BarangayBoundaryProperties {
  barangaySlug: string | null;
  osmName: string;
  osmRelationId: number;
}

const BOUNDARY_URL = "/data/pagsanjan-barangays.geojson";

const BOUNDARY_STYLE: L.PathOptions = {
  color: "#1d4ed8",
  weight: 2,
  opacity: 0.9,
  fillColor: "#93c5fd",
  fillOpacity: 0.25,
};

const BOUNDARY_HOVER_STYLE: L.PathOptions = {
  weight: 3,
  fillOpacity: 0.45,
};

function barangayDisplayName(slug: string | null, osmName: string): string {
  const match = slug
    ? barangays.find((barangay) => barangay.slug === slug)
    : undefined;
  return match?.name ?? osmName;
}

function pinIcon(status: CivicLocation["verification"]["status"]) {
  return L.divIcon({
    className: "bp-pin-wrap",
    html: `<span class="bp-pin bp-pin--${status}" aria-hidden="true"></span>`,
    iconSize: [26, 36],
    iconAnchor: [13, 34],
    popupAnchor: [0, -32],
  });
}

function popupHtml(location: CivicLocation): string {
  const category = locationCategoryLabels[location.category];
  const verified =
    location.verification.status === "verified"
      ? `Verified${location.verification.verifiedAt ? ` · ${location.verification.verifiedAt}` : ""}`
      : "Verification pending";
  const coords =
    typeof location.latitude === "number" &&
    typeof location.longitude === "number"
      ? `<br />${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`
      : "";
  const address = location.address ? `<br />${location.address}` : "";
  return `<strong>${location.name}</strong><br />${category} · ${verified}${address}${coords}`;
}

export function CivicMap({ locations, showFilters = true }: CivicMapProps) {
  const mappable = useMemo(
    () =>
      locations.filter(
        (
          location,
        ): location is CivicLocation & {
          latitude: number;
          longitude: number;
        } =>
          typeof location.latitude === "number" &&
          typeof location.longitude === "number",
      ),
    [locations],
  );

  const categories = useMemo(() => {
    const seen = new Map<CivicLocationCategory, string>();
    for (const location of mappable) {
      if (!seen.has(location.category)) {
        seen.set(location.category, locationCategoryLabels[location.category]);
      }
    }
    return [...seen.entries()];
  }, [mappable]);

  const [activeCategory, setActiveCategory] = useState<
    "all" | CivicLocationCategory
  >("all");
  const [selectedId, setSelectedId] = useState<string>(mappable[0]?.id ?? "");

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? mappable
        : mappable.filter((location) => location.category === activeCategory),
    [mappable, activeCategory],
  );

  const selected =
    filtered.find((location) => location.id === selectedId) ?? filtered[0];

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const router = useRouter();

  // Init once. The page lazy-loads this component with ssr:false, so window exists.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const first = mappable[0];
    const map = L.map(containerRef.current, {
      center: first ? [first.latitude, first.longitude] : [14.2736, 121.451],
      zoom: 14,
      scrollWheelZoom: false,
    });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors · Barangay boundaries ODbL',
    }).addTo(map);
    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    // Barangay boundaries: vendored OSM polygons (public/data). If the
    // fetch fails the map still works with facility pins alone.
    let cancelled = false;
    fetch(BOUNDARY_URL)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json() as Promise<GeoJSON.FeatureCollection>;
      })
      .then((collection) => {
        if (cancelled || !mapRef.current) return;
        const boundaries = L.geoJSON(collection, {
          style: BOUNDARY_STYLE,
          onEachFeature: (feature, layer) => {
            const props = feature.properties as BarangayBoundaryProperties;
            const name = barangayDisplayName(props.barangaySlug, props.osmName);
            layer.bindTooltip(name, {
              sticky: true,
              direction: "top",
              offset: [0, -6],
              className: "bp-brgy-tip",
            });
            layer.on("mouseover", () =>
              (layer as L.Path).setStyle(BOUNDARY_HOVER_STYLE),
            );
            layer.on("mouseout", () =>
              (layer as L.Path).setStyle(BOUNDARY_STYLE),
            );
            if (props.barangaySlug) {
              layer.on("click", () =>
                router.push(`/barangays/${props.barangaySlug}`),
              );
            }
          },
        });
        boundaries.addTo(mapRef.current);
        boundaries.bringToBack();
        mapRef.current.fitBounds(boundaries.getBounds().pad(0.05));
      })
      .catch(() => {
        // Pins-only fallback — no fake geometry is ever substituted.
      });

    // Re-enable scroll zoom once the map has keyboard/mouse focus so the
    // surrounding page keeps scrolling normally on touch and wheel.
    map.on("focus", () => map.scrollWheelZoom.enable());
    map.on("blur", () => map.scrollWheelZoom.disable());
    map.on("click", () => map.scrollWheelZoom.enable());

    return () => {
      cancelled = true;
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Rebuild markers when the filter changes.
  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;
    layer.clearLayers();

    const markers: L.Marker[] = [];
    for (const location of filtered) {
      const marker = L.marker([location.latitude, location.longitude], {
        icon: pinIcon(location.verification.status),
        title: location.name,
        keyboard: true,
      });
      marker.bindPopup(popupHtml(location));
      marker.on("click", () => setSelectedId(location.id));
      layer.addLayer(marker);
      markers.push(marker);
    }

    if (filtered.length > 1) {
      const bounds = L.latLngBounds(
        filtered.map(
          (location) =>
            [location.latitude, location.longitude] as [number, number],
        ),
      );
      map.fitBounds(bounds.pad(0.25));
    } else if (filtered.length === 1) {
      // Single-pin embeds (e.g. homepage Municipal Hall spotlight) open
      // the label immediately, like the reference layout.
      map.setView([filtered[0].latitude, filtered[0].longitude], 15);
      markers[0].openPopup();
    }
  }, [filtered]);

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white shadow-bp-sm-4">
      {showFilters && categories.length > 1 ? (
        <div
          className="flex flex-wrap gap-1.5 border-b border-line bg-white px-4 py-3"
          role="group"
          aria-label="Filter map pins by category"
        >
          <button
            type="button"
            aria-pressed={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
              activeCategory === "all"
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-bp-graphite hover:border-bp-graphite"
            }`}
          >
            All ({mappable.length})
          </button>
          {categories.map(([value, label]) => {
            const count = mappable.filter((l) => l.category === value).length;
            const active = activeCategory === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveCategory(active ? "all" : value)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-white text-bp-graphite hover:border-bp-graphite"
                }`}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>
      ) : null}

      <div
        ref={containerRef}
        role="region"
        aria-label={`Map of Pagsanjan: 16 barangay areas plus ${filtered.length} facility pin${filtered.length === 1 ? "" : "s"}. Hover a barangay for its name, or use plus and minus buttons to zoom; tab reaches each pin. The directory below lists every pin as text.`}
        className="civic-map z-0 h-80 w-full sm:h-96"
      />

      <div className="flex items-start gap-2 border-t border-line bg-white px-4 py-3">
        <MapPin
          className="mt-0.5 size-4 shrink-0 text-bp-graphite"
          aria-hidden
        />
        {selected ? (
          <p className="text-sm leading-snug text-bp-graphite">
            <span className="font-semibold text-ink">{selected.name}</span>
            <span className="text-muted">
              {" "}
              · {locationCategoryLabels[selected.category]}
              {selected.verification.status === "verified"
                ? " · Verified"
                : " · Verification pending"}
              {selected.address ? ` · ${selected.address}` : ""}
            </span>
          </p>
        ) : (
          <p className="text-sm text-muted">No pins in this category yet.</p>
        )}
      </div>
    </div>
  );
}
