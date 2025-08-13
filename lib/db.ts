import { Pool } from '@neondatabase/serverless';

// Create a connection pool to the Neon database
export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});
