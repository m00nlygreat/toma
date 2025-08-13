import { db } from '@/lib/db';

export async function GET() {
  const result = await db.query('SELECT 1');
  return Response.json(result.rows);
}
