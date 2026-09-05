import { LAST_CHECKED } from "@/data/sources";
import type { LegislativeDocument } from "@/types/civic";

/**
 * Legislative index (AGENTS.md §23).
 *
 * Seed records below were transcribed in September 2026 from the official
 * legislative portal of the Municipality of Pagsanjan
 * (https://www.pagsanjanlaguna.com — source: pagsanjan-legislative-portal).
 * Titles, numbers, dates, and authors reproduce the portal's published text;
 * each record links to its official document PDF.
 *
 * The portal hosts the complete archive (hundreds of ordinances, thousands
 * of resolutions). BetterPagsanjan indexes recent entries here and links to
 * the portal for the full archive — new records are added only from the
 * portal, never invented.
 */
const SEED_VERIFICATION_SOURCE = "pagsanjan-legislative-portal" as const;

function seed(
  entry: Omit<LegislativeDocument, "verification" | "lastChecked"> & {
    sourceUrl: string;
  },
): LegislativeDocument {
  return {
    ...entry,
    verification: {
      status: "verified",
      sourceId: SEED_VERIFICATION_SOURCE,
      sourceUrl: entry.sourceUrl,
      verifiedAt: "2026-09",
      note: "Title, number, date, and authors as published on the Municipality of Pagsanjan legislative portal. Full text is in the linked official document PDF.",
    },
    lastChecked: LAST_CHECKED,
  };
}

