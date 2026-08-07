"use client";

import { useActionState } from "react";
import { completarPerfil, type CompletarPerfilState } from "./actions";

const initialState: CompletarPerfilState = {};

export default function CompletarPerfilPage() {
  const [state, formAction, pending] = useActionState(completarPerfil, initialState);

  return (
    <div className="flex flex-1 items-center justify-center px-6">
      <form action={formAction} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold text-neutral-900">Só mais um passo</h1>
        <p className="text-sm text-neutral-600">
          Precisamos do seu WhatsApp para enviar alertas de manutenção do seu veículo.
        </p>

        <div className="space-y-1">
          <label htmlFor="whatsapp" className="text-sm font-medium text-neutral-700">
            WhatsApp
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            required
            placeholder="Ex: (11) 91234-5678"
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>

        {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-50"
        >
          {pending ? "Salvando..." : "Continuar"}
        </button>
      </form>
    </div>
  );
}
