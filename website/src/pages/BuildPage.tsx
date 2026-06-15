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
      <div className="grid gap-9 md:grid-cols-2">
        {content.items.map((item) => (
          <motion.div key={item.title} {...cardMotion} className="operator-surface border border-[#202224] bg-[#030201] p-8 transition duration-500 hover:-translate-y-1 hover:border-[#7d6a45]/45 hover:bg-[#050302] md:p-10">
            <div className="absolute inset-0 operator-grid opacity-15" aria-hidden="true" />
            <p className="font-serif text-3xl text-[#c8ad72]">{item.title}</p>
            <p className="mt-5 text-lg leading-8 text-[#786f5e]">{item.text}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-40">
        <div className="mb-12 flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#b98a32]">{content.visualLabel}</p>
            <h2 className="mt-5 font-serif text-5xl leading-tight text-[#c8ad72] md:text-6xl">{content.visualTitle}</h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-[#786f5e]">{content.visualText}</p>
        </div>
        <div className="grid gap-10 lg:grid-cols-3">
          {content.visualMockups.map((item, index) => (
            <VisualMockupCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>

      <div className="mt-40">
        <p className="text-sm uppercase tracking-[0.35em] text-[#b98a32]">{content.processLabel}</p>
        <div className="mt-12 grid gap-9 lg:grid-cols-4">
          {content.processSteps.map((item) => (
            <motion.div key={item.step} {...cardMotion} className={panelClass + " operator-surface rounded-none p-8"}>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7d6a45]/45 to-transparent" aria-hidden="true" />
              <p className="font-mono text-sm text-[#b98a32]">{item.step}</p>
              <h3 className="mt-8 font-serif text-3xl text-[#c8ad72]">{item.title}</h3>
              <p className="mt-5 text-base leading-7 text-[#786f5e]">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-40">
        <p className="text-sm uppercase tracking-[0.35em] text-[#b98a32]">{content.phaseLabel}</p>
        <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-[#c8ad72] md:text-6xl">{content.phaseTitle}</h2>
        <div className="mt-12 grid gap-9 lg:grid-cols-3">
          {content.phases.map((phase) => (
            <motion.div key={phase.step} {...cardMotion} className="operator-surface border border-[#202224] bg-[#030201] p-8 md:p-10">
              <p className="font-mono text-sm text-[#b98a32]">{phase.step}</p>
              <h3 className="mt-6 font-serif text-3xl text-[#c8ad72]">{phase.title}</h3>
              <p className="mt-5 text-base leading-7 text-[#786f5e]">{phase.text}</p>
              <div className="mt-8 space-y-3 border-t border-[#202224] pt-6">
                {phase.deliverables.map((item) => (
                  <p key={item} className="flex gap-2 text-sm leading-6 text-[#787873]">
                    <span className="text-[#b98a32]" aria-hidden="true">{"\u2014"}</span>
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="operator-surface mt-40 border border-[#202224] bg-[#030201] p-8 md:p-14">
        <div className="absolute inset-0 operator-grid opacity-15" aria-hidden="true" />
        <p className="text-sm uppercase tracking-[0.35em] text-[#b98a32]">{content.responsibilityLabel}</p>
        <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-[#c8ad72] md:text-6xl">{content.responsibilityTitle}</h2>
        <div className="mt-12 grid gap-9 md:grid-cols-2">
          {[
            { label: content.clientLabel, items: content.clientProvides },
            { label: content.veilLabel, items: content.veilBuilds },
          ].map((group) => (
            <div key={group.label} className="border border-[#202224] bg-black/45 p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[#b98a32]">{group.label}</p>
              <div className="mt-6 grid gap-3">
                {group.items.map((item) => (
                  <p key={item} className="border border-[#181a1c] bg-[#050302]/86 px-4 py-3 text-[#787873]">{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-40">
        <p className="text-sm uppercase tracking-[0.35em] text-[#b98a32]">{content.howItWorks.eyebrow}</p>
        <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-[#c8ad72] md:text-6xl">{content.howItWorks.title}</h2>
        <div className="mt-12 grid gap-9 md:grid-cols-2 xl:grid-cols-3">
          {content.howItWorks.steps.map((step) => (
            <motion.div key={step.step} {...cardMotion} className={panelClass + " operator-surface rounded-none p-8"}>
              <p className="font-mono text-sm text-[#b98a32]">{step.step}</p>
              <h3 className="mt-6 font-serif text-3xl text-[#c8ad72]">{step.title}</h3>
              <div className="mt-6 space-y-4 text-base leading-7 text-[#786f5e]">
                <p><span className="text-[#d2aa55]">{content.howItWorks.clientLabel}:</span> {step.client}</p>
                <p><span className="text-[#d2aa55]">{content.howItWorks.veilLabel}:</span> {step.veil}</p>
                <p><span className="text-[#d2aa55]">{content.howItWorks.outputLabel}:</span> {step.output}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-40 grid gap-12 lg:grid-cols-3">
        {content.caseStudies.map((item) => (
          <motion.div key={item.title} {...cardMotion}>
            <Card className={cardClass + " border-[#252729]"}>
              <CardContent className="p-10">
                <div className="flex items-start justify-between gap-6">
                  <p className="text-xs uppercase tracking-[0.32em] text-[#b98a32]">{item.label}</p>
                  <p className="font-serif text-5xl text-[#b98a32]/20">{item.metric}</p>
                </div>
                <h3 className="mt-6 font-serif text-3xl text-[#c8ad72]">{item.title}</h3>
                <p className="mt-5 text-lg leading-8 text-[#786f5e]">{item.text}</p>
                <div className="mt-8 border-t border-[#202224] pt-6">
                  <p className="text-xs uppercase tracking-[0.28em] text-[#b98a32]">{content.resultLabel}</p>
                  <p className="mt-3 text-base leading-7 text-[#787873]">{item.result}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-40">
        <SectionCTA eyebrow={content.finalCta.eyebrow} title={content.finalCta.title} text={content.finalCta.text} primaryLabel={content.finalCta.primary} secondaryLabel={content.finalCta.secondary} primaryTarget="access" secondaryTarget="protocol" goToPage={goToPage} />
      </div>
    </PageShell>
  );
}
