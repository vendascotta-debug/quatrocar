"use client";

import { useTransition } from "react";
import { setUserPlano } from "./actions";

export function PlanoSelect({ userId, plano }: { userId: string; plano: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={plano}
      disabled={pending}
      onChange={(e) => startTransition(() => setUserPlano(userId, e.target.value))}
      className="rounded-lg border border-neutral-300 px-2 py-1 text-sm disabled:opacity-50"
    >
      <option value="free">Gratuito</option>
      <option value="premium">Premium</option>
      <option value="empresas">Empresas</option>
      <option value="cortesia">Cortesia</option>
    </select>
  );
}
