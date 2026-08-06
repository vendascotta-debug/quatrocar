import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient, isAdminEmail } from "@/lib/supabase/admin";
import { PlanoSelect } from "./plano-select";

type Row = {
  id: string;
  email: string;
  nome: string | null;
  plano: string;
  whatsapp: string | null;
  criado_em: string;
  totalVeiculos: number;
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
    admin.from("profiles").select("id, nome, plano, whatsapp, criado_em"),
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
    };
  });

  rows.sort((a, b) => new Date(b.criado_em).getTime() - new Date(a.criado_em).getTime());

  const totalUsuarios = rows.length;
  const totalPagantes = rows.filter((r) => r.plano !== "free").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Painel Admin</h1>
        <p className="text-neutral-600">Usuários cadastrados no QuatroCar.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-sm text-neutral-500">Total de usuários</p>
          <p className="text-2xl font-semibold text-neutral-900">{totalUsuarios}</p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-sm text-neutral-500">Assinantes pagos</p>
          <p className="text-2xl font-semibold text-neutral-900">{totalPagantes}</p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-sm text-neutral-500">Gratuitos</p>
          <p className="text-2xl font-semibold text-neutral-900">{totalUsuarios - totalPagantes}</p>
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
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-3 text-neutral-900">{r.nome || "—"}</td>
                <td className="px-4 py-3 text-neutral-600">{r.email}</td>
                <td className="px-4 py-3 text-neutral-600">{r.whatsapp || "—"}</td>
                <td className="px-4 py-3 text-neutral-600">{r.totalVeiculos}</td>
                <td className="px-4 py-3 text-neutral-600">
                  {new Date(r.criado_em).toLocaleDateString("pt-BR")}
                </td>
                <td className="px-4 py-3">
                  <PlanoSelect userId={r.id} plano={r.plano} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
