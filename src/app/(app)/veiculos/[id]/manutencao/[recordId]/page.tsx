import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { MaintenanceCategory, MaintenanceRecord } from "@/lib/types";
import { ManutencaoForm } from "../form";
import { updateMaintenanceRecord, deleteMaintenanceRecord } from "../actions";

const GRUPO_DOCUMENTACAO = "Documentação e Obrigações";
const GRUPO_SEGURO = "Seguro e Proteção";

export default async function EditarManutencaoPage({
  params,
}: {
  params: Promise<{ id: string; recordId: string }>;
}) {
  const { id, recordId } = await params;
  const supabase = await createClient();

  const [{ data: categoriasTodas }, { data: record }] = await Promise.all([
    supabase
      .from("maintenance_categories")
      .select("*")
      .order("grupo")
      .returns<MaintenanceCategory[]>(),
    supabase
      .from("maintenance_records")
      .select("*, maintenance_categories(id, grupo, nome)")
      .eq("id", recordId)
      .single<MaintenanceRecord>(),
  ]);

  if (!record) notFound();

  const grupoAtual = record.maintenance_categories?.grupo;
  const titulo =
    grupoAtual === GRUPO_DOCUMENTACAO
      ? "Editar Documento"
      : grupoAtual === GRUPO_SEGURO
        ? "Editar Seguro"
        : "Editar Manutenção";

  const categorias =
    grupoAtual === GRUPO_DOCUMENTACAO || grupoAtual === GRUPO_SEGURO
      ? (categoriasTodas ?? []).filter((c) => c.grupo === grupoAtual)
      : (categoriasTodas ?? []).filter(
          (c) => c.grupo !== GRUPO_DOCUMENTACAO && c.grupo !== GRUPO_SEGURO
        );

  const action = updateMaintenanceRecord.bind(null, id, recordId);
  const onDelete = deleteMaintenanceRecord.bind(null, id, recordId);

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900">{titulo}</h1>
      <ManutencaoForm action={action} categorias={categorias} record={record} onDelete={onDelete} />
    </div>
  );
}
