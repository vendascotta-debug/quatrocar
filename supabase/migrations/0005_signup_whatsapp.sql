create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, nome, whatsapp)
  values (new.id, new.raw_user_meta_data->>'nome', new.raw_user_meta_data->>'whatsapp');
  return new;
end;
$$ language plpgsql security definer;
