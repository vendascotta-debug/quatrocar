"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type FuelFormState = { error?: string };

export async function createFuelRecord(
  vehicleId: string,
  _prev: FuelFormState,
  formData: FormData
): Promise<FuelFormState> {
  const supabase = await createClient();

  const km = Number(formData.get("km"));
  const litros = Number(formData.get("litros"));
  const precoLitro = Number(formData.get("preco_litro"));
  const combustivel = String(formData.get("combustivel") || "");

  if (!km || !litros || !precoLitro || !combustivel) {
    return { error: "Preencha combustível, litros, preço por litro e quilometragem." };
  }

  const { error } = await supabase.from("fuel_records").insert({
    vehicle_id: vehicleId,
    data: String(formData.get("data") || new Date().toISOString().slice(0, 10)),
    posto: (formData.get("posto") as string) || null,
    combustivel,
    preco_litro: precoLitro,
    litros,
    km,
    forma_pagamento: (formData.get("forma_pagamento") as string) || null,
    cidade: (formData.get("cidade") as string) || null,
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

export async function updateFuelRecord(
  vehicleId: string,
  recordId: string,
  _prev: FuelFormState,
  formData: FormData
): Promise<FuelFormState> {
  const supabase = await createClient();

  const km = Number(formData.get("km"));
  const litros = Number(formData.get("litros"));
  const precoLitro = Number(formData.get("preco_litro"));
  const combustivel = String(formData.get("combustivel") || "");

  if (!km || !litros || !precoLitro || !combustivel) {
    return { error: "Preencha combustível, litros, preço por litro e quilometragem." };
  }

  const { error } = await supabase
    .from("fuel_records")
    .update({
      data: String(formData.get("data") || new Date().toISOString().slice(0, 10)),
      posto: (formData.get("posto") as string) || null,
      combustivel,
      preco_litro: precoLitro,
      litros,
      km,
      forma_pagamento: (formData.get("forma_pagamento") as string) || null,
      cidade: (formData.get("cidade") as string) || null,
    })
    .eq("id", recordId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/veiculos/${vehicleId}`);
  redirect(`/veiculos/${vehicleId}`);
}

export async function deleteFuelRecord(vehicleId: string, recordId: string) {
  const supabase = await createClient();
  await supabase.from("fuel_records").delete().eq("id", recordId);
  revalidatePath(`/veiculos/${vehicleId}`);
  redirect(`/veiculos/${vehicleId}`);
}
