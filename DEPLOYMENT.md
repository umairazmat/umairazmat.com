# Deployment Guide

This guide covers deploying the portfolio to both Vercel and Netlify.

## Prerequisites

- Node.js 18+ installed
- Git repository pushed to GitHub/GitLab/Bitbucket
- Account on Vercel or Netlify (or both)

## Vercel Deployment

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Select your repository
   - Vercel auto-detects Next.js from `vercel.json`
   - Click "Deploy"

3. **Configure Domain** (Optional)
   - After deployment, go to Project Settings → Domains
   - Add your custom domain (e.g., `umairazmat.com`)
   - Update DNS records as instructed

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# For production
vercel --prod
```

### Vercel Configuration

The `vercel.json` file is pre-configured with:
- Build command: `npm run build`
- Framework: Next.js
- Region: US East (iad1)

## Netlify Deployment

### Option 1: GitHub Integration (Recommended)

1. **Install Netlify Plugin** (if not already installed)
   ```bash
   npm install @netlify/plugin-nextjs --save-dev
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

3. **Import to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign in with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your repository
   - Netlify auto-detects settings from `netlify.toml`
   - Click "Deploy site"

4. **Configure Domain** (Optional)
   - After deployment, go to Site settings → Domain management
   - Add your custom domain
   - Update DNS records as instructed

### Option 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Netlify Configuration

The `netlify.toml` file is pre-configured with:
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 18
- Next.js plugin enabled

## Environment Variables

### Vercel

1. Go to Project Settings → Environment Variables
2. Add variables:
   - `NEXT_PUBLIC_SITE_URL` = `https://umairazmat.com`
   - `OPENAI_API_KEY` = (optional, for chatbot)

### Netlify

1. Go to Site settings → Build & deploy → Environment variables
2. Add the same variables as above

## Post-Deployment Checklist

- [ ] Verify site loads correctly
- [ ] Test all navigation links
- [ ] Check blog posts render correctly
- [ ] Test contact form (if integrated)
- [ ] Verify chatbot works
- [ ] Check mobile responsiveness
- [ ] Test resume download
- [ ] Verify SEO metadata (view page source)
- [ ] Check sitemap: `yoursite.com/sitemap.xml`
- [ ] Check robots.txt: `yoursite.com/robots.txt`

## Troubleshooting

### Build Fails on Vercel

1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version (should be 18+)
4. Check for TypeScript errors: `npm run build` locally

### Build Fails on Netlify

1. Check build logs in Netlify dashboard
2. Ensure `@netlify/plugin-nextjs` is installed
3. Verify `netlify.toml` is in root directory
4. Check Node.js version matches (18)
5. Try adding `NPM_FLAGS = "--legacy-peer-deps"` to `netlify.toml`

### Blog Posts Not Showing

1. Ensure `content/blog/` directory exists
2. Check blog post files have proper frontmatter
3. Verify file extensions are `.mdx` or `.md`
4. Check build logs for file reading errors

### Images Not Loading

1. Verify image paths in `next.config.js` domains
2. Check image URLs are absolute or correct relative paths
3. Ensure images are in `public/` directory

## Continuous Deployment

Both platforms support automatic deployments:

- **Vercel**: Automatically deploys on every push to main branch
- **Netlify**: Automatically deploys on every push to main branch

You can configure branch previews in both platforms for pull requests.

## Performance Optimization

### Vercel
- Automatic image optimization
- Edge functions support
- Automatic HTTPS

### Netlify
- Automatic image optimization
- Edge functions support
- Automatic HTTPS
- Form handling (for contact form)

## Support

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Netlify Docs: [docs.netlify.com](https://docs.netlify.com)
- Next.js Deployment: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)

