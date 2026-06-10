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
          <motion.div key={item.title} {...cardMotion} className="operator-surface border border-[#202224] bg-black/50 p-9 transition duration-500 hover:-translate-y-1 hover:border-[#7b7a73]/45 hover:bg-black/70 hover:shadow-[0_0_45px_rgba(155,155,148,0.08)]">
            <div className="absolute inset-0 operator-grid opacity-15" aria-hidden="true" />
            <p className="font-serif text-3xl text-[#d1cec5]">{item.title}</p>
            <p className="mt-5 text-lg leading-8 text-[#74726b]">{item.text}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-28">
        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#a7a39a]">{content.visualLabel}</p>
            <h2 className="mt-5 font-serif text-5xl leading-tight text-[#d1cec5] md:text-6xl">{content.visualTitle}</h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-[#74726b]">{content.visualText}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {content.visualMockups.map((item, index) => (
            <VisualMockupCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>

      <div className="mt-28">
        <p className="text-sm uppercase tracking-[0.35em] text-[#a7a39a]">{content.processLabel}</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-4">
          {content.processSteps.map((item) => (
            <motion.div key={item.step} {...cardMotion} className={panelClass + " operator-surface rounded-none p-8"}>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7b7a73]/45 to-transparent" aria-hidden="true" />
              <p className="font-mono text-sm text-[#a7a39a]">{item.step}</p>
              <h3 className="mt-8 font-serif text-3xl text-[#d1cec5]">{item.title}</h3>
              <p className="mt-5 text-base leading-7 text-[#74726b]">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-28">
        <p className="text-sm uppercase tracking-[0.35em] text-[#a7a39a]">{content.phaseLabel}</p>
        <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-[#d1cec5] md:text-6xl">{content.phaseTitle}</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {content.phases.map((phase) => (
            <motion.div key={phase.step} {...cardMotion} className="operator-surface border border-[#252729] bg-black/45 p-7">
              <p className="font-mono text-sm text-[#a7a39a]">{phase.step}</p>
              <h3 className="mt-6 font-serif text-3xl text-[#d1cec5]">{phase.title}</h3>
              <p className="mt-5 text-base leading-7 text-[#74726b]">{phase.text}</p>
              <div className="mt-7 space-y-2 border-t border-[#202224] pt-5">
                {phase.deliverables.map((item) => (
                  <p key={item} className="flex gap-2 text-sm leading-6 text-[#787873]">
                    <span className="text-[#a7a39a]" aria-hidden="true">{"\u2014"}</span>
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="operator-surface mt-28 border border-[#202224] bg-[#050302]/86 p-7 md:p-12">
        <div className="absolute inset-0 operator-grid opacity-15" aria-hidden="true" />
        <p className="text-sm uppercase tracking-[0.35em] text-[#a7a39a]">{content.responsibilityLabel}</p>
        <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-[#d1cec5] md:text-6xl">{content.responsibilityTitle}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            { label: content.clientLabel, items: content.clientProvides },
            { label: content.veilLabel, items: content.veilBuilds },
          ].map((group) => (
            <div key={group.label} className="border border-[#202224] bg-black/45 p-7">
              <p className="text-xs uppercase tracking-[0.3em] text-[#a7a39a]">{group.label}</p>
              <div className="mt-6 grid gap-3">
                {group.items.map((item) => (
                  <p key={item} className="border border-[#181a1c] bg-[#050302]/86 px-4 py-3 text-[#787873]">{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-28">
        <p className="text-sm uppercase tracking-[0.35em] text-[#a7a39a]">{content.howItWorks.eyebrow}</p>
        <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-[#d1cec5] md:text-6xl">{content.howItWorks.title}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {content.howItWorks.steps.map((step) => (
            <motion.div key={step.step} {...cardMotion} className={panelClass + " operator-surface rounded-none p-7"}>
              <p className="font-mono text-sm text-[#a7a39a]">{step.step}</p>
              <h3 className="mt-6 font-serif text-3xl text-[#d1cec5]">{step.title}</h3>
              <div className="mt-6 space-y-4 text-base leading-7 text-[#74726b]">
                <p><span className="text-[#d6d3ca]">{content.howItWorks.clientLabel}:</span> {step.client}</p>
                <p><span className="text-[#d6d3ca]">{content.howItWorks.veilLabel}:</span> {step.veil}</p>
                <p><span className="text-[#d6d3ca]">{content.howItWorks.outputLabel}:</span> {step.output}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-28 grid gap-8 lg:grid-cols-3">
        {content.caseStudies.map((item) => (
          <motion.div key={item.title} {...cardMotion}>
            <Card className={cardClass + " border-[#252729]"}>
              <CardContent className="p-9">
                <div className="flex items-start justify-between gap-6">
                  <p className="text-xs uppercase tracking-[0.32em] text-[#a7a39a]">{item.label}</p>
                  <p className="font-serif text-5xl text-[#a7a39a]/20">{item.metric}</p>
                </div>
                <h3 className="mt-6 font-serif text-3xl text-[#d1cec5]">{item.title}</h3>
                <p className="mt-5 text-lg leading-8 text-[#74726b]">{item.text}</p>
                <div className="mt-8 border-t border-[#202224] pt-6">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#a7a39a]">{content.resultLabel}</p>
                  <p className="mt-3 text-base leading-7 text-[#787873]">{item.result}</p>
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
