type ArchiveStampProps = {
  code: string;
  label: string;
  status?: string;
  align?: "left" | "right";
  className?: string;
};

export function ArchiveStamp({ code, label, status, align = "left", className = "" }: ArchiveStampProps) {
  return (
    <div className={`inline-flex max-w-full flex-col gap-2 border border-[#252729] bg-black/45 px-4 py-3 text-xs uppercase tracking-[0.24em] text-[#c8ad72] ${align === "right" ? "items-end text-right" : "items-start"} ${className}`}>
      <span className="font-serif text-2xl normal-case tracking-normal text-[#c8ad72]">{code}</span>
      <span className="text-[#6f6654]">{label}</span>
      {status ? <span className="border-t border-[#252729] pt-2 font-mono text-[10px] text-[#b98a32]">{status}</span> : null}
    </div>
  );
}
