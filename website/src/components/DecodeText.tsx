import React from "react";
import { useInView, useReducedMotion } from "framer-motion";

type DecodeTextProps = {
  text: string;
  className?: string;
  canStart?: boolean;
  disabled?: boolean;
  durationMs?: number;
  maxLength?: number;
  revealChunkSize?: number;
};

const stableChars = new Set([" ", ".", ",", "-", ":", ";", "!", "?", "\n"]);
const decodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const defaultDurationMs = 1800;
const defaultMaxLength = 90;
const defaultRevealChunkSize = 1;
const minFrameMs = 120;

type DecodeFrame = {
  activeIndex: number;
  activeChars: Record<number, string>;
  revealedCount: number;
};

function clampDuration(durationMs: number) {
  return Math.min(2200, Math.max(1600, durationMs));
}

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function randomDecodeChar() {
  return decodeChars[Math.floor(Math.random() * decodeChars.length)] ?? "A";
}

function getRevealableIndexes(chars: string[]) {
  return chars.reduce<number[]>((indexes, char, index) => {
    if (!stableChars.has(char)) indexes.push(index);
    return indexes;
  }, []);
}

function buildFrame(text: string, progress: number, revealChunkSize: number): DecodeFrame {
  const chars = Array.from(text);
  const revealableIndexes = getRevealableIndexes(chars);
  const revealedCount = Math.min(revealableIndexes.length, Math.floor(revealableIndexes.length * easeOutCubic(progress)));
  const activeIndexes = revealableIndexes.slice(revealedCount, revealedCount + Math.max(1, revealChunkSize));

  return {
    activeIndex: activeIndexes[0] ?? -1,
    activeChars: activeIndexes.reduce<Record<number, string>>((activeChars, index) => {
      activeChars[index] = randomDecodeChar();
      return activeChars;
    }, {}),
    revealedCount,
  };
}

export function DecodeText({ text, className = "", canStart = true, disabled = false, durationMs = defaultDurationMs, maxLength = defaultMaxLength, revealChunkSize = defaultRevealChunkSize }: DecodeTextProps) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const frameRef = React.useRef<number | null>(null);
  const startedRef = React.useRef(false);
  const lastFrameAtRef = React.useRef(0);
  const isInView = useInView(ref, { once: true, amount: 0.35, margin: "-10% 0px -10% 0px" });
  const shouldReduceMotion = useReducedMotion();
  const chars = React.useMemo(() => Array.from(text), [text]);
  const revealableIndexes = React.useMemo(() => getRevealableIndexes(chars), [chars]);
  const shouldAnimate = !disabled && !shouldReduceMotion && text.length <= maxLength;
  const [frame, setFrame] = React.useState<DecodeFrame>(() => ({ activeIndex: -1, activeChars: {}, revealedCount: revealableIndexes.length }));
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    startedRef.current = false;
    lastFrameAtRef.current = 0;
    setIsAnimating(false);
    setFrame({ activeIndex: -1, activeChars: {}, revealedCount: revealableIndexes.length });
  }, [revealableIndexes.length, text]);

  React.useEffect(() => {
    if (!shouldAnimate || !canStart || !isInView || startedRef.current) {
      return;
    }

    startedRef.current = true;
    setIsAnimating(true);

    const startedAt = window.performance.now();
    const duration = clampDuration(durationMs);

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);

      if (now - lastFrameAtRef.current >= minFrameMs || progress >= 1) {
        lastFrameAtRef.current = now;
        setFrame(progress >= 1 ? { activeIndex: -1, activeChars: {}, revealedCount: revealableIndexes.length } : buildFrame(text, progress, revealChunkSize));
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
  }, [canStart, durationMs, isInView, revealChunkSize, revealableIndexes.length, shouldAnimate, text]);

  if (!shouldAnimate) {
    return (
      <span ref={ref} className={`inline whitespace-pre-wrap align-baseline ${className}`}>
        {text}
      </span>
    );
  }

  let revealableSeen = 0;

  return (
    <span ref={ref} className={`inline whitespace-pre-wrap align-baseline ${className}`} aria-label={text} role="text">
      <span aria-hidden="true">
        {chars.map((char, index) => {
          const isStable = stableChars.has(char);
          const revealOrder = isStable ? -1 : revealableSeen++;
          const isRevealed = isStable || revealOrder < frame.revealedCount;
          const isActive = index in frame.activeChars;
          const visibleChar = isActive ? frame.activeChars[index] : char;

          return (
            <span key={`${char}-${index}`} className={isActive ? "text-amber-200" : isRevealed ? undefined : "text-stone-100/35"}>
              {visibleChar}
            </span>
          );
        })}
        {isAnimating ? <span className="ml-1 inline-block text-amber-300/75 decode-cursor" aria-hidden="true">{"\u258c"}</span> : null}
      </span>
    </span>
  );
}
