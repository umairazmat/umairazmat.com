# Production Deployment Checklist

## Pre-Deployment Security Check

### ✅ Environment Variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL` is set
- [ ] `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set (server-side only)
- [ ] No hardcoded secrets in code
- [ ] All sensitive data in environment variables

### ✅ Supabase Configuration
- [ ] RLS (Row Level Security) enabled on all tables
- [ ] Admin email configured in RLS policies: `umairazmatcareer@gmail.com`
- [ ] Public read access for blogs, categories, tags
- [ ] Public insert access for appointments and leads
- [ ] Admin full access to all tables

### ✅ Authentication
- [ ] Admin login page accessible at `/admin/login`
- [ ] Middleware protecting admin routes
- [ ] Session management working correctly
- [ ] Logout functionality working

## Route Verification

### ✅ Public Routes
- [ ] `/` - Homepage loads correctly
- [ ] `/blog` - Blog listing page works
- [ ] `/blog/[slug]` - Individual blog posts load
- [ ] `/appointments` - Appointment booking form works
- [ ] All navigation links work

### ✅ Admin Routes (Protected)
- [ ] `/admin/login` - Login page accessible
- [ ] `/admin/dashboard` - Dashboard loads with stats
- [ ] `/admin/blogs` - Blog management works
- [ ] `/admin/blogs/new` - Create blog works
- [ ] `/admin/blogs/[id]/edit` - Edit blog works
- [ ] `/admin/appointments` - Appointments management works
- [ ] `/admin/leads` - Leads management works
- [ ] `/admin/analytics` - Analytics page loads

## Functionality Tests

### ✅ Blog System
- [ ] Create new blog post
- [ ] Edit existing blog post
- [ ] Delete blog post
- [ ] Featured blogs show on homepage
- [ ] Blog categories and tags work
- [ ] Blog images upload correctly

### ✅ Appointment System
- [ ] Public can book appointments
- [ ] Appointments save to database
- [ ] Admin can view appointments
- [ ] Admin can update appointment status
- [ ] Admin can search appointments
- [ ] All appointment details display correctly

### ✅ Newsletter/Leads
- [ ] Newsletter form in footer works
- [ ] Email subscription saves to database
- [ ] Interests dropdown works
- [ ] Admin can view leads
- [ ] Admin can export leads (if implemented)
- [ ] Duplicate email handling works

### ✅ UI/UX
- [ ] Featured blogs section displays correctly
- [ ] All Calendly links replaced with `/appointments`
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Dark mode works correctly
- [ ] Animations perform well
- [ ] No console errors

## Build & Performance

### ✅ Build Process
- [ ] `npm run build` completes successfully
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] No build warnings (except known Next.js warnings)

### ✅ Performance
- [ ] Page load times acceptable
- [ ] Images optimized
- [ ] Code splitting working
- [ ] No memory leaks

## Database Verification

### ✅ Tables Exist
- [ ] `blogs` table
- [ ] `categories` table
- [ ] `tags` table
- [ ] `blog_tags` table
- [ ] `appointments` table
- [ ] `leads` table
- [ ] `analytics` table (if used)
- [ ] `comments` table (if used)

### ✅ RLS Policies
- [ ] Public can read blogs
- [ ] Public can insert appointments
- [ ] Public can insert leads
- [ ] Admin can manage all tables
- [ ] Policies tested and working

## Production Deployment Steps

1. **Build Locally**
   ```bash
   npm run build
   ```

2. **Test Build**
   ```bash
   npm start
   ```
   - Test all routes
   - Test admin functionality
   - Verify data saves correctly

3. **Environment Variables**
   - Set in hosting platform (Vercel/Netlify)
   - Verify all variables are set
   - Test with production Supabase instance

4. **Deploy**
   - Push to main branch
   - Monitor deployment logs
   - Check for errors

5. **Post-Deployment**
   - Test all public routes
   - Test admin login
   - Test appointment booking
   - Test newsletter subscription
   - Monitor error logs

## Rollback Plan

If issues occur:
1. Revert to previous version
2. Check error logs
3. Verify environment variables
4. Test database connectivity
5. Fix issues and redeploy

## Monitoring

After deployment, monitor:
- [ ] Error rates
- [ ] Page load times
- [ ] Database query performance
- [ ] Admin login success rate
- [ ] Appointment booking success rate
- [ ] Newsletter subscription rate

---

**Last Updated**: $(date)  
**Status**: Ready for Production ✅
