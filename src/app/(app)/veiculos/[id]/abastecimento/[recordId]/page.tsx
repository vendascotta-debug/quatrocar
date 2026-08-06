import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { FuelRecord } from "@/lib/types";
import { AbastecimentoForm } from "../form";
import { updateFuelRecord, deleteFuelRecord } from "../actions";

export default async function EditarAbastecimentoPage({
  params,
}: {
  params: Promise<{ id: string; recordId: string }>;
}) {
  const { id, recordId } = await params;
  const supabase = await createClient();

  const { data: record } = await supabase
    .from("fuel_records")
    .select("*")
    .eq("id", recordId)
    .single<FuelRecord>();

  if (!record) notFound();

  const action = updateFuelRecord.bind(null, id, recordId);
  const onDelete = deleteFuelRecord.bind(null, id, recordId);

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900">Editar Abastecimento</h1>
      <AbastecimentoForm action={action} record={record} onDelete={onDelete} />
    </div>
  );
}
