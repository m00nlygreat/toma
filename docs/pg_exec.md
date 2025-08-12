# `pg_exec` helper function

This SQL function allows executing arbitrary SQL statements via the Supabase RPC interface.

```sql
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
```

Call it from `supabase-js`:

```ts
await supabase.rpc('pg_exec', { query: 'select 1;' });
```

> ⚠️ Executing arbitrary SQL is dangerous. Restrict access to trusted roles only.
