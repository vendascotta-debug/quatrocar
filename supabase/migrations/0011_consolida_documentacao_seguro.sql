-- Consolida definitivamente as categorias nos dois grupos corretos,
-- não importa o estado atual (idempotente, seguro para rodar de novo).
update public.maintenance_categories set grupo = 'Documentação e Obrigações' where grupo = 'Documentação';
update public.maintenance_categories set grupo = 'Seguro e Proteção' where grupo = 'Seguro';
update public.maintenance_categories set nome = 'Seguro'
  where grupo = 'Seguro e Proteção' and nome = 'Seguro do veículo';

insert into public.maintenance_categories (grupo, nome) values
  ('Documentação e Obrigações', 'IPVA'),
  ('Documentação e Obrigações', 'Licenciamento'),
  ('Documentação e Obrigações', 'Documento do veículo'),
  ('Documentação e Obrigações', 'Multas'),
  ('Documentação e Obrigações', 'Taxas'),
  ('Documentação e Obrigações', 'Vistoria'),
  ('Documentação e Obrigações', 'Outros'),
  ('Seguro e Proteção', 'Seguro'),
  ('Seguro e Proteção', 'Proteção veicular'),
  ('Seguro e Proteção', 'Rastreador'),
  ('Seguro e Proteção', 'Assistência 24h')
on conflict do nothing;

-- Remove eventuais linhas órfãs deixadas nos grupos antigos, se sobrar alguma.
delete from public.maintenance_categories
where grupo in ('Documentação', 'Seguro')
  and not exists (
    select 1 from public.maintenance_records mr where mr.categoria_id = maintenance_categories.id
  );
