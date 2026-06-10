type ArchiveStampProps = {
  code: string;
  label: string;
  status?: string;
  align?: "left" | "right";
  className?: string;
};

export function ArchiveStamp({ code, label, status, align = "left", className = "" }: ArchiveStampProps) {
  return (
    <div className={`inline-flex max-w-full flex-col gap-2 border border-[#33270f] bg-black/45 px-4 py-3 text-xs uppercase tracking-[0.24em] text-[#d8c7a3] ${align === "right" ? "items-end text-right" : "items-start"} ${className}`}>
      <span className="font-serif text-2xl normal-case tracking-normal text-[#d8c7a3]">{code}</span>
      <span className="text-[#75683d]">{label}</span>
      {status ? <span className="border-t border-[#33270f] pt-2 font-mono text-[10px] text-[#d4af37]">{status}</span> : null}
    </div>
  );
}
