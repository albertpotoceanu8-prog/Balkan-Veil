import type React from "react";
import { ArrowRight, Eye, Lock, Network, Shield, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { DossierPanel } from "@/components/DossierPanel";
import { PageShell } from "@/components/PageShell";
import { SignalLedger } from "@/components/SignalLedger";
import { Button } from "@/components/ui/button";
import { cardMotion } from "@/components/motionConfig";
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
      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-6">
        {content.services.map((service, index) => (
          <motion.div key={service.title} {...cardMotion} className={`h-full ${index === 0 || index === 3 ? "xl:col-span-3" : "xl:col-span-2"}`}>
            <DossierPanel eyebrow={`BV SERVICE / ${String(index + 1).padStart(2, "0")}`} title={service.title} text={service.text} className="h-full md:backdrop-blur-xl">
              <div className="mb-6 flex h-12 w-12 items-center justify-center border border-[#252729] bg-[#b98a32]/5 text-[#d2aa55]" aria-hidden="true">{serviceIcons[service.icon]}</div>
              <SignalLedger items={service.deliverables} />
            </DossierPanel>
          </motion.div>
        ))}
      </div>

      <div className="operator-surface mt-32 border border-[#202224] bg-[#030201] p-8 md:mt-40 md:p-14 md:backdrop-blur-xl">
        <div className="absolute inset-0 operator-grid opacity-12" aria-hidden="true" />
        <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h2 className="max-w-4xl font-serif text-4xl leading-tight text-[#c8ad72] md:text-6xl">{content.outcomes.eyebrow}</h2>
          </div>
          <span className="hidden h-px w-40 bg-gradient-to-r from-[#7d6a45]/65 to-transparent md:block" aria-hidden="true" />
        </div>
        <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.outcomes.items.map((item, index) => (
            <div key={item} className="relative min-h-36 border border-[#202224] bg-[#050302]/88 p-7">
              <span className="absolute right-4 top-4 h-2 w-2 bg-[#b98a32]/40" aria-hidden="true" />
              <p className="font-mono text-xs text-[#b98a32]">0{index + 1}</p>
              <p className="mt-6 font-serif text-2xl leading-tight text-[#c8ad72]">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-40 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#b98a32]">{content.architecture.eyebrow}</p>
          <h2 className="mt-6 font-serif text-4xl leading-tight text-[#c8ad72] md:text-6xl">{content.architecture.title}</h2>
          <p className="mt-6 text-lg leading-8 text-[#786f5e]">{content.architecture.text}</p>
        </div>
        <VeilFrame label={content.architecture.eyebrow} index="BV MAP" className="archive-noise p-8 md:p-12">
          <div className="grid gap-5 sm:grid-cols-2">
            {content.architecture.nodes.map((node, index) => (
              <div key={node} className={`relative border border-[#202224] bg-black/45 p-5 ${index === 0 || index === 5 ? "sm:col-span-2" : ""}`}>
                <span className={index % 4 === 2 ? "absolute right-4 top-4 h-2 w-2 bg-red-300/35" : "absolute right-4 top-4 h-2 w-2 bg-[#7d6a45]/45"} aria-hidden="true" />
                <p className="font-mono text-xs text-[#b98a32]">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-4 font-serif text-3xl text-[#c8ad72]">{node}</p>
              </div>
            ))}
          </div>
        </VeilFrame>
      </div>

      <div className="operator-surface mt-40 border border-[#202224] bg-[#030201] p-8 md:p-14">
        <div className="absolute inset-0 operator-grid opacity-20" aria-hidden="true" />
        <div className="relative grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#b98a32]">{content.subscription.eyebrow}</p>
            <h2 className="mt-6 max-w-4xl font-serif text-4xl leading-tight text-[#c8ad72] md:text-6xl">{content.subscription.title}</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#786f5e]">{content.subscription.text}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button type="button" onClick={() => goToPage("pricing")} className="inline-flex min-h-14 items-center justify-center border border-[#b98a32] bg-[#b98a32] px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-black transition duration-500 hover:bg-[#c8ad72]">
                {content.subscription.ctaPrimary}
              </Button>
              <Button type="button" onClick={() => goToPage("access")} className="inline-flex min-h-14 items-center justify-center border border-[#252729] bg-transparent px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#b98a32] transition duration-500 hover:border-[#b98a32] hover:bg-[#090503] hover:text-[#c8ad72]">
                {content.subscription.ctaSecondary}
              </Button>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#b98a32]">{content.monthly.eyebrow}</p>
            <h3 className="mt-5 font-serif text-3xl leading-tight text-[#c8ad72] md:text-4xl">{content.monthly.title}</h3>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {content.monthly.items.map((item, index) => (
                <motion.div key={item.title} {...cardMotion} className="operator-surface border border-[#202224] bg-black/45 p-6">
                  <p className="font-mono text-xs text-[#b98a32]">0{index + 1}</p>
                  <h4 className="mt-5 font-serif text-2xl text-[#c8ad72]">{item.title}</h4>
                  <p className="mt-4 text-sm leading-6 text-[#786f5e]">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-40">
        <p className="text-sm uppercase tracking-[0.35em] text-[#b98a32]">{content.projectTypesLabel}</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {content.projectTypes.map((item) => (
            <motion.div key={item} {...cardMotion} className="border border-[#202224] bg-black/40 p-7 transition duration-500 hover:-translate-y-1 hover:border-[#7d6a45]/45 hover:bg-black/60">
              <p className="font-serif text-2xl text-[#c8ad72]">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="operator-surface mt-40 border border-[#202224] bg-[#030201] p-8 md:p-12">
        <div className="absolute inset-0 operator-grid opacity-15" aria-hidden="true" />
        <div className="relative grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#b98a32]">{content.comparison.eyebrow}</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-[#c8ad72] md:text-5xl">{content.comparison.title}</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {content.comparison.items.map((item) => (
              <motion.div key={item.title} {...cardMotion} className="border border-[#252729] bg-black/45 p-6">
                <h3 className="font-serif text-2xl text-[#c8ad72]">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#786f5e]">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="operator-surface mt-40 border border-[#202224] bg-[#030201] p-8 md:p-14 md:backdrop-blur-xl">
        <div className="absolute inset-0 operator-grid opacity-15" aria-hidden="true" />
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#b98a32]">{content.ctaLabel}</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#c8ad72] md:text-5xl">{content.ctaTitle}</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#786f5e]">{content.ctaText}</p>
          </div>
          <Button type="button" onClick={() => goToPage("access")} className="inline-flex min-h-14 items-center justify-center border border-[#b98a32] bg-[#b98a32] px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-black transition duration-500 hover:bg-[#c8ad72]">
            {content.ctaAction} <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
