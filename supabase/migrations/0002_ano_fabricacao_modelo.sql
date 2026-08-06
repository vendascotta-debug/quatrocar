alter table public.vehicles
  add column if not exists ano_fabricacao int,
  add column if not exists ano_modelo int;

update public.vehicles
  set ano_fabricacao = ano,
      ano_modelo = ano
  where ano is not null;

alter table public.vehicles drop column if exists ano;
