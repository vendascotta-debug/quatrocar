-- Novas categorias de despesa: documentação e seguro do veículo
insert into public.maintenance_categories (grupo, nome) values
  ('Documentação', 'IPVA'),
  ('Documentação', 'Licenciamento'),
  ('Documentação', 'Multas'),
  ('Seguro', 'Seguro do veículo')
on conflict do nothing;

-- Valor de tabela Fipe do veículo (consultado automaticamente via API)
alter table public.vehicles
  add column if not exists valor_fipe numeric(12,2),
  add column if not exists valor_fipe_atualizado_em timestamptz,
  add column if not exists fipe_marca_codigo text,
  add column if not exists fipe_modelo_codigo text,
  add column if not exists fipe_ano_codigo text,
  add column if not exists fipe_codigo text;
