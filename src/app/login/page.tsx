"use client";

import Link from "next/link";
import { Suspense, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { login, type AuthState } from "./actions";
import { GoogleButton } from "@/components/auth/google-button";

const initialState: AuthState = {};

function OAuthError() {
  const searchParams = useSearchParams();
  const oauthError = searchParams.get("error");

  if (!oauthError) return null;

  return <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{oauthError}</p>;
}

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="flex flex-1 items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold text-neutral-900">Entrar</h1>

        <Suspense fallback={null}>
          <OAuthError />
        </Suspense>

        <GoogleButton />

        <div className="flex items-center gap-3 text-xs text-neutral-400">
          <div className="h-px flex-1 bg-neutral-200" />
          ou
          <div className="h-px flex-1 bg-neutral-200" />
        </div>

        <form action={formAction} className="space-y-4">
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

          <p className="text-right text-sm">
            <Link href="/esqueci-senha" className="text-neutral-600 underline hover:text-neutral-900">
              Esqueci minha senha
            </Link>
          </p>

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-50"
          >
            {pending ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center text-sm text-neutral-600">
          Não tem conta?{" "}
          <Link href="/cadastro" className="font-medium text-neutral-900 underline">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}
