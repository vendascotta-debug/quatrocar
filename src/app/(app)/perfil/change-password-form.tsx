"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { PasswordInput } from "@/components/auth/password-input";

const inputClass =
  "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900";
const labelClass = "text-sm font-medium text-neutral-700";

export function ChangePasswordForm() {
  const [senha, setSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSucesso(false);

    if (senha.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (senha !== confirmacao) {
      setError("As senhas não coincidem.");
      return;
    }

    setPending(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: senha });
    setPending(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSenha("");
    setConfirmacao("");
    setSucesso(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className={labelClass} htmlFor="nova_senha">Nova senha</label>
        <PasswordInput
          id="nova_senha"
          minLength={6}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className={inputClass}
        />
      </div>
      <div className="space-y-1">
        <label className={labelClass} htmlFor="confirmar_senha">Confirme a nova senha</label>
        <PasswordInput
          id="confirmar_senha"
          minLength={6}
          value={confirmacao}
          onChange={(e) => setConfirmacao(e.target.value)}
          className={inputClass}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {sucesso && <p className="text-sm text-green-600">Senha atualizada com sucesso.</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-50"
      >
        {pending ? "Salvando..." : "Trocar senha"}
      </button>
    </form>
  );
}
