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
              O QuatroCar (quatrocar.com.br) é um serviço para donos de veículos registrarem o
              histórico de manutenção, abastecimento, documentação (IPVA, licenciamento, multas
              e afins) e seguro do carro, com lembretes automáticos de vencimento pelo painel e,
              opcionalmente, por WhatsApp. Ao criar uma conta, você concorda com estes Termos.
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
            <h2 className="text-base font-semibold text-neutral-900">3. Planos e cobrança</h2>
            <p className="mt-2">
              O QuatroCar oferece um plano Gratuito (1 veículo, sem custo) e planos pagos
              (Premium e Empresas), com os valores e recursos exibidos na página de planos no
              momento da assinatura. Os pagamentos das assinaturas são processados por um
              parceiro de pagamentos terceiro (atualmente a Kiwify) — o QuatroCar não armazena
              dados de cartão de crédito.
            </p>
            <p className="mt-2">
              A assinatura é mensal e não tem fidelidade: você pode cancelar quando quiser,
              diretamente pelo painel do parceiro de pagamentos ou entrando em contato com nosso
              suporte. O cancelamento interrompe as cobranças futuras; o acesso aos recursos pagos
              continua até o fim do período já pago.
            </p>
            <p className="mt-2">
              Conforme o Art. 49 do Código de Defesa do Consumidor, você tem direito ao
              arrependimento e reembolso integral em até 7 dias corridos após a contratação, desde
              que solicitado dentro desse prazo.
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
        · quatrocar.com.br · © 2026 QuatroCar. Todos os direitos reservados.
      </footer>
    </div>
  );
}
