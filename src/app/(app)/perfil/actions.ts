"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type ProfileFormState = { error?: string; success?: boolean };

export async function updateProfile(
  _prev: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const nome = String(formData.get("nome") || "");
  const telefone = (formData.get("telefone") as string) || null;
  const whatsapp = (formData.get("whatsapp") as string) || null;

  if (!nome) {
    return { error: "Informe seu nome." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ nome, telefone, whatsapp })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/perfil");
  return { success: true };
}
