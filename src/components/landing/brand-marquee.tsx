import Image from "next/image";

const marcas = [
  { nome: "Volkswagen", logo: "volkswagen" },
  { nome: "Toyota", logo: "toyota" },
  { nome: "Ford", logo: "ford" },
  { nome: "Chevrolet", logo: "chevrolet" },
  { nome: "Fiat", logo: "fiat" },
  { nome: "Honda", logo: "honda" },
  { nome: "Hyundai", logo: "hyundai" },
  { nome: "Renault", logo: "renault" },
  { nome: "Nissan", logo: "nissan" },
  { nome: "Jeep", logo: "jeep" },
  { nome: "BMW", logo: "bmw" },
  { nome: "Kia", logo: "kia" },
  { nome: "Peugeot", logo: "peugeot" },
  { nome: "Citroën", logo: "citroen" },
  { nome: "Mitsubishi", logo: "mitsubishi" },
];

export function BrandMarquee() {
  const items = [...marcas, ...marcas];

  return (
    <section className="overflow-hidden border-y border-white/10 bg-slate-950 py-8">
      <p className="mb-5 text-center text-xs font-semibold uppercase tracking-wider text-neutral-400">
        Funciona com qualquer marca e modelo de veículo
      </p>
      <div className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-4 motion-reduce:animate-none">
          {items.map((marca, i) => (
            <span
              key={`${marca.nome}-${i}`}
              className="flex h-14 w-24 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white p-3 shadow-sm"
            >
              <Image
                src={`/images/marcas/${marca.logo}.png`}
                alt={marca.nome}
                width={80}
                height={40}
                className="h-full w-full object-contain"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
