import Link from "next/link";
import type { Metadata } from "next";
import { LandingHeader } from "@/components/landing/header";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como o QuatroCar coleta, usa e protege seus dados.",
};

export default function PrivacidadePage() {
  return (
    <div className="flex flex-1 flex-col">
      <LandingHeader />
      <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">
          Política de Privacidade
        </h1>
        <p className="mt-2 text-sm text-neutral-500">Última atualização: 04 de setembro de 2026</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-neutral-700">
          <section>
            <p>
              Esta política explica como o QuatroCar coleta, usa e protege seus dados pessoais, em
              conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900">1. Quais dados coletamos</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Dados de cadastro: nome, e-mail, telefone/WhatsApp.</li>
              <li>
                Dados dos veículos: marca, modelo, ano, placa, quilometragem e demais informações
                que você cadastrar.
              </li>
              <li>
                Registros de manutenção, abastecimento, documentação e seguro: datas, valores,
                categorias, observações, notas fiscais e fotos que você enviar.
              </li>
              <li>
                Dados de uso do serviço (páginas acessadas, eventos de navegação) via Google
                Analytics, para entendermos como melhorar o QuatroCar.
              </li>
              <li>
                Dados de pagamento da assinatura: processados diretamente pelo parceiro de
                pagamentos (Kiwify) — o QuatroCar não tem acesso a números de cartão de crédito.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900">2. Para que usamos seus dados</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Fornecer o serviço: guardar seu histórico e calcular os próximos vencimentos.</li>
              <li>
                Enviar lembretes de manutenção, documentos e seguro pelo painel e, se você
                cadastrar seu número, por WhatsApp.
              </li>
              <li>Dar suporte quando você entra em contato.</li>
              <li>Melhorar o produto com base em como ele é usado.</li>
              <li>Cumprir obrigações legais e responder a autoridades quando exigido por lei.</li>
            </ul>
            <p className="mt-2">
              Não vendemos seus dados pessoais, e não usamos as informações do seu veículo para
              fins publicitários de terceiros.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900">3. Com quem compartilhamos</h2>
            <p className="mt-2">
              Compartilhamos dados apenas com prestadores de serviço necessários para operar o
              QuatroCar: hospedagem e banco de dados (Supabase), envio de mensagens de WhatsApp
              (quando você cadastra seu número) e processamento de pagamentos (Kiwify). Cada um
              desses parceiros só recebe os dados estritamente necessários para prestar o serviço
              contratado.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900">4. Segurança</h2>
            <p className="mt-2">
              Seus dados ficam protegidos por autenticação e regras de segurança no banco de
              dados: cada usuário só consegue acessar os próprios veículos e registros. Usamos
              conexão criptografada (HTTPS) em todo o site.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900">5. Seus direitos</h2>
            <p className="mt-2">Como titular dos dados, você pode a qualquer momento:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Acessar e revisar os dados que temos sobre você (disponíveis no seu painel).</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
              <li>Solicitar a exclusão da sua conta e dos seus dados.</li>
              <li>Solicitar uma cópia dos seus dados (exportação).</li>
              <li>Revogar o consentimento para receber avisos por WhatsApp, a qualquer momento.</li>
            </ul>
            <p className="mt-2">
              Para exercer qualquer um desses direitos, entre em contato em{" "}
              <a href="mailto:vendas.cotta@gmail.com" className="underline">
                vendas.cotta@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900">6. Retenção de dados</h2>
            <p className="mt-2">
              Mantemos seus dados enquanto sua conta estiver ativa. Se você solicitar o
              encerramento da conta, seus dados são excluídos, salvo o que precisarmos manter por
              obrigação legal (por exemplo, registros fiscais de pagamento).
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900">7. Cookies e analytics</h2>
            <p className="mt-2">
              Usamos o Google Analytics para entender como o site é usado (páginas visitadas,
              tempo de navegação). Esses dados são agregados e não identificam você diretamente.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900">8. Alterações nesta política</h2>
            <p className="mt-2">
              Podemos atualizar esta política de tempos em tempos. A data no topo desta página
              mostra a última atualização.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-neutral-900">9. Contato</h2>
            <p className="mt-2">
              Dúvidas sobre privacidade e seus dados? Fale com a gente em{" "}
              <a href="mailto:vendas.cotta@gmail.com" className="underline">
                vendas.cotta@gmail.com
              </a>
              . Veja também nossos{" "}
              <Link href="/termos" className="underline">
                Termos de Uso
              </Link>
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
