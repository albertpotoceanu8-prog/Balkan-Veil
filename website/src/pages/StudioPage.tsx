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
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <motion.div {...cardMotion} className="relative overflow-hidden border border-[#3a301e] bg-black/60 p-8 md:p-10 md:backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 veil-lines opacity-20" aria-hidden="true" />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              {content.operator.statuses.map((status) => (
                <span key={status} className="border border-[#3a301e] bg-[#b9924b]/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#d5bd7c]">
                  {status}
                </span>
              ))}
            </div>
            <p className="mt-8 text-sm uppercase tracking-[0.35em] text-[#7f6a39]">{content.positionLabel}</p>
            <h2 className="mt-6 font-serif text-5xl leading-tight text-[#d8c8a7]">{content.positionTitle}</h2>
            <p className="mt-8 text-xl leading-9 text-[#756d5d]">{content.positionText}</p>
            <div className="mt-10 h-px bg-gradient-to-r from-[#8f7835]/55 via-[#241f16] to-transparent" />
            <p className="mt-8 font-mono text-sm uppercase tracking-[0.26em] text-[#756d5d]">{content.signature}</p>
          </div>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {content.principles.map((item, index) => (
            <motion.div key={item.title} {...cardMotion} className={`${panelClass} border-[#241f16] p-6`}>
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#7f6a39]">SIGNAL {String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-5 font-serif text-3xl text-[#d8c8a7]">{item.title}</h3>
              <p className="mt-5 text-base leading-7 text-[#756d5d]">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-28 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch">
        <div className="border-y border-[#8f7835]/40 py-8">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#7f6a39]">{content.operator.eyebrow}</p>
          <h2 className="mt-6 font-serif text-4xl leading-tight text-[#d8c8a7] md:text-6xl">{content.operator.title}</h2>
          <p className="mt-6 text-lg leading-8 text-[#756d5d]">{content.operator.text}</p>
        </div>

        <div className="relative overflow-hidden border border-[#241f16] bg-[#030303]/86 p-6 md:p-8">
          <div className="pointer-events-none absolute inset-0 operator-grid opacity-20" aria-hidden="true" />
          <div className="relative">
            <div className="flex items-center justify-between gap-4 border-b border-[#241f16] pb-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7f6a39]">RECON CONSOLE</p>
              <span className="h-2 w-2 bg-emerald-300/70" aria-hidden="true" />
            </div>
            <div className="mt-5 divide-y divide-[#241f16]">
              {content.reconNotes.items.map((note, index) => (
                <div key={note} className="grid gap-3 py-4 md:grid-cols-[4rem_1fr_auto] md:items-center">
                  <span className="font-mono text-xs text-[#7f6a39]">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-base leading-7 text-[#8a806c]">{note}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7f6a39]">TRACE</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-28 border border-[#241f16] bg-black/45 p-7 md:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#7f6a39]">{content.attackSurface.eyebrow}</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-[#d8c8a7] md:text-6xl">{content.attackSurface.title}</h2>
            <p className="mt-6 text-lg leading-8 text-[#756d5d]">{content.attackSurface.text}</p>
          </div>
          <div className="grid gap-0 border-y border-[#241f16]">
            {content.attackSurface.items.map((item, index) => (
              <motion.article key={item.title} {...cardMotion} className="grid gap-4 border-b border-[#241f16] py-5 last:border-b-0 md:grid-cols-[5rem_0.8fr_1.2fr] md:items-start">
                <p className="font-mono text-xs text-[#7f6a39]">SURF {String(index + 1).padStart(2, "0")}</p>
                <h3 className="font-serif text-2xl text-[#d8c8a7]">{item.title}</h3>
                <p className="text-base leading-7 text-[#756d5d]">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-28 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative overflow-hidden border border-[#241f16] bg-[#030303]/86 p-7 md:p-10">
          <div className="pointer-events-none absolute inset-0 veil-lines opacity-20" aria-hidden="true" />
          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#7f6a39]">{content.visualVectors.eyebrow}</p>
            <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight text-[#d8c8a7] md:text-6xl">{content.visualVectors.title}</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {content.visualVectors.items.map((item) => (
                <motion.article key={item.title} {...cardMotion} className="border border-[#241f16] bg-black/35 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-mono text-sm uppercase tracking-[0.28em] text-[#7f6a39]">{item.title}</h3>
                    <span className="h-px flex-1 bg-[#8f7835]/30" aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#756d5d]">{item.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        <div className="border border-red-300/15 bg-black/45 p-7 md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-red-300/75">{content.neutralizedNoise.eyebrow}</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-[#d8c8a7]">{content.neutralizedNoise.title}</h2>
          <div className="mt-8 divide-y divide-[#241f16] border-y border-[#241f16]">
            {content.neutralizedNoise.items.map((item, index) => (
              <p key={item} className="grid grid-cols-[3rem_1fr_auto] gap-4 py-4 text-base leading-7 text-[#8a806c]">
                <span className="font-mono text-xs text-red-300/60">{String(index + 1).padStart(2, "0")}</span>
                <span>{item}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7f6a39]">SEALED</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-28 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-none border border-[#241f16] bg-[#030303]/86 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[#7f6a39]">{content.whatLabel}</p>
          <h3 className="mt-5 font-serif text-4xl text-[#d8c8a7]">{content.whatTitle}</h3>
          <p className="mt-6 text-lg leading-8 text-[#756d5d]">{content.whatText}</p>
        </div>

        <div className="border border-[#241f16] bg-black/35 p-6 md:p-10">
          <div className="grid gap-4">
            {content.notes.map((note, index) => (
              <p key={note} className="border-l border-[#3a301e] bg-black/30 px-5 py-4 text-lg leading-8 text-[#8a806c]">
                <span className="mr-4 font-mono text-xs text-[#7f6a39]">NOTE {String(index + 1).padStart(2, "0")}</span>
                {note}
              </p>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
