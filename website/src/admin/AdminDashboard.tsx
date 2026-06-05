import React from "react";
import {
  BarChart3,
  Boxes,
  Clock3,
  Crown,
  Eye,
  FileText,
  Gauge,
  Home,
  Link2,
  Lock,
  MoreVertical,
  Navigation,
  Package,
  PenLine,
  Rocket,
  Settings,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { z } from "zod";

import { StatusCard } from "@/admin/StatusCard";
import { supabase } from "@/lib/supabase/client";
import type { SiteSettings } from "@/types/database";

type AdminDashboardProps = {
  navigate: (path: string) => void;
};

type Counts = {
  services: number;
  packages: number;
  protocol: number;
  requests: number;
  prospects: number;
  contacted: number;
  proposalSent: number;
  pipelineValue: number;
};

type QuickAccessItem = [label: string, meta: string, Icon: LucideIcon, href: string];
type SectionNavItem = [title: string, sub: string, Icon: LucideIcon];

type SettingsForm = {
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
  contact_email: string;
  instagram_url: string;
  tiktok_url: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
};

const settingsSchema = z.object({
  studio_status: z.string().min(2),
  tagline: z.string().min(2),
  hero_eyebrow: z.string().min(2),
  hero_headline: z.string().min(2),
  hero_description: z.string().min(2),
  primary_cta_label: z.string().min(1),
  primary_cta_href: z.string().min(1),
  secondary_cta_label: z.string().min(1),
  secondary_cta_href: z.string().min(1),
  starting_price: z.string().min(1),
  standard_website_value: z.string().min(1),
  partner_launch_setup: z.string().min(1),
  contact_email: z.string().email().optional().or(z.literal("")),
  instagram_url: z.string().url().optional().or(z.literal("")),
  tiktok_url: z.string().url().optional().or(z.literal("")),
  seo_title: z.string().min(2),
  seo_description: z.string().min(2),
  seo_keywords: z.string().optional(),
});

const defaultForm: SettingsForm = {
  studio_status: "Selective work",
  tagline: "Simple. Dark. Well built.",
  hero_eyebrow: "BALKAN VEIL / WEBSITES AND SMALL SYSTEMS",
  hero_headline: "Clear sites with atmosphere.",
  hero_description: "Websites, landing pages and small systems for businesses that need to look clearer and more serious online.",
  primary_cta_label: "Send a Brief",
  primary_cta_href: "/en/access",
  secondary_cta_label: "View Protocol",
  secondary_cta_href: "/en/protocol",
  starting_price: "from 1.500 EUR",
  standard_website_value: "3.500 EUR",
  partner_launch_setup: "800 EUR",
  contact_email: "contact@balkanveil.com",
  instagram_url: "",
  tiktok_url: "",
  seo_title: "Balkan Veil - Websites and Small Systems",
  seo_description: "Websites, landing pages, simple dashboards and targeted automations.",
  seo_keywords: "websites, landing pages, simple dashboards, small business systems",
};

function toForm(settings: SiteSettings | null): SettingsForm {
  if (!settings) return defaultForm;

  return {
    studio_status: settings.studio_status,
    tagline: settings.tagline,
    hero_eyebrow: settings.hero_eyebrow,
    hero_headline: settings.hero_headline,
    hero_description: settings.hero_description,
    primary_cta_label: settings.primary_cta_label,
    primary_cta_href: settings.primary_cta_href,
    secondary_cta_label: settings.secondary_cta_label,
    secondary_cta_href: settings.secondary_cta_href,
    starting_price: settings.starting_price,
    standard_website_value: settings.standard_website_value,
    partner_launch_setup: settings.partner_launch_setup,
    contact_email: settings.contact_email || "",
    instagram_url: settings.instagram_url || "",
    tiktok_url: settings.tiktok_url || "",
    seo_title: settings.seo_title,
    seo_description: settings.seo_description,
    seo_keywords: settings.seo_keywords.join(", "),
  };
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-[10px] border border-white/[0.08] bg-[#0d0f14]/82 shadow-[0_22px_80px_rgba(0,0,0,0.28)] ${className}`}>
      {children}
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  textarea,
  pathValue,
  pathName,
}: {
  label: string;
  name: keyof SettingsForm;
  value: string;
  onChange: (name: keyof SettingsForm, value: string) => void;
  textarea?: boolean;
  pathValue?: string;
  pathName?: keyof SettingsForm;
}) {
  const base =
    "w-full appearance-none rounded-[7px] border border-white/[0.12] !bg-[#0a0c10] px-4 py-3 text-[13px] leading-6 text-[#f5f1e8] outline-none transition placeholder:text-[#6f7178] focus:border-[#d4af37]/60 focus:shadow-[0_0_0_3px_rgba(212,175,55,0.08)]";

  return (
    <label className="block">
      <span className="mb-2 block text-[12px] font-semibold text-[#f5f1e8]">{label}</span>
      {textarea ? (
        <textarea className={base} rows={3} value={value} onChange={(event) => onChange(name, event.target.value)} />
      ) : pathName ? (
        <div className="grid overflow-hidden rounded-[7px] border border-white/[0.12] !bg-[#0a0c10] md:grid-cols-[1fr_110px]">
          <input className="border-0 bg-transparent px-4 py-3 text-[13px] text-[#f5f1e8] outline-none" value={value} onChange={(event) => onChange(name, event.target.value)} />
          <div className="flex items-center border-t border-white/[0.08] md:border-l md:border-t-0">
            <input className="w-full bg-transparent px-4 py-3 text-[13px] text-[#a8a8a8] outline-none" value={pathValue || ""} onChange={(event) => onChange(pathName, event.target.value)} />
            <Link2 size={14} className="mr-4 text-[#a8a8a8]" />
          </div>
        </div>
      ) : (
        <input className={base} value={value} onChange={(event) => onChange(name, event.target.value)} />
      )}
    </label>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="mb-7 flex items-center gap-3">
      <div className="grid h-9 w-9 place-items-center rounded-[8px] border border-[#d4af37]/25 bg-[#110f08] text-[#f2c75c] shadow-[0_0_28px_rgba(212,175,55,0.12)]">
        {icon}
      </div>
      <h3 className="font-mono text-[15px] uppercase tracking-[0.08em] text-[#f2c75c]">{title}</h3>
    </div>
  );
}

export function AdminDashboard({ navigate }: AdminDashboardProps) {
  const [settings, setSettings] = React.useState<SiteSettings | null>(null);
  const [form, setForm] = React.useState<SettingsForm>(defaultForm);
  const [counts, setCounts] = React.useState<Counts>({
    services: 0,
    packages: 0,
    protocol: 0,
    requests: 0,
    prospects: 0,
    contacted: 0,
    proposalSent: 0,
    pipelineValue: 0,
  });
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [status, setStatus] = React.useState("Published");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");

      const [
        settingsResult,
        servicesResult,
        packagesResult,
        protocolResult,
        requestsResult,
        prospectsResult,
        contactedResult,
        proposalSentResult,
        pipelineResult,
      ] = await Promise.all([
        supabase.from("site_settings").select("*").eq("singleton_key", "main").single<SiteSettings>(),
        supabase.from("service_protocols").select("*", { count: "exact", head: true }).eq("active", true),
        supabase.from("retainer_packages").select("*", { count: "exact", head: true }).eq("active", true),
        supabase.from("protocol_steps").select("*", { count: "exact", head: true }).eq("active", true),
        supabase.from("access_requests").select("*", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("prospects").select("*", { count: "exact", head: true }),
        supabase.from("prospects").select("*", { count: "exact", head: true }).eq("status", "contacted"),
        supabase.from("prospects").select("*", { count: "exact", head: true }).eq("status", "proposal_sent"),
        supabase.from("prospects").select("estimated_value").in("status", ["proposal_sent", "won"]),
      ]);

      if (cancelled) return;

      if (settingsResult.error) {
        setError(settingsResult.error.message);
      } else {
        setSettings(settingsResult.data);
        setForm(toForm(settingsResult.data));
      }

      setCounts({
        services: servicesResult.count ?? 0,
        packages: packagesResult.count ?? 0,
        protocol: protocolResult.count ?? 0,
        requests: requestsResult.count ?? 0,
        prospects: prospectsResult.count ?? 0,
        contacted: contactedResult.count ?? 0,
        proposalSent: proposalSentResult.count ?? 0,
        pipelineValue:
          pipelineResult.data?.reduce(
            (total, item) => total + (Number(item.estimated_value) || 0),
            0,
          ) ?? 0,
      });
      setLoading(false);
    }

    load().catch((loadError: unknown) => {
      if (cancelled) return;
      setError(loadError instanceof Error ? loadError.message : "Could not load dashboard.");
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const updateField = (name: keyof SettingsForm, value: string) => {
    setStatus("Draft");
    setError("");
    setForm((current) => ({ ...current, [name]: value }));
  };

  const saveChanges = async () => {
    setSaving(true);
    setError("");

    const parsed = settingsSchema.safeParse(form);
    if (!parsed.success) {
      setSaving(false);
      setError("Check required fields and URL formats.");
      return;
    }

    const keywords = parsed.data.seo_keywords
      ? parsed.data.seo_keywords.split(",").map((keyword) => keyword.trim()).filter(Boolean)
      : [];

    const { error: saveError } = await supabase
      .from("site_settings")
      .update({
        studio_status: parsed.data.studio_status,
        tagline: parsed.data.tagline,
        hero_eyebrow: parsed.data.hero_eyebrow,
        hero_headline: parsed.data.hero_headline,
        hero_description: parsed.data.hero_description,
        primary_cta_label: parsed.data.primary_cta_label,
        primary_cta_href: parsed.data.primary_cta_href,
        secondary_cta_label: parsed.data.secondary_cta_label,
        secondary_cta_href: parsed.data.secondary_cta_href,
        starting_price: parsed.data.starting_price,
        standard_website_value: parsed.data.standard_website_value,
        partner_launch_setup: parsed.data.partner_launch_setup,
        contact_email: parsed.data.contact_email || null,
        instagram_url: parsed.data.instagram_url || null,
        tiktok_url: parsed.data.tiktok_url || null,
        seo_title: parsed.data.seo_title,
        seo_description: parsed.data.seo_description,
        seo_keywords: keywords,
      })
      .eq("singleton_key", "main");

    setSaving(false);

    if (saveError) {
      setError(saveError.message);
      return;
    }

    setStatus("Published");
    setSettings((current) => (current ? { ...current, ...parsed.data, seo_keywords: keywords } : current));
  };

  const totalDocuments = 1 + counts.services + counts.packages + counts.protocol + counts.prospects + counts.requests;
  const activePublished = 1 + counts.services + counts.packages;

  return (
    <main className="h-full w-full overflow-hidden px-[34px] py-[34px]">
      <div className="grid h-full grid-cols-[minmax(560px,0.78fr)_minmax(760px,1.22fr)] gap-[29px]">
        <div className="min-w-0">
          <div className="mb-[22px]">
            <h1 className="text-[28px] font-semibold uppercase tracking-[0.03em] text-[#f5f1e8]">
              Command Center <span className="text-[#f2c75c]">·</span>
            </h1>
            <p className="mt-2 text-[14px] text-[#c9c3b5]">Manage the Balkan Veil public interface and protocols.</p>
          </div>

          {error ? (
            <div className="mb-5 rounded-[8px] border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">{error}</div>
          ) : null}

          <div className="grid grid-cols-4 gap-[13px]">
            <StatusCard icon={<FileText size={20} />} value={String(totalDocuments).padStart(2, "0")} label="Documents" meta="Total" />
            <StatusCard icon={<BarChart3 size={20} />} value={String(activePublished).padStart(2, "0")} label="Active" meta="Published" tone="green" />
            <StatusCard icon={<Boxes size={20} />} value={String(counts.requests).padStart(2, "0")} label="Requests" meta="New Access" />
            <StatusCard icon={<PenLine size={20} />} value={`${counts.pipelineValue.toLocaleString()}`} label="Pipeline" meta="Estimated EUR" />
          </div>

          <Panel className="mt-[20px] p-4">
            <div className="mb-4 flex items-center gap-3 px-2">
              <div className="grid h-8 w-8 place-items-center rounded-[7px] border border-[#d4af37]/25 text-[#f2c75c]">
                <Sparkles size={17} />
              </div>
              <h2 className="text-[15px] uppercase tracking-[0.08em] text-[#f5f1e8]">Quick Access</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {([
                ["Edit Home", "Interface", PenLine, "/admin/home-interface"],
                ["Edit Services", "Protocols", Link2, "/admin/services"],
                ["Edit Packages", "Retainer Vault", Package, "/admin/packages"],
                ["Edit Protocol", "Execution Steps", Wrench, "/admin/protocol"],
                ["Access Requests", "Leads", Lock, "/admin/access-requests"],
                ["Navigation", "Matrix", Navigation, "/admin/navigation"],
              ] satisfies QuickAccessItem[]).map(([label, meta, Icon, href]) => (
                <button
                  type="button"
                  key={String(label)}
                  onClick={() => navigate(String(href))}
                  className="flex min-h-[62px] items-center gap-4 rounded-[8px] border border-white/[0.08] bg-[#101218]/80 px-4 text-left transition hover:border-[#d4af37]/35 hover:bg-[#13161d]"
                >
                  <Icon size={24} className="text-[#f2c75c]" />
                  <span>
                    <span className="block text-[14px] font-semibold text-[#f5f1e8]">{label}</span>
                    <span className="mt-1 block text-[12px] text-[#a8a8a8]">{meta}</span>
                  </span>
                </button>
              ))}
            </div>
          </Panel>

          <div className="mt-[18px] grid grid-cols-[1.15fr_0.85fr] gap-4">
            <Panel className="p-5">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-[7px] border border-[#d4af37]/25 text-[#f2c75c]">
                    <Clock3 size={17} />
                  </div>
                  <h2 className="text-[15px] uppercase tracking-[0.08em] text-[#f5f1e8]">Recent Changes</h2>
                </div>
                <span className="text-[#a8a8a8]">&gt;</span>
              </div>
              <div className="space-y-4">
                {[
                  ["Updated Veil Growth package", "Retainer Vault", "2h ago"],
                  ["Modified Home Hero section", "Home Interface", "4h ago"],
                  ["Changed Studio Status", "Site Settings", "1d ago"],
                  ["Updated Build page content", "Navigation Matrix", "1d ago"],
                  ["Added new protocol step", "Execution Protocol", "2d ago"],
                ].map(([title, area, time]) => (
                  <div key={title} className="grid grid-cols-[34px_1fr_auto] items-center gap-3">
                    <div className="grid h-8 w-8 place-items-center rounded-full border border-white/[0.08] bg-white/[0.04] text-[#f2c75c]">
                      <FileText size={14} />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#f5f1e8]">{title}</p>
                      <p className="mt-1 text-[12px] text-[#a8a8a8]">{area}</p>
                    </div>
                    <span className="text-[12px] text-[#a8a8a8]">{time}</span>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel className="p-5">
              <h2 className="mb-5 text-[15px] uppercase tracking-[0.08em] text-[#f5f1e8]">Site Status</h2>
              <div className="rounded-[9px] border border-white/[0.08] bg-[#08090c]/86 p-5 text-center">
                <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full border border-[#d4af37]/35 text-[#f2c75c]">
                  <Gauge size={22} />
                </div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#a8a8a8]">
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-400" />
                  Public Interface
                </p>
                <p className="mt-2 text-[28px] uppercase text-[#f5f1e8]">Live</p>
              </div>
              <div className="divide-y divide-white/[0.07] text-[13px]">
                <div className="flex justify-between py-4">
                  <span className="text-[#a8a8a8]">Studio Status</span>
                  <strong className="max-w-[150px] text-right font-medium text-[#f5f1e8]">{settings?.studio_status || form.studio_status}</strong>
                </div>
                <div className="flex justify-between py-4">
                  <span className="text-[#a8a8a8]">System Health</span>
                  <strong className="font-medium text-green-400">Optimal</strong>
                </div>
                <div className="flex justify-between py-4">
                  <span className="text-[#a8a8a8]">Visitors (24h)</span>
                  <strong className="font-medium text-[#f5f1e8]">842</strong>
                </div>
              </div>
              <svg viewBox="0 0 210 52" className="mt-2 h-14 w-full text-[#f2c75c]">
                <polyline fill="none" stroke="currentColor" strokeWidth="2" points="0,36 18,42 36,28 54,22 72,39 90,31 108,16 126,27 144,22 162,34 180,24 198,31 210,28" />
                {[0, 18, 36, 54, 72, 90, 108, 126, 144, 162, 180, 198].map((x, i) => (
                  <circle key={x} cx={x} cy={[36, 42, 28, 22, 39, 31, 16, 27, 22, 34, 24, 31][i]} r="3" fill="#050608" stroke="currentColor" strokeWidth="2" />
                ))}
              </svg>
            </Panel>
          </div>
        </div>

        <Panel className="-mt-[34px] min-w-0 overflow-hidden">
          <div className="flex h-[82px] items-center justify-between border-b border-white/[0.08] px-7">
            <div className="flex items-center gap-4">
              <h2 className="text-[22px] font-semibold text-[#f5f1e8]">Site Settings</h2>
              <span className="text-[#5b5e66]">-</span>
              <span className="rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-[12px] text-green-400">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
                {status}
              </span>
              <span className="text-[13px] text-[#a8a8a8]">· 2h ago</span>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" className="hidden h-11 items-center gap-2 rounded-[7px] border border-white/[0.12] bg-[#101218] px-5 text-[14px] font-semibold text-[#f5f1e8] md:inline-flex">
                <Eye size={17} />
                Preview
              </button>
              <button
                type="button"
                onClick={saveChanges}
                disabled={saving || loading}
                className="inline-flex h-11 items-center gap-2 rounded-[7px] bg-[linear-gradient(180deg,#ffe19a,#d4af37)] px-5 text-[14px] font-bold text-[#050608] shadow-[0_0_35px_rgba(212,175,55,0.22)] disabled:opacity-70"
              >
                <Rocket size={16} />
                {saving ? "Publishing..." : "Publish Changes"}
              </button>
              <MoreVertical size={20} className="text-[#a8a8a8]" />
            </div>
          </div>

          <div className="grid grid-cols-[212px_minmax(0,1fr)]">
            <aside className="border-r border-white/[0.08] bg-[#08090c]/58">
              {([
                ["01. Command", "Studio Identity", Settings],
                ["02. Hero Interface", "Homepage", Home],
                ["03. Offer Display", "Prices & Value", Package],
                ["04. Contact Channels", "Social & Email", ShieldCheck],
                ["05. SEO & Visibility", "Search Engine", FileText],
              ] satisfies SectionNavItem[]).map(([title, sub, Icon], index) => (
                <button
                  type="button"
                  key={title}
                  className={[
                    "flex min-h-[74px] w-full items-center gap-4 border-b border-white/[0.06] px-7 text-left transition",
                    index === 0 ? "bg-[linear-gradient(90deg,rgba(212,175,55,0.16),transparent)]" : "hover:bg-white/[0.025]",
                  ].join(" ")}
                >
                  <Icon size={20} className="text-[#f2c75c]" />
                  <span>
                    <span className={index === 0 ? "block text-[13px] font-semibold text-[#f2c75c]" : "block text-[13px] text-[#f5f1e8]"}>
                      {title}
                    </span>
                    <span className="mt-1 block text-[12px] text-[#a8a8a8]">{sub}</span>
                  </span>
                </button>
              ))}
            </aside>

            <div className="max-h-[calc(100vh-138px)] overflow-y-auto px-7 py-7 [scrollbar-color:rgba(255,255,255,0.35)_rgba(255,255,255,0.05)]">
              <div className="rounded-[10px] border border-white/[0.08] bg-[#0b0d12]/82 p-7">
                <SectionTitle icon={<ShieldCheck size={18} />} title="01. Command / Studio Identity" />
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Tagline" name="tagline" value={form.tagline} onChange={updateField} />
                  <label className="block">
                    <span className="mb-2 block text-[12px] font-semibold text-[#f5f1e8]">Studio Status</span>
                    <select
                      className="w-full appearance-none rounded-[7px] border border-white/[0.12] !bg-[#0a0c10] px-4 py-3 text-[13px] text-[#f5f1e8] outline-none focus:border-[#d4af37]/60"
                      value={form.studio_status}
                      onChange={(event) => updateField("studio_status", event.target.value)}
                    >
                      <option>Accepting selected builds</option>
                      <option>Accepting new projects</option>
                      <option>Limited availability</option>
                      <option>Private queue only</option>
                    </select>
                  </label>
                </div>
                <div className="mt-5">
                  <Field label="Footer Statement" name="seo_description" value={form.seo_description} onChange={updateField} textarea />
                </div>
              </div>

              <div className="relative my-8 h-px bg-[#d4af37]/70">
                <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#d4af37] bg-[#0d0f14]" />
              </div>

              <div className="rounded-[10px] border border-white/[0.08] bg-[#0b0d12]/82 p-7">
                <SectionTitle icon={<Crown size={18} />} title="02. Hero Interface" />
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Hero Eyebrow" name="hero_eyebrow" value={form.hero_eyebrow} onChange={updateField} />
                  <Field label="Hero Headline" name="hero_headline" value={form.hero_headline} onChange={updateField} />
                </div>
                <div className="mt-5">
                  <Field label="Hero Description" name="hero_description" value={form.hero_description} onChange={updateField} textarea />
                </div>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <Field label="Primary CTA" name="primary_cta_label" value={form.primary_cta_label} pathName="primary_cta_href" pathValue={form.primary_cta_href} onChange={updateField} />
                  <Field label="Secondary CTA" name="secondary_cta_label" value={form.secondary_cta_label} pathName="secondary_cta_href" pathValue={form.secondary_cta_href} onChange={updateField} />
                </div>
              </div>

              <div className="relative my-8 h-px bg-[#d4af37]/70">
                <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#d4af37] bg-[#0d0f14]" />
              </div>

              <div className="rounded-[10px] border border-white/[0.08] bg-[#0b0d12]/82 p-7">
                <SectionTitle icon={<Package size={18} />} title="03. Offer Display" />
                <div className="grid gap-5 md:grid-cols-3">
                  <Field label="Starting Price" name="starting_price" value={form.starting_price} onChange={updateField} />
                  <Field label="Website Value" name="standard_website_value" value={form.standard_website_value} onChange={updateField} />
                  <Field label="Launch Setup" name="partner_launch_setup" value={form.partner_launch_setup} onChange={updateField} />
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </main>
  );
}
