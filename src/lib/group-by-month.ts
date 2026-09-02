import { parseLocalDate } from "./local-date";

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

export function monthLabel(dateStr: string) {
  const d = parseLocalDate(dateStr);
  return `${MESES[d.getMonth()]} de ${d.getFullYear()}`;
}

export function groupByMonth<T>(items: T[], getDate: (item: T) => string) {
  const groups = new Map<string, T[]>();

  for (const item of items) {
    // "YYYY-MM-DD" -> "YYYY-MM" — string-sliced, so it's immune to any
    // timezone reinterpretation of the date.
    const key = getDate(item).slice(0, 7);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(item);
  }

  return Array.from(groups.entries())
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .map(([key, groupItems]) => ({
      key,
      label: monthLabel(getDate(groupItems[0])),
      items: groupItems,
    }));
}
