import React from "react";
import { z } from "zod";

import { AdminPanel, EmptyState, Field, ModuleHeader, StatusMessage, inputClass } from "@/admin/AdminModule";
import { supabase } from "@/lib/supabase/client";
import type { RetainerPackage } from "@/types/database";

type PackageForm = {
  id?: string;
  name: string;
  codename: string;
  monthly_price: string;
  short_description: string;
  best_for: string;
  features: string;
  active: boolean;
  recommended: boolean;
  display_order: number;
};

const schema = z.object({
  name: z.string().min(2),
  codename: z.string().optional(),
  monthly_price: z.string().min(1),
  short_description: z.string().optional(),
  best_for: z.string().optional(),
  features: z.string().optional(),
  active: z.boolean(),
  recommended: z.boolean(),
  display_order: z.number(),
});

const empty: PackageForm = {
  name: "",
  codename: "",
  monthly_price: "",
  short_description: "",
  best_for: "",
  features: "",
  active: true,
  recommended: false,
  display_order: 1,
};

function toForm(item: RetainerPackage): PackageForm {
  return {
    id: item.id,
    name: item.name,
    codename: item.codename || "",
    monthly_price: item.monthly_price,
    short_description: item.short_description || "",
    best_for: item.best_for || "",
    features: item.features.join(", "),
    active: item.active,
    recommended: item.recommended,
    display_order: item.display_order,
  };
}

export function AdminPackages() {
  const [items, setItems] = React.useState<RetainerPackage[]>([]);
  const [form, setForm] = React.useState<PackageForm>(empty);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState("");

  const load = React.useCallback(async () => {
    setLoading(true);
    const { data, error: loadError } = await supabase
      .from("retainer_packages")
      .select("*")
      .order("display_order", { ascending: true })
      .returns<RetainerPackage[]>();
    setItems(data || []);
    setError(loadError?.message || "");
    setLoading(false);
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const update = <K extends keyof PackageForm>(key: K, value: PackageForm[K]) => {
    setStatus("");
    setError("");
    setForm((current) => ({ ...current, [key]: value }));
  };

  const save = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setSaving(false);
      setError("Check required fields.");
      return;
    }

    const payload = {
      name: parsed.data.name,
      codename: parsed.data.codename || null,
      monthly_price: parsed.data.monthly_price,
      short_description: parsed.data.short_description || null,
      best_for: parsed.data.best_for || null,
      features: (parsed.data.features || "").split(",").map((item) => item.trim()).filter(Boolean),
      active: parsed.data.active,
      recommended: parsed.data.recommended,
      display_order: parsed.data.display_order,
    };

    const result = form.id
      ? await supabase.from("retainer_packages").update(payload).eq("id", form.id)
      : await supabase.from("retainer_packages").insert(payload);

    setSaving(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }

    setForm(empty);
    setStatus("Package saved.");
    load();
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this package?")) return;
    const { error: deleteError } = await supabase.from("retainer_packages").delete().eq("id", id);
    if (deleteError) setError(deleteError.message);
    else load();
  };

  return (
    <main className="h-full overflow-y-auto p-8">
      <ModuleHeader eyebrow="VEIL OS / Retainers" title="Retainer Vault" description="Manage monthly care, growth and authority packages." />
      <StatusMessage error={error} status={status} />
      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <AdminPanel className="p-5">
          {loading ? <EmptyState text="Loading packages." /> : items.length ? (
            <div className="grid gap-4 lg:grid-cols-3">
              {items.map((item) => (
                <article key={item.id} className="border border-white/[0.07] bg-black/25 p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8F7835]">{item.codename || "Package"}</p>
                  <h2 className="mt-3 text-xl font-semibold">{item.name}</h2>
                  <p className="mt-2 text-[#D4AF37]">{item.monthly_price}</p>
                  <p className="mt-3 text-sm leading-6 text-[#BDB39A]">{item.short_description}</p>
                  <div className="mt-4 flex gap-2">
                    {item.recommended ? <span className="text-xs text-[#D4AF37]">Recommended</span> : null}
                    {!item.active ? <span className="text-xs text-red-300">Inactive</span> : null}
                  </div>
                  <div className="mt-5 flex gap-2">
                    <button className="border border-[#D4AF37]/25 px-3 py-2 text-xs text-[#D4AF37]" onClick={() => setForm(toForm(item))}>Edit</button>
                    <button className="border border-red-400/25 px-3 py-2 text-xs text-red-200" onClick={() => remove(item.id)}>Delete</button>
                  </div>
                </article>
              ))}
            </div>
          ) : <EmptyState text="No packages yet." />}
        </AdminPanel>

        <AdminPanel className="p-5">
          <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37]">{form.id ? "Edit Package" : "New Package"}</h2>
          <form onSubmit={save} className="grid gap-4">
            <Field label="Name"><input className={inputClass} value={form.name} onChange={(e) => update("name", e.target.value)} /></Field>
            <Field label="Codename"><input className={inputClass} value={form.codename} onChange={(e) => update("codename", e.target.value)} /></Field>
            <Field label="Monthly Price"><input className={inputClass} value={form.monthly_price} onChange={(e) => update("monthly_price", e.target.value)} /></Field>
            <Field label="Short Description"><textarea className={inputClass} rows={3} value={form.short_description} onChange={(e) => update("short_description", e.target.value)} /></Field>
            <Field label="Best For"><input className={inputClass} value={form.best_for} onChange={(e) => update("best_for", e.target.value)} /></Field>
            <Field label="Features, comma separated"><textarea className={inputClass} rows={3} value={form.features} onChange={(e) => update("features", e.target.value)} /></Field>
            <div className="grid grid-cols-3 gap-3">
              <Field label="Order"><input className={inputClass} type="number" value={form.display_order} onChange={(e) => update("display_order", Number(e.target.value))} /></Field>
              <label className="flex items-center gap-2 pt-6 text-sm"><input type="checkbox" checked={form.active} onChange={(e) => update("active", e.target.checked)} /> Active</label>
              <label className="flex items-center gap-2 pt-6 text-sm"><input type="checkbox" checked={form.recommended} onChange={(e) => update("recommended", e.target.checked)} /> Recommended</label>
            </div>
            <div className="flex gap-3">
              <button disabled={saving} className="bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-black">{saving ? "Saving..." : "Save Package"}</button>
              <button type="button" className="border border-white/[0.12] px-5 py-3 text-sm" onClick={() => setForm(empty)}>Clear</button>
            </div>
          </form>
        </AdminPanel>
      </div>
    </main>
  );
}
