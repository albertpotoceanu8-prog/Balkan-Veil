import { motion } from "framer-motion";
import { PageShell } from "@/components/PageShell";
import { SectionCTA } from "@/components/SectionCTA";
import { VisualMockupCard } from "@/components/VisualMockupCard";
import { Card, CardContent } from "@/components/ui/card";
import { cardClass, cardMotion, panelClass } from "@/components/motionConfig";
import type { SiteContent } from "@/data/siteContent";
import type { PageKey } from "@/types/navigation";

type BuildPageProps = {
  content: SiteContent["build"];
  goToPage: (target: PageKey) => void;
};

export function BuildPage({ content, goToPage }: BuildPageProps) {
  return (
    <PageShell eyebrow={content.eyebrow} title={content.title} text={content.text}>
      <div className="grid gap-6 md:grid-cols-2">
        {content.items.map((item) => (
          <motion.div key={item.title} {...cardMotion} className="rounded-[2rem] border border-stone-800 bg-black/50 p-9 transition duration-500 hover:-translate-y-1 hover:border-amber-300/30 hover:bg-black/70 hover:shadow-[0_0_45px_rgba(251,191,36,0.08)]">
            <p className="font-serif text-3xl text-amber-100">{item.title}</p>
            <p className="mt-5 text-lg leading-8 text-stone-500">{item.text}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-28">
        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.visualLabel}</p>
            <h2 className="mt-5 font-serif text-5xl leading-tight text-stone-100 md:text-6xl">{content.visualTitle}</h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-stone-500">{content.visualText}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {content.visualMockups.map((item, index) => (
            <VisualMockupCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>

      <div className="mt-28">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.processLabel}</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-4">
          {content.processSteps.map((item) => (
            <motion.div key={item.step} {...cardMotion} className={panelClass + " p-8"}>
              <p className="font-mono text-sm text-amber-300">{item.step}</p>
              <h3 className="mt-8 font-serif text-3xl text-stone-100">{item.title}</h3>
              <p className="mt-5 text-base leading-7 text-stone-500">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-28">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.phaseLabel}</p>
        <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-stone-100 md:text-6xl">{content.phaseTitle}</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {content.phases.map((phase) => (
            <motion.div key={phase.step} {...cardMotion} className="rounded-[2rem] border border-amber-300/15 bg-black/45 p-7">
              <p className="font-mono text-sm text-amber-300">{phase.step}</p>
              <h3 className="mt-6 font-serif text-3xl text-amber-100">{phase.title}</h3>
              <p className="mt-5 text-base leading-7 text-stone-500">{phase.text}</p>
              <div className="mt-7 space-y-2 border-t border-stone-800 pt-5">
                {phase.deliverables.map((item) => (
                  <p key={item} className="flex gap-2 text-sm leading-6 text-stone-400">
                    <span className="text-amber-300/70" aria-hidden="true">{"\u2014"}</span>
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-28 rounded-[2.5rem] border border-stone-800 bg-stone-950/45 p-7 md:p-12">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.responsibilityLabel}</p>
        <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-stone-100 md:text-6xl">{content.responsibilityTitle}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            { label: content.clientLabel, items: content.clientProvides },
            { label: content.veilLabel, items: content.veilBuilds },
          ].map((group) => (
            <div key={group.label} className="rounded-[2rem] border border-stone-800 bg-black/45 p-7">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300">{group.label}</p>
              <div className="mt-6 grid gap-3">
                {group.items.map((item) => (
                  <p key={item} className="rounded-2xl border border-stone-900 bg-stone-950/50 px-4 py-3 text-stone-400">{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-28 grid gap-8 lg:grid-cols-3">
        {content.caseStudies.map((item) => (
          <motion.div key={item.title} {...cardMotion}>
            <Card className={cardClass + " border-amber-300/15"}>
              <CardContent className="p-9">
                <div className="flex items-start justify-between gap-6">
                  <p className="text-xs uppercase tracking-[0.32em] text-amber-300">{item.label}</p>
                  <p className="font-serif text-5xl text-amber-100/20">{item.metric}</p>
                </div>
                <h3 className="mt-6 font-serif text-3xl text-amber-100">{item.title}</h3>
                <p className="mt-5 text-lg leading-8 text-stone-500">{item.text}</p>
                <div className="mt-8 border-t border-stone-800 pt-6">
                  <p className="text-xs uppercase tracking-[0.28em] text-amber-300">{content.resultLabel}</p>
                  <p className="mt-3 text-base leading-7 text-stone-400">{item.result}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-28">
        <SectionCTA eyebrow={content.finalCta.eyebrow} title={content.finalCta.title} text={content.finalCta.text} primaryLabel={content.finalCta.primary} secondaryLabel={content.finalCta.secondary} primaryTarget="access" secondaryTarget="protocol" goToPage={goToPage} />
      </div>
    </PageShell>
  );
}
