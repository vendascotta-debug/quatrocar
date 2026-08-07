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
};

export function PricingCarousel({ planos }: { planos: Plano[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % planos.length;
        scrollToIndex(next);
        return next;
      });
    }, 4000);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible sm:snap-none sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {planos.map((p) => (
          <div key={p.nome} className="w-[85%] shrink-0 snap-center sm:w-auto">
            <div
              className={
                "relative flex h-full flex-col rounded-2xl border p-6 transition-transform duration-500 " +
                (p.destaque
                  ? "border-sky-400 bg-neutral-950 text-white shadow-xl shadow-sky-500/10"
                  : "border-neutral-200 bg-white text-neutral-900")
              }
            >
              {p.destaque && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sky-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-neutral-950">
                  Mais popular
                </span>
              )}
              <h3 className="font-semibold">{p.nome}</h3>
              <p className={"mt-1 text-xs " + (p.destaque ? "text-neutral-400" : "text-neutral-500")}>
                {p.publico}
              </p>
              <p className={"mt-3 text-2xl font-bold " + (p.destaque ? "text-sky-400" : "")}>
                {p.preco}
              </p>
              {p.periodo && (
                <p className={"text-xs " + (p.destaque ? "text-neutral-400" : "text-neutral-500")}>
                  {p.periodo}
                </p>
              )}
              <ul className="mt-5 flex-1 space-y-2 text-sm">
                {p.itens.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span aria-hidden="true" className={p.destaque ? "text-sky-400" : "text-neutral-900"}>
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/cadastro"
                className={
                  "mt-6 block rounded-lg px-5 py-2.5 text-center text-sm font-semibold transition-colors " +
                  (p.destaque
                    ? "bg-sky-400 text-neutral-950 hover:bg-sky-300"
                    : "border border-neutral-300 text-neutral-900 hover:bg-neutral-100")
                }
              >
                {p.nome === "Gratuito" ? "Criar conta grátis" : "Quero esse plano"}
              </Link>
            </div>
          </div>
        ))}
      </div>

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
              (i === active ? "w-6 bg-sky-500" : "w-2 bg-neutral-300")
            }
          />
        ))}
      </div>
    </div>
  );
}
