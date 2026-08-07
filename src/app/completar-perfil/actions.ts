"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type CompletarPerfilState = { error?: string };

export async function completarPerfil(
  _prev: CompletarPerfilState,
  formData: FormData
): Promise<CompletarPerfilState> {
  const whatsapp = String(formData.get("whatsapp") || "").trim();

  if (!whatsapp) {
    return { error: "Informe seu número de WhatsApp." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  await supabase.from("profiles").update({ whatsapp }).eq("id", user.id);

  redirect("/dashboard");
}
