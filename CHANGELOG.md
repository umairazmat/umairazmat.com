# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024

### Added
- **Admin Dashboard System**
  - Complete admin panel with Supabase authentication
  - Blog management (create, edit, delete, featured posts)
  - Appointment management with search and filtering
  - Newsletter leads management
  - Site analytics dashboard
  - Protected routes with middleware

- **Custom Appointment System**
  - Public appointment booking at `/appointments`
  - Admin dashboard for managing appointments
  - Full appointment details and status management
  - Replaced all Calendly links

- **Featured Blogs Section**
  - Display 3 latest featured blog posts on homepage
  - Matches homepage UI/UX with animated backgrounds
  - Responsive grid layout
  - Auto-hides if no featured blogs exist

- **Newsletter with Interests**
  - Enhanced newsletter form in footer
  - Email subscription with optional interest selection
  - Dropdown selector for compact design
  - Saves to Supabase leads table

- **Supabase Integration**
  - Database backend for blogs, appointments, leads
  - Row Level Security (RLS) policies
  - Server-side and client-side Supabase clients
  - Authentication system

### Changed
- Replaced all Calendly appointment links with custom `/appointments` route
- Updated blog system to use Supabase instead of MDX files
- Enhanced footer with newsletter form
- Improved admin UI/UX consistency

### Security
- Admin routes protected with middleware
- RLS policies enforced in Supabase
- No hardcoded secrets or API keys
- Environment variables properly configured

### Documentation
- Added `V2_RELEASE_NOTES.md` with comprehensive release notes
- Added `PRODUCTION_CHECKLIST.md` for deployment guidance
- Updated `README.md` with V2 features

## [1.0.0] - 2024

### Added
- Initial release
- Full internationalization (5 languages)
- RTL support for Arabic
- SEO optimization
- Blog system with MDX
- Contact form with Resend API
- Responsive design
- Dark/Light theme
- Multi-language support

---

[2.0.0]: https://github.com/umairazmat/umairazmat.com/releases/tag/v2.0.0
[1.0.0]: https://github.com/umairazmat/umairazmat.com/releases/tag/v1.0.0
