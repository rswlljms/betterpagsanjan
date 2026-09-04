"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, Siren, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { emergencyNav, mainNav, mobileNav } from "@/data/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the panel whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes the panel and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("mobile-menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <Container>
        <div className="flex h-16 items-center justify-between gap-3">
          <Link
            href="/"
            className="flex items-center"
            aria-label={`${site.name} — home`}
          >
            <Image
              src="/images/logo/better-pagsanjan-logo.svg"
              alt="BetterPagsanjan"
              width={1217}
              height={463}
              priority
              sizes="(max-width: 640px) 130px, 160px"
              className="h-9 w-auto sm:h-10"
            />
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-primary-50 text-primary-800"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <Link
              href="/search"
              aria-label="Search BetterPagsanjan"
              className="flex size-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              <Search className="size-5" aria-hidden />
            </Link>
            <Link
              href={emergencyNav.href}
              className="hidden min-h-10 items-center gap-1.5 rounded-lg bg-red-700 px-3.5 text-sm font-semibold text-white hover:bg-red-800 sm:inline-flex"
            >
              <Siren className="size-4" aria-hidden />
              {emergencyNav.title}
            </Link>
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex size-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden"
            >
              {open ? (
                <X className="size-5" aria-hidden />
              ) : (
                <Menu className="size-5" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </Container>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-white lg:hidden">
          <Container className="py-3">
            <nav aria-label="Mobile navigation">
              <ul className="space-y-1">
                {mobileNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "block rounded-lg px-3 py-2.5 text-sm font-medium",
                        item.href === emergencyNav.href
                          ? "text-red-700 hover:bg-red-50"
                          : "text-slate-800 hover:bg-slate-100",
                        isActive(item.href) && "bg-primary-50 text-primary-800",
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
