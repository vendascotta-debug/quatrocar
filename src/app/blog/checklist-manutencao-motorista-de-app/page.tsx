import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogHeader } from "@/components/blog/blog-header";
import { notFound } from "next/navigation";
import { isPublished } from "@/lib/blog-posts";

// Revalida periodicamente pra respeitar a data de publicação agendada
// sem depender de um novo deploy quando a data chegar.
export const revalidate = 3600;

const BASE_URL = "https://www.quatrocar.com.br";
const SLUG = "/blog/checklist-manutencao-motorista-de-app";
const HERO_IMAGE = "/images/blog/checklist-motorista-app-hero.jpg";
const PUBLISHED_AT = "2026-10-10";

export const metadata: Metadata = {
  title: "Checklist de manutenção para motorista de aplicativo: o que checar toda semana",
  description:
    "Rodar muito muda tudo na manutenção do carro. Veja o checklist semanal, mensal e por quilometragem pra quem vive de aplicativo — e como manutenção em dia protege seu faturamento.",
  keywords: [
    "checklist manutenção motorista de aplicativo",
    "manutenção carro motorista de app",
    "cuidados carro uber",
    "revisão carro alta quilometragem",
    "quanto motorista de app roda por mês",
  ],
  alternates: { canonical: `${BASE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${BASE_URL}${SLUG}`,
    title: "Checklist de manutenção para motorista de aplicativo: o que checar toda semana",
    description:
      "Rodar muito muda tudo na manutenção do carro. Veja o checklist semanal, mensal e por quilometragem pra quem vive de aplicativo.",
    publishedTime: "2026-10-10T09:00:00-03:00",
    images: [`${BASE_URL}${HERO_IMAGE}`],
  },
};

const faq = [
  {
    q: "Quanto um motorista de aplicativo roda por mês, em média?",
    a: "Varia muito com a cidade e a rotina, mas é comum rodar em um mês o que um motorista comum roda em três ou mais. Isso antecipa praticamente todos os intervalos de manutenção baseados em quilometragem.",
  },
  {
    q: "Vale a pena revisar o carro antes do prazo recomendado pelo fabricante?",
    a: "Para quem roda muito acima da média, sim — o prazo do fabricante normalmente assume um uso padrão. Muitos motoristas de aplicativo encurtam os intervalos de itens críticos (óleo, freio) como forma de proteger o carro que sustenta a renda deles.",
  },
  {
    q: "Como reduzir o gasto com manutenção rodando muito?",
    a: "Contraintuitivamente, gastando de forma preventiva e regular. Trocar peças no prazo evita que um problema pequeno vire um problema caro — e carro parado pra reparo grande é dinheiro que deixa de entrar enquanto o carro está na oficina.",
  },
  {
    q: "Pneu dura quanto tempo pra quem roda muito?",
    a: "Bem menos do que a média anunciada pelos fabricantes, que costuma considerar um uso padrão. Quem roda muito precisa inspecionar o desgaste visualmente com mais frequência em vez de confiar só num prazo fixo.",
  },
  {
    q: "Compensa fazer a manutenção em concessionária ou oficina independente?",
    a: "Os dois são válidos — o que importa é a qualidade da peça e a regularidade do serviço, com nota fiscal ou registro do que foi feito. Oficina de confiança, com histórico consistente, costuma sair mais em conta pra quem roda muito do que trocar de mecânico a cada vez.",
  },
];

const semanal = [
  "Calibragem dos pneus (inclusive o estepe)",
  "Nível do óleo do motor na vareta",
  "Nível da água do radiador e do para-brisa",
  "Funcionamento de todas as luzes (freio, seta, faróis)",
  "Estado visual dos pneus — desgaste irregular, bolhas, objetos cravados",
];

const mensal = [
  "Limpeza e inspeção do filtro de ar-condicionado",
  "Verificação visual de vazamentos embaixo do carro",
  "Estado das palhetas do limpador de para-brisa",
  "Freios — ruído ao frear, resposta do pedal",
];

