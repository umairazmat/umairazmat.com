# Umair Azmat - Professional Portfolio Website

A modern, SEO-friendly, multi-language personal portfolio website built with Next.js 14+ (App Router), TypeScript, and Tailwind CSS. Features full internationalization (i18n) support with 5 languages, RTL support for Arabic, responsive design, and comprehensive SEO optimization.

## 🆕 Version 2.0 - Latest Updates (2024)

### 🎉 Major New Features
- ✅ **Admin Dashboard System** - Complete admin panel with Supabase authentication
  - Blog management (create, edit, delete, featured posts)
  - Appointment management with search and filtering
  - Newsletter leads management
  - Site analytics dashboard
- ✅ **Custom Appointment System** - Replaced Calendly with custom booking system
  - Public appointment booking at `/appointments`
  - Admin dashboard for managing appointments
  - Full appointment details and status management
- ✅ **Featured Blogs on Homepage** - Display 3 latest featured blog posts
  - Matches homepage UI/UX with animated backgrounds
  - Responsive grid layout
  - Auto-hides if no featured blogs exist
- ✅ **Newsletter with Interests** - Enhanced newsletter form in footer
  - Email subscription with optional interest selection
  - Dropdown selector for compact design
  - Saves to Supabase leads table

### Previous Updates (v1.0)
- ✅ **Full Internationalization** - Added Italian language support, completing 5-language coverage
- ✅ **Complete Translation Coverage** - All homepage sections, navbar, footer, contact modal, and blog pages fully translated
- ✅ **RTL Layout Fixes** - Fixed Arabic RTL layout issues in navbar and components
- ✅ **Responsive Navigation** - Improved mobile/tablet navigation with hamburger menu below 786px
- ✅ **Hero Section Enhancements** - Updated buttons (View My Work, Contact Me), improved scroll behavior, styled resume download button
- ✅ **Contact Form Integration** - Full Resend API integration with auto-close, click-outside, and Escape key support
- ✅ **SEO Optimization** - Enhanced sitemap, robots.txt, structured data, and comprehensive meta tags
- ✅ **API Routes** - Fixed Next.js 14 compatibility for dynamic routes (async params)
- ✅ **Build Optimization** - All build errors resolved, production-ready

### UI/UX Improvements
- Language and theme switchers always visible in header (mobile/tablet)
- Responsive logo display (Umair on mobile/tablet/laptop, Umair Azmat on desktop)
- Resume download button in Hero section and mobile menu
- Improved contact modal z-index and toast notifications
- Better RTL-aware spacing and alignment

## 🌟 Features

### Core Features ✅

- ✅ **Next.js 14+ App Router** - Modern React framework with TypeScript
- ✅ **Multi-Language Support (i18n)** - 5 languages: English (US/GB), Arabic, German, Italian
- ✅ **RTL Support** - Full right-to-left layout support for Arabic
- ✅ **SEO Optimization** - Comprehensive metadata, sitemap, robots.txt, structured data (JSON-LD)
- ✅ **Responsive Design** - Mobile-first design optimized for all screen sizes
- ✅ **Dark/Light Theme** - System preference detection with manual toggle
- ✅ **Contact Form** - Professional contact modal with Resend email integration
- ✅ **Resume Download** - Easy access to resume PDF
- ✅ **Blog System** - Full-featured blog with Supabase backend
  - Create, edit, delete blog posts
  - Categories and tags
  - Featured posts
  - Comments system
  - Search and filtering
- ✅ **Admin Dashboard** - Complete admin panel for content management
- ✅ **Appointment System** - Custom appointment booking system
- ✅ **Newsletter System** - Lead capture with interest tracking
- ✅ **Interactive Sections** - Animated sections with Framer Motion
- ✅ **Analytics Ready** - Built-in analytics tracking system
- ✅ **Accessibility** - WCAG compliant with skip-to-content, ARIA labels

### Homepage Sections

1. **Hero Section** - Introduction with quick stats, CTA buttons (View My Work, Contact Me, Download Resume)
2. **About Me** - Personal summary and professional highlights
3. **Instant Proof** - Value proposition and proof points
4. **Skills & Tech Stack** - Technical expertise organized by category (Frontend, Backend, Cloud, AI)
5. **Featured Projects** - Showcase of key projects with filtering
6. **Experiences** - Interactive timeline with detailed work history
7. **How I Work** - Work methodology and process
8. **Who I Work With** - Ideal clients and collaboration approach
9. **Testimonials** - Client feedback and references
10. **FAQ** - Frequently asked questions
11. **Let's Build** - Final CTA section

### Additional Pages

- **Blog** - Full-featured blog with Supabase backend, categories, tags, comments
- **Projects** - Detailed project showcase
- **Skills** - Comprehensive skills breakdown
- **Experience** - Work experience timeline
- **Education** - Educational background
- **Certifications** - Professional certifications
- **Learning** - Continuous learning resources
- **Appointments** - Custom appointment booking system

### Admin Pages (Protected)

