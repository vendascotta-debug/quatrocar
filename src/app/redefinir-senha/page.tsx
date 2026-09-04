"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PasswordInput } from "@/components/auth/password-input";

export default function RedefinirSenhaPage() {
  const router = useRouter();
  const [pronto, setPronto] = useState(false);
  const [senha, setSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    // O link de recuperação do Supabase estabelece a sessão automaticamente
    // ao carregar a página (via hash da URL). Só liberamos o formulário
    // depois que essa sessão existir.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setPronto(true);
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setPronto(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

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

    setSucesso(true);
    setTimeout(() => router.push("/dashboard"), 1500);
  }

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold text-neutral-900">Definir nova senha</h1>

        {!pronto ? (
          <p className="text-sm text-neutral-500">Validando seu link...</p>
        ) : sucesso ? (
          <p className="text-sm text-green-700">Senha atualizada! Redirecionando...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="senha" className="text-sm font-medium text-neutral-700">
                Nova senha
              </label>
              <PasswordInput
                id="senha"
                required
                minLength={6}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="confirmacao" className="text-sm font-medium text-neutral-700">
                Confirme a nova senha
              </label>
              <PasswordInput
                id="confirmacao"
                required
                minLength={6}
                value={confirmacao}
                onChange={(e) => setConfirmacao(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-50"
            >
              {pending ? "Salvando..." : "Salvar nova senha"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
