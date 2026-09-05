"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { solicitarReembolso, solicitarCancelamento, encaminharSuporte } from "@/app/suporte-actions";
import { KIWIFY_CHECKOUT_URL } from "@/lib/constants";

type Tela =
  | { tipo: "menu" }
  | { tipo: "reembolso-email" }
  | { tipo: "cancelar-email" }
  | { tipo: "upgrade" }
  | { tipo: "mensagem"; assunto: "problema" | "duvida" | "suporte"; titulo: string }
  | { tipo: "resultado"; texto: string };

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-400";
const itemClass =
  "w-full rounded-lg bg-white/5 px-4 py-3 text-left text-sm text-white transition-colors hover:bg-white/10";

export function SupportWidget() {
  const [aberto, setAberto] = useState(false);
  const [tela, setTela] = useState<Tela>({ tipo: "menu" });
  const [pending, startTransition] = useTransition();

  function reset() {
    setTela({ tipo: "menu" });
  }

  function fechar() {
    setAberto(false);
    reset();
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {aberto && (
        <div className="mb-3 w-[320px] overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl sm:w-[360px]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">Suporte QuatroCar</p>
              <p className="text-xs text-neutral-400">Respondemos por e-mail em até 24h úteis</p>
            </div>
            <button
              type="button"
              onClick={fechar}
              className="text-neutral-400 hover:text-white"
              aria-label="Fechar"
            >
              ✕
            </button>
          </div>

          <div className="max-h-[420px] overflow-y-auto p-4">
            {tela.tipo === "menu" && (
              <div className="space-y-2">
                <p className="mb-1 text-sm text-neutral-300">Como posso te ajudar? 👋</p>
                <button className={itemClass} onClick={() => setTela({ tipo: "reembolso-email" })}>
                  💰 Solicitar reembolso (garantia de 14 dias)
                </button>
                <button className={itemClass} onClick={() => setTela({ tipo: "upgrade" })}>
                  🚗 Assinar o QuatroCar
                </button>
                <button className={itemClass} onClick={() => setTela({ tipo: "cancelar-email" })}>
                  🚫 Cancelar renovação automática
                </button>
                <button
                  className={itemClass}
                  onClick={() => setTela({ tipo: "mensagem", assunto: "problema", titulo: "Reportar um problema" })}
                >
                  🐞 Reportar um problema
                </button>
                <button
                  className={itemClass}
                  onClick={() => setTela({ tipo: "mensagem", assunto: "duvida", titulo: "Tenho uma dúvida" })}
                >
                  ❓ Tenho uma dúvida
                </button>
                <button
                  className={itemClass}
                  onClick={() => setTela({ tipo: "mensagem", assunto: "suporte", titulo: "Falar com suporte" })}
                >
                  💬 Falar com suporte
                </button>
              </div>
            )}

            {tela.tipo === "reembolso-email" && (
              <EmailForm
                label="Qual o e-mail cadastrado na sua conta?"
                botao="Solicitar reembolso"
                pending={pending}
                onVoltar={reset}
                onEnviar={(email) =>
                  startTransition(async () => {
                    const r = await solicitarReembolso(email);
                    setTela({ tipo: "resultado", texto: r.mensagem });
                  })
                }
              />
            )}

            {tela.tipo === "cancelar-email" && (
              <EmailForm
                label="Qual o e-mail cadastrado na sua conta?"
                botao="Cancelar renovação"
                pending={pending}
                onVoltar={reset}
                onEnviar={(email) =>
                  startTransition(async () => {
                    const r = await solicitarCancelamento(email);
                    setTela({ tipo: "resultado", texto: r.mensagem });
                  })
                }
              />
            )}

            {tela.tipo === "upgrade" && (
              <div className="space-y-3">
                <p className="text-sm text-neutral-300">
                  Assinatura anual do QuatroCar:
                </p>
                <a
                  href={KIWIFY_CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg bg-sky-400 px-4 py-3 text-center text-sm font-semibold text-neutral-950 hover:bg-sky-300"
                >
                  R$ 97/ano à vista ou 12x no cartão
                </a>
                <Link
                  href="/#planos"
                  onClick={fechar}
                  className="block text-center text-xs text-neutral-400 underline"
                >
                  Ver todos os recursos incluídos
                </Link>
                <button onClick={reset} className="text-xs text-neutral-400 underline">
                  ← Voltar
                </button>
              </div>
            )}

            {tela.tipo === "mensagem" && (
              <MensagemForm
                titulo={tela.titulo}
                pending={pending}
                onVoltar={reset}
                onEnviar={(email, mensagem) =>
                  startTransition(async () => {
                    const r = await encaminharSuporte(tela.assunto, email, mensagem);
                    setTela({ tipo: "resultado", texto: r.mensagem });
                  })
                }
              />
            )}

            {tela.tipo === "resultado" && (
              <div className="space-y-3">
                <p className="text-sm text-neutral-200">{tela.texto}</p>
                <button
                  onClick={reset}
                  className="rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-neutral-950 hover:bg-sky-300"
                >
                  Voltar ao menu
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-label="Abrir suporte"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-400 text-2xl text-neutral-950 shadow-xl transition-transform hover:scale-105"
      >
        💬
      </button>
    </div>
  );
}

function EmailForm({
  label,
  botao,
  pending,
  onVoltar,
  onEnviar,
}: {
  label: string;
  botao: string;
  pending: boolean;
  onVoltar: () => void;
  onEnviar: (email: string) => void;
}) {
  const [email, setEmail] = useState("");
  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) onEnviar(email.trim());
      }}
    >
      <label className="block text-sm text-neutral-300">{label}</label>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="voce@email.com"
        className={inputClass}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className="flex-1 rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-neutral-950 hover:bg-sky-300 disabled:opacity-50"
        >
          {pending ? "Enviando..." : botao}
        </button>
        <button type="button" onClick={onVoltar} className="rounded-lg px-3 text-xs text-neutral-400 underline">
          Voltar
        </button>
      </div>
    </form>
  );
}

function MensagemForm({
  titulo,
  pending,
  onVoltar,
  onEnviar,
}: {
  titulo: string;
  pending: boolean;
  onVoltar: () => void;
  onEnviar: (email: string, mensagem: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (mensagem.trim()) onEnviar(email.trim(), mensagem.trim());
      }}
    >
      <p className="text-sm text-neutral-300">{titulo}</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Seu e-mail (opcional)"
        className={inputClass}
      />
      <textarea
        required
        rows={4}
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        placeholder="Escreva sua mensagem..."
        className={inputClass}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className="flex-1 rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-neutral-950 hover:bg-sky-300 disabled:opacity-50"
        >
          {pending ? "Enviando..." : "Enviar"}
        </button>
        <button type="button" onClick={onVoltar} className="rounded-lg px-3 text-xs text-neutral-400 underline">
          Voltar
        </button>
      </div>
    </form>
  );
}
