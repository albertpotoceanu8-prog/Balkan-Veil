type ArchiveStampProps = {
  code: string;
  label: string;
  status?: string;
  align?: "left" | "right";
  className?: string;
};

export function ArchiveStamp({ code, label, status, align = "left", className = "" }: ArchiveStampProps) {
  return (
    <div className={`inline-flex max-w-full flex-col gap-2 border border-[#3a2410] bg-black/45 px-4 py-3 text-xs uppercase tracking-[0.24em] text-[#d5c0a0] ${align === "right" ? "items-end text-right" : "items-start"} ${className}`}>
      <span className="font-serif text-2xl normal-case tracking-normal text-[#d5c0a0]">{code}</span>
      <span className="text-[#5a3718]">{label}</span>
      {status ? <span className="border-t border-[#3a2410] pt-2 font-mono text-[10px] text-[#b2753a]">{status}</span> : null}
    </div>
  );
}
