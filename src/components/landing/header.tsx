"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#recursos", label: "Recursos" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#planos", label: "Planos" },
  { href: "#faq", label: "Perguntas" },
];

export function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={
        "sticky top-0 z-50 w-full text-white transition-all duration-300 " +
        (scrolled
          ? "bg-neutral-950/95 shadow-lg shadow-black/20 backdrop-blur"
          : "bg-transparent")
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-1 text-lg font-bold tracking-tight">
          Quatro<span className="text-amber-400">Car</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-300 md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:text-white"
          >
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className="rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition-colors hover:bg-amber-300"
          >
            Criar conta grátis
          </Link>
        </div>

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
        id="mobile-menu"
        className={
          "fixed inset-0 z-40 bg-neutral-950 transition-transform duration-300 ease-out md:hidden " +
          (open ? "translate-x-0" : "translate-x-full")
        }
      >
        <nav className="flex h-full flex-col items-center justify-center gap-8 text-lg font-medium text-white">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <div className="mt-6 flex w-full max-w-xs flex-col gap-3 px-6">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-lg border border-neutral-700 px-5 py-3 text-center text-base font-medium text-white"
            >
              Entrar
            </Link>
            <Link
              href="/cadastro"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-amber-400 px-5 py-3 text-center text-base font-semibold text-neutral-950"
            >
              Criar conta grátis
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
