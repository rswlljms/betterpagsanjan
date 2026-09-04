const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Formats verification dates for display.
 * Accepts "YYYY-MM" → "September 2026" and "YYYY-MM-DD" → "September 3, 2026".
 * Anything unparsable is returned unchanged so no fake dates are invented.
 */
export function formatMonthYear(value: string): string {
  const match = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/.exec(value);
  if (!match) return value;
  const [, year, month, day] = match;
  const monthName = month ? MONTHS[Number(month) - 1] : undefined;
  if (!monthName) return year;
  if (day) return `${monthName} ${Number(day)}, ${year}`;
  return `${monthName} ${year}`;
}
