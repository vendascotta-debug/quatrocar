import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Vehicle, MaintenanceRecord, FuelRecord } from "@/lib/types";
import { computeMaintenanceAlerts } from "@/lib/maintenance-alerts";

function currency(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*")
    .returns<Vehicle[]>();

  const vehicleIds = (vehicles ?? []).map((v) => v.id);

  const [{ data: maintenance }, { data: fuel }] = await Promise.all([
    vehicleIds.length
      ? supabase
          .from("maintenance_records")
          .select("*, maintenance_categories(id, grupo, nome)")
          .in("vehicle_id", vehicleIds)
          .returns<MaintenanceRecord[]>()
      : Promise.resolve({ data: [] as MaintenanceRecord[] }),
    vehicleIds.length
      ? supabase
          .from("fuel_records")
          .select("*")
          .in("vehicle_id", vehicleIds)
          .returns<FuelRecord[]>()
      : Promise.resolve({ data: [] as FuelRecord[] }),
  ]);

  const now = new Date();
  const isSameMonth = (d: string) => {
    const date = new Date(d);
    return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
  };
  const isSameYear = (d: string) => new Date(d).getFullYear() === now.getFullYear();

  const allRecords = [
    ...(maintenance ?? []).map((m) => ({ data: m.data, valor: Number(m.valor_total) })),
    ...(fuel ?? []).map((f) => ({ data: f.data, valor: Number(f.valor) })),
  ];

  const gastosMes = allRecords.filter((r) => isSameMonth(r.data)).reduce((s, r) => s + r.valor, 0);
  const gastosAno = allRecords.filter((r) => isSameYear(r.data)).reduce((s, r) => s + r.valor, 0);
  const totalInvestido = allRecords.reduce((s, r) => s + r.valor, 0);

  const nome = (user?.user_metadata?.nome as string) || user?.email;

  const alertsByVehicle = (vehicles ?? [])
    .map((v) => ({
      vehicle: v,
      alerts: computeMaintenanceAlerts(
        v,
        (maintenance ?? []).filter((m) => m.vehicle_id === v.id)
      ).filter((a) => a.status !== "ok"),
    }))
    .filter((v) => v.alerts.length > 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Olá, {nome}</h1>
        <p className="text-neutral-600">Visão geral da sua frota.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-sm text-neutral-500">Gastos do mês</p>
          <p className="text-2xl font-semibold text-neutral-900">{currency(gastosMes)}</p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-sm text-neutral-500">Gastos do ano</p>
          <p className="text-2xl font-semibold text-neutral-900">{currency(gastosAno)}</p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-sm text-neutral-500">Total investido</p>
          <p className="text-2xl font-semibold text-neutral-900">{currency(totalInvestido)}</p>
        </div>
      </div>

      {alertsByVehicle.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-neutral-900">Manutenções pendentes</h2>
          <div className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
            {alertsByVehicle.flatMap(({ vehicle, alerts }) =>
              alerts.map((a) => (
                <Link
                  key={`${vehicle.id}-${a.nome}`}
                  href={`/veiculos/${vehicle.id}`}
                  className="flex items-center justify-between px-4 py-3 hover:bg-neutral-50"
                >
                  <div>
                    <p className="font-medium text-neutral-900">
                      {vehicle.marca} {vehicle.modelo} · {a.nome}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {a.proximoKm !== null && `Próxima aos ${a.proximoKm.toLocaleString("pt-BR")} km`}
                      {a.proximoKm !== null && a.proximaData !== null && " · "}
                      {a.proximaData !== null &&
                        `até ${new Date(a.proximaData).toLocaleDateString("pt-BR")}`}
                    </p>
                  </div>
                  <span
                    className={
                      "rounded-full px-3 py-1 text-xs font-medium " +
                      (a.status === "atrasado"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700")
                    }
                  >
                    {a.status === "atrasado" ? "Atrasado" : "Próximo"}
                  </span>
                </Link>
              ))
            )}
          </div>
        </section>
      )}

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">Veículos</h2>
          <Link href="/veiculos" className="text-sm font-medium text-neutral-900 underline">
            Ver todos
          </Link>
        </div>

        {!vehicles?.length ? (
          <div className="rounded-xl border border-dashed border-neutral-300 p-10 text-center text-neutral-600">
            Você ainda não cadastrou nenhum veículo.{" "}
            <Link href="/veiculos/novo" className="font-medium text-neutral-900 underline">
              Cadastrar agora
            </Link>
            .
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {vehicles.map((v) => (
              <Link
                key={v.id}
                href={`/veiculos/${v.id}`}
                className="rounded-xl border border-neutral-200 bg-white p-5 hover:border-neutral-400"
              >
                <h3 className="text-lg font-semibold text-neutral-900">
                  {v.marca} {v.modelo}
                </h3>
                <p className="text-sm text-neutral-600">
                  {v.placa || "sem placa"} · {v.km_atual.toLocaleString("pt-BR")} km
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
