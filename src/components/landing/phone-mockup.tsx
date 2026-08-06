export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[280px] select-none sm:max-w-[320px]" aria-hidden="true">
      <div className="absolute -inset-8 -z-10 rounded-full bg-gradient-to-br from-neutral-200 via-neutral-100 to-transparent blur-2xl" />

      <div className="relative rounded-[2.5rem] border-[10px] border-neutral-900 bg-neutral-900 shadow-2xl">
        <div className="absolute left-1/2 top-0 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-neutral-900" />
        <div className="overflow-hidden rounded-[1.75rem] bg-neutral-50">
          <div className="space-y-3 p-4 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-neutral-500">Olá, Alessandro</p>
                <p className="text-sm font-semibold text-neutral-900">Seus veículos</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-neutral-900" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-neutral-100">
                <p className="text-[9px] text-neutral-500">Gastos do mês</p>
                <p className="text-sm font-bold text-neutral-900">R$ 340</p>
              </div>
              <div className="rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-neutral-100">
                <p className="text-[9px] text-neutral-500">Total investido</p>
                <p className="text-sm font-bold text-neutral-900">R$ 4.180</p>
              </div>
            </div>

            <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-neutral-100">
              <p className="mb-2 text-[10px] font-semibold text-neutral-700">Próximas manutenções</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-medium text-neutral-900">Troca de óleo</p>
                    <p className="text-[9px] text-neutral-500">Próxima aos 140.000 km</p>
                  </div>
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[8px] font-medium text-amber-700">
                    Próximo
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-medium text-neutral-900">Pastilhas</p>
                    <p className="text-[9px] text-neutral-500">Próxima aos 154.260 km</p>
                  </div>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-[8px] font-medium text-green-700">
                    Em dia
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-neutral-900 p-3 text-white">
              <p className="text-[9px] text-neutral-300">Volkswagen T-Cross</p>
              <p className="text-sm font-semibold">129.260 km</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -right-6 top-10 hidden w-32 rounded-xl bg-white p-3 shadow-lg ring-1 ring-neutral-100 sm:block animate-float">
        <p className="text-[9px] text-neutral-500">Alerta</p>
        <p className="text-xs font-semibold text-neutral-900">Óleo vence em 12 dias</p>
      </div>
      <div className="absolute -left-8 bottom-16 hidden w-28 rounded-xl bg-white p-3 shadow-lg ring-1 ring-neutral-100 sm:block animate-float-delayed">
        <p className="text-[9px] text-neutral-500">Consumo</p>
        <p className="text-xs font-semibold text-neutral-900">12,4 km/l</p>
      </div>
    </div>
  );
}
