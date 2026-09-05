import Link from "next/link";
import Image from "next/image";
import { CodeXml, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { site } from "@/data/site";
import packageJson from "@/package.json";

/**
 * Footer layout follows the structure of the BetterLGU sister projects
 * (brand + Quick Links + Resources + community column + version bar),
 * adapted with BetterPagsanjan's own identity and only verified links
 * (AGENTS.md §62 — inspiration, not a copy).
 */

const quickLinks: { title: string; href: string }[] = [
  { title: "Services", href: "/services" },
  { title: "Government", href: "/government" },
  { title: "Barangays", href: "/barangays" },
  { title: "Announcements", href: "/announcements" },
  { title: "Emergency", href: "/emergency" },
  { title: "About", href: "/about" },
  { title: "Sources", href: "/sources" },
];

const resources: { title: string; href: string }[] = [
  { title: "Official LGU Pagsanjan Portal", href: site.officialWebsite },
  { title: "Freedom of Information", href: "https://www.foi.gov.ph" },
  { title: "Open Data Philippines", href: "https://data.gov.ph" },
  {
    title: "Philippine Statistics Authority",
    href: "https://psa.gov.ph",
  },
  {
    title: "CMCI DTI Portal",
    href: "https://cmci.dti.gov.ph/lgu-profile.php?lgu=Pagsanjan",
  },
  {
    title: "Pagsanjan MDRRMO Facebook",
    href: "https://www.facebook.com/PagsanjanMdrrmo",
  },
];

export function SiteFooter() {
  // BP guide: ink (#101010) dark footer anchoring decisive moments.
  return (
    <footer className="bg-bp-ink text-neutral-300">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              aria-label={`${site.name} — home`}
              className="inline-block"
            >
              <Image
                src="/images/logo/better-pagsanjan-logo-white.svg"
                alt="BetterPagsanjan"
                width={1221}
                height={463}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
              An independent civic technology project providing transparent
              access to government services, public information, and civic data
              for the people of Pagsanjan, Laguna.
            </p>
          </div>

          {/* Quick links — internal pages only, so nothing 404s */}
          <nav aria-label="Quick links">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Quick links
            </h2>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-300 hover:text-white"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources — verified external portals only */}
          <nav aria-label="Resources">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Resources
            </h2>
            <ul className="mt-4 space-y-2.5">
              {resources.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-300 hover:text-white"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Community */}
          <div>
            <p className="inline-flex rounded-md bg-green-500/10 px-3 py-1.5 text-xs font-semibold text-green-400">
              Cost to the People of Pagsanjan = ₱0
            </p>
            <div className="mt-4 flex flex-col items-start gap-2.5">
              {/*
                Both actions point at /about until dedicated volunteer /
                contribution channels exist — never ship a dead button.
              */}
              <Link
                href="/about"
                className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
              >
                <Mail className="size-4" aria-hidden />
                Volunteer with us
              </Link>
              <Link
                href="/about"
                className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
              >
                <CodeXml className="size-4" aria-hidden />
                Contribute code with us
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar — independence disclaimer (AGENTS.md §54) + version */}
        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p>
              © {new Date().getFullYear()} {site.name} MIT | CC BY 4.0 All
              public information sourced from official government portals.
            </p>
            <p>
              Not an official website of the Municipality of Pagsanjan.
            </p>
          </div>
          <p className="shrink-0 font-medium">Ver. {packageJson.version}</p>
        </div>
      </Container>
    </footer>
  );
}
