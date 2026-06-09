import { Activity, ArrowRight, CheckCircle2, CircuitBoard, Lock, Radar, Server, Shield, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DecodeText } from "@/components/DecodeText";
import { InterfaceMockup } from "@/components/InterfaceMockup";
import { ProcessPreview } from "@/components/ProcessPreview";
import { SectionCTA } from "@/components/SectionCTA";
import { SignalStrip } from "@/components/SignalStrip";
import { cardMotion } from "@/components/motionConfig";
import type { SiteContent } from "@/data/siteContent";
import type { PageKey } from "@/types/navigation";

type HomePageProps = {
  content: SiteContent["home"];
  goToPage: (target: PageKey) => void;
  cinematic: boolean;
  introDone: boolean;
};

const commandPanel =
  "operator-surface relative overflow-hidden rounded-[6px] border border-amber-300/20 bg-[#050505]/88 shadow-[0_0_70px_rgba(212,175,55,0.10),inset_0_1px_0_rgba(255,255,255,0.04)]";

const mutedPanel =
  "relative overflow-hidden rounded-[6px] border border-stone-800 bg-[#090909]/78 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]";

export function HomePage({ content, goToPage, cinematic, introDone }: HomePageProps) {
  return (
    <>
      <section className="relative z-10 mx-auto min-h-[calc(100svh-96px)] max-w-[1500px] overflow-hidden px-5 py-8 md:min-h-[calc(100vh-160px)] md:px-8 md:py-12">
        <div className="absolute inset-0 operator-grid opacity-35" aria-hidden="true" />
        <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-0 left-5 top-0 hidden w-px bg-gradient-to-b from-amber-300/70 via-amber-300/15 to-transparent md:block" aria-hidden="true" />
        <div className="absolute bottom-0 right-5 top-0 hidden w-px bg-gradient-to-b from-transparent via-amber-300/15 to-amber-300/60 md:block" aria-hidden="true" />

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }} className="relative grid min-h-[calc(100svh-140px)] gap-5 lg:grid-cols-[0.98fr_1.02fr] lg:items-stretch">
          <div className="flex flex-col justify-between gap-6">
            <div className={`${commandPanel} p-5 md:p-7 lg:p-8`}>
              <div className="absolute inset-0 operator-scan opacity-30" aria-hidden="true" />
              <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-amber-300/15 pb-5">
                <div className="inline-flex items-center gap-2 border border-amber-300/35 bg-amber-300/10 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-amber-100 shadow-[0_0_32px_rgba(212,175,55,0.18)] md:text-xs">
                  <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                  {content.badge}
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-amber-300/75">
                  <span className="h-2 w-2 bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.8)]" aria-hidden="true" />
                  command center online
                </div>
              </div>

              <div className="relative pt-7 md:pt-10">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-amber-300/80">Balkan Veil / Public Interface</p>
                <h1 className="max-w-6xl font-serif text-[clamp(3rem,14vw,6.6rem)] leading-[0.86] text-stone-50 drop-shadow-[0_0_28px_rgba(212,175,55,0.14)] md:text-[clamp(5.5rem,9vw,9.2rem)]">
                  {cinematic ? <DecodeText text={content.hero} canStart={introDone} /> : content.hero}
                </h1>
                <p className="mt-7 max-w-4xl border-l-2 border-amber-300/55 pl-5 text-base leading-8 text-stone-300 md:mt-9 md:text-xl md:leading-9">{content.text}</p>
              </div>

              <div className="relative mt-8 grid gap-3 sm:grid-cols-2 md:mt-10">
                <Button type="button" onClick={() => goToPage("access")} className="inline-flex min-h-14 items-center justify-center rounded-[5px] border border-amber-200/70 bg-amber-300 px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-black shadow-[0_0_42px_rgba(212,175,55,0.35)] transition duration-300 hover:bg-amber-100 hover:shadow-[0_0_58px_rgba(212,175,55,0.45)]">
                  {content.primaryCta}
                  <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
                </Button>
                <Button type="button" onClick={() => goToPage("protocol")} variant="outline" className="inline-flex min-h-14 items-center justify-center rounded-[5px] border border-amber-300/40 bg-black/45 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-amber-100 transition duration-300 hover:border-amber-200 hover:bg-amber-300/10 hover:text-amber-50 hover:shadow-[0_0_38px_rgba(212,175,55,0.18)]">
                  {content.secondaryCta}
                </Button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {content.methodPreview.steps.slice(0, 3).map((step, index) => (
                <motion.div key={step} {...cardMotion} className={`${mutedPanel} p-4`}>
                  <div className="absolute inset-x-0 top-0 h-px bg-amber-300/40" aria-hidden="true" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-300/65">phase 0{index + 1}</p>
                  <p className="mt-3 font-serif text-xl leading-tight text-stone-100">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <CommandCenter content={content} />
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1500px] px-5 py-8 md:px-8 md:py-12">
        <SignalStrip items={content.signalStrip} />

        <div className="mt-10 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <section className={`${commandPanel} p-5 md:p-8`}>
            <div className="absolute inset-0 operator-grid opacity-25" aria-hidden="true" />
            <div className="relative flex items-center gap-3">
              <Terminal className="h-5 w-5 text-amber-300" aria-hidden="true" />
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-amber-300">{content.builtAround}</p>
            </div>
            <h2 className="relative mt-6 max-w-3xl font-serif text-4xl leading-[0.95] text-stone-50 md:text-7xl">
              <DecodeText text={content.builtTitle} disabled />
            </h2>
          </section>

          <div className="grid gap-4 md:grid-cols-3">
            {content.valueProps.map((item, index) => (
              <motion.article key={item.title} {...cardMotion} className={`${mutedPanel} p-5 transition duration-300 hover:border-amber-300/45 hover:bg-[#0d0a04]`}>
                <div className="absolute right-0 top-0 h-14 w-14 border-b border-l border-amber-300/20" aria-hidden="true" />
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-300/70">directive 0{index + 1}</p>
                <h3 className="mt-5 font-serif text-2xl leading-tight text-amber-100">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-stone-500">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
          <div className={`${commandPanel} p-5 md:p-7`}>
            <div className="absolute inset-0 operator-scan opacity-20" aria-hidden="true" />
            <div className="relative flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-amber-300">{content.launchChanges.eyebrow}</p>
                <h2 className="mt-3 max-w-4xl font-serif text-3xl leading-tight text-stone-50 md:text-5xl">{content.launchChanges.title}</h2>
              </div>
              <Radar className="h-10 w-10 text-amber-300 drop-shadow-[0_0_18px_rgba(212,175,55,0.35)]" aria-hidden="true" />
            </div>
            <p className="relative mt-5 max-w-4xl text-base leading-7 text-stone-500 md:text-lg md:leading-8">{content.launchChanges.text}</p>
            <div className="relative mt-7 grid gap-4 md:grid-cols-3">
              {content.launchChanges.items.map((item, index) => (
                <motion.article key={item.title} {...cardMotion} className="rounded-[5px] border border-stone-800 bg-black/45 p-5 transition duration-300 hover:border-amber-300/45 hover:bg-amber-300/[0.04]">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-300/70">output 0{index + 1}</p>
                  <h3 className="mt-5 font-serif text-2xl leading-tight text-amber-100">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-stone-500">{item.text}</p>
                </motion.article>
              ))}
            </div>
          </div>

          <section className={`${mutedPanel} p-5 md:p-7`}>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-amber-300">Target fit</p>
            <div className="mt-5 grid gap-3">
              {content.audience.map((item, index) => (
                <div key={item} className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 rounded-[4px] border border-stone-800 bg-black/45 px-4 py-3">
                  <span className="font-mono text-xs text-amber-300/75">0{index + 1}</span>
                  <span className="text-sm leading-6 text-stone-300">{item}</span>
                  <CheckCircle2 className="h-4 w-4 text-amber-300/80" aria-hidden="true" />
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-12 md:mt-16">
          <InterfaceMockup eyebrow={content.interfacePreview.eyebrow} title={content.interfacePreview.title} text={content.interfacePreview.text} systemLabel={content.interfacePreview.systemLabel} statusLine={content.interfacePreview.statusLine} moduleLabel={content.interfacePreview.moduleLabel} metrics={content.interfacePreview.metrics} rows={content.interfacePreview.rows} />
        </div>

        <div className="mt-12 grid gap-4 md:mt-16 lg:grid-cols-[0.9fr_1.1fr]">
          <section className={`${commandPanel} p-5 md:p-8`}>
            <div className="absolute inset-0 operator-grid opacity-20" aria-hidden="true" />
            <p className="relative font-mono text-xs uppercase tracking-[0.28em] text-amber-300">{content.subscriptionIntro.eyebrow}</p>
            <h2 className="relative mt-5 font-serif text-3xl leading-tight text-stone-50 md:text-5xl">{content.subscriptionIntro.title}</h2>
            <p className="relative mt-5 text-base leading-7 text-stone-500 md:text-lg md:leading-8">{content.subscriptionIntro.text}</p>
          </section>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.subscriptionIntro.points.map((point, index) => (
              <motion.div key={point} {...cardMotion} className={`${mutedPanel} p-6`}>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-300/70">module 0{index + 1}</p>
                <p className="mt-5 font-serif text-2xl leading-tight text-stone-100">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <ProcessPreview eyebrow={content.methodPreview.eyebrow} title={content.methodPreview.title} steps={content.methodPreview.steps} />
        </div>

        <div className={`${commandPanel} mt-12 p-5 md:mt-16 md:p-8`}>
          <div className="absolute inset-0 operator-grid opacity-20" aria-hidden="true" />
          <p className="relative font-mono text-xs uppercase tracking-[0.28em] text-amber-300">{content.beforeAfter.eyebrow}</p>
          <h2 className="relative mt-5 max-w-5xl font-serif text-3xl leading-tight text-stone-50 md:text-5xl">{content.beforeAfter.title}</h2>
          <div className="relative mt-8 grid gap-4 md:grid-cols-2">
            {[
              { label: content.beforeAfter.beforeLabel, items: content.beforeAfter.before, tone: "border-red-300/25 text-red-200/80" },
              { label: content.beforeAfter.afterLabel, items: content.beforeAfter.after, tone: "border-amber-300/35 text-amber-100" },
            ].map((group) => (
              <div key={group.label} className="rounded-[5px] border border-stone-800 bg-black/50 p-5">
                <p className={`inline-flex border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.24em] ${group.tone}`}>{group.label}</p>
                <div className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <p key={item} className="rounded-[4px] border border-stone-800 bg-stone-950/65 px-4 py-3 text-sm leading-6 text-stone-400">{item}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <SectionCTA eyebrow={content.finalCta.eyebrow} title={content.finalCta.title} text={content.finalCta.text} primaryLabel={content.finalCta.primary} secondaryLabel={content.finalCta.secondary} primaryTarget="access" secondaryTarget="pricing" goToPage={goToPage} />
        </div>
      </section>
    </>
  );
}

function CommandCenter({ content }: { content: SiteContent["home"] }) {
  return (
    <div className={`${commandPanel} grid min-h-[620px] grid-rows-[auto_1fr_auto] p-4 md:p-5 lg:min-h-0`}>
      <div className="absolute inset-0 operator-grid opacity-35" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.18),transparent_36%)]" aria-hidden="true" />

      <div className="relative flex flex-wrap items-center justify-between gap-4 border-b border-amber-300/15 pb-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber-300">VEIL OS</p>
          <p className="mt-1 font-serif text-2xl text-stone-50">{content.interfacePreview.systemLabel}</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["LIVE", "SYNC", "QA"].map((label) => (
            <span key={label} className="rounded-[3px] border border-amber-300/25 bg-amber-300/10 px-3 py-2 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-amber-100">
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="relative grid gap-4 py-4 xl:grid-cols-[0.72fr_1.28fr]">
        <div className="grid gap-4">
          <StatusBlock icon={<Activity className="h-4 w-4" />} label="signal" value={content.interfacePreview.metrics[0] || "Signal clarity"} />
          <StatusBlock icon={<Shield className="h-4 w-4" />} label="control" value={content.interfacePreview.metrics[1] || "Offer frame"} />
          <StatusBlock icon={<Server className="h-4 w-4" />} label="launch" value={content.interfacePreview.metrics[2] || "Launch path"} />
        </div>

        <div className="rounded-[5px] border border-amber-300/20 bg-black/58 p-4 shadow-[0_0_60px_rgba(212,175,55,0.08)]">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber-300">{content.interfacePreview.moduleLabel}</p>
            <CircuitBoard className="h-5 w-5 text-amber-300/80" aria-hidden="true" />
          </div>
          <div className="grid gap-3">
            {content.interfacePreview.rows.map((row, index) => (
              <div key={row} className="grid grid-cols-[2.6rem_1fr_auto] items-center gap-3 rounded-[4px] border border-stone-800 bg-[#080808]/85 px-4 py-3">
                <span className="font-mono text-[11px] text-amber-300/70">0{index + 1}</span>
                <span className="text-sm text-stone-300">{row}</span>
                <span className={index === 1 ? "h-2.5 w-2.5 border border-amber-300/60" : "h-2.5 w-2.5 bg-amber-300 shadow-[0_0_14px_rgba(212,175,55,0.65)]"} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative grid gap-3 border-t border-amber-300/15 pt-4 md:grid-cols-3">
        {content.dossier.items.map((item, index) => (
          <div key={item} className="rounded-[4px] border border-stone-800 bg-black/50 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300/65">node 0{index + 1}</p>
            <p className="mt-3 text-sm leading-6 text-stone-300">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBlock({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-[5px] border border-stone-800 bg-black/55 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="grid h-9 w-9 place-items-center rounded-[4px] border border-amber-300/30 bg-amber-300/10 text-amber-200">{icon}</div>
        <span className="h-2 w-2 bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.75)]" aria-hidden="true" />
      </div>
      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.24em] text-amber-300/65">{label}</p>
      <p className="mt-2 font-serif text-2xl leading-tight text-stone-50">{value}</p>
    </div>
  );
}
