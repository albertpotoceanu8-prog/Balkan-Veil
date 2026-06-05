import React from "react";

import { AdminPanel, EmptyState, Field, ModuleHeader, StatusMessage, inputClass } from "@/admin/AdminModule";
import { supabase } from "@/lib/supabase/client";
import type { Prospect, ProspectStatus } from "@/types/database";

const statuses: ProspectStatus[] = ["found", "contacted", "replied", "call_booked", "proposal_sent", "won", "lost"];

const empty = {
  business_name: "",
  industry: "",
  location: "",
  website: "",
  instagram: "",
  observed_problem: "",
  opportunity: "",
  suggested_offer: "",
  estimated_value: 0,
  status: "found" as ProspectStatus,
  priority: 1,
  notes: "",
};

type ProspectForm = typeof empty & { id?: string };

export function AdminProspects() {
  const [items, setItems] = React.useState<Prospect[]>([]);
  const [form, setForm] = React.useState<ProspectForm>(empty);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState("");

  const load = React.useCallback(async () => {
    setLoading(true);
    const { data, error: loadError } = await supabase
      .from("prospects")
      .select("*")
      .order("updated_at", { ascending: false })
      .returns<Prospect[]>();
    setItems(data || []);
    setError(loadError?.message || "");
    setLoading(false);
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const setField = <K extends keyof ProspectForm>(key: K, value: ProspectForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const save = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.business_name.trim()) {
      setError("Business name is required.");
      return;
    }

    const payload = {
      business_name: form.business_name,
      industry: form.industry || null,
      location: form.location || null,
      website: form.website || null,
      instagram: form.instagram || null,
      observed_problem: form.observed_problem || null,
      opportunity: form.opportunity || null,
      suggested_offer: form.suggested_offer || null,
      estimated_value: Number(form.estimated_value) || null,
      status: form.status,
      priority: Number(form.priority) || 1,
      notes: form.notes || null,
    };

    const result = form.id
      ? await supabase.from("prospects").update(payload).eq("id", form.id)
      : await supabase.from("prospects").insert(payload);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    setForm(empty);
    setStatus("Prospect saved.");
    load();
  };

  const edit = (item: Prospect) => {
    setForm({
      id: item.id,
      business_name: item.business_name,
      industry: item.industry || "",
      location: item.location || "",
      website: item.website || "",
      instagram: item.instagram || "",
      observed_problem: item.observed_problem || "",
      opportunity: item.opportunity || "",
      suggested_offer: item.suggested_offer || "",
      estimated_value: item.estimated_value || 0,
      status: item.status,
      priority: item.priority,
      notes: item.notes || "",
    });
  };

  return (
    <main className="h-full overflow-y-auto p-8">
      <ModuleHeader eyebrow="VEIL OS / Pipeline" title="Prospect Vault" description="Track prospects, outreach status, opportunity and estimated value." />
      <StatusMessage error={error} status={status} />
      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <AdminPanel className="p-5">
          {loading ? <EmptyState text="Loading prospects." /> : items.length ? (
            <div className="space-y-3">
              {items.map((item) => (
                <article key={item.id} className="grid gap-4 border border-white/[0.07] bg-black/25 p-4 lg:grid-cols-[1fr_auto]">
                  <div>
                    <h2 className="text-lg font-semibold">{item.business_name}</h2>
                    <p className="mt-1 text-sm text-[#8E8878]">{item.industry || "Unknown industry"} · {item.location || "Unknown location"}</p>
                    <p className="mt-3 text-sm leading-6 text-[#BDB39A]">{item.observed_problem || item.opportunity || "No notes."}</p>
                    <div className="mt-3 flex gap-3 text-xs text-[#D4AF37]">
                      <span>{item.status}</span>
                      <span>Priority {item.priority}</span>
                      {item.estimated_value ? <span>{item.estimated_value} EUR</span> : null}
                    </div>
                  </div>
                  <button className="h-10 border border-[#D4AF37]/25 px-3 text-xs text-[#D4AF37]" onClick={() => edit(item)}>Edit</button>
                </article>
              ))}
            </div>
          ) : <EmptyState text="No prospects saved yet." />}
        </AdminPanel>
        <AdminPanel className="p-5">
          <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37]">{form.id ? "Edit Prospect" : "New Prospect"}</h2>
          <form onSubmit={save} className="grid gap-4">
            <Field label="Business Name"><input className={inputClass} value={form.business_name} onChange={(e) => setField("business_name", e.target.value)} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Industry"><input className={inputClass} value={form.industry} onChange={(e) => setField("industry", e.target.value)} /></Field>
              <Field label="Location"><input className={inputClass} value={form.location} onChange={(e) => setField("location", e.target.value)} /></Field>
            </div>
            <Field label="Website"><input className={inputClass} value={form.website} onChange={(e) => setField("website", e.target.value)} /></Field>
            <Field label="Instagram"><input className={inputClass} value={form.instagram} onChange={(e) => setField("instagram", e.target.value)} /></Field>
            <Field label="Observed Problem"><textarea className={inputClass} rows={2} value={form.observed_problem} onChange={(e) => setField("observed_problem", e.target.value)} /></Field>
            <Field label="Opportunity"><textarea className={inputClass} rows={2} value={form.opportunity} onChange={(e) => setField("opportunity", e.target.value)} /></Field>
            <Field label="Suggested Offer"><input className={inputClass} value={form.suggested_offer} onChange={(e) => setField("suggested_offer", e.target.value)} /></Field>
            <div className="grid grid-cols-3 gap-3">
              <Field label="Status"><select className={inputClass} value={form.status} onChange={(e) => setField("status", e.target.value as ProspectStatus)}>{statuses.map((option) => <option key={option}>{option}</option>)}</select></Field>
              <Field label="Priority"><input className={inputClass} type="number" value={form.priority} onChange={(e) => setField("priority", Number(e.target.value))} /></Field>
              <Field label="Value"><input className={inputClass} type="number" value={form.estimated_value} onChange={(e) => setField("estimated_value", Number(e.target.value))} /></Field>
            </div>
            <Field label="Notes"><textarea className={inputClass} rows={3} value={form.notes} onChange={(e) => setField("notes", e.target.value)} /></Field>
            <div className="flex gap-3">
              <button className="bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-black">Save Prospect</button>
              <button type="button" className="border border-white/[0.12] px-5 py-3 text-sm" onClick={() => setForm(empty)}>Clear</button>
            </div>
          </form>
        </AdminPanel>
      </div>
    </main>
  );
}
