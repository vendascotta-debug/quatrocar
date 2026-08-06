import { NextRequest, NextResponse } from "next/server";
import { upgradeUserByEmail } from "@/lib/webhook-helpers";

/**
 * Webhook (Postback) da Hotmart.
 * Configure em: Hotmart > Ferramentas > Webhook, apontando para
 * https://SEU-DOMINIO/api/webhooks/hotmart
 *
 * A Hotmart envia o token de validação no header "X-Hotmart-Hottok".
 * Copie o Hottok mostrado na tela de configuração do webhook e salve em
 * HOTMART_WEBHOOK_SECRET (variável de ambiente).
 *
 * IMPORTANTE: os nomes exatos dos campos abaixo (event, buyer.email) foram
 * escritos com base na documentação pública da Hotmart, mas devem ser
 * conferidos contra um payload real assim que o primeiro teste de venda
 * for feito — plataformas mudam o formato do payload com o tempo.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.HOTMART_WEBHOOK_SECRET;
  const hottok = request.headers.get("x-hotmart-hottok");

  if (!secret || hottok !== secret) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }

  const body = await request.json();
  const event = body?.event as string | undefined;
  const email = body?.data?.buyer?.email as string | undefined;

  if (!email) {
    return NextResponse.json({ error: "E-mail do comprador não encontrado" }, { status: 400 });
  }

  if (event === "PURCHASE_APPROVED" || event === "PURCHASE_COMPLETE") {
    const result = await upgradeUserByEmail(email, "premium");
    return NextResponse.json({ ok: true, upgraded: result.found });
  }

  if (event === "PURCHASE_CANCELED" || event === "PURCHASE_REFUNDED" || event === "PURCHASE_CHARGEBACK") {
    const result = await upgradeUserByEmail(email, "free");
    return NextResponse.json({ ok: true, downgraded: result.found });
  }

  return NextResponse.json({ ok: true, ignored: event });
}
