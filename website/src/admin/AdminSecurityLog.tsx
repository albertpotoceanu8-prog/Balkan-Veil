import React from "react";
import { Plus, X } from "lucide-react";

import { LogView } from "@/admin/LogView";
import { logActivity } from "@/lib/adminLog";

const SECURITY_FILTERS = [
  { label: "All", actions: ["login", "logout", "login_failed", "security_note"] },
  { label: "Sessions", actions: ["login", "logout"] },
  { label: "Failed", actions: ["login_failed"] },
  { label: "Audit", actions: ["security_note"] },
];

const NOTE_CATEGORIES = ["Pen test", "Security audit", "Security review", "Access change", "Config change", "Incident", "Other"];

function AddSecurityNote({ onSaved }: { onSaved: () => void }) {
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState(NOTE_CATEGORIES[0]);
  const [note, setNote] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  const save = async () => {
    if (!note.trim()) return;
    setSaving(true);
    await logActivity({
      action: "security_note",
      entityType: category,
      metadata: { category, note: note.trim() },
    });
    setSaving(false);
    setNote("");
    setOpen(false);
    onSaved();
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 border border-[#D4AF37]/35 bg-[#100e08] px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-[#F2C75C] transition hover:border-[#D4AF37]/70"
      >
        <Plus size={14} />
        Note
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md border border-[#D4AF37]/25 bg-[#0d0b07] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.7)]">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-[#F2C75C]">Add security note</h3>
          <button type="button" onClick={() => setOpen(false)} className="text-[#8E8878] transition hover:text-[#F3EAD2]">
            <X size={18} />
          </button>
        </div>

        <label className="mb-4 block">
          <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-[#8F7835]">Type</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full appearance-none border border-[#D4AF37]/20 bg-[#050505] px-3 py-2.5 text-sm text-[#F3EAD2] outline-none focus:border-[#D4AF37]"
          >
            {NOTE_CATEGORIES.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="mb-6 block">
          <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-[#8F7835]">Details</span>
          <textarea
            value={note}
            rows={4}
            onChange={(event) => setNote(event.target.value)}
            placeholder="e.g. External pen test performed by … — 2 low findings, patched."
            className="w-full resize-y border border-[#D4AF37]/20 bg-[#050505] px-3 py-2.5 text-sm leading-6 text-[#F3EAD2] outline-none focus:border-[#D4AF37] placeholder:text-[#665f4e]"
          />
        </label>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => setOpen(false)} className="border border-white/[0.12] px-5 py-2.5 text-sm text-[#F3EAD2]">
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving || !note.trim()}
            className="bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-[#050505] disabled:opacity-60"
          >
            {saving ? "Saving..." : "Log note"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function AdminSecurityLog() {
  const [reloadKey, setReloadKey] = React.useState(0);

  return (
    <LogView
      channel="security-log"
      eyebrow="VEIL OS / Security"
      title="Security Log"
      description="Sign-ins, sign-outs, failed access attempts and manual security notes (audits, pen tests)."
      actions={["login", "logout", "login_failed", "security_note"]}
      filterGroups={SECURITY_FILTERS}
      emptyText="No security activity yet. Logins and security notes will appear here."
      headerExtra={<AddSecurityNote onSaved={() => setReloadKey((key) => key + 1)} />}
      reloadKey={reloadKey}
    />
  );
}
