import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const commentId = id

    // In production, use a database
    // For now, this is a placeholder

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error disliking comment:', error)
    return NextResponse.json(
      { error: 'Failed to dislike comment' },
      { status: 500 }
    )
  }
}
