# Verify Your Supabase Setup

## ✅ Quick Verification Steps

### 1. Check Environment Variables

Make sure your `.env.local` has all three variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://iwbawmqfbtqovlzalnkk.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 2. Update RLS Policies (if needed)

If you haven't already, update the remaining policies in Supabase:

1. Go to **SQL Editor** in Supabase
2. Run this SQL to update all admin policies:

```sql
-- Update appointments policy
DROP POLICY IF EXISTS "Admin can manage appointments" ON appointments;
CREATE POLICY "Admin can manage appointments" ON appointments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'umairazmatcareer@gmail.com'
    )
  );

-- Update leads policy
DROP POLICY IF EXISTS "Admin can read leads" ON leads;
CREATE POLICY "Admin can read leads" ON leads
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'umairazmatcareer@gmail.com'
    )
  );

-- Update analytics policy
DROP POLICY IF EXISTS "Admin can read analytics" ON analytics;
CREATE POLICY "Admin can read analytics" ON analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'umairazmatcareer@gmail.com'
    )
  );
```

### 3. Create Admin User

1. Go to **Authentication** → **Users** in Supabase
2. Click **Add User** → **Create New User**
3. Email: `umairazmatcareer@gmail.com`
4. Set a secure password
5. **Auto Confirm User**: Enable this

### 4. Test the Connection

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Visit: `http://localhost:3000/admin/login`

3. Try logging in with:
   - Email: `umairazmatcareer@gmail.com`
   - Password: (the one you set)

### 5. Verify Tables Exist

In Supabase dashboard:
- Go to **Table Editor**
- You should see: `blogs`, `categories`, `tags`, `blog_tags`, `comments`, `likes`, `follows`, `appointments`, `leads`, `analytics`

### 6. Check RLS is Enabled

In Supabase dashboard:
- Go to **Authentication** → **Policies**
- All tables should show RLS is enabled (green indicator)

## 🐛 Common Issues

### "Missing Supabase environment variables"
- Restart your dev server after adding `.env.local`
- Check file is in project root
- Verify no typos in variable names

### "Unauthorized" when accessing admin pages
- Verify admin user exists in Supabase Auth
- Check email matches RLS policies exactly
- Clear browser localStorage: `localStorage.clear()`

### Tables not found
- Re-run `SUPABASE_SCHEMA.sql` in SQL Editor
- Check for any SQL errors in the output

## ✅ Success Indicators

You're all set when:
- ✅ Can access `/admin/login` page
- ✅ Can log in with admin credentials
- ✅ Redirected to `/admin/dashboard`
- ✅ Dashboard shows stats (even if 0)
- ✅ Can access `/admin/appointments`

---

**Next:** Once verified, you can start using the admin system!
