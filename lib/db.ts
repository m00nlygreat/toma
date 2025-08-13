import { Pool } from 'pg';

let pool: Pool | undefined;
if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
}

export default pool;
