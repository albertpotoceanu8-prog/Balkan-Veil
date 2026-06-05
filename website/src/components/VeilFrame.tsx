import type { ReactNode } from "react";

type VeilFrameProps = {
  children: ReactNode;
  label?: string;
  index?: string;
  className?: string;
};

export function VeilFrame({ children, label, index, className = "" }: VeilFrameProps) {
  return (
    <div className={`veil-frame relative overflow-hidden border border-amber-300/20 bg-black/50 shadow-[0_0_80px_rgba(212,175,55,0.08)] ${className}`}>
      <div className="pointer-events-none absolute inset-4 border border-stone-800/70" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(212,175,55,0.13),transparent_30%),linear-gradient(135deg,rgba(212,175,55,0.08),transparent_38%)]" aria-hidden="true" />
      {(label || index) ? (
        <div className="relative flex items-center justify-between gap-4 border-b border-stone-800/80 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-stone-500">
          <span>{label}</span>
          <span className="text-amber-300/70">{index}</span>
        </div>
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}
