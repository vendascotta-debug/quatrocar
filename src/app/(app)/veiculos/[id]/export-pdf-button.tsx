"use client";

import { useState } from "react";
import type { Vehicle, MaintenanceRecord, FuelRecord } from "@/lib/types";

function currency(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

type Periodo = "mes" | "mes_passado" | "3m" | "6m" | "ano" | "tudo" | "custom";

const periodoLabels: Record<Periodo, string> = {
  mes: "Este mês",
  mes_passado: "Mês passado",
  "3m": "Últimos 3 meses",
  "6m": "Últimos 6 meses",
  ano: "Este ano",
  tudo: "Todo o período",
  custom: "Período personalizado",
};

function getRange(periodo: Periodo, customStart: string, customEnd: string) {
  const now = new Date();
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const endOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);

  switch (periodo) {
    case "mes":
      return { start: new Date(now.getFullYear(), now.getMonth(), 1), end: endOfDay(now) };
    case "mes_passado": {
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
      return { start, end };
    }
    case "3m":
      return { start: new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()), end: endOfDay(now) };
    case "6m":
      return { start: new Date(now.getFullYear(), now.getMonth() - 6, now.getDate()), end: endOfDay(now) };
    case "ano":
      return { start: new Date(now.getFullYear(), 0, 1), end: endOfDay(now) };
    case "custom":
      return {
        start: customStart ? startOfDay(new Date(customStart)) : new Date(0),
        end: customEnd ? endOfDay(new Date(customEnd)) : endOfDay(now),
      };
    case "tudo":
    default:
      return { start: new Date(0), end: endOfDay(now) };
  }
}

export function ExportPdfButton({
  vehicle,
  maintenance,
  fuel,
}: {
  vehicle: Vehicle;
  maintenance: MaintenanceRecord[];
  fuel: FuelRecord[];
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [periodo, setPeriodo] = useState<Periodo>("mes");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  const handleExport = async () => {
    setLoading(true);
    try {
      const { start, end } = getRange(periodo, customStart, customEnd);
      const maintenanceFiltrada = maintenance.filter((m) => {
        const d = new Date(m.data);
        return d >= start && d <= end;
      });
      const fuelFiltrado = fuel.filter((f) => {
        const d = new Date(f.data);
        return d >= start && d <= end;
      });

      const { default: jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;

      const doc = new jsPDF();
      const totalManutencao = maintenanceFiltrada.reduce((s, m) => s + Number(m.valor_total), 0);
      const totalCombustivel = fuelFiltrado.reduce((s, f) => s + Number(f.valor), 0);

      doc.setFontSize(16);
      doc.text("QuatroCar — Relatório do veículo", 14, 18);

      doc.setFontSize(11);
      doc.text(`${vehicle.marca} ${vehicle.modelo} ${vehicle.versao ?? ""}`.trim(), 14, 27);
      doc.setFontSize(9);
      doc.setTextColor(100);
      doc.text(
        `Placa: ${vehicle.placa || "—"}   Km atual: ${vehicle.km_atual.toLocaleString("pt-BR")}   Emitido em: ${new Date().toLocaleDateString("pt-BR")}`,
        14,
        33
      );
      doc.text(`Período: ${periodoLabels[periodo]}`, 14, 38);

      doc.setTextColor(0);
      doc.setFontSize(10);
      doc.text(`Total em manutenção: ${currency(totalManutencao)}`, 14, 48);
      doc.text(`Total em combustível: ${currency(totalCombustivel)}`, 14, 54);
      doc.text(`Total investido: ${currency(totalManutencao + totalCombustivel)}`, 14, 60);

      let lastY = 67;

      if (maintenanceFiltrada.length) {
        doc.setFontSize(12);
        doc.text("Histórico de manutenção", 14, lastY);
        autoTable(doc, {
          startY: lastY + 4,
          head: [["Data", "Km", "Categoria", "Oficina/Mecânico", "Valor"]],
          body: maintenanceFiltrada.map((m) => [
            new Date(m.data).toLocaleDateString("pt-BR"),
            m.km.toLocaleString("pt-BR"),
            m.maintenance_categories?.nome || m.subtipo || "—",
            m.mecanico || "—",
            currency(Number(m.valor_total)),
          ]),
          styles: { fontSize: 8 },
          headStyles: { fillColor: [15, 23, 42] },
        });
        // @ts-expect-error - lastAutoTable is added by the plugin at runtime
        lastY = doc.lastAutoTable.finalY + 12;
      }

      if (fuelFiltrado.length) {
        doc.setFontSize(12);
        doc.text("Histórico de abastecimento", 14, lastY);
        autoTable(doc, {
          startY: lastY + 4,
          head: [["Data", "Km", "Combustível", "Litros", "Posto", "Valor"]],
          body: fuelFiltrado.map((f) => [
            new Date(f.data).toLocaleDateString("pt-BR"),
            f.km.toLocaleString("pt-BR"),
            f.combustivel,
            String(f.litros),
            f.posto || "—",
            currency(Number(f.valor)),
          ]),
          styles: { fontSize: 8 },
          headStyles: { fillColor: [15, 23, 42] },
        });
      }

      if (!maintenanceFiltrada.length && !fuelFiltrado.length) {
        doc.setFontSize(11);
        doc.setTextColor(120);
        doc.text("Nenhum registro encontrado nesse período.", 14, lastY);
      }

      const nomeArquivo = `quatrocar-${vehicle.marca}-${vehicle.modelo}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");
      doc.save(`${nomeArquivo}.pdf`);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
      >
        Exportar PDF
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => !loading && setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
          >
            <h2 className="text-lg font-semibold text-neutral-900">Exportar relatório</h2>
            <p className="mt-1 text-sm text-neutral-500">Escolha o período do relatório em PDF.</p>

            <div className="mt-4 space-y-2">
              {(Object.keys(periodoLabels) as Periodo[]).map((key) => (
                <label
                  key={key}
                  className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-sm has-[:checked]:border-neutral-900 has-[:checked]:bg-neutral-50"
                >
                  <input
                    type="radio"
                    name="periodo"
                    value={key}
                    checked={periodo === key}
                    onChange={() => setPeriodo(key)}
                  />
                  {periodoLabels[key]}
                </label>
              ))}
            </div>

            {periodo === "custom" && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-600">De</label>
                  <input
                    type="date"
                    value={customStart}
                    onChange={(e) => setCustomStart(e.target.value)}
                    className="w-full rounded-lg border border-neutral-300 px-2 py-1.5 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-600">Até</label>
                  <input
                    type="date"
                    value={customEnd}
                    onChange={(e) => setCustomEnd(e.target.value)}
                    className="w-full rounded-lg border border-neutral-300 px-2 py-1.5 text-sm"
                  />
                </div>
              </div>
            )}

            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="flex-1 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleExport}
                disabled={loading}
                className="flex-1 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-50"
              >
                {loading ? "Gerando..." : "Gerar PDF"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
