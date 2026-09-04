import { NextRequest, NextResponse } from "next/server";
import { upgradeUserByEmail } from "@/lib/webhook-helpers";

/**
 * Webhook da Kiwify.
 * Configure em: Kiwify > Configurações > Webhooks, apontando para
 * https://quatrocar.com.br/api/webhooks/kiwify, com o token definido em
 * KIWIFY_WEBHOOK_SECRET (enviado como query param ?token=... — a Kiwify não
 * envia headers de autenticação customizados nos webhooks).
 *
 * IMPORTANTE: os nomes exatos dos campos abaixo devem ser conferidos contra
 * um payload real assim que a primeira venda de teste acontecer — o código
 * tenta variantes comuns (order_status/webhook_event_type, Customer/customer)
 * para reduzir o risco de quebrar se a Kiwify usar um nome diferente.
 */
type KiwifyPayload = {
  order_id?: string;
  order_status?: string;
  webhook_event_type?: string;
  Customer?: { email?: string };
  customer?: { email?: string };
};

export async function POST(request: NextRequest) {
  const secret = process.env.KIWIFY_WEBHOOK_SECRET;
  const token = request.nextUrl.searchParams.get("token");

  if (!secret || token !== secret) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }

  const body = (await request.json()) as KiwifyPayload;

  const email = body.Customer?.email ?? body.customer?.email;
  const saleId = body.order_id;
  const status = (body.order_status ?? body.webhook_event_type ?? "").toLowerCase();

  if (!email) {
    return NextResponse.json({ error: "E-mail do comprador não encontrado" }, { status: 400 });
  }

  if (status.includes("paid") || status.includes("approved") || status.includes("aprovada")) {
    const result = await upgradeUserByEmail(email, "premium", saleId);
    return NextResponse.json({ ok: true, upgraded: result.found });
  }

  if (
    status.includes("refund") ||
    status.includes("reembol") ||
    status.includes("chargeback") ||
    status.includes("canceled") ||
    status.includes("cancelad")
  ) {
    const result = await upgradeUserByEmail(email, "free");
    return NextResponse.json({ ok: true, downgraded: result.found });
  }

  return NextResponse.json({ ok: true, ignored: status });
}
