import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, createAdminSupabaseClient } from '@/lib/supabaseServer'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const appointmentSchema = z.object({
  user_name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  type: z.string().min(1, 'Appointment type is required'),
  datetime: z.string().datetime('Invalid datetime'),
  notes: z.string().optional(),
})

// GET - Fetch appointments (admin only)
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
    const status = searchParams.get('status')

    let query = supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching appointments:', error)
      return NextResponse.json(
        { error: 'Failed to fetch appointments' },
        { status: 500 }
      )
    }

    return NextResponse.json({ appointments: data || [] })
  } catch (error) {
    console.error('Error in GET /api/appointments:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new appointment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = appointmentSchema.parse(body)

    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
      .from('appointments')
      .insert({
        user_name: validatedData.user_name,
        email: validatedData.email,
        type: validatedData.type,
        datetime: validatedData.datetime,
        notes: validatedData.notes || null,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating appointment:', error)
      return NextResponse.json(
        { error: 'Failed to create appointment' },
        { status: 500 }
      )
    }

    // TODO: Send email confirmation via Resend

    return NextResponse.json(
      { success: true, appointment: data },
      { status: 201 }
    )
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Error in POST /api/appointments:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH - Update appointment status (admin only)
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID and status are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating appointment:', error)
      return NextResponse.json(
        { error: 'Failed to update appointment' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, appointment: data })
  } catch (error) {
    console.error('Error in PATCH /api/appointments:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
