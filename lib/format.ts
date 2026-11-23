const MONTH_YEAR = new Intl.DateTimeFormat("en-PH", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const LONG_DATE = new Intl.DateTimeFormat("en-PH", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * Parses the "YYYY", "YYYY-MM", and "YYYY-MM-DD" civic data formats.
 * Returns null for anything else, including impossible dates such as 2026-02-31.
 */
function parseIsoDate(value: string): Date | null {
  const match = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = match[2] ? Number(match[2]) : 1;
  const day = match[3] ? Number(match[3]) : 1;

  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
}

/**
 * Formats verification dates for display.
 * Accepts "YYYY" → "2026", "YYYY-MM" → "September 2026", and
 * "YYYY-MM-DD" → "September 3, 2026". Anything unparsable is returned
 * unchanged so no fake dates are invented.
 */
export function formatMonthYear(value: string): string {
  const date = parseIsoDate(value);
  if (!date) return value;
  if (/^\d{4}$/.test(value)) return String(date.getUTCFullYear());
  if (/^\d{4}-\d{2}$/.test(value)) return MONTH_YEAR.format(date);
  return LONG_DATE.format(date);
}

/**
 * Formats a full "YYYY-MM-DD" date → "September 3, 2026". Values that are
 * not full ISO dates are returned unchanged.
 */
export function formatLongDate(value: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = parseIsoDate(value);
  return date ? LONG_DATE.format(date) : value;
}
