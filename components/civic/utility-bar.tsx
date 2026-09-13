"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Clock3, Thermometer } from "lucide-react";
import { liveFeeds } from "@/data/sources";

const PAGSANJAN_LATITUDE = 14.2725;
const PAGSANJAN_LONGITUDE = 121.4558;
const WEATHER_URL =
  `https://api.open-meteo.com/v1/forecast?latitude=${PAGSANJAN_LATITUDE}` +
  `&longitude=${PAGSANJAN_LONGITUDE}` +
  "&current=temperature_2m&wind_speed_unit=kmh&timezone=Asia%2FManila";

/**
 * Display order for the rotating rate slot. Matches the reference set
 * (USD, GBP, SAR, AED, JPY, CAD, AUD) plus EUR, SGD, KRW. Values are shown
 * foreign→PHP ("1 JPY = ₱ 0.41") like the reference, computed from one
 * USD-base response as PHP-per-unit = USD→PHP ÷ USD→CODE. Rows render only
 * when the API returns them, so a missing quote simply disappears instead
 * of showing a stale or invented number.
 */
const FX_ORDER = [
  "USD",
  "EUR",
  "JPY",
  "GBP",
  "AED",
  "SAR",
  "SGD",
  "CAD",
  "AUD",
  "KRW",
] as const;

type FxCode = (typeof FX_ORDER)[number];

interface FxRow {
  date?: string;
  base?: string;
  quote?: string;
  rate?: number;
}

interface WeatherResponse {
  current?: { temperature_2m?: number };
}

function formatManila(now: Date): { date: string; time: string } {
  // Fixed "PHT" suffix: Intl with timeZoneName:"short" renders "GMT+8" for
  // Asia/Manila in some browsers/ICU versions, and some already include a
  // zone suffix — so format bare and append PHT, normalizing any GMT+8.
  const time = (
    new Intl.DateTimeFormat("en-PH", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Asia/Manila",
    }).format(now) + " PHT"
  ).replace("GMT+8", "PHT");
  return {
    date: new Intl.DateTimeFormat("en-PH", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "Asia/Manila",
    }).format(now),
    time,
  };
}

/**
 * Global utility bar (pattern adapted from the BetterSolano/BetterLibmanan
 * reference info bar — own brand, own code, Pagsanjan data; reference used
 * for behavior only per AGENTS.md §62). Sits below the main nav, above page
 * content: emergency ticker → header → this bar.
 *
 * Like the reference: ONE rate slot that rotates through the currency list
 * every 4 seconds with a short fade — never a scrolling marquee. Then
 * static Pagsanjan weather and Philippine date/time.
 *
 * Every slot fails independently to the reference-style "--" placeholder;
 * nothing is ever invented (AGENTS.md §14, §42). Hidden when offline so a
 * stale cached copy can never present old rates, temperatures, or times as
 * current.
 */
