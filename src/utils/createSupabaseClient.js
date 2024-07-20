import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_API_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

// todo: enablle RLS and use secret kfw ey

export const supabase = createClient(supabaseUrl, supabaseKey)