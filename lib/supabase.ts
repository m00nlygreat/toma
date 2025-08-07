
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kmdtswcayohamrxbgptf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttZHRzd2NheW9oYW1yeGJncHRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNzQ5OTAsImV4cCI6MjA2OTk1MDk5MH0.Gtkq8_bpDOiUeXDQPdkrxtLR2FNtrZlmoTka1x_9KaA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
