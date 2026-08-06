import { createClient } from "@/lib/supabase/server";
import type { MaintenanceCategory } from "@/lib/types";
import { ManutencaoForm } from "../form";
import { createMaintenanceRecord } from "../actions";

export default async function NovaManutencaoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: categorias } = await supabase
    .from("maintenance_categories")
    .select("*")
    .order("grupo")
    .returns<MaintenanceCategory[]>();

  const action = createMaintenanceRecord.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900">Registrar Manutenção</h1>
      <ManutencaoForm action={action} categorias={categorias ?? []} />
    </div>
  );
}
