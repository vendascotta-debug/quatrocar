import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://www.quatrocar.com.br";

export const metadata: Metadata = {
  title: "Blog do QuatroCar — manutenção e gestão do seu veículo",
  description:
    "Artigos sobre revisão, manutenção preventiva e controle de gastos do seu carro, direto do time do QuatroCar.",
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/blog`,
    title: "Blog do QuatroCar — manutenção e gestão do seu veículo",
    description:
      "Artigos sobre revisão, manutenção preventiva e controle de gastos do seu carro, direto do time do QuatroCar.",
  },
};

const artigos = [
  {
    slug: "/blog/tabela-de-revisao-por-quilometragem",
    titulo:
      "Tabela de revisão por quilometragem: o que trocar a cada 10, 20, 40 e 60 mil km",
    descricao:
      "Tabela completa de revisão do carro por quilometragem. Veja o que trocar em cada etapa, quais itens vencem por tempo e como não perder nenhuma manutenção.",
    data: "12 de setembro de 2026",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <main className="mx-auto max-w-3xl px-5 py-16">
        <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
          Blog
        </span>
        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
          Manutenção e gestão do seu veículo
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-neutral-300">
          Artigos práticos sobre revisão, manutenção preventiva e controle de
          gastos do seu carro.
        </p>

        <div className="mt-12 space-y-6">
          {artigos.map((artigo) => (
            <Link
              key={artigo.slug}
              href={artigo.slug}
              className="block rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-cyan-400/30 hover:bg-white/10"
            >
              <p className="text-xs text-neutral-400">{artigo.data}</p>
              <h2 className="mt-2 text-xl font-semibold text-white">
                {artigo.titulo}
              </h2>
              <p className="mt-2 leading-relaxed text-neutral-300">
                {artigo.descricao}
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-cyan-400">
                Ler artigo →
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
