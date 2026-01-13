// Auth is handled in parent admin layout
// This layout is just for dashboard-specific needs
export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
