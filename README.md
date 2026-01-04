# Umair Azmat - Professional Portfolio Website

A modern, SEO-friendly personal portfolio website built with Next.js 14+ (App Router), TypeScript, and Tailwind CSS.

## Features

### Phase 1 (MVP) - Implemented ✅

- ✅ **Next.js 14+ Migration** - App Router with TypeScript
- ✅ **SEO Optimization** - Metadata, sitemap, robots.txt
- ✅ **Remote Job Availability Widget** - Shows availability, timezone, preferred stack
- ✅ **Interactive Experience Timeline** - Clickable, filterable, with metrics
- ✅ **Enhanced Metrics Display** - Students trained, projects delivered, GitHub stats
- ✅ **Contact Modal** - Professional contact form with validation
- ✅ **Resume Download** - Easy access to resume
- ✅ **Chatbot** - AI assistant with RAG (Retrieval Augmented Generation) for portfolio data
- ✅ **Blog Setup** - MDX support for blog posts
- ✅ **Single Page Portfolio** - All sections in one page

### Sections

1. **Hero Section** - Introduction with quick stats and availability widget
2. **About** - Personal summary and highlights
3. **Experience** - Interactive timeline with filtering and detailed metrics
4. **Projects** - Featured projects with filtering by category
5. **Skills** - Technical skills organized by category
6. **Contact** - Contact information and modal form
7. **Blog** - MDX-based blog system

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Blog**: MDX with next-mdx-remote

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/umairazmat/umairazmat.com.git
cd umairazmat.com
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── blog/          # Blog pages
│   ├── globals.css    # Global styles
│   ├── layout.tsx     # Root layout
│   ├── page.tsx       # Home page
│   ├── robots.ts      # Robots.txt
│   └── sitemap.ts     # Sitemap
├── components/
│   ├── sections/      # Page sections
│   ├── Chatbot.tsx    # AI chatbot
│   ├── ContactModal.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
├── constants/
│   └── index.ts       # Portfolio data
├── content/
│   └── blog/          # Blog posts (MDX)
└── lib/
    └── blog.ts        # Blog utilities
```

## Customization

### Update Personal Information

Edit `constants/index.ts` to update:
- Personal info (name, email, location)
- Experience entries
- Projects
- Skills
- Social links

### Add Blog Posts

Create MDX files in `content/blog/` with frontmatter:

```mdx
---
title: Your Post Title
date: 2024-01-01
excerpt: Post excerpt
tags: [tag1, tag2]
author: Umair Azmat
---

Your content here...
```

### Resume

Place your resume PDF at `public/resume/umair-azmat-resume.pdf` and update the path in `constants/index.ts`.

### Contact Form Integration

The contact form currently logs to console. To integrate with a service:

1. **EmailJS**: Add EmailJS service ID
2. **Formspree**: Add Formspree endpoint
3. **API Route**: Create `/app/api/contact/route.ts`

Example API route:
```typescript
export async function POST(request: Request) {
  const data = await request.json()
  // Send email or save to database
  return Response.json({ success: true })
}
```

### Chatbot Enhancement

The chatbot currently uses simple keyword matching. To enhance with GPT:

1. Add OpenAI API key to `.env.local`
2. Update `components/Chatbot.tsx` to call OpenAI API
3. Consider using vector embeddings for better RAG

## SEO Configuration

Update SEO metadata in:
- `app/layout.tsx` - Global metadata
- `app/blog/[slug]/page.tsx` - Blog post metadata
- `app/sitemap.ts` - Sitemap URLs
- `app/robots.ts` - Robots.txt rules

## Deployment

This project is configured for deployment on both **Vercel** and **Netlify**. Configuration files are included for both platforms.

### Vercel (Recommended)

Vercel is the recommended platform as it's built by the Next.js team and offers the best integration.

**Quick Deploy:**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project" and import your repository
4. Vercel will auto-detect Next.js settings from `vercel.json`
5. Click "Deploy" - that's it!

**Manual Deploy:**
```bash
npm install -g vercel
vercel
```

**Configuration:**
- `vercel.json` is already configured
- Build command: `npm run build`
- Framework: Next.js (auto-detected)
- Regions: US East (iad1)

### Netlify

Netlify also provides excellent Next.js support with their plugin.

**Quick Deploy:**
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign in
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Netlify will auto-detect settings from `netlify.toml`
6. Click "Deploy site"

**Manual Deploy:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**Configuration:**
- `netlify.toml` is already configured
- Build command: `npm run build`
- Publish directory: `.next`
- Uses `@netlify/plugin-nextjs` for optimal Next.js support
- Node version: 18

**Important for Netlify:**
Make sure to install the Netlify Next.js plugin:
```bash
npm install @netlify/plugin-nextjs --save-dev
```

### Environment Variables

For both platforms, add environment variables in their respective dashboards:

**Vercel:**
- Settings → Environment Variables

**Netlify:**
- Site settings → Build & deploy → Environment variables

**Common Variables:**
- `NEXT_PUBLIC_SITE_URL` - Your site URL (e.g., `https://umairazmat.com`)
- `OPENAI_API_KEY` - For enhanced chatbot (optional)

### Build Verification

Test the build locally before deploying:
```bash
npm run build
npm start
```

Visit `http://localhost:3000` to verify everything works.

## Environment Variables

Create `.env.local` for:
- `NEXT_PUBLIC_SITE_URL` - Your site URL
- `OPENAI_API_KEY` - For enhanced chatbot (optional)

## License

MIT License - see LICENSE file for details.

## Contact

- Website: [umairazmat.com](https://umairazmat.com)
- Email: umair@umairazmat.com

