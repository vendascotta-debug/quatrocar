import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Vehicle, MaintenanceRecord, FuelRecord } from "@/lib/types";
import { computeMaintenanceAlerts } from "@/lib/maintenance-alerts";
import { groupByMonth } from "@/lib/group-by-month";
import { ExportPdfButton } from "./export-pdf-button";
import { FipeCard } from "./fipe-card";
import { CategoryPie } from "@/components/category-pie";

function currency(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatAno(fabricacao: number | null, modelo: number | null) {
  if (!fabricacao && !modelo) return "";
  if (fabricacao && modelo && fabricacao !== modelo) return `${fabricacao}/${modelo} · `;
  return `${fabricacao ?? modelo} · `;
}

const GRUPO_DOCUMENTACAO = "Documentação e Obrigações";
const GRUPO_SEGURO = "Seguro e Proteção";
const ehGrupo = (m: MaintenanceRecord, grupo: string) => m.maintenance_categories?.grupo === grupo;

function MaintenanceSection({
  vehicleId,
  titulo,
  itens,
  vazio,
  fallbackNome,
  tipo,
}: {
  vehicleId: string;
  titulo: string;
  itens: MaintenanceRecord[];
  vazio: string;
  fallbackNome: string;
  tipo: "manutencao" | "documentacao" | "seguro";
}) {
  const porMes = groupByMonth(itens, (m) => m.data);
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-neutral-900">{titulo}</h2>
        <Link
          href={`/veiculos/${vehicleId}/manutencao/nova?tipo=${tipo}`}
          className="rounded-lg bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-neutral-700"
        >
          + Registrar
        </Link>
      </div>
      {!itens.length ? (
        <p className="text-sm text-neutral-500">{vazio}</p>
      ) : (
        <div className="space-y-5">
          {porMes.map((grupo) => {
            const subtotal = grupo.items.reduce((s, m) => s + Number(m.valor_total), 0);
            return (
              <details key={grupo.key} className="group rounded-xl border border-neutral-200 bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-900">
                  <span className="flex items-center gap-2">
                    <span className="text-neutral-400 transition-transform group-open:rotate-90">›</span>
                    <span className="text-xs font-semibold uppercase tracking-wide text-neutral-600">
                      {grupo.label}
                    </span>
                    <span className="text-xs text-neutral-400">
                      ({grupo.items.length} {grupo.items.length === 1 ? "registro" : "registros"})
                    </span>
                  </span>
                  <span className="text-sm font-medium text-neutral-700">{currency(subtotal)}</span>
                </summary>
                <div className="divide-y divide-neutral-200 border-t border-neutral-200">
                  {grupo.items.map((m) => (
                    <Link
                      key={m.id}
                      href={`/veiculos/${vehicleId}/manutencao/${m.id}`}
                      className="flex items-center justify-between px-4 py-3 hover:bg-neutral-50"
                    >
                      <div>
                        <p className="font-medium text-neutral-900">
                          {m.maintenance_categories?.nome || m.subtipo || fallbackNome}
                        </p>
                        <p className="text-sm text-neutral-500">
                          {new Date(m.data).toLocaleDateString("pt-BR")} ·{" "}
                          {m.km.toLocaleString("pt-BR")} km
                        </p>
                      </div>
                      <p className="font-medium text-neutral-900">{currency(Number(m.valor_total))}</p>
                    </Link>
                  ))}
                </div>
              </details>
            );
          })}
        </div>
      )}
    </section>
  );
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

  const manutencaoMecanica = (maintenance ?? []).filter(
    (m) => !ehGrupo(m, GRUPO_DOCUMENTACAO) && !ehGrupo(m, GRUPO_SEGURO)
  );
  const documentacao = (maintenance ?? []).filter((m) => ehGrupo(m, GRUPO_DOCUMENTACAO));
  const seguros = (maintenance ?? []).filter((m) => ehGrupo(m, GRUPO_SEGURO));

  const totalManutencao = manutencaoMecanica.reduce((s, m) => s + Number(m.valor_total), 0);
  const totalDocumentacao = documentacao.reduce((s, m) => s + Number(m.valor_total), 0);
  const totalSeguros = seguros.reduce((s, m) => s + Number(m.valor_total), 0);
  const totalCombustivel = (fuel ?? []).reduce((s, f) => s + Number(f.valor), 0);
  const registrosPorCategoria = [
    ...(maintenance ?? []).map((m) => ({
      valor: Number(m.valor_total),
      tipo: "manutencao" as const,
      categoria: m.maintenance_categories?.grupo ?? null,
    })),
    ...(fuel ?? []).map((f) => ({ valor: Number(f.valor), tipo: "combustivel" as const })),
  ];
  const alerts = computeMaintenanceAlerts(vehicle, maintenance ?? []);
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-start gap-3 rounded-xl border border-sky-100 bg-sky-50 p-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-500 text-white">
            🔧
          </span>
          <div>
            <p className="text-sm text-neutral-500">Total em manutenção</p>
            <p className="text-xl font-semibold text-sky-700">
              {totalManutencao.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-violet-100 bg-violet-50 p-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white">
            📄
          </span>
          <div>
            <p className="text-sm text-neutral-500">Documentação</p>
            <p className="text-xl font-semibold text-violet-700">
              {totalDocumentacao.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white">
            🛡️
          </span>
          <div>
            <p className="text-sm text-neutral-500">Seguro e proteção</p>
            <p className="text-xl font-semibold text-indigo-700">
              {totalSeguros.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white">
            ⛽
          </span>
          <div>
            <p className="text-sm text-neutral-500">Total em combustível</p>
            <p className="text-xl font-semibold text-amber-700">
              {totalCombustivel.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white">
            💰
          </span>
          <div>
            <p className="text-sm text-neutral-500">Total investido</p>
            <p className="text-xl font-semibold text-neutral-900">
              {(totalManutencao + totalDocumentacao + totalSeguros + totalCombustivel).toLocaleString(
                "pt-BR",
                { style: "currency", currency: "BRL" }
              )}
            </p>
          </div>
        </div>
        <FipeCard
          vehicleId={id}
          valorFipe={vehicle.valor_fipe}
          atualizadoEm={vehicle.valor_fipe_atualizado_em}
        />
      </div>

      {registrosPorCategoria.length > 0 && <CategoryPie registros={registrosPorCategoria} />}

      {alerts.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-neutral-900">Próximos vencimentos</h2>
          <div className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
            {alerts.map((a) => (
              <Link
                key={a.nome}
                href={`/veiculos/${id}/manutencao/${a.recordId}`}
                className="flex items-center justify-between px-4 py-3 hover:bg-neutral-50"
              >
                <div>
                  <p className="font-medium text-neutral-900">{a.nome}</p>
                  <p className="text-sm text-neutral-500">
                    Registrado em: {new Date(a.ultimaData).toLocaleDateString("pt-BR")}
                    {a.proximoKm !== null && ` · ${a.ultimoKm.toLocaleString("pt-BR")} km`}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {a.proximoKm !== null && `Próxima aos ${a.proximoKm.toLocaleString("pt-BR")} km`}
                    {a.proximoKm !== null && a.proximaData !== null && " · "}
                    {a.proximaData !== null &&
                      `vence em ${new Date(a.proximaData).toLocaleDateString("pt-BR")}`}
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
              </Link>
            ))}
          </div>
        </section>
      )}

      <MaintenanceSection
        vehicleId={id}
        titulo="Manutenção"
        itens={manutencaoMecanica}
        vazio="Nenhum registro ainda."
        fallbackNome="Manutenção"
        tipo="manutencao"
      />

      <MaintenanceSection
        vehicleId={id}
        titulo="Documentação e Obrigações"
        itens={documentacao}
        vazio="Nenhum registro ainda. Cadastre IPVA, licenciamento, multas, vistoria e afins aqui — o QuatroCar avisa quando estiver perto do vencimento."
        fallbackNome="Documentação"
        tipo="documentacao"
      />

      <MaintenanceSection
        vehicleId={id}
        titulo="Seguro e Proteção"
        itens={seguros}
        vazio="Nenhum registro ainda. Cadastre seguro, rastreador, proteção veicular e assistência aqui — o QuatroCar avisa quando estiver perto do vencimento."
        fallbackNome="Seguro"
        tipo="seguro"
      />

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
                <details key={grupo.key} className="group rounded-xl border border-neutral-200 bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-900">
                    <span className="flex items-center gap-2">
                      <span className="text-neutral-400 transition-transform group-open:rotate-90">›</span>
                      <span className="text-xs font-semibold uppercase tracking-wide text-neutral-600">
                        {grupo.label}
                      </span>
                      <span className="text-xs text-neutral-400">
                        ({grupo.items.length} {grupo.items.length === 1 ? "abastecimento" : "abastecimentos"})
                      </span>
                    </span>
                    <span className="text-sm font-medium text-neutral-700">{currency(subtotal)}</span>
                  </summary>
                  <div className="divide-y divide-neutral-200 border-t border-neutral-200">
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
                </details>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
