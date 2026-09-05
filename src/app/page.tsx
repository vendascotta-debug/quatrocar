import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { LandingHeader } from "@/components/landing/header";
import { Reveal } from "@/components/landing/reveal";
import { HeroHeadline } from "@/components/landing/hero-headline";
import { RoadPattern } from "@/components/landing/road-pattern";
import { CarIcon } from "@/components/landing/car-icon";
import { ExitIntentPopup } from "@/components/landing/exit-intent";
import { ScrollToTop } from "@/components/landing/scroll-to-top";
import { SupportWidget } from "@/components/landing/support-widget";
import { PricingCarousel } from "@/components/landing/pricing-carousel";
import { TestimonialCarousel } from "@/components/landing/testimonial-carousel";
import { BrandMarquee } from "@/components/landing/brand-marquee";
import { KIWIFY_CHECKOUT_URL } from "@/lib/constants";
import {
  IconHistorico,
  IconAlerta,
  IconVeiculos,
  IconDashboard,
  IconDocumento,
  IconBrasil,
} from "@/components/landing/feature-icons";

export const metadata: Metadata = {
  title: "QuatroCar — A memória do seu carro, sempre organizada",
  description:
    "Registre as manutenções, acompanhe o histórico do seu veículo e receba lembretes automáticos de manutenção. Controle de gastos, quilometragem e documentos em um só lugar. Assine com 14 dias de garantia.",
  openGraph: {
    title: "QuatroCar — A memória do seu carro, sempre organizada",
    description:
      "Histórico completo do veículo, lembretes de manutenção por peça e controle de gastos automotivos em um só lugar.",
    url: "https://quatrocar.com.br",
    siteName: "QuatroCar",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuatroCar — A memória do seu carro, sempre organizada",
    description:
      "Histórico completo do veículo, lembretes de manutenção por peça e controle de gastos automotivos em um só lugar.",
  },
  alternates: {
    canonical: "https://quatrocar.com.br",
  },
};

const problemas = [
  "Quando foi a última troca de óleo?",
  "Qual foi a quilometragem da última revisão?",
  "Quando troquei os pneus, mesmo?",
  "Essa peça ainda está na garantia?",
  "Quanto eu já gastei com esse carro esse ano?",
  "Onde guardei aquela nota fiscal?",
  "Quando vence o IPVA ou o seguro do carro?",
];

const beneficios = [
  {
    title: "Saiba o que já foi feito",
    desc: "Todo serviço registrado com data, quilometragem e valor — nada fica só na memória.",
    Icon: IconHistorico,
  },
  {
    title: "Não deixe manutenções passarem",
    desc: "Cada peça tem seu próprio intervalo de troca. O QuatroCar avisa antes de vencer — no painel e por WhatsApp.",
    Icon: IconAlerta,
  },
  {
    title: "Controle quanto você gasta",
    desc: "Veja o gasto do mês, do ano e desde que comprou o carro, sem somar nada na mão.",
    Icon: IconDashboard,
  },
  {
    title: "Entenda o estado do veículo",
    desc: "Combustível, revisões e manutenções num painel só, por veículo cadastrado.",
    Icon: IconVeiculos,
  },
  {
    title: "IPVA, licenciamento e seguro em dia",
    desc: "Registre documentação e seguro do carro junto com a manutenção, e receba aviso antes de vencer.",
    Icon: IconDocumento,
  },
  {
    title: "Mais segurança para vender",
    desc: "Histórico completo e comprovado ajuda a valorizar o carro na hora de repassar.",
    Icon: IconBrasil,
  },
];

