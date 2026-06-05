type SignalLedgerProps = {
  items: readonly string[];
  label?: string;
  startIndex?: number;
  className?: string;
};

export function SignalLedger({ items, label, startIndex = 1, className = "" }: SignalLedgerProps) {
  return (
    <div className={`border-y border-stone-800/90 ${className}`}>
      {label ? <p className="border-b border-stone-800/80 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-amber-300/70">{label}</p> : null}
      <div className="divide-y divide-stone-800/80">
        {items.map((item, index) => (
          <div key={item} className="grid grid-cols-[3.5rem_1fr] items-start gap-4 py-4">
            <span className="font-mono text-xs text-amber-300/60">{String(startIndex + index).padStart(2, "0")}</span>
            <span className="font-serif text-xl leading-snug text-stone-100">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
