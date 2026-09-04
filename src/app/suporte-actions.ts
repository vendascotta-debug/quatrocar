"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { reembolsarVenda } from "@/lib/kiwify";
import { enviarEmailSuporte } from "@/lib/email";

export type SuporteResultado = { ok: boolean; mensagem: string };

async function buscarPerfilPorEmail(email: string) {
  const admin = createAdminClient();
  const { data } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const user = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
  if (!user) return null;

  const { data: profile } = await admin
    .from("profiles")
    .select("id, plano, kiwify_sale_id")
    .eq("id", user.id)
    .single();

  return profile ? { userId: user.id, ...profile } : null;
}

export async function solicitarReembolso(email: string): Promise<SuporteResultado> {
  const perfil = await buscarPerfilPorEmail(email);

  if (!perfil) {
    return { ok: false, mensagem: "Não encontramos uma conta QuatroCar com esse e-mail." };
  }

  if (perfil.plano === "free") {
    return { ok: false, mensagem: "Não encontramos nenhuma compra aprovada pra esse e-mail." };
  }

  if (!perfil.kiwify_sale_id) {
    await enviarEmailSuporte(
      "QuatroCar — Pedido de reembolso (sem ID de venda salvo)",
      `E-mail do cliente: ${email}\nPlano atual: ${perfil.plano}\n\nNão encontramos o ID da venda na Kiwify pra esse usuário (provavelmente comprou antes do webhook automático existir). Processe o reembolso manualmente no painel da Kiwify.`
    );
    return {
      ok: true,
      mensagem: "Recebemos seu pedido. Como sua compra é de antes da nossa automação, vamos processar manualmente e te retornamos em breve.",
    };
  }

  try {
    const admin = createAdminClient();
    await reembolsarVenda(perfil.kiwify_sale_id);
    await admin.from("profiles").update({ plano: "free" }).eq("id", perfil.userId);
    return { ok: true, mensagem: "Reembolso processado com sucesso! O valor deve cair na sua forma de pagamento original em alguns dias úteis." };
  } catch (err) {
    await enviarEmailSuporte(
      "QuatroCar — Falha ao processar reembolso automático",
      `E-mail do cliente: ${email}\nID da venda: ${perfil.kiwify_sale_id}\nErro: ${err instanceof Error ? err.message : String(err)}\n\nPor favor processe manualmente no painel da Kiwify.`
    );
    return {
      ok: false,
      mensagem: "Não conseguimos processar o reembolso automaticamente agora. Já avisamos nosso time pra resolver manualmente.",
    };
  }
}

const ASSUNTOS: Record<string, string> = {
  problema: "QuatroCar — Problema reportado",
  duvida: "QuatroCar — Dúvida do cliente",
  suporte: "QuatroCar — Falar com suporte",
};

export async function encaminharSuporte(
  tipo: "problema" | "duvida" | "suporte",
  email: string,
  mensagem: string
): Promise<SuporteResultado> {
  try {
    await enviarEmailSuporte(
      ASSUNTOS[tipo] ?? "QuatroCar — Contato do cliente",
      `E-mail do cliente: ${email || "(não informado)"}\n\nMensagem:\n${mensagem}`
    );
    return {
      ok: true,
      mensagem: "Recebemos sua mensagem! Nosso time vai te responder por e-mail em breve.",
    };
  } catch {
    return { ok: false, mensagem: "Não conseguimos enviar sua mensagem agora. Tenta de novo em alguns minutos." };
  }
}
