"use client";

import { useActionState } from "react";
import type { VehicleFormState } from "./actions";
import type { Vehicle } from "@/lib/types";

const initialState: VehicleFormState = {};

const inputClass =
  "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900";
const labelClass = "text-sm font-medium text-neutral-700";

export function VeiculoForm({
  action,
  vehicle,
  onDelete,
}: {
  action: (prev: VehicleFormState, formData: FormData) => Promise<VehicleFormState>;
  vehicle?: Vehicle;
  onDelete?: () => Promise<void>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <div className="space-y-4">
      <form action={formAction} id="vehicle-form" className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className={labelClass} htmlFor="marca">Marca *</label>
          <input id="marca" name="marca" required defaultValue={vehicle?.marca} className={inputClass} />
        </div>
        <div className="space-y-1">
          <label className={labelClass} htmlFor="modelo">Modelo *</label>
          <input id="modelo" name="modelo" required defaultValue={vehicle?.modelo} className={inputClass} />
        </div>
      </div>

      <div className="space-y-1">
        <label className={labelClass} htmlFor="versao">Versão</label>
        <input id="versao" name="versao" defaultValue={vehicle?.versao ?? ""} className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className={labelClass} htmlFor="ano_fabricacao">Ano de fabricação</label>
          <input
            id="ano_fabricacao"
            name="ano_fabricacao"
            type="number"
            placeholder="Ex: 2023"
            defaultValue={vehicle?.ano_fabricacao ?? ""}
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass} htmlFor="ano_modelo">Ano modelo</label>
          <input
            id="ano_modelo"
            name="ano_modelo"
            type="number"
            placeholder="Ex: 2024"
            defaultValue={vehicle?.ano_modelo ?? ""}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className={labelClass} htmlFor="motor">Motor</label>
          <input id="motor" name="motor" defaultValue={vehicle?.motor ?? ""} className={inputClass} />
        </div>
        <div className="space-y-1">
          <label className={labelClass} htmlFor="cambio">Câmbio</label>
          <select id="cambio" name="cambio" className={inputClass} defaultValue={vehicle?.cambio ?? ""}>
            <option value="" disabled>Selecione</option>
            <option value="Manual">Manual</option>
            <option value="Automático">Automático</option>
            <option value="CVT">CVT</option>
            <option value="Automatizado">Automatizado</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className={labelClass} htmlFor="combustivel">Combustível</label>
          <select
            id="combustivel"
            name="combustivel"
            className={inputClass}
            defaultValue={vehicle?.combustivel ?? ""}
          >
            <option value="" disabled>Selecione</option>
            <option value="Flex">Flex</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Etanol">Etanol</option>
            <option value="Diesel">Diesel</option>
            <option value="Elétrico">Elétrico</option>
            <option value="Híbrido">Híbrido</option>
            <option value="GNV">GNV</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className={labelClass} htmlFor="cor">Cor</label>
          <input id="cor" name="cor" defaultValue={vehicle?.cor ?? ""} className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className={labelClass} htmlFor="placa">Placa</label>
          <input id="placa" name="placa" defaultValue={vehicle?.placa ?? ""} className={inputClass} />
        </div>
        <div className="space-y-1">
          <label className={labelClass} htmlFor="km_atual">Quilometragem atual</label>
          <input
            id="km_atual"
            name="km_atual"
            type="number"
            defaultValue={vehicle?.km_atual ?? ""}
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className={labelClass} htmlFor="categoria">Categoria</label>
        <select id="categoria" name="categoria" className={inputClass} defaultValue={vehicle?.categoria ?? ""}>
          <option value="" disabled>Selecione</option>
          <option value="Particular">Particular</option>
          <option value="Uber/99">Uber/99</option>
          <option value="Táxi">Táxi</option>
          <option value="Comercial">Comercial</option>
          <option value="Frota">Frota</option>
        </select>
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      </form>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          form="vehicle-form"
          disabled={pending}
          className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-50"
        >
          {pending ? "Salvando..." : "Salvar veículo"}
        </button>
        {onDelete && (
          <form action={onDelete}>
            <button
              type="submit"
              className="rounded-lg border border-red-300 px-5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Excluir veículo
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
