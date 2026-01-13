import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * Server-side Supabase client
 * For full cookie support, install @supabase/ssr package
 */
export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  // Support both Supabase naming conventions
  const supabaseAnonKey = 
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
