import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient, isAdminEmail } from "@/lib/supabase/admin";
import { UserRow } from "./user-row";

type Row = {
  id: string;
  email: string;
  nome: string | null;
  plano: string;
  whatsapp: string | null;
  criado_em: string;
  totalVeiculos: number;
  kiwifySaleId: string | null;
};

const VALOR_POR_PLANO: Record<string, string> = {
  premium: "R$ 97/ano",
  empresas: "Sob consulta",
  cortesia: "Cortesia (grátis)",
  free: "—",
};

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminEmail(user?.email)) {
    redirect("/dashboard");
  }

  const admin = createAdminClient();

  const [{ data: authUsers }, { data: profiles }, { data: vehicles }] = await Promise.all([
    admin.auth.admin.listUsers({ perPage: 1000 }),
    admin.from("profiles").select("id, nome, plano, whatsapp, criado_em, kiwify_sale_id"),
    admin.from("vehicles").select("id, user_id"),
  ]);

  const vehicleCountByUser = new Map<string, number>();
  for (const v of vehicles ?? []) {
    vehicleCountByUser.set(v.user_id, (vehicleCountByUser.get(v.user_id) ?? 0) + 1);
  }

  const profileById = new Map((profiles ?? []).map((p) => [p.id, p]));

  const rows: Row[] = (authUsers?.users ?? []).map((u) => {
    const profile = profileById.get(u.id);
    return {
      id: u.id,
      email: u.email ?? "",
      nome: profile?.nome ?? null,
      plano: profile?.plano ?? "free",
      whatsapp: profile?.whatsapp ?? null,
      criado_em: u.created_at,
      totalVeiculos: vehicleCountByUser.get(u.id) ?? 0,
      kiwifySaleId: profile?.kiwify_sale_id ?? null,
    };
  });

  rows.sort((a, b) => new Date(b.criado_em).getTime() - new Date(a.criado_em).getTime());

  const totalUsuarios = rows.length;
  // "Pagante" de verdade = plano premium/empresas. Cortesia é acesso liberado
  // manualmente (sem cobrança), por isso não entra nessa contagem.
  const totalPagantes = rows.filter((r) => r.plano === "premium" || r.plano === "empresas").length;
  const totalCortesia = rows.filter((r) => r.plano === "cortesia").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Painel Admin</h1>
        <p className="text-neutral-600">Usuários cadastrados no QuatroCar.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-sm text-neutral-500">Total de usuários</p>
          <p className="text-2xl font-semibold text-neutral-900">{totalUsuarios}</p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-sm text-neutral-500">Assinantes pagos</p>
          <p className="text-2xl font-semibold text-neutral-900">{totalPagantes}</p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-sm text-neutral-500">Cortesia</p>
          <p className="text-2xl font-semibold text-neutral-900">{totalCortesia}</p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-sm text-neutral-500">Gratuitos</p>
          <p className="text-2xl font-semibold text-neutral-900">
            {totalUsuarios - totalPagantes - totalCortesia}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-600">
            <tr>
              <th className="px-4 py-3 font-medium">Nome</th>
              <th className="px-4 py-3 font-medium">E-mail</th>
              <th className="px-4 py-3 font-medium">WhatsApp</th>
              <th className="px-4 py-3 font-medium">Veículos</th>
              <th className="px-4 py-3 font-medium">Cadastro</th>
              <th className="px-4 py-3 font-medium">Plano</th>
              <th className="px-4 py-3 font-medium">Valor</th>
              <th className="px-4 py-3 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {rows.map((r) => (
              <UserRow
                key={r.id}
                userId={r.id}
                email={r.email}
                nome={r.nome}
                whatsapp={r.whatsapp}
                plano={r.plano}
                totalVeiculos={r.totalVeiculos}
                criadoEm={r.criado_em}
                valor={VALOR_POR_PLANO[r.plano] ?? "—"}
                kiwifySaleId={r.kiwifySaleId}
                isSelf={r.email.toLowerCase() === user?.email?.toLowerCase()}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
