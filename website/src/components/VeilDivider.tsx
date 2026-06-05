type VeilDividerProps = {
  label?: string;
  className?: string;
};

export function VeilDivider({ label, className = "" }: VeilDividerProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden={label ? undefined : "true"}>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-800 to-amber-300/30" />
      <span className="h-1.5 w-1.5 rotate-45 border border-amber-300/60" />
      {label ? <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-stone-500">{label}</span> : null}
      <span className="h-1.5 w-1.5 rotate-45 border border-amber-300/60" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-stone-800 to-amber-300/30" />
    </div>
  );
}