export function UtilityBar() {
  const [fx, setFx] = useState<{
    rates: { code: FxCode; perPhp: number }[];
    date: string;
  } | null>(null);
  const [rateIndex, setRateIndex] = useState(0);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [now, setNow] = useState<Date | null>(null);
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  useEffect(() => {
    if (!online) return;
    const controller = new AbortController();
    fetch(liveFeeds.exchangeRate.endpoint, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json() as Promise<FxRow[]>;
      })
      .then((data) => {
        if (!Array.isArray(data)) return;
        const usdPer: Record<string, { rate: number; date: string }> = {};
        for (const row of data) {
          if (
            row &&
            typeof row.quote === "string" &&
            typeof row.rate === "number" &&
            row.rate > 0 &&
            typeof row.date === "string"
          ) {
            usdPer[row.quote] = { rate: row.rate, date: row.date };
          }
        }
        // Reference shows foreign→PHP ("1 JPY = ₱ 0.41"): PHP per unit of
        // CODE = (USD→PHP) ÷ (USD→CODE). USD itself is just USD→PHP.
        const usdPhp = usdPer.PHP;
        if (!usdPhp) return;
        const rates: { code: FxCode; perPhp: number }[] = [];
        for (const code of FX_ORDER) {
          if (code === "USD") {
            rates.push({ code, perPhp: usdPhp.rate });
            continue;
          }
          const entry = usdPer[code];
          if (entry) rates.push({ code, perPhp: usdPhp.rate / entry.rate });
        }
        if (rates.length === 0) return;
        setRateIndex(0);
        setFx({ rates, date: usdPhp.date });
      })
      .catch(() => {
        // Slot stays on its neutral placeholder — never invented.
      });
    return () => controller.abort();
  }, [online]);

  useEffect(() => {
    if (!online) return;
    const controller = new AbortController();
    fetch(WEATHER_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json() as Promise<WeatherResponse>;
      })
      .then((data) => {
        if (typeof data.current?.temperature_2m === "number") {
          setTemperature(data.current.temperature_2m);
        }
      })
      .catch(() => {
        // Slot stays on its neutral placeholder — never invented.
      });
    return () => controller.abort();
  }, [online]);

  useEffect(() => {
    // Device clock in Asia/Manila — no API needed. The reference ticks every
    // second, so this bar does too.
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1_000);
    return () => window.clearInterval(id);
  }, []);

  // Reference behavior: rotate to the next currency every 4 seconds with a
  // short fade — one slot, no marquee, no overlap possible. Respects reduced
  // motion by staying on the first rate.
  useEffect(() => {
    if (!fx || fx.rates.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setRateIndex((index) => (index + 1) % (fx?.rates.length ?? 1));
    }, 4_000);
    return () => window.clearInterval(id);
  }, [fx]);

  if (!online) return null;

  const manila = now ? formatManila(now) : null;
  const current =
    fx && fx.rates.length > 0 ? fx.rates[rateIndex % fx.rates.length] : null;

  return (
    <div className="border-b border-line bg-ink text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-1.5 text-xs sm:justify-end sm:px-6 sm:text-[13px]">
        <span className="flex items-center gap-1.5">
          <span className="sr-only">
            Foreign exchange reference rate against the Philippine peso
          </span>
          <span aria-live="off">
            {current ? (
              <a
                key={current.code}
                href={liveFeeds.exchangeRate.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bp-rate-fade underline-offset-2 hover:underline focus-visible:outline-white"
                title={`Indicative reference rate for ${fx?.date ?? ""} via ${liveFeeds.exchangeRate.provider} — not a Bangko Sentral ng Pilipinas rate`}
              >
                1 {current.code} = ₱ {current.perPhp.toFixed(2)}
              </a>
            ) : (
              <span className="opacity-70">1 USD = ₱ --</span>
            )}
          </span>
        </span>
        <span aria-hidden className="hidden h-3 w-px bg-white/25 sm:block" />
        <span className="flex items-center gap-1.5">
          <Thermometer className="size-3.5 shrink-0 opacity-70" aria-hidden />
          <span className="sr-only">Current temperature in Pagsanjan</span>
          <span aria-live="off">
            {temperature !== null ? (
              <span
                title={`Live Pagsanjan temperature via ${liveFeeds.weather.provider}`}
              >
                Pagsanjan {Math.round(temperature)}°C
              </span>
            ) : (
              <span className="opacity-70">Pagsanjan --°C</span>
            )}
          </span>
        </span>
        <span aria-hidden className="hidden h-3 w-px bg-white/25 sm:block" />
        <span className="flex items-center gap-1.5">
          <CalendarDays className="size-3.5 shrink-0 opacity-70" aria-hidden />
          <span className="sr-only">Current Philippine date and time</span>
          <span aria-live="off" suppressHydrationWarning>
            {manila ? (
              <span className="flex items-center gap-1.5">
                {manila.date}
                <span aria-hidden className="opacity-70">
                  ·
                </span>
                <Clock3 className="size-3.5 shrink-0 opacity-70" aria-hidden />
                {manila.time}
              </span>
            ) : (
              <span className="opacity-70">--- --, ---- · --:-- --</span>
            )}
          </span>
        </span>
      </div>
    </div>
  );
}
