import { supabase } from "@/lib/supabase";

export default async function InitializePage() {
  const sql = "";

  const { error } = await supabase.rpc('exec_sql', { query: sql });
  if (error) {
    console.error('Initialization error:', error);
    return <div>Initialization failed: {error.message}</div>;
  }
  return <div>Database initialized</div>;
}
