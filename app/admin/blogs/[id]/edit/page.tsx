import BlogFormClient from '../../BlogFormClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Edit Blog | Admin Dashboard',
  description: 'Edit blog post',
}

interface EditBlogPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params
  return <BlogFormClient blogId={id} />
}
