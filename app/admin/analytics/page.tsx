import AnalyticsAdminClient from './AnalyticsAdminClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Analytics | Admin Dashboard',
  description: 'View site analytics and statistics',
}

// Auth is handled in admin layout
export default function AnalyticsAdminPage() {
  return <AnalyticsAdminClient />
}
