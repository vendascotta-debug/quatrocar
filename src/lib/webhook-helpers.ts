import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export async function upgradeUserByEmail(
  email: string,
  plano: "premium" | "empresas" | "free",
  kiwifySaleId?: string
) {
  const admin = createAdminClient();

  const { data } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const user = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

  if (!user) {
    return { found: false as const };
  }

  const update: { plano: string; kiwify_sale_id?: string } = { plano };
  if (kiwifySaleId) update.kiwify_sale_id = kiwifySaleId;

  await admin.from("profiles").update(update).eq("id", user.id);
  return { found: true as const, userId: user.id };
}
