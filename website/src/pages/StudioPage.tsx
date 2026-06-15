import { motion } from "framer-motion";
import { PageShell } from "@/components/PageShell";
import { cardMotion, panelClass } from "@/components/motionConfig";
import type { SiteContent } from "@/data/siteContent";

type StudioPageProps = {
  content: SiteContent["studio"];
};

export function StudioPage({ content }: StudioPageProps) {
  return (
    <PageShell eyebrow={content.eyebrow} title={content.title} text={content.text}>
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <motion.div {...cardMotion} className="relative overflow-hidden border border-[#202224] bg-[#030201] p-9 md:p-12 md:backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 veil-lines opacity-20" aria-hidden="true" />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              {content.operator.statuses.map((status) => (
                <span key={status} className="border border-[#252729] bg-[#b98a32]/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#d2aa55]">
                  {status}
                </span>
              ))}
            </div>
            <p className="mt-8 text-sm uppercase tracking-[0.35em] text-[#b98a32]">{content.positionLabel}</p>
            <h2 className="mt-6 font-serif text-5xl leading-tight text-[#c8ad72]">{content.positionTitle}</h2>
            <p className="mt-8 text-xl leading-9 text-[#786f5e]">{content.positionText}</p>
            <div className="mt-10 h-px bg-gradient-to-r from-[#7d6a45]/55 via-[#202224] to-transparent" />
            <p className="mt-8 font-mono text-sm uppercase tracking-[0.26em] text-[#786f5e]">{content.signature}</p>
          </div>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {content.principles.map((item, index) => (
            <motion.div key={item.title} {...cardMotion} className={`${panelClass} border-[#202224] p-7`}>
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#b98a32]">SIGNAL {String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-5 font-serif text-3xl text-[#c8ad72]">{item.title}</h3>
              <p className="mt-5 text-base leading-7 text-[#786f5e]">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-40 grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch">
        <div className="border-y border-[#7d6a45]/40 bg-[#030201]/65 px-8 py-10 md:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#b98a32]">{content.operator.eyebrow}</p>
          <h2 className="mt-6 font-serif text-4xl leading-tight text-[#c8ad72] md:text-6xl">{content.operator.title}</h2>
          <p className="mt-6 text-lg leading-8 text-[#786f5e]">{content.operator.text}</p>
        </div>

        <div className="relative overflow-hidden border border-[#202224] bg-[#030201] p-8 md:p-12">
          <div className="pointer-events-none absolute inset-0 operator-grid opacity-20" aria-hidden="true" />
          <div className="relative">
            <div className="flex items-center justify-between gap-4 border-b border-[#202224] pb-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#b98a32]">RECON CONSOLE</p>
              <span className="h-2 w-2 bg-emerald-300/70" aria-hidden="true" />
            </div>
            <div className="mt-5 divide-y divide-[#202224]">
              {content.reconNotes.items.map((note, index) => (
              <div key={note} className="grid gap-4 py-5 md:grid-cols-[4rem_1fr_auto] md:items-center">
                  <span className="font-mono text-xs text-[#b98a32]">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-base leading-7 text-[#787873]">{note}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#b98a32]">TRACE</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-40 border border-[#202224] bg-[#030201] p-8 md:p-14">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#b98a32]">{content.attackSurface.eyebrow}</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-[#c8ad72] md:text-6xl">{content.attackSurface.title}</h2>
            <p className="mt-6 text-lg leading-8 text-[#786f5e]">{content.attackSurface.text}</p>
          </div>
          <div className="grid gap-0 border-y border-[#202224]">
            {content.attackSurface.items.map((item, index) => (
              <motion.article key={item.title} {...cardMotion} className="grid gap-5 border-b border-[#202224] py-7 last:border-b-0 md:grid-cols-[5rem_0.8fr_1.2fr] md:items-start">
                <p className="font-mono text-xs text-[#b98a32]">SURF {String(index + 1).padStart(2, "0")}</p>
                <h3 className="font-serif text-2xl text-[#c8ad72]">{item.title}</h3>
                <p className="text-base leading-7 text-[#786f5e]">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-40 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative overflow-hidden border border-[#202224] bg-[#030201] p-8 md:p-14">
          <div className="pointer-events-none absolute inset-0 veil-lines opacity-20" aria-hidden="true" />
          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#b98a32]">{content.visualVectors.eyebrow}</p>
            <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight text-[#c8ad72] md:text-6xl">{content.visualVectors.title}</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {content.visualVectors.items.map((item) => (
                <motion.article key={item.title} {...cardMotion} className="border border-[#202224] bg-black/35 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-mono text-sm uppercase tracking-[0.28em] text-[#b98a32]">{item.title}</h3>
                    <span className="h-px flex-1 bg-[#7d6a45]/30" aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#786f5e]">{item.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        <div className="border border-red-300/15 bg-[#030201] p-8 md:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-red-300/75">{content.neutralizedNoise.eyebrow}</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-[#c8ad72]">{content.neutralizedNoise.title}</h2>
          <div className="mt-8 divide-y divide-[#202224] border-y border-[#202224]">
            {content.neutralizedNoise.items.map((item, index) => (
              <p key={item} className="grid grid-cols-[3rem_1fr_auto] gap-5 py-5 text-base leading-7 text-[#787873]">
                <span className="font-mono text-xs text-red-300/60">{String(index + 1).padStart(2, "0")}</span>
                <span>{item}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#b98a32]">SEALED</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-40 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-none border border-[#202224] bg-[#030201] p-9 md:p-12">
          <p className="text-sm uppercase tracking-[0.35em] text-[#b98a32]">{content.whatLabel}</p>
          <h3 className="mt-5 font-serif text-4xl text-[#c8ad72]">{content.whatTitle}</h3>
          <p className="mt-6 text-lg leading-8 text-[#786f5e]">{content.whatText}</p>
        </div>

        <div className="border border-[#202224] bg-[#030201] p-8 md:p-12">
          <div className="grid gap-5">
            {content.notes.map((note, index) => (
              <p key={note} className="border-l border-[#252729] bg-black/30 px-5 py-4 text-lg leading-8 text-[#787873]">
                <span className="mr-4 font-mono text-xs text-[#b98a32]">NOTE {String(index + 1).padStart(2, "0")}</span>
                {note}
              </p>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
