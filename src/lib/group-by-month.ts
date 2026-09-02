const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

export function monthLabel(dateStr: string) {
  const d = new Date(dateStr);
  return `${MESES[d.getMonth()]} de ${d.getFullYear()}`;
}

export function groupByMonth<T>(items: T[], getDate: (item: T) => string) {
  const groups = new Map<string, T[]>();

  for (const item of items) {
    const d = new Date(getDate(item));
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
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
