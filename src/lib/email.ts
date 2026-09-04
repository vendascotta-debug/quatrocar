import "server-only";
import { Resend } from "resend";

export async function enviarEmailSuporte(assunto: string, corpo: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const destino = process.env.SUPPORT_EMAIL;

  if (!apiKey || !destino) {
    throw new Error("Resend não configurado (RESEND_API_KEY/SUPPORT_EMAIL ausentes).");
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: "QuatroCar <onboarding@resend.dev>",
    to: destino,
    subject: assunto,
    text: corpo,
  });
}
