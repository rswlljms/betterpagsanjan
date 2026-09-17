"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Siren, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { emergencyNav, mainNav, mobileNav } from "@/data/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

function slugFor(href: string) {
  return href.replace(/[^a-z0-9]/gi, "") || "home";
}

function pathOf(href: string) {
  return href.split("?")[0];
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  /** True once the page scrolls past the top — header condenses to a pill. */
  const [scrolled, setScrolled] = useState(false);
  /** Title of the currently open desktop dropdown (one at a time). */
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  /** Title of the currently expanded mobile accordion. */
  const [expanded, setExpanded] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Close everything whenever the route changes.
  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
    setExpanded(null);
  }, [pathname]);

  // Track scroll position (rAF-throttled, passive) so the header can
  // condense into a floating pill. Initial state matches the server render.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 12);
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  // Escape closes the dropdown first, then the mobile panel.
  useEffect(() => {
    if (!openMenu && !open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (openMenu) {
        setOpenMenu(null);
        document.getElementById(`nav-toggle-${slugFor(openMenu)}`)?.focus();
      } else {
        setOpen(false);
        document.getElementById("mobile-menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openMenu, open]);

  // Pointer outside the header closes the desktop dropdown.
  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (event: PointerEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openMenu]);

  const isActive = (href: string) => {
    const path = pathOf(href);
    return path === "/"
      ? pathname === "/"
      : pathname === path || pathname.startsWith(`${path}/`);
  };

  const isSectionActive = (href: string, children?: { href: string }[]) =>
    isActive(href) ||
    (children?.some((child) => isActive(child.href)) ?? false);

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled && "px-2 pt-2 sm:px-4",
      )}
    >
      <div
        className={cn(
          "bg-bp-paper/95 backdrop-blur-md transition-all duration-300",
          scrolled
            ? "rounded-2xl border border-line shadow-bp-sm-4"
            : "border-b border-line",
        )}
      >
        <Container>
          <div className="flex h-[68px] items-center justify-between gap-3">
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
              className="hidden items-center gap-2 lg:flex"
            >
              {mainNav.map((item) => {
                const active = isSectionActive(item.href, item.children);
                const expandedMenu = openMenu === item.title;
                if (!item.children) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "px-2 py-2 text-sm font-medium transition-colors",
                        active
                          ? "font-semibold text-bp-ink"
                          : "text-bp-graphite hover:text-bp-ink",
                      )}
                    >
                      {item.title}
                    </Link>
                  );
                }
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setOpenMenu(item.title)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <span className="inline-flex items-center">
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "px-2 py-2 text-sm font-medium transition-colors",
                          active
                            ? "font-semibold text-bp-ink"
                            : "text-bp-graphite hover:text-bp-ink",
                        )}
                      >
                        {item.title}
                      </Link>
                      <button
                        id={`nav-toggle-${slugFor(item.title)}`}
                        type="button"
                        aria-expanded={expandedMenu}
                        aria-controls={`nav-submenu-${slugFor(item.title)}`}
                        aria-label={`${expandedMenu ? "Hide" : "Show"} ${item.title} submenu`}
                        onClick={() =>
                          setOpenMenu(expandedMenu ? null : item.title)
                        }
                        className="-ml-1 flex size-7 items-center justify-center rounded-md text-bp-graphite transition-colors hover:text-bp-ink"
                      >
                        <ChevronDown
                          className={cn(
                            "size-4 transition-transform",
                            expandedMenu && "rotate-180",
                          )}
                          aria-hidden
                        />
                      </button>
                    </span>

                    {expandedMenu ? (
                      <div className="absolute left-0 top-full z-50 w-80 pt-2">
                        <div className="rounded-xl bg-white p-2 shadow-bp-sm-4">
                          <ul id={`nav-submenu-${slugFor(item.title)}`}>
                            {item.children.map((child, index) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setOpenMenu(null)}
                                  className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-bp-paper"
                                >
                                  <span
                                    className={cn(
                                      "block text-sm text-bp-graphite",
                                      index === 0
                                        ? "font-semibold"
                                        : "font-medium",
                                    )}
                                  >
                                    {child.title}
                                  </span>
                                  {child.description ? (
                                    <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                                      {child.description}
                                    </span>
                                  ) : null}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>

            <div className="flex items-center gap-1.5">
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
                className="inline-flex size-10 items-center justify-center rounded-lg border border-line bg-white text-bp-graphite shadow-bp-subtle-3 transition-colors hover:text-bp-ink lg:hidden"
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
          <div
            id="mobile-nav"
            className={cn(
              "border-t border-line bg-bp-paper lg:hidden",
              scrolled && "rounded-b-2xl",
            )}
          >
            <Container className="max-h-[70vh] overflow-y-auto py-3">
              <nav aria-label="Mobile navigation">
                <ul className="space-y-1">
                  {mobileNav.map((item) => {
                    const active = isSectionActive(item.href, item.children);
                    if (!item.children) {
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                              item.href === emergencyNav.href
                                ? "text-red-700 hover:bg-red-50"
                                : "text-bp-graphite hover:text-bp-ink",
                              active &&
                                item.href !== emergencyNav.href &&
                                "font-semibold text-bp-ink",
                            )}
                          >
                            {item.title}
                          </Link>
                        </li>
                      );
                    }
                    const isExpanded = expanded === item.title;
                    return (
                      <li key={item.href}>
                        <div className="flex items-center gap-1">
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                              active
                                ? "font-semibold text-bp-ink"
                                : "text-bp-graphite hover:text-bp-ink",
                            )}
                          >
                            {item.title}
                          </Link>
                          <button
                            type="button"
                            aria-expanded={isExpanded}
                            aria-controls={`mobile-submenu-${slugFor(item.title)}`}
                            aria-label={`${isExpanded ? "Hide" : "Show"} ${item.title} submenu`}
                            onClick={() =>
                              setExpanded(isExpanded ? null : item.title)
                            }
                            className="flex size-10 items-center justify-center rounded-lg text-bp-graphite transition-colors hover:text-bp-ink"
                          >
                            <ChevronDown
                              className={cn(
                                "size-4 transition-transform",
                                isExpanded && "rotate-180",
                              )}
                              aria-hidden
                            />
                          </button>
                        </div>
                        {isExpanded ? (
                          <ul
                            id={`mobile-submenu-${slugFor(item.title)}`}
                            className="mb-1 ml-3 space-y-0.5 border-l-2 border-line pl-3"
                          >
                            {item.children.map((child, index) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setOpen(false)}
                                  className={cn(
                                    "block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white hover:text-bp-ink",
                                    index === 0
                                      ? "font-semibold text-bp-ink"
                                      : "text-bp-graphite",
                                  )}
                                >
                                  {child.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </Container>
          </div>
        ) : null}
      </div>
    </header>
  );
}
