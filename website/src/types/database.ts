export type SiteSettings = {
  id: string;
  singleton_key: string;
  studio_status: string;
  tagline: string;
  hero_eyebrow: string;
  hero_headline: string;
  hero_description: string;
  primary_cta_label: string;
  primary_cta_href: string;
  secondary_cta_label: string;
  secondary_cta_href: string;
  starting_price: string;
  standard_website_value: string;
  partner_launch_setup: string;
  contact_email: string | null;
  instagram_url: string | null;
  tiktok_url: string | null;
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];
  updated_at: string;
  created_at: string;
};

export type ServiceProtocol = {
  id: string;
  name: string;
  slug: string | null;
  codename: string | null;
  category: string;
  short_description: string | null;
  primary_outcome: string | null;
  starting_price: string | null;
  features: string[];
  active: boolean;
  featured: boolean;
  display_order: number;
  updated_at: string;
  created_at: string;
};

export type RetainerPackage = {
  id: string;
  name: string;
  codename: string | null;
  monthly_price: string;
  short_description: string | null;
  best_for: string | null;
  features: string[];
  active: boolean;
  recommended: boolean;
  display_order: number;
  updated_at: string;
  created_at: string;
};

export type ProtocolStep = {
  id: string;
  step_number: number;
  title: string;
  codename: string | null;
  short_description: string | null;
  output: string | null;
  active: boolean;
  display_order: number;
  updated_at: string;
  created_at: string;
};

export type AccessRequestStatus = "new" | "reviewed" | "qualified" | "rejected" | "converted";

export type AccessRequest = {
  id: string;
  name: string;
  brand: string | null;
  project_type: string | null;
  budget_range: string | null;
  message: string | null;
  status: AccessRequestStatus;
  priority: number;
  internal_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type ProspectStatus =
  | "found"
  | "contacted"
  | "replied"
  | "call_booked"
  | "proposal_sent"
  | "won"
  | "lost";

export type Prospect = {
  id: string;
  business_name: string;
  industry: string | null;
  location: string | null;
  website: string | null;
  instagram: string | null;
  observed_problem: string | null;
  opportunity: string | null;
  suggested_offer: string | null;
  estimated_value: number | null;
  status: ProspectStatus;
  priority: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type ActivityLog = {
  id: string;
  actor: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
};
