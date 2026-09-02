import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Vehicle, MaintenanceRecord, FuelRecord } from "@/lib/types";
import { computeMaintenanceAlerts } from "@/lib/maintenance-alerts";
import { DashboardSummary } from "./summary";

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

  const registros = [
    ...(maintenance ?? []).map((m) => ({
      data: m.data,
      valor: Number(m.valor_total),
      tipo: "manutencao" as const,
      categoria: m.maintenance_categories?.grupo ?? null,
    })),
    ...(fuel ?? []).map((f) => ({
      data: f.data,
      valor: Number(f.valor),
      tipo: "combustivel" as const,
    })),
  ];

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

      <DashboardSummary registros={registros} />

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
                className="flex items-center gap-4 rounded-xl border border-sky-100 bg-sky-50 p-5 transition-colors hover:border-sky-300 hover:bg-sky-100/60"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-500 text-lg text-white">
                  🚗
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {v.marca} {v.modelo}
                  </h3>
                  <p className="text-sm text-sky-700">
                    {v.placa || "sem placa"} · {v.km_atual.toLocaleString("pt-BR")} km
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
