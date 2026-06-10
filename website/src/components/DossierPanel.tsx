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
    <article className={`operator-surface relative overflow-hidden border border-[#241f16] bg-[#030303]/90 p-5 shadow-[inset_0_1px_0_rgba(212,175,55,0.07)] transition duration-500 hover:border-[#8f7835]/55 hover:bg-[#090704] md:p-8 ${className}`}>
      <div className="pointer-events-none absolute inset-0 operator-grid opacity-15" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-0 h-16 w-16 border-b border-l border-[#8f7835]/25" aria-hidden="true" />
      <div className="pointer-events-none absolute left-5 top-5 flex gap-1" aria-hidden="true">
        <span className="h-1.5 w-1.5 bg-[#b9924b]/55" />
        <span className="h-1.5 w-1.5 bg-[#51472f]" />
      </div>
      <div className="flex items-start justify-between gap-6">
        <div>
          {eyebrow ? <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7f6a39]">{eyebrow}</p> : null}
          <h3 className="mt-4 font-serif text-2xl leading-tight text-[#d8c8a7] md:text-3xl">{title}</h3>
        </div>
        {index ? <span className="font-serif text-4xl leading-none text-[#b9924b]/18 md:text-5xl">{index}</span> : null}
      </div>
      {text ? <p className="mt-5 text-base leading-7 text-[#756d5d]">{text}</p> : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </article>
  );
}
