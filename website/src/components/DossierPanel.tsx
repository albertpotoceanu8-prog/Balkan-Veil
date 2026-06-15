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
    <article className={`operator-surface relative overflow-hidden border border-[#202224] bg-[#030201] shadow-[inset_0_1px_0_rgba(185,138,50,0.08)] transition duration-500 hover:border-[#7d6a45]/60 hover:bg-[#050302] ${className}`}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(185,138,50,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] [background-size:44px_44px]" aria-hidden="true" />
      <div className="relative flex min-h-12 items-center justify-between gap-5 border-b border-[#202224] bg-black/24 px-5 py-3.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[#6f6654] md:px-6">
        <span className="truncate">{eyebrow || "BV / DOSSIER"}</span>
        <span className="text-[#b98a32]">{index || "ACTIVE"}</span>
      </div>
      <div className="relative grid md:grid-cols-[4.5rem_1fr]">
        <div className="hidden border-r border-[#202224] px-5 py-6 md:block">
          <p className="font-serif text-5xl leading-none text-[#b98a32]/18">{index || "BV"}</p>
          <div className="mt-8 h-14 border border-[#252729] bg-[linear-gradient(180deg,rgba(185,138,50,0.10),transparent)]" aria-hidden="true" />
        </div>
        <div className="p-8 md:p-12">
          <h3 className="font-serif text-2xl leading-tight text-[#c8ad72] md:text-3xl">{title}</h3>
          {text ? <p className="mt-6 text-base leading-7 text-[#786f5e]">{text}</p> : null}
          {children ? <div className="mt-10 border-t border-[#202224] pt-8">{children}</div> : null}
        </div>
      </div>
    </article>
  );
}
