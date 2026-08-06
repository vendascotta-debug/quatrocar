-- AutoVault — Fase 1 (MVP) schema
-- Executar no SQL Editor do Supabase (ou via supabase db push)

create extension if not exists "pgcrypto";

-- Perfil do usuário (espelha auth.users, guarda plano/preferências)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text,
  plano text not null default 'free' check (plano in ('free', 'premium', 'empresas')),
  criado_em timestamptz not null default now()
);

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  marca text not null,
  modelo text not null,
  versao text,
  ano_fabricacao int,
  ano_modelo int,
  motor text,
  potencia text,
  cambio text,
  combustivel text,
  cor text,
  placa text,
  renavam text,
  chassi text,
  km_atual int not null default 0,
  data_compra date,
  valor_compra numeric(12,2),
  categoria text,
  foto_url text,
  foto_painel_url text,
  criado_em timestamptz not null default now()
);

create table if not exists public.vehicle_specs (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade unique,
  tipo_oleo text,
  capacidade_oleo_litros numeric(4,1),
  filtro_oleo text,
  filtro_ar text,
  filtro_cabine text,
  velas text,
  pastilhas_dianteiras text,
  pastilhas_traseiras text,
  discos text,
  bateria text,
  pressao_pneu_dianteiro text,
  pressao_pneu_traseiro text,
  torque_rodas text,
  capacidade_tanque_litros numeric(5,1),
  consumo_medio_kml numeric(4,1),
  fluido_freio text,
  intervalo_revisao_km int,
  intervalo_revisao_meses int
);

create table if not exists public.maintenance_categories (
  id uuid primary key default gen_random_uuid(),
  grupo text not null,
  nome text not null
);

create table if not exists public.workshops (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  nome text not null,
  telefone text,
  whatsapp text,
  endereco text,
  cidade text,
  responsavel text,
  especialidade text,
  avaliacao numeric(2,1)
);

create table if not exists public.maintenance_records (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  data date not null default current_date,
  km int not null,
  categoria_id uuid references public.maintenance_categories(id),
  subtipo text,
  oficina_id uuid references public.workshops(id),
  mecanico text,
  valor_mao_obra numeric(10,2) default 0,
  valor_pecas numeric(10,2) default 0,
  valor_total numeric(10,2) generated always as (coalesce(valor_mao_obra,0) + coalesce(valor_pecas,0)) stored,
  garantia_meses int,
  observacoes text,
  nota_fiscal_url text,
  ordem_servico_url text,
  criado_em timestamptz not null default now()
);

create table if not exists public.fuel_records (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  data date not null default current_date,
  posto text,
  combustivel text not null,
  preco_litro numeric(6,3) not null,
  litros numeric(6,2) not null,
  valor numeric(10,2) generated always as (preco_litro * litros) stored,
  km int not null,
  forma_pagamento text,
  cidade text,
  criado_em timestamptz not null default now()
);

create index if not exists idx_vehicles_user on public.vehicles(user_id);
create index if not exists idx_maintenance_vehicle_data on public.maintenance_records(vehicle_id, data);
create index if not exists idx_fuel_vehicle_data on public.fuel_records(vehicle_id, data);

-- Row Level Security: cada usuário só acessa seus próprios dados
alter table public.profiles enable row level security;
alter table public.vehicles enable row level security;
alter table public.vehicle_specs enable row level security;
alter table public.workshops enable row level security;
alter table public.maintenance_records enable row level security;
alter table public.fuel_records enable row level security;

create policy "profiles: owner read/write" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "vehicles: owner read/write" on public.vehicles
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "vehicle_specs: owner via vehicle" on public.vehicle_specs
  for all using (exists (select 1 from public.vehicles v where v.id = vehicle_id and v.user_id = auth.uid()))
  with check (exists (select 1 from public.vehicles v where v.id = vehicle_id and v.user_id = auth.uid()));

create policy "workshops: owner read/write" on public.workshops
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "maintenance: owner via vehicle" on public.maintenance_records
  for all using (exists (select 1 from public.vehicles v where v.id = vehicle_id and v.user_id = auth.uid()))
  with check (exists (select 1 from public.vehicles v where v.id = vehicle_id and v.user_id = auth.uid()));

create policy "fuel: owner via vehicle" on public.fuel_records
  for all using (exists (select 1 from public.vehicles v where v.id = vehicle_id and v.user_id = auth.uid()))
  with check (exists (select 1 from public.vehicles v where v.id = vehicle_id and v.user_id = auth.uid()));

-- Categorias padrão de manutenção
insert into public.maintenance_categories (grupo, nome) values
  ('Motor', 'Troca de óleo'),
  ('Motor', 'Filtro de óleo'),
  ('Motor', 'Filtro de ar'),
  ('Motor', 'Filtro de combustível'),
  ('Motor', 'Velas'),
  ('Motor', 'Correias'),
  ('Freios', 'Pastilhas'),
  ('Freios', 'Discos'),
  ('Freios', 'Fluido de freio'),
  ('Suspensão', 'Amortecedores'),
  ('Suspensão', 'Molas'),
  ('Transmissão', 'Óleo do câmbio'),
  ('Transmissão', 'Embreagem'),
  ('Elétrica', 'Bateria'),
  ('Pneus', 'Rodízio'),
  ('Pneus', 'Alinhamento'),
  ('Pneus', 'Balanceamento'),
  ('Ar-condicionado', 'Higienização'),
  ('Ar-condicionado', 'Recarga de gás'),
  ('Estética', 'Lavagem')
on conflict do nothing;

-- Cria profile automaticamente ao criar usuário
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, nome) values (new.id, new.raw_user_meta_data->>'nome');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
