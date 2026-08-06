import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { LandingHeader } from "@/components/landing/header";
import { Reveal } from "@/components/landing/reveal";
import { RoadPattern } from "@/components/landing/road-pattern";
import { CarIcon } from "@/components/landing/car-icon";

export const metadata: Metadata = {
  title: "QuatroCar — O prontuário digital do seu veículo",
  description:
    "Nunca mais perca o controle da manutenção do seu carro. O QuatroCar guarda todo o histórico do veículo e avisa, peça por peça, exatamente quando cada manutenção vence.",
  openGraph: {
    title: "QuatroCar — O prontuário digital do seu veículo",
    description:
      "Histórico completo, alertas de manutenção por peça e controle financeiro do seu carro em um só lugar.",
    url: "https://quatrocar.com.br",
    siteName: "QuatroCar",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuatroCar — O prontuário digital do seu veículo",
    description:
      "Histórico completo, alertas de manutenção por peça e controle financeiro do seu carro em um só lugar.",
  },
  alternates: {
    canonical: "https://quatrocar.com.br",
  },
};

const features = [
  {
    title: "Histórico completo",
    desc: "Manutenção, revisões, peças, garantias e notas fiscais — tudo num só lugar, para sempre.",
    icon: "📋",
  },
  {
    title: "Alertas por peça",
    desc: "Cada peça tem seu próprio intervalo de troca. O QuatroCar avisa quando cada uma está vencendo.",
    icon: "🔔",
  },
  {
    title: "Controle de abastecimento",
    desc: "Registre cada abastecimento e acompanhe consumo, custo por km e gasto mensal automaticamente.",
    icon: "⛽",
  },
  {
    title: "Múltiplos veículos",
    desc: "Gerencie o carro da família, o carro do trabalho ou toda uma frota, tudo na mesma conta.",
    icon: "🚗",
  },
  {
    title: "Dashboard financeiro",
    desc: "Veja quanto você gastou no mês, no ano e desde que comprou o carro — sem precisar somar nada na mão.",
    icon: "📊",
  },
  {
    title: "Feito para o Brasil",
    desc: "Pensado para motoristas de app, taxistas, frotas e donos de carro comum — do jeito que a manutenção acontece aqui.",
    icon: "🇧🇷",
  },
];

const steps = [
  {
    n: "1",
    title: "Cadastre seu veículo",
    desc: "Marca, modelo, ano e quilometragem atual. Leva menos de 2 minutos.",
  },
  {
    n: "2",
    title: "Registre as manutenções",
    desc: "A cada troca, diga quando é a próxima — km ou meses. O QuatroCar guarda tudo.",
  },
  {
    n: "3",
    title: "Receba os alertas",
    desc: "Quando uma peça estiver perto do vencimento, você vê na hora no seu painel.",
  },
];

const planos = [
  {
    nome: "Gratuito",
    preco: "R$ 0",
    periodo: "para sempre",
    destaque: false,
    itens: ["1 veículo", "Histórico completo", "Alertas de manutenção"],
  },
  {
    nome: "Premium",
    preco: "Em breve",
    periodo: "",
    destaque: true,
    itens: [
      "Veículos ilimitados",
      "Alertas por WhatsApp",
      "Relatórios em PDF",
      "Backup automático na nuvem",
    ],
  },
  {
    nome: "Empresas",
    preco: "Sob consulta",
    periodo: "",
    destaque: false,
    itens: [
      "Gestão de frotas",
      "Controle por motorista",
      "Custos consolidados",
      "Aprovação de manutenções",
    ],
  },
];

