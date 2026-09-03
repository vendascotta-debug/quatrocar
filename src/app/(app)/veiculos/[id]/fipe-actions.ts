"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { buscarFipe, type FipeResultado } from "@/lib/fipe";
import type { Vehicle } from "@/lib/types";

export async function consultarFipe(
  vehicleId: string,
  modeloCodigoEscolhido?: string
): Promise<FipeResultado> {
  const supabase = await createClient();

  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", vehicleId)
    .single<Vehicle>();

  if (!vehicle) return { status: "nao_encontrado" };

  const resultado = await buscarFipe({
    marca: vehicle.marca,
    modelo: vehicle.modelo,
    versao: vehicle.versao,
    anoModelo: vehicle.ano_modelo,
    combustivel: vehicle.combustivel,
    modeloCodigoEscolhido,
  });

  if (resultado.status === "ok") {
    await supabase
      .from("vehicles")
      .update({
        valor_fipe: resultado.valor,
        valor_fipe_atualizado_em: new Date().toISOString(),
        fipe_marca_codigo: resultado.marcaCodigo,
        fipe_modelo_codigo: resultado.modeloCodigo,
        fipe_ano_codigo: resultado.anoCodigo,
        fipe_codigo: resultado.fipeCodigo,
      })
      .eq("id", vehicleId);

    revalidatePath(`/veiculos/${vehicleId}`);
  }

  return resultado;
}
