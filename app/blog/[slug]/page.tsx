import { Metadata } from 'next'
import BlogPostClient from './BlogPostClient'
import { createServerSupabaseClient } from '@/lib/supabaseServer'

export const dynamic = 'force-dynamic'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: post } = await supabase
      .from('blogs')
      .select('title, excerpt, created_at')
      .eq('slug', params.slug)
      .single()

    if (!post) {
      return {
        title: 'Post Not Found',
      }
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://umairazmat.com'
    const postUrl = `${siteUrl}/blog/${params.slug}`

    return {
      title: post.title,
      description: post.excerpt || '',
      openGraph: {
        title: post.title,
        description: post.excerpt || '',
        type: 'article',
        publishedTime: post.created_at,
        url: postUrl,
        siteName: 'Umair Azmat Portfolio',
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt || '',
      },
      alternates: {
        canonical: postUrl,
      },
    }
  } catch (error) {
    return {
      title: 'Blog Post',
    }
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return <BlogPostClient slug={params.slug} />
}

