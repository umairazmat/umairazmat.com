import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabaseServer'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const supabase = await createServerSupabaseClient()
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '5')
    const featured = searchParams.get('featured') === 'true'

    let query = supabase
      .from('blogs')
      .select(`
        *,
        categories (id, name, slug),
        blog_tags (
          tags (id, name, slug)
        )
      `)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (featured) {
      query = query.eq('featured', true)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching blogs:', error)
      return NextResponse.json(
        { error: 'Failed to fetch blogs' },
        { status: 500 }
      )
    }

    return NextResponse.json({ blogs: data || [] })
  } catch (error) {
    console.error('Error in /api/blog/latest:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
