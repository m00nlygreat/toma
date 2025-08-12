create or replace function public.pg_exec(query text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  execute query;
end;
$$;

grant execute on function public.pg_exec(text) to authenticated, service_role, anon;
