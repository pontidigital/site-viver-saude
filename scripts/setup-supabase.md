# Supabase Setup Guide - Viver Saude

## 1. Create a New Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in (or create an account).
2. Click **New Project**.
3. Choose your organization (or create one).
4. Fill in:
   - **Project name:** `viver-saude`
   - **Database password:** (save this securely, you will need it later)
   - **Region:** South America (Sao Paulo) - `sa-east-1`
5. Click **Create new project** and wait for provisioning (~2 minutes).

## 2. Run the Migration SQL

1. In the Supabase dashboard, go to **SQL Editor** (left sidebar).
2. Click **New query**.
3. Open the file `supabase/migrations/001_initial_schema.sql` from this project.
4. Paste the entire contents into the SQL Editor.
5. Click **Run** (or press Ctrl+Enter).
6. Verify there are no errors in the output panel.

Alternatively, if you have the Supabase CLI installed:

```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

## 3. Run the Seed SQL

1. In the **SQL Editor**, click **New query**.
2. Open the file `supabase/seed.sql` from this project.
3. Paste the entire contents and click **Run**.
4. This will populate the database with:
   - Default health plans (Topazio, Rubi, Esmeralda, Safira, Turmalina, Quartzo)
   - Site settings (contact info, social links, footer text)
   - Initial network providers

## 4. Create Storage Buckets

1. Go to **Storage** in the left sidebar.
2. Create the following buckets by clicking **New bucket** for each:

| Bucket Name | Public | Description |
|-------------|--------|-------------|
| `images`    | Yes    | General site images (hero, icons, plans, etc.) |
| `pdfs`      | Yes    | Plan PDFs, downloadable documents |
| `blog`      | Yes    | Blog post cover images and media |
| `media`     | Yes    | General media uploads from admin panel |

3. For each bucket, set it as **Public** so files can be accessed without authentication.

### Storage Policies

For each bucket, add the following RLS policies via SQL Editor:

```sql
-- Allow public read access to all buckets
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT USING (bucket_id IN ('images', 'pdfs', 'blog', 'media'));

-- Allow authenticated users (admins) to upload
CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated'
    AND bucket_id IN ('images', 'pdfs', 'blog', 'media')
  );

-- Allow authenticated users (admins) to update their uploads
CREATE POLICY "Authenticated users can update" ON storage.objects
  FOR UPDATE USING (
    auth.role() = 'authenticated'
    AND bucket_id IN ('images', 'pdfs', 'blog', 'media')
  );

-- Allow authenticated users (admins) to delete
CREATE POLICY "Authenticated users can delete" ON storage.objects
  FOR DELETE USING (
    auth.role() = 'authenticated'
    AND bucket_id IN ('images', 'pdfs', 'blog', 'media')
  );
```

## 5. RLS Policies

Row Level Security (RLS) policies are already defined in the migration file. They enforce:

- **Public users** can only read published pages, posts, active plans, and site settings.
- **Admin/editor users** have full CRUD access to all content tables.
- **Profiles** are scoped so users can only view/edit their own profile (admins can view all).

To verify RLS is enabled, go to **Authentication > Policies** and check that each table shows policies.

## 6. Create the First Admin User

1. Go to **Authentication** in the left sidebar.
2. Click **Add user** > **Create new user**.
3. Fill in:
   - **Email:** your admin email address
   - **Password:** a strong password
   - **Auto Confirm User:** check this box
4. Click **Create user**.
5. Copy the user's UUID from the users table.
6. Go to **SQL Editor** and run the admin profile creation script:

```sql
-- Replace the UUID and name with your actual values
INSERT INTO profiles (id, full_name, role)
VALUES (
  'YOUR-USER-UUID-HERE',
  'Your Full Name',
  'admin'
);
```

Or use the provided script at `scripts/create-admin.sql` (edit it first with your values).

## 7. Get the API Keys

1. Go to **Settings** > **API** in the left sidebar.
2. You will need two values:
   - **Project URL** (e.g., `https://xxxx.supabase.co`)
   - **anon (public) key** (safe to expose in the browser)
3. Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

4. (Optional) For server-side operations that bypass RLS, also add:

```env
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

> **Warning:** Never commit `.env.local` to version control. It is already in `.gitignore`.

## Verification Checklist

- [ ] Project created in `sa-east-1` region
- [ ] Migration SQL ran without errors
- [ ] Seed data inserted (check `plans` and `site_settings` tables)
- [ ] Storage buckets created: `images`, `pdfs`, `blog`, `media`
- [ ] Storage policies applied
- [ ] Admin user created and profile inserted
- [ ] `.env.local` file created with API keys
- [ ] Site loads and connects to Supabase
