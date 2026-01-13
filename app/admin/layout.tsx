import { redirect } from 'next/navigation'
import AdminNavbar from '@/components/AdminNavbar'
import { createServerSupabaseClient } from '@/lib/supabaseServer'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check auth for all admin pages
  // Login page will be handled by middleware
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
