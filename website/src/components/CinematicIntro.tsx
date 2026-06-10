import { motion, useReducedMotion } from "framer-motion";
import { LOGO_SRC } from "@/data/logo";

type CinematicIntroProps = {
  compact?: boolean;
  tagline?: string;
};

export function CinematicIntro({ compact = false, tagline = "Simple. Dark. Well built." }: CinematicIntroProps) {
  const shouldReduceMotion = useReducedMotion();
  const shortMotion = compact || Boolean(shouldReduceMotion);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shortMotion ? 0.2 : 1 }}
      className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,155,148,0.14),transparent_55%)]" />
      {!shortMotion && <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:70px_70px] opacity-40" />}

      <motion.div
        initial={{ scale: shortMotion ? 0.94 : 0.72, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: shortMotion ? 0.35 : 1.4, ease: "easeOut" }}
        className="relative flex flex-col items-center px-6 text-center"
      >
        <motion.div
          initial={{ rotate: -4, opacity: 0, y: 10 }}
          animate={{ rotate: 0, opacity: 1, y: 0 }}
          transition={{ duration: shortMotion ? 0.35 : 1.5 }}
          className="mb-8 flex h-44 w-44 items-center justify-center rounded-full border border-neutral-300/20 bg-black shadow-[0_0_60px_rgba(155,155,148,0.22)] sm:h-56 sm:w-56 md:mb-12 md:h-80 md:w-80 md:shadow-[0_0_100px_rgba(155,155,148,0.28)] lg:h-96 lg:w-96"
        >
          <img src={LOGO_SRC} alt="Balkan Veil logo" loading="eager" decoding="async" className="h-full w-full rounded-full object-cover" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: shortMotion ? 0.1 : 0.65, duration: shortMotion ? 0.3 : 1 }}
          className="font-serif text-4xl tracking-[0.24em] text-neutral-100 sm:text-5xl md:text-8xl md:tracking-[0.3em] lg:text-9xl"
        >
          BALKAN VEIL
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: shortMotion ? 0.2 : 1.45, duration: shortMotion ? 0.25 : 1.1 }}
          className="mt-8 text-xs uppercase tracking-[0.34em] text-neutral-500 sm:text-sm md:mt-10 md:text-xl md:tracking-[0.5em]"
        >
          {tagline}
        </motion.p>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 260, opacity: 1 }}
          transition={{ delay: shortMotion ? 0.25 : 2, duration: shortMotion ? 0.2 : 1.1 }}
          className="mt-12 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent"
        />
      </motion.div>
    </motion.div>
  );
}
