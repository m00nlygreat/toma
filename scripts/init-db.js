const { Pool } = require('pg');

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        nickname TEXT UNIQUE,
        email TEXT UNIQUE
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES users(id),
        title TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      INSERT INTO users (id, nickname, email)
      VALUES ('00000000-0000-0000-0000-000000000001', 'tester', 'tester@example.com')
      ON CONFLICT (id) DO NOTHING;
    `);

    await client.query(`
      INSERT INTO tasks (id, user_id, title)
      VALUES ('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000001', 'Test task')
      ON CONFLICT (id) DO NOTHING;
    `);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
