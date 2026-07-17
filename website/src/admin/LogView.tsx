import React from "react";
import { KeyRound, LogOut, RefreshCw, ShieldAlert, ShieldCheck, Trash2, Upload, FileEdit } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { AdminPanel, EmptyState, ModuleHeader, StatusMessage } from "@/admin/AdminModule";
import { relativeTime } from "@/lib/adminLog";
import { supabase } from "@/lib/supabase/client";
import type { ActivityLog } from "@/types/database";

type Tone = "info" | "success" | "danger" | "neutral";

const ACTION_META: Record<string, { label: string; tone: Tone; Icon: LucideIcon }> = {
  login: { label: "Signed in", tone: "success", Icon: KeyRound },
  login_failed: { label: "Failed sign-in", tone: "danger", Icon: ShieldAlert },
  logout: { label: "Signed out", tone: "neutral", Icon: LogOut },
  security_note: { label: "Security note", tone: "info", Icon: ShieldCheck },
  content_published: { label: "Published site content", tone: "info", Icon: FileEdit },
  settings_updated: { label: "Updated site settings", tone: "info", Icon: FileEdit },
  prospect_saved: { label: "Saved prospect", tone: "info", Icon: FileEdit },
  access_request_updated: { label: "Updated access request", tone: "info", Icon: FileEdit },
  media_uploaded: { label: "Uploaded media", tone: "info", Icon: Upload },
  media_deleted: { label: "Deleted media", tone: "danger", Icon: Trash2 },
};

const TONE_CLASS: Record<Tone, string> = {
  info: "border-[#D4AF37]/25 text-[#F2C75C] bg-[#110f08]",
  success: "border-green-400/25 text-green-300 bg-green-400/5",
  danger: "border-red-400/30 text-red-300 bg-red-400/5",
  neutral: "border-white/[0.12] text-[#BDB39A] bg-white/[0.03]",
};

function metaFor(action: string) {
  return ACTION_META[action] ?? { label: action, tone: "neutral" as Tone, Icon: ShieldCheck };
}

function summarize(metadata: Record<string, unknown>): string {
  const entries = Object.entries(metadata || {});
  if (!entries.length) return "";
  return entries
    .slice(0, 4)
    .map(([key, value]) => `${key}: ${typeof value === "object" ? JSON.stringify(value) : String(value)}`)
    .join(" · ");
}

export type FilterGroup = { label: string; actions: string[] };

type LogViewProps = {
  channel: string;
  eyebrow: string;
  title: string;
  description: string;
  /** Only rows whose action is in this set are loaded and streamed. */
  actions: string[];
  emptyText: string;
  /** Optional chips to narrow the visible list. First group is the default (usually "All"). */
  filterGroups?: FilterGroup[];
  /** Optional extra control rendered in the header (e.g. an "Add note" button). */
  headerExtra?: React.ReactNode;
  /** Bumping this re-runs the initial load (e.g. after inserting a manual note). */
  reloadKey?: number;
};

