import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/supabase/admin";
import { logout } from "./actions";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("whatsapp")
    .eq("id", user.id)
    .single();

  if (!profile?.whatsapp) redirect("/completar-perfil");

  const isAdmin = isAdminEmail(user.email);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-neutral-900 bg-neutral-950">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/images/logo-lockup.webp"
              alt="QuatroCar"
              width={600}
              height={334}
              priority
              className="h-8 w-auto"
            />
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium text-neutral-300">
            <Link href="/dashboard" className="hover:text-white">
              Dashboard
            </Link>
            <Link href="/veiculos" className="hover:text-white">
              Meus Veículos
            </Link>
            <Link href="/perfil" className="hover:text-white">
              Perfil
            </Link>
            {isAdmin && (
              <Link href="/admin" className="hover:text-white">
                Admin
              </Link>
            )}
            <form action={logout}>
              <button type="submit" className="hover:text-white">
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
