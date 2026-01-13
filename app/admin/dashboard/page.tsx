import AdminDashboardClient from './AdminDashboardClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Admin Dashboard | Umair Azmat',
  description: 'Admin dashboard for managing portfolio content',
}

// Auth is handled in layout.tsx
export default function AdminDashboardPage() {
  return <AdminDashboardClient />
}
