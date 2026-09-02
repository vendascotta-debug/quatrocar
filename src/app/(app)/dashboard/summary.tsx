"use client";

import { useMemo, useState } from "react";

type Registro = {
  data: string;
  valor: number;
  tipo: "manutencao" | "combustivel";
  categoria?: string | null;
};

type Periodo = "dia" | "semana" | "mes" | "ano";

// Categorical palette (validated: node scripts/validate_palette.js — 6 slots, light mode).
// Fixed order, assigned by rank (largest category first), never cycled.
const CATEGORY_COLORS = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4", "#008300"];
const SURFACE = "#fcfcfb";
const MAX_SLICES = 6;

function currency(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function startOfWeek(d: Date) {
  const date = new Date(d);
  const day = date.getDay();
  date.setDate(date.getDate() - day);
  date.setHours(0, 0, 0, 0);
  return date;
}

function getRange(periodo: Periodo, ref: Date) {
  const start = new Date(ref);
  const end = new Date(ref);

  if (periodo === "dia") {
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
  } else if (periodo === "semana") {
    const s = startOfWeek(ref);
    const e = new Date(s);
    e.setDate(e.getDate() + 6);
    e.setHours(23, 59, 59, 999);
    return { start: s, end: e };
  } else if (periodo === "mes") {
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    end.setMonth(end.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);
  } else {
    start.setMonth(0, 1);
    start.setHours(0, 0, 0, 0);
    end.setMonth(11, 31);
    end.setHours(23, 59, 59, 999);
  }

  return { start, end };
}

function shiftRef(periodo: Periodo, ref: Date, dir: 1 | -1) {
  const d = new Date(ref);
  if (periodo === "dia") d.setDate(d.getDate() + dir);
  else if (periodo === "semana") d.setDate(d.getDate() + 7 * dir);
  else if (periodo === "mes") d.setMonth(d.getMonth() + dir);
  else d.setFullYear(d.getFullYear() + dir);
  return d;
}

function labelForRange(periodo: Periodo, ref: Date) {
  if (periodo === "dia") {
    const hoje = new Date();
    const isHoje = ref.toDateString() === hoje.toDateString();
    return isHoje ? `Hoje, ${ref.toLocaleDateString("pt-BR")}` : ref.toLocaleDateString("pt-BR");
  }
  if (periodo === "semana") {
    const s = startOfWeek(ref);
    const e = new Date(s);
    e.setDate(e.getDate() + 6);
    return `${s.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })} – ${e.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}`;
  }
  if (periodo === "mes") {
    return ref.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  }
  return String(ref.getFullYear());
}

const periodos: { key: Periodo; label: string }[] = [
  { key: "dia", label: "Dia" },
  { key: "semana", label: "Semana" },
  { key: "mes", label: "Mês" },
  { key: "ano", label: "Ano" },
];

export function DashboardSummary({ registros }: { registros: Registro[] }) {
  const [periodo, setPeriodo] = useState<Periodo>("mes");
  const [ref, setRef] = useState(() => new Date());

  const { manutencao, combustivel, total, fatias } = useMemo(() => {
    const { start, end } = getRange(periodo, ref);
    let manutencao = 0;
    let combustivel = 0;
    const porCategoria = new Map<string, number>();

    for (const r of registros) {
      const d = new Date(r.data);
      if (d < start || d > end) continue;

      if (r.tipo === "manutencao") {
        manutencao += r.valor;
        const label = r.categoria || "Outros";
        porCategoria.set(label, (porCategoria.get(label) ?? 0) + r.valor);
      } else {
        combustivel += r.valor;
        porCategoria.set("Combustível", (porCategoria.get("Combustível") ?? 0) + r.valor);
      }
    }

    const total = manutencao + combustivel;

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

    return { manutencao, combustivel, total, fatias };
  }, [registros, periodo, ref]);

  const stops = useMemo(() => {
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

    return segments.join(", ");
  }, [fatias]);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="grid grid-cols-4 gap-1 rounded-lg bg-neutral-100 p-1">
        {periodos.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => {
              setPeriodo(p.key);
              setRef(new Date());
            }}
            className={
              "rounded-md py-1.5 text-sm font-medium transition-colors " +
              (periodo === p.key
                ? "bg-white text-neutral-900 shadow-sm"
                : "text-neutral-500 hover:text-neutral-700")
            }
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3 text-sm text-neutral-600">
        <button
          type="button"
          aria-label="Período anterior"
          onClick={() => setRef((r) => shiftRef(periodo, r, -1))}
          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-neutral-100"
        >
          ‹
        </button>
        <span className="min-w-[10rem] text-center font-medium capitalize">
          {labelForRange(periodo, ref)}
        </span>
        <button
          type="button"
          aria-label="Próximo período"
          onClick={() => setRef((r) => shiftRef(periodo, r, 1))}
          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-neutral-100"
        >
          ›
        </button>
      </div>

      <div className="mt-4 rounded-xl bg-neutral-50 p-4 text-center">
        <p className="text-xs text-neutral-500">Total gasto no período</p>
        <p className="text-3xl font-bold text-neutral-900">{currency(total)}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 rounded-xl border border-sky-100 bg-sky-50 p-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500 text-white">
            🔧
          </span>
          <div>
            <p className="text-xs text-neutral-500">Manutenção</p>
            <p className="font-semibold text-sky-700">{currency(manutencao)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-amber-100 bg-amber-50 p-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white">
            ⛽
          </span>
          <div>
            <p className="text-xs text-neutral-500">Combustível</p>
            <p className="font-semibold text-amber-700">{currency(combustivel)}</p>
          </div>
        </div>
      </div>

      {fatias.length > 0 && (
        <div className="mt-6 border-t border-neutral-100 pt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Despesas por categoria
          </p>

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
      )}
    </div>
  );
}
