alter table public.profiles
  add column if not exists telefone text,
  add column if not exists whatsapp text;

notify pgrst, 'reload schema';
