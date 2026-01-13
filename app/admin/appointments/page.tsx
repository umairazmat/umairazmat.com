import AppointmentsAdminClient from './AppointmentsAdminClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Manage Appointments | Admin Dashboard',
  description: 'Manage appointment bookings',
}

// Auth is handled in admin layout
export default function AppointmentsAdminPage() {
  return <AppointmentsAdminClient />
}
