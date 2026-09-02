"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window)
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={
        "transition-[opacity,transform,filter] duration-700 motion-reduce:transition-none motion-reduce:transform-none motion-reduce:blur-none " +
        (visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-[3px]") +
        " " +
        className
      }
      style={{
        transitionDelay: visible ? `${delay}ms` : "0ms",
        // Expo-out: fast start, long soft deceleration — reads as premium, never overshoots (no bounce).
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}
