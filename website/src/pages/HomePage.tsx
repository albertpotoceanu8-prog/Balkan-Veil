import { ArrowRight, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArchiveStamp } from "@/components/ArchiveStamp";
import { DecodeText } from "@/components/DecodeText";
import { DossierPanel } from "@/components/DossierPanel";
import { InterfaceMockup } from "@/components/InterfaceMockup";
import { ProcessPreview } from "@/components/ProcessPreview";
import { SectionCTA } from "@/components/SectionCTA";
import { SignalLedger } from "@/components/SignalLedger";
import { SignalStrip } from "@/components/SignalStrip";
import { VeilDivider } from "@/components/VeilDivider";
import { VeilFrame } from "@/components/VeilFrame";
import { cardMotion, panelClass } from "@/components/motionConfig";
import type { SiteContent } from "@/data/siteContent";
import type { PageKey } from "@/types/navigation";

type HomePageProps = {
  content: SiteContent["home"];
  goToPage: (target: PageKey) => void;
  cinematic: boolean;
  introDone: boolean;
};

export function HomePage({ content, goToPage, cinematic, introDone }: HomePageProps) {
  return (
    <>
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-120px)] max-w-[1500px] flex-col justify-center overflow-hidden px-5 py-12 md:min-h-[calc(100vh-160px)] md:px-8 md:py-20">
        <div className="absolute inset-x-0 top-12 h-96 veil-lines opacity-25" aria-hidden="true" />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="relative grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
          <div>
            <div className="mb-8 inline-flex max-w-full items-center gap-2 border border-amber-300/20 bg-amber-300/5 px-4 py-3 text-xs uppercase tracking-[0.24em] text-amber-200 sm:px-5 sm:text-sm sm:tracking-[0.3em]">
              <Lock className="h-4 w-4 shrink-0" aria-hidden="true" /> <span>{content.badge}</span>
            </div>
            <h1 className="max-w-6xl font-serif text-[clamp(3.2rem,16vw,5.75rem)] leading-[0.95] text-stone-100 sm:text-6xl md:text-8xl md:leading-[0.9] lg:text-[8.8rem]">
              {cinematic ? <DecodeText text={content.hero} canStart={introDone} /> : content.hero}
            </h1>
            <p className="mt-8 max-w-4xl text-lg leading-8 text-stone-400 md:mt-10 md:text-2xl md:leading-10">{content.text}</p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row md:mt-12 md:gap-5" aria-label="Primary actions">
              <Button type="button" onClick={() => goToPage("access")} className="relative inline-flex min-h-14 items-center justify-center overflow-hidden rounded-full bg-amber-300 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition duration-500 hover:bg-amber-200 hover:shadow-[0_0_45px_rgba(251,191,36,0.28)] sm:px-9 md:text-base md:tracking-[0.24em]">
                {content.primaryCta} <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
              </Button>
              <Button type="button" onClick={() => goToPage("protocol")} variant="outline" className="inline-flex min-h-14 items-center justify-center rounded-full border border-stone-700 bg-transparent px-8 py-4 text-sm uppercase tracking-[0.2em] text-stone-200 transition duration-500 hover:border-amber-300/35 hover:bg-stone-900 hover:text-amber-200 hover:shadow-[0_0_35px_rgba(251,191,36,0.10)] sm:px-9 md:text-base md:tracking-[0.24em]">
                {content.secondaryCta}
              </Button>
            </div>
          </div>

          <VeilFrame label={content.dossier.stampLabel} index={content.dossier.stampCode} className="p-5 md:p-7 lg:mt-20">
            <div className="archive-noise p-5 md:p-7">
              <div className="flex items-start justify-between gap-4">
                <ArchiveStamp code={content.dossier.stampCode} label={content.dossier.stampLabel} status={content.dossier.status} />
                <span className="mt-2 h-16 w-px bg-amber-300/25" aria-hidden="true" />
              </div>
              <SignalLedger items={content.dossier.items} label={content.dossier.ledgerLabel} className="mt-10" />
              <p className="mt-8 border-l border-amber-300/30 pl-5 text-base leading-7 text-stone-400">{content.dossier.note}</p>
            </div>
          </VeilFrame>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1500px] px-5 py-10 md:px-8">
        <div className="grid max-w-6xl gap-4 md:grid-cols-[1.2fr_0.8fr_1fr]">
          {content.valueProps.map((item, index) => (
            <motion.div key={item.title} {...cardMotion} className={`${panelClass} ${index === 0 ? "md:row-span-2" : ""} p-5 md:p-7 md:backdrop-blur-xl`}>
              <p className="font-mono text-xs text-amber-300/70">BV {String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-5 font-serif text-2xl text-amber-100 md:text-3xl">{item.title}</h3>
              <p className="mt-4 text-base leading-7 text-stone-500">{item.text}</p>
            </motion.div>
          ))}
        </div>
        <VeilDivider className="mt-14" />
        <SignalStrip items={content.signalStrip} />

        <div className="mt-20 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:self-start">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.builtAround}</p>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-stone-100 md:text-7xl">
              <DecodeText text={content.builtTitle} disabled />
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.audience.map((item, index) => (
              <DossierPanel key={item} title={item} index={`0${index + 1}`} className={index === 0 ? "sm:col-span-2" : ""} />
            ))}
          </div>
        </div>

        <div className="mt-24 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.launchChanges.eyebrow}</p>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-stone-100 md:text-6xl">{content.launchChanges.title}</h2>
            <p className="mt-6 text-lg leading-8 text-stone-500">{content.launchChanges.text}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {content.launchChanges.items.map((item, index) => (
              <motion.div key={item.title} {...cardMotion} className="relative overflow-hidden rounded-[2rem] border border-stone-800 bg-black/45 p-6 transition duration-500 hover:-translate-y-1 hover:border-amber-300/30 hover:bg-stone-950/70">
                <p className="font-serif text-5xl text-amber-100/20">0{index + 1}</p>
                <h3 className="mt-8 font-serif text-2xl text-amber-100">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-stone-500">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <ProcessPreview eyebrow={content.methodPreview.eyebrow} title={content.methodPreview.title} steps={content.methodPreview.steps} />
        </div>

        <div className="mt-24">
          <InterfaceMockup eyebrow={content.interfacePreview.eyebrow} title={content.interfacePreview.title} text={content.interfacePreview.text} systemLabel={content.interfacePreview.systemLabel} statusLine={content.interfacePreview.statusLine} moduleLabel={content.interfacePreview.moduleLabel} metrics={content.interfacePreview.metrics} rows={content.interfacePreview.rows} />
        </div>

        <div className="mt-24 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="rounded-[2.5rem] border border-amber-300/20 bg-black/55 p-7 md:p-10 md:backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.subscriptionIntro.eyebrow}</p>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-stone-100 md:text-6xl">{content.subscriptionIntro.title}</h2>
            <p className="mt-6 text-lg leading-8 text-stone-500">{content.subscriptionIntro.text}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.subscriptionIntro.points.map((point, index) => (
              <motion.div key={point} {...cardMotion} className={panelClass + " p-6"}>
                <p className="font-mono text-xs text-amber-300/70">0{index + 1}</p>
                <p className="mt-5 font-serif text-2xl leading-tight text-stone-100">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-24 rounded-[2.5rem] border border-stone-800 bg-stone-950/45 p-7 md:p-12">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.beforeAfter.eyebrow}</p>
          <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-stone-100 md:text-6xl">{content.beforeAfter.title}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              { label: content.beforeAfter.beforeLabel, items: content.beforeAfter.before },
              { label: content.beforeAfter.afterLabel, items: content.beforeAfter.after },
            ].map((group) => (
              <div key={group.label} className="rounded-[2rem] border border-stone-800 bg-black/45 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300">{group.label}</p>
                <div className="mt-6 space-y-3">
                  {group.items.map((item) => (
                    <p key={item} className="rounded-2xl border border-stone-900 bg-stone-950/55 px-4 py-3 text-stone-400">{item}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <SectionCTA eyebrow={content.finalCta.eyebrow} title={content.finalCta.title} text={content.finalCta.text} primaryLabel={content.finalCta.primary} secondaryLabel={content.finalCta.secondary} primaryTarget="access" secondaryTarget="pricing" goToPage={goToPage} />
        </div>
      </section>
    </>
  );
}
