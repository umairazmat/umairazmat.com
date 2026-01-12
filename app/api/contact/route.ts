import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate input
    if (!name || !email || !subject || !message) {
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

    // Check if RESEND_API_KEY is configured
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { 
          error: 'Email service is not configured. Please contact the administrator.',
          details: 'RESEND_API_KEY environment variable is missing'
        },
        { status: 500 }
      )
    }

    // Sanitize input to prevent XSS
    const sanitizeHtml = (str: string) => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
    }

    const resend = new Resend(resendApiKey)
    
    const result = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'umairazmatcareer@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 10px 0;"><strong style="color: #4F46E5;">Name:</strong> ${sanitizeHtml(name)}</p>
            <p style="margin: 10px 0;"><strong style="color: #4F46E5;">Email:</strong> <a href="mailto:${sanitizeHtml(email)}">${sanitizeHtml(email)}</a></p>
            <p style="margin: 10px 0;"><strong style="color: #4F46E5;">Subject:</strong> ${sanitizeHtml(subject)}</p>
          </div>
          <div style="margin-top: 20px;">
            <h3 style="color: #333;">Message:</h3>
            <p style="white-space: pre-wrap; background-color: #fff; padding: 15px; border-left: 4px solid #4F46E5; border-radius: 4px;">
              ${sanitizeHtml(message).replace(/\n/g, '<br>')}
            </p>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            <p>This email was sent from the portfolio contact form at umairazmat.com</p>
            <p>You can reply directly to this email to respond to ${sanitizeHtml(name)}</p>
          </div>
        </div>
      `,
    })

    if (result.error) {
      console.error('Resend API error:', result.error)
      return NextResponse.json(
        { 
          error: 'Failed to send email. Please try again later.',
          details: process.env.NODE_ENV === 'development' ? result.error.message : undefined
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    
    // Provide more specific error messages in development
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const isDevelopment = process.env.NODE_ENV === 'development'
    
    return NextResponse.json(
      { 
        error: 'Failed to send email. Please try again.',
        ...(isDevelopment && { details: errorMessage })
      },
      { status: 500 }
    )
  }
}

