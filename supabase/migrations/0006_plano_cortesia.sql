alter table public.profiles drop constraint if exists profiles_plano_check;
alter table public.profiles
  add constraint profiles_plano_check check (plano in ('free', 'premium', 'empresas', 'cortesia'));
