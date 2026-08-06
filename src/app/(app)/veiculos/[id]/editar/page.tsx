import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Vehicle } from "@/lib/types";
import { VeiculoForm } from "../../form";
import { updateVehicle, deleteVehicle } from "../../actions";

export default async function EditarVeiculoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", id)
    .single<Vehicle>();

  if (!vehicle) notFound();

  const action = updateVehicle.bind(null, id);
  const onDelete = deleteVehicle.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900">Editar Veículo</h1>
      <VeiculoForm action={action} vehicle={vehicle} onDelete={onDelete} />
    </div>
  );
}
