'use client'

import { useEffect, useState } from 'react'
import { createBrowserSupabaseClient } from '@/lib/supabaseBrowser'
import { BarChart3, Eye, Users, TrendingUp, Calendar } from 'lucide-react'
import toast from 'react-hot-toast'

interface AnalyticsData {
  totalViews: number
  uniqueVisitors: number
  pageViews: { page: string; count: number }[]
  events: { event: string; count: number }[]
  recentActivity: any[]
}

export default function AnalyticsAdminClient() {
  const supabase = createBrowserSupabaseClient()
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 0,
    uniqueVisitors: 0,
    pageViews: [],
    events: [],
    recentActivity: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d') // 7d, 30d, all

  useEffect(() => {
    loadAnalytics()
  }, [timeRange])

  const loadAnalytics = async () => {
    try {
      setIsLoading(true)

      // Calculate date range
      const now = new Date()
      let startDate = new Date()
      if (timeRange === '7d') {
        startDate.setDate(now.getDate() - 7)
      } else if (timeRange === '30d') {
        startDate.setDate(now.getDate() - 30)
      } else {
        startDate = new Date(0) // All time
      }

      // Get all analytics
      const { data, error } = await supabase
        .from('analytics')
        .select('*')
        .gte('timestamp', startDate.toISOString())
        .order('timestamp', { ascending: false })
        .limit(1000)

      if (error) {
        console.error('Error loading analytics:', error)
        toast.error('Failed to load analytics')
        return
      }

      // Process data
      const totalViews = data?.length || 0
      const uniqueIPs = new Set(data?.map((a) => a.ip_address).filter(Boolean))
      const uniqueVisitors = uniqueIPs.size

      // Page views
      const pageViewMap = new Map<string, number>()
      data?.forEach((item) => {
        const count = pageViewMap.get(item.page) || 0
        pageViewMap.set(item.page, count + 1)
      })
      const pageViews = Array.from(pageViewMap.entries())
        .map(([page, count]) => ({ page, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)

      // Events
      const eventMap = new Map<string, number>()
      data?.forEach((item) => {
        const count = eventMap.get(item.event) || 0
        eventMap.set(item.event, count + 1)
      })
      const events = Array.from(eventMap.entries())
        .map(([event, count]) => ({ event, count }))
        .sort((a, b) => b.count - a.count)

      setAnalytics({
        totalViews,
        uniqueVisitors,
        pageViews,
        events,
        recentActivity: data?.slice(0, 50) || [],
      })
    } catch (error) {
      toast.error('Error loading analytics')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              View site analytics and visitor statistics
            </p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="all">All time</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {isLoading ? '...' : analytics.totalViews.toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <Eye className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Unique Visitors</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {isLoading ? '...' : analytics.uniqueVisitors.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Top Pages</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {isLoading ? '...' : analytics.pageViews.length}
              </p>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Event Types</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {isLoading ? '...' : analytics.events.length}
              </p>
            </div>
            <div className="bg-orange-500 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Page Views */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Top Pages
          </h2>
          <div className="space-y-3">
            {isLoading ? (
              <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            ) : analytics.pageViews.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No page views yet</p>
            ) : (
              analytics.pageViews.map((pv, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <span className="text-sm text-gray-900 dark:text-white truncate flex-1">
                    {pv.page}
                  </span>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-4">
                    {pv.count}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Events
          </h2>
          <div className="space-y-3">
            {isLoading ? (
              <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            ) : analytics.events.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No events yet</p>
            ) : (
              analytics.events.map((ev, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <span className="text-sm text-gray-900 dark:text-white">
                    {ev.event}
                  </span>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {ev.count}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Page
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Event
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-600 dark:text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : analytics.recentActivity.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-600 dark:text-gray-400">
                    No activity yet
                  </td>
                </tr>
              ) : (
                analytics.recentActivity.map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {new Date(activity.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {activity.page}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {activity.event}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      {activity.ip_address || 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
