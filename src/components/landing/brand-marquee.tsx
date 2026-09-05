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
    <section className="overflow-hidden border-y border-white/10 bg-neutral-950 py-8">
      <p className="mb-5 text-center text-xs font-semibold uppercase tracking-wider text-neutral-400">
        Funciona com qualquer marca e modelo de veículo
      </p>
      <div className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-4 motion-reduce:animate-none">
          {items.map((marca, i) => (
            <span
              key={`${marca}-${i}`}
              className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold tracking-wide text-neutral-300"
            >
              {marca}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