export function LogView({ channel, eyebrow, title, description, actions, emptyText, filterGroups, headerExtra, reloadKey = 0 }: LogViewProps) {
  const [items, setItems] = React.useState<ActivityLog[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [live, setLive] = React.useState(false);
  const [activeFilter, setActiveFilter] = React.useState(0);

  // Stable set of actions for filtering (server query + realtime).
  const actionKey = actions.join(",");
  const actionSet = React.useMemo(() => new Set(actions), [actionKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const load = React.useCallback(async () => {
    setLoading(true);
    setError("");
    const { data, error: loadError } = await supabase
      .from("activity_log")
      .select("*")
      .in("action", actions)
      .order("created_at", { ascending: false })
      .limit(200)
      .returns<ActivityLog[]>();
    setItems(data || []);
    setError(loadError?.message || "");
    setLoading(false);
  }, [actionKey]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    load().catch((err: unknown) => setError(err instanceof Error ? err.message : "Could not load log."));
  }, [load, reloadKey]);

  const activeActions = filterGroups?.[activeFilter]?.actions ?? actions;
  const visible = activeFilter === 0 ? items : items.filter((item) => activeActions.includes(item.action));

  // Live tracking: stream new matching activity_log inserts as they happen.
  React.useEffect(() => {
    const ch = supabase
      .channel(channel)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "activity_log" },
        (payload) => {
          const row = payload.new as ActivityLog;
          if (!actionSet.has(row.action)) return;
          setItems((prev) => (prev.some((item) => item.id === row.id) ? prev : [row, ...prev].slice(0, 200)));
        },
      )
      .subscribe((status) => setLive(status === "SUBSCRIBED"));

    return () => {
      supabase.removeChannel(ch);
    };
  }, [channel, actionSet]);

  return (
    <main className="h-full overflow-y-auto p-4 md:p-8">
      <ModuleHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        action={
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
            {headerExtra}
            <span
              className={`inline-flex items-center gap-2 border px-3 py-2 font-mono text-xs uppercase tracking-[0.2em] ${
                live ? "border-green-400/25 bg-green-400/5 text-green-300" : "border-white/[0.12] bg-white/[0.03] text-[#8E8878]"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${live ? "animate-pulse bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.9)]" : "bg-[#8E8878]"}`} />
              {live ? "Live" : "Offline"}
            </span>
            <button
              type="button"
              onClick={() => load()}
              className="inline-flex items-center gap-2 border border-[#D4AF37]/25 bg-[#100e08] px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-[#F2C75C] transition hover:border-[#D4AF37]/60"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
          </div>
        }
      />
      <StatusMessage error={error} />

      {filterGroups && filterGroups.length > 1 ? (
        <div className="mb-5 flex flex-wrap gap-2">
          {filterGroups.map((group, index) => {
            const active = index === activeFilter;
            const count = index === 0 ? items.length : items.filter((item) => group.actions.includes(item.action)).length;
            return (
              <button
                key={group.label}
                type="button"
                onClick={() => setActiveFilter(index)}
                className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition ${
                  active
                    ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#F3EAD2]"
                    : "border-[#D4AF37]/15 text-[#8E8878] hover:border-[#D4AF37]/40 hover:text-[#F3EAD2]"
                }`}
              >
                {group.label}
                <span className={`ml-2 ${active ? "text-[#F2C75C]" : "text-[#6f6a58]"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      <AdminPanel className="p-4 md:p-5">
        {loading ? (
          <EmptyState text="Loading log." />
        ) : visible.length ? (
          <div className="space-y-3">
            {visible.map((item) => {
              const meta = metaFor(item.action);
              const detail = summarize(item.metadata);
              return (
                <article
                  key={item.id}
                  className="flex flex-col gap-3 border border-white/[0.07] bg-black/25 p-4 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-[8px] border ${TONE_CLASS[meta.tone]}`}>
                      <meta.Icon size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#F3EAD2]">{meta.label}</p>
                      <p className="mt-1 truncate text-xs text-[#8E8878]">
                        {item.actor || "unknown"}
                        {item.entity_type ? ` · ${item.entity_type}` : ""}
                      </p>
                      {detail ? <p className="mt-2 break-words text-xs text-[#BDB39A]">{detail}</p> : null}
                    </div>
                  </div>
                  <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-[#8E8878] sm:pl-3">
                    {relativeTime(item.created_at)}
                  </span>
                </article>
              );
            })}
          </div>
        ) : (
          <EmptyState text={items.length ? "No entries in this filter." : emptyText} />
        )}
      </AdminPanel>
    </main>
  );
}

/** Auth/access + manual security events for the Security Log. */
export const SECURITY_ACTIONS = ["login", "logout", "login_failed", "security_note"];

/** Content/data change events for the Activity Log. */
export const ACTIVITY_ACTIONS = [
  "content_published",
  "settings_updated",
  "prospect_saved",
  "access_request_updated",
  "media_uploaded",
  "media_deleted",
];
