import HomePage from '@/components/home-page';
import { createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

export default async function Page() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { error } = await supabase.from('users').select('id').limit(1);

  if (error && error.code === '42P01') {
    redirect('/initialize');
  }

  return <HomePage />;
}
