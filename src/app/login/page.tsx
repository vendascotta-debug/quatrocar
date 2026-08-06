"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, type AuthState } from "./actions";

const initialState: AuthState = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="flex flex-1 items-center justify-center px-6">
      <form action={formAction} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold text-neutral-900">Entrar</h1>

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
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>

        {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-50"
        >
          {pending ? "Entrando..." : "Entrar"}
        </button>

        <p className="text-center text-sm text-neutral-600">
          Não tem conta?{" "}
          <Link href="/cadastro" className="font-medium text-neutral-900 underline">
            Criar conta
          </Link>
        </p>
      </form>
    </div>
  );
}
