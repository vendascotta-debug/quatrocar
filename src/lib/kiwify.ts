import "server-only";

let tokenCache: { token: string; expiresAt: number } | null = null;

async function getAccessToken() {
  if (tokenCache && tokenCache.expiresAt > Date.now()) {
    return tokenCache.token;
  }

  const clientId = process.env.KIWIFY_CLIENT_ID;
  const clientSecret = process.env.KIWIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Kiwify não configurada (KIWIFY_CLIENT_ID/KIWIFY_CLIENT_SECRET ausentes).");
  }

  const res = await fetch("https://public-api.kiwify.com/v1/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret }),
  });

  if (!res.ok) {
    throw new Error(`Falha ao autenticar na Kiwify (${res.status}): ${await res.text()}`);
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  tokenCache = { token: data.access_token, expiresAt: Date.now() + (data.expires_in - 60) * 1000 };
  return data.access_token;
}

async function kiwifyFetch(path: string, init?: RequestInit) {
  const accountId = process.env.KIWIFY_ACCOUNT_ID;
  if (!accountId) throw new Error("KIWIFY_ACCOUNT_ID ausente.");

  const token = await getAccessToken();

  const res = await fetch(`https://public-api.kiwify.com/v1${path}`, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${token}`,
      "x-kiwify-account-id": accountId,
      "Content-Type": "application/json",
    },
  });

  return res;
}

export async function reembolsarVenda(saleId: string) {
  const res = await kiwifyFetch(`/sales/${saleId}/refund`, { method: "POST", body: "{}" });

  if (!res.ok) {
    throw new Error(`Falha ao reembolsar (${res.status}): ${await res.text()}`);
  }

  return res.json() as Promise<{ refunded: boolean }>;
}
