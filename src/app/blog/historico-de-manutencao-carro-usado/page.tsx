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
const SLUG = "/blog/historico-de-manutencao-carro-usado";
const HERO_IMAGE = "/images/blog/historico-manutencao-carro-usado-hero.jpg";
const PUBLISHED_AT = "2026-10-03";

export const metadata: Metadata = {
  title: "Histórico de manutenção: por que ele vale mais do que o preço no anúncio",
  description:
    "Comprando ou vendendo um carro usado? Veja por que o histórico de manutenção pesa tanto na negociação, como provar que você cuidou do carro e o que pedir antes de fechar negócio.",
  keywords: [
    "histórico de manutenção carro usado",
    "carro usado sem histórico",
    "vender carro com histórico",
    "comprar carro usado com segurança",
    "documentação carro usado",
  ],
  alternates: { canonical: `${BASE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${BASE_URL}${SLUG}`,
    title: "Histórico de manutenção: por que ele vale mais do que o preço no anúncio",
    description:
      "Veja por que o histórico de manutenção pesa tanto na negociação de um carro usado, e como provar que você cuidou do carro.",
    publishedTime: "2026-10-03T09:00:00-03:00",
    images: [`${BASE_URL}${HERO_IMAGE}`],
  },
};

const faq = [
  {
    q: "Carro sem nenhum histórico de manutenção vale menos?",
    a: "Costuma valer, sim — não porque o carro necessariamente tenha algum problema, mas porque o comprador não tem como saber disso, e no risco, o preço sempre reflete a incerteza. É mais comum negociar um desconto num carro sem comprovação do que num carro com tudo documentado.",
  },
  {
    q: "Como provar manutenção sem guardar nota fiscal?",
    a: "Se a oficina emitiu nota, o ideal é guardar. Mas mesmo sem nota física, um histórico digital com data, km e o que foi feito em cada visita já é uma prova muito mais forte do que a memória do vendedor — e é isso que a maioria dos compradores está realmente procurando: consistência, não papel.",
  },
  {
    q: "O que um comprador de carro usado deveria pedir ver?",
    a: "O histórico completo de manutenções (com datas e quilometragem), os documentos do veículo em dia, e idealmente uma vistoria mecânica independente antes de fechar negócio. Histórico documentado reduz — mas não substitui — a vistoria.",
  },
  {
    q: "Vale a pena registrar a manutenção mesmo sem pensar em vender o carro ainda?",
    a: "Vale, e por dois motivos: primeiro, porque você não sabe quando vai precisar vender (imprevistos acontecem); segundo, porque o próprio registro já ajuda você a não perder prazos de manutenção enquanto usa o carro no dia a dia.",
  },
  {
    q: "Concessionária dá mais valor pra carro com histórico completo?",
    a: "Na avaliação de troca, um histórico completo e organizado facilita e agiliza a negociação, porque tira a incerteza da equação. O quanto isso se traduz em reais varia de loja pra loja, mas reduzir a incerteza sempre joga a favor de quem está vendendo.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${BASE_URL}${SLUG}#article`,
      headline: "Histórico de manutenção: por que ele vale mais do que o preço no anúncio",
      description:
        "Veja por que o histórico de manutenção pesa tanto na negociação de um carro usado, e como provar que você cuidou do carro.",
      image: `${BASE_URL}${HERO_IMAGE}`,
      inLanguage: "pt-BR",
      datePublished: "2026-10-03",
      dateModified: "2026-10-03",
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
              Comprar e vender
            </span>

            <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Histórico de manutenção: por que ele vale mais do que o preço no
              anúncio
            </h1>

            <p className="mt-4 text-sm text-slate-500">
              Publicado em 3 de outubro de 2026 · QuatroCar
            </p>

            <div className="relative mt-6 aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src={HERO_IMAGE}
                alt="Fileira de carros usados à venda em um pátio de revenda"
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
                priority
              />
            </div>

            <p className="mt-8 text-lg leading-relaxed text-slate-700">
              Dois carros idênticos, mesmo ano, mesma cor, mesma quilometragem no
              painel. Um deles vem com um histórico completo de manutenção — datas,
              peças trocadas, valores. O outro vem só com a palavra do vendedor:
              &ldquo;sempre fiz tudo certinho&rdquo;.
            </p>

            <p className="mt-4 leading-relaxed text-slate-700">
              Na prática, ninguém negocia esses dois carros pelo mesmo preço. E a
              diferença não está no carro — está na informação disponível sobre
              ele.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">
              Por que o histórico pesa tanto na cabeça do comprador
            </h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              Comprar um carro usado é, no fundo, uma aposta sobre o que você não
              consegue ver. O motor parece bem, a suspensão parece firme, mas
              ninguém sabe com certeza o que aconteceu lá dentro ao longo dos anos.
              O histórico de manutenção é a única coisa que transforma essa aposta
              em informação real.
            </p>
            <p className="mt-4 leading-relaxed text-slate-700">
              Quando esse histórico não existe, o comprador reage de duas formas
              possíveis: desconfia e desiste do negócio, ou desconfia e pede
              desconto pra compensar o risco. Em nenhum dos dois casos quem perde é
              o comprador.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">
              O que realmente conta como &ldquo;histórico&rdquo;
            </h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              Não precisa ser uma pasta cheia de notas fiscais amareladas (embora
              ajude). O que importa é a informação em si, de forma verificável e
              consistente:
            </p>
            <ul className="mt-4 space-y-3 pl-5">
              <li className="list-disc leading-relaxed text-slate-700">
                <strong className="text-slate-900">O que foi feito</strong> — troca
                de óleo, correia, pastilha, revisão completa.
              </li>
              <li className="list-disc leading-relaxed text-slate-700">
                <strong className="text-slate-900">Quando foi feito</strong> — data
                e, idealmente, a quilometragem no momento.
              </li>
              <li className="list-disc leading-relaxed text-slate-700">
                <strong className="text-slate-900">Com que regularidade</strong> —
                um histórico com intervalos consistentes conta uma história muito
                mais convincente do que um punhado de datas soltas.
              </li>
            </ul>
            <p className="mt-4 leading-relaxed text-slate-700">
              Um histórico assim, mesmo sem nota fiscal de cada item, já muda
              completamente a conversa numa negociação.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">
              Se você está comprando: o que pedir antes de fechar
            </h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              Peça pra ver o histórico de manutenção completo, não só a última
              revisão. Preste atenção em lacunas grandes — meses ou anos sem
              nenhum registro costumam indicar que algo não foi feito, não que só
              não foi anotado. E, sempre que possível, complemente com uma vistoria
              mecânica independente antes de assinar qualquer coisa. Histórico e
              vistoria se complementam; nenhum dos dois substitui o outro.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">
              Se você está vendendo: comece a documentar agora
            </h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              Mesmo que a venda esteja longe, o melhor momento pra começar um
              histórico de manutenção é hoje — não na semana em que você decide
              anunciar o carro. Histórico construído às pressas, retroativamente,
              raramente é tão convincente quanto um registrado ao longo do tempo,
              de forma natural.
            </p>
            <p className="mt-4 leading-relaxed text-slate-700">
              E o benefício não é só pra hora da venda: um carro com manutenção em
              dia também quebra menos, dura mais e vale mais durante todo o tempo
              que você usa ele — a venda é só o momento em que esse cuidado vira
              número visível pra outra pessoa.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-slate-900">
              Como transformar isso em prática, sem esforço
            </h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              A maior barreira pra manter um histórico de manutenção não é falta
              de vontade — é falta de lugar pra registrar as coisas sem dar
              trabalho. Nota perdida no porta-luvas, mensagem de WhatsApp com a
              oficina, memória. Nenhum desses vira um documento apresentável na
              hora de vender.
            </p>
            <p className="mt-4 leading-relaxed text-slate-700">
              No <strong className="text-slate-900">QuatroCar</strong>, cada
              manutenção registrada fica organizada automaticamente por veículo,
              com data, quilometragem e valor. Na hora de vender, é só exportar o
              histórico completo em PDF — um documento pronto pra mostrar ao
              comprador, que fala mais alto do que qualquer promessa verbal.
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
