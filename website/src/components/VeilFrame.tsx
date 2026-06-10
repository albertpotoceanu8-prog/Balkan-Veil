import type { ReactNode } from "react";

type VeilFrameProps = {
  children: ReactNode;
  label?: string;
  index?: string;
  className?: string;
};

export function VeilFrame({ children, label, index, className = "" }: VeilFrameProps) {
  return (
    <div className={`veil-frame operator-surface relative overflow-hidden border border-[#2a2418] bg-[#030303]/88 shadow-[0_0_70px_rgba(185,146,75,0.06),inset_0_1px_0_rgba(212,175,55,0.07)] ${className}`}>
      <div className="pointer-events-none absolute inset-4 border border-[#241f16]/80" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 operator-grid opacity-16" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8f7835]/55 to-transparent" aria-hidden="true" />
      {(label || index) ? (
        <div className="relative flex items-center justify-between gap-4 border-b border-[#241f16] bg-black/25 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#51472f]">
          <span>{label}</span>
          <span className="text-[#7f6a39]">{index}</span>
        </div>
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}
