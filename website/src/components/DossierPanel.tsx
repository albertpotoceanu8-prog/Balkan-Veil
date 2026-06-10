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
    <article className={`operator-surface relative overflow-hidden border border-[#2a190b] bg-[#020100]/95 shadow-[inset_0_1px_0_rgba(197,130,63,0.08)] transition duration-500 hover:border-[#9a6936]/60 hover:bg-[#050302] ${className}`}>
      <div className="pointer-events-none absolute inset-0 operator-grid opacity-10" aria-hidden="true" />
      <div className="relative flex min-h-11 items-center justify-between gap-4 border-b border-[#2a190b] bg-black/35 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.22em] text-[#5a3718] md:px-5">
        <span className="truncate">{eyebrow || "BV / DOSSIER"}</span>
        <span className="text-[#b2753a]">{index || "ACTIVE"}</span>
      </div>
      <div className="relative grid md:grid-cols-[4.5rem_1fr]">
        <div className="hidden border-r border-[#2a190b] px-4 py-5 md:block">
          <p className="font-serif text-5xl leading-none text-[#c5823f]/18">{index || "BV"}</p>
          <div className="mt-8 h-14 border border-[#3a2410] bg-[linear-gradient(180deg,rgba(197,130,63,0.10),transparent)]" aria-hidden="true" />
        </div>
        <div className="p-5 md:p-7">
          <h3 className="font-serif text-2xl leading-tight text-[#d5c0a0] md:text-3xl">{title}</h3>
          {text ? <p className="mt-5 text-base leading-7 text-[#6c5e4e]">{text}</p> : null}
          {children ? <div className="mt-6 border-t border-[#2a190b] pt-5">{children}</div> : null}
        </div>
      </div>
    </article>
  );
}
