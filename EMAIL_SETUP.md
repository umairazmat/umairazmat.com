# Email Contact Form Setup Guide

The contact form is now connected to an API route at `/api/contact/route.ts`. To make it fully functional, you need to integrate an email service.

## Recommended Email Services

### Option 1: Resend (Recommended - Easiest)
1. Sign up at https://resend.com
2. Get your API key from the dashboard
3. Install Resend: `npm install resend`
4. Update `app/api/contact/route.ts`:
   - Uncomment the Resend code
   - Add your API key to `.env.local`: `RESEND_API_KEY=your_key_here`
   - Update the `from` email address (must be verified in Resend)

### Option 2: SendGrid
1. Sign up at https://sendgrid.com
2. Get your API key
3. Install: `npm install @sendgrid/mail`
4. Update the API route to use SendGrid

### Option 3: EmailJS (Frontend-only, no backend needed)
1. Sign up at https://www.emailjs.com
2. Set up email service template
3. Update `components/ContactModal.tsx` to use EmailJS client library

### Option 4: Formspree (Easiest - No code changes)
1. Sign up at https://formspree.io
2. Get your form endpoint
3. Update the API route to forward to Formspree endpoint

## Environment Variables

Create a `.env.local` file in the root directory:

```env
RESEND_API_KEY=your_resend_api_key_here
# OR
SENDGRID_API_KEY=your_sendgrid_api_key_here
```

## Testing

After setup, test the contact form to ensure emails are being sent to `umairazmatcareer@gmail.com`.

