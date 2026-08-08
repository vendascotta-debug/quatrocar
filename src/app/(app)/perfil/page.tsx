import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";
import { PerfilForm } from "./form";

export default async function PerfilPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .single<Profile>();

  const planoLabel = {
    free: "Gratuito",
    premium: "Premium",
    empresas: "Empresas",
    cortesia: "Cortesia",
  }[profile?.plano ?? "free"];

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Meu Perfil</h1>
        <p className="text-neutral-600">{user?.email}</p>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-4">
        <p className="text-sm text-neutral-500">Plano atual</p>
        <p className="text-lg font-semibold text-neutral-900">{planoLabel}</p>
      </div>

      <PerfilForm profile={profile ?? undefined} />
    </div>
  );
}
