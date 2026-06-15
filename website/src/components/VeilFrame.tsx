import type { ReactNode } from "react";

type VeilFrameProps = {
  children: ReactNode;
  label?: string;
  index?: string;
  className?: string;
};

export function VeilFrame({ children, label, index, className = "" }: VeilFrameProps) {
  return (
    <div className={`veil-frame operator-surface relative overflow-hidden border border-[#202224] bg-[#030201] shadow-[inset_0_1px_0_rgba(185,138,50,0.08)] ${className}`}>
      <div className="pointer-events-none absolute inset-4 border border-[#202224]/80" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(185,138,50,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] [background-size:44px_44px]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7d6a45]/55 to-transparent" aria-hidden="true" />
      {(label || index) ? (
        <div className="relative flex items-center justify-between gap-4 border-b border-[#202224] bg-black/24 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#6f6654]">
          <span>{label}</span>
          <span className="text-[#b98a32]">{index}</span>
        </div>
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}
