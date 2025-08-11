import { supabaseAdmin } from '@/lib/supabase-admin';
import { Button } from '@/components/ui/button';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';

async function ensureSchema() {
  try {
    const query =
      "select table_name from information_schema.tables where table_schema = 'public' limit 1";
    const { data, error } = await supabaseAdmin.rpc('exec_sql', { query });
    if (error) {
      return { success: false, message: error.message };
    }

    const tables = (data as { table_name: string }[]) ?? [];
    if (tables.length === 0) {
      const sqlPath = path.join(process.cwd(), 'docs', 'database.sql');
      const sql = await fs.readFile(sqlPath, 'utf8');
      const { error: execError } = await supabaseAdmin.rpc('exec_sql', {
        query: sql,
      });
      if (execError) {
        return { success: false, message: execError.message };
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
    const { error } = await supabaseAdmin.rpc('exec_sql', { query: sql });
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

