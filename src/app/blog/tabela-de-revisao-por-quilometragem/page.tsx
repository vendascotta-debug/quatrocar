import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://www.quatrocar.com.br";
const SLUG = "/blog/tabela-de-revisao-por-quilometragem";

export const metadata: Metadata = {
  title:
    "Tabela de revisão por quilometragem: o que trocar a cada 10, 20, 40 e 60 mil km",
  description:
    "Tabela completa de revisão do carro por quilometragem. Veja o que trocar em cada etapa, quais itens vencem por tempo e como não perder nenhuma manutenção.",
  keywords: [
    "tabela de revisão por quilometragem",
    "revisão do carro por km",
    "o que trocar a cada 10 mil km",
    "manutenção preventiva carro",
    "quando trocar correia dentada",
  ],
  alternates: { canonical: `${BASE_URL}${SLUG}` },
  openGraph: {
    type: "article",
    url: `${BASE_URL}${SLUG}`,
    title:
      "Tabela de revisão por quilometragem: o que trocar a cada 10, 20, 40 e 60 mil km",
    description:
      "Tabela completa de revisão do carro por quilometragem, com os itens que vencem por tempo e não por km.",
    publishedTime: "2026-09-12T09:00:00-03:00",
  },
};

const faq = [
  {
    q: "De quanto em quanto tempo devo fazer a revisão do carro?",
    a: "A regra geral é a cada 10.000 km ou 12 meses, o que acontecer primeiro. Carros turbo, de aplicativo ou usados majoritariamente em trânsito urbano podem precisar de intervalos menores.",
  },
  {
    q: "Posso atrasar a troca de óleo?",
    a: "Pode, mas o custo aparece depois. Óleo degradado acelera o desgaste interno do motor de forma que não dá para reverter. É a manutenção com a melhor relação custo-benefício que existe.",
  },
  {
    q: "Como sei se meu carro tem correia dentada ou corrente?",
    a: "Está no manual do proprietário. Se não tiver o manual, qualquer mecânico identifica em minutos pelo modelo e ano do motor.",
  },
  {
    q: "Revisão em concessionária é obrigatória?",
    a: "Durante a garantia de fábrica, seguir o plano de revisões é condição para manter a garantia, mas a lei brasileira permite fazer em oficina independente, desde que se use peças de qualidade equivalente e se guarde a nota fiscal. Depois da garantia, você escolhe onde fazer.",
  },
  {
    q: "Quanto custa manter um carro por mês?",
    a: "Varia muito com modelo e uso, mas a conta precisa incluir mais do que combustível: óleo, filtros, pneus, freios, IPVA, licenciamento e seguro distribuídos ao longo do ano. Sem registrar os gastos, quase todo mundo subestima esse número.",
  },
];

const tabela = [
  ["5.000 km", "Verificar nível de óleo, água do radiador, calibragem dos pneus e luzes"],
  ["10.000 km", "Trocar óleo do motor + filtro de óleo · Trocar filtro de ar do motor · Inspecionar freios e suspensão"],
  ["20.000 km", "Tudo dos 10 mil + filtro de ar-condicionado · Trocar fluido de freio · Alinhamento e balanceamento"],
  ["30.000 a 40.000 km", "Tudo dos 20 mil + velas de ignição · Fluido de arrefecimento · Verificar bomba de combustível e escapamento"],
  ["50.000 a 60.000 km", "Tudo dos 40 mil + avaliar kit de embreagem · Avaliar amortecedores · Pastilhas e discos de freio"],
  ["80.000 a 100.000 km", "Correia dentada + tensor (quando aplicável) · Kit de embreagem · Molas e amortecedores"],
];

