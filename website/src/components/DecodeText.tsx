import React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type DecodeTextProps = {
  text: string;
  className?: string;
  canStart?: boolean;
};

const stableChars = [" ", ".", ",", "\u2014"];
const decodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\_#@";
const letterStepMs = 260;
const frameStepMs = 45;

export function DecodeText({ text, className = "", canStart = true }: DecodeTextProps) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.35, margin: "-10% 0px -10% 0px" });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = React.useState("");
  const [started, setStarted] = React.useState(false);
  const [finished, setFinished] = React.useState(false);

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setDisplay(text);
      setStarted(true);
      setFinished(true);
      return;
    }

    setDisplay("");
    setStarted(false);
    setFinished(false);
  }, [text, shouldReduceMotion]);

  React.useEffect(() => {
    if (shouldReduceMotion) return;
    if (!canStart || finished || started) return;

    if (isInView) {
      const timer = window.setTimeout(() => {
        setStarted(true);
      }, 120);

      return () => window.clearTimeout(timer);
    }
  }, [isInView, canStart, finished, started, shouldReduceMotion]);

  React.useEffect(() => {
    if (shouldReduceMotion) return;
    if (!started || finished || !canStart) return;

    const startedAt = window.performance.now();
    const randomChar = () => decodeChars[Math.floor(Math.random() * decodeChars.length)];

    const interval = window.setInterval(() => {
      const elapsed = window.performance.now() - startedAt;
      const activeIndex = Math.floor(elapsed / letterStepMs);

      if (activeIndex >= text.length) {
        setDisplay(text);
        setFinished(true);
        window.clearInterval(interval);
        return;
      }

      const next = text
        .split("")
        .map((char, index) => {
          if (index < activeIndex) return char;
          if (index === activeIndex) return stableChars.includes(char) ? char : randomChar();
          return "";
        })
        .join("");

      setDisplay(next);
    }, frameStepMs);

    return () => window.clearInterval(interval);
  }, [started, finished, text, canStart, shouldReduceMotion]);

  const animatedText = shouldReduceMotion || finished ? text : display;

  return (
    <motion.span
      ref={ref}
      className={`relative inline-grid min-h-[1em] align-baseline ${className}`}
      initial={{ opacity: 0 }}
      animate={shouldReduceMotion || started || finished ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
    >
      <span className="col-start-1 row-start-1 select-none whitespace-pre-wrap opacity-0" aria-hidden="true">
        {text}
      </span>
      <span className="col-start-1 row-start-1 whitespace-pre-wrap">
        {animatedText}
        {!shouldReduceMotion && started && !finished && display !== text && (
          <motion.span animate={{ opacity: [0.15, 1, 0.15] }} transition={{ repeat: Infinity, duration: 0.75 }} className="ml-1 inline-block text-amber-300">
            {"\u258c"}
          </motion.span>
        )}
      </span>
    </motion.span>
  );
}
