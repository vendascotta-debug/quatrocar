-- Evita reenviar o "resumo de ontem" por WhatsApp mais de uma vez no mesmo dia
-- (ex: se o cron rodar de novo por engano).
alter table public.profiles
  add column if not exists ultimo_resumo_whatsapp_em date;
