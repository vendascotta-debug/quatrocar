delete from public.maintenance_categories a
using public.maintenance_categories b
where a.id > b.id
  and a.grupo = b.grupo
  and a.nome = b.nome;

alter table public.maintenance_categories
  add constraint maintenance_categories_grupo_nome_key unique (grupo, nome);
