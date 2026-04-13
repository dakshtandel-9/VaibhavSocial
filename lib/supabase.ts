import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Server-only client with service role — never import this in 'use client' files
export const supabase = createClient(url, key);
