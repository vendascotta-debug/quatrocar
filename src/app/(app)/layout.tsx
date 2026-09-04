import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/supabase/admin";
import { AppHeader } from "@/components/app/header";
import { KIWIFY_CHECKOUT_URL } from "@/lib/constants";
import { logout } from "@/app/(app)/actions";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("whatsapp, plano")
    .eq("id", user.id)
    .single();

  if (!profile?.whatsapp) redirect("/completar-perfil");

  if (profile.plano === "free") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-6 py-10 text-center">
        <div className="w-full max-w-md space-y-4 rounded-2xl border border-neutral-200 bg-white p-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
            🚗 Sua conta está criada
          </span>
          <h1 className="text-xl font-semibold text-neutral-900">
            Falta só confirmar sua assinatura
          </h1>
          <p className="text-sm text-neutral-600">
            Ainda não identificamos um pagamento aprovado pra este e-mail. Assine o QuatroCar
            Premium — você tem <strong>14 dias de garantia</strong>, e se não gostar, devolvemos
            100% do valor.
          </p>
          <a
            href={KIWIFY_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg bg-sky-400 px-6 py-3 text-center text-sm font-semibold text-neutral-950 hover:bg-sky-300"
          >
            Assinar agora
          </a>
          <p className="text-xs text-neutral-500">
            Já pagou e ainda vê esta tela? Use o mesmo e-mail da compra ({user.email}) — se o
            problema continuar, fale com a gente pelo balão de suporte no site.
          </p>
          <form action={logout}>
            <button type="submit" className="text-xs text-neutral-400 underline">
              Sair da conta
            </button>
          </form>
        </div>
      </div>
    );
  }

  const isAdmin = isAdminEmail(user.email);

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader isAdmin={isAdmin} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</main>
    </div>
  );
}