const porKm = [
  ["A cada 5.000 a 8.000 km", "Óleo do motor e filtro de óleo (intervalo mais curto que o padrão, pela alta quilometragem)"],
  ["A cada 10.000 a 15.000 km", "Alinhamento e balanceamento, inspeção de suspensão"],
  ["A cada 15.000 a 20.000 km", "Pastilhas de freio (inspeção — a troca depende do desgaste real)"],
  ["A cada 20.000 km", "Fluido de freio, filtro de ar do motor"],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${BASE_URL}${SLUG}#article`,
      headline: "Checklist de manutenção para motorista de aplicativo: o que checar toda semana",
      description:
        "Rodar muito muda tudo na manutenção do carro. Veja o checklist semanal, mensal e por quilometragem pra quem vive de aplicativo.",
      image: `${BASE_URL}${HERO_IMAGE}`,
      inLanguage: "pt-BR",
      datePublished: "2026-10-10",
      dateModified: "2026-10-10",
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
  if (!isPublished(PUBLISHED_AT)) notFound();

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
              Motorista de aplicativo
            </span>

            <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Checklist de manutenção para motorista de aplicativo: o que checar
              toda semana
            </h1>

            <p className="mt-4 text-sm text-slate-500">
              Publicado em 10 de outubro de 2026 · QuatroCar
            </p>

            <div className="relative mt-6 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src={HERO_IMAGE}
                alt="Smartphone fixado no painel do carro durante uma corrida"
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
                priority
              />
            </div>

            <p className="mt-8 text-lg leading-relaxed text-slate-700">
              Pra quem dirige por aplicativo, o carro não é só um meio de
              transporte — é a ferramenta de trabalho. E ferramenta de trabalho
              parada é faturamento parado.
            </p>

            <p className="mt-4 leading-relaxed text-slate-700">
              O problema é que a maioria das tabelas de manutenção por aí é feita
              pensando no motorista comum, que roda um terço (ou menos) do que um
              motorista de aplicativo roda no mesmo período. Seguir essas tabelas
              ao pé da letra significa sempre trocar peça tarde demais.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">
              Por que rodar muito muda tudo
            </h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              A maioria dos intervalos de manutenção é pensada em quilometragem
              acumulada ao longo do tempo. Quem roda três ou quatro vezes mais do
              que a média chega nesses intervalos três ou quatro vezes mais rápido
              — só que o calendário no bolso continua contando os meses no ritmo
              normal, e é fácil perder a noção de quando foi a última troca.
            </p>
            <p className="mt-4 leading-relaxed text-slate-700">
              Some a isso o desgaste extra do uso constante — motor que raramente
              esfria de verdade, freio acionado centenas de vezes por dia no
              trânsito, ar-condicionado ligado o turno inteiro — e o resultado é um
              carro que precisa de atenção mais frequente do que o manual sozinho
              sugere.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">
              Checklist semanal (5 minutos, antes de sair pro primeiro turno)
            </h2>
            <ul className="mt-4 space-y-3 pl-5">
              {semanal.map((item) => (
                <li key={item} className="list-disc leading-relaxed text-slate-700">
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">
              Checklist mensal
            </h2>
            <ul className="mt-4 space-y-3 pl-5">
              {mensal.map((item) => (
                <li key={item} className="list-disc leading-relaxed text-slate-700">
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">
              Por quilometragem (intervalos adaptados pra quem roda muito)
            </h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              Estes intervalos são mais curtos do que os recomendados pra um uso
              padrão — de propósito. Confirme sempre com o manual do seu carro e
              com um mecânico de confiança, mas use isto como referência de
              quando <em>começar a prestar atenção</em>.
            </p>

            <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-100">
                    <th className="py-3 pl-4 pr-4 font-semibold text-slate-900">
                      Quilometragem
                    </th>
                    <th className="py-3 pr-4 font-semibold text-slate-900">
                      O que checar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {porKm.map(([km, oque]) => (
                    <tr key={km} className="border-b border-neutral-200 align-top last:border-0">
                      <td className="whitespace-nowrap py-3 pl-4 pr-4 font-medium text-slate-900">
                        {km}
                      </td>
                      <td className="py-3 pr-4 leading-relaxed text-slate-700">{oque}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <blockquote className="mt-6 rounded-r-lg border-l-4 border-cyan-600 bg-cyan-50 px-5 py-4 text-sm leading-relaxed text-slate-700">
              <strong className="text-slate-900">Pneu merece atenção à parte:</strong>{" "}
              quem roda muito desgasta pneu bem mais rápido que a média, e o
              alinhamento errado acelera esse desgaste ainda mais. Inspecione
              visualmente toda semana — não espere um prazo fixo pra perceber que
              está na hora de trocar.
            </blockquote>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">
              Manutenção como proteção de renda, não como imprevisto
            </h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              Pra quem depende do carro pra trabalhar, o jeito mais caro de lidar
              com manutenção é deixar ela virar imprevisto. Um problema que poderia
              ser resolvido numa manhã, de forma preventiva, vira dias parado
              esperando peça ou reparo maior — e cada dia parado é faturamento que
              não volta.
            </p>
            <p className="mt-4 leading-relaxed text-slate-700">
              A lógica muda quando você trata a manutenção como parte do custo
              operacional do trabalho, não como um gasto avulso. Assim como
              combustível e o valor do aplicativo, ela entra na conta de quanto
              custa rodar — e planejada, sai muito mais barata do que
              improvisada.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">
              O checklist só funciona se você lembrar de usar
            </h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              Rodando o dia inteiro, é fácil deixar o checklist pra depois — e
              depois vira nunca. É exatamente esse o problema que o{" "}
              <strong className="text-slate-900">QuatroCar</strong> resolve: você
              registra a quilometragem e as manutenções feitas, o app acompanha os
              intervalos automaticamente (inclusive os mais curtos, adaptados pra
              quem roda muito) e avisa no WhatsApp antes de cada item vencer — sem
              você precisar carregar um checklist mental o dia inteiro.
            </p>
            <p className="mt-4 leading-relaxed text-slate-700">
              Junto disso, o controle de gastos mostra exatamente quanto o carro
              está custando por mês — informação essencial pra quem vive da
              renda que ele gera.
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
