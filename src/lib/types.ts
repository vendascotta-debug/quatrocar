export type Vehicle = {
  id: string;
  user_id: string;
  marca: string;
  modelo: string;
  versao: string | null;
  ano_fabricacao: number | null;
  ano_modelo: number | null;
  motor: string | null;
  potencia: string | null;
  cambio: string | null;
  combustivel: string | null;
  cor: string | null;
  placa: string | null;
  renavam: string | null;
  chassi: string | null;
  km_atual: number;
  data_compra: string | null;
  valor_compra: number | null;
  categoria: string | null;
  foto_url: string | null;
  foto_painel_url: string | null;
  valor_fipe: number | null;
  valor_fipe_atualizado_em: string | null;
  fipe_marca_codigo: string | null;
  fipe_modelo_codigo: string | null;
  fipe_ano_codigo: string | null;
  fipe_codigo: string | null;
  criado_em: string;
};

export type Profile = {
  id: string;
  nome: string | null;
  telefone: string | null;
  whatsapp: string | null;
  ultimo_resumo_whatsapp_em: string | null;
  plano: "free" | "premium" | "empresas" | "cortesia";
  criado_em: string;
};

export type MaintenanceCategory = {
  id: string;
  grupo: string;
  nome: string;
};

export type MaintenanceRecord = {
  id: string;
  vehicle_id: string;
  data: string;
  km: number;
  categoria_id: string | null;
  subtipo: string | null;
  oficina_id: string | null;
  mecanico: string | null;
  valor_mao_obra: number;
  valor_pecas: number;
  valor_total: number;
  garantia_meses: number | null;
  intervalo_km: number | null;
  intervalo_meses: number | null;
  data_vencimento: string | null;
  whatsapp_avisado_proximo: boolean;
  whatsapp_avisado_atrasado: boolean;
  observacoes: string | null;
  nota_fiscal_url: string | null;
  ordem_servico_url: string | null;
  criado_em: string;
  maintenance_categories?: MaintenanceCategory | null;
};

export type FuelRecord = {
  id: string;
  vehicle_id: string;
  data: string;
  posto: string | null;
  combustivel: string;
  preco_litro: number;
  litros: number;
  valor: number;
  km: number;
  forma_pagamento: string | null;
  cidade: string | null;
  criado_em: string;
};
