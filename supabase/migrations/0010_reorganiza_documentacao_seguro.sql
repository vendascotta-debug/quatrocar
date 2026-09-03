-- Reorganiza as categorias de documentação/seguro criadas em 0009 nos dois
-- grupos definitivos, sem apagar linhas (evita quebrar registros já criados).
update public.maintenance_categories
  set grupo = 'Documentação e Obrigações'
  where grupo = 'Documentação';

update public.maintenance_categories
  set grupo = 'Seguro e Proteção', nome = 'Seguro'
  where grupo = 'Seguro' and nome = 'Seguro do veículo';

insert into public.maintenance_categories (grupo, nome) values
  ('Documentação e Obrigações', 'Documento do veículo'),
  ('Documentação e Obrigações', 'Taxas'),
  ('Documentação e Obrigações', 'Vistoria'),
  ('Documentação e Obrigações', 'Outros'),
  ('Seguro e Proteção', 'Proteção veicular'),
  ('Seguro e Proteção', 'Rastreador'),
  ('Seguro e Proteção', 'Assistência 24h')
on conflict do nothing;
