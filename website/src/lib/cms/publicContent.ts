import { supabase, supabaseConfigured } from "@/lib/supabase/client";
import type { Language, SiteContent } from "@/data/siteContent";
import type {
  ProtocolStep,
  RetainerPackage,
  ServiceProtocol,
  SiteSettings,
} from "@/types/database";

const fallbackIcon = "Terminal" as const;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Deep-merge `override` onto `base`. Arrays and primitives replace; objects merge. */
export function deepMerge<T>(base: T, override: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return (override === undefined ? base : (override as T));
  }
  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) continue;
    result[key] = isPlainObject(value) && isPlainObject(result[key]) ? deepMerge(result[key], value) : value;
  }
  return result as T;
}

export async function loadPublicCmsContent(base: SiteContent, language: Language): Promise<SiteContent> {
  if (!supabaseConfigured) return base;

  const [settingsResult, servicesResult, packagesResult, protocolResult, overrideResult] =
    await Promise.all([
      supabase.from("site_settings").select("*").eq("singleton_key", "main").maybeSingle<SiteSettings>(),
      supabase.from("service_protocols").select("*").eq("active", true).order("display_order", { ascending: true }).returns<ServiceProtocol[]>(),
      supabase.from("retainer_packages").select("*").eq("active", true).order("display_order", { ascending: true }).returns<RetainerPackage[]>(),
      supabase.from("protocol_steps").select("*").eq("active", true).order("step_number", { ascending: true }).returns<ProtocolStep[]>(),
      supabase.from("content_overrides").select("data").eq("language", language).maybeSingle<{ data: Record<string, unknown> }>(),
    ]);

  const settings = settingsResult.data;
  const services = servicesResult.data ?? [];
  const packages = packagesResult.data ?? [];
  const protocol = protocolResult.data ?? [];

  // Layer 1: structured tables (hero, services, packages, protocol, footer).
  const mapped: SiteContent = {
    ...base,
    footer: {
      ...base.footer,
      description: settings?.seo_description || base.footer.description,
      contactLineOne: settings?.contact_email || base.footer.contactLineOne,
      contactLineTwo: settings?.instagram_url || settings?.tiktok_url || base.footer.contactLineTwo,
      status: settings?.studio_status || base.footer.status,
      tagline: settings?.tagline || base.footer.tagline,
    },
    home: {
      ...base.home,
      badge: settings?.hero_eyebrow || base.home.badge,
      hero: settings?.hero_headline || base.home.hero,
      text: settings?.hero_description || base.home.text,
      primaryCta: settings?.primary_cta_label || base.home.primaryCta,
      secondaryCta: settings?.secondary_cta_label || base.home.secondaryCta,
    },
    servicesPage: {
      ...base.servicesPage,
      services: services.length
        ? services.map((service) => ({
            icon: fallbackIcon,
            title: service.name,
            text: service.short_description || service.primary_outcome || "",
            deliverables: service.features?.length ? service.features : [service.starting_price || "Custom offer"],
          }))
        : base.servicesPage.services,
    },
    protocol: {
      ...base.protocol,
      protocol: protocol.length ? protocol.map((step) => step.title) : base.protocol.protocol,
      paragraphs: protocol.length ? protocol.map((step) => step.short_description || step.output || "").filter(Boolean) : base.protocol.paragraphs,
    },
    access: {
      ...base.access,
      packages: packages.length
        ? packages.map((item) => ({
            name: item.name,
            label: item.codename || item.monthly_price,
            text: item.short_description || item.best_for || "",
            points: item.features?.length ? item.features : [item.monthly_price],
          }))
        : base.access.packages,
    },
  };

  // Layer 2: generic per-section overrides edited in the admin (wins over everything).
  const override = overrideResult.data?.data;
  return isPlainObject(override) ? deepMerge(mapped, override) : mapped;
}
