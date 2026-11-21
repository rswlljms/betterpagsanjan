import type { Announcement } from "@/types/civic";

/**
 * How long reviewed summaries remain acceptable before the announcements
 * page warns that they may be out of date. The warning is a prompt to review
 * the official feed, not an automatic update.
 */
export const ANNOUNCEMENT_STALE_AFTER_DAYS = 60;

/**
 * Manually reviewed summaries, newest publication first. Dates are the
 * portal's publication dates, not event dates or application deadlines.
 * News reports do not establish that a program is currently open.
 */
export const announcements: Announcement[] = [
  {
    id: "pagsanjan-circular-energy-housing-moa",
    title: "Circular energy and housing agreement signed",
    summary:
      "The municipal portal reports a ceremonial signing of a memorandum of agreement between the Municipality of Pagsanjan and Ecovaltrix Philippines for a “Pagsanjan Circular Energy & Housing Ecosystem.” The post says the project aims to improve waste management, energy use, and housing development, but does not publish a budget, timeline, or implementing rules.",
    date: "2026-11-17",
    lastChecked: "2026-11-21",
    category: "Environment",
    kind: "news",
    sourceId: "pagsanjan-legislative-portal",
    sourceUrl: "https://www.pagsanjanlaguna.com/news/21",
  },
  {
    id: "earthquake-drill-september-2026",
    title: "Earthquake drill held in Pagsanjan",
    summary:
      "The municipal portal reports that an earthquake drill was held on September 15, 2026 to practice safety protocols. The post was published on November 17, 2026 and does not list participating schools, offices, or a schedule for future drills.",
    date: "2026-11-17",
    lastChecked: "2026-11-21",
    category: "Emergency preparedness",
    kind: "news",
    sourceId: "pagsanjan-legislative-portal",
    sourceUrl: "https://www.pagsanjanlaguna.com/news/20",
  },
  {
    id: "barangay-bbm-financial-assistance",
    title: "All 16 barangays receive ₱200,000 each under national program",
    summary:
      "The municipal portal reports that all 16 Pagsanjan barangays received ₱200,000 each under the national Bagong Pilipinas program. Each allocation was described as ₱100,000 for the Bagong Pilipinas Barangay Scholars Program and ₱100,000 for Assistance for the Barangay; the post says part of the funds was used for e-bikes, motorcycles, and other equipment. It does not itemize spending per barangay.",
    date: "2026-11-17",
    lastChecked: "2026-11-21",
    category: "Barangay programs",
    kind: "news",
    sourceId: "pagsanjan-legislative-portal",
    sourceUrl: "https://www.pagsanjanlaguna.com/news/19",
  },
  {
    id: "dilg-full-disclosure-compliance",
    title: "Pagsanjan cited as fully compliant with Full Disclosure Policy",
    summary:
      "The municipal portal reports that the Department of the Interior and Local Government recognized Pagsanjan as a fully compliant local government unit under the Full Disclosure Policy for the second to fourth quarters of 2025 and the first quarter of 2026. The post says Pagsanjan was among 145 CALABARZON LGUs cited.",
    date: "2026-11-06",
    lastChecked: "2026-11-21",
    category: "Transparency",
    kind: "news",
    sourceId: "pagsanjan-legislative-portal",
    sourceUrl: "https://www.pagsanjanlaguna.com/news/18",
  },
  {
    id: "undas-2026-safety-operations",
    title: "Undas 2026 safety operations concluded",
    summary:
      "The municipal government thanked the police, fire bureau, disaster risk reduction council, Red Cross, traffic and barangay personnel, volunteers, and municipal staff for keeping order and assisting the public during Undas 2026. The post does not report incident counts, response times, or the number of personnel deployed.",
    date: "2026-11-03",
    lastChecked: "2026-11-21",
    category: "Public safety",
    kind: "news",
    sourceId: "pagsanjan-legislative-portal",
    sourceUrl: "https://www.pagsanjanlaguna.com/news/16",
  },
  {
    id: "undas-2026-free-water-soup",
    title: "Free water and soup offered at Pagsanjan cemetery during Undas",
    summary:
      "The municipal portal reports that the local government distributed free drinking water and hot soup to visitors at the Pagsanjan Municipal Cemetery during Undas 2026. The post does not state how many people were served or whether the program will continue.",
    date: "2026-11-03",
    lastChecked: "2026-11-21",
    category: "Public services",
    kind: "news",
    sourceId: "pagsanjan-legislative-portal",
    sourceUrl: "https://www.pagsanjanlaguna.com/news/15",
  },
  {
    id: "maliwanag-na-pagsanjan-cemetery",
    title: "Cemetery lighting improved for Undas 2026",
    summary:
      "The municipal portal reports a “Maliwanag na Pagsanjan 2026” program that improved lighting and order at the public cemetery ahead of Undas 2026. The post does not publish the project cost or the number of lights installed.",
    date: "2026-11-03",
    lastChecked: "2026-11-21",
    category: "Public facilities",
    kind: "news",
    sourceId: "pagsanjan-legislative-portal",
    sourceUrl: "https://www.pagsanjanlaguna.com/news/14",
  },
  {
    id: "cemetery-inspection-undas-2026",
    title: "Cemetery preparations inspected ahead of Undas",
    summary:
      "The municipal portal reports that the mayor and municipal staff inspected the Pambayang Himlayan on October 27, 2026, checking lighting, power, comfort rooms, and overall conditions before Undas. The post does not report deficiencies found or a budget for the preparations.",
    date: "2026-11-03",
    lastChecked: "2026-11-21",
    category: "Public facilities",
    kind: "news",
    sourceId: "pagsanjan-legislative-portal",
    sourceUrl: "https://www.pagsanjanlaguna.com/news/13",
  },
  {
    id: "owwa-on-wheels-pagsanjan",
    title: "OWWA services brought to Pagsanjan",
    summary:
      "The municipal portal reports that the OWWA CALABARZON On-Wheels program was held on October 2, 2026 at the Old Municipal Grand Hall, with about 138 participants including overseas Filipino workers and their families. The post describes the event as an opportunity to learn about OWWA programs but does not list the services provided or upcoming schedules.",
    date: "2026-10-27",
    lastChecked: "2026-11-21",
    category: "Employment",
    kind: "news",
    sourceId: "pagsanjan-legislative-portal",
    sourceUrl: "https://www.pagsanjanlaguna.com/news/8",
  },
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
  {
    id: "local-aics-medical-burial-payout",
    title: "Local AICS payout for medical and burial assistance",
    summary:
      "The municipal portal reports a payout of Local Assistance to Individuals in Crisis Situation (AICS) for medical and burial assistance on October 15, 2026. The post does not state the number of beneficiaries, the amounts released, or how residents can apply for future payouts.",
    date: "2026-10-19",
    lastChecked: "2026-11-21",
    category: "Social services",
    kind: "news",
    sourceId: "pagsanjan-legislative-portal",
    sourceUrl: "https://www.pagsanjanlaguna.com/news/7",
  },
  {
    id: "mardi-undaz-2026-masquerade-ball",
    title: "Mardi Undaz 2026: Period Masquerade Ball",
    summary:
      "The municipal portal announced the Mardi Undaz 2026 Period Masquerade Ball at Liwasang Don Manuel Soriano on October 29, 2026, with registration at the Municipal Tourism, Culture and Arts Office until October 28. The post lists costume rules, categories, prizes, and judging criteria. These dates have passed; check official channels for future events.",
    date: "2026-10-14",
    lastChecked: "2026-11-21",
    category: "Culture and tourism",
    kind: "news",
    sourceId: "pagsanjan-legislative-portal",
    sourceUrl: "https://www.pagsanjanlaguna.com/news/6",
  },
  {
    id: "resolution-143-2026-provincial-support",
    title: "Sangguniang Bayan resolution supports Laguna governor's programs",
    summary:
      "The municipal portal reports that Mayor Januario Ferry Garcia presented Sangguniang Bayan Resolution No. 143-2026 on October 12, 2026. The resolution expresses Pagsanjan's support for Laguna Governor Marisol Aragon and the League of Municipalities of the Philippines Laguna Chapter in implementing provincial programs and projects. The post does not attach the resolution text.",
    date: "2026-10-13",
    lastChecked: "2026-11-21",
    category: "Governance",
    kind: "news",
    sourceId: "pagsanjan-legislative-portal",
    sourceUrl: "https://www.pagsanjanlaguna.com/news/4",
  },
  {
    id: "pnp-911-motorcycles",
    title: "PNP receives five motorcycles for 911 response",
    summary:
      "The municipal portal reports that the DILG and Philippine National Police provided the Pagsanjan Municipal Police Station with five motorcycles on October 7, 2026 to support the PNP 911 program. The post does not state how the vehicles will be assigned or whether they replace existing units.",
    date: "2026-10-12",
    lastChecked: "2026-11-21",
    category: "Public safety",
    kind: "news",
    sourceId: "pagsanjan-legislative-portal",
    sourceUrl: "https://www.pagsanjanlaguna.com/news/3",
  },
  {
    id: "pagsanjan-lumban-health-agreement",
    title: "Pagsanjan and Lumban sign health services agreement",
    summary:
      "The municipal portal reports a ceremonial signing of a memorandum of agreement between the local governments of Pagsanjan and Lumban. The post says the arrangement will provide additional doctors to Lumban and covers an animal bite treatment center, TB DOTS, family planning, mental health services, and issuance of death certificates. It does not state when the services began or how Pagsanjan residents are affected.",
    date: "2026-03-09",
    lastChecked: "2026-11-21",
    category: "Health",
    kind: "news",
    sourceId: "pagsanjan-legislative-portal",
    sourceUrl: "https://www.pagsanjanlaguna.com/news/2",
  },
  {
    id: "spes-applicant-pooling-paused",
    title: "SPES applicant pooling paused after reaching initial target",
    summary:
      "The municipal portal announced that the Special Program for Employment of Students (SPES) applicant pooling had reached its initial target, so new submissions were paused. The post describes SPES as temporary employment for students and out-of-school youth aged 15–30 and lists initial requirements. It does not announce a reopening date; check with PESO Pagsanjan for the official program schedule.",
    date: "2026-03-09",
    lastChecked: "2026-11-21",
    category: "Employment",
    kind: "news",
    sourceId: "pagsanjan-legislative-portal",
    sourceUrl: "https://www.pagsanjanlaguna.com/news/1",
  },
];

