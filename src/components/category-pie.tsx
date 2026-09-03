// Categorical palette (validated: node scripts/validate_palette.js — 6 slots, light mode).
// Fixed order, assigned by rank (largest category first), never cycled.
const CATEGORY_COLORS = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4", "#008300"];
const SURFACE = "#fcfcfb";
const MAX_SLICES = 6;

function currency(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export type CategoriaRegistro = {
  valor: number;
  categoria?: string | null;
  tipo: "manutencao" | "combustivel";
};

export function CategoryPie({ registros, titulo = "Despesas por categoria" }: { registros: CategoriaRegistro[]; titulo?: string }) {
  const porCategoria = new Map<string, number>();
  let total = 0;

  for (const r of registros) {
    total += r.valor;
    const label = r.tipo === "combustivel" ? "Combustível" : r.categoria || "Outros";
    porCategoria.set(label, (porCategoria.get(label) ?? 0) + r.valor);
  }

  let entries = Array.from(porCategoria.entries())
    .filter(([, valor]) => valor > 0)
    .sort((a, b) => b[1] - a[1]);

  if (entries.length > MAX_SLICES) {
    const top = entries.slice(0, MAX_SLICES - 1);
    const outrosValor = entries.slice(MAX_SLICES - 1).reduce((s, [, v]) => s + v, 0);
    entries = [...top, ["Outros", outrosValor]];
  }

  const fatias = entries.map(([label, valor], i) => ({
    label,
    valor,
    pct: total > 0 ? (valor / total) * 100 : 0,
    color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
  }));

  if (fatias.length === 0) return null;

  const gapDeg = fatias.length > 1 ? 1.5 : 0;
  const { segments } = fatias.reduce<{ acc: number; segments: string[] }>(
    (state, f) => {
      const startDeg = (state.acc / 100) * 360;
      const nextAcc = state.acc + f.pct;
      const endDeg = (nextAcc / 100) * 360;
      const segment = `${f.color} ${startDeg}deg ${Math.max(startDeg, endDeg - gapDeg)}deg, ${SURFACE} ${Math.max(startDeg, endDeg - gapDeg)}deg ${endDeg}deg`;
      return { acc: nextAcc, segments: [...state.segments, segment] };
    },
    { acc: 0, segments: [] }
  );
  const stops = segments.join(", ");

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{titulo}</p>

      <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row sm:items-center">
        <div
          role="img"
          aria-label={`Gráfico de despesas por categoria: ${fatias
            .map((f) => `${f.label} ${f.pct.toFixed(0)}%`)
            .join(", ")}`}
          className="relative h-36 w-36 shrink-0 rounded-full"
          style={{ background: `conic-gradient(${stops})` }}
        >
          <div className="absolute inset-3 flex flex-col items-center justify-center rounded-full bg-white text-center">
            <span className="text-[10px] uppercase tracking-wide text-neutral-400">Total</span>
            <span className="text-lg font-bold text-neutral-900">{currency(total)}</span>
          </div>
        </div>

        <ul className="w-full flex-1 space-y-2">
          {fatias.map((f) => (
            <li key={f.label} className="flex items-center justify-between gap-2 text-sm">
              <span className="flex items-center gap-2 text-neutral-700">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: f.color }}
                />
                {f.label}
              </span>
              <span className="flex items-center gap-2">
                <span className="text-neutral-500">{currency(f.valor)}</span>
                <span className="w-10 text-right font-medium text-neutral-900">
                  {f.pct.toFixed(0)}%
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
