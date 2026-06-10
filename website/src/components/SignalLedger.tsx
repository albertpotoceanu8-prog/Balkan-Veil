type SignalLedgerProps = {
  items: readonly string[];
  label?: string;
  startIndex?: number;
  className?: string;
};

export function SignalLedger({ items, label, startIndex = 1, className = "" }: SignalLedgerProps) {
  return (
    <div className={`border border-[#202224] bg-black/25 ${className}`}>
      {label ? <p className="border-b border-[#202224] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#a7a39a]">{label}</p> : null}
      <div className="divide-y divide-[#202224]">
        {items.map((item, index) => (
          <div key={item} className="grid grid-cols-[3rem_1fr_auto] items-center gap-4 px-4 py-4">
            <span className="font-mono text-xs text-[#a7a39a]">{String(startIndex + index).padStart(2, "0")}</span>
            <span className="font-serif text-lg leading-snug text-[#d1cec5] md:text-xl">{item}</span>
            <span className="hidden h-1.5 w-8 bg-[#7b7a73]/40 sm:block" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
