import React from "react";
import { z } from "zod";

import { supabase } from "@/lib/supabase/client";
import type { SiteSettings } from "@/types/database";

const siteSettingsSchema = z.object({
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

type SettingsForm = z.infer<typeof siteSettingsSchema>;

const defaults: SettingsForm = {
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
  contact_email: "",
  instagram_url: "",
  tiktok_url: "",
  seo_title: "Balkan Veil - Websites and Small Systems",
  seo_description: "Websites, landing pages, simple dashboards and targeted automations.",
  seo_keywords: "websites, landing pages, simple dashboards, small business systems",
};

function toForm(settings: SiteSettings | null): SettingsForm {
  if (!settings) return defaults;

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

function Field({
  label,
  name,
  value,
  type = "text",
  onChange,
}: {
  label: string;
  name: keyof SettingsForm;
  value: string;
  type?: string;
  onChange: (name: keyof SettingsForm, value: string) => void;
}) {
  return (
    <label className="block">
      <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#8F7835]">
        {label}
      </span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        className="mt-3 w-full border border-[#D4AF37]/20 bg-[#050505] px-4 py-3 text-sm text-[#F3EAD2] outline-none transition focus:border-[#D4AF37]"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  value,
  rows = 4,
  onChange,
}: {
  label: string;
  name: keyof SettingsForm;
  value: string;
  rows?: number;
  onChange: (name: keyof SettingsForm, value: string) => void;
}) {
  return (
    <label className="block">
      <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#8F7835]">
        {label}
      </span>
      <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        className="mt-3 w-full resize-y border border-[#D4AF37]/20 bg-[#050505] px-4 py-3 text-sm leading-7 text-[#F3EAD2] outline-none transition focus:border-[#D4AF37]"
      />
    </label>
  );
}

export function AdminSiteSettings() {
  const [form, setForm] = React.useState<SettingsForm>(defaults);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");

      const { data, error: loadError } = await supabase
        .from("site_settings")
        .select("*")
        .eq("singleton_key", "main")
        .single<SiteSettings>();

      if (cancelled) return;

      if (loadError) {
        setError(loadError.message);
      } else {
        setForm(toForm(data));
      }

      setLoading(false);
    }

    load().catch((loadError: unknown) => {
      if (cancelled) return;
      setError(loadError instanceof Error ? loadError.message : "Could not load settings.");
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const updateField = (name: keyof SettingsForm, value: string) => {
    setStatus("");
    setError("");
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setStatus("");
    setError("");

    const parsed = siteSettingsSchema.safeParse(form);

    if (!parsed.success) {
      setSaving(false);
      setError("Please check required fields and URL formats.");
      return;
    }

    const keywords = parsed.data.seo_keywords
      ? parsed.data.seo_keywords
          .split(",")
          .map((keyword) => keyword.trim())
          .filter(Boolean)
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
  };

  return (
    <main className="h-full overflow-y-auto p-8">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#D4AF37]">
            Command Center / Site Settings
          </p>
          <h1 className="mt-4 text-4xl font-semibold">Site Settings</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#8E8878]">
            Control the public Balkan Veil interface: hero, offer, contact and
            SEO visibility.
          </p>
        </div>

        <div className="border border-green-400/20 bg-green-400/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-green-300">
          {status || (loading ? "Loading" : "Published")}
        </div>
      </div>

      {error ? (
        <div className="mb-6 border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <form onSubmit={submit} className="grid gap-6">
        <section className="border border-[#D4AF37]/15 bg-[#0E0D0A] p-6">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
            01 / Command
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Studio Status" name="studio_status" value={form.studio_status} onChange={updateField} />
            <Field label="Tagline" name="tagline" value={form.tagline} onChange={updateField} />
          </div>
        </section>

        <section className="border border-[#D4AF37]/15 bg-[#0E0D0A] p-6">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
            02 / Hero Interface
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Hero Eyebrow" name="hero_eyebrow" value={form.hero_eyebrow} onChange={updateField} />
            <Field label="Hero Headline" name="hero_headline" value={form.hero_headline} onChange={updateField} />
          </div>

          <div className="mt-5">
            <TextArea label="Hero Description" name="hero_description" value={form.hero_description} onChange={updateField} />
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <Field label="Primary CTA Label" name="primary_cta_label" value={form.primary_cta_label} onChange={updateField} />
            <Field label="Primary CTA URL" name="primary_cta_href" value={form.primary_cta_href} onChange={updateField} />
            <Field label="Secondary CTA Label" name="secondary_cta_label" value={form.secondary_cta_label} onChange={updateField} />
            <Field label="Secondary CTA URL" name="secondary_cta_href" value={form.secondary_cta_href} onChange={updateField} />
          </div>
        </section>

        <section className="border border-[#D4AF37]/15 bg-[#0E0D0A] p-6">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
            03 / Offer Display
          </p>

          <div className="grid gap-5 md:grid-cols-3">
            <Field label="Starting Price" name="starting_price" value={form.starting_price} onChange={updateField} />
            <Field label="Website Value" name="standard_website_value" value={form.standard_website_value} onChange={updateField} />
            <Field label="Partner Launch Setup" name="partner_launch_setup" value={form.partner_launch_setup} onChange={updateField} />
          </div>
        </section>

        <section className="border border-[#D4AF37]/15 bg-[#0E0D0A] p-6">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
            04 / Contact Channels
          </p>

          <div className="grid gap-5 md:grid-cols-3">
            <Field label="Contact Email" name="contact_email" type="email" value={form.contact_email || ""} onChange={updateField} />
            <Field label="Instagram URL" name="instagram_url" value={form.instagram_url || ""} onChange={updateField} />
            <Field label="TikTok URL" name="tiktok_url" value={form.tiktok_url || ""} onChange={updateField} />
          </div>
        </section>

        <section className="border border-[#D4AF37]/15 bg-[#0E0D0A] p-6">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
            05 / SEO Visibility
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="SEO Title" name="seo_title" value={form.seo_title} onChange={updateField} />
            <Field label="SEO Keywords" name="seo_keywords" value={form.seo_keywords || ""} onChange={updateField} />
          </div>

          <div className="mt-5">
            <TextArea label="SEO Description" name="seo_description" value={form.seo_description} rows={3} onChange={updateField} />
          </div>
        </section>

        <div className="sticky bottom-0 flex justify-end border-t border-[#D4AF37]/15 bg-[#050505]/90 py-5 backdrop-blur">
          <button
            type="submit"
            disabled={saving || loading}
            className="bg-[#D4AF37] px-7 py-3 text-sm font-semibold text-[#050505] disabled:opacity-70"
          >
            {saving ? "Publishing..." : "Publish Changes"}
          </button>
        </div>
      </form>
    </main>
  );
}
