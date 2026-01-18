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

    // Input length validation
    if (name.length > 100) {
      return NextResponse.json(
        { error: 'Name must be less than 100 characters' },
        { status: 400 }
      )
    }
    if (email.length > 254) {
      return NextResponse.json(
        { error: 'Email must be less than 254 characters' },
        { status: 400 }
      )
    }
    if (subject.length > 200) {
      return NextResponse.json(
        { error: 'Subject must be less than 200 characters' },
        { status: 400 }
      )
    }
    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Message must be less than 5000 characters' },
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
      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.error('RESEND_API_KEY is not configured')
      }
      return NextResponse.json(
        { 
          error: 'Email service is not configured. Please contact the administrator.'
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
    
    const contactEmail = process.env.CONTACT_EMAIL || 'umairazmatcareer@gmail.com'
    
    const result = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: contactEmail,
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
      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Resend API error:', result.error)
      }
      return NextResponse.json(
        { 
          error: 'Failed to send email. Please try again later.'
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error sending email:', error)
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to send email. Please try again.'
      },
      { status: 500 }
    )
  }
}

