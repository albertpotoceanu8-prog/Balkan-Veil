import React from "react";
import { z } from "zod";

import { AdminPanel, EmptyState, Field, ModuleHeader, StatusMessage, inputClass } from "@/admin/AdminModule";
import { supabase } from "@/lib/supabase/client";
import type { ProtocolStep } from "@/types/database";

type ProtocolForm = {
  id?: string;
  step_number: number;
  title: string;
  codename: string;
  short_description: string;
  output: string;
  active: boolean;
  display_order: number;
};

const schema = z.object({
  step_number: z.number().min(1),
  title: z.string().min(2),
  codename: z.string().optional(),
  short_description: z.string().optional(),
  output: z.string().optional(),
  active: z.boolean(),
  display_order: z.number(),
});

const empty: ProtocolForm = {
  step_number: 1,
  title: "",
  codename: "",
  short_description: "",
  output: "",
  active: true,
  display_order: 1,
};

function toForm(item: ProtocolStep): ProtocolForm {
  return {
    id: item.id,
    step_number: item.step_number,
    title: item.title,
    codename: item.codename || "",
    short_description: item.short_description || "",
    output: item.output || "",
    active: item.active,
    display_order: item.display_order,
  };
}

export function AdminProtocol() {
  const [items, setItems] = React.useState<ProtocolStep[]>([]);
  const [form, setForm] = React.useState<ProtocolForm>(empty);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState("");

  const load = React.useCallback(async () => {
    setLoading(true);
    const { data, error: loadError } = await supabase
      .from("protocol_steps")
      .select("*")
      .order("step_number", { ascending: true })
      .returns<ProtocolStep[]>();
    setItems(data || []);
    setError(loadError?.message || "");
    setLoading(false);
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const update = <K extends keyof ProtocolForm>(key: K, value: ProtocolForm[K]) => {
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
      step_number: parsed.data.step_number,
      title: parsed.data.title,
      codename: parsed.data.codename || null,
      short_description: parsed.data.short_description || null,
      output: parsed.data.output || null,
      active: parsed.data.active,
      display_order: parsed.data.display_order,
    };

    const result = form.id
      ? await supabase.from("protocol_steps").update(payload).eq("id", form.id)
      : await supabase.from("protocol_steps").insert(payload);

    setSaving(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }

    setForm(empty);
    setStatus("Protocol step saved.");
    load();
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this protocol step?")) return;
    const { error: deleteError } = await supabase.from("protocol_steps").delete().eq("id", id);
    if (deleteError) setError(deleteError.message);
    else load();
  };

  return (
    <main className="h-full overflow-y-auto p-8">
      <ModuleHeader eyebrow="VEIL OS / Protocol" title="Execution Protocol" description="Manage the public build sequence and internal execution steps." />
      <StatusMessage error={error} status={status} />
      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <AdminPanel className="p-5">
          {loading ? <EmptyState text="Loading protocol." /> : items.length ? (
            <div className="space-y-3">
              {items.map((item) => (
                <article key={item.id} className="grid gap-4 border border-white/[0.07] bg-black/25 p-4 lg:grid-cols-[80px_1fr_auto]">
                  <div className="font-mono text-2xl text-[#D4AF37]">{String(item.step_number).padStart(2, "0")}</div>
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="mt-1 text-sm text-[#8E8878]">{item.codename || "Protocol step"}</p>
                    <p className="mt-3 text-sm leading-6 text-[#BDB39A]">{item.short_description}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <button className="border border-[#D4AF37]/25 px-3 py-2 text-xs text-[#D4AF37]" onClick={() => setForm(toForm(item))}>Edit</button>
                    <button className="border border-red-400/25 px-3 py-2 text-xs text-red-200" onClick={() => remove(item.id)}>Delete</button>
                  </div>
                </article>
              ))}
            </div>
          ) : <EmptyState text="No protocol steps yet." />}
        </AdminPanel>

        <AdminPanel className="p-5">
          <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37]">{form.id ? "Edit Step" : "New Step"}</h2>
          <form onSubmit={save} className="grid gap-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Step"><input className={inputClass} type="number" value={form.step_number} onChange={(e) => update("step_number", Number(e.target.value))} /></Field>
              <Field label="Order"><input className={inputClass} type="number" value={form.display_order} onChange={(e) => update("display_order", Number(e.target.value))} /></Field>
            </div>
            <Field label="Title"><input className={inputClass} value={form.title} onChange={(e) => update("title", e.target.value)} /></Field>
            <Field label="Codename"><input className={inputClass} value={form.codename} onChange={(e) => update("codename", e.target.value)} /></Field>
            <Field label="Short Description"><textarea className={inputClass} rows={3} value={form.short_description} onChange={(e) => update("short_description", e.target.value)} /></Field>
            <Field label="Output"><input className={inputClass} value={form.output} onChange={(e) => update("output", e.target.value)} /></Field>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.active} onChange={(e) => update("active", e.target.checked)} /> Active</label>
            <div className="flex gap-3">
              <button disabled={saving} className="bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-black">{saving ? "Saving..." : "Save Step"}</button>
              <button type="button" className="border border-white/[0.12] px-5 py-3 text-sm" onClick={() => setForm(empty)}>Clear</button>
            </div>
          </form>
        </AdminPanel>
      </div>
    </main>
  );
}
