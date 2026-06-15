import { ArrowRight, CircleDot, Lock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { DecodeText } from "@/components/DecodeText";
import { SignalLedger } from "@/components/SignalLedger";
import { ThreeWireGlobe } from "@/components/ThreeWireGlobe";
import { VeilDivider } from "@/components/VeilDivider";
import type { SiteContent } from "@/data/siteContent";
import type { PageKey } from "@/types/navigation";

type HomePageProps = {
  content: SiteContent["home"];
  goToPage: (target: PageKey) => void;
  cinematic: boolean;
  introDone: boolean;
};

const archivePanel =
  "relative overflow-hidden border border-[#202224] bg-[#050302]/92";

const filePanel =
  "relative overflow-hidden border border-[#202224] bg-[#020100]/88 transition duration-300 hover:border-[#7d6a45]/55 hover:bg-[#090503]";
const sidePanel = "relative overflow-hidden border border-transparent bg-[#020100]/58";

const goldText = "text-[#b98a32]";
const mutedGoldText = "text-[#b98a32]";

const launchSectionMotion: Variants = {
  hidden: { backgroundColor: "rgba(3,2,1,0)", borderColor: "rgba(32,34,36,0)" },
  visible: {
    backgroundColor: "rgba(3,2,1,1)",
    borderColor: "rgba(32,34,36,1)",
    transition: { delay: 3.15, duration: 0.7, ease: "easeOut" },
  },
};

const launchGridMotion: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.2, transition: { delay: 3.15, duration: 0.7, ease: "easeOut" } },
};

const launchIntroMotion: Variants = {
  hidden: { opacity: 1, x: "calc(-100% - 4rem)" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const launchFrameSweepMotion: Variants = {
  hidden: { opacity: 0, x: "0%", scaleX: 1 },
  visible: {
    opacity: [0, 1, 0.88, 0],
    x: ["0%", "0%", "155%", "155%"],
    scaleX: [1, 1, 0.95, 0.95],
    transition: { delay: 1.75, duration: 1.75, times: [0, 0.22, 0.84, 1], ease: [0.16, 1, 0.3, 1] },
  },
};

const launchCardsMotion: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      opacity: { delay: 3.25, duration: 0.55, ease: "easeOut" },
      delayChildren: 3.45,
      staggerChildren: 0.34,
    },
  },
};

const launchCardMotion: Variants = {
  hidden: { opacity: 0, y: 58, scale: 0.74, rotateX: 16, z: -360 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    z: 0,
    transition: { duration: 1.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const splitSectionMotion: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
    },
  },
};

const splitCardLeftMotion: Variants = {
  hidden: { opacity: 0, x: "calc(-100% - 5rem)" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const splitCardRightMotion: Variants = {
  hidden: { opacity: 0, x: "calc(100% + 5rem)" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const sweepCardMotion: Variants = {
  hidden: { backgroundColor: "rgba(5,3,2,0)", borderColor: "rgba(32,34,36,0)" },
  visible: {
    backgroundColor: "rgba(5,3,2,0.94)",
    borderColor: "rgba(32,34,36,0)",
    transition: { delay: 2.55, duration: 1.6, ease: "easeOut" },
  },
};

const sweepCardDarkMotion: Variants = {
  hidden: { backgroundColor: "rgba(2,1,0,0)", borderColor: "rgba(32,34,36,0)" },
  visible: {
    backgroundColor: "rgba(2,1,0,1)",
    borderColor: "rgba(32,34,36,0)",
    transition: { delay: 2.55, duration: 1.6, ease: "easeOut" },
  },
};

const cardSweepMotion: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { delay: 2.65, duration: 6.8, ease: "linear" },
  },
};

const cardFramePointMotion: Variants = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: [0, 1, 1, 0],
    y: ["0%", "0%", "calc(100% - 0.45rem)", "calc(100% - 0.45rem)"],
    transition: { duration: 2.65, times: [0, 0.12, 0.9, 1], ease: [0.22, 1, 0.36, 1] },
  },
};

