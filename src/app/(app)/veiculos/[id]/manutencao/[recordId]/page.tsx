import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { MaintenanceCategory, MaintenanceRecord } from "@/lib/types";
import { ManutencaoForm } from "../form";
import { updateMaintenanceRecord, deleteMaintenanceRecord } from "../actions";

export default async function EditarManutencaoPage({
  params,
}: {
  params: Promise<{ id: string; recordId: string }>;
}) {
  const { id, recordId } = await params;
  const supabase = await createClient();

  const [{ data: categorias }, { data: record }] = await Promise.all([
    supabase
      .from("maintenance_categories")
      .select("*")
      .order("grupo")
      .returns<MaintenanceCategory[]>(),
    supabase
      .from("maintenance_records")
      .select("*")
      .eq("id", recordId)
      .single<MaintenanceRecord>(),
  ]);

  if (!record) notFound();

  const action = updateMaintenanceRecord.bind(null, id, recordId);
  const onDelete = deleteMaintenanceRecord.bind(null, id, recordId);

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900">Editar Manutenção</h1>
      <ManutencaoForm action={action} categorias={categorias ?? []} record={record} onDelete={onDelete} />
    </div>
  );
}
