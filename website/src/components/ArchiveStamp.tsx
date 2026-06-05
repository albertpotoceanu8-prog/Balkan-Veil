type ArchiveStampProps = {
  code: string;
  label: string;
  status?: string;
  align?: "left" | "right";
  className?: string;
};

export function ArchiveStamp({ code, label, status, align = "left", className = "" }: ArchiveStampProps) {
  return (
    <div className={`inline-flex max-w-full flex-col gap-2 border border-amber-300/25 bg-black/45 px-4 py-3 text-xs uppercase tracking-[0.24em] text-amber-100/85 ${align === "right" ? "items-end text-right" : "items-start"} ${className}`}>
      <span className="font-serif text-2xl normal-case tracking-normal text-amber-100">{code}</span>
      <span className="text-stone-500">{label}</span>
      {status ? <span className="border-t border-amber-300/15 pt-2 font-mono text-[10px] text-amber-300/70">{status}</span> : null}
    </div>
  );
}
