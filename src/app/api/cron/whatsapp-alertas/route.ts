import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { enviarWhatsapp } from "@/lib/whatsapp";
import { computeMaintenanceAlerts } from "@/lib/maintenance-alerts";
import type { Vehicle, MaintenanceRecord, FuelRecord } from "@/lib/types";

function currency(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function dataDeOntem() {
  const d = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10);
}

/**
 * Roda uma vez por dia (ver vercel.json) e avisa por WhatsApp:
 * 1) quando uma manutenção, documento ou seguro está perto de vencer ou já
 *    venceu (uma única vez por registro, via whatsapp_avisado_proximo/atrasado);
 * 2) um resumo do que foi registrado no dia anterior (abastecimentos e
 *    manutenções), pra reforçar o hábito de uso.
 */
export async function GET(request: NextRequest) {
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const admin = createAdminClient();

  const { data: vehicles } = await admin
    .from("vehicles")
    .select("*")
    .returns<Vehicle[]>();

  if (!vehicles?.length) {
    return NextResponse.json({ ok: true, avisos: 0, resumos: 0 });
  }

  const userIds = Array.from(new Set(vehicles.map((v) => v.user_id)));
  const { data: profiles } = await admin
    .from("profiles")
    .select("id, nome, whatsapp")
    .in("id", userIds);

  const whatsappPorUsuario = new Map(
    (profiles ?? []).filter((p) => p.whatsapp).map((p) => [p.id, { nome: p.nome, whatsapp: p.whatsapp as string }])
  );

  const ontem = dataDeOntem();
  const ontemFormatado = new Date(`${ontem}T12:00:00`).toLocaleDateString("pt-BR");
  const resumoPorUsuario = new Map<string, string[]>();

  let avisos = 0;
  const erros: string[] = [];

  for (const vehicle of vehicles) {
    const contato = whatsappPorUsuario.get(vehicle.user_id);
    if (!contato) continue;

    const [{ data: maintenance }, { data: fuel }] = await Promise.all([
      admin
        .from("maintenance_records")
        .select("*, maintenance_categories(id, grupo, nome)")
        .eq("vehicle_id", vehicle.id)
        .returns<MaintenanceRecord[]>(),
      admin
        .from("fuel_records")
        .select("*")
        .eq("vehicle_id", vehicle.id)
        .eq("data", ontem)
        .returns<FuelRecord[]>(),
    ]);

    const veiculoNome = `${vehicle.marca} ${vehicle.modelo}`;
    const linhas = resumoPorUsuario.get(vehicle.user_id) ?? [];

    for (const f of fuel ?? []) {
      linhas.push(
        `⛽ Abastecimento de ${f.combustivel} — ${currency(Number(f.valor))} (${f.litros}L) no ${veiculoNome}${
          f.posto ? `, no ${f.posto}` : ""
        }`
      );
    }

    for (const m of (maintenance ?? []).filter((m) => m.data === ontem)) {
      linhas.push(
        `🔧 ${m.maintenance_categories?.nome || m.subtipo || "Manutenção"} — ${currency(
          Number(m.valor_total)
        )} no ${veiculoNome}`
      );
    }

    if (linhas.length > 0) resumoPorUsuario.set(vehicle.user_id, linhas);

    if (!maintenance?.length) continue;

    const alerts = computeMaintenanceAlerts(vehicle, maintenance);

    for (const alert of alerts) {
      if (alert.status === "ok") continue;

      const record = maintenance.find((m) => m.id === alert.recordId);
      if (!record) continue;

      const jaAvisado =
        alert.status === "atrasado" ? record.whatsapp_avisado_atrasado : record.whatsapp_avisado_proximo;
      if (jaAvisado) continue;

      const mensagem =
        alert.status === "atrasado"
          ? `🔴 *${alert.nome}* do seu ${veiculoNome} já venceu! Regularize assim que possível.\n\nVeja os detalhes no QuatroCar: https://quatrocar.com.br/veiculos/${vehicle.id}/manutencao/${record.id}`
          : `🟡 *${alert.nome}* do seu ${veiculoNome} está vencendo${
              alert.proximaData ? ` em ${new Date(alert.proximaData).toLocaleDateString("pt-BR")}` : ""
            }${alert.proximoKm ? ` (aos ${alert.proximoKm.toLocaleString("pt-BR")} km)` : ""}. Já está quase na hora!\n\nVeja os detalhes no QuatroCar: https://quatrocar.com.br/veiculos/${vehicle.id}/manutencao/${record.id}`;

      try {
        await enviarWhatsapp(contato.whatsapp, mensagem);
        avisos += 1;

        await admin
          .from("maintenance_records")
          .update(
            alert.status === "atrasado"
              ? { whatsapp_avisado_atrasado: true }
              : { whatsapp_avisado_proximo: true }
          )
          .eq("id", record.id);
      } catch (err) {
        erros.push(`${vehicle.id}/${record.id}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  }

  let resumos = 0;

  for (const [userId, linhas] of resumoPorUsuario) {
    const contato = whatsappPorUsuario.get(userId);
    if (!contato || linhas.length === 0) continue;

    const mensagem = `📋 *Resumo de ontem (${ontemFormatado})*\n\n${linhas.join("\n")}`;

    try {
      await enviarWhatsapp(contato.whatsapp, mensagem);
      resumos += 1;
    } catch (err) {
      erros.push(`resumo/${userId}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  return NextResponse.json({ ok: true, avisos, resumos, erros: erros.length ? erros : undefined });
}
