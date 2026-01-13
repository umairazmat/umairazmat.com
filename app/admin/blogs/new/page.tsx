import BlogFormClient from '../BlogFormClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Create New Blog | Admin Dashboard',
  description: 'Create a new blog post',
}

export default function NewBlogPage() {
  return <BlogFormClient />
}
