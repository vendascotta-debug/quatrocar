"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string };

export async function signup(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const nome = String(formData.get("nome") || "");
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  if (password.length < 6) {
    return { error: "A senha deve ter pelo menos 6 caracteres." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { nome } },
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}
