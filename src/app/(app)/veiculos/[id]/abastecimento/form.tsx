"use client";

import { useActionState } from "react";
import type { FuelFormState } from "./actions";
import type { FuelRecord } from "@/lib/types";

const initialState: FuelFormState = {};

const inputClass =
  "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900";
const labelClass = "text-sm font-medium text-neutral-700";

export function AbastecimentoForm({
  action,
  record,
  onDelete,
}: {
  action: (prev: FuelFormState, formData: FormData) => Promise<FuelFormState>;
  record?: FuelRecord;
  onDelete?: () => Promise<void>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <div className="space-y-4">
      <form action={formAction} id="fuel-form" className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className={labelClass} htmlFor="data">Data</label>
          <input
            id="data"
            name="data"
            type="date"
            defaultValue={record?.data ?? new Date().toISOString().slice(0, 10)}
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass} htmlFor="km">Quilometragem *</label>
          <input id="km" name="km" type="number" required defaultValue={record?.km} className={inputClass} />
        </div>
      </div>

      <div className="space-y-1">
        <label className={labelClass} htmlFor="combustivel">Combustível *</label>
        <select
          id="combustivel"
          name="combustivel"
          required
          className={inputClass}
          defaultValue={record?.combustivel ?? ""}
        >
          <option value="" disabled>Selecione</option>
          <option value="Gasolina">Gasolina</option>
          <option value="Etanol">Etanol</option>
          <option value="Diesel">Diesel</option>
          <option value="GNV">GNV</option>
          <option value="Elétrico">Elétrico (recarga)</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className={labelClass} htmlFor="litros">Litros *</label>
          <input
            id="litros"
            name="litros"
            type="number"
            step="0.01"
            required
            defaultValue={record?.litros}
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass} htmlFor="preco_litro">Preço por litro (R$) *</label>
          <input
            id="preco_litro"
            name="preco_litro"
            type="number"
            step="0.001"
            required
            defaultValue={record?.preco_litro}
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className={labelClass} htmlFor="posto">Posto</label>
        <input id="posto" name="posto" defaultValue={record?.posto ?? ""} className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className={labelClass} htmlFor="cidade">Cidade</label>
          <input id="cidade" name="cidade" defaultValue={record?.cidade ?? ""} className={inputClass} />
        </div>
        <div className="space-y-1">
          <label className={labelClass} htmlFor="forma_pagamento">Forma de pagamento</label>
          <select
            id="forma_pagamento"
            name="forma_pagamento"
            className={inputClass}
            defaultValue={record?.forma_pagamento ?? ""}
          >
            <option value="" disabled>Selecione</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Débito">Débito</option>
            <option value="Crédito">Crédito</option>
            <option value="PIX">PIX</option>
            <option value="App">App (Uber/99/frota)</option>
          </select>
        </div>
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      </form>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          form="fuel-form"
          disabled={pending}
          className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-50"
        >
          {pending ? "Salvando..." : "Salvar abastecimento"}
        </button>
        {onDelete && (
          <form action={onDelete}>
            <button
              type="submit"
              className="rounded-lg border border-red-300 px-5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Excluir
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
