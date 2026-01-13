'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabaseBrowser'
import { LogOut, BarChart3, FileText, Calendar, Users, Mail, Eye } from 'lucide-react'
import toast from 'react-hot-toast'

interface DashboardStats {
  totalVisits: number
  totalAppointments: number
  pendingAppointments: number
  totalBlogs: number
  totalComments: number
  totalLeads: number
}

export default function AdminDashboardClient() {
  const router = useRouter()
  const supabase = createBrowserSupabaseClient()
  const [stats, setStats] = useState<DashboardStats>({
    totalVisits: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    totalBlogs: 0,
    totalComments: 0,
    totalLeads: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
    loadStats()
  }, [])

  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      router.push('/admin/login')
    }
  }

  const loadStats = async () => {
    try {
      setIsLoading(true)

      // Load all stats from Supabase in parallel
      const [
        analyticsResult,
        appointmentsResult,
        blogsResult,
        commentsResult,
        leadsResult,
      ] = await Promise.all([
        supabase.from('analytics').select('id', { count: 'exact', head: true }),
        supabase.from('appointments').select('*'),
        supabase.from('blogs').select('id', { count: 'exact', head: true }),
        supabase.from('comments').select('id', { count: 'exact', head: true }),
        supabase.from('leads').select('*', { count: 'exact' }),
      ])

      const totalVisits = analyticsResult.count || 0
      const appointments = appointmentsResult.data || []
      const totalAppointments = appointments.length
      const pendingAppointments = appointments.filter(
        (apt) => apt.status === 'pending'
      ).length
      const totalBlogs = blogsResult.count || 0
      const totalComments = commentsResult.count || 0
      
      // Handle leads - check both count and data
      let totalLeads = 0
      if (leadsResult.error) {
        console.error('Error loading leads in dashboard:', leadsResult.error)
      } else {
        totalLeads = leadsResult.count ?? leadsResult.data?.length ?? 0
        if (leadsResult.data && leadsResult.data.length > 0) {
          console.log('Dashboard: Loaded', leadsResult.data.length, 'leads')
        }
      }

      setStats({
        totalVisits,
        totalAppointments,
        pendingAppointments,
        totalBlogs,
        totalComments,
        totalLeads,
      })
    } catch (error) {
      console.error('Error loading stats:', error)
      toast.error('Failed to load dashboard stats')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error('Failed to logout')
    } else {
      localStorage.removeItem('admin_session')
      router.push('/admin/login')
      toast.success('Logged out successfully')
    }
  }

  const statCards = [
    {
      title: 'Total Visits',
      value: stats.totalVisits,
      icon: Eye,
      color: 'bg-blue-500',
    },
    {
      title: 'Appointments',
      value: stats.totalAppointments,
      icon: Calendar,
      color: 'bg-green-500',
      subtitle: `${stats.pendingAppointments} pending`,
    },
    {
      title: 'Blog Posts',
      value: stats.totalBlogs,
      icon: FileText,
      color: 'bg-purple-500',
    },
    {
      title: 'Comments',
      value: stats.totalComments,
      icon: Users,
      color: 'bg-orange-500',
    },
    {
      title: 'Newsletter Leads',
      value: stats.totalLeads,
      icon: Mail,
      color: 'bg-pink-500',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your portfolio content and analytics
        </p>
      </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {isLoading ? '...' : stat.value}
                    </p>
                    {stat.subtitle && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {stat.subtitle}
                      </p>
                    )}
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/admin/blogs')}
                className="w-full flex items-center gap-3 px-4 py-3 bg-sky-50 dark:bg-sky-900/20 hover:bg-sky-100 dark:hover:bg-sky-900/30 rounded-lg transition-colors text-left"
              >
                <FileText className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                <span className="text-gray-900 dark:text-white">Manage Blogs</span>
              </button>
              <button
                onClick={() => router.push('/admin/appointments')}
                className="w-full flex items-center gap-3 px-4 py-3 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors text-left"
              >
                <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-gray-900 dark:text-white">Manage Appointments</span>
              </button>
              <button
                onClick={() => router.push('/admin/analytics')}
                className="w-full flex items-center gap-3 px-4 py-3 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors text-left"
              >
                <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <span className="text-gray-900 dark:text-white">View Analytics</span>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Activity feed will appear here once data is available.
            </p>
          </div>
        </div>
    </div>
  )
}
