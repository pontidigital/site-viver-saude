-- =============================================================
-- Create Admin User Profile for Viver Saude
-- =============================================================
--
-- INSTRUCTIONS:
-- 1. First, create a user via the Supabase Dashboard:
--    Authentication > Add user > Create new user
--    (check "Auto Confirm User")
--
-- 2. Copy the user's UUID from the Authentication > Users table.
--
-- 3. Replace the placeholder values below with your actual data.
--
-- 4. Run this SQL in the Supabase SQL Editor.
-- =============================================================

-- Replace 'YOUR-USER-UUID-HERE' with the actual UUID from auth.users
-- Replace 'Your Full Name' with the admin's name

INSERT INTO profiles (id, full_name, role)
VALUES (
  'YOUR-USER-UUID-HERE',   -- <-- paste the UUID from auth.users here
  'Your Full Name',         -- <-- your name
  'admin'
)
ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  full_name = EXCLUDED.full_name,
  updated_at = now();

-- Verify the admin was created
SELECT id, full_name, role, created_at FROM profiles WHERE role = 'admin';
