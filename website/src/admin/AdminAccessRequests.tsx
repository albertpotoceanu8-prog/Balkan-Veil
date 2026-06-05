import React from "react";

import { AdminPanel, EmptyState, Field, ModuleHeader, StatusMessage, inputClass } from "@/admin/AdminModule";
import { supabase } from "@/lib/supabase/client";
import type { AccessRequest, AccessRequestStatus } from "@/types/database";

const statuses: AccessRequestStatus[] = ["new", "reviewed", "qualified", "rejected", "converted"];

export function AdminAccessRequests() {
  const [items, setItems] = React.useState<AccessRequest[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState("");

  const load = React.useCallback(async () => {
    setLoading(true);
    const { data, error: loadError } = await supabase
      .from("access_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .returns<AccessRequest[]>();
    setItems(data || []);
    setError(loadError?.message || "");
    setLoading(false);
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const update = async (id: string, patch: Partial<AccessRequest>) => {
    const { error: updateError } = await supabase.from("access_requests").update(patch).eq("id", id);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setStatus("Request updated.");
    load();
  };

  return (
    <main className="h-full overflow-y-auto p-8">
      <ModuleHeader eyebrow="VEIL OS / Access" title="Access Requests" description="Review public inquiries, qualify leads and add internal notes." />
      <StatusMessage error={error} status={status} />
      <AdminPanel className="p-5">
        {loading ? <EmptyState text="Loading requests." /> : items.length ? (
          <div className="space-y-4">
            {items.map((item) => (
              <article key={item.id} className="grid gap-5 border border-white/[0.07] bg-black/25 p-5 xl:grid-cols-[1fr_320px]">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#D4AF37]">{item.status}</span>
                    <span className="text-xs text-[#8E8878]">Priority {item.priority}</span>
                  </div>
                  <p className="mt-2 text-sm text-[#BDB39A]">{item.brand || "No brand"} · {item.project_type || "No project type"} · {item.budget_range || "No budget"}</p>
                  <p className="mt-4 text-sm leading-6 text-[#F3EAD2]">{item.message || "No message."}</p>
                  <p className="mt-4 text-xs text-[#8E8878]">{new Date(item.created_at).toLocaleString()}</p>
                </div>
                <div className="grid gap-3">
                  <Field label="Status">
                    <select className={inputClass} value={item.status} onChange={(e) => update(item.id, { status: e.target.value as AccessRequestStatus })}>
                      {statuses.map((option) => <option key={option}>{option}</option>)}
                    </select>
                  </Field>
                  <Field label="Priority">
                    <input className={inputClass} type="number" value={item.priority} onChange={(e) => update(item.id, { priority: Number(e.target.value) })} />
                  </Field>
                  <Field label="Internal Notes">
                    <textarea className={inputClass} rows={3} defaultValue={item.internal_notes || ""} onBlur={(e) => update(item.id, { internal_notes: e.target.value })} />
                  </Field>
                </div>
              </article>
            ))}
          </div>
        ) : <EmptyState text="No access requests yet." />}
      </AdminPanel>
    </main>
  );
}
