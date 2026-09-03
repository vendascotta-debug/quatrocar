"use client";

import { useState, useTransition } from "react";
import { consultarFipe } from "./fipe-actions";
import type { FipeCandidato } from "@/lib/fipe";

function currency(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function FipeCard({
  vehicleId,
  valorFipe,
  atualizadoEm,
}: {
  vehicleId: string;
  valorFipe: number | null;
  atualizadoEm: string | null;
}) {
  const [pending, startTransition] = useTransition();
  const [candidatos, setCandidatos] = useState<FipeCandidato[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  function buscar(modeloCodigo?: string) {
    setErro(null);
    startTransition(async () => {
      const resultado = await consultarFipe(vehicleId, modeloCodigo);
      if (resultado.status === "ok") {
        setCandidatos(null);
      } else if (resultado.status === "ambiguo") {
        setCandidatos(resultado.candidatos);
      } else {
        setCandidatos(null);
        setErro("Não encontramos esse veículo na tabela Fipe automaticamente.");
      }
    });
  }

  return (
    <div className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
        📊
      </span>
      <div className="flex-1">
        <p className="text-sm text-neutral-500">Valor tabela Fipe</p>
        {valorFipe ? (
          <>
            <p className="text-xl font-semibold text-emerald-700">{currency(valorFipe)}</p>
            {atualizadoEm && (
              <p className="text-xs text-neutral-500">
                Atualizado em {new Date(atualizadoEm).toLocaleDateString("pt-BR")}
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-neutral-500">Ainda não consultado</p>
        )}

        {candidatos && (
          <div className="mt-2 space-y-2">
            <p className="text-xs text-neutral-600">
              Encontramos mais de uma versão parecida. Selecione a correta:
            </p>
            <select
              className="w-full rounded-lg border border-neutral-300 px-2 py-1.5 text-sm"
              defaultValue=""
              onChange={(e) => e.target.value && buscar(e.target.value)}
            >
              <option value="" disabled>
                Selecione a versão do veículo
              </option>
              {candidatos.map((c) => (
                <option key={c.codigo} value={c.codigo}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>
        )}

        {erro && <p className="mt-1 text-xs text-red-600">{erro}</p>}

        <button
          type="button"
          onClick={() => buscar()}
          disabled={pending}
          className="mt-2 text-xs font-medium text-emerald-700 underline disabled:opacity-50"
        >
          {pending ? "Consultando..." : valorFipe ? "Atualizar valor" : "Consultar automaticamente"}
        </button>
      </div>
    </div>
  );
}
