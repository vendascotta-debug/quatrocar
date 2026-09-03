-- Controla se já avisamos por WhatsApp sobre um vencimento, pra não
-- mandar a mesma mensagem todo dia.
alter table public.maintenance_records
  add column if not exists whatsapp_avisado_proximo boolean not null default false,
  add column if not exists whatsapp_avisado_atrasado boolean not null default false;
