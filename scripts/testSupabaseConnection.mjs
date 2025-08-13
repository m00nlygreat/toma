import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  try {
    const { error } = await supabase.from('users').select('id').limit(1);
    if (error) {
      console.error('Supabase connection failed:', error.message);
      process.exit(1);
    }
    console.log('Supabase connection succeeded.');
  } catch (err) {
    console.error('Unexpected error when connecting to Supabase:', err);
    process.exit(1);
  }
}

main();