/**
 * Posts that were reviewed and deliberately left out of the announcements
 * list. The weekly checker treats any `/news/<id>` reference in this file as
 * reviewed, so listing a post here keeps it from reopening the review issue
 * without publishing a summary that adds no civic information.
 */
export const announcementsReviewedWithoutSummary: {
  sourceUrl: string;
  reason: string;
}[] = [
  {
    sourceUrl: "https://www.pagsanjanlaguna.com/news/23",
    reason:
      "The post contains only a title and an image, so there are no verifiable details to summarize.",
  },
  {
    sourceUrl: "https://www.pagsanjanlaguna.com/news/22",
    reason:
      "Recognition post for municipal officials and Air Force reservists; no civic service, program, or policy details.",
  },
  {
    sourceUrl: "https://www.pagsanjanlaguna.com/news/17",
    reason:
      "Photo highlights of the Mardi Undaz 2026 ball already covered by the event announcement (news/6).",
  },
  {
    sourceUrl: "https://www.pagsanjanlaguna.com/news/9",
    reason:
      "Sports recognition post for a Pencak Silat team; no civic service or program information.",
  },
  {
    sourceUrl: "https://www.pagsanjanlaguna.com/news/5",
    reason:
      "The post contains only a title and an image, so there are no verifiable details to summarize.",
  },
];
