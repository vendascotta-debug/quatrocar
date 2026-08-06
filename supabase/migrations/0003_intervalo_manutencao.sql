alter table public.maintenance_records
  add column if not exists intervalo_km int,
  add column if not exists intervalo_meses int;
