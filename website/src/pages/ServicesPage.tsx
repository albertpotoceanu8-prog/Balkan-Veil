import type React from "react";
import { ArrowRight, Eye, Lock, Network, Shield, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { DossierPanel } from "@/components/DossierPanel";
import { PageShell } from "@/components/PageShell";
import { SignalLedger } from "@/components/SignalLedger";
import { Button } from "@/components/ui/button";
import { cardMotion, panelClass } from "@/components/motionConfig";
import { VeilFrame } from "@/components/VeilFrame";
import type { ServiceIcon, SiteContent } from "@/data/siteContent";
import type { PageKey } from "@/types/navigation";

const serviceIcons: Record<ServiceIcon, React.ReactNode> = {
  Terminal: <Terminal className="h-5 w-5" />,
  Network: <Network className="h-5 w-5" />,
  Eye: <Eye className="h-5 w-5" />,
  Lock: <Lock className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  ArrowRight: <ArrowRight className="h-5 w-5" />,
};

type ServicesPageProps = {
  content: SiteContent["servicesPage"];
  goToPage: (target: PageKey) => void;
};

export function ServicesPage({ content, goToPage }: ServicesPageProps) {
  return (
    <PageShell eyebrow={content.eyebrow} title={content.title} text={content.text}>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-6">
        {content.services.map((service, index) => (
          <motion.div key={service.title} {...cardMotion} className={`h-full ${index === 0 || index === 3 ? "xl:col-span-3" : "xl:col-span-2"}`}>
            <DossierPanel eyebrow={`BV SERVICE / ${String(index + 1).padStart(2, "0")}`} title={service.title} text={service.text} className="h-full md:backdrop-blur-xl">
              <div className="mb-6 flex h-12 w-12 items-center justify-center border border-amber-300/20 bg-amber-300/5 text-amber-200" aria-hidden="true">{serviceIcons[service.icon]}</div>
              <SignalLedger items={service.deliverables} />
            </DossierPanel>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 rounded-[2rem] border border-amber-300/15 bg-black/45 p-5 md:p-8 md:backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.32em] text-amber-300">{content.outcomes.eyebrow}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {content.outcomes.items.map((item, index) => (
            <div key={item} className="rounded-2xl border border-stone-800 bg-stone-950/55 p-5">
              <p className="font-mono text-xs text-amber-300/70">0{index + 1}</p>
              <p className="mt-3 font-serif text-2xl text-stone-100">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-28 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.architecture.eyebrow}</p>
          <h2 className="mt-6 font-serif text-4xl leading-tight text-stone-100 md:text-6xl">{content.architecture.title}</h2>
          <p className="mt-6 text-lg leading-8 text-stone-500">{content.architecture.text}</p>
        </div>
        <VeilFrame label={content.architecture.eyebrow} index="BV MAP" className="archive-noise p-5 md:p-8">
          <div className="grid gap-3 sm:grid-cols-2">
            {content.architecture.nodes.map((node, index) => (
              <div key={node} className={`border border-stone-800 bg-black/45 p-5 ${index === 0 || index === 5 ? "sm:col-span-2" : ""}`}>
                <p className="font-mono text-xs text-amber-300/70">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-4 font-serif text-3xl text-stone-100">{node}</p>
              </div>
            ))}
          </div>
        </VeilFrame>
      </div>

      <div className="mt-28 rounded-[2.5rem] border border-amber-300/20 bg-gradient-to-br from-stone-950 to-black p-7 md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.subscription.eyebrow}</p>
            <h2 className="mt-6 max-w-4xl font-serif text-4xl leading-tight text-stone-100 md:text-6xl">{content.subscription.title}</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-500">{content.subscription.text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button type="button" onClick={() => goToPage("pricing")} className="inline-flex min-h-14 items-center justify-center rounded-full bg-amber-300 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition duration-500 hover:bg-amber-200 md:text-base">
              {content.subscription.ctaPrimary}
            </Button>
            <Button type="button" onClick={() => goToPage("access")} className="inline-flex min-h-14 items-center justify-center rounded-full border border-stone-700 bg-transparent px-8 py-4 text-sm uppercase tracking-[0.2em] text-stone-200 transition duration-500 hover:border-amber-300/35 hover:bg-stone-900 hover:text-amber-200 md:text-base">
              {content.subscription.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-28">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.monthly.eyebrow}</p>
        <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-stone-100 md:text-6xl">{content.monthly.title}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {content.monthly.items.map((item, index) => (
            <motion.div key={item.title} {...cardMotion} className="rounded-[2rem] border border-stone-800 bg-black/45 p-6">
              <p className="font-mono text-xs text-amber-300/70">0{index + 1}</p>
              <h3 className="mt-6 font-serif text-2xl text-amber-100">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-stone-500">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-28">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.layers.eyebrow}</p>
        <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-stone-100 md:text-6xl">{content.layers.title}</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {content.layers.items.map((item, index) => (
            <motion.div key={item.title} {...cardMotion} className={panelClass + " p-8"}>
              <p className="font-serif text-5xl text-amber-100/20">0{index + 1}</p>
              <h3 className="mt-8 font-serif text-3xl text-amber-100">{item.title}</h3>
              <p className="mt-5 text-base leading-7 text-stone-500">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-28">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.projectTypesLabel}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.projectTypes.map((item) => (
            <motion.div key={item} {...cardMotion} className="rounded-2xl border border-stone-800 bg-black/40 p-6 transition duration-500 hover:-translate-y-1 hover:border-amber-300/30 hover:bg-black/60 hover:shadow-[0_0_35px_rgba(251,191,36,0.08)]">
              <p className="font-serif text-2xl text-stone-100">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-28 rounded-[2.5rem] border border-stone-800 bg-stone-950/45 p-7 md:p-12">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.comparison.eyebrow}</p>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-stone-100 md:text-6xl">{content.comparison.title}</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {content.comparison.items.map((item) => (
              <motion.div key={item.title} {...cardMotion} className="rounded-[2rem] border border-amber-300/15 bg-black/45 p-6">
                <h3 className="font-serif text-2xl text-amber-100">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-stone-500">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 rounded-[2rem] border border-amber-300/15 bg-black/45 p-6 md:mt-28 md:p-10 md:backdrop-blur-xl">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-amber-300">{content.ctaLabel}</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-stone-100 md:text-5xl">{content.ctaTitle}</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-500">{content.ctaText}</p>
          </div>
          <Button type="button" onClick={() => goToPage("access")} className="inline-flex min-h-14 items-center justify-center rounded-full bg-amber-300 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition duration-500 hover:bg-amber-200 hover:shadow-[0_0_45px_rgba(251,191,36,0.28)] md:text-base">
            {content.ctaAction} <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
