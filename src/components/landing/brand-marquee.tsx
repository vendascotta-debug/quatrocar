const marcas = [
  "Volkswagen",
  "Toyota",
  "Ford",
  "Chevrolet",
  "Fiat",
  "Honda",
  "Hyundai",
  "Renault",
  "Nissan",
  "Jeep",
  "BMW",
  "Kia",
  "Peugeot",
  "Citroën",
  "Mitsubishi",
];

export function BrandMarquee() {
  const items = [...marcas, ...marcas];

  return (
    <section className="overflow-hidden border-y border-neutral-900 bg-neutral-950 py-6">
      <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-neutral-500">
        Funciona com qualquer marca e modelo de veículo
      </p>
      <div className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-12 motion-reduce:animate-none">
          {items.map((marca, i) => (
            <span
              key={`${marca}-${i}`}
              className="shrink-0 text-lg font-semibold tracking-wide text-neutral-400"
            >
              {marca}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
