import { createServerSupabaseClient, createAdminSupabaseClient } from './supabaseServer'
import { redirect } from 'next/navigation'

/**
 * Check if user is authenticated as admin
 * Use this in Server Components
 */
export async function requireAuth() {
  try {
    const supabase = await createServerSupabaseClient()
    
    // Try to get user first (reads from cookies/headers)
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    // If no user, redirect to login
    if (!user || userError) {
      console.log('No user found, redirecting to login')
      redirect('/admin/login')
    }

    // Try to get session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    // If we have a user but no session, that's okay - user is authenticated
    // The session might be in the process of being set up
    if (!session && !userError) {
      // User exists, create a minimal session object
      return { 
        session: { 
          user, 
          access_token: '', 
          refresh_token: '',
          expires_at: 0,
          expires_in: 0,
          token_type: 'bearer',
        } as any, 
        supabase 
      }
    }

    if (!session) {
      console.log('No session found, redirecting to login')
      redirect('/admin/login')
    }

    return { session, supabase }
  } catch (error) {
    console.error('Auth error:', error)
    redirect('/admin/login')
  }
}

/**
 * Get current user session (non-blocking)
 * Use this when you want to check auth but not redirect
 */
export async function getSession() {
  const supabase = await createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return { session, supabase }
}

/**
 * Get admin client for server-side operations
 */
export function getAdminClient() {
  return createAdminSupabaseClient()
}
