"use client";

import { useActionState } from "react";
import { updateProfile, type ProfileFormState } from "./actions";
import type { Profile } from "@/lib/types";

const initialState: ProfileFormState = {};

const inputClass =
  "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900";
const labelClass = "text-sm font-medium text-neutral-700";

export function PerfilForm({ profile }: { profile?: Profile }) {
  const [state, formAction, pending] = useActionState(updateProfile, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1">
        <label className={labelClass} htmlFor="nome">Nome</label>
        <input id="nome" name="nome" required defaultValue={profile?.nome ?? ""} className={inputClass} />
      </div>

      <div className="space-y-1">
        <label className={labelClass} htmlFor="whatsapp">
          WhatsApp (para receber alertas de manutenção)
        </label>
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          placeholder="Ex: (11) 91234-5678"
          defaultValue={profile?.whatsapp ?? ""}
          className={inputClass}
        />
        <p className="text-xs text-neutral-500">
          Usamos este número pra avisar quando uma manutenção, documento ou seguro estiver
          vencendo, e pra mandar um resumo diário dos seus gastos.
        </p>
      </div>

      <div className="space-y-1">
        <label className={labelClass} htmlFor="telefone">Telefone (opcional)</label>
        <input
          id="telefone"
          name="telefone"
          type="tel"
          defaultValue={profile?.telefone ?? ""}
          className={inputClass}
        />
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-600">Perfil atualizado com sucesso.</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-50"
      >
        {pending ? "Salvando..." : "Salvar perfil"}
      </button>
    </form>
  );
}
