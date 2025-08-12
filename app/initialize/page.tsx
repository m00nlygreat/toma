import { createClient } from '@supabase/supabase-js';

export default async function Initialize() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, serviceKey);

  const sql = `
    create type if not exists task_status as enum ('pending','in_progress','completed');
    create type if not exists pomodoro_status as enum ('focus','break','long_break');
    create type if not exists proof_type as enum ('image','text','link');

    create table if not exists users (
      id uuid primary key,
      nickname text unique,
      email text unique,
      google_id text unique,
      pomodoro_focus_duration integer,
      pomodoro_break_duration integer,
      pomodoro_long_break_duration integer,
      created_at timestamp,
      updated_at timestamp
    );

    create table if not exists farms (
      id uuid primary key,
      user_id uuid references users(id),
      name text,
      start_date date,
      end_date date,
      created_at timestamp,
      updated_at timestamp
    );

    create table if not exists teams (
      id uuid primary key,
      name text unique,
      created_at timestamp,
      updated_at timestamp
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
      task_status task_status,
      created_at timestamp,
      updated_at timestamp
    );

    create table if not exists pomodoros (
      id uuid primary key,
      task_id uuid references tasks(id),
      user_id uuid references users(id),
      pomodoro_status pomodoro_status,
      start_time timestamp,
      end_time timestamp,
      duration_minutes integer,
      is_long_break boolean,
      created_at timestamp,
      updated_at timestamp
    );

    create table if not exists proofs (
      id uuid primary key,
      task_id uuid references tasks(id),
      user_id uuid references users(id),
      proof_type proof_type,
      content text,
      description text,
      created_at timestamp,
      updated_at timestamp
    );

    create table if not exists praises_supports (
      id uuid primary key,
      task_id uuid references tasks(id),
      from_user_id uuid references users(id),
      type text,
      content text,
      created_at timestamp
    );
  `;

  await supabase.rpc('pg_exec', { query: sql });

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-headline font-bold">Database initialized</h1>
    </main>
  );
}
