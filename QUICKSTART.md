# Quick Start Guide

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Initial Setup

### 1. Update Personal Information

Edit `constants/index.ts` and update:
- Your name, email, location
- Social media links
- Experience entries
- Projects
- Skills
- Metrics

### 2. Add Your Resume

1. Place your resume PDF in `public/resume/`
2. Name it `umair-azmat-resume.pdf` (or update the path in `constants/index.ts`)

### 3. Configure Contact Form

The contact form currently logs to console. To integrate with a service:

**Option A: EmailJS (Recommended for quick setup)**
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service and template
3. Add your service ID to an API route

**Option B: API Route**
Create `app/api/contact/route.ts`:
```typescript
export async function POST(request: Request) {
  const data = await request.json()
  // Send email using Nodemailer, SendGrid, etc.
  return Response.json({ success: true })
}
```

### 4. Update Calendly Link

In `constants/index.ts`, update `calendlyUrl` with your actual Calendly link.

### 5. Add Blog Posts

Create `.mdx` or `.md` files in `content/blog/` with frontmatter:

```mdx
---
title: Your Post Title
date: 2024-01-15
excerpt: Your excerpt here
tags: [Next.js, Web Development]
author: Umair Azmat
---

Your content here...
```

## Customization

### Colors

Edit `tailwind.config.ts` to change the primary color scheme.

### Sections

All sections are in `components/sections/`. Modify as needed.

### SEO

Update metadata in:
- `app/layout.tsx` - Global SEO
- `app/blog/[slug]/page.tsx` - Blog post SEO
- `app/sitemap.ts` - Sitemap URLs

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms

```bash
npm run build
npm start
```

## Troubleshooting

### TypeScript Errors

If you see TypeScript errors about missing modules:
1. Make sure you've run `npm install`
2. Restart your TypeScript server in your IDE

### Blog Posts Not Showing

1. Make sure files are in `content/blog/` directory
2. Check that files have proper frontmatter
3. Restart the dev server

### Chatbot Not Working

The chatbot uses Web Speech API which requires:
- HTTPS (in production)
- Chrome/Edge browser (best support)
- Microphone permissions

## Next Steps

- [ ] Update all personal information
- [ ] Add your resume PDF
- [ ] Configure contact form
- [ ] Add blog posts
- [ ] Customize colors/styling
- [ ] Deploy to production

## Support

For issues or questions, check the main README.md or open an issue on GitHub.

