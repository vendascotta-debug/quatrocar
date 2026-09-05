import Link from "next/link";
import type { Metadata } from "next";
import { LandingHeader } from "@/components/landing/header";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de uso do QuatroCar.",
};

export default function TermosPage() {
  return (
    <div className="flex flex-1 flex-col">
      <LandingHeader />
      <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">Termos de Uso</h1>
        <p className="mt-2 text-sm text-neutral-500">Última atualização: 04 de setembro de 2026</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-neutral-700">
          <section>
            <h2 className="text-base font-semibold text-neutral-900">1. Sobre o QuatroCar</h2>
            <p className="mt-2">
              O QuatroCar (quatrocar.com.br) é um serviço operado por{" "}
              <strong>Cottag Brasil Negócios e Representações Ltda</strong>, CNPJ{" "}
              04.967.880/0001-20, para donos de veículos registrarem o histórico de manutenção,
              abastecimento, documentação (IPVA, licenciamento, multas e afins) e seguro do carro,
              com lembretes automáticos de vencimento pelo painel e, opcionalmente, por WhatsApp.
              Ao criar uma conta, você concorda com estes Termos.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900">2. Cadastro e conta</h2>
            <p className="mt-2">
              Você é responsável por manter os dados da sua conta atualizados e corretos, e por
              qualquer atividade realizada com seu login. Não compartilhe sua senha com terceiros.
              É necessário ter 18 anos ou mais para criar uma conta.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900">3. Pagamento e acesso</h2>
            <p className="mt-2">
              O acesso ao QuatroCar é vendido como uma assinatura anual (à vista ou parcelada no
              cartão de crédito), com o valor exibido na página de planos no momento da compra.
              A assinatura se renova automaticamente a cada 12 meses, com uma nova cobrança do
              mesmo valor vigente, até que seja cancelada. O pagamento é processado por um
              parceiro de pagamentos terceiro (atualmente a Kiwify) — o QuatroCar não armazena
              dados de cartão de crédito.
            </p>
            <p className="mt-2">
              Você tem <strong>14 dias corridos</strong> a partir da compra (ou de cada renovação)
              para solicitar reembolso integral do valor pago, sem necessidade de justificativa —
              um prazo maior que o mínimo de 7 dias já garantido pelo Art. 49 do Código de Defesa
              do Consumidor para compras feitas fora do estabelecimento comercial. Após esse
              prazo, o valor da cobrança vigente não é reembolsável, mas você pode cancelar a
              renovação automática a qualquer momento pelo balão de suporte no site — o acesso
              continua até o fim do período já pago, sem nova cobrança depois disso.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900">4. Uso adequado</h2>
            <p className="mt-2">
              Você concorda em usar o QuatroCar apenas para fins lícitos, não tentar acessar dados
              de outros usuários, não sobrecarregar ou tentar comprometer a segurança do sistema, e
              não usar o serviço para armazenar conteúdo ilegal ou ofensivo.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900">5. Seus dados e conteúdo</h2>
            <p className="mt-2">
              Os dados dos seus veículos, manutenções, documentos e fotos que você cadastra
              continuam sendo seus. Usamos esses dados apenas para fornecer o serviço a você (ver
              nossa{" "}
              <Link href="/privacidade" className="underline">
                Política de Privacidade
              </Link>
              ). Você pode exportar seu histórico em PDF a qualquer momento.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900">6. Disponibilidade e limitações</h2>
            <p className="mt-2">
              Fazemos o possível para manter o QuatroCar disponível e funcionando corretamente,
              mas não garantimos operação ininterrupta ou livre de erros. O QuatroCar é uma
              ferramenta de organização e lembrete — não substitui a avaliação técnica de um
              profissional sobre o estado real do seu veículo, nem qualquer obrigação legal
              (como o pagamento em dia de IPVA, licenciamento ou multas).
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900">7. Encerramento de conta</h2>
            <p className="mt-2">
              Você pode encerrar sua conta a qualquer momento entrando em contato com o suporte.
              Podemos suspender ou encerrar contas que violem estes Termos.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900">8. Alterações nestes Termos</h2>
            <p className="mt-2">
              Podemos atualizar estes Termos de tempos em tempos. Mudanças relevantes serão
              comunicadas pelos canais de contato que você nos forneceu.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900">9. Contato</h2>
            <p className="mt-2">
              Dúvidas sobre estes Termos? Fale com a gente em{" "}
              <a href="mailto:vendas.cotta@gmail.com" className="underline">
                vendas.cotta@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-neutral-200 bg-white py-8 text-center text-xs text-neutral-500">
        <span className="text-neutral-700">Quatro<span className="text-sky-600">Car</span></span>{" "}
        · quatrocar.com.br · © 2026 QuatroCar — Cottag Brasil Negócios e Representações Ltda · CNPJ 04.967.880/0001-20. Todos os direitos reservados.
      </footer>
    </div>
  );
}