const ordinances: LegislativeDocument[] = [
  seed({
    id: "appropriation-ordinance-no-04-2026",
    slug: "appropriation-ordinance-no-04-2026",
    documentType: "ordinance",
    number: "APPROPRIATION ORDINANCE NO. 04-2026",
    title:
      "AN APPROPRIATION ORDINANCE OF THE SANGGUNIANG BAYAN OF PAGSANJAN, LAGUNA, AUTHORIZING, APPROVING AND RATIFYING THE SUPPLEMENTAL BUDGET NO. 04-2026 AMOUNTING TO FIVE HUNDRED TWENTY THOUSAND PESOS (Php 520,000.00) FOR THE PRIORITY PROGRAMS AND PROJECTS OF THE MUNICIPAL GOVERNMENT OF PAGSANJAN, LAGUNA.",
    summary:
      "Approved August 24, 2026. Authors: HON. MELVIN B. MADRIAGA, HON. NATHANAEL C. BERNALES II, HON. DENNIS DALE V. GONZALES.",
    date: "2026-08-24",
    year: "2026",
    authors: [
      "HON. MELVIN B. MADRIAGA",
      "HON. NATHANAEL C. BERNALES II",
      "HON. DENNIS DALE V. GONZALES",
    ],
    sourceUrl:
      "https://www.pagsanjanlaguna.com/uploads/documents/appropriation-ordinance-no-04-2026-1788329372.pdf",
  }),
  seed({
    id: "municipal-ordinance-no-11-2026",
    slug: "municipal-ordinance-no-11-2026",
    documentType: "ordinance",
    number: "MUNICIPAL ORDINANCE NO. 11-2026",
    title:
      "AN ORDINANCE CREATING THE POSITION OF ADMINISTRATIVE AIDE IV (DRIVER II), SALARY GRADE 4, UNDER THE DEPARTMENT OF EDUCATION (DepEd) PAGSANJAN SUB-OFFICE, MUNICIPALITY OF PAGSANJAN, PROVINCE OF LAGUNA, AND APPROPRIATING FUNDS THEREOF.",
    summary: "Approved August 24, 2026. Author: HON. RONIE S. LERON.",
    date: "2026-08-24",
    year: "2026",
    authors: ["HON. RONIE S. LERON"],
    sourceUrl:
      "https://www.pagsanjanlaguna.com/uploads/documents/municipal-ordinance-no-11-2026-1788329500.pdf",
  }),
  seed({
    id: "municipal-ordinance-no-10-2026",
    slug: "municipal-ordinance-no-10-2026",
    documentType: "ordinance",
    number: "MUNICIPAL ORDINANCE NO. 10-2026",
    title:
      "AN ORDINANCE AMENDING SECTION 9 (a) (1, 2, and 3); (c) (1); and (d) (1) (IMPOSITION OF FEES) OF MUNICIPAL ORDINANCE NO. 09-2026, OTHERWISE KNOWN AS \u201cTHE COCKPIT AND COCKFIGHT REGULATION ORDINANCE OF THE MUNICIPALITY OF PAGSANJAN, LAGUNA\u201d.",
    summary: "Approved July 27, 2026. Author: HON. NOEL L. CABELA.",
    date: "2026-07-27",
    year: "2026",
    authors: ["HON. NOEL L. CABELA"],
    sourceUrl:
      "https://www.pagsanjanlaguna.com/uploads/documents/municipal-ordinance-no-10-2026-1785377522.pdf",
  }),
  seed({
    id: "natatanging-kautusang-bayan-blg-01-2026",
    slug: "natatanging-kautusang-bayan-blg-01-2026",
    documentType: "ordinance",
    number: "NATATANGING KAUTUSANG BAYAN BLG. 01-2026",
    title:
      "NATATANGING KAUTUSANG BAYANG PINAGTITIBAY NG SANGGUNIANG BAYAN NG PAGSANJAN NA PANGALANAN NG \u201cR. A. CABALLES SR. STREET\u201d ANG DAAN NA NASASAKUPAN NG PUROK I, BILANG PAGKILALA SA KABUTIHANG-LOOB NG NAGKALOOB NG LUPA NA SI G. RICARDO A. CABALLES SR. SA BARANGAY LAMBAC, PAGSANJAN, LAGUNA AT PAGTATAKDA NG MGA KAUGNAY NA HAKBANG PARA SA PAGPAPATUPAD NITO.",
    summary:
      "Approved July 1, 2026. Authors: HON. NATHANAEL C. BERNALES II, HON. ALLAN Q. ARROYO.",
    date: "2026-07-01",
    year: "2026",
    authors: ["HON. NATHANAEL C. BERNALES II", "HON. ALLAN Q. ARROYO"],
    sourceUrl:
      "https://www.pagsanjanlaguna.com/uploads/documents/natatanging-kautusang-bayan-blg-01-2026-1785294804.pdf",
  }),
  seed({
    id: "appropriation-ordinance-no-03-2026",
    slug: "appropriation-ordinance-no-03-2026",
    documentType: "ordinance",
    number: "APPROPRIATION ORDINANCE NO. 03-2026",
    title:
      "AN APPROPRIATION ORDINANCE OF THE SANGGUNIANG BAYAN OF PAGSANJAN, LAGUNA, AUTHORIZING, APPROVING AND RATIFYING THE SUPPLEMENTAL BUDGET NO. 03-2026 AMOUNTING TO SIX MILLION FIVE HUNDRED SEVENTY-NINE THOUSAND FIVE HUNDRED PESOS (Php 6,579,500.00) FOR THE PRIORITY PROGRAMS AND PROJECTS OF THE MUNICIPAL GOVERNMENT OF PAGSANJAN, LAGUNA.",
    summary:
      "Approved July 1, 2026. Authors: HON. MELVIN B. MADRIAGA, HON. NATHANAEL C. BERNALES II, HON. DENNIS DALE V. GONZALES.",
    date: "2026-07-01",
    year: "2026",
    authors: [
      "HON. MELVIN B. MADRIAGA",
      "HON. NATHANAEL C. BERNALES II",
      "HON. DENNIS DALE V. GONZALES",
    ],
    sourceUrl:
      "https://www.pagsanjanlaguna.com/uploads/documents/appropriation-ordinance-no-03-2026-1785294899.pdf",
  }),
  seed({
    id: "municipal-ordinance-no-09-2026",
    slug: "municipal-ordinance-no-09-2026",
    documentType: "ordinance",
    number: "MUNICIPAL ORDINANCE NO. 09-2026",
    title:
      "AN ORDINANCE REGULATING THE ESTABLISHMENT, FRANCHISING, LICENSING, OPERATION, AND MAINTENANCE OF COCKPITS AND COCKFIGHTS WITHIN THE TERRITORIAL JURISDICTION OF THE MUNICIPALITY OF PAGSANJAN, LAGUNA, PROVIDING RULES, REGULATIONS, AND FISCAL IMPOSITIONS THEREFOR, AND FOR OTHER PURPOSES.",
    summary:
      "Approved June 23, 2026. Authors: HON. MELVIN B. MADRIAGA, HON. NATHANAEL C. BERNALES II, HON. JOHN PAUL J. EJERCITO, HON. NOEL L. CABELA, HON. DENNIS DALE V. GONZALES, HON. RONIE S. LERON, HON. PATRICIA C. ABAQUIN, HON. NOOGINE A. PABILONIA.",
    date: "2026-06-23",
    year: "2026",
    authors: [
      "HON. MELVIN B. MADRIAGA",
      "HON. NATHANAEL C. BERNALES II",
      "HON. JOHN PAUL J. EJERCITO",
      "HON. NOEL L. CABELA",
      "HON. DENNIS DALE V. GONZALES",
      "HON. RONIE S. LERON",
      "HON. PATRICIA C. ABAQUIN",
      "HON. NOOGINE A. PABILONIA",
    ],
    sourceUrl:
      "https://www.pagsanjanlaguna.com/uploads/documents/municipal-ordinance-no-09-2026-1785377548.pdf",
  }),
  seed({
    id: "municipal-ordinance-no-08-2026",
    slug: "municipal-ordinance-no-08-2026",
    documentType: "ordinance",
    number: "MUNICIPAL ORDINANCE NO. 08-2026",
    title:
      "AN ORDINANCE CREATING THE POSITION OF ADMINISTRATIVE AIDE IV (SALARY GRADE 4) UNDER THE DEPARTMENT OF EDUCATION (DEPED) PAGSANJAN SUB-OFFICE, MUNICIPALITY OF PAGSANJAN, PROVINCE OF LAGUNA, AND APPROPRIATING FUNDS THEREOF.",
    summary: "Approved June 3, 2026. Author: HON. RONIE S. LERON.",
    date: "2026-06-03",
    year: "2026",
    authors: ["HON. RONIE S. LERON"],
    sourceUrl:
      "https://www.pagsanjanlaguna.com/uploads/documents/municipal-ordinance-no-08-2026-1785294586.pdf",
  }),
  seed({
    id: "municipal-ordinance-no-06-2026",
    slug: "municipal-ordinance-no-06-2026",
    documentType: "ordinance",
    number: "MUNICIPAL ORDINANCE NO. 06-2026",
    title:
      "A MUNICIPAL ORDINANCE RENAMING THE PAGSANJAN SENIOR HIGH SCHOOL TO DINGIN NATIONAL HIGH SCHOOL, SITUATED IN BARANGAY DINGIN, PAGSANJAN, LAGUNA, AND PROVIDING FOR OTHER PURPOSES RELATED THERETO.",
    summary: "Approved April 29, 2026. Author: HON. RONIE S. LERON.",
    date: "2026-04-29",
    year: "2026",
    authors: ["HON. RONIE S. LERON"],
    sourceUrl:
      "https://www.pagsanjanlaguna.com/uploads/documents/municipal-ordinance-no-06-2026-1778744052.pdf",
  }),
  seed({
    id: "appropriation-ordinance-no-02-2026",
    slug: "appropriation-ordinance-no-02-2026",
    documentType: "ordinance",
    number: "APPROPRIATION ORDINANCE NO. 02-2026",
    title:
      "AN APPROPRIATION ORDINANCE OF THE SANGGUNIANG BAYAN OF PAGSANJAN, LAGUNA, AUTHORIZING, APPROVING AND RATIFYING THE SUPPLEMENTAL BUDGET NO. 02-2026 AMOUNTING TO THIRTY-ONE MILLION PESOS (PHP31,000,000.00)",
    summary:
      "Approved April 15, 2026. Authors: HON. MELVIN B. MADRIAGA, HON. NATHANAEL C. BERNALES II, HON. DENNIS DALE V. GONZALES.",
    date: "2026-04-15",
    year: "2026",
    authors: [
      "HON. MELVIN B. MADRIAGA",
      "HON. NATHANAEL C. BERNALES II",
      "HON. DENNIS DALE V. GONZALES",
    ],
    sourceUrl:
      "https://www.pagsanjanlaguna.com/uploads/documents/appropriation-ordinance-no-02-2026-1778049205.pdf",
  }),
  seed({
    id: "municipal-ordinance-no-05-2026",
    slug: "municipal-ordinance-no-05-2026",
    documentType: "ordinance",
    number: "MUNICIPAL ORDINANCE NO. 05-2026",
    title:
      "AN ORDINANCE OF THE SANGGUNIANG BAYAN ESTABLISHING AND APPROVING A TEMPORARY EMERGENCY PROVISIONAL FARE MATRIX FOR MOTORIZED TRICYCLES OPERATING WITHIN THE MUNICIPALITY OF PAGSANJAN, LAGUNA, TO ADDRESS THE IMPACT OF INCREASING FUEL COSTS.",
    summary: "Approved April 13, 2026. Author: HON. NOEL L. CABELA.",
    date: "2026-04-13",
    year: "2026",
    authors: ["HON. NOEL L. CABELA"],
    sourceUrl:
      "https://www.pagsanjanlaguna.com/uploads/documents/municipal-ordinance-no-05-2026-1778049250.pdf",
  }),
];

