# Email Contact Form Setup Guide

The contact form is now connected to an API route at `/api/contact/route.ts`. To make it fully functional, you need to integrate an email service.

## Recommended Email Services

### Option 1: Resend (Recommended - Easiest) ✅ Currently Implemented

**Step 1: Sign up for Resend**
1. Go to https://resend.com
2. Sign up for a free account (100 emails/day free tier)
3. Verify your email address

**Step 2: Get Your API Key**
1. After logging in, go to the API Keys section
2. Click "Create API Key"
3. Give it a name (e.g., "Portfolio Contact Form")
4. Copy the API key (you'll only see it once!)

**Step 3: Configure Environment Variables**

**For Local Development:**
Create a `.env.local` file in the root directory:

```env
RESEND_API_KEY=re_your_api_key_here
```

**For Vercel Deployment (Production):**
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Click **Add New**
4. Add:
   - **Key**: `RESEND_API_KEY`
   - **Value**: Your Resend API key (starts with `re_`)
   - **Environment**: Select all (Production, Preview, Development)
5. Click **Save**
6. **Important**: Redeploy your application for the changes to take effect
   - Go to **Deployments** tab
   - Click the three dots (⋯) on the latest deployment
   - Click **Redeploy**

**Step 4: Verify Domain (Optional but Recommended)**
1. In Resend dashboard, go to **Domains**
2. Add your domain (e.g., `umairazmat.com`)
3. Follow DNS verification steps
4. Once verified, update the `from` email in `app/api/contact/route.ts`:
   ```typescript
   from: 'Portfolio Contact <contact@umairazmat.com>',
   ```

**Current Configuration:**
- The code uses `onboarding@resend.dev` as the default sender (works without domain verification)
- Recipient: `umairazmatcareer@gmail.com`
- The API route is already configured and ready to use

## Troubleshooting

### Error: "Failed to send email. Please try again."

**Check 1: API Key is Set**
- Verify `RESEND_API_KEY` is set in Vercel environment variables
- Make sure you redeployed after adding the variable
- Check Vercel logs: Project → Deployments → Click on deployment → View Function Logs

**Check 2: API Key is Valid**
- Go to Resend dashboard → API Keys
- Verify the key is active (not revoked)
- If needed, create a new API key and update it in Vercel

**Check 3: Check Vercel Function Logs**
1. Go to Vercel dashboard → Your Project
2. Click on the latest deployment
3. Go to **Functions** tab
4. Click on `/api/contact`
5. Check the logs for detailed error messages

**Check 4: Test Locally**
1. Create `.env.local` with your API key
2. Run `npm run dev`
3. Test the contact form locally
4. Check the terminal for any errors

### Error: "Email service is not configured"

This means `RESEND_API_KEY` is missing. Follow Step 3 above to add it to Vercel.

### Error: "Invalid API key" or "Unauthorized"

- Your API key might be incorrect
- Create a new API key in Resend
- Update it in Vercel environment variables
- Redeploy the application

## Testing

**Local Testing:**
1. Add `RESEND_API_KEY` to `.env.local`
2. Run `npm run dev`
3. Fill out the contact form
4. Check your email inbox (`umairazmatcareer@gmail.com`)

**Production Testing:**
1. Ensure `RESEND_API_KEY` is set in Vercel
2. Redeploy if you just added it
3. Visit your live site
4. Submit the contact form
5. Check your email inbox

## Alternative Email Services

### Option 2: SendGrid
1. Sign up at https://sendgrid.com
2. Get your API key
3. Install: `npm install @sendgrid/mail`
4. Update `app/api/contact/route.ts` to use SendGrid instead of Resend

### Option 3: EmailJS (Frontend-only)
1. Sign up at https://www.emailjs.com
2. Set up email service template
3. Update `components/ContactModal.tsx` to use EmailJS client library
4. No backend API route needed

### Option 4: Formspree
1. Sign up at https://formspree.io
2. Get your form endpoint
3. Update the API route to forward to Formspree endpoint

## Current Status

✅ Resend package installed (`resend` in package.json)
✅ API route configured (`app/api/contact/route.ts`)
✅ Contact form component ready (`components/ContactModal.tsx`)
⏳ **Action Required**: Add `RESEND_API_KEY` to Vercel environment variables and redeploy

