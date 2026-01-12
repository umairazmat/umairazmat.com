import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// In-memory storage (replace with database in production)
let comments: any[] = []

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const commentId = id

    // In production, use a database
    // For now, this is a placeholder
    // You would update the comment's likes count in the database

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error liking comment:', error)
    return NextResponse.json(
      { error: 'Failed to like comment' },
      { status: 500 }
    )
  }
}
