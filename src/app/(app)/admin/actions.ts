"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient, isAdminEmail } from "@/lib/supabase/admin";

export async function setUserPlano(userId: string, plano: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminEmail(user?.email)) redirect("/dashboard");

  if (!["free", "premium", "empresas"].includes(plano)) return;

  const admin = createAdminClient();
  await admin.from("profiles").update({ plano }).eq("id", userId);

  revalidatePath("/admin");
}
