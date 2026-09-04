export interface NavItem {
  title: string;
  href: string;
  description?: string;
}

/** Primary header navigation (AGENTS.md §13). */
export const mainNav: NavItem[] = [
  { title: "Services", href: "/services" },
  { title: "Government", href: "/government" },
  { title: "Barangays", href: "/barangays" },
  { title: "Transparency", href: "/transparency" },
  { title: "Pagsanjan", href: "/tourism" },
];

/** Always-visible, visually distinct emergency entry point. */
export const emergencyNav: NavItem = {
  title: "Emergency",
  href: "/emergency",
};

export const mobileNav: NavItem[] = [
  ...mainNav,
  emergencyNav,
  { title: "Announcements", href: "/announcements" },
  { title: "Projects", href: "/projects" },
  { title: "Statistics", href: "/statistics" },
  { title: "Civic Map", href: "/map" },
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
