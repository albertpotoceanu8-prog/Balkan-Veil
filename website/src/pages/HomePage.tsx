import { ArrowRight, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DecodeText } from "@/components/DecodeText";
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
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-6xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/5 px-5 py-3 text-sm uppercase tracking-[0.3em] text-amber-200">
            <Lock className="h-4 w-4" /> {content.badge}
          </div>
          <h1 className="max-w-6xl font-serif text-5xl leading-[0.95] tracking-tight text-stone-100 sm:text-6xl md:text-8xl md:leading-[0.9] lg:text-[8.8rem]">
            {cinematic ? <DecodeText text={content.hero} canStart={introDone} /> : content.hero}
          </h1>
          <p className="mt-8 max-w-4xl text-lg leading-8 text-stone-400 md:mt-12 md:text-2xl md:leading-10">{content.text}</p>

          <div className="mt-10 grid max-w-5xl gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
            {content.valueProps.map((item) => (
              <motion.div key={item.title} {...cardMotion} className={panelClass + " p-5 md:p-6 md:backdrop-blur-xl"}>
                <h3 className="font-serif text-2xl text-amber-100">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-stone-500">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row md:mt-14 md:gap-5">
            <Button onClick={() => goToPage("access")} className="relative overflow-hidden rounded-full bg-amber-300 px-9 py-7 text-base font-semibold uppercase tracking-[0.24em] text-black transition duration-500 hover:bg-amber-200 hover:shadow-[0_0_45px_rgba(251,191,36,0.28)]">
              {content.primaryCta} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button onClick={() => goToPage("protocol")} variant="outline" className="rounded-full border-stone-700 bg-transparent px-9 py-7 text-base uppercase tracking-[0.24em] text-stone-200 transition duration-500 hover:border-amber-300/35 hover:bg-stone-900 hover:text-amber-200 hover:shadow-[0_0_35px_rgba(251,191,36,0.10)]">
              {content.secondaryCta}
            </Button>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1500px] px-5 py-10 md:px-8">
        <div className="mb-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">{content.builtAround}</p>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-stone-100 md:text-7xl">
              <DecodeText text={content.builtTitle} />
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.audience.map((item) => (
              <motion.div key={item} {...cardMotion} className="rounded-2xl border border-stone-800 bg-stone-950/50 p-5 transition duration-500 hover:-translate-y-1 hover:border-amber-300/30 hover:bg-stone-950/80 hover:shadow-[0_0_35px_rgba(251,191,36,0.08)]">
                <p className="font-serif text-2xl text-stone-100">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
