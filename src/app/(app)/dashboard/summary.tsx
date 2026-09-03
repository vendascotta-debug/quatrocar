"use client";

import { useMemo, useState } from "react";
import { parseLocalDate } from "@/lib/local-date";
import { CategoryPie } from "@/components/category-pie";

type Registro = {
  data: string;
  valor: number;
  tipo: "manutencao" | "combustivel";
  categoria?: string | null;
};

type Periodo = "dia" | "semana" | "mes" | "ano";

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

  const { manutencao, combustivel, total, doPeriodo } = useMemo(() => {
    const { start, end } = getRange(periodo, ref);
    let manutencao = 0;
    let combustivel = 0;
    const doPeriodo: Registro[] = [];

    for (const r of registros) {
      const d = parseLocalDate(r.data);
      if (d < start || d > end) continue;

      doPeriodo.push(r);
      if (r.tipo === "manutencao") manutencao += r.valor;
      else combustivel += r.valor;
    }

    return { manutencao, combustivel, total: manutencao + combustivel, doPeriodo };
  }, [registros, periodo, ref]);

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

      {doPeriodo.length > 0 && (
        <div className="mt-6">
          <CategoryPie registros={doPeriodo} />
        </div>
      )}
    </div>
  );
}
