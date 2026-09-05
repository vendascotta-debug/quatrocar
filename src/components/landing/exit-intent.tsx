"use client";

import { useEffect, useState } from "react";
import { KIWIFY_CHECKOUT_URL } from "@/lib/constants";

const STORAGE_KEY = "quatrocar_exit_offer_seen";

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let shown = false;
    let lastScrollY = window.scrollY;
    let hasScrolledDown = false;

    const show = () => {
      if (shown) return;
      shown = true;
      setOpen(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
    };

    // Desktop: cursor leaves through the top of the viewport (classic exit intent).
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };

    // Mobile: user scrolled down first (actually engaged with the page), then
    // scrolls back up quickly near the top — a real "heading back" gesture,
    // not a blind timer that fires on everyone regardless of behavior.
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 400) hasScrolledDown = true;

      const scrollingUpFast = lastScrollY - y > 60;
      if (hasScrolledDown && scrollingUpFast && y < 200) {
        show();
      }
      lastScrollY = y;
    };

    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
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
        className="relative w-full max-w-md rounded-2xl border border-sky-400/30 bg-neutral-950 p-6 text-center text-white shadow-2xl sm:p-8"
      >
        <button
          type="button"
          aria-label="Fechar"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 hover:bg-white/10 hover:text-white"
        >
          ✕
        </button>

        <span className="inline-block rounded-full bg-sky-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-neutral-950">
          Garantia de 14 dias
        </span>

        <h2 id="exit-offer-title" className="mt-4 text-xl font-bold sm:text-2xl">
          Espera! Não perca essa condição
        </h2>
        <p className="mt-3 text-sm text-neutral-300">
          Assinatura anual do QuatroCar por{" "}
          <strong className="text-sky-400">R$ 97/ano</strong> (à vista ou 12x no cartão). Não gostou
          nos primeiros <strong className="text-sky-400">14 dias</strong>? Devolvemos 100% do
          valor.
        </p>

        <a
          href={KIWIFY_CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="mt-6 block rounded-lg bg-sky-400 px-6 py-3 text-center text-sm font-semibold text-neutral-950 transition-colors hover:bg-sky-300"
        >
          Garantir meu acesso agora
        </a>
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
