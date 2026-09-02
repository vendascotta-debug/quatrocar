"use client";

import { useEffect, useState } from "react";

const lineA = ["Seu", "carro", "tem", "uma", "história."];
const lineB = ["O", "QuatroCar", "guarda", "cada", "capítulo."];

export function HeroHeadline() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setMounted(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  const renderWord = (word: string, wordIndex: number, colored: boolean) => {
    const delay = 160 + wordIndex * 65;
    return (
      <span
        key={`${word}-${wordIndex}`}
        className="mr-[0.28em] inline-block overflow-hidden pb-[0.2em] align-bottom"
      >
        <span
          className={
            "inline-block drop-shadow-[0_6px_28px_rgba(0,0,0,0.65)] transition-[transform,opacity,filter] duration-[950ms] " +
            (colored ? "text-sky-400" : "text-white")
          }
          style={{
            transform: mounted ? "translateY(0%)" : "translateY(120%)",
            opacity: mounted ? 1 : 0,
            filter: mounted ? "blur(0px)" : "blur(8px)",
            transitionDelay: `${delay}ms`,
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {word}
        </span>
      </span>
    );
  };

  return (
    <h1 className="text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.4rem]">
      <span className="block">{lineA.map((w, i) => renderWord(w, i, false))}</span>
      <span className="block">
        {lineB.map((w, i) => renderWord(w, lineA.length + i, true))}
      </span>
    </h1>
  );
}
