"use client";

import { useState, type InputHTMLAttributes } from "react";

export function PasswordInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  const [visivel, setVisivel] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        type={visivel ? "text" : "password"}
        className={`${className ?? ""} pr-10`}
      />
      <button
        type="button"
        onClick={() => setVisivel((v) => !v)}
        aria-label={visivel ? "Ocultar senha" : "Mostrar senha"}
        className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-neutral-400 hover:text-neutral-700"
      >
        {visivel ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 3l18 18" strokeLinecap="round" />
            <path
              d="M10.6 10.6a2.5 2.5 0 0 0 3.5 3.5M9.3 5.5A10.9 10.9 0 0 1 12 5c5 0 9 4 10 7-.4 1.1-1.2 2.4-2.4 3.6M6.1 6.9C4.1 8.2 2.7 10 2 12c1 3 5 7 10 7 1.3 0 2.6-.3 3.7-.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="2.8" />
          </svg>
        )}
      </button>
    </div>
  );
}
