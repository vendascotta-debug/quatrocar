-- Permite marcar um registro de manutenção/documento como pago/resolvido,
-- com a data em que o pagamento foi feito. Sem isso, o status "Atrasado"
-- era calculado só por data/km e nunca podia ser encerrado manualmente.
alter table public.maintenance_records
  add column if not exists pago boolean not null default false,
  add column if not exists data_pagamento date;
