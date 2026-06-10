import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const GOLD = "#f6d365";
const GOLD_SOFT = "rgba(246, 211, 101, 0.75)";
const BLACK = "#020100";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function fade(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

function fadeOut(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

function hash(seed: string, index: number, frame: number) {
  let h = 2166136261;
  const input = `${seed}-${index}-${frame}`;

  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }

  return Math.abs(h);
}

function randomChar(seed: string, index: number, frame: number) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\_#@";
  return chars[hash(seed, index, frame) % chars.length];
}

function DecodeText({
  text,
  startFrame,
  durationFrames,
  style,
  splitLines = false,
}: {
  text: string;
  startFrame: number;
  durationFrames: number;
  style?: React.CSSProperties;
  splitLines?: boolean;
}) {
  const frame = useCurrentFrame();
  const local = frame - startFrame;

  const safeChars = [" ", ".", ",", ":", "-", "\n"];
  const progress = clamp(local / durationFrames, 0, 1);

  const visibleCount = Math.floor(text.length * clamp(progress * 1.7, 0, 1));
  const revealCount = Math.floor(text.length * clamp((progress - 0.25) * 1.35, 0, 1));

  const output = text
    .split("")
    .map((char, index) => {
      if (index > visibleCount) return "";
      if (safeChars.includes(char)) return char;
      if (index < revealCount) return char;
      return randomChar(text, index, frame);
    })
    .join("");

  const opacity =
    fade(frame, startFrame, startFrame + 12) *
    fadeOut(frame, startFrame + durationFrames + 24, startFrame + durationFrames + 42);

  if (splitLines) {
    return (
      <div style={{ whiteSpace: "pre-line", opacity, ...style }}>
        {output}
        {local > 0 && local < durationFrames && <span style={{ color: GOLD }}>▌</span>}
      </div>
    );
  }

  return (
    <div style={{ opacity, ...style }}>
      {output}
      {local > 0 && local < durationFrames && <span style={{ color: GOLD }}>▌</span>}
    </div>
  );
}

