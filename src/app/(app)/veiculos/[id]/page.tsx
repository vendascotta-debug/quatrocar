import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Vehicle, MaintenanceRecord, FuelRecord } from "@/lib/types";
import { computeMaintenanceAlerts } from "@/lib/maintenance-alerts";
import { groupByMonth } from "@/lib/group-by-month";
import { ExportPdfButton } from "./export-pdf-button";

function currency(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatAno(fabricacao: number | null, modelo: number | null) {
  if (!fabricacao && !modelo) return "";
  if (fabricacao && modelo && fabricacao !== modelo) return `${fabricacao}/${modelo} · `;
  return `${fabricacao ?? modelo} · `;
}

export default async function VeiculoDetalhePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: vehicle }, { data: maintenance }, { data: fuel }] = await Promise.all([
    supabase.from("vehicles").select("*").eq("id", id).single<Vehicle>(),
    supabase
      .from("maintenance_records")
      .select("*, maintenance_categories(id, grupo, nome)")
      .eq("vehicle_id", id)
      .order("data", { ascending: false })
      .returns<MaintenanceRecord[]>(),
    supabase
      .from("fuel_records")
      .select("*")
      .eq("vehicle_id", id)
      .order("data", { ascending: false })
      .returns<FuelRecord[]>(),
  ]);

  if (!vehicle) notFound();

  const totalManutencao = (maintenance ?? []).reduce((s, m) => s + Number(m.valor_total), 0);
  const totalCombustivel = (fuel ?? []).reduce((s, f) => s + Number(f.valor), 0);
  const alerts = computeMaintenanceAlerts(vehicle, maintenance ?? []);
  const manutencaoPorMes = groupByMonth(maintenance ?? [], (m) => m.data);
  const abastecimentoPorMes = groupByMonth(fuel ?? [], (f) => f.data);

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-neutral-500">{vehicle.categoria || "Veículo"}</p>
          <h1 className="text-2xl font-semibold text-neutral-900">
            {vehicle.marca} {vehicle.modelo} {vehicle.versao}
          </h1>
          <p className="text-sm text-neutral-600">
            {formatAno(vehicle.ano_fabricacao, vehicle.ano_modelo)}
            {vehicle.placa || "sem placa"} · {vehicle.km_atual.toLocaleString("pt-BR")} km
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <ExportPdfButton vehicle={vehicle} maintenance={maintenance ?? []} fuel={fuel ?? []} />
          <Link
            href={`/veiculos/${id}/editar`}
            className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
          >
            Editar veículo
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-sm text-neutral-500">Total em manutenção</p>
          <p className="text-xl font-semibold text-neutral-900">
            {totalManutencao.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-sm text-neutral-500">Total em combustível</p>
          <p className="text-xl font-semibold text-neutral-900">
            {totalCombustivel.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-sm text-neutral-500">Total investido</p>
          <p className="text-xl font-semibold text-neutral-900">
            {(totalManutencao + totalCombustivel).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
      </div>

      {alerts.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-neutral-900">Próximas manutenções</h2>
          <div className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
            {alerts.map((a) => (
              <div key={a.nome} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="font-medium text-neutral-900">{a.nome}</p>
                  <p className="text-sm text-neutral-500">
                    Última troca: {new Date(a.ultimaData).toLocaleDateString("pt-BR")} ·{" "}
                    {a.ultimoKm.toLocaleString("pt-BR")} km
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
                      : a.status === "proximo"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-green-100 text-green-700")
                  }
                >
                  {a.status === "atrasado" ? "Atrasado" : a.status === "proximo" ? "Próximo" : "Em dia"}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">Manutenção</h2>
          <Link
            href={`/veiculos/${id}/manutencao/nova`}
            className="rounded-lg bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-neutral-700"
          >
            + Registrar manutenção
          </Link>
        </div>
        {!maintenance?.length ? (
          <p className="text-sm text-neutral-500">Nenhum registro ainda.</p>
        ) : (
          <div className="space-y-5">
            {manutencaoPorMes.map((grupo) => {
              const subtotal = grupo.items.reduce((s, m) => s + Number(m.valor_total), 0);
              return (
                <div key={grupo.key}>
                  <div className="mb-2 flex items-center justify-between px-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      {grupo.label}
                    </p>
                    <p className="text-xs font-medium text-neutral-500">{currency(subtotal)}</p>
                  </div>
                  <div className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
                    {grupo.items.map((m) => (
                      <Link
                        key={m.id}
                        href={`/veiculos/${id}/manutencao/${m.id}`}
                        className="flex items-center justify-between px-4 py-3 hover:bg-neutral-50"
                      >
                        <div>
                          <p className="font-medium text-neutral-900">
                            {m.maintenance_categories?.nome || m.subtipo || "Manutenção"}
                          </p>
                          <p className="text-sm text-neutral-500">
                            {new Date(m.data).toLocaleDateString("pt-BR")} ·{" "}
                            {m.km.toLocaleString("pt-BR")} km
                          </p>
                        </div>
                        <p className="font-medium text-neutral-900">
                          {currency(Number(m.valor_total))}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">Abastecimento</h2>
          <Link
            href={`/veiculos/${id}/abastecimento/novo`}
            className="rounded-lg bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-neutral-700"
          >
            + Registrar abastecimento
          </Link>
        </div>
        {!fuel?.length ? (
          <p className="text-sm text-neutral-500">Nenhum registro ainda.</p>
        ) : (
          <div className="space-y-5">
            {abastecimentoPorMes.map((grupo) => {
              const subtotal = grupo.items.reduce((s, f) => s + Number(f.valor), 0);
              return (
                <div key={grupo.key}>
                  <div className="mb-2 flex items-center justify-between px-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      {grupo.label}
                    </p>
                    <p className="text-xs font-medium text-neutral-500">{currency(subtotal)}</p>
                  </div>
                  <div className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
                    {grupo.items.map((f) => (
                      <Link
                        key={f.id}
                        href={`/veiculos/${id}/abastecimento/${f.id}`}
                        className="flex items-center justify-between px-4 py-3 hover:bg-neutral-50"
                      >
                        <div>
                          <p className="font-medium text-neutral-900">
                            {f.combustivel} · {f.litros}L
                          </p>
                          <p className="text-sm text-neutral-500">
                            {new Date(f.data).toLocaleDateString("pt-BR")} ·{" "}
                            {f.posto || "posto não informado"} · {f.km.toLocaleString("pt-BR")} km
                          </p>
                        </div>
                        <p className="font-medium text-neutral-900">{currency(Number(f.valor))}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
