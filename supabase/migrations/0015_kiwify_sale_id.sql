-- Guarda o ID da venda na Kiwify de cada assinante, necessário para poder
-- processar reembolso automático via API sem precisar procurar manualmente.
alter table public.profiles
  add column if not exists kiwify_sale_id text;