const cardFrameVerticalMotion: Variants = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: {
    opacity: [0, 1, 1],
    scaleY: [0, 1, 1],
    transition: { duration: 2.65, times: [0, 0.9, 1], ease: [0.22, 1, 0.36, 1] },
  },
};

const sweepContentMotion: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: { delay: 2.65, duration: 6.8, ease: "linear" },
  },
};

const sweepInnerCardsMotion: Variants = {
  hidden: {},
  visible: {},
};

const sweepInnerCardMotion: Variants = {
  hidden: { backgroundColor: "rgba(0,0,0,0.28)", borderColor: "rgba(32,34,36,1)" },
  visible: {
    backgroundColor: "rgba(0,0,0,0.28)",
    borderColor: "rgba(32,34,36,1)",
  },
};

export function HomePage({ content, goToPage, cinematic, introDone }: HomePageProps) {
  return (
    <>
      <section className="relative z-10 mx-auto max-w-[1500px] px-2.5 pb-6 pt-2.5 text-[#b6a27a] sm:px-5 sm:pb-8 md:px-8 md:pb-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(185,138,50,0.10),transparent_28rem)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-[#7d6a45]/50 to-transparent sm:inset-x-5 md:inset-x-8" aria-hidden="true" />

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className={`${archivePanel} min-h-[calc(100svh-6rem)]`}>
          <div className="pointer-events-none absolute inset-0 opacity-[0.24] [background-image:linear-gradient(rgba(185,138,50,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:44px_44px] sm:[background-size:56px_56px]" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 operator-scan opacity-[0.18]" aria-hidden="true" />

          <header className="relative grid min-h-12 grid-cols-[1fr_auto] items-center gap-3 border-b border-[#202224] px-3 py-2.5 sm:min-h-14 sm:px-4 sm:py-3 md:grid-cols-[1fr_auto_1fr] md:px-7">
            <div className="flex min-w-0 items-center gap-4">
              <span className="hidden h-4 w-4 border border-[#b98a32]/60 sm:block" aria-hidden="true" />
              <button type="button" onClick={() => goToPage("home")} className="min-w-0 truncate font-mono text-[10px] uppercase tracking-[0.2em] text-[#b98a32] sm:text-[11px] sm:tracking-[0.28em] md:text-sm">
                Balkan Veil
              </button>
            </div>
            <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.26em] text-[#9a8255] md:flex">
              <span>// access terminal</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#b98a32] shadow-[0_0_12px_rgba(185,138,50,0.85)]" aria-hidden="true" />
            </div>
            <button type="button" onClick={() => goToPage("access")} className="justify-self-end font-mono text-[9px] uppercase tracking-[0.2em] text-[#b98a32] transition hover:text-[#d2aa55] sm:text-[10px] sm:tracking-[0.26em]">
              Menu
            </button>
          </header>

          <div className="relative grid gap-0 lg:grid-cols-[0.78fr_2fr_0.85fr]">
            <aside className="hidden border-r border-[#202224] p-5 xl:block">
              <SideIntel content={content} />
            </aside>

            <main className="relative min-h-[28rem] border-[#202224] px-3 py-6 sm:min-h-[34rem] sm:px-6 sm:py-8 md:min-h-[40rem] md:px-10 md:py-12 lg:border-r">
              <div className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[#7d6a45]/35 to-transparent md:block" aria-hidden="true" />
              <div className="pointer-events-none absolute right-4 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[#7d6a45]/20 to-transparent md:block" aria-hidden="true" />

              <div className="relative z-10 mx-auto flex min-h-[23rem] max-w-4xl flex-col items-center justify-center text-center sm:min-h-[28rem] md:min-h-[34rem]">
                <p className={`font-mono text-[9px] uppercase tracking-[0.28em] ${mutedGoldText} sm:text-[10px] sm:tracking-[0.46em] md:text-xs`}>{content.badge}</p>
                <HeroTitle text={content.hero} cinematic={cinematic} introDone={introDone} />
                <p className="mt-6 max-w-[30rem] font-mono text-[10px] leading-6 text-[#8a806c] sm:mt-8 sm:text-[11px] sm:leading-7 md:max-w-[34rem] md:text-sm md:leading-8">{content.text}</p>

                <div className="mt-7 grid w-full max-w-[30rem] border border-[#252729] bg-[#050302] sm:mt-9 sm:max-w-[34rem] sm:grid-cols-[1fr_auto]">
                  <button type="button" onClick={() => goToPage("access")} className="min-h-12 px-4 text-left font-mono text-[9px] uppercase tracking-[0.16em] text-[#9a8255] transition hover:bg-[#090503] hover:text-[#d2aa55] sm:min-h-14 sm:px-5 sm:text-[10px] sm:tracking-[0.2em] md:px-7">
                    &gt; {content.primaryCta}
                    <span className="ml-2 inline-block h-3 w-px translate-y-0.5 bg-[#b98a32] shadow-[0_0_10px_rgba(185,138,50,0.55)]" aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => goToPage("protocol")} className="min-h-12 border-t border-[#252729] px-4 font-mono text-[9px] uppercase tracking-[0.18em] text-[#b98a32] transition hover:bg-[#b98a32] hover:text-black sm:min-h-14 sm:border-l sm:border-t-0 sm:px-6 sm:text-[10px] sm:tracking-[0.22em]">
                    Authenticate
                  </button>
                </div>
                <p className="mt-4 font-mono text-[8px] uppercase tracking-[0.2em] text-[#5f605c] sm:mt-5 sm:text-[9px] sm:tracking-[0.28em]">Only authorized projects proceed</p>
              </div>
            </main>

            <aside className="border-t border-[#202224] p-3 sm:p-5 lg:border-t-0">
              <RightIntel content={content} />
            </aside>
          </div>

          <BottomRail content={content} goToPage={goToPage} />
        </motion.div>
      </section>

      <ArchiveModules content={content} goToPage={goToPage} />
    </>
  );
}

