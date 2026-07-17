import { supabase } from "@/lib/supabase/client";

type LogEntry = {
  action: string;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
};

/**
 * Best-effort security/audit log write into public.activity_log.
 * Never throws — logging must not block or break the primary admin action.
 * Requires an authenticated session (RLS: authenticated only); silently no-ops otherwise.
 */
export async function logActivity(entry: LogEntry): Promise<void> {
  try {
    const { data } = await supabase.auth.getUser();
    const actor = data.user?.email ?? "unknown";

    await supabase.from("activity_log").insert({
      actor,
      action: entry.action,
      entity_type: entry.entityType ?? null,
      entity_id: entry.entityId ?? null,
      metadata: entry.metadata ?? {},
    });
  } catch {
    // Swallow — audit logging is best-effort by design.
  }
}

/**
 * Log a failed sign-in attempt. Runs with no session, so it calls a SECURITY DEFINER
 * RPC (`log_failed_login`) that inserts the row with elevated privileges — RLS blocks a
 * direct anon insert. Best-effort; never throws.
 */
export async function logFailedLogin(email: string, reason?: string): Promise<void> {
  try {
    await supabase.rpc("log_failed_login", {
      attempted_email: email || "unknown",
      reason: reason ?? null,
    });
  } catch {
    // Swallow — must not interfere with the login error shown to the user.
  }
}

/** Human-readable labels for activity_log actions, shared across admin views. */
export const ACTIVITY_LABELS: Record<string, string> = {
  login: "Signed in",
  login_failed: "Failed sign-in",
  logout: "Signed out",
  content_published: "Published site content",
  settings_updated: "Updated site settings",
  prospect_saved: "Saved prospect",
  access_request_updated: "Updated access request",
  media_uploaded: "Uploaded media",
  media_deleted: "Deleted media",
};

export function activityLabel(action: string): string {
  return ACTIVITY_LABELS[action] ?? action;
}

export function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}
