import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kmdtswcayohamrxbgptf.supabase.co';

export async function initDatabase(supabaseServiceKey: string) {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const statements = [
    `CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY,
      nickname TEXT UNIQUE,
      email TEXT UNIQUE,
      google_id TEXT UNIQUE,
      pomodoro_focus_duration INTEGER,
      pomodoro_break_duration INTEGER,
      pomodoro_long_break_duration INTEGER,
      created_at TIMESTAMP,
      updated_at TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS farms (
      id UUID PRIMARY KEY,
      user_id UUID REFERENCES users(id),
      name TEXT,
      start_date DATE,
      end_date DATE,
      created_at TIMESTAMP,
      updated_at TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS teams (
      id UUID PRIMARY KEY,
      name TEXT UNIQUE,
      created_at TIMESTAMP,
      updated_at TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS user_teams (
      user_id UUID REFERENCES users(id),
      team_id UUID REFERENCES teams(id),
      role TEXT,
      PRIMARY KEY (user_id, team_id)
    );`,
    `CREATE TABLE IF NOT EXISTS tasks (
      id UUID PRIMARY KEY,
      user_id UUID REFERENCES users(id),
      farm_id UUID REFERENCES farms(id),
      title TEXT,
      description TEXT,
      estimated_pomodoros INTEGER,
      due_date TIMESTAMP,
      task_status TEXT,
      created_at TIMESTAMP,
      updated_at TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS pomodoros (
      id UUID PRIMARY KEY,
      task_id UUID REFERENCES tasks(id),
      user_id UUID REFERENCES users(id),
      pomodoro_status TEXT,
      start_time TIMESTAMP,
      end_time TIMESTAMP,
      duration_minutes INTEGER,
      is_long_break BOOLEAN,
      created_at TIMESTAMP,
      updated_at TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS proofs (
      id UUID PRIMARY KEY,
      task_id UUID REFERENCES tasks(id),
      user_id UUID REFERENCES users(id),
      proof_type TEXT,
      content TEXT,
      description TEXT,
      created_at TIMESTAMP,
      updated_at TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS praises_supports (
      id UUID PRIMARY KEY,
      task_id UUID REFERENCES tasks(id),
      from_user_id UUID REFERENCES users(id),
      type TEXT,
      content TEXT,
      created_at TIMESTAMP
    );`
  ];

  for (const statement of statements) {
    const { error } = await supabase.query(statement);
    if (error) {
      console.error('Error executing statement:', error);
      throw error;
    }
  }
}

if (require.main === module) {
  const serviceKey =
    process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    console.error('Missing SUPABASE_SERVICE_KEY environment variable');
    process.exit(1);
  }
  initDatabase(serviceKey)
    .then(() => {
      console.log('Database tables initialized');
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
