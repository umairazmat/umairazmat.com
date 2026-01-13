'use client'

import { useEffect, useState } from 'react'
import { createBrowserSupabaseClient } from '@/lib/supabaseBrowser'
import { Calendar, Check, X, Clock, Search, Filter } from 'lucide-react'
import toast from 'react-hot-toast'

interface Appointment {
  id: string
  user_name: string
  email: string
  type: string
  datetime: string
  status: 'pending' | 'approved' | 'completed' | 'cancelled'
  notes?: string
  created_at: string
}

export default function AppointmentsAdminClient() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadAppointments()
  }, [filterStatus])

  const loadAppointments = async () => {
    try {
      setIsLoading(true)
      const supabase = createBrowserSupabaseClient()
      
      let query = supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false })

      if (filterStatus !== 'all') {
        query = query.eq('status', filterStatus)
      }

      const { data, error } = await query

      if (error) {
        toast.error('Failed to load appointments')
        console.error(error)
      } else {
        setAppointments(data || [])
      }
    } catch (error) {
      toast.error('Error loading appointments')
    } finally {
      setIsLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const supabase = createBrowserSupabaseClient()
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id)

      if (error) {
        toast.error('Failed to update appointment')
        console.error(error)
      } else {
        toast.success('Appointment updated')
        loadAppointments()
      }
    } catch (error) {
      toast.error('Error updating appointment')
    }
  }

  const filteredAppointments = appointments.filter((apt) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    const matchesSearch = 
      apt.user_name.toLowerCase().includes(query) ||
      apt.email.toLowerCase().includes(query) ||
      apt.type.toLowerCase().includes(query) ||
      apt.status.toLowerCase().includes(query) ||
      (apt.notes && apt.notes.toLowerCase().includes(query)) ||
      apt.id.toLowerCase().includes(query)
    return matchesSearch
  })

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    approved: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Manage Appointments
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage all appointment bookings
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, type, status, notes, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-gray-600 dark:text-gray-400">
              Loading appointments...
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="p-8 text-center text-gray-600 dark:text-gray-400">
              No appointments found
            </div>
          ) : (
            <div className="space-y-4 p-6">
              {filteredAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-8 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {apt.user_name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {apt.email}
                          </p>
                        </div>
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${statusColors[apt.status]}`}
                        >
                          {apt.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wide mb-1">
                            Appointment Type
                          </p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                            {apt.type}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wide mb-1">
                            Scheduled Date & Time
                          </p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {new Date(apt.datetime).toLocaleString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wide mb-1">
                            Created At
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(apt.created_at).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wide mb-1">
                            ID
                          </p>
                          <p className="text-xs font-mono text-gray-500 dark:text-gray-500">
                            {apt.id.substring(0, 8)}...
                          </p>
                        </div>
                      </div>

                      {apt.notes && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                          <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wide mb-2">
                            Notes
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                            {apt.notes}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Right Column - Actions */}
                    <div className="lg:col-span-4 flex flex-col justify-between">
                      <div className="flex flex-col gap-2">
                        {apt.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateStatus(apt.id, 'approved')}
                              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
                            >
                              <Check className="h-4 w-4" />
                              Approve
                            </button>
                            <button
                              onClick={() => updateStatus(apt.id, 'cancelled')}
                              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
                            >
                              <X className="h-4 w-4" />
                              Cancel
                            </button>
                          </>
                        )}
                        {apt.status === 'approved' && (
                          <button
                            onClick={() => updateStatus(apt.id, 'completed')}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                          >
                            <Check className="h-4 w-4" />
                            Mark Complete
                          </button>
                        )}
                        {(apt.status === 'completed' || apt.status === 'cancelled') && (
                          <p className="text-xs text-gray-500 dark:text-gray-500 text-center py-2">
                            No actions available
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
    </div>
  )
}
