-- Guarda um upgrade de plano "esperando" quando o webhook da Kiwify recebe
-- uma venda aprovada de um e-mail que ainda não tem conta no QuatroCar
-- (fluxo: cliente paga primeiro, cria a conta depois). Aplicado no momento
-- do cadastro (email/senha ou Google).
create table if not exists public.pending_kiwify_upgrades (
  email text primary key,
  plano text not null,
  kiwify_sale_id text,
  criado_em timestamptz not null default now()
);

alter table public.pending_kiwify_upgrades enable row level security;
-- Sem policies: só o service role (usado nos webhooks e no cadastro) acessa esta tabela.
