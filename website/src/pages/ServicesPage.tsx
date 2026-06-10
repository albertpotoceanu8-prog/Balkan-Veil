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
              <div className="mb-6 flex h-12 w-12 items-center justify-center border border-[#3a2410] bg-[#c5823f]/5 text-[#d49a4e]" aria-hidden="true">{serviceIcons[service.icon]}</div>
              <SignalLedger items={service.deliverables} />
            </DossierPanel>
          </motion.div>
        ))}
      </div>

      <div className="operator-surface mt-16 border border-[#3a2410] bg-black/45 p-5 md:p-8 md:backdrop-blur-xl">
        <div className="absolute inset-0 operator-grid opacity-15" aria-hidden="true" />
        <p className="text-xs uppercase tracking-[0.32em] text-[#b2753a]">{content.outcomes.eyebrow}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {content.outcomes.items.map((item, index) => (
            <div key={item} className="relative border border-[#2a190b] bg-[#050302]/88 p-5">
              <span className="absolute right-4 top-4 h-2 w-2 bg-[#c5823f]/40" aria-hidden="true" />
              <p className="font-mono text-xs text-[#b2753a]">0{index + 1}</p>
              <p className="mt-3 font-serif text-2xl text-[#d5c0a0]">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="operator-surface mt-20 border border-[#2a190b] bg-[#050302]/86 p-6 md:p-10 md:backdrop-blur-xl">
        <div className="absolute inset-0 operator-grid opacity-10" aria-hidden="true" />
        <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <div className="mb-6 flex h-12 w-12 items-center justify-center border border-[#3a2410] bg-[#c5823f]/5 text-[#d49a4e]" aria-hidden="true">
              <Shield className="h-5 w-5" />
            </div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#b2753a]">{content.trust.eyebrow}</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-[#d5c0a0] md:text-5xl">{content.trust.title}</h2>
            <p className="mt-5 text-base leading-7 text-[#6c5e4e] md:text-lg md:leading-8">{content.trust.text}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {content.trust.groups.map((group) => (
              <div key={group.title} className="border border-[#2a190b] bg-black/45 p-5">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#b2753a]">{group.title}</p>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-[#756650]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#c5823f]/55" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-28 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#b2753a]">{content.architecture.eyebrow}</p>
          <h2 className="mt-6 font-serif text-4xl leading-tight text-[#d5c0a0] md:text-6xl">{content.architecture.title}</h2>
          <p className="mt-6 text-lg leading-8 text-[#6c5e4e]">{content.architecture.text}</p>
        </div>
        <VeilFrame label={content.architecture.eyebrow} index="BV MAP" className="archive-noise p-5 md:p-8">
          <div className="grid gap-3 sm:grid-cols-2">
            {content.architecture.nodes.map((node, index) => (
              <div key={node} className={`relative border border-[#2a190b] bg-black/45 p-5 ${index === 0 || index === 5 ? "sm:col-span-2" : ""}`}>
                <span className={index % 4 === 2 ? "absolute right-4 top-4 h-2 w-2 bg-red-300/35" : "absolute right-4 top-4 h-2 w-2 bg-[#9a6936]/45"} aria-hidden="true" />
                <p className="font-mono text-xs text-[#b2753a]">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-4 font-serif text-3xl text-[#d5c0a0]">{node}</p>
              </div>
            ))}
          </div>
        </VeilFrame>
      </div>

      <div className="operator-surface mt-28 border border-[#3a2410] bg-gradient-to-br from-[#050302] to-black p-7 md:p-12">
        <div className="absolute inset-0 operator-grid opacity-20" aria-hidden="true" />
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#b2753a]">{content.subscription.eyebrow}</p>
            <h2 className="mt-6 max-w-4xl font-serif text-4xl leading-tight text-[#d5c0a0] md:text-6xl">{content.subscription.title}</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#6c5e4e]">{content.subscription.text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button type="button" onClick={() => goToPage("pricing")} className="inline-flex min-h-14 items-center justify-center border border-[#c5823f] bg-[#c5823f] px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-black transition duration-500 hover:bg-[#d5c0a0]">
              {content.subscription.ctaPrimary}
            </Button>
            <Button type="button" onClick={() => goToPage("access")} className="inline-flex min-h-14 items-center justify-center border border-[#3a2410] bg-transparent px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#b2753a] transition duration-500 hover:border-[#c5823f] hover:bg-[#090503] hover:text-[#d5c0a0]">
              {content.subscription.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-28">
        <p className="text-sm uppercase tracking-[0.35em] text-[#b2753a]">{content.monthly.eyebrow}</p>
        <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-[#d5c0a0] md:text-6xl">{content.monthly.title}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {content.monthly.items.map((item, index) => (
            <motion.div key={item.title} {...cardMotion} className="operator-surface border border-[#2a190b] bg-black/45 p-6">
              <p className="font-mono text-xs text-[#b2753a]">0{index + 1}</p>
              <h3 className="mt-6 font-serif text-2xl text-[#d5c0a0]">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-[#6c5e4e]">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-28">
        <p className="text-sm uppercase tracking-[0.35em] text-[#b2753a]">{content.layers.eyebrow}</p>
        <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-[#d5c0a0] md:text-6xl">{content.layers.title}</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {content.layers.items.map((item, index) => (
            <motion.div key={item.title} {...cardMotion} className={panelClass + " operator-surface rounded-none p-8"}>
              <p className="font-serif text-5xl text-[#c5823f]/20">0{index + 1}</p>
              <h3 className="mt-8 font-serif text-3xl text-[#d5c0a0]">{item.title}</h3>
              <p className="mt-5 text-base leading-7 text-[#6c5e4e]">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-28">
        <p className="text-sm uppercase tracking-[0.35em] text-[#b2753a]">{content.projectTypesLabel}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.projectTypes.map((item) => (
            <motion.div key={item} {...cardMotion} className="border border-[#2a190b] bg-black/40 p-6 transition duration-500 hover:-translate-y-1 hover:border-[#9a6936]/45 hover:bg-black/60 hover:shadow-[0_0_35px_rgba(251,191,36,0.08)]">
              <p className="font-serif text-2xl text-[#d5c0a0]">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="operator-surface mt-28 border border-[#2a190b] bg-[#050302]/86 p-7 md:p-12">
        <div className="absolute inset-0 operator-grid opacity-15" aria-hidden="true" />
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#b2753a]">{content.comparison.eyebrow}</p>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-[#d5c0a0] md:text-6xl">{content.comparison.title}</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {content.comparison.items.map((item) => (
              <motion.div key={item.title} {...cardMotion} className="border border-[#3a2410] bg-black/45 p-6">
                <h3 className="font-serif text-2xl text-[#d5c0a0]">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-[#6c5e4e]">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="operator-surface mt-20 border border-[#3a2410] bg-black/45 p-6 md:mt-28 md:p-10 md:backdrop-blur-xl">
        <div className="absolute inset-0 operator-grid opacity-15" aria-hidden="true" />
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#b2753a]">{content.ctaLabel}</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#d5c0a0] md:text-5xl">{content.ctaTitle}</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#6c5e4e]">{content.ctaText}</p>
          </div>
          <Button type="button" onClick={() => goToPage("access")} className="inline-flex min-h-14 items-center justify-center border border-[#c5823f] bg-[#c5823f] px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-black transition duration-500 hover:bg-[#d5c0a0]">
            {content.ctaAction} <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
