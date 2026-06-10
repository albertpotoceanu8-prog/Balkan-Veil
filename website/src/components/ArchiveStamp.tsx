type ArchiveStampProps = {
  code: string;
  label: string;
  status?: string;
  align?: "left" | "right";
  className?: string;
};

export function ArchiveStamp({ code, label, status, align = "left", className = "" }: ArchiveStampProps) {
  return (
    <div className={`inline-flex max-w-full flex-col gap-2 border border-[#252729] bg-black/45 px-4 py-3 text-xs uppercase tracking-[0.24em] text-[#d1cec5] ${align === "right" ? "items-end text-right" : "items-start"} ${className}`}>
      <span className="font-serif text-2xl normal-case tracking-normal text-[#d1cec5]">{code}</span>
      <span className="text-[#696b68]">{label}</span>
      {status ? <span className="border-t border-[#252729] pt-2 font-mono text-[10px] text-[#a7a39a]">{status}</span> : null}
    </div>
  );
}