function HeroTitle({ text, cinematic, introDone }: { text: string; cinematic: boolean; introDone: boolean }) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <h1 className="mt-6 flex max-w-[min(100%,52rem)] flex-col items-center font-serif text-[clamp(3.2rem,17vw,5.6rem)] leading-[0.84] text-[#c8ad72] [text-shadow:0_0_18px_rgba(185,138,50,0.24)] sm:mt-8 sm:text-[clamp(4.2rem,15vw,7.8rem)] md:mt-10 md:text-[clamp(5.5rem,8.7vw,9.1rem)]">
      {words.map((word) => (
        <span key={word} className="block whitespace-nowrap">
          {cinematic ? <DecodeText text={word} canStart={introDone} /> : word}
        </span>
      ))}
    </h1>
  );
}

function SideIntel({ content }: { content: SiteContent["home"] }) {
  return (
    <div className="space-y-6">
      <MicroBlock label="Location" lines={["Balkan Veil HQ", "Sarajevo / Remote"]} />
      <div className={`${sidePanel} p-2`}>
        <img src="/assets/tactical-world-map-v2.jpg" alt="" aria-hidden="true" className="h-40 w-full object-cover opacity-80 [filter:brightness(.72)_contrast(1.12)_saturate(.88)]" />
      </div>
      <MicroBlock label="Status" lines={["System secure", content.dossier.status]} icon={<Lock className="h-3.5 w-3.5" />} />
      <MicroBlock label="Clearance level" lines={["Black access", content.dossier.stampCode]} />
      <div className={`${sidePanel} grid grid-cols-2 gap-4 p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6f6654]`}>
        <div>
          <p className={goldText}>Time</p>
          <p className="mt-2">21:42:17</p>
        </div>
        <div>
          <p className={goldText}>Mode</p>
          <p className="mt-2">Live</p>
        </div>
      </div>
    </div>
  );
}

