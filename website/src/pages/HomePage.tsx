import { useEffect, useRef } from "react";
import { ArrowRight, CircleDot, Lock, Radio, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { DecodeText } from "@/components/DecodeText";
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

const goldText = "text-[#b98a32]";
const mutedGoldText = "text-[#b98a32]";
const signalWaveX = [0, 34, 46, 56, 66, 86, 94, 101, 108, 116, 124, 154, 168, 184, 202, 230, 240, 250, 260, 285, 294, 301, 309, 318, 327, 360];
const signalWaveY = [32, 32, 30, 34, 32, 32, 27, 42, 12, 51, 32, 32, 29, 35, 32, 32, 30, 34, 32, 32, 25, 44, 15, 50, 32, 32];
const signalWaveBase = toSignalPoints(signalWaveY);

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

              <div className="mx-auto flex min-h-[23rem] max-w-4xl flex-col items-center justify-center text-center sm:min-h-[28rem] md:min-h-[34rem]">
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
      <div className={`${filePanel} p-4`}>
        <div className="h-24 opacity-80 [background-image:radial-gradient(circle_at_24%_42%,rgba(185,138,50,0.45)_0_1px,transparent_2px),radial-gradient(circle_at_68%_36%,rgba(185,138,50,0.35)_0_1px,transparent_2px),linear-gradient(120deg,transparent,rgba(185,138,50,0.08),transparent)] [background-size:18px_18px,24px_24px,auto]" />
      </div>
      <MicroBlock label="Status" lines={["System secure", content.dossier.status]} icon={<Lock className="h-3.5 w-3.5" />} />
      <MicroBlock label="Clearance level" lines={["Black access", content.dossier.stampCode]} />
      <div className={`${filePanel} grid grid-cols-2 gap-4 p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6f6654]`}>
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

      <div className={`${filePanel} p-3 sm:p-4`}>
        <p className={`font-mono text-[9px] uppercase tracking-[0.2em] sm:text-[10px] sm:tracking-[0.24em] ${goldText}`}>Signal feed</p>
        <div className="signal-feed-wave mt-5 h-9 sm:mt-7 sm:h-10" aria-hidden="true">
          <svg className="signal-feed-svg" viewBox="0 0 360 64" preserveAspectRatio="none" focusable="false">
            <g className="signal-feed-track">
              <g transform="translate(-360 0)">
                <SignalWavePath />
              </g>
              <SignalWavePath />
            </g>
          </svg>
        </div>
      </div>

      <div className={`${filePanel} hidden p-4 sm:block`}>
        <p className={`font-mono text-[10px] uppercase tracking-[0.24em] ${goldText}`}>Encryption</p>
        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#b98a32]">AES-256 / SHA-512</p>
        <div className="mt-7 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#b98a32]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#b98a32]" aria-hidden="true" />
          online
        </div>
      </div>
    </div>
  );
}

