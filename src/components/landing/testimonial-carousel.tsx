"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type Testimonial = {
  imagem: string;
  alt: string;
  citacao: string;
  nome: string;
  papel: string;
};

function wrapDelta(i: number, active: number, length: number) {
  let d = i - active;
  if (d > length / 2) d -= length;
  if (d < -length / 2) d += length;
  return d;
}

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => setActive(((index % items.length) + items.length) % items.length);
  const next = () => goTo(active + 1);
  const prev = () => goTo(active - 1);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let visible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.5 }
    );
    observer.observe(el);

    if (paused) return () => observer.disconnect();

    const timer = window.setInterval(() => {
      if (!visible) return;
      setActive((prev) => (prev + 1) % items.length);
    }, 6000);

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, [paused, items.length]);

  const current = items[active];

  return (
    <div
      ref={sectionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-16"
    >
      <div className="relative w-full overflow-hidden py-2">
      <div className="relative mx-auto h-[22rem] w-full max-w-xs sm:h-[26rem] sm:max-w-sm">
        {items.map((item, i) => {
          const delta = wrapDelta(i, active, items.length);
          if (Math.abs(delta) > 1) return null;
          const isActive = delta === 0;

          return (
            <button
              key={item.imagem}
              type="button"
              aria-label={isActive ? undefined : `Ver depoimento de ${item.nome}`}
              tabIndex={isActive ? -1 : 0}
              onClick={() => !isActive && goTo(i)}
              style={{
                transform: `translateX(${delta * 62}%) scale(${isActive ? 1 : 0.82})`,
                zIndex: isActive ? 20 : 10,
                opacity: isActive ? 1 : 0.55,
              }}
              className={
                "absolute inset-0 overflow-hidden rounded-2xl shadow-xl transition-all duration-500 ease-out " +
                (isActive ? "cursor-default" : "cursor-pointer")
              }
            >
              <Image
                src={item.imagem}
                alt={item.alt}
                fill
                sizes="(min-width: 640px) 24rem, 20rem"
                className="object-cover"
              />
            </button>
          );
        })}

        <button
          type="button"
          aria-label="Depoimento anterior"
          onClick={prev}
          className="absolute left-1 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-sm shadow-lg transition-transform hover:scale-110 hover:bg-white/20"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Próximo depoimento"
          onClick={next}
          className="absolute right-1 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-sm shadow-lg transition-transform hover:scale-110 hover:bg-white/20"
        >
          ›
        </button>
      </div>
      </div>

      <div className="text-center md:text-left">
        <span className="text-4xl text-sky-500" aria-hidden="true">
          &ldquo;
        </span>
        <p className="min-h-[6rem] text-xl font-medium leading-snug text-white sm:text-2xl">
          {current.citacao}
        </p>
        <p className="mt-5 font-semibold text-white">{current.nome}</p>
        <p className="text-sm text-neutral-400">{current.papel}</p>

        <div className="mt-6 flex justify-center gap-2 md:justify-start">
          {items.map((item, i) => (
            <button
              key={item.imagem}
              type="button"
              aria-label={`Ver depoimento de ${item.nome}`}
              onClick={() => goTo(i)}
              className={
                "h-2 rounded-full transition-all " +
                (i === active ? "w-6 bg-sky-500" : "w-2 bg-white/20")
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
