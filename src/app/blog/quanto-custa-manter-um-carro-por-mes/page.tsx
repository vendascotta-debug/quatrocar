import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogHeader } from "@/components/blog/blog-header";

const BASE_URL = "https://www.quatrocar.com.br";
const SLUG = "/blog/quanto-custa-manter-um-carro-por-mes";
const HERO_IMAGE = "/images/blog/quanto-custa-manter-carro-hero.jpg";

export const metadata: Metadata = {
  title: "Quanto custa manter um carro por mês? A conta que quase ninguém faz certo",
  description:
    "Combustível é só uma parte. Veja todos os custos fixos e variáveis de manter um carro por mês, e por que quem não registra os gastos sempre subestima o valor real.",
  keywords: [
    "quanto custa manter um carro por mês",
    "custo mensal do carro",
    "gastos com carro",
    "custo por km rodado",
    "controle de gastos veículo",
  ],
  alternates: { canonical: `${BASE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${BASE_URL}${SLUG}`,
    title: "Quanto custa manter um carro por mês? A conta que quase ninguém faz certo",
    description:
      "Combustível é só uma parte. Veja todos os custos fixos e variáveis de manter um carro por mês.",
    publishedTime: "2026-09-19T09:00:00-03:00",
    images: [`${BASE_URL}${HERO_IMAGE}`],
  },
};

const faq = [
  {
    q: "Qual o maior gasto com um carro, fora o combustível?",
    a: "Para a maioria das pessoas, é a manutenção preventiva somada aos itens que vencem por tempo (pneus, bateria, fluido de freio) — porque são gastos que não aparecem toda semana, então ninguém guarda dinheiro pra eles e sempre pegam de surpresa.",
  },
  {
    q: "Como calcular o custo por quilômetro do meu carro?",
    a: "Some tudo que você gastou com o carro num período (combustível, manutenção, seguro, IPVA, licenciamento) e divida pela quilometragem rodada no mesmo período. Sem registrar os gastos ao longo do tempo, essa conta é praticamente impossível de fazer direito.",
  },
  {
    q: "Vale a pena ter seguro do carro?",
    a: "Depende do seu perfil de risco e do valor do veículo, mas vale lembrar que o seguro é um gasto previsível — o oposto de uma batida ou furto, que é um gasto que pode quebrar o orçamento do mês de uma vez.",
  },
  {
    q: "Carro parado na garagem também gera custo?",
    a: "Sim. IPVA, seguro (se houver) e o licenciamento continuam vencendo, a bateria descarrega, os pneus ressecam e o óleo envelhece mesmo sem rodar. Carro parado custa menos que carro rodando, mas não custa zero.",
  },
  {
    q: "Motorista de aplicativo gasta mais com manutenção?",
    a: "Sim, proporcionalmente — a alta quilometragem antecipa quase todos os intervalos de troca. Para quem depende do carro pra faturar, tratar a manutenção como parte do custo operacional (não como imprevisto) é o que separa quem sustenta o carro de quem é sustentado por ele.",
  },
];

const custosFixos = [
  ["IPVA", "Anual, mas pesa mais em alguns meses (janeiro a março, dependendo do estado)"],
  ["Seguro (se houver)", "Mensal ou anual, valor fixo previsível"],
  ["Licenciamento", "Anual"],
  ["Financiamento (se houver)", "Mensal, valor fixo até quitar"],
];