const porTempo = [
  ["Óleo do motor", "12 meses"],
  ["Fluido de freio", "2 anos"],
  ["Fluido de arrefecimento", "2 a 3 anos"],
  ["Bateria", "3 a 4 anos"],
  ["Pneus", "5 anos (mesmo com sulco bom, a borracha ressecada perde aderência)"],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${BASE_URL}${SLUG}#article`,
      headline:
        "Tabela de revisão por quilometragem: o que trocar a cada 10, 20, 40 e 60 mil km",
      description:
        "Tabela completa de revisão do carro por quilometragem, com os itens que vencem por tempo e não por km.",
      inLanguage: "pt-BR",
      datePublished: "2026-09-12",
      dateModified: "2026-09-12",
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

      <div className="min-h-screen bg-slate-950">
        <main className="mx-auto max-w-3xl px-5 py-16 text-neutral-300">
          <article>
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              Tabela de revisão por quilometragem: o que trocar a cada 10, 20, 40 e
              60 mil km
            </h1>

            <p className="mt-4 text-sm text-neutral-400">
              Atualizado em 12 de setembro de 2026 · QuatroCar
            </p>

            <p className="mt-8 text-lg leading-relaxed">
              Quase todo mundo que tem carro já passou por isso: chega na oficina, o
              mecânico pergunta &ldquo;quando foi a última troca de óleo?&rdquo; e a
              resposta honesta é &ldquo;acho que foi ano passado... ou sei lá&rdquo;.
            </p>

            <p className="mt-4 leading-relaxed">
              A partir daí você tem duas opções ruins. Trocar de novo sem precisar, e
              jogar dinheiro fora. Ou não trocar, e descobrir o problema quando ele já
              virou prejuízo grande.
            </p>

            <p className="mt-4 leading-relaxed">
              Esta é a tabela de referência para você parar de adivinhar.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-white">
              Tabela rápida de revisão por quilometragem
            </h2>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 pr-4 font-semibold text-white">
                      Quilometragem
                    </th>
                    <th className="py-3 font-semibold text-white">O que fazer</th>
                  </tr>
                </thead>
                <tbody>
                  {tabela.map(([km, oque]) => (
                    <tr key={km} className="border-b border-white/10 align-top">
                      <td className="whitespace-nowrap py-3 pr-4 font-medium text-white">
                        {km}
                      </td>
                      <td className="py-3 leading-relaxed">{oque}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <blockquote className="mt-6 border-l-4 border-cyan-400 bg-white/5 px-5 py-4 text-sm leading-relaxed backdrop-blur-sm">
              <strong className="text-white">Importante:</strong> esta tabela é uma
              média de mercado. O <strong>manual do proprietário do seu carro sempre
              prevalece</strong>. Motores turbo, carros que rodam muito em cidade e
              veículos movidos a etanol costumam pedir intervalos mais curtos.
            </blockquote>

            <h2 className="mt-12 text-2xl font-semibold text-white">
              O que cada etapa significa na prática
            </h2>

            <h3 className="mt-8 text-xl font-semibold text-white">
              A cada 10.000 km ou 12 meses — o básico inegociável
            </h3>
            <p className="mt-3 leading-relaxed">
              <strong className="text-white">Óleo do motor e filtro de óleo.</strong>{" "}
              É o item mais importante da lista e o mais ignorado. Óleo velho perde a
              capacidade de lubrificar e vira lixa dentro do motor. A regra é &ldquo;o
              que vier primeiro&rdquo;: 10 mil km <em>ou</em> 1 ano. Se você roda
              pouco, ainda assim precisa trocar — óleo envelhece parado.
            </p>
            <p className="mt-4 leading-relaxed">
              <strong className="text-white">Filtro de ar do motor.</strong> Filtro
              sujo faz o motor respirar com dificuldade, aumenta o consumo de
              combustível e reduz potência. É barato e a diferença é sentida no dia a
              dia.
            </p>
            <p className="mt-4 leading-relaxed">
              Nessa mesma parada, o mecânico deve olhar freios e suspensão. Não é
              troca, é inspeção — e é o que evita a surpresa lá na frente.
            </p>

            <h3 className="mt-8 text-xl font-semibold text-white">
              A cada 20.000 km — o que quase ninguém lembra
            </h3>
            <p className="mt-3 leading-relaxed">
              <strong className="text-white">Fluido de freio.</strong> Esse é o item
              mais negligenciado do carro brasileiro. O fluido absorve umidade do ar
              com o tempo. Fluido com água ferve mais fácil, e fluido fervendo
              significa <strong>pedal de freio que afunda e não freia</strong>. A troca
              é a cada 2 anos, independente da quilometragem.
            </p>
            <p className="mt-4 leading-relaxed">
              <strong className="text-white">Filtro de ar-condicionado.</strong> Não
              afeta o motor, afeta você. Filtro saturado deixa o ar com cheiro ruim e
              joga poeira e fungo direto no seu rosto.
            </p>
            <p className="mt-4 leading-relaxed">
              <strong className="text-white">Alinhamento e balanceamento.</strong>{" "}
              Carro desalinhado come pneu de forma desigual. Um jogo de pneus custa
              muito mais do que um alinhamento.
            </p>

            <h3 className="mt-8 text-xl font-semibold text-white">
              Entre 30.000 e 40.000 km — o motor pede atenção
            </h3>
            <p className="mt-3 leading-relaxed">
              <strong className="text-white">Velas de ignição.</strong> Vela gasta
              significa falha na queima, consumo maior e perda de potência. Em carros
              flex que rodam com etanol, o desgaste é mais rápido.
            </p>
            <p className="mt-4 leading-relaxed">
              <strong className="text-white">
                Fluido de arrefecimento (água do radiador).
              </strong>{" "}
              Não é só água. O aditivo perde a capacidade de proteger contra corrosão e
              contra fervura. Radiador entupido e motor fundido começam aqui.
            </p>

            <h3 className="mt-8 text-xl font-semibold text-white">
              Entre 50.000 e 60.000 km — o bolso começa a doer
            </h3>
            <p className="mt-3 leading-relaxed">
              <strong className="text-white">Pastilhas de freio.</strong> A vida útil
              varia demais com o seu jeito de dirigir — pode ser 30 mil km ou 70 mil.
              Por isso a inspeção a cada 10 mil importa.
            </p>
            <p className="mt-4 leading-relaxed">
              <strong className="text-white">Amortecedores.</strong> Amortecedor
              cansado não deixa o carro balançando só: aumenta a distância de frenagem
              e desgasta pneu. Poucos motoristas trocam na hora certa porque o desgaste
              é gradual e a gente se acostuma.
            </p>
            <p className="mt-4 leading-relaxed">
              <strong className="text-white">Kit de embreagem</strong> (câmbio manual).
              Também depende muito do uso — trânsito pesado de São Paulo detona
              embreagem bem antes de 60 mil km.
            </p>

            <h3 className="mt-8 text-xl font-semibold text-white">
              Entre 80.000 e 100.000 km — a correia dentada
            </h3>
            <p className="mt-3 leading-relaxed">
              Se o seu motor usa <strong className="text-white">correia dentada</strong>,
              essa é a manutenção mais cara de ignorar. Correia rompida no meio do
              caminho normalmente significa{" "}
              <strong>válvula entortada e motor aberto</strong> — uma conta de milhares
              de reais. A troca é sempre com o tensor junto.
            </p>
            <p className="mt-4 leading-relaxed">
              Motores com <strong className="text-white">corrente de comando</strong>{" "}
              (cada vez mais comuns) não precisam dessa troca periódica — mas pedem
              atenção ao nível de óleo, porque a corrente depende de lubrificação.
            </p>
            <p className="mt-4 leading-relaxed">
              Descubra qual é o seu no manual. É a informação mais valiosa desta
              página.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-white">
              Os itens que dependem do tempo, não da quilometragem
            </h2>
            <p className="mt-3 leading-relaxed">
              Este é o erro clássico de quem roda pouco: achar que carro parado não
              precisa de manutenção.
            </p>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 pr-4 font-semibold text-white">Item</th>
                    <th className="py-3 font-semibold text-white">
                      Intervalo por tempo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {porTempo.map(([item, prazo]) => (
                    <tr key={item} className="border-b border-white/10 align-top">
                      <td className="py-3 pr-4 font-medium text-white">{item}</td>
                      <td className="py-3 leading-relaxed">{prazo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 leading-relaxed">
              Carro que roda 4.000 km por ano ainda precisa de troca anual de óleo.
              Borracha, fluido e bateria envelhecem sozinhos.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-white">
              Por que a quilometragem sozinha não resolve
            </h2>
            <p className="mt-3 leading-relaxed">
              Duas pessoas com o mesmo carro e a mesma quilometragem podem ter carros
              em estados completamente diferentes. O que muda:
            </p>
            <ul className="mt-4 space-y-3 pl-5">
              <li className="list-disc leading-relaxed">
                <strong className="text-white">Trânsito urbano pesado</strong> desgasta
                muito mais que estrada. O motor fica quente e em baixa rotação, a
                embreagem trabalha o tempo todo.
              </li>
              <li className="list-disc leading-relaxed">
                <strong className="text-white">Motorista de aplicativo</strong> roda em
                um mês o que outra pessoa roda em seis. Para quem trabalha com o carro,
                a manutenção preventiva não é economia — é proteção do faturamento.
              </li>
              <li className="list-disc leading-relaxed">
                <strong className="text-white">Etanol</strong> exige troca de velas e
                óleo em intervalos mais curtos.
              </li>
              <li className="list-disc leading-relaxed">
                <strong className="text-white">Carro parado</strong> cria seus próprios
                problemas: bateria descarrega, pneu quadra, fluido decanta.
              </li>
            </ul>
            <p className="mt-4 leading-relaxed">
              Por isso a tabela é ponto de partida, não regra absoluta.
            </p>

            <h2 className="mt-12 text-2xl font-semibold text-white">
              O problema real não é saber a tabela. É lembrar.
            </h2>
            <p className="mt-3 leading-relaxed">
              Você acabou de ler o que precisa ser feito. A questão é: daqui a oito
              meses, você vai lembrar que trocou o fluido de freio em setembro de 2026?
              Vai lembrar com quantos quilômetros?
            </p>
            <p className="mt-4 leading-relaxed">
              A maioria das pessoas resolve isso com uma nota fiscal amassada no
              porta-luvas ou com nada. E aí, quando vai vender o carro, não consegue
              provar nenhuma manutenção — e o comprador abate no preço exatamente por
              isso.
            </p>
            <p className="mt-4 leading-relaxed">
              O <strong className="text-white">QuatroCar</strong> existe para resolver
              essa parte. Você registra cada manutenção com data, quilometragem e
              valor, informa o intervalo, e o sistema calcula sozinho quando é a
              próxima — avisando no seu WhatsApp antes de vencer.
            </p>
            <p className="mt-4 leading-relaxed">
              Além disso, você passa a saber quanto o carro realmente custa por mês,
              mantém IPVA, licenciamento e seguro em dia, e tem o histórico completo em
              PDF na hora de vender.
            </p>

            <div className="mt-8">
              <Link
                href="/"
                className="inline-block rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-neutral-950 transition-colors hover:bg-cyan-300"
              >
                Conheça o QuatroCar
              </Link>
            </div>

            <h2 className="mt-12 text-2xl font-semibold text-white">
              Perguntas frequentes
            </h2>
            <dl className="mt-6 space-y-6">
              {faq.map(({ q, a }) => (
                <div key={q}>
                  <dt className="font-semibold text-white">{q}</dt>
                  <dd className="mt-2 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </article>
        </main>
      </div>
    </>
  );
}
