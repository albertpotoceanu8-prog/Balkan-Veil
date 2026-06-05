import type { ReactNode } from "react";

type DossierPanelProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  index?: string;
  children?: ReactNode;
  className?: string;
};

export function DossierPanel({ eyebrow, title, text, index, children, className = "" }: DossierPanelProps) {
  return (
    <article className={`operator-surface relative overflow-hidden border border-stone-800 bg-stone-950/55 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition duration-500 hover:border-amber-300/30 md:p-8 ${className}`}>
      <div className="pointer-events-none absolute inset-0 operator-grid opacity-20" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-0 h-16 w-16 border-b border-l border-amber-300/20" aria-hidden="true" />
      <div className="pointer-events-none absolute left-5 top-5 flex gap-1" aria-hidden="true">
        <span className="h-1.5 w-1.5 bg-emerald-300/55" />
        <span className="h-1.5 w-1.5 bg-red-300/45" />
      </div>
      <div className="flex items-start justify-between gap-6">
        <div>
          {eyebrow ? <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber-300/70">{eyebrow}</p> : null}
          <h3 className="mt-4 font-serif text-3xl leading-tight text-stone-100">{title}</h3>
        </div>
        {index ? <span className="font-serif text-5xl leading-none text-amber-100/15">{index}</span> : null}
      </div>
      {text ? <p className="mt-5 text-base leading-7 text-stone-500">{text}</p> : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </article>
  );
}
