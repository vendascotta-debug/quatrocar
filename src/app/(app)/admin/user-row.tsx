"use client";

import { useState, useTransition } from "react";
import { PlanoSelect } from "./plano-select";
import { updateUserProfile, deleteUser } from "./actions";

export function UserRow({
  userId,
  email,
  nome,
  whatsapp,
  plano,
  totalVeiculos,
  criadoEm,
  valor,
  kiwifySaleId,
  isSelf,
}: {
  userId: string;
  email: string;
  nome: string | null;
  whatsapp: string | null;
  plano: string;
  totalVeiculos: number;
  criadoEm: string;
  valor: string;
  kiwifySaleId: string | null;
  isSelf: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [detalhes, setDetalhes] = useState(false);
  const [nomeValue, setNomeValue] = useState(nome ?? "");
  const [whatsappValue, setWhatsappValue] = useState(whatsapp ?? "");
  const [pending, startTransition] = useTransition();

  const save = () => {
    startTransition(async () => {
      await updateUserProfile(userId, nomeValue, whatsappValue);
      setEditing(false);
    });
  };

  const remove = () => {
    if (!confirm(`Excluir a conta de ${email}? Isso apaga todos os veículos e histórico dela. Essa ação não pode ser desfeita.`)) {
      return;
    }
    startTransition(async () => {
      await deleteUser(userId);
    });
  };

  return (
    <>
    <tr>
      <td className="px-4 py-3 text-neutral-900">
        {editing ? (
          <input
            value={nomeValue}
            onChange={(e) => setNomeValue(e.target.value)}
            className="w-32 rounded border border-neutral-300 px-2 py-1 text-sm"
          />
        ) : (
          nome || "—"
        )}
      </td>
      <td className="px-4 py-3 text-neutral-600">{email}</td>
      <td className="px-4 py-3 text-neutral-600">
        {editing ? (
          <input
            value={whatsappValue}
            onChange={(e) => setWhatsappValue(e.target.value)}
            className="w-32 rounded border border-neutral-300 px-2 py-1 text-sm"
          />
        ) : (
          whatsapp || "—"
        )}
      </td>
      <td className="px-4 py-3 text-neutral-600">{totalVeiculos}</td>
      <td className="px-4 py-3 text-neutral-600">
        {new Date(criadoEm).toLocaleDateString("pt-BR")}
      </td>
      <td className="px-4 py-3">
        <PlanoSelect userId={userId} plano={plano} />
      </td>
      <td className="px-4 py-3 text-neutral-600">{valor}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          {editing ? (
            <>
              <button
                type="button"
                onClick={save}
                disabled={pending}
                className="rounded border border-neutral-300 px-2 py-1 text-xs font-medium text-neutral-900 hover:bg-neutral-100 disabled:opacity-50"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="text-xs text-neutral-500 hover:text-neutral-700"
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setDetalhes((v) => !v)}
                className="rounded border border-neutral-300 px-2 py-1 text-xs font-medium text-neutral-900 hover:bg-neutral-100"
              >
                {detalhes ? "Ocultar" : "Detalhes"}
              </button>
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="rounded border border-neutral-300 px-2 py-1 text-xs font-medium text-neutral-900 hover:bg-neutral-100"
              >
                Editar
              </button>
              {!isSelf && (
                <button
                  type="button"
                  onClick={remove}
                  disabled={pending}
                  className="rounded border border-red-300 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  Excluir
                </button>
              )}
            </>
          )}
        </div>
      </td>
    </tr>
    {detalhes && (
      <tr className="bg-neutral-50">
        <td colSpan={8} className="px-4 py-3 text-sm text-neutral-600">
          <div className="grid gap-2 sm:grid-cols-3">
            <p>
              <span className="font-medium text-neutral-900">ID da venda (Kiwify):</span>{" "}
              {kiwifySaleId || "— (nenhuma compra registrada por webhook)"}
            </p>
            <p>
              <span className="font-medium text-neutral-900">ID do usuário:</span> {userId}
            </p>
            <p>
              <span className="font-medium text-neutral-900">E-mail completo:</span> {email}
            </p>
          </div>
        </td>
      </tr>
    )}
    </>
  );
}
