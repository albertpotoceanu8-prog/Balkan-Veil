import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ArchiveStamp } from "@/components/ArchiveStamp";
import { DossierPanel } from "@/components/DossierPanel";
import { PageShell } from "@/components/PageShell";
import { ProcessPreview } from "@/components/ProcessPreview";
import { SectionCTA } from "@/components/SectionCTA";
import { SignalLedger } from "@/components/SignalLedger";
import { Button } from "@/components/ui/button";
import { cardMotion } from "@/components/motionConfig";
import { VeilDivider } from "@/components/VeilDivider";
import { VeilFrame } from "@/components/VeilFrame";
import type { SiteContent } from "@/data/siteContent";
import type { PageKey } from "@/types/navigation";

type PricingPageProps = {
  content: SiteContent["pricing"];
  goToPage: (target: PageKey) => void;
};

export function PricingPage({ content, goToPage }: PricingPageProps) {
  return (
    <PageShell eyebrow={content.eyebrow} title={content.title} text={content.text}>
      <div className="operator-surface mb-10 border border-[#3a2410] bg-black/45 p-5 md:p-7">
        <div className="absolute inset-0 operator-grid opacity-10" aria-hidden="true" />
        <div className="relative max-w-4xl">
          <p className="text-xs uppercase tracking-[0.32em] text-[#b2753a]">{content.scopeNote.eyebrow}</p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-[#d5c0a0] md:text-4xl">{content.scopeNote.title}</h2>
          <p className="mt-4 text-base leading-7 text-[#6c5e4e]">{content.scopeNote.text}</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.12fr_0.9fr] lg:items-start">
        {content.plans.map((plan, index) => (
          <motion.div key={plan.name} {...cardMotion} className={`h-full ${plan.recommended ? "lg:-mt-8" : "lg:mt-10"}`}>
            <VeilFrame label={`${content.planIndexLabel} ${String(index + 1).padStart(2, "0")}`} index={plan.name} className={`h-full ${plan.recommended ? "border-[#9a6936]/50 bg-[#050302]/92" : "bg-[#050302]/86"}`}>
              <div className="flex h-full flex-col p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#b2753a]">{plan.label}</p>
                    <h2 className="mt-5 font-serif text-4xl text-[#d5c0a0] md:text-5xl">{plan.name}</h2>
                  </div>
                  <ArchiveStamp code={String(index + 1).padStart(2, "0")} label={content.minimumLabel} status={plan.recommended} align="right" className="hidden sm:flex" />
                </div>

                <div className="relative mt-9 border-y border-[#2a190b] py-6">
                  <span className={plan.recommended ? "absolute right-0 top-6 h-2 w-16 bg-[#9a6936]/45" : "absolute right-0 top-6 h-2 w-16 bg-[#9a6936]/30"} aria-hidden="true" />
                  <div className="flex items-end gap-2">
                    <p className="font-serif text-5xl text-[#d5c0a0] md:text-6xl">{plan.promoPrice ?? plan.price}</p>
                    <p className="pb-2 text-sm uppercase tracking-[0.2em] text-[#6c5e4e]">{plan.period}</p>
                  </div>
                  {plan.promoPrice ? (
                    <p className="mt-3 text-sm leading-6 text-[#6c5e4e]">
                      <span className="text-[#d49a4e]">{plan.promoLabel}:</span> {plan.promoNote}
                    </p>
                  ) : null}
                  <p className="mt-4 text-base leading-7 text-[#6c5e4e]">{plan.description}</p>
                </div>

                <SignalLedger items={plan.included} label={content.ledgerLabel} className="mt-7" />

                <div className="mt-auto space-y-4 pt-7">
                  <p className="text-sm leading-6 text-[#756650]">
                    <span className="text-[#d49a4e]">{content.supportLabel}:</span> {plan.support}
                  </p>
                  <p className="text-sm leading-6 text-[#756650]">
                    <span className="text-[#d49a4e]">{content.bestForLabel}:</span> {plan.bestFor}
                  </p>
                  <Button type="button" onClick={() => goToPage("access")} className="mt-2 inline-flex min-h-12 w-full items-center justify-center border border-[#c5823f] bg-[#c5823f] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-black transition hover:bg-[#d5c0a0]">
                    {content.finalCta.primary} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </VeilFrame>
          </motion.div>
        ))}
      </div>

      <VeilDivider label={content.minimumLabel} className="mt-20" />

      <div className="mt-28">
        <ProcessPreview eyebrow={content.subscriptionSteps.eyebrow} title={content.subscriptionSteps.title} steps={content.subscriptionSteps.steps} />
      </div>

      <DossierPanel eyebrow={content.notIncluded.eyebrow} title={content.notIncluded.title} className="mt-28 archive-noise">
        <SignalLedger items={content.notIncluded.items} label={content.notIncludedLabel} />
      </DossierPanel>

      <motion.div {...cardMotion} className="operator-surface mt-28 border border-[#3a2410] bg-black/55 p-7 md:p-12">
        <div className="absolute inset-0 operator-grid opacity-15" aria-hidden="true" />
        <p className="text-sm uppercase tracking-[0.35em] text-[#b2753a]">{content.buyoutNote.eyebrow}</p>
        <h2 className="mt-5 font-serif text-4xl leading-tight text-[#d5c0a0] md:text-6xl">{content.buyoutNote.title}</h2>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-[#6c5e4e]">{content.buyoutNote.text}</p>
      </motion.div>

      <div className="mt-28">
        <p className="text-sm uppercase tracking-[0.35em] text-[#b2753a]">{content.faqLabel}</p>
        <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-[#d5c0a0] md:text-6xl">{content.faqTitle}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {content.faq.map((item) => (
            <DossierPanel key={item.q} eyebrow={content.faqLabel} title={item.q}>
              <p className="mt-4 text-base leading-7 text-[#6c5e4e]">{item.a}</p>
            </DossierPanel>
          ))}
        </div>
      </div>

      <div className="mt-28">
        <SectionCTA eyebrow={content.finalCta.eyebrow} title={content.finalCta.title} text={content.finalCta.text} primaryLabel={content.finalCta.primary} secondaryLabel={content.finalCta.secondary} primaryTarget="access" secondaryTarget="services" goToPage={goToPage} />
      </div>
    </PageShell>
  );
}
