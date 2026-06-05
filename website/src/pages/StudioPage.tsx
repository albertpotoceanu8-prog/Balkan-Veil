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
        <motion.div {...cardMotion} className="rounded-[2.5rem] border border-amber-300/15 bg-black/55 p-10 md:backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.positionLabel}</p>
          <h2 className="mt-6 font-serif text-5xl leading-tight text-stone-100">{content.positionTitle}</h2>
          <p className="mt-8 text-xl leading-9 text-stone-500">{content.positionText}</p>
          <div className="mt-10 h-px bg-gradient-to-r from-transparent via-amber-300/45 to-transparent" />
          <p className="mt-8 font-mono text-sm uppercase tracking-[0.26em] text-stone-600">{content.signature}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {content.principles.map((item) => (
            <motion.div key={item.title} {...cardMotion} className={panelClass + " p-8"}>
              <h3 className="font-serif text-3xl text-amber-100">{item.title}</h3>
              <p className="mt-5 text-base leading-7 text-stone-500">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-28 rounded-[2.5rem] border border-stone-800 bg-stone-950/45 p-10 md:p-14">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.whatLabel}</p>
            <h3 className="mt-5 font-serif text-4xl text-stone-100">{content.whatTitle}</h3>
          </div>
          <p className="text-lg leading-8 text-stone-500 lg:col-span-2">{content.whatText}</p>
        </div>
      </div>

      <div className="mt-28 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div className="border-y border-amber-300/20 py-8">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-amber-300/80">{content.aesthetic.eyebrow}</p>
          <h2 className="mt-6 font-serif text-4xl leading-tight text-stone-100 md:text-6xl">{content.aesthetic.title}</h2>
          <p className="mt-6 text-lg leading-8 text-stone-500">{content.aesthetic.text}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {content.aesthetic.points.map((point, index) => (
            <motion.div key={point} {...cardMotion} className="border border-stone-800 bg-black/40 p-6">
              <p className="font-mono text-xs text-amber-300/60">0{index + 1}</p>
              <p className="mt-5 font-serif text-2xl leading-tight text-stone-100">{point}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-28 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative overflow-hidden border border-stone-800 bg-stone-950/40 p-7 md:p-10">
          <div className="pointer-events-none absolute inset-0 veil-lines opacity-20" aria-hidden="true" />
          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-amber-300/80">{content.materials.eyebrow}</p>
            <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight text-stone-100 md:text-6xl">{content.materials.title}</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {content.materials.items.map((item, index) => (
                <motion.article key={item.title} {...cardMotion} className="border-l border-amber-300/25 bg-black/35 px-5 py-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-stone-500">material {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 font-serif text-2xl text-amber-100">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-stone-500">{item.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        <div className="border border-amber-300/15 bg-black/45 p-7 md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-amber-300/80">{content.avoids.eyebrow}</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-stone-100">{content.avoids.title}</h2>
          <div className="mt-8 divide-y divide-stone-800 border-y border-stone-800">
            {content.avoids.items.map((item, index) => (
              <p key={item} className="grid grid-cols-[3rem_1fr] gap-4 py-4 text-base leading-7 text-stone-400">
                <span className="font-mono text-xs text-amber-300/60">{String(index + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-28 border border-stone-800 bg-black/35 p-6 md:p-10">
        <div className="grid gap-4 md:grid-cols-2">
          {content.notes.map((note, index) => (
            <p key={note} className="border-t border-stone-800 pt-5 text-lg leading-8 text-stone-400">
              <span className="mr-4 font-mono text-xs text-amber-300/70">NOTE {String(index + 1).padStart(2, "0")}</span>
              {note}
            </p>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
