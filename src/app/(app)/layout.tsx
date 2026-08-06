import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "./actions";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/dashboard" className="text-lg font-semibold text-neutral-900">
            QuatroCar
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium text-neutral-600">
            <Link href="/dashboard" className="hover:text-neutral-900">
              Dashboard
            </Link>
            <Link href="/veiculos" className="hover:text-neutral-900">
              Meus Veículos
            </Link>
            <Link href="/perfil" className="hover:text-neutral-900">
              Perfil
            </Link>
            <form action={logout}>
              <button type="submit" className="hover:text-neutral-900">
                Sair
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">{children}</main>
    </div>
  );
}
