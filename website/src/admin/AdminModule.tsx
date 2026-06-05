type ModuleHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
};

export function ModuleHeader({ eyebrow, title, description, action }: ModuleHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#D4AF37]">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-semibold">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#8E8878]">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function AdminPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`border border-[#D4AF37]/15 bg-[#0E0D0A]/90 shadow-[0_22px_80px_rgba(0,0,0,0.28)] ${className}`}>
      {children}
    </section>
  );
}

export function StatusMessage({ error, status }: { error?: string; status?: string }) {
  if (!error && !status) return null;

  return (
    <div
      className={[
        "mb-5 border p-4 text-sm",
        error
          ? "border-red-400/20 bg-red-400/10 text-red-200"
          : "border-green-400/20 bg-green-400/10 text-green-200",
      ].join(" ")}
    >
      {error || status}
    </div>
  );
}

export const inputClass =
  "w-full border border-[#D4AF37]/20 bg-[#050505] px-3 py-2.5 text-sm text-[#F3EAD2] outline-none transition placeholder:text-[#665f4e] focus:border-[#D4AF37]";

export const labelClass =
  "mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-[#8F7835]";

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}

export function EmptyState({ text }: { text: string }) {
  return (
    <div className="border border-dashed border-[#D4AF37]/20 bg-black/20 p-8 text-center text-sm text-[#8E8878]">
      {text}
    </div>
  );
}
