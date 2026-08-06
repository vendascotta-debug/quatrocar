import { VeiculoForm } from "../form";
import { createVehicle } from "../actions";

export default function NovoVeiculoPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900">Novo Veículo</h1>
      <VeiculoForm action={createVehicle} />
    </div>
  );
}
