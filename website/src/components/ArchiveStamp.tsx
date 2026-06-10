type ArchiveStampProps = {
  code: string;
  label: string;
  status?: string;
  align?: "left" | "right";
  className?: string;
};

export function ArchiveStamp({ code, label, status, align = "left", className = "" }: ArchiveStampProps) {
  return (
    <div className={`inline-flex max-w-full flex-col gap-2 border border-[#3a301e] bg-black/45 px-4 py-3 text-xs uppercase tracking-[0.24em] text-[#d8c8a7] ${align === "right" ? "items-end text-right" : "items-start"} ${className}`}>
      <span className="font-serif text-2xl normal-case tracking-normal text-[#d8c8a7]">{code}</span>
      <span className="text-[#51472f]">{label}</span>
      {status ? <span className="border-t border-[#3a301e] pt-2 font-mono text-[10px] text-[#7f6a39]">{status}</span> : null}
    </div>
  );
}