function BottomRail({ content, goToPage }: { content: SiteContent["home"]; goToPage: (target: PageKey) => void }) {
  return (
    <div className="relative grid border-t border-[#202224] md:grid-cols-[0.42fr_1fr_0.45fr_0.85fr]">
      <div className="hidden border-r border-[#202224] p-4 md:block">
        <div className="h-20 bg-[radial-gradient(circle_at_35%_35%,rgba(185,138,50,0.25),transparent_36%),linear-gradient(145deg,#0c0c0c,#050302)]" />
      </div>
      <div className="border-b border-[#202224] p-4 md:border-b-0 md:border-r md:p-5">
        <p className="max-w-xl font-mono text-[10px] uppercase leading-6 tracking-[0.14em] text-[#aaa59a] sm:text-xs sm:leading-7 sm:tracking-[0.18em]">{content.dossier.note}</p>
      </div>
      <button type="button" onClick={() => goToPage("work")} className="border-b border-[#202224] p-4 text-left font-mono text-[9px] uppercase tracking-[0.2em] text-[#b98a32] transition hover:bg-[#090503] hover:text-[#d2aa55] sm:text-[10px] sm:tracking-[0.24em] md:border-b-0 md:border-r md:p-5">
        Scroll to decrypt
        <ArrowRight className="mt-3 h-4 w-4 sm:mt-4" aria-hidden="true" />
      </button>
      <div className="relative hidden min-h-24 overflow-hidden p-5 sm:block">
        <div className="absolute right-8 top-5 h-14 w-14 rounded-full border border-[#b98a32]/70" aria-hidden="true" />
        <div className="absolute right-9 top-6 h-12 w-12 rounded-full border border-[#b98a32]/25" aria-hidden="true" />
        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-[#7d6a45]/60 to-transparent" aria-hidden="true" />
      </div>
    </div>
  );
}

function ArchiveModules({ content, goToPage }: { content: SiteContent["home"]; goToPage: (target: PageKey) => void }) {
  return (
    <section className="relative z-10 mx-auto max-w-[1500px] px-2.5 pb-10 sm:px-5 sm:pb-14 md:px-8 md:pb-20">
      <div className="grid gap-px border border-[#202224] bg-[#202224] lg:grid-cols-3">
        {content.valueProps.map((item, index) => (
          <article key={item.title} className="bg-[#050302] p-4 sm:p-5 md:p-7">
            <p className={`font-mono text-[9px] uppercase tracking-[0.22em] sm:text-[10px] sm:tracking-[0.26em] ${mutedGoldText}`}>file 0{index + 1}</p>
            <h2 className="mt-5 font-serif text-2xl leading-tight text-[#c8ad72] sm:mt-6 sm:text-3xl md:text-4xl">{item.title}</h2>
            <p className="mt-4 text-sm leading-7 text-[#786f5e] sm:mt-5">{item.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-4 grid gap-4 sm:mt-5 sm:gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className={`${archivePanel} p-4 sm:p-5 md:p-7`}>
          <div className="flex items-start justify-between gap-4 border-b border-[#202224] pb-5">
            <div>
              <p className={`font-mono text-[9px] uppercase tracking-[0.2em] sm:text-[10px] sm:tracking-[0.26em] ${goldText}`}>{content.launchChanges.eyebrow}</p>
              <h2 className="mt-4 max-w-3xl font-serif text-2xl leading-tight text-[#c8ad72] sm:mt-5 sm:text-3xl md:text-5xl">{content.launchChanges.title}</h2>
            </div>
            <Radio className="hidden h-8 w-8 text-[#b98a32] md:block" aria-hidden="true" />
          </div>
          <p className="mt-5 max-w-4xl text-sm leading-7 text-[#786f5e] md:text-base md:leading-8">{content.launchChanges.text}</p>
          <div className="mt-6 grid gap-3 sm:mt-7 md:grid-cols-3">
            {content.launchChanges.items.map((item, index) => (
              <div key={item.title} className={`${filePanel} p-3 sm:p-4`}>
                <p className={`font-mono text-[9px] uppercase tracking-[0.18em] sm:text-[10px] sm:tracking-[0.2em] ${mutedGoldText}`}>output 0{index + 1}</p>
                <h3 className="mt-4 font-serif text-lg text-[#c8ad72] sm:text-xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#777772]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`${archivePanel} p-4 sm:p-5 md:p-7`}>
          <p className={`font-mono text-[9px] uppercase tracking-[0.2em] sm:text-[10px] sm:tracking-[0.26em] ${goldText}`}>Target files</p>
          <div className="mt-6 grid gap-3">
            {content.audience.map((item, index) => (
              <div key={item} className="grid grid-cols-[1.8rem_1fr_auto] items-center gap-2 border border-[#202224] bg-[#020100] px-3 py-3 sm:grid-cols-[2.2rem_1fr_auto] sm:gap-3 sm:px-4">
                <span className={`font-mono text-[9px] sm:text-[10px] ${mutedGoldText}`}>0{index + 1}</span>
                <span className="text-sm leading-6 text-[#787873]">{item}</span>
                <CircleDot className="h-3.5 w-3.5 text-[#7d6a45]" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`${archivePanel} mt-4 p-4 text-center sm:mt-5 sm:p-5 md:p-9`}>
        <ShieldCheck className="mx-auto h-7 w-7 text-[#b98a32] sm:h-8 sm:w-8" aria-hidden="true" />
        <p className={`mt-5 font-mono text-[9px] uppercase tracking-[0.22em] sm:text-[10px] sm:tracking-[0.28em] ${goldText}`}>{content.finalCta.eyebrow}</p>
        <h2 className="mx-auto mt-5 max-w-4xl font-serif text-2xl leading-tight text-[#c8ad72] sm:text-3xl md:text-6xl">{content.finalCta.title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#786f5e] md:text-base md:leading-8">{content.finalCta.text}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={() => goToPage("access")} className="min-h-12 border border-[#b98a32] bg-[#b98a32] px-5 font-mono text-[9px] uppercase tracking-[0.18em] text-black transition hover:bg-[#c8ad72] sm:px-6 sm:text-[10px] sm:tracking-[0.22em]">
            {content.finalCta.primary}
          </button>
          <button type="button" onClick={() => goToPage("pricing")} className="min-h-12 border border-[#252729] bg-transparent px-5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#7d6a45] transition hover:border-[#b98a32] hover:text-[#c8ad72] sm:px-6 sm:text-[10px] sm:tracking-[0.22em]">
            {content.finalCta.secondary}
          </button>
        </div>
      </div>
    </section>
  );
}

function MicroBlock({ label, lines, icon }: { label: string; lines: readonly string[]; icon?: React.ReactNode }) {
  return (
    <div className={`${filePanel} p-4`}>
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

function SignalWavePath() {
  const softRef = useRef<SVGPolylineElement | null>(null);
  const lineRef = useRef<SVGPolylineElement | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      softRef.current?.setAttribute("points", signalWaveBase);
      lineRef.current?.setAttribute("points", signalWaveBase);
      return;
    }

    let current = createSignalTarget();
    let target = createSignalTarget();
    let frameId = 0;
    let nextTargetAt = 0;

    const tick = (time: number) => {
      if (time >= nextTargetAt) {
        target = createSignalTarget();
        nextTargetAt = time + 720 + Math.random() * 760;
      }

      current = current.map((value, index) => value + (target[index] - value) * 0.045);
      const points = toSignalPoints(current);
      softRef.current?.setAttribute("points", points);
      lineRef.current?.setAttribute("points", points);

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <>
      <polyline ref={softRef} className="signal-feed-line signal-feed-line-soft" points={signalWaveBase} />
      <polyline ref={lineRef} className="signal-feed-line" points={signalWaveBase} />
    </>
  );
}

function createSignalTarget() {
  const firstPulse = 0.82 + Math.random() * 0.38;
  const secondPulse = 0.78 + Math.random() * 0.44;

  return signalWaveY.map((baseY, index) => {
    const jitter = index === 8 || index === 9 || index === 22 || index === 23 ? 2.2 : 0.9;
    let y = baseY + (Math.random() - 0.5) * jitter;

    if (index === 8) y = 32 - 20 * firstPulse - Math.random() * 2.5;
    if (index === 9) y = 32 + 19 * firstPulse + Math.random() * 2.5;
    if (index === 22) y = 32 - 18 * secondPulse - Math.random() * 2.2;
    if (index === 23) y = 32 + 18 * secondPulse + Math.random() * 2.2;

    return Math.max(8, Math.min(56, y));
  });
}

function toSignalPoints(points: readonly number[]) {
  return points.map((y, index) => `${signalWaveX[index]},${y.toFixed(1)}`).join(" ");
}
