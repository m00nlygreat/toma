import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  if (!pool) {
    console.warn('Database not configured');
    return NextResponse.json([]);
  }
  try {
    const { rows } = await pool.query(
      'SELECT id, title FROM tasks ORDER BY created_at DESC LIMIT 10'
    );
    return NextResponse.json(rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json([]);
  }
}