const custosVariaveis = [
  ["Combustível", "Varia com quilometragem e preço do combustível na região"],
  ["Manutenção preventiva", "Óleo, filtros, pastilhas, fluidos — varia com o intervalo de cada item"],
  ["Pneus", "Poucas vezes por ano, mas o valor por vez é alto"],
  ["Lavagem e estética", "Opcional, mas soma no fim do mês"],
  ["Multas e estacionamento", "Imprevisível, ligado ao uso do dia a dia"],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${BASE_URL}${SLUG}#article`,
      headline: "Quanto custa manter um carro por mês? A conta que quase ninguém faz certo",
      description:
        "Combustível é só uma parte. Veja todos os custos fixos e variáveis de manter um carro por mês.",
      image: `${BASE_URL}${HERO_IMAGE}`,
      inLanguage: "pt-BR",
      datePublished: "2026-09-19",
      dateModified: "2026-09-19",
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
              Controle de gastos
            </span>

            <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Quanto custa manter um carro por mês? A conta que quase ninguém faz
              certo
            </h1>

            <p className="mt-4 text-sm text-slate-500">
              Publicado em 19 de setembro de 2026 · QuatroCar
            </p>

            <div className="relative mt-6 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src={HERO_IMAGE}
                alt="Painel do carro mostrando o marcador de combustível cheio"
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
                priority
              />
            </div>

            <p className="mt-8 text-lg leading-relaxed text-slate-700">
              Pergunte pra qualquer dono de carro quanto ele gasta por mês, e a
              resposta quase sempre vem rápido — e quase sempre errada. Normalmente
              a pessoa soma o combustível, arredonda pra cima um pouco, e para por
              aí.
            </p>

            <p className="mt-4 leading-relaxed text-slate-700">
              O problema é que combustível costuma ser só uma fatia da conta. O
              resto — manutenção, documentação, seguro, desgaste de peças — fica
              espalhado ao longo do ano, em valores que ninguém registra, e por
              isso ninguém soma.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">
              Os custos fixos: previsíveis, mas fáceis de esquecer
            </h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              São os gastos que existem independente de você rodar muito ou pouco.
              Dá pra planejar, mas a maioria das pessoas só lembra deles quando o
              boleto chega.
            </p>

            <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-100">
                    <th className="py-3 pl-4 pr-4 font-semibold text-slate-900">
                      Item
                    </th>
                    <th className="py-3 pr-4 font-semibold text-slate-900">
                      Quando pesa
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {custosFixos.map(([item, quando]) => (
                    <tr key={item} className="border-b border-neutral-200 align-top last:border-0">
                      <td className="whitespace-nowrap py-3 pl-4 pr-4 font-medium text-slate-900">
                        {item}
                      </td>
                      <td className="py-3 pr-4 leading-relaxed text-slate-700">{quando}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">
              Os custos variáveis: onde a estimativa erra feio
            </h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              Aqui mora a maior parte do erro de cálculo. Variam com o uso, com a
              idade do carro e com a sorte — e é exatamente por isso que ficam de
              fora da conta mental da maioria das pessoas.
            </p>

            <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-100">
                    <th className="py-3 pl-4 pr-4 font-semibold text-slate-900">
                      Item
                    </th>
                    <th className="py-3 pr-4 font-semibold text-slate-900">
                      Por que varia
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {custosVariaveis.map(([item, motivo]) => (
                    <tr key={item} className="border-b border-neutral-200 align-top last:border-0">
                      <td className="whitespace-nowrap py-3 pl-4 pr-4 font-medium text-slate-900">
                        {item}
                      </td>
                      <td className="py-3 pr-4 leading-relaxed text-slate-700">{motivo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <blockquote className="mt-6 rounded-r-lg border-l-4 border-cyan-600 bg-cyan-50 px-5 py-4 text-sm leading-relaxed text-slate-700">
              <strong className="text-slate-900">Na prática:</strong> o valor exato
              muda demais de carro pra carro, de cidade pra cidade e de motorista
              pra motorista pra existir uma tabela única e confiável. O que dá pra
              afirmar com segurança é que manutenção preventiva em dia sempre sai
              mais barata do que reparo depois que o problema já aconteceu.
            </blockquote>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">
              Por que quase todo mundo subestima esse número
            </h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              A resposta é simples: a maioria dos gastos com carro não acontece
              toda semana. Óleo é a cada alguns meses. Pneu, uma ou duas vezes por
              ano. IPVA, uma vez. Como cada gasto aparece isolado, o cérebro trata
              cada um como um evento único — e nunca soma o ano inteiro numa conta
              só.
            </p>
            <p className="mt-4 leading-relaxed text-slate-700">
              O resultado é o clássico &ldquo;não sei pra onde vai meu
              dinheiro&rdquo;. O dinheiro foi pro carro, só que em pedaços pequenos
              demais pra chamar atenção na hora, e grandes demais quando somados no
              fim do ano.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">
              O custo por quilômetro rodado
            </h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              Uma forma mais honesta de enxergar o gasto é pensar em custo por km,
              não em custo por mês. Isso ajuda especialmente quem usa o carro pra
              trabalhar — motorista de aplicativo, entregador, representante
              comercial — porque a decisão de aceitar ou não uma corrida, uma rota,
              um deslocamento, deveria levar em conta o desgaste real do veículo, não
              só o combustível.
            </p>
            <p className="mt-4 leading-relaxed text-slate-700">
              O problema é que calcular isso exige ter o histórico completo:
              quanto você gastou, com o quê, e quantos quilômetros rodou no mesmo
              período. Sem esse registro, o número vira chute.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">
              Como parar de levar susto
            </h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              Não existe truque mágico pra baixar o custo de manter um carro — ele
              é o que é. O que existe é a diferença entre saber o número e ser
              pego de surpresa por ele.
            </p>
            <p className="mt-4 leading-relaxed text-slate-700">
              É pra isso que o <strong className="text-slate-900">QuatroCar</strong>{" "}
              existe. Cada manutenção, abastecimento e despesa registrada fica
              organizada por veículo, com data e valor — e o app monta
              automaticamente o gasto do mês, do ano e desde que você comprou o
              carro. Sem planilha, sem adivinhação.
            </p>
            <p className="mt-4 leading-relaxed text-slate-700">
              Junto com isso, você recebe aviso no WhatsApp antes de cada
              manutenção vencer, então o gasto deixa de ser surpresa e vira algo
              que você já esperava e já tinha planejado.
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
