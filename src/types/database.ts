export interface Profile {
  id: string;
  full_name: string;
  role: "admin" | "editor";
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: Record<string, unknown>;
  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  status: "draft" | "published";
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: Record<string, unknown>;
  cover_image_url: string | null;
  category: string | null;
  tags: string[];
  status: "draft" | "published";
  published_at: string | null;
  author_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Plan {
  id: string;
  name: string;
  slug: string;
  display_name: string;
  tagline: string | null;
  description: string | null;
  target_audience: string | null;
  highlights: string[];
  coverage_type: string | null;
  region: string | null;
  contract_types: string[];
  image_url: string | null;
  pdf_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface NetworkProvider {
  id: string;
  name: string;
  category: string;
  phone: string | null;
  address: string | null;
  neighborhood: string | null;
  city: string;
  state: string;
  hours_note: string | null;
  is_featured: boolean;
  specialties: string[];
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Media {
  id: string;
  file_name: string;
  file_path: string;
  file_url: string;
  file_type: string;
  file_size: number | null;
  alt_text: string | null;
  uploaded_by: string | null;
  created_at: string;
}

export interface FormSubmission {
  id: string;
  form_type: string;
  data: Record<string, unknown>;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  page_url: string | null;
  ip_hash: string | null;
  is_spam: boolean;
  created_at: string;
}

export interface SiteSetting {
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
  updated_by: string | null;
}

export interface AIConversation {
  id: string;
  user_id: string;
  title: string | null;
  messages: Array<{ role: string; content: string }>;
  context_type: string | null;
  created_at: string;
  updated_at: string;
}
