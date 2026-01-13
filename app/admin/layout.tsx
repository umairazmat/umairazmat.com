import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import AdminNavbar from '@/components/AdminNavbar'
import { createServerSupabaseClient } from '@/lib/supabaseServer'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get pathname from middleware-set header or from URL
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || ''
  const isLoginPage = pathname === '/admin/login'

  // Skip auth check for login page - just render children
  if (isLoginPage) {
    return <>{children}</>
  }

  // For all other admin pages, check authentication
  try {
    const supabase = await createServerSupabaseClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect('/admin/login')
    }

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <AdminNavbar />
        <main>{children}</main>
      </div>
    )
  } catch (error) {
    redirect('/admin/login')
  }
}