- **Admin Dashboard** - Overview with statistics (`/admin/dashboard`)
- **Blog Management** - Create, edit, delete blog posts (`/admin/blogs`)
- **Appointment Management** - View and manage appointments (`/admin/appointments`)
- **Leads Management** - View newsletter subscribers (`/admin/leads`)
- **Analytics** - Site analytics and statistics (`/admin/analytics`)

## 🌍 Internationalization (i18n)

The website supports 5 languages with full translation coverage:

- **English (US)** - `en-US` (default)
- **English (GB)** - `en-GB`
- **Arabic** - `ar` (with RTL support)
- **German** - `de`
- **Italian** - `it`

### Translation Coverage

- ✅ All homepage sections
- ✅ Navigation bar and dropdowns
- ✅ Footer
- ✅ Contact modal
- ✅ Blog pages
- ✅ All static pages
- ✅ Error pages

### RTL Support

Full right-to-left (RTL) layout support for Arabic:
- Automatic text direction switching
- RTL-aware spacing and alignment
- Proper flex direction handling
- Navbar and component RTL optimization

## 🛠️ Tech Stack

### Core
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

### Internationalization
- **i18n**: react-i18next, i18next-browser-languagedetector
- **Language Detection**: Automatic browser language detection with localStorage persistence

### Blog
- **MDX**: next-mdx-remote
- **Content**: Gray Matter for frontmatter parsing

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime (if needed)

### Email & Communication
- **Email Service**: Resend API
- **Notifications**: React Hot Toast

### SEO & Analytics
- **Structured Data**: JSON-LD schema
- **Sitemap**: Dynamic sitemap generation
- **Robots**: Configurable robots.txt
- **Metadata**: Comprehensive Open Graph and Twitter Card support

## 📁 Project Structure

```
├── app/
│   ├── api/                    # API routes
│   │   ├── analytics/          # Analytics tracking
│   │   ├── blog/               # Blog API
│   │   ├── comments/           # Comment system (like, dislike, report)
│   │   └── contact/            # Contact form handler
│   ├── blog/                   # Blog pages
│   ├── [pages]/                # Static pages (projects, skills, etc.)
│   ├── globals.css             # Global styles with RTL support
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Homepage
│   ├── robots.ts               # Robots.txt generator
│   └── sitemap.ts              # Sitemap generator
├── components/
│   ├── sections/               # Homepage sections (11 sections)
│   ├── ContactModal.tsx        # Contact form modal
│   ├── Navbar.tsx              # Responsive navigation with i18n
│   ├── Footer.tsx              # Footer with translations
│   ├── LanguageSwitcher.tsx    # Language selection component
│   ├── ThemeToggle.tsx         # Dark/light theme toggle
│   ├── Chatbot.tsx             # AI chatbot component
│   └── [other components]      # Additional UI components
├── constants/
│   └── index.ts                # Portfolio data and configuration
├── content/
│   └── blog/                   # Blog posts (MDX files)
├── i18n/
│   ├── config.ts               # i18n configuration
│   └── locales/                # Translation files
│       ├── en-US.json
│       ├── en-GB.json
│       ├── ar.json
│       ├── de.json
│       └── it.json
├── lib/
│   └── blog.ts                 # Blog utilities
├── providers/
│   └── I18nProvider.tsx        # i18n provider wrapper
└── public/
    ├── resume/                 # Resume PDF
    ├── images/                 # Static images
    ├── manifest.json           # PWA manifest
    └── robots.txt              # Static robots.txt fallback
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Resend API key (for contact form)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/umairazmat/umairazmat.com.git
cd umairazmat.com
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Create a `.env.local` file:
```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
# OR
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_publishable_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email (Optional - for contact form)
RESEND_API_KEY=your_resend_api_key_here

# Google Analytics & Tag Manager (Optional - for tracking)
NEXT_PUBLIC_GTM_ID=GTM-WKFSSMK3
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-J38SWH6FV7

# Site URL (Optional)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## ⚙️ Configuration

### Update Personal Information

Edit `constants/index.ts` to update:
- Personal info (name, email, location, timezone)
- Experience entries
- Projects
- Skills
- Social links
- Resume URL

### Add/Update Translations

Translation files are located in `i18n/locales/`. Each language has a JSON file:
- `en-US.json` - English (US)
- `en-GB.json` - English (GB)
- `ar.json` - Arabic
- `de.json` - German
- `it.json` - Italian

To add a new translation:
1. Add the key to all language files
2. Use `t('key.path')` in components with `useTranslation()` hook

### Add Blog Posts

Create MDX files in `content/blog/` with frontmatter:

```mdx
---
title: Your Post Title
date: 2024-01-01
excerpt: Post excerpt
tags: [tag1, tag2]
author: Umair Azmat
slug: your-post-slug
---

Your content here...
```

### Resume

Place your resume PDF at `public/resume/umair-azmat-resume.pdf` and update the path in `constants/index.ts`.

### Contact Form Setup

The contact form uses Resend API for email delivery:

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add to `.env.local`: `RESEND_API_KEY=your_key`
4. Update email recipient in `app/api/contact/route.ts`

### Theme Customization

