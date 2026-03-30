-- Profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Pages
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  og_image_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published pages" ON pages FOR SELECT USING (status = 'published');
CREATE POLICY "Admins full access to pages" ON pages FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Posts (blog)
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content JSONB NOT NULL DEFAULT '{}',
  cover_image_url TEXT,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  author_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published posts" ON posts FOR SELECT USING (status = 'published');
CREATE POLICY "Admins full access to posts" ON posts FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Plans
CREATE TABLE plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  target_audience TEXT,
  highlights TEXT[] DEFAULT '{}',
  coverage_type TEXT,
  region TEXT,
  contract_types TEXT[] DEFAULT '{}',
  image_url TEXT,
  pdf_url TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active plans" ON plans FOR SELECT USING (is_active = true);
CREATE POLICY "Admins full access to plans" ON plans FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Network providers
CREATE TABLE network_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  neighborhood TEXT,
  city TEXT DEFAULT 'Natal',
  state TEXT DEFAULT 'RN',
  hours_note TEXT,
  is_featured BOOLEAN DEFAULT false,
  specialties TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE network_providers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active providers" ON network_providers FOR SELECT USING (is_active = true);
CREATE POLICY "Admins full access to providers" ON network_providers FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Media
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INT,
  alt_text TEXT,
  uploaded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view media" ON media FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can manage media" ON media FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Form submissions
CREATE TABLE form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type TEXT NOT NULL,
  data JSONB NOT NULL,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  page_url TEXT,
  ip_hash TEXT,
  is_spam BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit forms" ON form_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view submissions" ON form_submissions FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Site settings
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES profiles(id)
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read settings" ON site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can update settings" ON site_settings FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- AI conversations
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT,
  messages JSONB NOT NULL DEFAULT '[]',
  context_type TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own conversations" ON ai_conversations FOR ALL USING (auth.uid() = user_id);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER pages_updated_at BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER plans_updated_at BEFORE UPDATE ON plans FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER network_providers_updated_at BEFORE UPDATE ON network_providers FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER ai_conversations_updated_at BEFORE UPDATE ON ai_conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
