import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogHeader } from "@/components/blog/blog-header";

const BASE_URL = "https://www.quatrocar.com.br";
const SLUG = "/blog/quando-trocar-o-oleo-do-carro";
const HERO_IMAGE = "/images/blog/quando-trocar-oleo-hero.jpg";

export const metadata: Metadata = {
  title: "Quando trocar o óleo do carro: a resposta completa (não é só 10 mil km)",
  description:
    "Mineral, semissintético ou sintético — cada um tem um intervalo diferente. Veja os sinais de óleo vencido, os mitos mais comuns e por que atrasar a troca custa caro.",
  keywords: [
    "quando trocar o óleo do carro",
    "troca de óleo",
    "óleo sintético vs mineral",
    "sintomas de óleo vencido",
    "intervalo de troca de óleo",
  ],
  alternates: { canonical: `${BASE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${BASE_URL}${SLUG}`,
    title: "Quando trocar o óleo do carro: a resposta completa (não é só 10 mil km)",
    description:
      "Mineral, semissintético ou sintético — cada um tem um intervalo diferente. Veja os sinais de óleo vencido e os mitos mais comuns.",
    publishedTime: "2026-09-26T09:00:00-03:00",
    images: [`${BASE_URL}${HERO_IMAGE}`],
  },
};

const faq = [
  {
    q: "Óleo sintético realmente dura mais que o mineral?",
    a: "Sim, na maioria dos casos. O óleo sintético é mais estável em temperaturas altas e se degrada mais devagar, por isso costuma aguentar intervalos maiores. Mas o intervalo exato do seu carro está no manual — não existe uma regra universal para todos os motores.",
  },
  {
    q: "Posso misturar óleo sintético com mineral?",
    a: "Fisicamente, misturar não costuma causar dano imediato, mas o resultado é um óleo com as propriedades de nenhum dos dois — você perde a durabilidade do sintético sem ganhar nada em troca. O ideal é sempre usar o mesmo tipo indicado pelo fabricante.",
  },
  {
    q: "Carro que roda pouco também precisa trocar óleo no prazo?",
    a: "Precisa. O óleo se degrada por oxidação e contaminação mesmo parado, então o prazo por tempo (geralmente 12 meses) vale independente da quilometragem. É um dos erros mais comuns entre quem usa o carro só nos fins de semana.",
  },
  {
    q: "Dá pra saber se o óleo está vencido só olhando?",
    a: "Dá uma pista, mas não é definitivo. Óleo muito escuro, com cheiro de queimado ou textura mais grossa costuma indicar degradação — mas óleo com aditivo escurece rápido mesmo estando bom. O prazo (km ou tempo) é sempre mais confiável do que só olhar.",
  },
  {
    q: "O que acontece se eu atrasar muito a troca de óleo?",
    a: "O óleo perde a capacidade de lubrificar, e as peças internas do motor passam a se desgastar por atrito direto. Em casos extremos, o resultado é fundir o motor — um reparo que custa uma fração significativa do valor do carro, contra o custo baixo de uma troca preventiva.",
  },
];

const tiposOleo = [
  ["Mineral", "Mais barato, intervalo mais curto — costuma pedir troca mais cedo"],
  ["Semissintético", "Meio-termo em preço e durabilidade"],
  ["Sintético", "Mais caro por troca, mas aguenta intervalos maiores e protege melhor em temperatura alta"],
];

