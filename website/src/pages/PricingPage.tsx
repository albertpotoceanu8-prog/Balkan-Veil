import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PageShell } from "@/components/PageShell";
import { ProcessPreview } from "@/components/ProcessPreview";
import { SectionCTA } from "@/components/SectionCTA";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cardClass, cardMotion, panelClass } from "@/components/motionConfig";
import type { SiteContent } from "@/data/siteContent";
import type { PageKey } from "@/types/navigation";

type PricingPageProps = {
  content: SiteContent["pricing"];
  goToPage: (target: PageKey) => void;
};

export function PricingPage({ content, goToPage }: PricingPageProps) {
  return (
    <PageShell eyebrow={content.eyebrow} title={content.title} text={content.text}>
      <div className="grid gap-8 lg:grid-cols-3">
        {content.plans.map((plan) => (
          <motion.div key={plan.name} {...cardMotion} className="h-full">
            <Card className={`${cardClass} h-full ${plan.recommended ? "border-amber-300/35 bg-stone-950/75" : "bg-stone-950/55"}`}>
              <CardContent className="flex h-full flex-col p-7 md:p-9">
                <div className="flex min-h-16 items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-amber-300">{plan.label}</p>
                    <h2 className="mt-5 font-serif text-4xl text-stone-100">{plan.name}</h2>
                  </div>
                  {plan.recommended ? <p className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-amber-100">{plan.recommended}</p> : null}
                </div>

                <div className="mt-8 flex items-end gap-2">
                  <p className="font-serif text-5xl text-amber-100">{plan.price}</p>
                  <p className="pb-2 text-sm uppercase tracking-[0.2em] text-stone-500">{plan.period}</p>
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.28em] text-stone-500">{content.minimumLabel}</p>
                <p className="mt-6 text-base leading-7 text-stone-500">{plan.description}</p>

                <div className="mt-8 border-t border-stone-800 pt-6">
                  <p className="text-xs uppercase tracking-[0.28em] text-amber-300">{content.includedLabel}</p>
                  <div className="mt-4 space-y-2">
                    {plan.included.map((item) => (
                      <p key={item} className="flex gap-2 text-sm leading-6 text-stone-400">
                        <span className="text-amber-300/70" aria-hidden="true">{"\u2014"}</span>
                        <span>{item}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="mt-auto space-y-4 border-t border-stone-800 pt-6">
                  <p className="text-sm text-stone-400">
                    <span className="text-amber-200">{content.supportLabel}:</span> {plan.support}
                  </p>
                  <p className="text-sm text-stone-400">
                    <span className="text-amber-200">{content.bestForLabel}:</span> {plan.bestFor}
                  </p>
                  <Button type="button" onClick={() => goToPage("access")} className="mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-amber-200">
                    {content.finalCta.primary} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-28">
        <ProcessPreview eyebrow={content.subscriptionSteps.eyebrow} title={content.subscriptionSteps.title} steps={content.subscriptionSteps.steps} />
      </div>

      <div className="mt-28 rounded-[2.5rem] border border-stone-800 bg-stone-950/45 p-7 md:p-12">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.notIncluded.eyebrow}</p>
        <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-stone-100 md:text-6xl">{content.notIncluded.title}</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {content.notIncluded.items.map((item) => (
            <p key={item} className="rounded-2xl border border-stone-800 bg-black/45 px-5 py-4 text-stone-400">{item}</p>
          ))}
        </div>
      </div>

      <motion.div {...cardMotion} className="mt-28 rounded-[2.5rem] border border-amber-300/20 bg-black/55 p-7 md:p-12">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.buyoutNote.eyebrow}</p>
        <h2 className="mt-5 font-serif text-4xl leading-tight text-stone-100 md:text-6xl">{content.buyoutNote.title}</h2>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-stone-500">{content.buyoutNote.text}</p>
      </motion.div>

      <div className="mt-28">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.faqLabel}</p>
        <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-stone-100 md:text-6xl">{content.faqTitle}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {content.faq.map((item) => (
            <motion.div key={item.q} {...cardMotion} className={panelClass + " p-7"}>
              <h3 className="font-serif text-2xl text-amber-100 md:text-3xl">{item.q}</h3>
              <p className="mt-4 text-base leading-7 text-stone-500">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-28">
        <SectionCTA eyebrow={content.finalCta.eyebrow} title={content.finalCta.title} text={content.finalCta.text} primaryLabel={content.finalCta.primary} secondaryLabel={content.finalCta.secondary} primaryTarget="access" secondaryTarget="services" goToPage={goToPage} />
      </div>
    </PageShell>
  );
}
