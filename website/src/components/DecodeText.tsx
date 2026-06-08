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
const defaultDurationMs = 2400;
const defaultMaxLength = 90;
const defaultRevealChunkSize = 1;
const minFrameMs = 48;

type DecodeFrame = {
  activeChars: Record<number, string>;
  revealedCount: number;
};

function clampDuration(durationMs: number) {
  return Math.min(3200, Math.max(1800, durationMs));
}

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function randomDecodeChar() {
  return decodeChars[Math.floor(Math.random() * decodeChars.length)] ?? "A";
}

function placeholderDecodeChar(index: number) {
  return decodeChars[index % decodeChars.length] ?? "A";
}

function getRevealableIndexes(chars: string[]) {
  return chars.reduce<number[]>((indexes, char, index) => {
    if (!stableChars.has(char)) indexes.push(index);
    return indexes;
  }, []);
}

function buildFrame(revealableIndexes: number[], progress: number, revealChunkSize: number): DecodeFrame {
  const revealedCount = Math.min(revealableIndexes.length, Math.floor(revealableIndexes.length * easeOutCubic(progress)));
  const activeIndexes = revealableIndexes.slice(revealedCount, revealedCount + Math.max(1, revealChunkSize));

  return {
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
  const revealOrderByIndex = React.useMemo(() => new Map(revealableIndexes.map((index, revealOrder) => [index, revealOrder])), [revealableIndexes]);
  const shouldAnimate = !disabled && !shouldReduceMotion && text.length <= maxLength;
  const [frame, setFrame] = React.useState<DecodeFrame>(() => ({ activeChars: {}, revealedCount: revealableIndexes.length }));
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    startedRef.current = false;
    lastFrameAtRef.current = 0;
    setIsAnimating(false);
    setFrame({ activeChars: {}, revealedCount: revealableIndexes.length });
  }, [revealableIndexes.length, text]);

  React.useEffect(() => {
    if (!shouldAnimate || !canStart || !isInView || startedRef.current) {
      return;
    }

    startedRef.current = true;
    setIsAnimating(true);
    setFrame({ activeChars: {}, revealedCount: 0 });

    const startedAt = window.performance.now();
    const duration = clampDuration(durationMs);

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);

      if (now - lastFrameAtRef.current >= minFrameMs || progress >= 1) {
        lastFrameAtRef.current = now;
        setFrame(progress >= 1 ? { activeChars: {}, revealedCount: revealableIndexes.length } : buildFrame(revealableIndexes, progress, revealChunkSize));
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
  }, [canStart, durationMs, isInView, revealChunkSize, revealableIndexes, shouldAnimate]);

  if (!shouldAnimate) {
    return (
      <span ref={ref} className={`inline whitespace-pre-wrap align-baseline ${className}`}>
        {text}
      </span>
    );
  }

  return (
    <span ref={ref} className={`relative inline-block max-w-full whitespace-pre-wrap align-baseline ${className}`} aria-label={text} role="text">
      <span aria-hidden="true">
        {chars.map((char, index) => {
          const revealOrder = revealOrderByIndex.get(index);
          const isRevealed = revealOrder === undefined || revealOrder < frame.revealedCount;

          return (
            <span key={`final-${char}-${index}`} className={isRevealed ? undefined : "opacity-0"}>
              {char}
            </span>
          );
        })}
      </span>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 whitespace-pre-wrap">
        {chars.map((char, index) => {
          const revealOrder = revealOrderByIndex.get(index);
          const isRevealed = revealOrder === undefined || revealOrder < frame.revealedCount;
          const visibleChar = frame.activeChars[index] ?? placeholderDecodeChar(index);

          return (
            <span key={`decode-${char}-${index}`} className={isRevealed ? "opacity-0" : index in frame.activeChars ? "text-amber-200" : "text-stone-100/35"}>
              {visibleChar}
            </span>
          );
        })}
        {isAnimating ? <span className="ml-1 inline-block text-amber-300/75 decode-cursor" aria-hidden="true">{"\u258c"}</span> : null}
      </span>
    </span>
  );
}
