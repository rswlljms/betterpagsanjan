import Link from "next/link";
import { Siren } from "lucide-react";
import { Container } from "@/components/ui/container";
import {
  emergencyContacts,
  nationalHotline,
} from "@/data/emergency/contacts";

/**
 * Global tap-to-call emergency strip above the site header.
 *
 * Numbers come from the verified emergency dataset — never hardcoded here
 * and never copied from another municipality's site. The strip scrolls away
 * (the header stays sticky) so it never permanently consumes screen space.
 */
function telHref(display: string): string {
  const digits = display.replace(/\D/g, "");
  if (digits === "911") return "tel:911";
  const normalized = digits.startsWith("0") ? digits.slice(1) : digits;
  return `tel:+63${normalized}`;
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
      <Container className="flex flex-wrap items-center gap-x-4 gap-y-1 py-1.5 text-xs sm:text-[13px]">
        <p className="flex items-center gap-1.5 font-semibold">
          <Siren className="size-3.5 shrink-0" aria-hidden />
          Emergency:
        </p>
        <nav
          aria-label="Emergency hotlines"
          className="flex flex-wrap items-center gap-x-4 gap-y-1"
        >
          <a
            href={telHref(nationalHotline.number)}
            aria-label={`Call ${nationalHotline.number}, the national emergency hotline`}
            className="font-bold underline-offset-2 hover:underline"
          >
            {nationalHotline.number}
          </a>
          {mdrrmo ? (
            <a
              href={telHref(mdrrmo)}
              aria-label={`Call Pagsanjan MDRRMO, ${mdrrmo}`}
              className="underline-offset-2 hover:underline"
            >
              MDRRMO: {mdrrmo}
            </a>
          ) : null}
          {fire ? (
            <a
              href={telHref(fire)}
              aria-label={`Call Pagsanjan Fire, ${fire}`}
              className="underline-offset-2 hover:underline"
            >
              Fire: {fire}
            </a>
          ) : null}
          <Link
            href="/emergency"
            className="font-medium underline-offset-2 hover:underline"
          >
            All hotlines
            <span aria-hidden> →</span>
          </Link>
        </nav>
      </Container>
    </div>
  );
}
