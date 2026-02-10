import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabaseServer'

export const dynamic = 'force-dynamic'

// POST - Track analytics events
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, page, ip_address, browser_info, user_agent } = body

    // Validate request
    if (!event || !page) {
      return NextResponse.json(
        { error: 'Event and page are required' },
        { status: 400 }
      )
    }

    const supabase = await createServerSupabaseClient()

    // Get client IP from headers (never trust client-supplied IP)
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const clientIp = forwarded?.split(',')[0] || realIp || 'unknown'

    const { error } = await supabase.from('analytics').insert({
      event,
      page,
      ip_address: clientIp,
      browser_info: browser_info || null,
      user_agent: user_agent || request.headers.get('user-agent') || null,
      timestamp: new Date().toISOString(),
    })

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error tracking analytics:', error)
      }
      // Don't fail the request - analytics should be silent
      return NextResponse.json({ success: false }, { status: 200 })
    }

    return NextResponse.json(
      { success: true, message: 'Analytics event tracked' },
      { status: 200 }
    )
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Analytics error:', error)
    }
    // Don't fail the request - analytics should be silent
    return NextResponse.json({ success: false }, { status: 200 })
  }
}

// GET - Fetch analytics (admin only)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    const limit = parseInt(searchParams.get('limit') || '100')

    let query = supabase
      .from('analytics')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit)

    if (page) {
      query = query.eq('page', page)
    }

    const { data, error } = await query

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching analytics:', error)
      }
      return NextResponse.json(
        { error: 'Failed to fetch analytics' },
        { status: 500 }
      )
    }

    return NextResponse.json({ analytics: data || [] })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error in GET /api/analytics:', error)
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

