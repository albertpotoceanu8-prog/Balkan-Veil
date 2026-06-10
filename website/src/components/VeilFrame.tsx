import type { ReactNode } from "react";

type VeilFrameProps = {
  children: ReactNode;
  label?: string;
  index?: string;
  className?: string;
};

export function VeilFrame({ children, label, index, className = "" }: VeilFrameProps) {
  return (
    <div className={`veil-frame operator-surface relative overflow-hidden border border-[#241d0c] bg-[#050302]/88 shadow-[0_0_70px_rgba(197,130,63,0.06),inset_0_1px_0_rgba(197,130,63,0.07)] ${className}`}>
      <div className="pointer-events-none absolute inset-4 border border-[#241d0c]/80" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 operator-grid opacity-16" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b99832]/55 to-transparent" aria-hidden="true" />
      {(label || index) ? (
        <div className="relative flex items-center justify-between gap-4 border-b border-[#241d0c] bg-black/25 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#75683d]">
          <span>{label}</span>
          <span className="text-[#d4af37]">{index}</span>
        </div>
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}
