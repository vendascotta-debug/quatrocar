"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient, isAdminEmail } from "@/lib/supabase/admin";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminEmail(user?.email)) redirect("/dashboard");
  return user!;
}

export async function setUserPlano(userId: string, plano: string) {
  await requireAdmin();

  if (!["free", "premium", "empresas", "cortesia"].includes(plano)) return;

  const admin = createAdminClient();
  await admin.from("profiles").update({ plano }).eq("id", userId);

  revalidatePath("/admin");
}

export async function updateUserProfile(userId: string, nome: string, whatsapp: string) {
  await requireAdmin();

  const admin = createAdminClient();
  await admin
    .from("profiles")
    .update({ nome: nome || null, whatsapp: whatsapp || null })
    .eq("id", userId);

  revalidatePath("/admin");
}

export async function deleteUser(userId: string) {
  const currentUser = await requireAdmin();

  if (userId === currentUser.id) return;

  const admin = createAdminClient();
  await admin.auth.admin.deleteUser(userId);

  revalidatePath("/admin");
}
