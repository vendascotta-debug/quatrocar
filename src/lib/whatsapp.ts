function normalizarNumero(numero: string) {
  const digitos = numero.replace(/\D/g, "");
  if (digitos.startsWith("55")) return digitos;
  return `55${digitos}`;
}

export async function enviarWhatsapp(numero: string, mensagem: string) {
  const baseUrl = process.env.EVOLUTION_API_URL;
  const apiKey = process.env.EVOLUTION_API_KEY;
  const instancia = process.env.EVOLUTION_INSTANCE;

  if (!baseUrl || !apiKey || !instancia) {
    throw new Error("Evolution API não configurada (EVOLUTION_API_URL/KEY/INSTANCE ausentes).");
  }

  const res = await fetch(`${baseUrl}/message/sendText/${instancia}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: apiKey,
    },
    body: JSON.stringify({
      number: normalizarNumero(numero),
      text: mensagem,
    }),
  });

  if (!res.ok) {
    const detalhe = await res.text().catch(() => "");
    throw new Error(`Falha ao enviar WhatsApp (${res.status}): ${detalhe}`);
  }

  return res.json();
}
