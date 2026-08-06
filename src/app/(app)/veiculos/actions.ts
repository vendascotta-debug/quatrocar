"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type VehicleFormState = { error?: string };

export async function createVehicle(
  _prev: VehicleFormState,
  formData: FormData
): Promise<VehicleFormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { count } = await supabase
    .from("vehicles")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);

  const { data: profile } = await supabase
    .from("profiles")
    .select("plano")
    .eq("id", user.id)
    .single();

  if ((profile?.plano ?? "free") === "free" && (count ?? 0) >= 1) {
    return {
      error:
        "O plano gratuito permite apenas 1 veículo. Faça upgrade para o Premium para cadastrar veículos ilimitados.",
    };
  }

  const payload = {
    user_id: user.id,
    marca: String(formData.get("marca") || ""),
    modelo: String(formData.get("modelo") || ""),
    versao: (formData.get("versao") as string) || null,
    ano_fabricacao: formData.get("ano_fabricacao")
      ? Number(formData.get("ano_fabricacao"))
      : null,
    ano_modelo: formData.get("ano_modelo") ? Number(formData.get("ano_modelo")) : null,
    motor: (formData.get("motor") as string) || null,
    cambio: (formData.get("cambio") as string) || null,
    combustivel: (formData.get("combustivel") as string) || null,
    cor: (formData.get("cor") as string) || null,
    placa: (formData.get("placa") as string) || null,
    km_atual: formData.get("km_atual") ? Number(formData.get("km_atual")) : 0,
    categoria: (formData.get("categoria") as string) || null,
  };

  if (!payload.marca || !payload.modelo) {
    return { error: "Marca e modelo são obrigatórios." };
  }

  const { data, error } = await supabase
    .from("vehicles")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/veiculos");
  redirect(`/veiculos/${data.id}`);
}

export async function updateVehicle(
  vehicleId: string,
  _prev: VehicleFormState,
  formData: FormData
): Promise<VehicleFormState> {
  const supabase = await createClient();

  const payload = {
    marca: String(formData.get("marca") || ""),
    modelo: String(formData.get("modelo") || ""),
    versao: (formData.get("versao") as string) || null,
    ano_fabricacao: formData.get("ano_fabricacao")
      ? Number(formData.get("ano_fabricacao"))
      : null,
    ano_modelo: formData.get("ano_modelo") ? Number(formData.get("ano_modelo")) : null,
    motor: (formData.get("motor") as string) || null,
    cambio: (formData.get("cambio") as string) || null,
    combustivel: (formData.get("combustivel") as string) || null,
    cor: (formData.get("cor") as string) || null,
    placa: (formData.get("placa") as string) || null,
    km_atual: formData.get("km_atual") ? Number(formData.get("km_atual")) : 0,
    categoria: (formData.get("categoria") as string) || null,
  };

  if (!payload.marca || !payload.modelo) {
    return { error: "Marca e modelo são obrigatórios." };
  }

  const { error } = await supabase.from("vehicles").update(payload).eq("id", vehicleId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/veiculos");
  revalidatePath(`/veiculos/${vehicleId}`);
  redirect(`/veiculos/${vehicleId}`);
}

export async function deleteVehicle(vehicleId: string) {
  const supabase = await createClient();
  await supabase.from("vehicles").delete().eq("id", vehicleId);
  revalidatePath("/veiculos");
  redirect("/veiculos");
}