const steps = [
  {
    n: "1",
    title: "Cadastre seu carro",
    desc: "Marca, modelo, ano e quilometragem atual. Leva menos de 2 minutos.",
  },
  {
    n: "2",
    title: "Registre as manutenções",
    desc: "A cada troca, diga quando é a próxima — km ou meses. O QuatroCar guarda tudo.",
  },
  {
    n: "3",
    title: "Tenha tudo organizado",
    desc: "Histórico completo do veículo, separado por mês, sempre à mão no celular.",
  },
  {
    n: "4",
    title: "Receba os lembretes",
    desc: "Quando algo estiver perto do vencimento, você vê no painel e recebe um aviso direto no WhatsApp.",
  },
];

const semQuatroCar = [
  "Informações espalhadas em cadernos, grupos de WhatsApp e memória",
  "Notas fiscais e comprovantes perdidos",
  "Dificuldade para lembrar datas e quilometragem",
  "Manutenções importantes esquecidas",
  "Histórico incompleto na hora de vender o carro",
];

const comQuatroCar = [
  "Histórico completo organizado por veículo",
  "Manutenções registradas com data, km e valor",
  "Lembretes automáticos, peça por peça",
  "Informações centralizadas e sempre acessíveis",
  "Controle real de quanto você gasta com o carro",
];

const planos = [
  {
    nome: "Premium",
    publico: "Proprietários de veículos",
    preco: "R$ 97",
    periodo: "pagamento único · ou 12x no cartão",
    precoDe: "R$ 497",
    precoParcela: "R$ 9,97",
    precoAvista: "R$ 97,00",
    destaque: true,
    checkoutUrl: KIWIFY_CHECKOUT_URL,
    itens: [
      "Acesso vitalício, sem mensalidade",
      "Veículos ilimitados",
      "Histórico completo",
      "Relatórios em PDF",
      "Alertas de manutenção, documentos e seguro",
      "Lembretes pelo painel e por WhatsApp",
      "Controle financeiro completo",
      "Planejamento das próximas manutenções",
    ],
  },
];

const testimonials = [
  {
    imagem: "/images/cliente-oficina.webp",
    alt: "Cliente satisfeito ao lado do seu carro na oficina, com o mecânico realizando a manutenção",
    citacao:
      "Depois que comecei a usar o QuatroCar, nunca mais perdi uma troca de óleo ou esqueci a revisão. Sei exatamente quanto gasto com meu carro todo mês.",
    nome: "Rafael M.",
    papel: "Motorista de aplicativo, São Paulo",
  },
  {
    imagem: "/images/testimonial-2.webp",
    alt: "Motorista de aplicativo sorrindo dentro do carro, segurando o celular com o app aberto",
    citacao:
      "Rodando o dia inteiro, eu não tinha tempo de anotar nada. Agora registro o abastecimento em segundos e sei exatamente meu custo por km rodado.",
    nome: "Carlos E.",
    papel: "Motorista de aplicativo, Rio de Janeiro",
  },
  {
    imagem: "/images/testimonial-1.webp",
    alt: "Mulher sorrindo olhando o celular ao lado do carro na garagem de casa",
    citacao:
      "Eu sempre esquecia quando tinha feito a última revisão. Agora o app me avisa antes de vencer e eu nem preciso pensar nisso.",
    nome: "Juliana P.",
    papel: "Proprietária de veículo, Belo Horizonte",
  },
  {
    imagem: "/images/testimonial-3.webp",
    alt: "Mulher sorrindo ao lado do carro em uma oficina de estética automotiva",
    citacao:
      "Guardo todas as notas fiscais e o histórico de higienização no app. Na hora de vender o carro, vou ter tudo documentado pra provar que cuidei bem dele.",
    nome: "Fernanda A.",
    papel: "Proprietária de veículo, Curitiba",
  },
  {
    imagem: "/images/testimonial-4.webp",
    alt: "Casal sorrindo ao lado do carro da família em frente a casa",
    citacao:
      "Como a família toda usa o carro, era uma bagunça saber quem fez o quê. Agora fica tudo registrado num lugar só, e todo mundo vê o mesmo histórico.",
    nome: "Marcos e Patrícia",
    papel: "Família, Florianópolis",
  },
];

