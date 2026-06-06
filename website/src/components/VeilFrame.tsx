import type { ReactNode } from "react";

type VeilFrameProps = {
  children: ReactNode;
  label?: string;
  index?: string;
  className?: string;
};

export function VeilFrame({ children, label, index, className = "" }: VeilFrameProps) {
  return (
    <div className={`veil-frame operator-surface relative overflow-hidden border border-amber-300/20 bg-black/55 shadow-[0_0_80px_rgba(212,175,55,0.08),inset_0_1px_0_rgba(255,255,255,0.035)] ${className}`}>
      <div className="pointer-events-none absolute inset-4 border border-stone-800/70" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 operator-grid opacity-22" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" aria-hidden="true" />
      {(label || index) ? (
        <div className="relative flex items-center justify-between gap-4 border-b border-stone-800/80 bg-black/25 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-stone-500">
          <span>{label}</span>
          <span className="text-amber-300/70">{index}</span>
        </div>
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}
