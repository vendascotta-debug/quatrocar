import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { enviarWhatsapp } from "@/lib/whatsapp";
import { computeMaintenanceAlerts } from "@/lib/maintenance-alerts";
import type { Vehicle, MaintenanceRecord } from "@/lib/types";

/**
 * Roda uma vez por dia (ver vercel.json) e avisa por WhatsApp quando uma
 * manutenção, documento ou seguro está perto de vencer ou já venceu.
 * Cada aviso (próximo/atrasado) é enviado só uma vez por registro, controlado
 * pelas colunas whatsapp_avisado_proximo / whatsapp_avisado_atrasado.
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
    return NextResponse.json({ ok: true, avisos: 0 });
  }

  const userIds = Array.from(new Set(vehicles.map((v) => v.user_id)));
  const { data: profiles } = await admin
    .from("profiles")
    .select("id, nome, whatsapp")
    .in("id", userIds);

  const whatsappPorUsuario = new Map(
    (profiles ?? []).filter((p) => p.whatsapp).map((p) => [p.id, { nome: p.nome, whatsapp: p.whatsapp as string }])
  );

  let avisos = 0;
  const erros: string[] = [];

  for (const vehicle of vehicles) {
    const contato = whatsappPorUsuario.get(vehicle.user_id);
    if (!contato) continue;

    const { data: maintenance } = await admin
      .from("maintenance_records")
      .select("*, maintenance_categories(id, grupo, nome)")
      .eq("vehicle_id", vehicle.id)
      .returns<MaintenanceRecord[]>();

    if (!maintenance?.length) continue;

    const alerts = computeMaintenanceAlerts(vehicle, maintenance);

    for (const alert of alerts) {
      if (alert.status === "ok") continue;

      const record = maintenance.find((m) => m.id === alert.recordId);
      if (!record) continue;

      const jaAvisado =
        alert.status === "atrasado" ? record.whatsapp_avisado_atrasado : record.whatsapp_avisado_proximo;
      if (jaAvisado) continue;

      const veiculoNome = `${vehicle.marca} ${vehicle.modelo}`;
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

  return NextResponse.json({ ok: true, avisos, erros: erros.length ? erros : undefined });
}