function NoiseBackground() {
  const frame = useCurrentFrame();
  const opacity = 0.055 + Math.sin(frame * 0.12) * 0.012;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BLACK,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 35%, rgba(246,211,101,0.13), transparent 42%), radial-gradient(circle at 50% 85%, rgba(246,211,101,0.06), transparent 45%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.14,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "92px 92px",
          transform: `translateY(${frame * 0.08}px)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.026) 0px, rgba(255,255,255,0.026) 1px, transparent 1px, transparent 5px)",
          mixBlendMode: "soft-light",
        }}
      />
    </AbsoluteFill>
  );
}

function BalkanVeilLogo({ startFrame }: { startFrame: number }) {
  const frame = useCurrentFrame();

  const opacity = fade(frame, startFrame, startFrame + 22);

  const scale = interpolate(frame, [startFrame, startFrame + 45], [0.82, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glow = interpolate(frame, [startFrame, startFrame + 40, startFrame + 90], [0, 1, 0.72], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 640,
          height: 640,
          borderRadius: "50%",
          border: "1px solid rgba(246,211,101,0.34)",
          boxShadow: `0 0 ${220 * glow}px rgba(246,211,101,0.46), 0 0 ${
            78 * glow
          }px rgba(246,211,101,0.34), inset 0 0 96px rgba(246,211,101,0.1)`,
          background:
            "radial-gradient(circle at center, rgba(246,211,101,0.2), rgba(0,0,0,0.9) 58%, rgba(246,211,101,0.1))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 24,
            borderRadius: "50%",
            border: "1px solid rgba(246,211,101,0.16)",
            boxShadow: "inset 0 0 42px rgba(246,211,101,0.08)",
          }}
        />

        <Img
          src={staticFile("assets/balkan-veil-logo-exact.png")}
          style={{
            width: 640,
            height: 640,
            objectFit: "contain",
            objectPosition: "center",
            filter: `drop-shadow(0 0 ${94 * glow}px rgba(246,211,101,0.58))`,
          }}
        />
      </div>
    </div>
  );
}

function UICut({
  title,
  subtitle,
  index,
  startFrame,
}: {
  title: string;
  subtitle: string;
  index: number;
  startFrame: number;
}) {
  const frame = useCurrentFrame();

  const opacity =
    fade(frame, startFrame, startFrame + 8) *
    fadeOut(frame, startFrame + 88, startFrame + 110);

  const y = interpolate(frame, [startFrame, startFrame + 62], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [startFrame, startFrame + 96], [0.94, 1.02], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `translateY(${y}px) scale(${scale})`,
      }}
    >
      <div
        style={{
          width: 820,
          height: 980,
          borderRadius: 58,
          border: "1px solid rgba(246,211,101,0.22)",
          background:
            "linear-gradient(145deg, rgba(10,10,10,0.96), rgba(0,0,0,0.86)), radial-gradient(circle at 70% 20%, rgba(246,211,101,0.12), transparent 40%)",
          boxShadow: "0 0 90px rgba(246,211,101,0.11)",
          padding: 54,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 50,
          }}
        >
          <span style={{ width: 18, height: 18, borderRadius: 99, background: "#333" }} />
          <span style={{ width: 18, height: 18, borderRadius: 99, background: "#333" }} />
          <span style={{ width: 18, height: 18, borderRadius: 99, background: GOLD_SOFT }} />
          <span
            style={{
              marginLeft: 22,
              fontFamily: "monospace",
              color: "rgba(255,255,255,0.32)",
              letterSpacing: 6,
              fontSize: 18,
            }}
          >
            VEIL://0{index + 1}
          </span>
        </div>

        <div
          style={{
            fontFamily: "monospace",
            color: GOLD,
            fontSize: 24,
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          {subtitle}
        </div>

        <div
          style={{
            marginTop: 36,
            fontFamily: "Georgia, serif",
            color: "#f4f0e6",
            fontSize: 74,
            lineHeight: 0.95,
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: 58,
            display: "grid",
            gap: 22,
          }}
        >
          {["Private interface", "Premium system", "Digital presence"].map((line, i) => (
            <div
              key={line}
              style={{
                height: 86,
                borderRadius: 28,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.025)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 30px",
                color: "rgba(255,255,255,0.48)",
                fontFamily: "monospace",
                fontSize: 22,
              }}
            >
              <span>{line}</span>
              <span
                style={{
                  width: 90 - i * 12,
                  height: 6,
                  borderRadius: 99,
                  background: "rgba(246,211,101,0.35)",
                }}
              />
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 64,
            height: 250,
            borderRadius: 32,
            border: "1px solid rgba(255,255,255,0.08)",
            backgroundImage:
              "linear-gradient(135deg, rgba(246,211,101,0.14), transparent 42%), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "auto, 34px 34px, 34px 34px",
          }}
        />
      </div>
    </div>
  );
}

function TextSequence() {
  const frame = useCurrentFrame();

  const items = [
    { text: "Premium websites.", subtitle: "Premium presence", start: 0 },
    { text: "Private systems.", subtitle: "Selected systems", start: 54 },
    { text: "Built in silence.", subtitle: "Private build", start: 108 },
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 90,
      }}
    >
      {items.map((item) => {
        const opacity =
          fade(frame, item.start, item.start + 10) *
          fadeOut(frame, item.start + 50, item.start + 68);

        const y = interpolate(frame, [item.start, item.start + 54], [34, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={item.text}
            style={{
              position: "absolute",
              inset: 0,
              opacity,
              transform: `translateY(${y}px)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 820,
                minHeight: 430,
                borderRadius: 46,
                border: "1px solid rgba(246,211,101,0.22)",
                background:
                  "linear-gradient(145deg, rgba(10,10,10,0.94), rgba(0,0,0,0.86)), radial-gradient(circle at 72% 18%, rgba(246,211,101,0.12), transparent 38%)",
                boxShadow: "0 0 90px rgba(246,211,101,0.12)",
                padding: "50px 56px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  fontFamily: "monospace",
                  color: GOLD,
                  fontSize: 22,
                  letterSpacing: 7,
                  textTransform: "uppercase",
                  marginBottom: 34,
                }}
              >
                {item.subtitle}
              </div>

              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 76,
                  lineHeight: 0.98,
                  color: "#f4f0e6",
                  textShadow: "0 0 38px rgba(246,211,101,0.16)",
                }}
              >
                {item.text}
              </div>

              <div
                style={{
                  marginTop: 44,
                  height: 8,
                  width: 180,
                  borderRadius: 99,
                  background: "rgba(246,211,101,0.36)",
                  boxShadow: "0 0 24px rgba(246,211,101,0.2)",
                }}
              />
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