function RightIntel({ content }: { content: SiteContent["home"] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
      <div className={`${filePanel} p-3 sm:p-4`}>
        <p className={`font-mono text-[9px] uppercase tracking-[0.2em] sm:text-[10px] sm:tracking-[0.24em] ${goldText}`}>Active files</p>
        <div className="mt-4 space-y-2.5 font-mono text-[9px] uppercase tracking-[0.1em] text-[#b98a32] sm:mt-5 sm:space-y-3 sm:text-[10px] sm:tracking-[0.12em]">
          {content.signalStrip.slice(0, 5).map((item, index) => (
            <button key={item} type="button" className="block max-w-full break-all text-left transition hover:text-[#d2aa55]">
              0{index}_{item.replace(/\s+/g, "_")}.vel
            </button>
          ))}
        </div>
        <p className="mt-4 border-t border-[#202224] pt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[#6f6654] sm:mt-5 sm:text-[10px] sm:tracking-[0.2em]">5 files</p>
      </div>

      <div className={`${filePanel} hidden p-4 sm:block`}>
        <p className={`font-mono text-[10px] uppercase tracking-[0.24em] ${goldText}`}>Encryption</p>
        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#b98a32]">AES-256 / SHA-512</p>
        <div className="mt-7 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#b98a32]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#b98a32]" aria-hidden="true" />
          online
        </div>
      </div>

      <div className={`${filePanel} hidden p-0 sm:block`}>
        <SignalLedger items={content.signalStrip.slice(0, 4)} label="Signal feed" className="border-0 bg-transparent" />
      </div>
    </div>
  );
}

function BottomRail({ content, goToPage }: { content: SiteContent["home"]; goToPage: (target: PageKey) => void }) {
  return (
    <div className="relative grid border-t border-[#202224] md:grid-cols-[0.42fr_1fr_0.45fr_0.85fr]">
      <div className="hidden border-r border-[#202224] p-4 md:block">
        <ThreeWireGlobe className="h-20 w-full opacity-85" />
      </div>
      <div className="border-b border-[#202224] p-4 md:border-b-0 md:border-r md:p-5">
        <p className="max-w-xl font-mono text-[10px] uppercase leading-6 tracking-[0.14em] text-[#aaa59a] sm:text-xs sm:leading-7 sm:tracking-[0.18em]">{content.dossier.note}</p>
      </div>
      <button type="button" onClick={() => goToPage("work")} className="border-b border-[#202224] p-4 text-left font-mono text-[9px] uppercase tracking-[0.2em] text-[#b98a32] transition hover:bg-[#090503] hover:text-[#d2aa55] sm:text-[10px] sm:tracking-[0.24em] md:border-b-0 md:border-r md:p-5">
        Scroll to decrypt
        <ArrowRight className="mt-3 h-4 w-4 sm:mt-4" aria-hidden="true" />
      </button>
      <div className="relative hidden min-h-24 overflow-hidden p-5 sm:block">
        <div className="h-full min-h-14 bg-[linear-gradient(115deg,transparent_0_28%,rgba(185,138,50,0.10)_28%_29%,transparent_29%_58%,rgba(125,106,69,0.16)_58%_59%,transparent_59%),radial-gradient(circle_at_78%_35%,rgba(185,138,50,0.16),transparent_28%)]" aria-hidden="true" />
      </div>
    </div>
  );
}

