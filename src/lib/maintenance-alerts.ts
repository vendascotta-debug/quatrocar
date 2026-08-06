import type { MaintenanceRecord, Vehicle } from "@/lib/types";

export type MaintenanceAlert = {
  nome: string;
  ultimaData: string;
  ultimoKm: number;
  proximoKm: number | null;
  proximaData: string | null;
  status: "atrasado" | "proximo" | "ok";
  kmRestante: number | null;
  diasRestantes: number | null;
};

const KM_AVISO_ANTECIPADO = 1000;
const DIAS_AVISO_ANTECIPADO = 30;

function addMonths(dateStr: string, months: number) {
  const d = new Date(dateStr);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
}

export function computeMaintenanceAlerts(
  vehicle: Vehicle,
  records: MaintenanceRecord[]
): MaintenanceAlert[] {
  const comIntervalo = records.filter((r) => r.intervalo_km || r.intervalo_meses);

  const porChave = new Map<string, MaintenanceRecord>();
  for (const r of comIntervalo) {
    const chave = r.categoria_id ?? r.subtipo ?? r.id;
    const atual = porChave.get(chave);
    if (!atual || new Date(r.data) > new Date(atual.data)) {
      porChave.set(chave, r);
    }
  }

  const alerts: MaintenanceAlert[] = [];
  const hoje = new Date();

  for (const r of porChave.values()) {
    const proximoKm = r.intervalo_km ? r.km + r.intervalo_km : null;
    const proximaData = r.intervalo_meses ? addMonths(r.data, r.intervalo_meses) : null;

    const kmRestante = proximoKm !== null ? proximoKm - vehicle.km_atual : null;
    const diasRestantes =
      proximaData !== null
        ? Math.ceil((new Date(proximaData).getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24))
        : null;

    let status: MaintenanceAlert["status"] = "ok";
    const atrasadoPorKm = kmRestante !== null && kmRestante <= 0;
    const atrasadoPorData = diasRestantes !== null && diasRestantes <= 0;
    const proximoPorKm = kmRestante !== null && kmRestante <= KM_AVISO_ANTECIPADO;
    const proximoPorData = diasRestantes !== null && diasRestantes <= DIAS_AVISO_ANTECIPADO;

    if (atrasadoPorKm || atrasadoPorData) status = "atrasado";
    else if (proximoPorKm || proximoPorData) status = "proximo";

    alerts.push({
      nome: r.maintenance_categories?.nome || r.subtipo || "Manutenção",
      ultimaData: r.data,
      ultimoKm: r.km,
      proximoKm,
      proximaData,
      status,
      kmRestante,
      diasRestantes,
    });
  }

  const ordem = { atrasado: 0, proximo: 1, ok: 2 };
  return alerts.sort((a, b) => ordem[a.status] - ordem[b.status]);
}
