"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signup, type AuthState } from "./actions";

const initialState: AuthState = {};

export default function CadastroPage() {
  const [state, formAction, pending] = useActionState(signup, initialState);

  return (
    <div className="flex flex-1 items-center justify-center px-6">
      <form action={formAction} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold text-neutral-900">Criar conta</h1>

        <div className="space-y-1">
          <label htmlFor="nome" className="text-sm font-medium text-neutral-700">
            Nome
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            required
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-neutral-700">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium text-neutral-700">
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>

        {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-50"
        >
          {pending ? "Criando..." : "Criar conta"}
        </button>

        <p className="text-center text-sm text-neutral-600">
          Já tem conta?{" "}
          <Link href="/login" className="font-medium text-neutral-900 underline">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  );
}