Theme colors are configured in `tailwind.config.ts`. The site uses:
- Primary: Sky blue (`sky-500`)
- Dark mode: Gray scale
- Custom RTL classes for Arabic support

## 🔍 SEO Configuration

### Metadata

SEO metadata is configured in:
- `app/layout.tsx` - Global metadata, Open Graph, Twitter Cards
- `app/page.tsx` - Homepage-specific metadata
- `app/blog/[slug]/page.tsx` - Blog post metadata

### Sitemap

Dynamic sitemap generation in `app/sitemap.ts`:
- Includes all main pages
- Blog posts with priorities
- Homepage sections
- Change frequencies

### Robots.txt

Configured in `app/robots.ts`:
- Allow/disallow rules
- Sitemap reference
- User-agent specific rules

### Structured Data

JSON-LD structured data in `components/StructuredData.tsx`:
- Person schema
- Organization schema
- Website schema
- Breadcrumb schema

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

### Mobile Optimizations

- Hamburger menu below 786px
- Language and theme switchers always visible in header
- Optimized touch targets
- Mobile-first navigation
- Responsive logo (Umair / Umair Azmat)

## 🚢 Deployment

### Vercel (Recommended)

**Quick Deploy:**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project" and import repository
4. Add environment variables:
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_SITE_URL`
5. Click "Deploy"

**Manual Deploy:**
```bash
npm install -g vercel
vercel
```

### Netlify

**Quick Deploy:**
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign in
3. Click "Add new site" → "Import an existing project"
4. Connect GitHub repository
5. Add environment variables
6. Click "Deploy site"

**Manual Deploy:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Environment Variables

Required for production:
- `RESEND_API_KEY` - Resend API key for contact form
- `NEXT_PUBLIC_SITE_URL` - Your production site URL (e.g., `https://umairazmat.com`)

Optional:
- `OPENAI_API_KEY` - For enhanced chatbot (if implemented)

### Build Verification

Test the build locally:
```bash
npm run build
npm start
```

Visit `http://localhost:3000` to verify everything works.

## 🧹 Code Quality

### Linting

```bash
npm run lint
```

### Type Checking

TypeScript is configured with strict mode. Check types:
```bash
npx tsc --noEmit
```

### Code Cleanup

The project has been cleaned up:
- ✅ Removed unused components
- ✅ Removed unused pages
- ✅ Removed unused dependencies
- ✅ Optimized imports
- ✅ Removed admin/auth pages

## 📊 API Routes

### Contact Form
- **Route**: `/api/contact`
- **Method**: POST
- **Body**: `{ name, email, message }`
- **Response**: `{ success: boolean }`

### Blog Posts
- **Route**: `/api/blog/posts`
- **Method**: GET
- **Response**: Array of blog posts

### Comments
- **Route**: `/api/comments`
- **Methods**: GET, POST
- **Dynamic Routes**:
  - `/api/comments/[id]/like` - POST
  - `/api/comments/[id]/dislike` - POST
  - `/api/comments/[id]/report` - POST

### Analytics
- **Route**: `/api/analytics`
- **Method**: POST
- **Body**: `{ event, data }`

## 🎨 Customization Guide

### Adding a New Language

1. Create new JSON file in `i18n/locales/` (e.g., `fr.json`)
2. Add translations following the structure of `en-US.json`
3. Update `i18n/config.ts`:
   ```typescript
   import fr from './locales/fr.json'
   // Add to resources
   'fr': { translation: fr },
   // Add to supportedLngs
   supportedLngs: ['en-US', 'en-GB', 'ar', 'de', 'it', 'fr'],
   ```
4. Add language option to `LanguageSwitcher.tsx`

### Adding a New Section

1. Create component in `components/sections/`
2. Add to `app/page.tsx`
3. Add translations to all language files
4. Update sitemap if needed

### Modifying Styles

- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Inline Tailwind classes

## 🐛 Troubleshooting

### Build Errors

If you encounter build errors:
1. Clear `.next` directory: `rm -rf .next`
2. Clear node_modules: `rm -rf node_modules && npm install`
3. Check TypeScript errors: `npx tsc --noEmit`

### Translation Issues

If translations don't appear:
1. Check browser console for missing keys
2. Verify translation files are valid JSON
3. Clear localStorage: `localStorage.removeItem('i18nextLng')`

### RTL Layout Issues

If Arabic layout is broken:
1. Check `app/globals.css` for RTL rules
2. Verify components use RTL-aware classes (`ms-`, `ps-`, `border-s`)
3. Check for `no-rtl-reverse` class usage

## 📄 License

MIT License - see LICENSE file for details.

## 📧 Contact

- **Website**: [umairazmat.com](https://umairazmat.com)
- **Email**: umair@umairazmat.com
- **GitHub**: [@umairazmat](https://github.com/umairazmat)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Translations powered by [react-i18next](https://react.i18next.com/)

---

**Last Updated**: 2024 - Portfolio v2.0.0 with admin dashboard, custom appointment system, featured blogs, and newsletter with interests.

See [V2_RELEASE_NOTES.md](./V2_RELEASE_NOTES.md) for detailed v2.0 release notes and [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) for production deployment checklist.