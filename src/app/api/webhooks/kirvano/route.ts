import { NextRequest, NextResponse } from "next/server";
import { upgradeUserByEmail } from "@/lib/webhook-helpers";

/**
 * Webhook da Kirvano.
 * Configure em: Kirvano > Integrações > Webhook, apontando para
 * https://SEU-DOMINIO/api/webhooks/kirvano
 *
 * A Kirvano costuma enviar um token de segurança no header "Authorization"
 * ou como query param, dependendo da configuração escolhida na plataforma.
 * Copie o token gerado por lá e salve em KIRVANO_WEBHOOK_SECRET.
 *
 * IMPORTANTE: os nomes exatos dos campos abaixo (event, customer.email)
 * devem ser conferidos contra um payload real assim que o primeiro teste
 * de venda for feito na Kirvano — ainda não temos um produto criado lá.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.KIRVANO_WEBHOOK_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }

  const body = await request.json();
  const event = body?.event as string | undefined;
  const email = body?.customer?.email as string | undefined;

  if (!email) {
    return NextResponse.json({ error: "E-mail do comprador não encontrado" }, { status: 400 });
  }

  if (event === "SALE_APPROVED" || event === "purchase.approved") {
    const result = await upgradeUserByEmail(email, "premium");
    return NextResponse.json({ ok: true, upgraded: result.found });
  }

  if (event === "SALE_REFUNDED" || event === "purchase.refunded" || event === "SALE_CHARGEBACK") {
    const result = await upgradeUserByEmail(email, "free");
    return NextResponse.json({ ok: true, downgraded: result.found });
  }

  return NextResponse.json({ ok: true, ignored: event });
}
