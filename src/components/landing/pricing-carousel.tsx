"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type Plano = {
  nome: string;
  publico: string;
  preco: string;
  periodo: string;
  destaque: boolean;
  itens: string[];
  checkoutUrl?: string;
  precoDe?: string;
  precoParcela?: string;
  precoAvista?: string;
};

export function PricingCarousel({ planos }: { planos: Plano[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;
    // Scroll only the horizontal track itself — never scrollIntoView, which
    // can also scroll the whole page if this section isn't in view yet.
    track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let visible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.5 }
    );
    observer.observe(track);

    if (paused) return () => observer.disconnect();

    const timer = window.setInterval(() => {
      if (!visible) return;
      setActive((prev) => {
        const next = (prev + 1) % planos.length;
        scrollToIndex(next);
        return next;
      });
    }, 4000);

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, [paused, planos.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const { scrollLeft, children } = track;
      let closest = 0;
      let closestDist = Infinity;
      Array.from(children).forEach((child, i) => {
        const el = child as HTMLElement;
        const dist = Math.abs(el.offsetLeft - scrollLeft);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActive(closest);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div
        ref={trackRef}
        className="mx-auto flex max-w-md snap-x snap-mandatory justify-center gap-6 overflow-x-auto scroll-smooth px-4 pb-2 pt-4 sm:overflow-visible sm:snap-none sm:px-0 sm:pt-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {planos.map((p) => (
          <div key={p.nome} className="w-[90%] shrink-0 snap-center sm:w-auto">
            <div
              className={
                "relative flex h-full flex-col rounded-2xl border p-6 shadow-2xl backdrop-blur-sm transition-transform duration-500 sm:p-8 " +
                (p.destaque
                  ? "border-sky-400 bg-sky-400/10 text-white shadow-sky-500/30"
                  : "border-white/10 bg-white/5 text-white")
              }
            >
              {p.destaque && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sky-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-neutral-950">
                  Mais popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{p.nome}</h3>
              <p className="mt-1 text-xs text-neutral-400">{p.publico}</p>

              {p.precoDe ? (
                <div className="mt-5 text-center">
                  <p className="text-base font-semibold text-red-400 line-through decoration-2">
                    De: {p.precoDe}
                  </p>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <span className="rounded-md bg-sky-500 px-2 py-1 text-sm font-black uppercase tracking-wide text-white">
                      12x
                    </span>
                    <span className="text-6xl font-black leading-none tracking-tighter text-sky-400 sm:text-7xl">
                      {p.precoParcela}
                    </span>
                  </div>
                  <p className="mt-3 text-base font-bold text-white">
                    ou {p.precoAvista} à vista, por ano
                  </p>
                </div>
              ) : (
                <>
                  <p className={"mt-3 text-2xl font-bold " + (p.destaque ? "text-sky-400" : "")}>
                    {p.preco}
                  </p>
                  {p.periodo && <p className="text-xs text-neutral-400">{p.periodo}</p>}
                </>
              )}

              <ul className="mt-6 flex-1 space-y-2 text-sm text-neutral-200">
                {p.itens.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span aria-hidden="true" className="text-sky-400">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {p.checkoutUrl ? (
                <a
                  href={p.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    "mt-6 block rounded-lg px-5 py-3.5 text-center text-base font-bold transition-transform active:scale-[0.98] " +
                    (p.destaque
                      ? "bg-sky-500 text-white shadow-lg shadow-sky-500/40 hover:bg-sky-400"
                      : "border border-white/20 text-white hover:bg-white/10")
                  }
                >
                  Quero esse plano
                </a>
              ) : (
                <Link
                  href="/cadastro"
                  className={
                    "mt-6 block rounded-lg px-5 py-2.5 text-center text-sm font-semibold transition-colors " +
                    (p.destaque
                      ? "bg-sky-400 text-neutral-950 hover:bg-sky-300"
                      : "border border-white/20 text-white hover:bg-white/10")
                  }
                >
                  Criar conta grátis
                </Link>
              )}

              {p.precoDe && (
                <div className="mt-5 flex items-center justify-center gap-4 border-t border-white/10 pt-4 text-[11px] text-neutral-400">
                  <span className="flex items-center gap-1">🔒 Compra segura</span>
                  <span className="flex items-center gap-1">✅ Garantia 14 dias</span>
                  <span className="flex items-center gap-1">🔐 Dados protegidos</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {planos.length > 1 && (
      <div className="mt-5 flex justify-center gap-2 sm:hidden">
        {planos.map((p, i) => (
          <button
            key={p.nome}
            type="button"
            aria-label={`Ver plano ${p.nome}`}
            onClick={() => {
              setActive(i);
              scrollToIndex(i);
            }}
            className={
              "h-2 rounded-full transition-all " +
              (i === active ? "w-6 bg-sky-500" : "w-2 bg-white/20")
            }
          />
        ))}
      </div>
      )}
    </div>
  );
}
