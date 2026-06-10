import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DecodeText } from "@/components/DecodeText";

type PageShellProps = {
  eyebrow: string;
  title: string;
  text?: string;
  children: React.ReactNode;
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
};

export function PageShell({ eyebrow, title, text, children, topContent, bottomContent }: PageShellProps) {
  const shouldReduceMotion = useReducedMotion();
  const fileCode = title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word.replace(/[^\p{L}\p{N}]/gu, "").slice(0, 8).toUpperCase())
    .filter(Boolean)
    .join("_");

  return (
    <motion.section
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -18, scale: 0.99 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" }}
      className="relative z-10 mx-auto min-h-[calc(100vh-120px)] max-w-[1500px] px-2.5 py-8 text-[#c0aa86] sm:px-5 sm:py-12 md:min-h-[calc(100vh-160px)] md:px-8 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(143,120,53,0.10),transparent_28rem)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-[#9a6936]/50 to-transparent sm:inset-x-5 md:inset-x-8" aria-hidden="true" />
      <header className="operator-surface relative overflow-hidden border border-[#2a190b] bg-[#050302]/82 shadow-[inset_0_1px_0_rgba(197,130,63,0.08)]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(197,130,63,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:44px_44px] sm:[background-size:56px_56px]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#9a6936]/60 to-transparent" aria-hidden="true" />

        <div className="relative grid min-h-[calc(100svh-8rem)] lg:grid-cols-[0.24fr_1fr_0.28fr]">
          <aside className="hidden border-r border-[#2a190b] p-5 xl:block">
            <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#b2753a]">
              <p>&gt; node</p>
              <p className="mt-3 text-[#6c5e4e]">balkan veil / public</p>
            </div>
            <div className="mt-10 border-y border-[#2a190b] py-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6c5e4e]">
              <p className="text-[#b2753a]">&gt; status</p>
              <p className="mt-4">interface online</p>
              <p className="mt-3">scope controlled</p>
            </div>
            <div className="mt-10 aspect-square border border-[#2a190b] bg-[radial-gradient(circle_at_50%_50%,rgba(197,130,63,0.18),transparent_34%),linear-gradient(145deg,#020100,#050302)]" aria-hidden="true" />
            <div className="mt-8 grid grid-cols-2 gap-3 border-t border-[#2a190b] pt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#5a3718]">
              <p>file</p>
              <p className="text-right text-[#b2753a]">{fileCode || "BV"}</p>
              <p>mode</p>
              <p className="text-right text-[#b2753a]">public</p>
            </div>
          </aside>

          <div className="flex min-w-0 flex-col px-4 py-6 sm:px-6 sm:py-8 md:px-9 md:py-12">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2a190b] pb-4 font-mono text-[9px] uppercase tracking-[0.22em] text-[#b2753a] sm:text-[10px] sm:tracking-[0.3em]">
              <p>{eyebrow}</p>
              <p className="hidden text-[#5a3718] sm:block">BV / classified file</p>
            </div>
            <div className="flex flex-1 flex-col justify-center py-10 sm:py-14 md:py-20">
              <h1 className="max-w-[12ch] font-serif text-[clamp(3rem,14vw,5.75rem)] leading-[0.9] text-[#d5c0a0] drop-shadow-[0_0_22px_rgba(197,130,63,0.10)] sm:max-w-5xl sm:text-6xl md:text-8xl lg:text-[8rem]">
                <DecodeText text={title} disabled />
              </h1>
              {text && <p className="mt-6 max-w-4xl font-mono text-[10px] leading-6 text-[#8f856f] sm:text-xs sm:leading-7 md:mt-8 md:text-sm md:leading-8">{text}</p>}
            </div>
            <div className="grid border border-[#3a2410] bg-black/25 font-mono text-[9px] uppercase tracking-[0.18em] text-[#b2753a] sm:grid-cols-[1fr_auto] sm:text-[10px]">
              <div className="min-h-12 px-4 py-4 sm:px-5">&gt; active dossier loaded</div>
              <div className="min-h-12 border-t border-[#3a2410] px-4 py-4 text-[#5a3718] sm:border-l sm:border-t-0 sm:px-6">scroll to decrypt</div>
            </div>
          </div>

          <aside className="hidden border-l border-[#2a190b] p-5 lg:block">
            <div className="border border-[#2a190b] bg-black/30 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#b2753a]">active files</p>
              <div className="mt-5 space-y-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[#6c5e4e]">
                <p>00_{fileCode || "BV"}_INDEX.VEL</p>
                <p>01_POSITIONING.SYS</p>
                <p>02_EXECUTION.LOG</p>
              </div>
            </div>
            <div className="mt-8 border border-[#2a190b] bg-black/30 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#b2753a]">signal</p>
              <div className="mt-6 h-9 border-y border-[#2a190b] bg-[linear-gradient(0deg,transparent_48%,rgba(74,222,128,0.10)_50%,transparent_52%),repeating-linear-gradient(90deg,transparent_0_18px,rgba(197,130,63,0.12)_18px_19px,transparent_19px_28px)]" />
            </div>
            <div className="mt-8 border border-[#2a190b] bg-black/30 p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6c5e4e]">
              <p className="text-[#b2753a]">encryption</p>
              <p className="mt-5">AES-256 / SHA-512</p>
              <p className="mt-5 text-emerald-300/70">online</p>
            </div>
          </aside>
        </div>
      </header>
      {topContent}
      <section className="relative mt-5 md:mt-8">{children}</section>
      {bottomContent}
    </motion.section>
  );
}
