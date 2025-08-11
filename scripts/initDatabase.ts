const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_KEY;

if (!url) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!serviceKey) {
  throw new Error('Missing SUPABASE_SERVICE_KEY environment variable');
}

const TABLE_DDLS: Record<string, string> = {
  users: `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY,
      nickname TEXT UNIQUE,
      email TEXT UNIQUE,
      google_id TEXT UNIQUE,
      pomodoro_focus_duration INTEGER,
      pomodoro_break_duration INTEGER,
      pomodoro_long_break_duration INTEGER,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `,
  farms: `
    CREATE TABLE IF NOT EXISTS farms (
      id UUID PRIMARY KEY,
      user_id UUID REFERENCES users(id),
      name TEXT,
      start_date DATE,
      end_date DATE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `,
  teams: `
    CREATE TABLE IF NOT EXISTS teams (
      id UUID PRIMARY KEY,
      name TEXT UNIQUE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `,
  user_teams: `
    CREATE TABLE IF NOT EXISTS user_teams (
      user_id UUID REFERENCES users(id),
      team_id UUID REFERENCES teams(id),
      role TEXT,
      PRIMARY KEY (user_id, team_id)
    );
  `,
  tasks: `
    CREATE TYPE IF NOT EXISTS task_status AS ENUM ('todo','in_progress','done');
    CREATE TABLE IF NOT EXISTS tasks (
      id UUID PRIMARY KEY,
      user_id UUID REFERENCES users(id),
      farm_id UUID REFERENCES farms(id),
      title TEXT,
      description TEXT,
      estimated_pomodoros INTEGER,
      due_date TIMESTAMPTZ,
      task_status task_status,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `,
  pomodoros: `
    CREATE TYPE IF NOT EXISTS pomodoro_status AS ENUM ('in_progress','completed','cancelled');
    CREATE TABLE IF NOT EXISTS pomodoros (
      id UUID PRIMARY KEY,
      task_id UUID REFERENCES tasks(id),
      user_id UUID REFERENCES users(id),
      pomodoro_status pomodoro_status,
      start_time TIMESTAMPTZ,
      end_time TIMESTAMPTZ,
      duration_minutes INTEGER,
      is_long_break BOOLEAN,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `,
  proofs: `
    CREATE TYPE IF NOT EXISTS proof_type AS ENUM ('text','image','link');
    CREATE TABLE IF NOT EXISTS proofs (
      id UUID PRIMARY KEY,
      task_id UUID REFERENCES tasks(id),
      user_id UUID REFERENCES users(id),
      proof_type proof_type,
      content TEXT,
      description TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `,
  praises_supports: `
    CREATE TABLE IF NOT EXISTS praises_supports (
      id UUID PRIMARY KEY,
      task_id UUID REFERENCES tasks(id),
      from_user_id UUID REFERENCES users(id),
      type TEXT,
      content TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `,
};

async function run(query: string) {
  const res = await fetch(`${url}/rest/v1`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }
}

async function initDatabase() {
  for (const [name, ddl] of Object.entries(TABLE_DDLS)) {
    try {
      await run(ddl);
      console.log(`Ensured table ${name}`);
    } catch (err) {
      console.error(`Failed to ensure table ${name}:`, err);
    }
  }
}

initDatabase();
