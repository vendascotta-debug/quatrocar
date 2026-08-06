"use client";

import { useActionState } from "react";
import type { MaintenanceFormState } from "./actions";
import type { MaintenanceCategory, MaintenanceRecord } from "@/lib/types";

const initialState: MaintenanceFormState = {};

const inputClass =
  "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900";
const labelClass = "text-sm font-medium text-neutral-700";

export function ManutencaoForm({
  action,
  categorias,
  record,
  onDelete,
}: {
  action: (prev: MaintenanceFormState, formData: FormData) => Promise<MaintenanceFormState>;
  categorias: MaintenanceCategory[];
  record?: MaintenanceRecord;
  onDelete?: () => Promise<void>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  const grupos = Array.from(new Set(categorias.map((c) => c.grupo)));

  return (
    <div className="space-y-4">
      <form action={formAction} id="maintenance-form" className="space-y-4">
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
          <input
            id="km"
            name="km"
            type="number"
            required
            defaultValue={record?.km}
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className={labelClass} htmlFor="categoria_id">Categoria</label>
        <select
          id="categoria_id"
          name="categoria_id"
          className={inputClass}
          defaultValue={record?.categoria_id ?? ""}
        >
          <option value="" disabled>Selecione</option>
          {grupos.map((grupo) => (
            <optgroup key={grupo} label={grupo}>
              {categorias
                .filter((c) => c.grupo === grupo)
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className={labelClass} htmlFor="subtipo">Descrição / subtipo</label>
        <input
          id="subtipo"
          name="subtipo"
          defaultValue={record?.subtipo ?? ""}
          className={inputClass}
          placeholder="Ex: troca completa"
        />
      </div>

      <div className="space-y-1">
        <label className={labelClass} htmlFor="mecanico">Oficina / mecânico</label>
        <input id="mecanico" name="mecanico" defaultValue={record?.mecanico ?? ""} className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className={labelClass} htmlFor="valor_mao_obra">Valor mão de obra (R$)</label>
          <input
            id="valor_mao_obra"
            name="valor_mao_obra"
            type="number"
            step="0.01"
            defaultValue={record?.valor_mao_obra}
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass} htmlFor="valor_pecas">Valor peças (R$)</label>
          <input
            id="valor_pecas"
            name="valor_pecas"
            type="number"
            step="0.01"
            defaultValue={record?.valor_pecas}
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className={labelClass} htmlFor="garantia_meses">Garantia (meses)</label>
        <input
          id="garantia_meses"
          name="garantia_meses"
          type="number"
          defaultValue={record?.garantia_meses ?? ""}
          className={inputClass}
        />
      </div>

      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3 space-y-3">
        <p className="text-sm font-medium text-neutral-700">
          Quando é a próxima troca desta peça/serviço?
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className={labelClass} htmlFor="intervalo_km">A cada quantos km</label>
            <input
              id="intervalo_km"
              name="intervalo_km"
              type="number"
              placeholder="Ex: 10000"
              defaultValue={record?.intervalo_km ?? ""}
              className={inputClass}
            />
          </div>
          <div className="space-y-1">
            <label className={labelClass} htmlFor="intervalo_meses">Ou a cada quantos meses</label>
            <input
              id="intervalo_meses"
              name="intervalo_meses"
              type="number"
              placeholder="Ex: 12"
              defaultValue={record?.intervalo_meses ?? ""}
              className={inputClass}
            />
          </div>
        </div>
        <p className="text-xs text-neutral-500">
          O QuatroCar vai calcular sozinho quando essa manutenção vence de novo e te avisar.
        </p>
      </div>

      <div className="space-y-1">
        <label className={labelClass} htmlFor="observacoes">Observações</label>
        <textarea
          id="observacoes"
          name="observacoes"
          rows={3}
          defaultValue={record?.observacoes ?? ""}
          className={inputClass}
        />
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      </form>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          form="maintenance-form"
          disabled={pending}
          className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-50"
        >
          {pending ? "Salvando..." : "Salvar registro"}
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
