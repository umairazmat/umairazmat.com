import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const commentId = params.id

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
