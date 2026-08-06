import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Vehicle } from "@/lib/types";

function formatAno(fabricacao: number | null, modelo: number | null) {
  if (!fabricacao && !modelo) return "";
  if (fabricacao && modelo && fabricacao !== modelo) return `${fabricacao}/${modelo} · `;
  return `${fabricacao ?? modelo} · `;
}

export default async function VeiculosPage() {
  const supabase = await createClient();
  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*")
    .order("criado_em", { ascending: false })
    .returns<Vehicle[]>();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900">Meus Veículos</h1>
        <Link
          href="/veiculos/novo"
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
        >
          + Novo veículo
        </Link>
      </div>

      {!vehicles?.length ? (
        <div className="rounded-xl border border-dashed border-neutral-300 p-10 text-center text-neutral-600">
          Nenhum veículo cadastrado ainda.{" "}
          <Link href="/veiculos/novo" className="font-medium text-neutral-900 underline">
            Cadastre o primeiro
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
              <p className="text-sm text-neutral-500">{v.categoria || "Veículo"}</p>
              <h2 className="text-lg font-semibold text-neutral-900">
                {v.marca} {v.modelo} {v.versao}
              </h2>
              <p className="text-sm text-neutral-600">
                {formatAno(v.ano_fabricacao, v.ano_modelo)}
                {v.placa || "sem placa"} · {v.km_atual.toLocaleString("pt-BR")} km
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
