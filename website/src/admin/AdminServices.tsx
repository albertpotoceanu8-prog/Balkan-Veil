import React from "react";
import { z } from "zod";

import { AdminPanel, EmptyState, Field, ModuleHeader, StatusMessage, inputClass } from "@/admin/AdminModule";
import { supabase } from "@/lib/supabase/client";
import type { ServiceProtocol } from "@/types/database";

type ServiceForm = {
  id?: string;
  name: string;
  slug: string;
  codename: string;
  category: string;
  short_description: string;
  primary_outcome: string;
  starting_price: string;
  features: string;
  active: boolean;
  featured: boolean;
  display_order: number;
};

const schema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  codename: z.string().optional(),
  category: z.string().min(2),
  short_description: z.string().optional(),
  primary_outcome: z.string().optional(),
  starting_price: z.string().optional(),
  features: z.string().optional(),
  active: z.boolean(),
  featured: z.boolean(),
  display_order: z.number(),
});

const empty: ServiceForm = {
  name: "",
  slug: "",
  codename: "",
  category: "website",
  short_description: "",
  primary_outcome: "",
  starting_price: "",
  features: "",
  active: true,
  featured: false,
  display_order: 1,
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toForm(service: ServiceProtocol): ServiceForm {
  return {
    id: service.id,
    name: service.name,
    slug: service.slug || slugify(service.name),
    codename: service.codename || "",
    category: service.category,
    short_description: service.short_description || "",
    primary_outcome: service.primary_outcome || "",
    starting_price: service.starting_price || "",
    features: service.features.join(", "),
    active: service.active,
    featured: service.featured,
    display_order: service.display_order,
  };
}

export function AdminServices() {
  const [items, setItems] = React.useState<ServiceProtocol[]>([]);
  const [form, setForm] = React.useState<ServiceForm>(empty);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState("");

  const load = React.useCallback(async () => {
    setLoading(true);
    const { data, error: loadError } = await supabase
      .from("service_protocols")
      .select("*")
      .order("display_order", { ascending: true })
      .returns<ServiceProtocol[]>();

    setItems(data || []);
    setError(loadError?.message || "");
    setLoading(false);
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const update = <K extends keyof ServiceForm>(key: K, value: ServiceForm[K]) => {
    setStatus("");
    setError("");
    setForm((current) => ({
      ...current,
      [key]: value,
      ...(key === "name" && !current.id ? { slug: slugify(String(value)) } : {}),
    }));
  };

  const save = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setStatus("");

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setSaving(false);
      setError("Check required fields.");
      return;
    }

    const payload = {
      name: parsed.data.name,
      slug: parsed.data.slug,
      codename: parsed.data.codename || null,
      category: parsed.data.category,
      short_description: parsed.data.short_description || null,
      primary_outcome: parsed.data.primary_outcome || null,
      starting_price: parsed.data.starting_price || null,
      features: (parsed.data.features || "").split(",").map((item) => item.trim()).filter(Boolean),
      active: parsed.data.active,
      featured: parsed.data.featured,
      display_order: parsed.data.display_order,
    };

    const result = form.id
      ? await supabase.from("service_protocols").update(payload).eq("id", form.id)
      : await supabase.from("service_protocols").insert(payload);

    setSaving(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }

    setForm(empty);
    setStatus("Service saved.");
    load();
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this service?")) return;
    const { error: deleteError } = await supabase.from("service_protocols").delete().eq("id", id);
    if (deleteError) setError(deleteError.message);
    else load();
  };

  return (
    <main className="h-full overflow-y-auto p-8">
      <ModuleHeader
        eyebrow="VEIL OS / Services"
        title="Service Protocols"
        description="Create, edit, feature and order the services shown on the public services page."
      />
      <StatusMessage error={error} status={status} />

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <AdminPanel className="p-5">
          {loading ? (
            <EmptyState text="Loading services." />
          ) : items.length ? (
            <div className="space-y-3">
              {items.map((item) => (
                <article key={item.id} className="grid gap-4 border border-white/[0.07] bg-black/25 p-4 lg:grid-cols-[1fr_auto]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-semibold text-[#F3EAD2]">{item.name}</h2>
                      {item.featured ? <span className="text-xs text-[#D4AF37]">Featured</span> : null}
                      {!item.active ? <span className="text-xs text-red-300">Inactive</span> : null}
                    </div>
                    <p className="mt-1 text-sm text-[#8E8878]">{item.codename || item.category}</p>
                    <p className="mt-3 text-sm leading-6 text-[#BDB39A]">{item.short_description}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <button className="border border-[#D4AF37]/25 px-3 py-2 text-xs text-[#D4AF37]" onClick={() => setForm(toForm(item))}>Edit</button>
                    <button className="border border-red-400/25 px-3 py-2 text-xs text-red-200" onClick={() => remove(item.id)}>Delete</button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState text="No services yet. Create the first protocol." />
          )}
        </AdminPanel>

        <AdminPanel className="p-5">
          <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
            {form.id ? "Edit Service" : "New Service"}
          </h2>
          <form onSubmit={save} className="grid gap-4">
            <Field label="Name"><input className={inputClass} value={form.name} onChange={(e) => update("name", e.target.value)} /></Field>
            <Field label="Slug"><input className={inputClass} value={form.slug} onChange={(e) => update("slug", e.target.value)} /></Field>
            <Field label="Codename"><input className={inputClass} value={form.codename} onChange={(e) => update("codename", e.target.value)} /></Field>
            <Field label="Category"><input className={inputClass} value={form.category} onChange={(e) => update("category", e.target.value)} /></Field>
            <Field label="Short Description"><textarea className={inputClass} rows={3} value={form.short_description} onChange={(e) => update("short_description", e.target.value)} /></Field>
            <Field label="Primary Outcome"><input className={inputClass} value={form.primary_outcome} onChange={(e) => update("primary_outcome", e.target.value)} /></Field>
            <Field label="Starting Price"><input className={inputClass} value={form.starting_price} onChange={(e) => update("starting_price", e.target.value)} /></Field>
            <Field label="Features, comma separated"><textarea className={inputClass} rows={3} value={form.features} onChange={(e) => update("features", e.target.value)} /></Field>
            <div className="grid grid-cols-3 gap-3">
              <Field label="Order"><input className={inputClass} type="number" value={form.display_order} onChange={(e) => update("display_order", Number(e.target.value))} /></Field>
              <label className="flex items-center gap-2 pt-6 text-sm"><input type="checkbox" checked={form.active} onChange={(e) => update("active", e.target.checked)} /> Active</label>
              <label className="flex items-center gap-2 pt-6 text-sm"><input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} /> Featured</label>
            </div>
            <div className="flex gap-3">
              <button disabled={saving} className="bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-black">{saving ? "Saving..." : "Save Service"}</button>
              <button type="button" className="border border-white/[0.12] px-5 py-3 text-sm" onClick={() => setForm(empty)}>Clear</button>
            </div>
          </form>
        </AdminPanel>
      </div>
    </main>
  );
}
