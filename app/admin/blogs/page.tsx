import BlogsAdminClient from './BlogsAdminClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Manage Blogs | Admin Dashboard',
  description: 'Manage blog posts',
}

// Auth is handled in admin layout
export default function BlogsAdminPage() {
  return <BlogsAdminClient />
}
