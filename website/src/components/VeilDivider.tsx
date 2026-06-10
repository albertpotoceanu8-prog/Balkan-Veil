type VeilDividerProps = {
  label?: string;
  className?: string;
};

export function VeilDivider({ label, className = "" }: VeilDividerProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden={label ? undefined : "true"}>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#241f16] to-[#8f7835]/35" />
      <span className="h-1.5 w-1.5 rotate-45 border border-[#8f7835]/60" />
      {label ? <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#756d5d]">{label}</span> : null}
      <span className="h-1.5 w-1.5 rotate-45 border border-[#8f7835]/60" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#241f16] to-[#8f7835]/35" />
    </div>
  );
}