const sinais = [
  "Luz de óleo acesa no painel — nunca ignore, mesmo que o carro pareça normal",
  "Motor mais barulhento do que o habitual, principalmente ao ligar frio",
  "Óleo no nível baixo na vareta, mesmo antes do prazo de troca",
  "Cheiro de queimado vindo do capô",
  "Consumo de combustível subindo sem outra explicação aparente",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${BASE_URL}${SLUG}#article`,
      headline: "Quando trocar o óleo do carro: a resposta completa (não é só 10 mil km)",
      description:
        "Mineral, semissintético ou sintético — cada um tem um intervalo diferente. Veja os sinais de óleo vencido e os mitos mais comuns.",
      image: `${BASE_URL}${HERO_IMAGE}`,
      inLanguage: "pt-BR",
      datePublished: "2026-09-26",
      dateModified: "2026-09-26",
      mainEntityOfPage: `${BASE_URL}${SLUG}`,
      author: { "@type": "Organization", name: "QuatroCar", url: BASE_URL },
      publisher: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${BASE_URL}${SLUG}#faq`,
      inLanguage: "pt-BR",
      mainEntity: faq.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-neutral-50">
        <BlogHeader />

        <main className="mx-auto max-w-3xl px-5 py-10">
          <article>
            <span className="w-fit rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cyan-700">
              Manutenção
            </span>

            <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Quando trocar o óleo do carro: a resposta completa (não é só 10 mil
              km)
            </h1>

            <p className="mt-4 text-sm text-slate-500">
              Publicado em 26 de setembro de 2026 · QuatroCar
            </p>

            <div className="relative mt-6 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src={HERO_IMAGE}
                alt="Pessoa verificando o nível de óleo do motor com a vareta"
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
                priority
              />
            </div>

            <p className="mt-8 text-lg leading-relaxed text-slate-700">
              &ldquo;Troca de óleo a cada 10 mil km&rdquo; é a regra que todo mundo
              conhece — e a regra que quase todo mundo aplica errado. Porque o
              intervalo certo não depende só da quilometragem: depende do tipo de
              óleo, do motor, do jeito que você dirige e de há quanto tempo o carro
              está sem trocar.
            </p>

            <p className="mt-4 leading-relaxed text-slate-700">
              Esta é a resposta completa, sem simplificar demais.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">
              A regra geral (que ainda assim precisa de contexto)
            </h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              O padrão mais comum é <strong className="text-slate-900">10.000 km
              ou 12 meses, o que vier primeiro</strong>. Isso significa que mesmo
              um carro que mal sai da garagem precisa trocar o óleo uma vez por
              ano — o óleo envelhece parado, não só rodando.
            </p>
            <p className="mt-4 leading-relaxed text-slate-700">
              Mas essa é só a base. O intervalo real depende do tipo de óleo usado.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">
              Mineral, semissintético ou sintético: a diferença que muda o prazo
            </h2>

            <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-100">
                    <th className="py-3 pl-4 pr-4 font-semibold text-slate-900">
                      Tipo
                    </th>
                    <th className="py-3 pr-4 font-semibold text-slate-900">
                      Características
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tiposOleo.map(([tipo, desc]) => (
                    <tr key={tipo} className="border-b border-neutral-200 align-top last:border-0">
                      <td className="whitespace-nowrap py-3 pl-4 pr-4 font-medium text-slate-900">
                        {tipo}
                      </td>
                      <td className="py-3 pr-4 leading-relaxed text-slate-700">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <blockquote className="mt-6 rounded-r-lg border-l-4 border-cyan-600 bg-cyan-50 px-5 py-4 text-sm leading-relaxed text-slate-700">
              <strong className="text-slate-900">O manual do carro manda.</strong>{" "}
              O fabricante testa o motor com um óleo específico e define o
              intervalo pra aquela combinação exata. Trocar o tipo de óleo sem
              seguir a recomendação pode encurtar (ou não aproveitar) o intervalo
              indicado.
            </blockquote>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">
              O que o óleo faz — e por que ele para de fazer
            </h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              O óleo lubrifica as peças internas do motor, reduz o atrito, ajuda a
              resfriar e carrega pra fora partículas de sujeira que o próprio
              motor gera funcionando. Com o tempo e o uso, ele perde viscosidade,
              acumula essas partículas e se contamina — e quando isso acontece, ele
              deixa de proteger o motor e passa a agir quase como uma lixa fina
              circulando entre as peças.
            </p>
            <p className="mt-4 leading-relaxed text-slate-700">
              É por isso que atrasar a troca não é um risco abstrato: é desgaste
              real e acumulado, que não se reverte trocando o óleo depois. O
              estrago já feito, fica feito.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">
              Sinais de que o óleo já passou do ponto
            </h2>
            <ul className="mt-4 space-y-3 pl-5">
              {sinais.map((s) => (
                <li key={s} className="list-disc leading-relaxed text-slate-700">
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-4 leading-relaxed text-slate-700">
              Nenhum desses sinais substitui o prazo — quando eles aparecem, o
              óleo já está bem além do ideal. A troca preventiva no prazo existe
              justamente pra você nunca chegar a ver esses sintomas.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">
              Três mitos que custam caro
            </h2>
            <h3 className="mt-8 text-xl font-semibold text-slate-900">
              &ldquo;Meu carro roda pouco, posso esticar o prazo&rdquo;
            </h3>
            <p className="mt-3 leading-relaxed text-slate-700">
              É o contrário do que parece. Carro que roda pouco costuma fazer mais
              trajetos curtos, que não deixam o motor esquentar o suficiente pra
              evaporar a umidade que se acumula no óleo — o que na prática degrada
              o óleo mais rápido por km rodado.
            </p>
            <h3 className="mt-8 text-xl font-semibold text-slate-900">
              &ldquo;Óleo escuro é óleo ruim&rdquo;
            </h3>
            <p className="mt-3 leading-relaxed text-slate-700">
              Não necessariamente. Parte do trabalho do óleo é carregar sujeira em
              suspensão — é normal escurecer rápido, inclusive em óleos de boa
              qualidade. A cor sozinha não é um bom termômetro.
            </p>
            <h3 className="mt-8 text-xl font-semibold text-slate-900">
              &ldquo;Trocar antes do prazo não faz mal&rdquo;
            </h3>
            <p className="mt-3 leading-relaxed text-slate-700">
              Verdade, mas também não traz benefício proporcional ao custo. O
              ponto ótimo é seguir o intervalo indicado — nem atrasar, nem gastar à
              toa trocando cedo demais.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">
              O problema não é saber o prazo. É lembrar dele.
            </h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              Praticamente todo motorista já sabe, em teoria, que precisa trocar o
              óleo periodicamente. O que falta não é informação — é um jeito de
              lembrar exatamente quando foi a última troca e quando será a
              próxima, sem depender da memória ou de uma etiqueta apagada no
              para-brisa.
            </p>
            <p className="mt-4 leading-relaxed text-slate-700">
              No <strong className="text-slate-900">QuatroCar</strong>, você
              registra a troca de óleo uma vez — com data, km e o intervalo
              recomendado pro seu carro — e o app calcula sozinho quando é a
              próxima, avisando pelo painel e pelo WhatsApp antes de vencer. O
              resto da manutenção do carro fica no mesmo lugar, com o histórico
              completo pra consultar quando quiser.
            </p>

            <div className="mt-8">
              <Link
                href="/"
                className="inline-block rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-500"
              >
                Conheça o QuatroCar
              </Link>
            </div>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">
              Perguntas frequentes
            </h2>
            <dl className="mt-6 space-y-6">
              {faq.map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-semibold text-slate-900">{q}</dt>
                  <dd className="mt-2 leading-relaxed text-slate-700">{a}</dd>
                </div>
              ))}
            </dl>
          </article>
        </main>
      </div>
    </>
  );
}
