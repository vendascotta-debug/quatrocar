"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type MaintenanceFormState = { error?: string };

export async function createMaintenanceRecord(
  vehicleId: string,
  _prev: MaintenanceFormState,
  formData: FormData
): Promise<MaintenanceFormState> {
  const supabase = await createClient();

  const km = Number(formData.get("km"));
  const valorMaoObra = Number(formData.get("valor_mao_obra") || 0);
  const valorPecas = Number(formData.get("valor_pecas") || 0);

  if (!km) {
    return { error: "Informe a quilometragem." };
  }

  const { error } = await supabase.from("maintenance_records").insert({
    vehicle_id: vehicleId,
    data: String(formData.get("data") || new Date().toISOString().slice(0, 10)),
    km,
    categoria_id: (formData.get("categoria_id") as string) || null,
    subtipo: (formData.get("subtipo") as string) || null,
    mecanico: (formData.get("mecanico") as string) || null,
    valor_mao_obra: valorMaoObra,
    valor_pecas: valorPecas,
    garantia_meses: formData.get("garantia_meses")
      ? Number(formData.get("garantia_meses"))
      : null,
    intervalo_km: formData.get("intervalo_km") ? Number(formData.get("intervalo_km")) : null,
    intervalo_meses: formData.get("intervalo_meses")
      ? Number(formData.get("intervalo_meses"))
      : null,
    observacoes: (formData.get("observacoes") as string) || null,
  });

  if (error) {
    return { error: error.message };
  }

  await supabase
    .from("vehicles")
    .update({ km_atual: km })
    .eq("id", vehicleId)
    .lt("km_atual", km);

  revalidatePath(`/veiculos/${vehicleId}`);
  redirect(`/veiculos/${vehicleId}`);
}

export async function updateMaintenanceRecord(
  vehicleId: string,
  recordId: string,
  _prev: MaintenanceFormState,
  formData: FormData
): Promise<MaintenanceFormState> {
  const supabase = await createClient();

  const km = Number(formData.get("km"));
  const valorMaoObra = Number(formData.get("valor_mao_obra") || 0);
  const valorPecas = Number(formData.get("valor_pecas") || 0);

  if (!km) {
    return { error: "Informe a quilometragem." };
  }

  const { error } = await supabase
    .from("maintenance_records")
    .update({
      data: String(formData.get("data") || new Date().toISOString().slice(0, 10)),
      km,
      categoria_id: (formData.get("categoria_id") as string) || null,
      subtipo: (formData.get("subtipo") as string) || null,
      mecanico: (formData.get("mecanico") as string) || null,
      valor_mao_obra: valorMaoObra,
      valor_pecas: valorPecas,
      garantia_meses: formData.get("garantia_meses")
        ? Number(formData.get("garantia_meses"))
        : null,
      intervalo_km: formData.get("intervalo_km") ? Number(formData.get("intervalo_km")) : null,
      intervalo_meses: formData.get("intervalo_meses")
        ? Number(formData.get("intervalo_meses"))
        : null,
      observacoes: (formData.get("observacoes") as string) || null,
    })
    .eq("id", recordId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/veiculos/${vehicleId}`);
  redirect(`/veiculos/${vehicleId}`);
}

export async function deleteMaintenanceRecord(vehicleId: string, recordId: string) {
  const supabase = await createClient();
  await supabase.from("maintenance_records").delete().eq("id", recordId);
  revalidatePath(`/veiculos/${vehicleId}`);
  redirect(`/veiculos/${vehicleId}`);
}
