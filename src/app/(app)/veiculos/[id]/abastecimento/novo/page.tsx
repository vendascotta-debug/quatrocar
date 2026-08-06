import { AbastecimentoForm } from "../form";
import { createFuelRecord } from "../actions";

export default async function NovoAbastecimentoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const action = createFuelRecord.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900">Registrar Abastecimento</h1>
      <AbastecimentoForm action={action} />
    </div>
  );
}