function FinalLockup() {
  const frame = useCurrentFrame();
  const start = 0;

  const opacity = fade(frame, start, start + 24);
  const scale = interpolate(frame, [start, start + 50], [0.96, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          width: 780,
          borderRadius: 42,
          border: "1px solid rgba(246,211,101,0.22)",
          background: "rgba(0,0,0,0.62)",
          boxShadow: "0 0 100px rgba(246,211,101,0.13)",
          padding: "42px 50px 52px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            height: 420,
            overflow: "hidden",
          }}
        >
          <Img
            src={staticFile("assets/balkan-veil-logo-exact.png")}
            style={{
              width: "100%",
              height: 420,
              objectFit: "contain",
              filter: "drop-shadow(0 0 34px rgba(246,211,101,0.2))",
            }}
          />
        </div>

        <div
          style={{
            marginTop: 24,
            fontFamily: "monospace",
            fontSize: 24,
            letterSpacing: 8,
            color: "rgba(246,211,101,0.78)",
            textTransform: "uppercase",
          }}
        >
          Start your private build.
        </div>
      </div>
    </AbsoluteFill>
  );
}

export function BalkanVeilTeaser() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const finalFade = fadeOut(frame, durationInFrames - 18, durationInFrames);

  return (
    <AbsoluteFill style={{ backgroundColor: BLACK }}>
      <NoiseBackground />

      <Sequence from={0} durationInFrames={70}>
        <DecodeText
          text="B4LK4N V31L"
          startFrame={5}
          durationFrames={42}
          style={{
            position: "absolute",
            width: "100%",
            top: 840,
            textAlign: "center",
            fontFamily: "monospace",
            fontSize: 68,
            letterSpacing: 18,
            color: GOLD,
            textShadow: "0 0 40px rgba(246,211,101,0.35)",
          }}
        />
      </Sequence>

      <Sequence from={50} durationInFrames={260}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <BalkanVeilLogo startFrame={0} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={168} durationInFrames={140}>
        <DecodeText
          text={"In Shadows,\nPower Remains."}
          startFrame={3}
          durationFrames={102}
          splitLines
          style={{
            position: "absolute",
            width: "100%",
            top: 1320,
            textAlign: "center",
            fontFamily: "Georgia, serif",
            fontSize: 70,
            lineHeight: 1.1,
            color: "#f4f0e6",
            textShadow: "0 0 35px rgba(246,211,101,0.18)",
          }}
        />
      </Sequence>

      <Sequence from={310} durationInFrames={250}>
        <UICut title="Home" subtitle="Premium presence" index={0} startFrame={0} />
        <UICut title="Work" subtitle="Selected systems" index={1} startFrame={68} />
        <UICut title="Access" subtitle="Private terminal" index={2} startFrame={136} />
      </Sequence>

      <Sequence from={565} durationInFrames={176}>
        <TextSequence />
      </Sequence>

      <Sequence from={750} durationInFrames={150}>
        <FinalLockup />
      </Sequence>

      <AbsoluteFill
        style={{
          backgroundColor: BLACK,
          opacity: 1 - finalFade,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
}
