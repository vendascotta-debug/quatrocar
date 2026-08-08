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

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    }, 5000);

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
      <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-2xl shadow-xl sm:max-w-sm">
        {items.map((item, i) => (
          <Image
            key={item.imagem}
            src={item.imagem}
            alt={item.alt}
            fill
            sizes="(min-width: 640px) 24rem, 20rem"
            className={
              "object-cover transition-opacity duration-500 " +
              (i === active ? "opacity-100" : "opacity-0")
            }
          />
        ))}
      </div>

      <div className="text-center md:text-left">
        <span className="text-4xl text-sky-500" aria-hidden="true">
          &ldquo;
        </span>
        <p className="min-h-[6rem] text-xl font-medium leading-snug text-neutral-900 sm:text-2xl">
          {current.citacao}
        </p>
        <p className="mt-5 font-semibold text-neutral-900">{current.nome}</p>
        <p className="text-sm text-neutral-500">{current.papel}</p>

        <div className="mt-6 flex justify-center gap-2 md:justify-start">
          {items.map((item, i) => (
            <button
              key={item.imagem}
              type="button"
              aria-label={`Ver depoimento de ${item.nome}`}
              onClick={() => setActive(i)}
              className={
                "h-2 rounded-full transition-all " +
                (i === active ? "w-6 bg-sky-500" : "w-2 bg-neutral-300")
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
