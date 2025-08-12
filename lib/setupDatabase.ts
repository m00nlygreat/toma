import 'server-only';
import { supabaseAdmin } from './supabaseAdmin';

/**
 * Initializes database tables defined in docs/database.md.
 * Uses the service role client to run CREATE TABLE statements.
 */
export async function setupDatabase() {
  const createTablesSql = `
    create table if not exists users (
      id uuid primary key,
      nickname text unique,
      email text unique,
      google_id text unique,
      pomodoro_focus_duration integer,
      pomodoro_break_duration integer,
      pomodoro_long_break_duration integer,
      created_at timestamp default now(),
      updated_at timestamp default now()
    );

    create table if not exists farms (
      id uuid primary key,
      user_id uuid references users(id),
      name text,
      start_date date,
      end_date date,
      created_at timestamp default now(),
      updated_at timestamp default now()
    );

    create table if not exists teams (
      id uuid primary key,
      name text unique,
      created_at timestamp default now(),
      updated_at timestamp default now()
    );

    create table if not exists user_teams (
      user_id uuid references users(id),
      team_id uuid references teams(id),
      role text,
      primary key (user_id, team_id)
    );

    create table if not exists tasks (
      id uuid primary key,
      user_id uuid references users(id),
      farm_id uuid references farms(id),
      title text,
      description text,
      estimated_pomodoros integer,
      due_date timestamp,
      task_status text,
      created_at timestamp default now(),
      updated_at timestamp default now()
    );

    create table if not exists pomodoros (
      id uuid primary key,
      task_id uuid references tasks(id),
      user_id uuid references users(id),
      pomodoro_status text,
      start_time timestamp,
      end_time timestamp,
      duration_minutes integer,
      is_long_break boolean,
      created_at timestamp default now(),
      updated_at timestamp default now()
    );

    create table if not exists proofs (
      id uuid primary key,
      task_id uuid references tasks(id),
      user_id uuid references users(id),
      proof_type text,
      content text,
      description text,
      created_at timestamp default now(),
      updated_at timestamp default now()
    );

    create table if not exists praises_supports (
      id uuid primary key,
      task_id uuid references tasks(id),
      from_user_id uuid references users(id),
      type text,
      content text,
      created_at timestamp default now()
    );
  `;

  try {
    // Attempt to run SQL using the service-role client. Depending on your Supabase setup,
    // you may need to create a Postgres function that executes raw SQL.
    const { error } = await supabaseAdmin.rpc('exec_sql', { sql: createTablesSql });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}