const faq = [
  {
    q: "Como funciona o QuatroCar?",
    a: "Você cadastra seu carro, registra as manutenções feitas (com data, km e valor) e o QuatroCar organiza tudo automaticamente num histórico por veículo, além de avisar quando cada peça está perto do vencimento.",
  },
  {
    q: "Preciso pagar para usar?",
    a: "Sim. O acesso ao QuatroCar é um pagamento único de R$ 97 (à vista ou parcelado em até 12x no cartão), sem mensalidade. Se não gostar, você tem 14 dias de garantia com devolução integral do valor.",
  },
  {
    q: "Posso cadastrar mais de um veículo?",
    a: "Sim, no plano Premium você pode cadastrar quantos veículos precisar — ótimo para famílias, motoristas de app ou pequenas frotas.",
  },
  {
    q: "Preciso instalar algum aplicativo?",
    a: "Não é obrigatório. O QuatroCar funciona direto no navegador do celular ou computador, e você pode adicionar um atalho na tela inicial do celular para abrir como se fosse um app.",
  },
  {
    q: "Como recebo os lembretes de manutenção?",
    a: "Quando você registra uma manutenção, documento ou seguro, informa o intervalo (em km ou meses). O QuatroCar calcula sozinho a próxima data e avisa de duas formas: no seu painel e por WhatsApp, se você cadastrar seu número no perfil.",
  },
  {
    q: "Posso consultar meu histórico quando quiser?",
    a: "Sim. Todo o histórico fica salvo na sua conta e pode ser acessado a qualquer momento, de qualquer aparelho, além de poder ser exportado em PDF.",
  },
  {
    q: "Meus dados ficam seguros?",
    a: "Sim. Cada usuário só tem acesso aos próprios dados, protegidos por autenticação e regras de segurança no banco de dados.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "É um pagamento único de R$ 97, processado com segurança pela Kiwify — à vista ou parcelado em até 12x no cartão. Depois de pago, o acesso ao QuatroCar é vitalício, sem mensalidade.",
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
              "A memória do seu carro: histórico de manutenção, abastecimento, documentos e lembretes de manutenção por peça.",
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
        <ScrollToTop />
        <LandingHeader />
        <ExitIntentPopup />
        <SupportWidget />

        <main id="conteudo">
          {/* HERO */}
          <section className="relative overflow-hidden bg-neutral-950 text-white">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,theme(colors.sky.500/0.22),transparent_55%),radial-gradient(circle_at_90%_10%,theme(colors.sky.400/0.14),transparent_45%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(theme(colors.white/0.04)_1px,transparent_1px),linear-gradient(90deg,theme(colors.white/0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
            />

            <div
              aria-hidden="true"
              className="animate-hero-sweep pointer-events-none absolute inset-y-0 left-0 z-10 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />

            <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-24 pt-14 sm:px-6 sm:pb-32 sm:pt-20 md:grid-cols-2 md:gap-16 md:py-28">
              <div className="relative z-20 text-center md:text-left">
                <Reveal>
                  <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-medium text-sky-300">
                    <CarIcon className="h-4 w-6 text-sky-300" />
                    Seu carro também precisa de memória
                  </span>
                </Reveal>
                <HeroHeadline />
                <Reveal delay={520}>
                  <p className="mx-auto mt-5 max-w-xl text-base text-neutral-300 sm:text-lg md:mx-0">
                    Registre as manutenções, acompanhe o histórico do seu veículo e receba
                    lembretes para não deixar os próximos cuidados para depois.
                  </p>
                </Reveal>
                <Reveal delay={620}>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
                    <a
                      href={KIWIFY_CHECKOUT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-sky-400 px-8 py-3.5 text-center text-base font-semibold text-neutral-950 transition-transform hover:bg-sky-300 active:scale-[0.98]"
                    >
                      Começar agora
                    </a>
                    <Link
                      href="#como-funciona"
                      className="rounded-lg border border-white/20 px-8 py-3.5 text-center text-base font-medium text-white transition-colors hover:bg-white/10"
                    >
                      Como funciona
                    </Link>
                  </div>
                  <p className="mt-4 text-xs text-neutral-400">
                    Garantia de 14 dias — não gostou, devolvemos 100% do valor.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={200} className="order-first md:order-last">
                <div className="relative mx-auto w-full max-w-[320px] md:max-w-none">
                  <div
                    aria-hidden="true"
                    className="animate-glow-pulse absolute -inset-10 -z-10 rounded-full bg-sky-500/20 blur-3xl"
                  />
                  <Image
                    src="/images/hero-mao-celular.webp"
                    alt="Mão segurando um celular com o painel do QuatroCar mostrando o histórico e alertas de manutenção do veículo"
                    width={928}
                    height={1152}
                    priority
                    className="animate-float mx-auto w-full max-w-sm rounded-2xl shadow-2xl shadow-black/50"
                  />
                </div>
              </Reveal>
            </div>

            <RoadPattern />
          </section>

          {/* STATS */}
          <section
            className="relative overflow-hidden bg-neutral-900 bg-cover bg-center py-8 text-white"
            style={{ backgroundImage: "url(/images/textura-abstrata.webp)" }}
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-neutral-900/70" />
            <div className="relative mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 text-center sm:px-6 md:grid-cols-4">
              {[
                { n: "100%", l: "Histórico digital" },
                { n: "1 min", l: "Para registrar manutenção" },
                { n: "0", l: "Manutenções esquecidas" },
                { n: "R$ 0", l: "Para começar a usar" },
              ].map((s, i) => (
                <Reveal key={s.l} delay={i * 80}>
                  <p className="text-2xl font-bold text-sky-400 sm:text-3xl">{s.n}</p>
                  <p className="mt-1 text-xs text-neutral-400 sm:text-sm">{s.l}</p>
                </Reveal>
              ))}
            </div>
          </section>

          <BrandMarquee />

          {/* PROBLEMA */}
          <section id="problema" className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <Reveal className="text-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                  O problema
                </span>
                <h2 className="mt-2 text-2xl font-semibold text-neutral-900 sm:text-3xl">
                  Isso te parece familiar?
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-neutral-600">
                  A manutenção do carro vive espalhada: na memória, num grupo de WhatsApp,
                  numa nota perdida no porta-luvas.
                </p>
              </Reveal>

              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {problemas.map((p, i) => (
                  <Reveal key={p} delay={i * 70}>
                    <div
                      className="h-full rounded-2xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1"
                      style={{ transform: `rotate(${i % 2 === 0 ? "-0.6deg" : "0.6deg"})` }}
                    >
                      <p className="font-medium text-neutral-800">&ldquo;{p}&rdquo;</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={200}>
                <p className="mx-auto mt-12 max-w-2xl text-center text-lg font-medium text-neutral-900">
                  O QuatroCar existe para você nunca mais precisar responder essas perguntas
                  de memória.
                </p>
              </Reveal>
            </div>
          </section>

          {/* SOLUÇÃO */}
          <section id="solucao" className="border-y border-neutral-200 bg-neutral-50 py-16 sm:py-24">
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
              <Reveal>
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                  A solução
                </span>
                <h2 className="mt-2 text-2xl font-semibold text-neutral-900 sm:text-3xl">
                  O histórico do seu carro em um só lugar.
                </h2>
                <p className="mt-4 text-neutral-600">
                  Veículo, manutenções, quilometragem, datas e próximos cuidados —
                  organizados automaticamente conforme você registra. Sem planilha, sem
                  papel, sem depender da memória.
                </p>
                <a
                  href={KIWIFY_CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block rounded-lg bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
                >
                  Quero organizar meu carro
                </a>
              </Reveal>

              <Reveal delay={150}>
                <div className="mx-auto w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-5 shadow-xl">
                  <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white">
                      🚗
                    </span>
                    <div>
                      <p className="font-semibold text-neutral-900">Onix 2021</p>
                      <p className="text-xs text-neutral-500">ABC-1D23 · 48.200 km</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      { nome: "Troca de óleo", data: "12/06/2026", status: "ok" },
                      { nome: "Pastilha de freio", data: "próxima em 2.500 km", status: "proximo" },
                      { nome: "Correia dentada", data: "atrasada", status: "atrasado" },
                    ].map((item) => (
                      <div
                        key={item.nome}
                        className="flex items-center justify-between rounded-lg bg-neutral-50 px-3 py-2.5"
                      >
                        <div>
                          <p className="text-sm font-medium text-neutral-800">{item.nome}</p>
                          <p className="text-xs text-neutral-500">{item.data}</p>
                        </div>
                        <span
                          className={
                            "h-2.5 w-2.5 rounded-full " +
                            (item.status === "ok"
                              ? "bg-emerald-500"
                              : item.status === "proximo"
                                ? "bg-amber-500"
                                : "bg-red-500")
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section id="como-funciona" className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <Reveal className="text-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                  Simples assim
                </span>
                <h2 className="mt-2 text-2xl font-semibold text-neutral-900 sm:text-3xl">
                  Como funciona
                </h2>
              </Reveal>

              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((s, i) => (
                  <Reveal key={s.n} delay={i * 100} className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950 text-lg font-bold text-sky-400">
                      {s.n}
                    </div>
                    <h3 className="mt-4 font-semibold text-neutral-900">{s.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600">{s.desc}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* AVISO POR WHATSAPP */}
          <section className="border-y border-neutral-200 bg-neutral-50 py-16 sm:py-24">
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
              <Reveal delay={150} className="order-first md:order-last">
                <Image
                  src="/images/whatsapp-aviso.webp"
                  alt="Mão segurando um celular com uma mensagem do QuatroCar no WhatsApp avisando sobre a troca de óleo vencendo"
                  width={1000}
                  height={1339}
                  className="mx-auto w-full max-w-sm rounded-2xl shadow-xl"
                />
              </Reveal>

              <Reveal>
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                  Sem precisar abrir o app
                </span>
                <h2 className="mt-2 text-2xl font-semibold text-neutral-900 sm:text-3xl">
                  O aviso chega direto no seu WhatsApp
                </h2>
                <p className="mt-4 text-neutral-600">
                  Quando uma manutenção, documento ou seguro estiver perto de vencer — ou já
                  tiver vencido — o QuatroCar manda uma mensagem no seu WhatsApp, com um link
                  direto para os detalhes. Sem precisar lembrar de abrir o app.
                </p>
                <a
                  href={KIWIFY_CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block rounded-lg bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
                >
                  Quero receber os avisos
                </a>
              </Reveal>
            </div>
          </section>

          {/* VALOR DO HISTÓRICO */}
          <section
            id="recursos"
            className="relative overflow-hidden bg-neutral-950 bg-cover bg-center py-16 text-white sm:py-24"
            style={{ backgroundImage: "url(/images/oficina-equipe.webp)" }}
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-neutral-950/90" />

            <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
              <Reveal className="text-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                  O valor do histórico
                </span>
                <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                  Ter todo o histórico do seu carro muda a forma como você cuida dele
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-neutral-300">
                  Sem planilha, sem papel perdido no porta-luvas, sem esquecer a próxima troca.
                </p>
              </Reveal>

              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {beneficios.map((f, i) => (
                  <Reveal key={f.title} delay={i * 80}>
                    <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/30 hover:bg-white/10 hover:shadow-[0_8px_30px_-8px_theme(colors.sky.500/0.35)]">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-400/15 text-sky-300 transition-colors duration-300 group-hover:bg-sky-400/25">
                        <f.Icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-4 font-semibold text-white">{f.title}</h3>
                      <p className="mt-2 text-sm text-neutral-300">{f.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={520}>
                <div className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-4 rounded-2xl border border-sky-400/20 bg-sky-400/5 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
                  <p className="text-sm text-neutral-200">
                    <strong className="text-white">Novidade:</strong> agora dá pra controlar IPVA,
                    licenciamento, multas e seguro do carro no mesmo lugar, com aviso antes do
                    vencimento.
                  </p>
                  <a
                    href={KIWIFY_CHECKOUT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-lg bg-sky-400 px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-sky-300"
                  >
                    Quero organizar meus documentos
                  </a>
                </div>
              </Reveal>
            </div>
          </section>

          {/* MOSTRAR O PRODUTO */}
          <section id="produto" className="relative overflow-hidden bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <Reveal className="text-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                  Veja na prática
                </span>
                <h2 className="mt-2 text-2xl font-semibold text-neutral-900 sm:text-3xl">
                  O app por dentro
                </h2>
              </Reveal>

              <div className="relative mt-16 grid gap-8 sm:grid-cols-3">
                <Reveal delay={0} className="sm:translate-y-6">
                  <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xl">
                    <p className="text-xs font-medium text-neutral-500">Gasto do mês</p>
                    <p className="mt-1 text-2xl font-bold text-neutral-900">R$ 384,00</p>
                    <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-neutral-100">
                      <span className="h-full w-2/3 bg-sky-500" />
                      <span className="h-full w-1/3 bg-amber-400" />
                    </div>
                    <div className="mt-3 flex justify-between text-xs text-neutral-500">
                      <span>Manutenção</span>
                      <span>Combustível</span>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={120} className="sm:-translate-y-2">
                  <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xl">
                    <p className="text-xs font-medium text-neutral-500">Histórico · Onix 2021</p>
                    <ul className="mt-3 space-y-2 text-sm">
                      <li className="flex justify-between border-b border-neutral-100 pb-2">
                        <span className="text-neutral-800">Troca de óleo</span>
                        <span className="text-neutral-500">12/06</span>
                      </li>
                      <li className="flex justify-between border-b border-neutral-100 pb-2">
                        <span className="text-neutral-800">Alinhamento</span>
                        <span className="text-neutral-500">03/05</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-neutral-800">Filtro de ar</span>
                        <span className="text-neutral-500">21/03</span>
                      </li>
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={240} className="sm:translate-y-6">
                  <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xl">
                    <p className="text-xs font-medium text-neutral-500">Lembretes</p>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between rounded-lg bg-red-50 px-3 py-2">
                        <span className="text-sm font-medium text-red-700">Correia dentada</span>
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-700">
                          Atrasado
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-amber-50 px-3 py-2">
                        <span className="text-sm font-medium text-amber-700">Pastilha de freio</span>
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                          Próximo
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* POR QUE USAR */}
          <section className="border-y border-neutral-200 bg-neutral-50 py-16 sm:py-24">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <Reveal className="text-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                  Por que usar
                </span>
                <h2 className="mt-2 text-2xl font-semibold text-neutral-900 sm:text-3xl">
                  Com ou sem QuatroCar, a diferença é clara
                </h2>
              </Reveal>

              <div className="mt-12 grid gap-6 sm:grid-cols-2">
                <Reveal>
                  <div className="h-full rounded-2xl border border-neutral-200 bg-white p-6">
                    <h3 className="font-semibold text-neutral-500">Sem QuatroCar</h3>
                    <ul className="mt-4 space-y-3">
                      {semQuatroCar.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-neutral-500">
                          <span aria-hidden="true" className="mt-0.5 text-neutral-400">
                            ✕
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={100}>
                  <div className="h-full rounded-2xl border border-sky-400 bg-neutral-950 p-6 text-white shadow-xl shadow-sky-500/10">
                    <h3 className="font-semibold text-sky-400">Com QuatroCar</h3>
                    <ul className="mt-4 space-y-3">
                      {comQuatroCar.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-neutral-200">
                          <span aria-hidden="true" className="mt-0.5 text-sky-400">
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* TESTIMONIAL */}
          <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-white py-16 sm:py-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl"
            />
            <div className="relative px-4 sm:px-6">
              <Reveal>
                <TestimonialCarousel items={testimonials} />
              </Reveal>
            </div>
          </section>

          {/* PRICING */}
          <section id="planos" className="relative overflow-hidden bg-neutral-950 py-16 text-white sm:py-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,theme(colors.sky.500/0.25),transparent_70%)]"
            />
            <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
            <Reveal className="text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                Acesso vitalício
              </span>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                Você já viu o que o QuatroCar faz. Agora veja quanto custa.
              </h2>
              <p className="mt-3 text-neutral-300">
                Um pagamento único. Sem mensalidade, sem preocupação com cobrança recorrente.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-sky-400/20 bg-sky-400/5 px-5 py-4 text-center text-sm text-neutral-200">
                Uma troca de óleo esquecida pode custar centenas de reais. Por{" "}
                <strong className="text-white">R$ 97 (ou 12x no cartão)</strong>, você garante
                acesso vitalício ao QuatroCar pra nunca mais perder o controle do seu carro.
              </div>
            </Reveal>

            <div className="mt-10">
              <PricingCarousel planos={planos} />
            </div>

            <Reveal delay={150}>
              <p className="mx-auto mt-6 max-w-xl text-center text-xs text-neutral-400">
                Pagamento processado com segurança pela Kiwify, à vista ou parcelado em até 12x
                no cartão. Acesso vitalício, sem mensalidade.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-sky-400 bg-sky-400/10 p-6 text-center">
                <span className="rounded-full bg-sky-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-neutral-950">
                  Garantia de 14 dias
                </span>
                <p className="mt-3 text-lg font-semibold">
                  R$ 97 pagamento único · acesso vitalício ao QuatroCar
                </p>
                <p className="mt-2 text-sm text-neutral-300">
                  Não gostou nos primeiros 14 dias? Devolvemos 100% do valor, sem burocracia.
                </p>
                <a
                  href={KIWIFY_CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block rounded-lg bg-sky-400 px-8 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-sky-300"
                >
                  Assinar o QuatroCar
                </a>
              </div>
            </Reveal>
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
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.sky.500/0.2),transparent_60%)]"
            />
            <Reveal className="relative mx-auto max-w-3xl px-4 sm:px-6">
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Seu carro também precisa de memória
              </h2>
              <p className="mt-3 text-neutral-300">
                Assine com garantia de 14 dias e cadastre seu primeiro veículo em menos de 2
                minutos.
              </p>
              <a
                href={KIWIFY_CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-lg bg-sky-400 px-8 py-3.5 text-base font-semibold text-neutral-950 transition-transform hover:bg-sky-300 active:scale-[0.98]"
              >
                Começar agora
              </a>
            </Reveal>
          </section>
        </main>

        <footer className="border-t border-neutral-900 bg-neutral-950 py-8 text-center text-xs text-neutral-500">
          <span className="text-neutral-300">Quatro<span className="text-sky-400">Car</span></span>{" "}
          · quatrocar.com.br
          <div className="mt-2 flex items-center justify-center gap-4">
            <Link href="/termos" className="hover:text-neutral-300">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="hover:text-neutral-300">
              Privacidade
            </Link>
          </div>
          <p className="mt-2">
            © 2026 QuatroCar — Cottag Brasil Negócios e Representações Ltda · CNPJ
            04.967.880/0001-20. Todos os direitos reservados.
          </p>
        </footer>
      </div>
    </>
  );
}
