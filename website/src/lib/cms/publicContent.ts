import { supabase, supabaseConfigured } from "@/lib/supabase/client";
import type { Language, SiteContent } from "@/data/siteContent";
import type {
  ProtocolStep,
  RetainerPackage,
  ServiceProtocol,
  SiteSettings,
} from "@/types/database";

const fallbackIcon = "Terminal" as const;

export async function loadPublicCmsContent(base: SiteContent, language: Language): Promise<SiteContent> {
  if (!supabaseConfigured) return base;
  if (language !== "en") return base;

  const [settingsResult, servicesResult, packagesResult, protocolResult] =
    await Promise.all([
      supabase
        .from("site_settings")
        .select("*")
        .eq("singleton_key", "main")
        .maybeSingle<SiteSettings>(),
      supabase
        .from("service_protocols")
        .select("*")
        .eq("active", true)
        .order("display_order", { ascending: true })
        .returns<ServiceProtocol[]>(),
      supabase
        .from("retainer_packages")
        .select("*")
        .eq("active", true)
        .order("display_order", { ascending: true })
        .returns<RetainerPackage[]>(),
      supabase
        .from("protocol_steps")
        .select("*")
        .eq("active", true)
        .order("step_number", { ascending: true })
        .returns<ProtocolStep[]>(),
    ]);

  const settings = settingsResult.data;
  const services = servicesResult.data ?? [];
  const packages = packagesResult.data ?? [];
  const protocol = protocolResult.data ?? [];

  return {
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
      protocol: protocol.length
        ? protocol.map((step) => step.title)
        : base.protocol.protocol,
      paragraphs: protocol.length
        ? protocol
            .map((step) => step.short_description || step.output || "")
            .filter(Boolean)
        : base.protocol.paragraphs,
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
}
