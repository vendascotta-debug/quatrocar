import { createClient } from "@/lib/supabase/server";
import type { MaintenanceCategory, Vehicle } from "@/lib/types";
import { ManutencaoForm } from "../form";
import { createMaintenanceRecord } from "../actions";

const GRUPO_DOCUMENTACAO = "Documentação e Obrigações";
const GRUPO_SEGURO = "Seguro e Proteção";

const CONTEXTO: Record<string, { titulo: string; grupos: string[] | null }> = {
  documentacao: { titulo: "Registrar Documento", grupos: [GRUPO_DOCUMENTACAO] },
  seguro: { titulo: "Registrar Seguro", grupos: [GRUPO_SEGURO] },
  manutencao: { titulo: "Registrar Manutenção", grupos: null },
};

export default async function NovaManutencaoPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tipo?: string }>;
}) {
  const { id } = await params;
  const { tipo } = await searchParams;
  const variante: "manutencao" | "documentacao" | "seguro" =
    tipo === "documentacao" || tipo === "seguro" ? tipo : "manutencao";
  const contexto = CONTEXTO[variante];

  const supabase = await createClient();
  const [{ data: categoriasTodas }, { data: vehicle }] = await Promise.all([
    supabase
      .from("maintenance_categories")
      .select("*")
      .order("grupo")
      .returns<MaintenanceCategory[]>(),
    supabase.from("vehicles").select("km_atual").eq("id", id).single<Pick<Vehicle, "km_atual">>(),
  ]);

  const categorias = contexto.grupos
    ? (categoriasTodas ?? []).filter((c) => contexto.grupos!.includes(c.grupo))
    : (categoriasTodas ?? []).filter(
        (c) => c.grupo !== GRUPO_DOCUMENTACAO && c.grupo !== GRUPO_SEGURO
      );

  const action = createMaintenanceRecord.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900">{contexto.titulo}</h1>
      <ManutencaoForm
        action={action}
        categorias={categorias}
        defaultKm={vehicle?.km_atual}
        variante={variante}
      />
    </div>
  );
}
