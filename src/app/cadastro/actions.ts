"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { aplicarUpgradePendente } from "@/lib/webhook-helpers";

export type AuthState = { error?: string };

export async function signup(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const nome = String(formData.get("nome") || "");
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const whatsapp = String(formData.get("whatsapp") || "").trim();
  const aceiteTermos = formData.get("aceite_termos") === "on";

  if (password.length < 6) {
    return { error: "A senha deve ter pelo menos 6 caracteres." };
  }

  if (!whatsapp) {
    return { error: "Informe seu número de WhatsApp." };
  }

  if (!aceiteTermos) {
    return { error: "É preciso aceitar os Termos de Uso e a Política de Privacidade." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { nome, whatsapp } },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user) {
    await aplicarUpgradePendente(email, data.user.id);
  }

  redirect("/dashboard");
}
