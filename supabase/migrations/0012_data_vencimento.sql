-- Data de vencimento explícita (para multas, vistorias e outros itens com
-- prazo específico, diferente de uma recorrência em meses como IPVA/seguro).
alter table public.maintenance_records
  add column if not exists data_vencimento date;
