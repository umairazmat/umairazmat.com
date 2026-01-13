import { createClient } from '@supabase/supabase-js'

// Support both Supabase naming conventions:
// - NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (older/standard)
// - NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY (newer Supabase format)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = 
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  const missingVars = []
  if (!supabaseUrl) missingVars.push('NEXT_PUBLIC_SUPABASE_URL')
  if (!supabaseAnonKey) {
    missingVars.push('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY')
  }
  
  console.error('❌ Missing Supabase environment variables:', missingVars.join(', '))
  console.error('📝 Please check your .env.local file and ensure:')
  console.error('   1. File is named exactly ".env.local" (not .env or .env.local.txt)')
  console.error('   2. File is in the project root directory')
  console.error('   3. Variables are prefixed with NEXT_PUBLIC_')
  console.error('   4. Dev server has been restarted after adding variables')
  console.error('')
  console.error('Example .env.local:')
  console.error('   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co')
  console.error('   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key')
  console.error('   (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY)')
}

// Client-side Supabase client
// Configured to store session in cookies for server-side access
export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder-key',
  {
    auth: {
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
  }
)

// Server-side Supabase client (uses service role key for admin operations)
export const createServerClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  
  if (!serviceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
  }
  
  if (!url) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
  }
  
  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
