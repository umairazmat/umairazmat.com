import LeadsAdminClient from './LeadsAdminClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Newsletter Leads | Admin Dashboard',
  description: 'Manage newsletter subscribers and leads',
}

// Auth is handled in admin layout
export default function LeadsAdminPage() {
  return <LeadsAdminClient />
}
