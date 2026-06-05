import React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type DecodeTextProps = {
  text: string;
  className?: string;
  canStart?: boolean;
  disabled?: boolean;
  maxLength?: number;
  durationMs?: number;
};

const stableChars = new Set([" ", ".", ",", "-", ":", ";", "/", "\n"]);
const decodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/_#@";
const defaultMaxLength = 90;
const defaultDurationMs = 900;
const minFrameMs = 48;

function clampDuration(durationMs: number) {
  return Math.min(1200, Math.max(450, durationMs));
}

function randomDecodeChar() {
  return decodeChars[Math.floor(Math.random() * decodeChars.length)] ?? "";
}

function buildDecodedFrame(text: string, progress: number) {
  const chars = Array.from(text);
  const revealedCount = Math.floor(chars.length * progress);
  const activeCount = Math.min(chars.length, revealedCount + 3);

  return chars
    .map((char, index) => {
      if (index < revealedCount) return char;
      if (index < activeCount) return stableChars.has(char) ? char : randomDecodeChar();
      return char === "\n" ? "\n" : " ";
    })
    .join("");
}

export function DecodeText({ text, className = "", canStart = true, disabled = false, maxLength = defaultMaxLength, durationMs = defaultDurationMs }: DecodeTextProps) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const frameRef = React.useRef<number | null>(null);
  const startedRef = React.useRef(false);
  const lastFrameAtRef = React.useRef(0);
  const isInView = useInView(ref, { once: true, amount: 0.35, margin: "-10% 0px -10% 0px" });
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = !disabled && !shouldReduceMotion && text.length <= maxLength;
  const [display, setDisplay] = React.useState(text);
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    startedRef.current = false;
    lastFrameAtRef.current = 0;
    setIsAnimating(false);
    setDisplay(text);
  }, [text]);

  React.useEffect(() => {
    if (!shouldAnimate || !canStart || !isInView || startedRef.current) {
      return;
    }

    startedRef.current = true;
    setIsAnimating(true);

    const startedAt = window.performance.now();
    const duration = clampDuration(durationMs);

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const progress = Math.min(1, elapsed / duration);

      if (now - lastFrameAtRef.current >= minFrameMs || progress >= 1) {
        lastFrameAtRef.current = now;
        setDisplay(progress >= 1 ? text : buildDecodedFrame(text, progress));
      }

      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(tick);
      } else {
        frameRef.current = null;
        setIsAnimating(false);
      }
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [canStart, durationMs, isInView, shouldAnimate, text]);

  const visibleText = shouldAnimate && isAnimating ? display : text;

  return (
    <motion.span
      ref={ref}
      className={`relative inline-grid min-h-[1em] align-baseline ${className}`}
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
    >
      <span className="col-start-1 row-start-1 whitespace-pre-wrap" aria-label={text}>
        <span className="invisible select-none" aria-hidden="true">{text}</span>
        {shouldAnimate ? (
          <span className="absolute inset-0 whitespace-pre-wrap" aria-hidden="true">
            {visibleText}
            {isAnimating ? <span className="ml-1 inline-block text-amber-300 decode-cursor" aria-hidden="true">{"\u258c"}</span> : null}
          </span>
        ) : null}
        {!shouldAnimate ? text : null}
      </span>
    </motion.span>
  );
}
