import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogHeader } from "@/components/blog/blog-header";
import { publishedPosts, formatDateBR } from "@/lib/blog-posts";

// Revalida periodicamente pra respeitar a data de publicação agendada
// sem depender de um novo deploy quando a data chegar.
export const revalidate = 3600;

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

export default function BlogIndexPage() {
  const artigos = publishedPosts();
  const [destaque, ...resto] = artigos;

  return (
    <div className="min-h-screen bg-neutral-50">
      <BlogHeader />

      <main className="mx-auto max-w-5xl px-5 py-10">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Blog do QuatroCar
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Manutenção, revisão e controle de gastos do seu carro — direto ao ponto.
        </p>

        {destaque && (
          <Link
            href={destaque.slug}
            className="mt-8 flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md md:flex-row"
          >
            <div className="relative h-56 w-full shrink-0 md:h-auto md:w-2/5">
              <Image
                src={destaque.imagem}
                alt={destaque.titulo}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
              <span className="w-fit rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cyan-700">
                {destaque.categoria}
              </span>
              <h2 className="mt-3 text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
                {destaque.titulo}
              </h2>
              <p className="mt-3 leading-relaxed text-slate-600">
                {destaque.descricao}
              </p>
              <p className="mt-4 text-xs text-slate-400">
                {formatDateBR(destaque.publishedAt)}
              </p>
            </div>
          </Link>
        )}

        {resto.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resto.map((artigo) => (
              <Link
                key={artigo.slug}
                href={artigo.slug}
                className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={artigo.imagem}
                    alt={artigo.titulo}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="w-fit rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cyan-700">
                    {artigo.categoria}
                  </span>
                  <h2 className="mt-3 text-lg font-bold leading-snug text-slate-900">
                    {artigo.titulo}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {artigo.descricao}
                  </p>
                  <p className="mt-3 text-xs text-slate-400">
                    {formatDateBR(artigo.publishedAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
