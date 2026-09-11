"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Droplets,
  Eye,
  Sun,
  Thermometer,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Live weather for Pagsanjan via Open-Meteo (no key, CORS-open).
 * Never invents conditions: loading, error, and timestamped live states
 * only (AGENTS.md §14, §42). Attribution is always shown.
 */
const LATITUDE = 14.2725;
const LONGITUDE = 121.4558;
const API_URL =
  `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}` +
  `&longitude=${LONGITUDE}` +
  "&current=temperature_2m,relative_humidity_2m,apparent_temperature," +
  "weather_code,wind_speed_10m,wind_direction_10m,visibility" +
  "&wind_speed_unit=kmh&timezone=Asia%2FManila";

interface CurrentWeather {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  visibility: number;
}

type Status =
  | { state: "loading" }
  | { state: "error" }
  | { state: "ready"; current: CurrentWeather };

function describe(code: number): { label: string; Icon: LucideIcon } {
  if (code === 0) return { label: "Clear sky", Icon: Sun };
  if (code === 1) return { label: "Mainly clear", Icon: Sun };
  if (code === 2) return { label: "Partly cloudy", Icon: CloudSun };
  if (code === 3) return { label: "Overcast", Icon: Cloud };
  if (code === 45 || code === 48) return { label: "Fog", Icon: CloudFog };
  if (code >= 51 && code <= 57) return { label: "Drizzle", Icon: CloudDrizzle };
  if (code >= 61 && code <= 67) return { label: "Rain", Icon: CloudRain };
  if (code >= 71 && code <= 77) return { label: "Snow", Icon: CloudSnow };
  if (code >= 80 && code <= 82)
    return { label: "Rain showers", Icon: CloudRain };
  if (code === 95 || code === 96 || code === 99)
    return { label: "Thunderstorm", Icon: CloudLightning };
  return { label: "Cloudy", Icon: Cloud };
}

function compass(degrees: number): string {
  const points = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return points[Math.round(degrees / 22.5) % 16];
}

function observedAt(iso: string): string {
  try {
    return (
      new Intl.DateTimeFormat("en-PH", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "Asia/Manila",
      }).format(new Date(iso)) + " PHT"
    );
  } catch {
    return iso;
  }
}

export function WeatherCard() {
  const [status, setStatus] = useState<Status>({ state: "loading" });

  const load = useCallback(async (signal?: AbortSignal) => {
    setStatus({ state: "loading" });
    try {
      const response = await fetch(API_URL, { signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = (await response.json()) as { current?: CurrentWeather };
      if (!data.current || typeof data.current.temperature_2m !== "number") {
        throw new Error("Unexpected response");
      }
      setStatus({ state: "ready", current: data.current });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatus({ state: "error" });
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load]);

  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col pt-6">
        {status.state === "loading" ? (
          <div aria-label="Loading weather" className="animate-pulse">
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-xl bg-surface" />
              <div className="flex-1">
                <div className="h-9 w-28 rounded bg-surface" />
                <div className="mt-2 h-4 w-40 rounded bg-surface" />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {["a", "b", "c", "d"].map((key) => (
                <div key={key} className="h-16 rounded-lg bg-surface" />
              ))}
            </div>
          </div>
        ) : status.state === "error" ? (
          <div className="flex h-full flex-col items-start justify-center gap-3 py-6">
            <p className="font-semibold text-ink">Weather unavailable</p>
            <p className="text-sm leading-relaxed text-muted">
              Live conditions could not be loaded. BetterPagsanjan does not
              guess at weather — please try again.
            </p>
            <button
              type="button"
              onClick={() => void load()}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink hover:border-bp-graphite"
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4">
              <span
                aria-hidden
                className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-ink text-white"
              >
                {(() => {
                  const { Icon } = describe(status.current.weather_code);
                  return <Icon className="size-7" />;
                })()}
              </span>
              <div>
                <p className="text-4xl font-semibold tracking-tight text-ink">
                  {Math.round(status.current.temperature_2m)}°C
                </p>
                <p className="mt-0.5 text-sm font-medium text-ink">
                  {describe(status.current.weather_code).label}
                </p>
                <p className="text-sm text-muted">
                  Feels like {Math.round(status.current.apparent_temperature)}
                  °C · Pagsanjan
                </p>
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-surface p-3">
                <dt className="flex items-center gap-1.5 text-xs text-muted">
                  <Droplets className="size-3.5" aria-hidden /> Humidity
                </dt>
                <dd className="mt-1 text-sm font-semibold text-ink">
                  {status.current.relative_humidity_2m}%
                </dd>
              </div>
              <div className="rounded-lg bg-surface p-3">
                <dt className="flex items-center gap-1.5 text-xs text-muted">
                  <Wind className="size-3.5" aria-hidden /> Wind{" "}
                  {compass(status.current.wind_direction_10m)}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-ink">
                  {Math.round(status.current.wind_speed_10m)} km/h
                </dd>
              </div>
              <div className="rounded-lg bg-surface p-3">
                <dt className="flex items-center gap-1.5 text-xs text-muted">
                  <Thermometer className="size-3.5" aria-hidden /> Feels like
                </dt>
                <dd className="mt-1 text-sm font-semibold text-ink">
                  {Math.round(status.current.apparent_temperature)}°C
                </dd>
              </div>
              <div className="rounded-lg bg-surface p-3">
                <dt className="flex items-center gap-1.5 text-xs text-muted">
                  <Eye className="size-3.5" aria-hidden /> Visibility
                </dt>
                <dd className="mt-1 text-sm font-semibold text-ink">
                  {(status.current.visibility / 1000).toFixed(0)} km
                </dd>
              </div>
            </dl>

            <p className="mt-auto pt-4 text-xs text-muted">
              Live · as of {observedAt(status.current.time)} · Weather via{" "}
              <a
                href="https://open-meteo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-link hover:underline"
              >
                Open-Meteo
              </a>
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
