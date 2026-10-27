import type { Announcement } from "@/types/civic";

/**
 * Manually reviewed summaries, newest publication first. Dates are the
 * portal's publication dates, not event dates or application deadlines.
 * News reports do not establish that a program is currently open.
 */
export const announcements: Announcement[] = [
  {
    id: "buntis-congress-2026-camp",
    title: "Buntis Congress 2026: Buntis Camp update",
    summary:
      "The municipal portal published a Day 1 update for Buntis Camp. The post does not provide registration instructions, a venue, or an event schedule; check the original post and official channels for details.",
    date: "2026-10-27",
    lastChecked: "2026-10-27",
    category: "Health",
    kind: "news",
    sourceId: "pagsanjan-legislative-portal",
    sourceUrl: "https://www.pagsanjanlaguna.com/news/12",
  },
  {
    id: "villa-corazon-covered-court-bleachers",
    title: "New bleachers reported at Villa Corazon covered court",
    summary:
      "The municipal portal reports new bleachers at the Villa Corazon covered court in Barangay Biñan. The short update does not publish a budget or a construction timeline.",
    date: "2026-10-27",
    lastChecked: "2026-10-27",
    category: "Public facilities",
    kind: "news",
    sourceId: "pagsanjan-legislative-portal",
    sourceUrl: "https://www.pagsanjanlaguna.com/news/11",
  },
  {
    id: "binan-agricultural-trading-post-inspection",
    title: "Agricultural trading post inspection in Barangay Biñan",
    summary:
      "The municipal portal reports an inspection of the agricultural trading post in Barangay Biñan, behind the bingo venue, ahead of its formal opening. The article does not announce an opening date or vendor application procedure.",
    date: "2026-10-27",
    lastChecked: "2026-10-27",
    category: "Local economy",
    kind: "news",
    sourceId: "pagsanjan-legislative-portal",
    sourceUrl: "https://www.pagsanjanlaguna.com/news/10",
  },
];
