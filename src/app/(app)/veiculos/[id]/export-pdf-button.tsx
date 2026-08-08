"use client";

import { useState } from "react";
import type { Vehicle, MaintenanceRecord, FuelRecord } from "@/lib/types";

function currency(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
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
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const { default: jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;

      const doc = new jsPDF();
      const totalManutencao = maintenance.reduce((s, m) => s + Number(m.valor_total), 0);
      const totalCombustivel = fuel.reduce((s, f) => s + Number(f.valor), 0);

      doc.setFontSize(16);
      doc.text("QuatroCar — Relatório do veículo", 14, 18);

      doc.setFontSize(11);
      doc.text(
        `${vehicle.marca} ${vehicle.modelo} ${vehicle.versao ?? ""}`.trim(),
        14,
        27
      );
      doc.setFontSize(9);
      doc.setTextColor(100);
      doc.text(
        `Placa: ${vehicle.placa || "—"}   Km atual: ${vehicle.km_atual.toLocaleString("pt-BR")}   Emitido em: ${new Date().toLocaleDateString("pt-BR")}`,
        14,
        33
      );

      doc.setTextColor(0);
      doc.setFontSize(10);
      doc.text(`Total em manutenção: ${currency(totalManutencao)}`, 14, 43);
      doc.text(`Total em combustível: ${currency(totalCombustivel)}`, 14, 49);
      doc.text(`Total investido: ${currency(totalManutencao + totalCombustivel)}`, 14, 55);

      let lastY = 62;

      if (maintenance.length) {
        doc.setFontSize(12);
        doc.text("Histórico de manutenção", 14, lastY);
        autoTable(doc, {
          startY: lastY + 4,
          head: [["Data", "Km", "Categoria", "Oficina/Mecânico", "Valor"]],
          body: maintenance.map((m) => [
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

      if (fuel.length) {
        doc.setFontSize(12);
        doc.text("Histórico de abastecimento", 14, lastY);
        autoTable(doc, {
          startY: lastY + 4,
          head: [["Data", "Km", "Combustível", "Litros", "Posto", "Valor"]],
          body: fuel.map((f) => [
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

      const nomeArquivo = `quatrocar-${vehicle.marca}-${vehicle.modelo}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");
      doc.save(`${nomeArquivo}.pdf`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={loading}
      className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 disabled:opacity-50"
    >
      {loading ? "Gerando..." : "Exportar PDF"}
    </button>
  );
}
