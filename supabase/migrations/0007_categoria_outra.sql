insert into public.maintenance_categories (grupo, nome)
values ('Outros', 'Outra peça / serviço (descrever abaixo)')
on conflict do nothing;
