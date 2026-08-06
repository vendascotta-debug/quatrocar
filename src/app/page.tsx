import Link from "next/link";

const features = [
  {
    title: "Histórico completo",
    desc: "Manutenção, revisões, peças, garantias e notas fiscais — tudo num só lugar, para sempre.",
  },
  {
    title: "Alertas por peça",
    desc: "Cada peça tem seu próprio intervalo de troca. O QuatroCar avisa quando cada uma está vencendo.",
  },
  {
    title: "Controle de abastecimento",
    desc: "Registre cada abastecimento e acompanhe consumo, custo por km e gasto mensal automaticamente.",
  },
  {
    title: "Múltiplos veículos",
    desc: "Gerencie o carro da família, o carro do trabalho ou toda uma frota, tudo na mesma conta.",
  },
  {
    title: "Dashboard financeiro",
    desc: "Veja quanto você gastou no mês, no ano e desde que comprou o carro — sem precisar somar nada na mão.",
  },
  {
    title: "Feito para o Brasil",
    desc: "Pensado para motoristas de app, taxistas, frotas e donos de carro comum — do jeito que a manutenção acontece aqui.",
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

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center">
          <span className="mb-4 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
            O prontuário digital do seu veículo
          </span>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            Nunca mais perca o controle da manutenção do seu carro
          </h1>
          <p className="mt-6 max-w-xl text-lg text-neutral-600">
            O QuatroCar guarda todo o histórico do seu veículo e avisa, peça por
            peça, exatamente quando cada manutenção vence — óleo, pastilha,
            correia, tudo com o intervalo certo.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/cadastro"
              className="rounded-lg bg-neutral-900 px-8 py-3 text-sm font-medium text-white hover:bg-neutral-700"
            >
              Criar conta grátis
            </Link>
            <Link
              href="/login"
              className="rounded-lg border border-neutral-300 px-8 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
            >
              Já tenho conta
            </Link>
          </div>
          <p className="mt-4 text-xs text-neutral-500">
            Grátis para 1 veículo. Sem cartão de crédito.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">
            Tudo que você precisa para cuidar do seu carro
          </h2>
          <p className="mt-3 text-neutral-600">
            Sem planilha, sem papel perdido no porta-luvas, sem esquecer a próxima troca.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-neutral-200 bg-white p-6">
              <h3 className="font-semibold text-neutral-900">{f.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">
              Planos para todo tipo de motorista
            </h2>
            <p className="mt-3 text-neutral-600">
              Comece de graça. Evolua quando precisar de mais.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {planos.map((p) => (
              <div
                key={p.nome}
                className={
                  "rounded-xl border p-6 " +
                  (p.destaque
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-900")
                }
              >
                <h3 className="font-semibold">{p.nome}</h3>
                <p className="mt-2 text-2xl font-bold">{p.preco}</p>
                {p.periodo && (
                  <p className={"text-xs " + (p.destaque ? "text-neutral-300" : "text-neutral-500")}>
                    {p.periodo}
                  </p>
                )}
                <ul className="mt-5 space-y-2 text-sm">
                  {p.itens.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-6 py-20 text-center">
        <h2 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">
          Comece a cuidar do seu carro do jeito certo
        </h2>
        <p className="mt-3 text-neutral-600">
          Leva menos de 2 minutos para cadastrar seu primeiro veículo.
        </p>
        <Link
          href="/cadastro"
          className="mt-8 inline-block rounded-lg bg-neutral-900 px-8 py-3 text-sm font-medium text-white hover:bg-neutral-700"
        >
          Criar conta grátis
        </Link>
      </section>

      <footer className="border-t border-neutral-200 py-8 text-center text-xs text-neutral-500">
        QuatroCar · quatrocar.com.br
      </footer>
    </div>
  );
}
