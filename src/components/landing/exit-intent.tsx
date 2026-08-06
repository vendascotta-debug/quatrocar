"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "quatrocar_exit_offer_seen";

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setOpen(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
    };

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };

    const fallbackTimer = window.setTimeout(show, 30000);

    document.addEventListener("mouseout", onMouseOut);
    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-offer-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-amber-400/30 bg-neutral-950 p-6 text-center text-white shadow-2xl sm:p-8"
      >
        <button
          type="button"
          aria-label="Fechar"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 hover:bg-white/10 hover:text-white"
        >
          ✕
        </button>

        <span className="inline-block rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-neutral-950">
          Oferta de lançamento
        </span>

        <h2 id="exit-offer-title" className="mt-4 text-xl font-bold sm:text-2xl">
          Espera! Não perca essa condição
        </h2>
        <p className="mt-3 text-sm text-neutral-300">
          <strong className="text-amber-400">14 dias grátis</strong> e{" "}
          <strong className="text-amber-400">R$ 19,90/mês</strong> para os primeiros 1.000
          assinantes do QuatroCar Premium. Depois desse período, o valor sobe para R$ 29,90/mês —
          quem entra agora mantém o preço promocional enquanto for assinante.
        </p>

        <Link
          href="/cadastro"
          onClick={() => setOpen(false)}
          className="mt-6 block rounded-lg bg-amber-400 px-6 py-3 text-center text-sm font-semibold text-neutral-950 transition-colors hover:bg-amber-300"
        >
          Garantir minha vaga com desconto
        </Link>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-3 text-xs text-neutral-500 hover:text-neutral-300"
        >
          Não, obrigado
        </button>
      </div>
    </div>
  );
}
