export interface NavItem {
  title: string;
  href: string;
  description?: string;
  /** Submenu entries (desktop dropdown + mobile accordion). */
  children?: NavItem[];
}

import { serviceCategories } from "@/data/services/categories";

/** Primary header navigation (AGENTS.md §13). */
export const mainNav: NavItem[] = [
  {
    title: "Services",
    href: "/services",
    children: [
      {
        title: "Browse all services",
        href: "/services",
        description: "Every service guide in one place.",
      },
      ...serviceCategories.map((category) => ({
        title: category.name,
        href: `/services?category=${category.id}`,
        description: category.description,
      })),
    ],
  },
  {
    title: "Government",
    href: "/government",
    children: [
      {
        title: "Government directory",
        href: "/government",
        description: "Municipal offices and how to reach them.",
      },
      {
        title: "Transparency",
        href: "/transparency",
        description: "Budget, procurement, and public records.",
      },
      {
        title: "Ordinances",
        href: "/ordinances",
        description: "Searchable index of municipal ordinances.",
      },
      {
        title: "Resolutions",
        href: "/resolutions",
        description: "Searchable index of council resolutions.",
      },
      {
        title: "Public projects",
        href: "/projects",
        description: "Projects and their status, from public records.",
      },
    ],
  },
  { title: "Barangays", href: "/barangays" },
  { title: "Transparency", href: "/transparency" },
  {
    title: "Pagsanjan",
    href: "/tourism",
    children: [
      {
        title: "Explore Pagsanjan",
        href: "/tourism",
        description: "Falls, heritage, and visitor information.",
      },
      {
        title: "Civic map",
        href: "/map",
        description: "Verified public locations in town.",
      },
      {
        title: "Statistics",
        href: "/statistics",
        description: "Population and local figures, with sources.",
      },
      {
        title: "Announcements",
        href: "/announcements",
        description: "Official advisories and public notices.",
      },
    ],
  },
];

/** Always-visible, visually distinct emergency entry point. */
export const emergencyNav: NavItem = {
  title: "Emergency",
  href: "/emergency",
};

export const mobileNav: NavItem[] = [
  ...mainNav,
  emergencyNav,
  // Announcements, Projects, Statistics, and Civic Map live inside the
  // desktop dropdowns above, so the mobile list only adds the pages that
  // have no other home in the header.
  { title: "Search", href: "/search" },
  { title: "About", href: "/about" },
  { title: "Sources", href: "/sources" },
];

export const footerNavGroups: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Civic information",
    items: [
      { title: "Services", href: "/services" },
      { title: "Government", href: "/government" },
      { title: "Barangays", href: "/barangays" },
      { title: "Announcements", href: "/announcements" },
      { title: "Emergency", href: "/emergency" },
    ],
  },
  {
    heading: "Transparency",
    items: [
      { title: "Transparency", href: "/transparency" },
      { title: "Ordinances", href: "/ordinances" },
      { title: "Resolutions", href: "/resolutions" },
      { title: "Projects", href: "/projects" },
      { title: "Statistics", href: "/statistics" },
    ],
  },
  {
    heading: "Explore",
    items: [
      { title: "Explore Pagsanjan", href: "/tourism" },
      { title: "Civic map", href: "/map" },
      { title: "Search", href: "/search" },
      { title: "About", href: "/about" },
      { title: "Sources", href: "/sources" },
    ],
  },
];
