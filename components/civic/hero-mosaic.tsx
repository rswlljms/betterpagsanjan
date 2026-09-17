import type { CSSProperties } from "react";
import Image from "next/image";
import { heroPhotos } from "@/data/tourism/hero-photos";
import { cn } from "@/lib/utils";

/**
 * HeroMosaic — full-bleed photo marquee behind the homepage hero.
 *
 * Three horizontal rows of Pagsanjan landmark photos (falls, arch, church,
 * Municipal Hall) scroll continuously at different speeds and alternating
 * directions, echoing the reference photo-wall hero (BetterLibmanan
 * HeroSection, MIT-licensed peer project — behavior adapted, code written
 * fresh). Each row track holds 4 identical strips and loops by exactly one
 * strip width, so the scroll is seamless. Pure CSS motion (see
 * `bp-marquee-track` in `app/globals.css`); the whole mosaic is decorative —
 * hidden from assistive technology, with photo credits rendered as visible
 * text next to it instead. Images are small (480px, lazy-loaded) to protect
 * mobile bandwidth.
 */
const ROWS: string[][] = [
  ["pagsanjan-falls-1", "pagsanjan-stone-arch", "pagsanjan-church-facade"],
  ["pagsanjan-falls-2", "pagsanjan-church", "municipal-hall"],
  ["arch-of-pagsanjan", "pagsanjan-church-belfry", "church-entrance-porch"],
];

const ROW_DURATIONS = [90, 70, 55];
const ROW_REVERSE = [true, false, true];
/** Copies per track; the loop translates by exactly one copy (25%). */
const STRIP_COPIES = 4;

const byId = new Map(heroPhotos.map((photo) => [photo.id, photo]));

function MarqueeRow({
  ids,
  duration,
  reverse,
}: {
  ids: string[];
  duration: number;
  reverse?: boolean;
}) {
  const photos = ids
    .map((id) => byId.get(id))
    .filter((photo) => photo !== undefined);
  if (photos.length === 0) return null;

  return (
    <div className="min-h-0 w-full flex-1 overflow-hidden">
      <div
        className={cn(
          "bp-marquee-track flex h-full w-max",
          reverse && "bp-marquee-track--reverse",
        )}
        style={{ "--bp-marquee-duration": `${duration}s` } as CSSProperties}
      >
        {Array.from({ length: STRIP_COPIES }, (_, copy) => (
          <div key={copy} className="flex h-full shrink-0">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative h-full w-56 shrink-0 overflow-hidden sm:w-64 lg:w-72"
              >
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 288px"
                  loading="lazy"
                  decoding="async"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroMosaic() {
  return (
    <div aria-hidden className="absolute inset-0 bg-bp-ink">
      <div className="flex h-full flex-col">
        {ROWS.map((ids, index) => (
          <MarqueeRow
            key={index}
            ids={ids}
            duration={ROW_DURATIONS[index] ?? 70}
            reverse={ROW_REVERSE[index] ?? false}
          />
        ))}
      </div>
      {/* Dark veil stack keeps the white hero card and credit line readable. */}
      <div className="absolute inset-0 bg-bp-ink/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_50%,rgba(0,0,0,0.7)_100%)]" />
    </div>
  );
}
