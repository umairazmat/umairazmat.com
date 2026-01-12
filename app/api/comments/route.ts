import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for comments (replace with database in production)
// This is a simple implementation for Phase 02
let comments: any[] = []

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const postSlug = searchParams.get('postSlug')

    if (!postSlug) {
      return NextResponse.json(
        { error: 'postSlug is required' },
        { status: 400 }
      )
    }

    // Filter comments by postSlug and only return approved ones
    const postComments = comments
      .filter((c) => c.postSlug === postSlug && c.isApproved !== false)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({ comments: postComments })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { postSlug, author, email, content, parentId } = body

    // Validate input
    if (!postSlug || !author || !email || !content) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Sanitize content
    const sanitizeHtml = (str: string) => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
    }

    const newComment = {
      id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      postSlug,
      author: sanitizeHtml(author),
      email: sanitizeHtml(email),
      content: sanitizeHtml(content),
      parentId: parentId || null,
      likes: 0,
      dislikes: 0,
      createdAt: new Date().toISOString(),
      isApproved: false, // Comments require moderation
    }

    comments.push(newComment)

    // In production, send email notification to admin
    // await sendEmailNotification(newComment)

    return NextResponse.json(
      { success: true, comment: newComment },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}
