import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export async function upgradeUserByEmail(email: string, plano: "premium" | "empresas" | "free") {
  const admin = createAdminClient();

  const { data } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const user = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

  if (!user) {
    return { found: false as const };
  }

  await admin.from("profiles").update({ plano }).eq("id", user.id);
  return { found: true as const, userId: user.id };
}
