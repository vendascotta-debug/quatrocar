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
    // Cliente pagou antes de ter conta no QuatroCar (fluxo esperado agora:
    // paga primeiro, cadastra depois). Guarda o upgrade pra aplicar no
    // cadastro.
    if (plano !== "free") {
      await admin.from("pending_kiwify_upgrades").upsert({
        email: email.toLowerCase(),
        plano,
        kiwify_sale_id: kiwifySaleId ?? null,
      });
    } else {
      await admin.from("pending_kiwify_upgrades").delete().eq("email", email.toLowerCase());
    }
    return { found: false as const };
  }

  const update: { plano: string; kiwify_sale_id?: string } = { plano };
  if (kiwifySaleId) update.kiwify_sale_id = kiwifySaleId;

  await admin.from("profiles").update(update).eq("id", user.id);
  return { found: true as const, userId: user.id };
}

/**
 * Chamado logo após o cadastro (e-mail/senha ou Google) para aplicar um
 * upgrade de plano que ficou "esperando" — cliente que pagou na Kiwify
 * antes de criar a conta no QuatroCar.
 */
export async function aplicarUpgradePendente(email: string, userId: string) {
  const admin = createAdminClient();

  const { data: pendente } = await admin
    .from("pending_kiwify_upgrades")
    .select("plano, kiwify_sale_id")
    .eq("email", email.toLowerCase())
    .maybeSingle();

  if (!pendente) return false;

  await admin
    .from("profiles")
    .update({ plano: pendente.plano, kiwify_sale_id: pendente.kiwify_sale_id })
    .eq("id", userId);

  await admin.from("pending_kiwify_upgrades").delete().eq("email", email.toLowerCase());
  return true;
}
