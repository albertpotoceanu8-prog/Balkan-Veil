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
    </PageShell>
  );
}
