import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const terminalLines = [
  "root@balkanveil:~$ read brief",
  "Small scope. Clear reason.",
  "[01] Problem UNDERSTOOD",
  "[02] Structure SKETCHED",
  "[03] Launch path REALISTIC",
  "Fewer promises. More execution.",
  "status: in progress",
];

type TerminalLineProps = {
  line: string;
  index: number;
  cycle: number;
  slow: boolean;
  compact: boolean;
};

function TerminalLine({ line, index, cycle, slow, compact }: TerminalLineProps) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\_#@";
  const [display, setDisplay] = React.useState("");

  React.useEffect(() => {
    setDisplay("");

    if (compact) {
      setDisplay(line);
      return;
    }

    let frame = 0;
    const typeFramesPerChar = slow ? 2.8 : 2.2;
    const decryptFramesPerChar = slow ? 2.1 : 1.5;
    const totalTypeFrames = Math.ceil(line.length * typeFramesPerChar);
    const totalDecryptFrames = Math.ceil(line.length * decryptFramesPerChar);
    const totalFrames = totalTypeFrames + totalDecryptFrames;
    const step = slow ? 42 : 32;
    const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

    const interval = window.setInterval(() => {
      frame += 1;

      if (frame <= totalTypeFrames) {
        const visibleCount = Math.min(line.length, Math.ceil(frame / typeFramesPerChar));
        const next = line
          .split("")
          .slice(0, visibleCount)
          .map((char) => {
            if ([" ", ".", ":", "[", "]", "~", "$", "-", "/"].includes(char)) return char;
            return randomChar();
          })
          .join("");
        setDisplay(next);
        return;
      }

      const decryptFrame = frame - totalTypeFrames;
      const revealedCount = Math.min(line.length, Math.floor(decryptFrame / decryptFramesPerChar));
      const next = line
        .split("")
        .map((char, charIndex) => {
          if (charIndex >= revealedCount + 7) return "";
          if ([" ", ".", ":", "[", "]", "~", "$", "-", "/"].includes(char)) return char;
          if (charIndex < revealedCount) return char;
          return randomChar();
        })
        .join("");
      setDisplay(next);

      if (frame >= totalFrames) {
        setDisplay(line);
        window.clearInterval(interval);
      }
    }, step);

    return () => window.clearInterval(interval);
  }, [line, cycle, slow, compact]);

  return (
    <motion.p
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: slow ? 0.55 : 0.28 }}
      className={index === 1 ? "text-stone-500" : ""}
    >
      {index === 0 ? (
        <>
          <span className="text-amber-300">root@balkanveil</span>
          {display.replace("root@balkanveil", "")}
        </>
      ) : (
        <span className={index >= 2 ? "text-amber-100" : ""}>{display}</span>
      )}
      {display !== line && (
        <motion.span animate={{ opacity: [0.15, 1, 0.15] }} transition={{ repeat: Infinity, duration: slow ? 1.1 : 0.7 }} className="ml-1 text-amber-300">
          {"\u258c"}
        </motion.span>
      )}
    </motion.p>
  );
}

type TerminalPanelProps = {
  cinematic?: boolean;
  loop?: boolean;
  slow?: boolean;
  compact?: boolean;
  lines?: readonly string[];
  header?: string;
};

export function TerminalPanel({ cinematic = true, loop = false, slow = false, compact = false, lines = terminalLines, header = "veil://brief" }: TerminalPanelProps) {
  const activeLines = React.useMemo(() => [...lines], [lines]);
  const shouldReduceMotion = useReducedMotion();
  const effectiveCinematic = cinematic && !shouldReduceMotion;
  const effectiveCompact = compact || Boolean(shouldReduceMotion);
  const [visibleLines, setVisibleLines] = React.useState<string[]>(effectiveCinematic ? [] : activeLines);
  const [cycle, setCycle] = React.useState(0);

  React.useEffect(() => {
    if (!effectiveCinematic) {
      setVisibleLines(activeLines);
      return;
    }

    const timers: number[] = [];
    const lineDelay = effectiveCompact ? 420 : slow ? 2600 : 650;
    const restartDelay = effectiveCompact ? 1400 : slow ? 9500 : 1800;

    activeLines.forEach((_, index) => {
      const timer = window.setTimeout(() => {
        setVisibleLines(activeLines.slice(0, index + 1));
        if (loop && index === activeLines.length - 1) {
          const restartTimer = window.setTimeout(() => setCycle((value) => value + 1), restartDelay);
          timers.push(restartTimer);
        }
      }, lineDelay * (index + 1));
      timers.push(timer);
    });

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [effectiveCinematic, loop, slow, effectiveCompact, activeLines, cycle]);

  React.useEffect(() => {
    if (effectiveCinematic) setVisibleLines([]);
  }, [cycle, effectiveCinematic]);

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.65, delay: shouldReduceMotion ? 0 : 0.15 }}
      whileHover={effectiveCinematic ? { y: -8, scale: 1.01 } : undefined}
      className="relative mx-auto max-w-5xl"
    >
      <div className="absolute -inset-8 hidden border border-amber-300/10 bg-amber-400/[0.025] blur-2xl md:block" />
      <Card className="operator-surface relative overflow-hidden border border-amber-300/20 bg-black/70 shadow-2xl transition duration-500 hover:border-amber-300/35 hover:shadow-[0_0_70px_rgba(251,191,36,0.12)] md:backdrop-blur-xl">
        <CardContent className="p-0">
          <div className="border-b border-stone-800 bg-stone-950/80 px-4 py-4 md:px-6 md:py-5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-7 border border-stone-700 bg-stone-800/70" />
              <span className="h-2 w-4 border border-red-300/25 bg-red-300/10" />
              <motion.span animate={loop && !shouldReduceMotion ? { opacity: [0.25, 1, 0.25] } : undefined} transition={{ repeat: Infinity, duration: 1.4 }} className="h-2 w-7 border border-emerald-300/35 bg-emerald-300/15" />
              <span className="ml-2 min-w-0 truncate text-[11px] uppercase tracking-[0.18em] text-stone-500 md:ml-4 md:text-xs md:tracking-[0.24em]">{header}</span>
            </div>
          </div>
          <div className="operator-scan min-h-[280px] space-y-4 p-5 font-mono text-sm leading-6 text-stone-300 md:min-h-[390px] md:space-y-5 md:p-12 md:text-lg">
            {visibleLines.map((line, index) => (
              <TerminalLine key={`${line}-${index}-${cycle}`} line={line} index={index} cycle={cycle} slow={slow} compact={effectiveCompact} />
            ))}
            {effectiveCinematic && visibleLines.length < activeLines.length && (
              <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: slow ? 1.25 : 0.75 }} className="h-5 w-3 bg-amber-300/80" />
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
