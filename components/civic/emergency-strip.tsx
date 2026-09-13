import Link from "next/link";
import { Siren } from "lucide-react";
import { emergencyContacts, nationalHotline } from "@/data/emergency/contacts";

/**
 * Global tap-to-call emergency ticker above the site header.
 *
 * Numbers come from the verified emergency dataset — never hardcoded here
 * and never copied from another municipality's site. The content scrolls
 * as a seamless horizontal loop (pauses on hover/focus, static wrapped
 * row when reduced motion is preferred) and scrolls away with the page
 * (the header stays sticky) so it never permanently consumes screen space.
 */
function telHref(display: string): string {
  const digits = display.replace(/\D/g, "");
  if (digits === "911") return "tel:911";
  const normalized = digits.startsWith("0") ? digits.slice(1) : digits;
  return `tel:+63${normalized}`;
}

/**
 * One copy of the ticker sequence. The track renders several identical
 * copies and loops by translating -50%; duplicate copies are hidden from
 * assistive technology and removed from the tab order (they stay
 * tappable for pointer users) so screen-reader and keyboard users meet
 * each hotline exactly once.
 */
function TickerCopy({
  mdrrmo,
  fire,
  hidden,
}: {
  mdrrmo?: string;
  fire?: string;
  hidden?: boolean;
}) {
  const tabIndex = hidden ? -1 : undefined;
  return (
    <div
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center gap-x-4 pr-4${hidden ? " bp-ticker-copy-hidden" : ""}`}
    >
      <p className="flex items-center gap-1.5 font-semibold">
        <Siren className="size-3.5 shrink-0" aria-hidden />
        Emergency:
      </p>
      <a
        href={telHref(nationalHotline.number)}
        aria-label={`Call ${nationalHotline.number}, the national emergency hotline`}
        tabIndex={tabIndex}
        className="font-bold underline-offset-2 hover:underline focus-visible:outline-white"
      >
        {nationalHotline.number}
      </a>
      {mdrrmo ? (
        <a
          href={telHref(mdrrmo)}
          aria-label={`Call Pagsanjan MDRRMO, ${mdrrmo}`}
          tabIndex={tabIndex}
          className="underline-offset-2 hover:underline focus-visible:outline-white"
        >
          MDRRMO: {mdrrmo}
        </a>
      ) : null}
      {fire ? (
        <a
          href={telHref(fire)}
          aria-label={`Call Pagsanjan Fire, ${fire}`}
          tabIndex={tabIndex}
          className="underline-offset-2 hover:underline focus-visible:outline-white"
        >
          Fire: {fire}
        </a>
      ) : null}
      <Link
        href="/emergency"
        tabIndex={tabIndex}
        className="font-medium underline-offset-2 hover:underline focus-visible:outline-white"
      >
        All hotlines
        <span aria-hidden> →</span>
      </Link>
    </div>
  );
}

export function EmergencyStrip() {
  const mdrrmo = emergencyContacts
    .find((contact) => contact.id === "mdrrmo-opcen")
    ?.numbers.at(0)?.value;
  const fire = emergencyContacts
    .find((contact) => contact.id === "bfp-pagsanjan")
    ?.numbers.at(0)?.value;

  return (
    <div className="bg-red-700 text-white">
      <div className="bp-ticker overflow-hidden">
        <nav
          aria-label="Emergency hotlines"
          className="bp-ticker-track flex w-max items-center py-1.5 text-xs sm:text-[13px]"
        >
          <TickerCopy mdrrmo={mdrrmo} fire={fire} />
          <TickerCopy mdrrmo={mdrrmo} fire={fire} hidden />
          <TickerCopy mdrrmo={mdrrmo} fire={fire} hidden />
          <TickerCopy mdrrmo={mdrrmo} fire={fire} hidden />
        </nav>
      </div>
    </div>
  );
}