const resolutions: LegislativeDocument[] = [
  seed({
    id: "resolution-no-127-2026",
    slug: "resolution-no-127-2026",
    documentType: "resolution",
    number: "RESOLUTION NO. 127-2026",
    title:
      "A RESOLUTION OF THE SANGGUNIANG BAYAN OF PAGSANJAN, LAGUNA, AUTHORIZING THE MUNICIPAL MAYOR, HON. JANUARIO FERRY G. GARCIA, TO REPRESENT THE MUNICIPAL GOVERNMENT OF PAGSANJAN AND ENTER AND SIGN A MEMORANDUM OF AGREEMENT WITH RO8 GROCERY, REPRESENTED BY MS. MARITES LEE ONG, FOR THE IMMEDIATE PROVISION OF BASIC SUPPLIES AND RELIEF GOODS TO BE UTILIZED DURING CALAMITIES AND DISASTERS.",
    summary:
      "Approved August 24, 2026. Author: HON. MELVIN B. MADRIAGA.",
    date: "2026-08-24",
    year: "2026",
    authors: ["HON. MELVIN B. MADRIAGA"],
    sourceUrl:
      "https://www.pagsanjanlaguna.com/uploads/documents/resolution-no-127-2026-1788329628.pdf",
  }),
  seed({
    id: "resolution-no-128-2026",
    slug: "resolution-no-128-2026",
    documentType: "resolution",
    number: "RESOLUTION NO. 128-2026",
    title:
      "A RESOLUTION OF THE SANGGUNIANG BAYAN OF PAGSANJAN CONFIRMING THE APPOINTMENT OF HON. NOOGINE ABLIR PABILONIA AS A REGULAR MEMBER OF THE SANGGUNIANG BAYAN OF PAGSANJAN, LAGUNA (AUGUST 17, 2026 - JUNE 30, 2028).",
    summary:
      "Approved August 24, 2026. Author: HON. MELVIN B. MADRIAGA.",
    date: "2026-08-24",
    year: "2026",
    authors: ["HON. MELVIN B. MADRIAGA"],
    sourceUrl:
      "https://www.pagsanjanlaguna.com/uploads/documents/resolution-no-128-2026-1788329694.pdf",
  }),
  seed({
    id: "kapasiyahan-blg-129-2026",
    slug: "kapasiyahan-blg-129-2026",
    documentType: "resolution",
    number: "KAPASIYAHAN BLG. 129-2026",
    title:
      "KAPASIYAHANG PINAGTITIBAY NG KAGALANG-GALANG NA SANGGUNIANG BAYAN NG PAGSANJAN ANG PAGPAPAABOT NG TAOS-PUSONG PAKIKIRAMAY SA PAMILYA AT MGA KAANAK NG YUMAONG DATING INGAT-YAMAN AT BARANGAY KAGAWAD NA SI KAGALANG-GALANG ANTONIO CABANTOG OLIVEROS NG BARANGAY CALUSICHE, PAGSANJAN, LAGUNA, NA PUMANAW NOONG AGOSTO 21, 2026 SA EDAD NA PITUMPU\u2019T ISA (71 YEARS OLD).",
    summary:
      "Approved August 24, 2026. Authors: HON. MELVIN B. MADRIAGA, HON. NATHANAEL C. BERNALES II, HON. JOHN PAUL J. EJERCITO, HON. NOEL L. CABELA, HON. DENNIS DALE V. GONZALES, HON. RONIE S. LERON, HON. PATRICIA C. ABAQUIN, HON. NOOGINE A. PABILONIA.",
    date: "2026-08-24",
    year: "2026",
    authors: [
      "HON. MELVIN B. MADRIAGA",
      "HON. NATHANAEL C. BERNALES II",
      "HON. JOHN PAUL J. EJERCITO",
      "HON. NOEL L. CABELA",
      "HON. DENNIS DALE V. GONZALES",
      "HON. RONIE S. LERON",
      "HON. PATRICIA C. ABAQUIN",
      "HON. NOOGINE A. PABILONIA",
    ],
    sourceUrl:
      "https://www.pagsanjanlaguna.com/uploads/documents/kapasiyahan-blg-129-2026-1788329778.pdf",
  }),
  seed({
    id: "resolution-no-121-2026",
    slug: "resolution-no-121-2026",
    documentType: "resolution",
    number: "RESOLUTION NO. 121-2026",
    title:
      "RESOLUTION DECLARING THE TWELFTH (12TH) DAY OF JULY OF EVERY YEAR AS \u201cWEST PHILIPPINE SEA VICTORY DAY\u201d IN THE MUNICIPALITY OF PAGSANJAN IN COMMEMORATION OF THE 12 JULY 2016 SOUTH CHINA SEA ARBITRAL AWARD, AFFIRMING SUPPORT FOR THE PHILIPPINES\u2019 SOVEREIGN RIGHTS AND MARITIME ENTITLEMENTS IN THE WEST PHILIPPINE SEA, PROMOTING PUBLIC AWARENESS OF THE RULE OF LAW, PEACEFUL DISPUTE SETTLEMENT, MARITIME HERITAGE, AND ENCOURAGING CIVIC, CULTURAL, ENVIRONMENTAL, AND EDUCATIONAL ACTIVITIES IN ITS ANNUAL OBSERVANCE.",
    summary:
      "Approved August 3, 2026. Authors: HON. DENNIS DALE V. GONZALES, HON. RONIE S. LERON, HON. ALLAN Q. ARROYO.",
    date: "2026-08-03",
    year: "2026",
    authors: [
      "HON. DENNIS DALE V. GONZALES",
      "HON. RONIE S. LERON",
      "HON. ALLAN Q. ARROYO",
    ],
    sourceUrl:
      "https://www.pagsanjanlaguna.com/uploads/documents/resolution-no-121-2026-1786432478.pdf",
  }),
  seed({
    id: "resolution-no-122-2026",
    slug: "resolution-no-122-2026",
    documentType: "resolution",
    number: "RESOLUTION NO. 122-2026",
    title:
      "A RESOLUTION OF THE SANGGUNIANG BAYAN OF PAGSANJAN AUTHORIZING THE MUNICIPAL MAYOR, HON. JANUARIO FERRY G. GARCIA, TO ENTER INTO AND SIGN A MEMORANDUM OF AGREEMENT (MOA) WITH THE DEVELOPMENT BANK OF THE PHILIPPINES (DBP), REPRESENTED BY ITS VICE PRESIDENT AND OFFICER-IN-CHARGE OF THE BRANCH BANKING GROUP SOUTHERN LUZON, CHED B. SY, FOR THE IMPLEMENTATION OF A SALARY LOAN FACILITY FOR QUALIFIED EMPLOYEES OF THE MUNICIPAL GOVERNMENT OF PAGSANJAN.",
    summary:
      "Approved August 3, 2026. Author: HON. MELVIN B. MADRIAGA.",
    date: "2026-08-03",
    year: "2026",
    authors: ["HON. MELVIN B. MADRIAGA"],
    sourceUrl:
      "https://www.pagsanjanlaguna.com/uploads/documents/resolution-no-122-2026-1786432576.pdf",
  }),
  seed({
    id: "resolution-no-123-2026",
    slug: "resolution-no-123-2026",
    documentType: "resolution",
    number: "RESOLUTION NO. 123-2026",
    title:
      "A PROPOSED RESOLUTION OF THE SANGGUNIANG BAYAN GRANTING PERMIT TO THE PAGSANJAN PUBLIC MARKET VENDORS ASSOCIATION (PPMVA) TO MANAGE THE OPERATION OF TIANGGE PROJECT IN THE FRONTAGE AREA OF THE PAGSANJAN PUBLIC MARKET, BRGY. BI\u00d1AN, PAGSANJAN, LAGUNA EVERY FRIDAY, SATURDAY AND SUNDAY.",
    summary: "Approved August 3, 2026. Author: HON. NOEL L. CABELA.",
    date: "2026-08-03",
    year: "2026",
    authors: ["HON. NOEL L. CABELA"],
    sourceUrl:
      "https://www.pagsanjanlaguna.com/uploads/documents/resolution-no-123-2026-1786432629.pdf",
  }),
  seed({
    id: "resolution-no-124-2026",
    slug: "resolution-no-124-2026",
    documentType: "resolution",
    number: "RESOLUTION NO. 124-2026",
    title:
      "A RESOLUTION OF THE SANGGUNIANG BAYAN OF PAGSANJAN AUTHORIZING THE ASSISTANT MUNICIPAL TREASURER, MS. JOAL C. GUAN, TO CERTIFY THE AVAILABILITY OF FUNDS AND SIGN MUNICIPAL CHECKS DURING THE OFFICIAL LEAVE, OFFICIAL TRAVEL, AND TEMPORARY ABSENCE OF THE MUNICIPAL TREASURER.",
    summary:
      "Approved August 3, 2026. Authors: HON. MELVIN B. MADRIAGA, HON. RONIE S. LERON.",
    date: "2026-08-03",
    year: "2026",
    authors: ["HON. MELVIN B. MADRIAGA", "HON. RONIE S. LERON"],
    sourceUrl:
      "https://www.pagsanjanlaguna.com/uploads/documents/resolution-no-124-2026-1786432687.pdf",
  }),
  seed({
    id: "resolution-no-125-2026",
    slug: "resolution-no-125-2026",
    documentType: "resolution",
    number: "RESOLUTION NO. 125-2026",
    title:
      "A RESOLUTION OF THE SANGGUNIANG BAYAN REQUESTING THE FIRST LAGUNA ELECTRIC COOPERATIVE INC. (FLECO) TO REPLACE OR REMOVE ALL DILAPIDATED ELECTRIC POST AND ARRANGE DANGLING ELECTRIC AND SPAGHETTI WIRES WITHIN THE TERRITORIAL JURISDICTION OF THE MUNICIPALITY OF PAGSANJAN, PROVINCE OF LAGUNA.",
    summary:
      "Approved August 3, 2026. Author: HON. NATHANAEL C. BERNALES II.",
    date: "2026-08-03",
    year: "2026",
    authors: ["HON. NATHANAEL C. BERNALES II"],
    sourceUrl:
      "https://www.pagsanjanlaguna.com/uploads/documents/resolution-no-125-2026-1786432766.pdf",
  }),
  seed({
    id: "resolution-no-126-2026",
    slug: "resolution-no-126-2026",
    documentType: "resolution",
    number: "RESOLUTION NO. 126-2026",
    title:
      "A RESOLUTION OF THE SANGGUNIANG BAYAN REQUESTING THE PHILIPPINE LONG DISTANCE TELEPHONE COMPANY INC. (PLDT), GLOBE TELECOMS, DITO TELECOMMUNITY, CABLE VISION AND OTHER TELECOMMUNICATIONS AND CABLE COMPANY OPERATING WITHIN THE TERRITORIAL JURISDICTION OF THE MUNICIPALITY OF PAGSANJAN, PROVINCE OF LAGUNA TO REPLACE OR REMOVE ALL DILAPIDATED COMMUNICATION POST AND ARRANGE DANGLING CABLE AND INTERNET SPAGHETTI WIRES IN THE MUNICIPALITY.",
    summary:
      "Approved August 3, 2026. Author: HON. NATHANAEL C. BERNALES II.",
    date: "2026-08-03",
    year: "2026",
    authors: ["HON. NATHANAEL C. BERNALES II"],
    sourceUrl:
      "https://www.pagsanjanlaguna.com/uploads/documents/resolution-no-126-2026-1786432861.pdf",
  }),
  seed({
    id: "resolution-no-118-2026",
    slug: "resolution-no-118-2026",
    documentType: "resolution",
    number: "RESOLUTION NO. 118-2026",
    title:
      "A RESOLUTION DECLARING ONE (1) PERMANENTLY VACANT SEAT IN THE SANGGUNIANG BAYAN OF PAGSANJAN, PROVINCE OF LAGUNA.",
    summary: "Approved July 27, 2026. Author: HON. MELVIN B. MADRIAGA.",
    date: "2026-07-27",
    year: "2026",
    authors: ["HON. MELVIN B. MADRIAGA"],
    sourceUrl:
      "https://www.pagsanjanlaguna.com/uploads/documents/resolution-no-118-2026-1785377574.pdf",
  }),
];

export const legislativeDocuments: LegislativeDocument[] = [
  ...ordinances,
  ...resolutions,
];

export function getLegislativeBySlug(
  slug: string,
): LegislativeDocument | undefined {
  return legislativeDocuments.find((doc) => doc.slug === slug);
}

export function getOrdinances(): LegislativeDocument[] {
  return legislativeDocuments.filter((doc) => doc.documentType === "ordinance");
}

export function getResolutions(): LegislativeDocument[] {
  return legislativeDocuments.filter(
    (doc) => doc.documentType === "resolution",
  );
}

export function getLegislativeYears(
  docs: LegislativeDocument[] = legislativeDocuments,
): string[] {
  const years = new Set<string>();
  for (const doc of docs) {
    if (doc.year) years.add(doc.year);
  }
  return [...years].sort((a, b) => b.localeCompare(a));
}

export function getLegislativeTopics(
  docs: LegislativeDocument[] = legislativeDocuments,
): string[] {
  const topics = new Set<string>();
  for (const doc of docs) {
    for (const topic of doc.topics ?? []) topics.add(topic);
  }
  return [...topics].sort((a, b) => a.localeCompare(b));
}
