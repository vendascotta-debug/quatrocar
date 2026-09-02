/**
 * Parses a "YYYY-MM-DD" date-only string (as returned by Postgres `date`
 * columns) as a LOCAL calendar date, not UTC midnight.
 *
 * `new Date("2026-09-01")` is parsed as UTC midnight, which in Brazil
 * (UTC-3) becomes 2026-08-31 21:00 local — shifting every date back one
 * day whenever compared or displayed using the visitor's local timezone.
 */
export function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}