const faq = [
  {
    q: "Preciso pagar para usar o QuatroCar?",
    a: "Não. O plano gratuito permite cadastrar 1 veículo com histórico completo e alertas de manutenção, sem custo e sem cartão de crédito.",
  },
  {
    q: "Como o QuatroCar sabe quando trocar cada peça?",
    a: "Quando você registra uma manutenção, informa o intervalo daquela peça específica (em km ou meses). O sistema calcula sozinho a data ou km da próxima troca e avisa.",
  },
  {
    q: "Posso cadastrar mais de um carro?",
    a: "Sim, no plano Premium você pode cadastrar quantos veículos precisar — ótimo para famílias, motoristas de app ou pequenas frotas.",
  },
  {
    q: "Meus dados ficam seguros?",
    a: "Sim. Cada usuário só tem acesso aos próprios dados, protegidos por autenticação e regras de segurança no banco de dados.",
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "QuatroCar",
            applicationCategory: "LifestyleApplication",
            operatingSystem: "Web",
            description:
              "O prontuário digital do seu veículo: manutenção, abastecimento, documentos e alertas de manutenção por peça.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL",
            },
          }),
        }}
      />

      <div className="flex flex-1 flex-col overflow-x-hidden">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-neutral-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <LandingHeader />

        <main id="conteudo">
          {/* HERO */}
          <section className="relative overflow-hidden bg-neutral-950 text-white">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,theme(colors.amber.500/0.22),transparent_55%),radial-gradient(circle_at_90%_10%,theme(colors.amber.400/0.14),transparent_45%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(theme(colors.white/0.04)_1px,transparent_1px),linear-gradient(90deg,theme(colors.white/0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
            />

            <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-24 pt-14 sm:px-6 sm:pb-32 sm:pt-20 md:grid-cols-2 md:gap-16 md:py-28">
              <div className="text-center md:text-left">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
                  <CarIcon className="h-4 w-6 text-amber-300" />
                  O prontuário digital do seu veículo
                </span>
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                  Nunca mais perca o controle da{" "}
                  <span className="text-amber-400">manutenção</span> do seu carro
                </h1>
                <p className="mx-auto mt-5 max-w-xl text-base text-neutral-300 sm:text-lg md:mx-0">
                  O QuatroCar guarda todo o histórico do seu veículo e avisa, peça por
                  peça, exatamente quando cada manutenção vence — óleo, pastilha,
                  correia, tudo com o intervalo certo.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
                  <Link
                    href="/cadastro"
                    className="rounded-lg bg-amber-400 px-8 py-3.5 text-center text-base font-semibold text-neutral-950 transition-transform hover:bg-amber-300 active:scale-[0.98]"
                  >
                    Criar conta grátis
                  </Link>
                  <Link
                    href="/login"
                    className="rounded-lg border border-white/20 px-8 py-3.5 text-center text-base font-medium text-white transition-colors hover:bg-white/10"
                  >
                    Já tenho conta
                  </Link>
                </div>
                <p className="mt-4 text-xs text-neutral-400">
                  Grátis para 1 veículo. Sem cartão de crédito.
                </p>
              </div>

              <div className="relative order-first mx-auto w-full max-w-[320px] md:order-last md:max-w-none">
                <div
                  aria-hidden="true"
                  className="absolute -inset-10 -z-10 rounded-full bg-amber-500/20 blur-3xl"
                />
                <Image
                  src="/images/hero-mao-celular.webp"
                  alt="Mão segurando um celular com o painel do QuatroCar mostrando alertas de manutenção do veículo"
                  width={928}
                  height={1152}
                  priority
                  className="mx-auto w-full max-w-sm rounded-2xl shadow-2xl shadow-black/50"
                />
              </div>
            </div>

            <RoadPattern />
          </section>

          {/* STATS */}
          <section className="bg-neutral-900 py-8 text-white">
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 text-center sm:px-6 md:grid-cols-4">
              {[
                { n: "100%", l: "Histórico digital" },
                { n: "1 min", l: "Para registrar manutenção" },
                { n: "0", l: "Manutenções esquecidas" },
                { n: "R$ 0", l: "Para começar a usar" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-2xl font-bold text-amber-400 sm:text-3xl">{s.n}</p>
                  <p className="mt-1 text-xs text-neutral-400 sm:text-sm">{s.l}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FEATURES */}
          <section
            id="recursos"
            className="relative overflow-hidden bg-neutral-950 bg-cover bg-center py-16 text-white sm:py-24"
            style={{ backgroundImage: "url(/images/oficina-equipe.webp)" }}
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-neutral-950/90" />

            <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
              <Reveal className="text-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Recursos
                </span>
                <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                  Tudo que você precisa para cuidar do seu carro
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-neutral-300">
                  Sem planilha, sem papel perdido no porta-luvas, sem esquecer a próxima troca.
                </p>
              </Reveal>

              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((f, i) => (
                  <Reveal key={f.title} delay={i * 80}>
                    <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/10">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/15 text-2xl" aria-hidden="true">
                        {f.icon}
                      </span>
                      <h3 className="mt-4 font-semibold text-white">{f.title}</h3>
                      <p className="mt-2 text-sm text-neutral-300">{f.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section id="como-funciona" className="border-y border-neutral-200 bg-neutral-50 py-16 sm:py-24">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <Reveal className="text-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                  Simples assim
                </span>
                <h2 className="mt-2 text-2xl font-semibold text-neutral-900 sm:text-3xl">
                  Como funciona
                </h2>
              </Reveal>

              <div className="mt-12 grid gap-8 sm:grid-cols-3">
                {steps.map((s, i) => (
                  <Reveal key={s.n} delay={i * 100} className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950 text-lg font-bold text-amber-400">
                      {s.n}
                    </div>
                    <h3 className="mt-4 font-semibold text-neutral-900">{s.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600">{s.desc}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* TESTIMONIAL */}
          <section className="bg-white py-16 sm:py-24">
            <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
              <Reveal>
                <Image
                  src="/images/cliente-satisfeito.webp"
                  alt="Motorista satisfeito ao lado do seu carro, com a manutenção sempre em dia"
                  width={900}
                  height={1125}
                  className="mx-auto w-full max-w-xs rounded-2xl object-cover shadow-xl sm:max-w-sm"
                />
              </Reveal>
              <Reveal delay={100} className="text-center md:text-left">
                <span className="text-4xl text-amber-500" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="text-xl font-medium leading-snug text-neutral-900 sm:text-2xl">
                  Depois que comecei a usar o QuatroCar, nunca mais perdi uma troca de óleo
                  ou esqueci a revisão. Sei exatamente quanto gasto com meu carro todo mês.
                </p>
                <p className="mt-5 font-semibold text-neutral-900">Rafael M.</p>
                <p className="text-sm text-neutral-500">Motorista de aplicativo, São Paulo</p>
              </Reveal>
            </div>
          </section>

          {/* PRICING */}
          <section id="planos" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <Reveal className="text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                Planos
              </span>
              <h2 className="mt-2 text-2xl font-semibold text-neutral-900 sm:text-3xl">
                Planos para todo tipo de motorista
              </h2>
              <p className="mt-3 text-neutral-600">
                Comece de graça. Evolua quando precisar de mais.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {planos.map((p, i) => (
                <Reveal key={p.nome} delay={i * 100}>
                  <div
                    className={
                      "relative h-full rounded-2xl border p-6 " +
                      (p.destaque
                        ? "border-amber-400 bg-neutral-950 text-white shadow-xl shadow-amber-500/10"
                        : "border-neutral-200 bg-white text-neutral-900")
                    }
                  >
                    {p.destaque && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-neutral-950">
                        Mais popular
                      </span>
                    )}
                    <h3 className="font-semibold">{p.nome}</h3>
                    <p className={"mt-2 text-2xl font-bold " + (p.destaque ? "text-amber-400" : "")}>
                      {p.preco}
                    </p>
                    {p.periodo && (
                      <p className={"text-xs " + (p.destaque ? "text-neutral-400" : "text-neutral-500")}>
                        {p.periodo}
                      </p>
                    )}
                    <ul className="mt-5 space-y-2 text-sm">
                      {p.itens.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span aria-hidden="true" className={p.destaque ? "text-amber-400" : "text-neutral-900"}>
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="border-t border-neutral-200 bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
              <Reveal className="text-center">
                <h2 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">
                  Perguntas frequentes
                </h2>
              </Reveal>

              <div className="mt-10 divide-y divide-neutral-200 rounded-2xl border border-neutral-200">
                {faq.map((item) => (
                  <details key={item.q} className="group p-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-900">
                      {item.q}
                      <span className="ml-4 shrink-0 text-neutral-400 transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm text-neutral-600">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* FINAL CTA */}
          <section
            className="relative overflow-hidden bg-neutral-950 bg-cover bg-center py-16 text-center text-white sm:py-24"
            style={{ backgroundImage: "url(/images/hero-oficina.webp)" }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-neutral-950/85"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.amber.500/0.2),transparent_60%)]"
            />
            <Reveal className="relative mx-auto max-w-3xl px-4 sm:px-6">
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Comece a cuidar do seu carro do jeito certo
              </h2>
              <p className="mt-3 text-neutral-300">
                Leva menos de 2 minutos para cadastrar seu primeiro veículo.
              </p>
              <Link
                href="/cadastro"
                className="mt-8 inline-block rounded-lg bg-amber-400 px-8 py-3.5 text-base font-semibold text-neutral-950 transition-transform hover:bg-amber-300 active:scale-[0.98]"
              >
                Criar conta grátis
              </Link>
            </Reveal>
          </section>
        </main>

        <footer className="border-t border-neutral-900 bg-neutral-950 py-8 text-center text-xs text-neutral-500">
          <span className="text-neutral-300">Quatro<span className="text-amber-400">Car</span></span>{" "}
          · quatrocar.com.br
        </footer>
      </div>
    </>
  );
}
