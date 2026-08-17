"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { logout } from "@/app/(app)/actions";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/veiculos", label: "Meus Veículos" },
  { href: "/perfil", label: "Perfil" },
];

export function AppHeader({ isAdmin }: { isAdmin: boolean }) {
  const [open, setOpen] = useState(false);

  const links = isAdmin ? [...navLinks, { href: "/admin", label: "Admin" }] : navLinks;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-900 bg-neutral-950">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
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

        <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-300 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-white">
              {l.label}
            </Link>
          ))}
          <form action={logout}>
            <button type="submit" className="hover:text-white">
              Sair
            </button>
          </form>
        </nav>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-11 w-11 items-center justify-center rounded-lg text-white md:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="flex h-4 w-6 flex-col justify-between">
            <span
              className={
                "block h-0.5 w-full origin-center bg-current transition-transform duration-300 " +
                (open ? "translate-y-[7px] rotate-45" : "")
              }
            />
            <span
              className={
                "block h-0.5 w-full bg-current transition-opacity duration-300 " +
                (open ? "opacity-0" : "opacity-100")
              }
            />
            <span
              className={
                "block h-0.5 w-full origin-center bg-current transition-transform duration-300 " +
                (open ? "-translate-y-[7px] -rotate-45" : "")
              }
            />
          </div>
        </button>
      </div>

      <div
        className={
          "fixed inset-0 z-40 bg-neutral-950 transition-transform duration-300 ease-out md:hidden " +
          (open ? "translate-x-0" : "translate-x-full")
        }
      >
        <nav className="flex h-full flex-col items-center justify-center gap-8 text-lg font-medium text-white">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <form action={logout}>
            <button type="submit" onClick={() => setOpen(false)}>
              Sair
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