function ArchiveModules({ content, goToPage }: { content: SiteContent["home"]; goToPage: (target: PageKey) => void }) {
  const beforeAfterColumns = [
    { label: content.beforeAfter.beforeLabel, items: content.beforeAfter.before, tone: "muted" },
    { label: content.beforeAfter.afterLabel, items: content.beforeAfter.after, tone: "gold" },
  ] as const;

  return (
    <section className="relative z-10 mx-auto max-w-[1500px] px-2.5 pb-12 text-[#b6a27a] sm:px-5 sm:pb-16 md:px-8 md:pb-24">
      <VeilDivider label={content.builtAround} className="mb-7 md:mb-10" />

      <motion.div
        variants={launchSectionMotion}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.32, margin: "0px 0px -12% 0px" }}
        className="relative overflow-hidden border border-[#202224] bg-[#030201]"
      >
        <motion.div variants={launchGridMotion} className="pointer-events-none absolute inset-0 operator-grid" aria-hidden="true" />
        <div className="relative grid gap-px bg-[#050302] lg:grid-cols-[0.78fr_1.22fr]">
          <motion.div variants={launchIntroMotion} className="relative z-20 border border-[#202224] bg-[#050302] p-6 will-change-transform [transform-style:preserve-3d] sm:p-8 md:p-12">
            <div className="pointer-events-none absolute inset-0 border border-[#7d6a45]/20" aria-hidden="true" />
            <motion.div variants={launchFrameSweepMotion} className="pointer-events-none absolute inset-0 z-30 border border-[#b98a32]/50 bg-[linear-gradient(90deg,rgba(185,138,50,0.035),transparent)] shadow-[0_0_24px_rgba(185,138,50,0.22)] will-change-transform" aria-hidden="true" />
            <div className="relative z-10">
              <p className={`font-mono text-[9px] uppercase tracking-[0.26em] sm:text-[10px] ${goldText}`}>{content.launchChanges.eyebrow}</p>
              <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-[1.02] text-[#c8ad72] sm:text-5xl md:text-6xl">{content.builtTitle}</h2>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-[#786f5e] md:text-base md:leading-8">{content.launchChanges.text}</p>
              <div className="mt-8 h-px max-w-md bg-gradient-to-r from-[#7d6a45]/70 via-[#202224] to-transparent" aria-hidden="true" />
            </div>
          </motion.div>

          <motion.div variants={launchCardsMotion} className="grid gap-3 bg-[#050302] p-3 [perspective:1100px] sm:grid-cols-3 sm:p-4 md:gap-4 md:p-5">
            {content.valueProps.map((item, index) => (
              <motion.article key={item.title} variants={launchCardMotion} className="group relative min-h-[18rem] overflow-hidden border border-[#202224] bg-[#020100] p-5 [transform-style:preserve-3d] will-change-transform sm:p-6 md:p-7">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#7d6a45]/30 opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                <p className={`font-mono text-[9px] uppercase tracking-[0.22em] sm:text-[10px] ${mutedGoldText}`}>control 0{index + 1}</p>
                <h3 className="mt-12 font-serif text-2xl leading-tight text-[#c8ad72] sm:text-3xl">{item.title}</h3>
                <p className="mt-5 text-sm leading-7 text-[#777772]">{item.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={splitSectionMotion}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.32, margin: "0px 0px -12% 0px" }}
        className="mt-7 grid gap-7 sm:mt-8 sm:gap-8 md:mt-10 md:gap-10 xl:grid-cols-[1.15fr_0.85fr]"
      >
        <motion.section variants={splitCardLeftMotion} className="relative overflow-hidden border border-[#202224] bg-[#050302] p-6 will-change-transform sm:p-8 md:p-10">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-[linear-gradient(135deg,transparent,rgba(185,138,50,0.055),transparent)]" aria-hidden="true" />
          <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className={`font-mono text-[9px] uppercase tracking-[0.26em] sm:text-[10px] ${goldText}`}>{content.interfacePreview.eyebrow}</p>
              <h2 className="mt-5 font-serif text-3xl leading-tight text-[#c8ad72] sm:text-5xl">{content.interfacePreview.title}</h2>
              <p className="mt-5 text-sm leading-7 text-[#786f5e] md:text-base md:leading-8">{content.interfacePreview.text}</p>
            </div>

            <div className="grid gap-5">
              {content.interfacePreview.rows.map((item, index) => (
                <div key={item} className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-[#202224] pb-5">
                  <span className={`font-mono text-[10px] ${mutedGoldText}`}>{String(index + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-xl leading-snug text-[#c8ad72]">{item}</span>
                  <span className="hidden h-px w-12 bg-[#7d6a45]/45 sm:block" aria-hidden="true" />
                </div>
              ))}
              <div className="mt-7 grid gap-4 sm:grid-cols-3">
                {content.interfacePreview.metrics.map((metric) => (
                  <div key={metric} className="border border-[#202224] bg-black/30 p-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#6f6654]">signal</p>
                    <p className="mt-3 font-serif text-2xl text-[#c8ad72]">{metric}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section variants={splitCardRightMotion} className="relative overflow-hidden border border-[#202224] bg-[#020100] will-change-transform">
          <div className="border-b border-[#202224] px-6 py-5 sm:px-7">
            <p className={`font-mono text-[9px] uppercase tracking-[0.26em] sm:text-[10px] ${goldText}`}>{content.methodPreview.eyebrow}</p>
          </div>
          <div className="p-6 sm:p-7 md:p-8">
            <h2 className="font-serif text-3xl leading-tight text-[#c8ad72]">{content.methodPreview.title}</h2>
            <div className="mt-8 border-l border-[#202224]">
              {content.methodPreview.steps.map((step, index) => (
                <div key={step} className="relative pb-8 pl-7 last:pb-0">
                  <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rotate-45 border border-[#7d6a45] bg-[#020100]" aria-hidden="true" />
                  <span className={`font-mono text-[10px] ${mutedGoldText}`}>{String(index + 1).padStart(2, "0")}</span>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#9a8255]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.32, margin: "0px 0px -12% 0px" }}
        className="mt-7 grid gap-7 sm:mt-8 sm:gap-8 md:mt-10 md:gap-10 xl:grid-cols-[0.82fr_1.18fr]"
      >
        <motion.section variants={sweepCardMotion} className="relative overflow-hidden border p-6 sm:p-8 md:p-10">
          <motion.span variants={cardFrameVerticalMotion} className="pointer-events-none absolute bottom-0 left-0 top-0 z-30 w-px origin-top bg-[#b98a32]/55 shadow-[0_0_16px_rgba(185,138,50,0.28)]" aria-hidden="true" />
          <motion.span variants={cardFramePointMotion} className="pointer-events-none absolute left-0 top-0 z-40 h-2 w-2 -translate-x-1/2 rounded-full bg-[#b98a32] shadow-[0_0_16px_rgba(185,138,50,0.75)]" aria-hidden="true" />
          <motion.div variants={cardSweepMotion} className="pointer-events-none absolute inset-y-0 left-0 z-20 w-full origin-left border-y border-r border-[#b98a32]/50 bg-[linear-gradient(90deg,rgba(185,138,50,0.045),transparent)] shadow-[0_0_24px_rgba(185,138,50,0.18)] will-change-transform" aria-hidden="true" />
          <motion.div variants={sweepContentMotion} className="relative z-10">
            <p className={`font-mono text-[9px] uppercase tracking-[0.26em] sm:text-[10px] ${goldText}`}>{content.subscriptionIntro.eyebrow}</p>
            <h2 className="mt-5 font-serif text-3xl leading-tight text-[#c8ad72] sm:text-5xl">{content.subscriptionIntro.title}</h2>
            <p className="mt-6 text-sm leading-7 text-[#786f5e] md:text-base md:leading-8">{content.subscriptionIntro.text}</p>
            <motion.div variants={sweepInnerCardsMotion} className="mt-10 grid gap-4 sm:grid-cols-2">
              {content.subscriptionIntro.points.map((point, index) => (
                <motion.div key={point} variants={sweepInnerCardMotion} className="border p-4">
                  <p className={`font-mono text-[9px] uppercase tracking-[0.22em] ${mutedGoldText}`}>node 0{index + 1}</p>
                  <p className="mt-4 font-serif text-xl text-[#c8ad72]">{point}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section variants={sweepCardDarkMotion} className="relative overflow-hidden border p-6 sm:p-8 md:p-10">
          <motion.span variants={cardFrameVerticalMotion} className="pointer-events-none absolute bottom-0 left-0 top-0 z-30 w-px origin-top bg-[#b98a32]/55 shadow-[0_0_16px_rgba(185,138,50,0.28)]" aria-hidden="true" />
          <motion.span variants={cardFramePointMotion} className="pointer-events-none absolute left-0 top-0 z-40 h-2 w-2 -translate-x-1/2 rounded-full bg-[#b98a32] shadow-[0_0_16px_rgba(185,138,50,0.75)]" aria-hidden="true" />
          <motion.div variants={cardSweepMotion} className="pointer-events-none absolute inset-y-0 left-0 z-20 w-full origin-left border-y border-r border-[#b98a32]/50 bg-[linear-gradient(90deg,rgba(185,138,50,0.045),transparent)] shadow-[0_0_24px_rgba(185,138,50,0.18)] will-change-transform" aria-hidden="true" />
          <motion.div variants={sweepContentMotion} className="relative z-10">
            <p className={`font-mono text-[9px] uppercase tracking-[0.26em] sm:text-[10px] ${goldText}`}>{content.beforeAfter.eyebrow}</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-[#c8ad72] sm:text-5xl">{content.beforeAfter.title}</h2>
            <motion.div variants={sweepInnerCardsMotion} className="mt-10 grid gap-7 md:grid-cols-2">
              {beforeAfterColumns.map((column) => (
                <div key={column.label}>
                  <p className={`font-mono text-[10px] uppercase tracking-[0.26em] ${column.tone === "gold" ? "text-[#b98a32]" : "text-[#6f6654]"}`}>{column.label}</p>
                  <div className="mt-5 grid gap-3">
                    {column.items.map((item, index) => (
                      <motion.div key={item} variants={sweepInnerCardMotion} className="grid grid-cols-[2.4rem_1fr] gap-3 border px-4 py-3">
                        <span className={`font-mono text-[10px] ${column.tone === "gold" ? "text-[#b98a32]" : "text-[#6f6654]"}`}>{String(index + 1).padStart(2, "0")}</span>
                        <span className="text-sm leading-6 text-[#8a806c]">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>
      </motion.div>

      <section className="relative mt-7 overflow-hidden border border-[#202224] bg-[#050302] p-6 sm:mt-8 sm:p-8 md:mt-10 md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(185,138,50,0.045),transparent)]" aria-hidden="true" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <ShieldCheck className="h-7 w-7 text-[#b98a32] sm:h-8 sm:w-8" aria-hidden="true" />
            <p className={`mt-5 font-mono text-[9px] uppercase tracking-[0.26em] sm:text-[10px] ${goldText}`}>{content.finalCta.eyebrow}</p>
            <h2 className="mt-5 max-w-4xl font-serif text-3xl leading-tight text-[#c8ad72] sm:text-5xl md:text-6xl">{content.finalCta.title}</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#786f5e] md:text-base md:leading-8">{content.finalCta.text}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[24rem] lg:grid-cols-1">
            <button type="button" onClick={() => goToPage("access")} className="min-h-12 border border-[#b98a32] bg-[#b98a32] px-5 text-left font-mono text-[9px] uppercase tracking-[0.18em] text-black transition hover:bg-[#c8ad72] sm:px-6 sm:text-[10px] sm:tracking-[0.22em]">
              &gt; {content.finalCta.primary}
            </button>
            <button type="button" onClick={() => goToPage("pricing")} className="min-h-12 border border-[#252729] bg-transparent px-5 text-left font-mono text-[9px] uppercase tracking-[0.18em] text-[#7d6a45] transition hover:border-[#b98a32] hover:text-[#c8ad72] sm:px-6 sm:text-[10px] sm:tracking-[0.22em]">
              &gt; {content.finalCta.secondary}
            </button>
          </div>
        </div>
      </section>

      <div className="mt-7 grid gap-3 sm:mt-8 sm:grid-cols-3 md:mt-10 md:gap-4">
        {content.audience.map((item, index) => (
          <div key={item} className="grid grid-cols-[2rem_1fr_auto] items-center gap-2 border border-[#202224] bg-[#020100]/70 px-3 py-3">
            <span className={`font-mono text-[9px] ${mutedGoldText}`}>0{index + 1}</span>
            <span className="text-sm leading-6 text-[#787873]">{item}</span>
            <CircleDot className="h-3.5 w-3.5 text-[#7d6a45]" aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}

function MicroBlock({ label, lines, icon }: { label: string; lines: readonly string[]; icon?: React.ReactNode }) {
  return (
    <div className={`${sidePanel} p-4`}>
      <div className="flex items-center justify-between gap-4">
        <p className={`font-mono text-[10px] uppercase tracking-[0.24em] ${goldText}`}>&gt; {label}</p>
        {icon}
      </div>
      <div className="mt-4 space-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#786f5e]">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}
