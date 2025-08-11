import { Button } from '@/components/ui/button';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';

async function runSql(query: string) {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/pg`;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  const json = await res.json().catch(() => ({}));
  const data = json.result ?? json;
  if (!res.ok || json.error) {
    return { data: null, error: json.error || res.statusText };
  }
  return { data, error: null };
}

async function ensureSchema() {
  try {
    const check =
      "select table_name from information_schema.tables where table_schema = 'public' limit 1";
    const { data, error } = await runSql(check);
    if (error) {
      return { success: false, message: String(error) };
    }

    const tables = (data as { table_name: string }[]) ?? [];
    if (tables.length === 0) {
      const sqlPath = path.join(process.cwd(), 'docs', 'database.sql');
      const sql = await fs.readFile(sqlPath, 'utf8');
      const { error: execError } = await runSql(sql);
      if (execError) {
        return { success: false, message: String(execError) };
      }
      return { success: true, message: 'Database initialized successfully.' };
    }

    return { success: true, message: 'Database already initialized.' };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
}

async function resetDatabase() {
  'use server';
  try {
    const sqlPath = path.join(process.cwd(), 'docs', 'database.sql');
    const sql = await fs.readFile(sqlPath, 'utf8');
    const { error } = await runSql(sql);
    if (error) {
      redirect('/initialize?reset=error');
    }
    revalidatePath('/initialize');
    redirect('/initialize?reset=success');
  } catch {
    redirect('/initialize?reset=error');
  }
}

type InitializePageProps = {
  searchParams?: Promise<{ reset?: string }>;
};

export default async function InitializePage({ searchParams }: InitializePageProps) {
  const params = (await searchParams) ?? {};
  const result = await ensureSchema();

  return (
    <div className="space-y-4 p-4">
      <p className={result.success ? 'text-green-600' : 'text-red-600'}>{result.message}</p>
      {params.reset === 'success' && (
        <p className="text-green-600">Database reset successfully.</p>
      )}
      {params.reset === 'error' && (
        <p className="text-red-600">Failed to reset database.</p>
      )}
      <form action={resetDatabase}>
        <Button type="submit" variant="destructive">
          Reset Database
        </Button>
      </form>
    </div>
  );
}

