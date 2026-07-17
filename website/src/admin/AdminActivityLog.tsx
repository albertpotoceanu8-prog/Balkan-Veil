import { ACTIVITY_ACTIONS, LogView } from "@/admin/LogView";

export function AdminActivityLog() {
  return (
    <LogView
      channel="activity-log"
      eyebrow="VEIL OS / Activity"
      title="Activity Log"
      description="Changes to the public site: content, settings, prospects, requests and media."
      actions={ACTIVITY_ACTIONS}
      emptyText="No changes recorded yet. Publishes, edits and uploads will appear here."
    />
  );
}
