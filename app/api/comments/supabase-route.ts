import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabaseServer'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const commentSchema = z.object({
  blog_id: z.string().uuid('Invalid blog ID'),
  content: z.string().min(1, 'Content is required'),
  parent_id: z.string().uuid().optional().nullable(),
  guest_name: z.string().optional(),
  guest_email: z.string().email().optional(),
})

// GET - Fetch comments for a blog post
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const blogId = searchParams.get('blog_id')

    if (!blogId) {
      return NextResponse.json(
        { error: 'blog_id is required' },
        { status: 400 }
      )
    }

    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('blog_id', blogId)
      .is('parent_id', null) // Only top-level comments
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching comments:', error)
      return NextResponse.json(
        { error: 'Failed to fetch comments' },
        { status: 500 }
      )
    }

    // Fetch replies for each comment
    const commentsWithReplies = await Promise.all(
      (data || []).map(async (comment) => {
        const { data: replies } = await supabase
          .from('comments')
          .select('*')
          .eq('parent_id', comment.id)
          .order('created_at', { ascending: true })

        return {
          ...comment,
          replies: replies || [],
        }
      })
    )

    return NextResponse.json({ comments: commentsWithReplies })
  } catch (error) {
    console.error('Error in GET /api/comments:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create a new comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = commentSchema.parse(body)

    const supabase = await createServerSupabaseClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    const commentData: any = {
      blog_id: validatedData.blog_id,
      content: validatedData.content,
      parent_id: validatedData.parent_id || null,
    }

    // If user is logged in, use user_id; otherwise use guest fields
    if (session?.user) {
      commentData.user_id = session.user.id
    } else {
      if (!validatedData.guest_name || !validatedData.guest_email) {
        return NextResponse.json(
          { error: 'Guest name and email are required for guest comments' },
          { status: 400 }
        )
      }
      commentData.guest_name = validatedData.guest_name
      commentData.guest_email = validatedData.guest_email
    }

    const { data, error } = await supabase
      .from('comments')
      .insert(commentData)
      .select()
      .single()

    if (error) {
      console.error('Error creating comment:', error)
      return NextResponse.json(
        { error: 'Failed to create comment' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, comment: data },
      { status: 201 }
    )
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Error in POST /api/comments:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
