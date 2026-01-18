"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";

const LOOP_DURATION = 26000; // ms

const script = [
  {
    id: "search",
    start: 0,
    end: 8000,
    caption: "An exhausted prospector trudges through the jungle, eyes fixed on the ground for any trace of gold.",
  },
  {
    id: "doubt",
    start: 8000,
    end: 14000,
    caption: "He pauses, worn out and unsure he'll ever find treasure the hard way.",
  },
  {
    id: "encounter",
    start: 14000,
    end: 20000,
    caption: "A confident passerby strolls past, phone in hand, offering a surprising shortcut.",
  },
  {
    id: "reveal",
    start: 20000,
    end: LOOP_DURATION,
    caption: "\"Now getting gold is easier,\" she says, revealing the Lotto Gold WhatsApp group that everyone is buzzing about.",
  },
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const easeInOut = (t: number) => 0.5 * (1 - Math.cos(Math.PI * clamp(t, 0, 1)));

export default function StoryPlayer() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = performance.now();

    const loop = (now: number) => {
      const elapsed = (now - start) % LOOP_DURATION;
      setTime(elapsed);
      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const activeScene = useMemo(
    () => script.find((scene) => time >= scene.start && time < scene.end) ?? script[0],
    [time],
  );

  const explorerX = useMemo(() => {
    if (time < 9000) {
      const progress = easeInOut(time / 9000);
      return -42 + progress * 58;
    }
    if (time < 18000) {
      const progress = (time - 9000) / 9000;
      return 16 - progress * 6;
    }
    const progress = (time - 18000) / (LOOP_DURATION - 18000);
    return 10 - progress * 60;
  }, [time]);

  const phoneX = useMemo(() => {
    if (time < 12000) {
      return 110;
    }
    if (time < 19000) {
      const progress = easeInOut((time - 12000) / 7000);
      return 110 - progress * 70;
    }
    if (time < 23000) {
      return 40;
    }
    const progress = (time - 23000) / (LOOP_DURATION - 23000);
    return 40 - progress * 70;
  }, [time]);

  const phoneOpacity = useMemo(() => {
    if (time < 14000) return 0;
    if (time < 15000) return (time - 14000) / 1000;
    if (time < 23000) return 1;
    if (time < 24000) return 1 - (time - 23000) / 1000;
    return 0;
  }, [time]);

  const sweatLevel = useMemo(() => clamp((time - 6000) / 6000, 0, 1), [time]);
  const glowPulse = 0.5 + 0.5 * Math.sin((time / LOOP_DURATION) * Math.PI * 4);
  const thoughtOpacity = useMemo(() => {
    if (time < 1500 || time > 20000) return 0;
    const center = 11000;
    const distance = Math.abs(time - center);
    return clamp(1 - distance / 6000, 0, 1);
  }, [time]);

  const captionProgress = useMemo(() => {
    const sceneDuration = activeScene.end - activeScene.start;
    const sceneElapsed = time - activeScene.start;
    return clamp(sceneElapsed / sceneDuration, 0, 1);
  }, [activeScene, time]);

  const explorerStyle = useMemo<CSSProperties>(
    () => ({ "--character-shift": `${explorerX}vw` } as CSSProperties),
    [explorerX],
  );

  const guideStyle = useMemo<CSSProperties>(
    () =>
      ({
        "--character-shift": `${phoneX}vw`,
        opacity: phoneOpacity,
      } as CSSProperties),
    [phoneX, phoneOpacity],
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 jungle-noise mix-blend-overlay" />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/60 via-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/60 via-transparent" />
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-12 sm:px-12">
        <header className="flex flex-col gap-2 text-left sm:max-w-3xl">
          <span className="text-sm uppercase tracking-[0.3em] text-emerald-200/80">Cinematic Mock</span>
          <h1 className="text-4xl font-semibold tracking-tight text-emerald-50 sm:text-6xl">
            Jungle Quest: Lotto Gold Encounter
          </h1>
          <p className="text-base leading-relaxed text-emerald-100/80 sm:text-lg">
            A stylised mini-film rendered in the browser. Follow a weary explorer searching for gold until a passerby reveals an easier path: the Lotto Gold WhatsApp group.
          </p>
        </header>

        <section className="relative flex-1">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-b from-emerald-950/90 via-emerald-900/60 to-emerald-950/90 shadow-[0_50px_120px_-60px_rgba(0,0,0,0.8)]">
            <div className="relative h-[420px] sm:h-[520px]">
              <div className="absolute inset-0">
                <div className="jungle-layer jungle-layer--back" />
                <div className="jungle-layer jungle-layer--mid" />
                <div className="jungle-layer jungle-layer--front" />
                <div className="absolute inset-x-0 bottom-[15%] h-12 bg-emerald-950/90 blur-2xl" />
              </div>

              <div className="scene-character scene-character--explorer" style={explorerStyle}>
                <svg viewBox="0 0 120 200" className="h-60 w-auto">
                  <defs>
                    <linearGradient id="bodyShade" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffe8c7" />
                      <stop offset="100%" stopColor="#d6b084" />
                    </linearGradient>
                    <linearGradient id="fabric" x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" stopColor="#3f6432" />
                      <stop offset="100%" stopColor="#2d4c25" />
                    </linearGradient>
                  </defs>
                  <g className="breath" transform="translate(60,40)">
                    <circle r="22" fill="url(#bodyShade)" stroke="#2a2014" strokeWidth="3" />
                    <path
                      d="M -12 12 C -16 32 -18 64 -12 92 L 12 92 C 18 64 16 32 12 12 Z"
                      fill="url(#fabric)"
                    />
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      values="1 1; 1 1.05; 1 1"
                      dur="4.2s"
                      repeatCount="indefinite"
                      additive="sum"
                    />
                  </g>
                  <g className="arm arm-left" transform="translate(40,70)">
                    <rect x="-6" y="0" width="12" height="60" rx="6" fill="#2f4924" />
                    <circle cx="0" cy="60" r="10" fill="url(#bodyShade)" />
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="12 0 0; -18 0 0; 12 0 0"
                      dur="2.6s"
                      repeatCount="indefinite"
                      additive="sum"
                    />
                  </g>
                  <g className="arm arm-right" transform="translate(80,70)">
                    <rect x="-6" y="0" width="12" height="60" rx="6" fill="#2f4924" />
                    <circle cx="0" cy="60" r="10" fill="url(#bodyShade)" />
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="-10 0 0; 18 0 0; -10 0 0"
                      dur="2.6s"
                      repeatCount="indefinite"
                      additive="sum"
                    />
                  </g>
                  <g className="leg leg-left" transform="translate(48,132)">
                    <rect x="-6" y="0" width="12" height="56" rx="6" fill="#1f2f1b" />
                    <rect x="-18" y="50" width="28" height="14" rx="8" fill="#1a2a17" />
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="6 0 0; -12 0 0; 6 0 0"
                      dur="2.8s"
                      repeatCount="indefinite"
                      additive="sum"
                    />
                  </g>
                  <g className="leg leg-right" transform="translate(72,132)">
                    <rect x="-6" y="0" width="12" height="56" rx="6" fill="#1f2f1b" />
                    <rect x="-10" y="50" width="28" height="14" rx="8" fill="#1a2a17" />
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="-6 0 0; 10 0 0; -6 0 0"
                      dur="2.8s"
                      repeatCount="indefinite"
                      additive="sum"
                    />
                  </g>
                  <g className="sweat" opacity={sweatLevel}>
                    <path d="M50 50 C52 60 48 64 45 58" fill="#7fd7ff" opacity="0.7" />
                    <path d="M56 58 C58 66 54 70 51 64" fill="#7fd7ff" opacity="0.7" />
                  </g>
                  <g className="torch" transform="translate(24,100)">
                    <rect x="-4" y="0" width="8" height="60" rx="4" fill="#d89c4b" />
                    <path d="M -10 4 C 0 -18 10 -18 20 4 Z" fill="#ffdf6f" opacity="0.8" />
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite" />
                  </g>
                </svg>
                <div className="character-shadow" />
                <div
                  className="narration narration--thought"
                  style={{ opacity: thoughtOpacity }}
                >
                  Still nothing... there&apos;s got to be a better way.
                </div>
              </div>

              <div className="scene-character scene-character--guide" style={guideStyle}>
                <svg viewBox="0 0 120 200" className="h-56 w-auto">
                  <defs>
                    <linearGradient id="guideSkin" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#fbd4b5" />
                      <stop offset="100%" stopColor="#df9c71" />
                    </linearGradient>
                    <linearGradient id="guideTop" x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" stopColor="#386bff" />
                      <stop offset="100%" stopColor="#3fc7ff" />
                    </linearGradient>
                  </defs>
                  <g transform="translate(60,38)">
                    <circle r="22" fill="url(#guideSkin)" stroke="#2d1f13" strokeWidth="3" />
                    <circle cx="-8" cy="-4" r="3" fill="#1a1a1a" />
                    <circle cx="8" cy="-4" r="3" fill="#1a1a1a" />
                    <path d="M -6 8 Q 0 14 6 8" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
                  </g>
                  <g transform="translate(60,104)">
                    <path d="M -28 -24 H 28 L 34 54 H -34 Z" fill="url(#guideTop)" />
                  </g>
                  <g className="guide-arm guide-arm--phone" transform="translate(38,82)">
                    <rect x="-5" y="0" width="10" height="56" rx="6" fill="#2d92ff" />
                    <g className="guide-phone" transform="translate(0,48)">
                      <rect x="-16" y="-26" width="32" height="48" rx="6" fill="#0d1c2d" />
                      <rect x="-12" y="-22" width="24" height="36" rx="4" fill="#f5fafa" />
                      <rect x="-10" y="-20" width="20" height="10" rx="3" fill="#25D366" />
                      <text
                        x="0"
                        y="-12"
                        textAnchor="middle"
                        fontSize="6"
                        fill="#ffffff"
                        fontFamily="'Trebuchet MS', sans-serif"
                      >
                        WhatsApp
                      </text>
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        fontSize="7"
                        fontWeight="700"
                        fill="#1b4332"
                        fontFamily="'Trebuchet MS', sans-serif"
                      >
                        Lotto Gold
                      </text>
                      <rect x="-10" y="10" width="20" height="4" rx="2" fill="#25D366" />
                    </g>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="-6 0 0; 8 0 0; -6 0 0"
                      dur="2.2s"
                      repeatCount="indefinite"
                      additive="sum"
                    />
                  </g>
                  <g className="guide-arm guide-arm--wave" transform="translate(82,82)">
                    <rect x="-5" y="0" width="10" height="56" rx="6" fill="#2d92ff" />
                    <circle cx="0" cy="56" r="10" fill="url(#guideSkin)" />
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="10 0 0; -14 0 0; 10 0 0"
                      dur="2.5s"
                      repeatCount="indefinite"
                      additive="sum"
                    />
                  </g>
                  <g className="guide-leg guide-leg--front" transform="translate(48,136)">
                    <rect x="-6" y="0" width="12" height="54" rx="6" fill="#1d2d64" />
                    <rect x="-18" y="46" width="32" height="12" rx="8" fill="#131c40" />
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="4 0 0; -8 0 0; 4 0 0"
                      dur="2.4s"
                      repeatCount="indefinite"
                      additive="sum"
                    />
                  </g>
                  <g className="guide-leg guide-leg--back" transform="translate(72,136)">
                    <rect x="-6" y="0" width="12" height="54" rx="6" fill="#1d2d64" />
                    <rect x="-12" y="46" width="32" height="12" rx="8" fill="#131c40" />
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="-4 0 0; 8 0 0; -4 0 0"
                      dur="2.4s"
                      repeatCount="indefinite"
                      additive="sum"
                    />
                  </g>
                </svg>
                <div className="character-shadow" />
                <div className="speech-bubble" role="dialog" aria-live="polite">
                  <div className="bubble-text">Now getting gold is easier.</div>
                  <div className="bubble-phone">
                    <div className="phone-header">WhatsApp</div>
                    <div className="phone-group">Lotto Gold</div>
                    <div className="phone-cta">Join &amp; strike!</div>
                  </div>
                </div>
              </div>

              <div className="gold-glimmer" style={{ opacity: 0.2 + glowPulse * 0.6 }}>
                <div className="glimmer glimmer--1" />
                <div className="glimmer glimmer--2" />
                <div className="glimmer glimmer--3" />
                <div className="glimmer glimmer--4" />
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-4 border-t border-emerald-400/10 bg-black/50 px-6 py-6 backdrop-blur">
              <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.3em] text-emerald-200/70">
                <span>Scene</span>
                <div className="h-px flex-1 bg-emerald-400/30" />
                <span>{activeScene.id}</span>
              </div>
              <p className="text-lg leading-relaxed text-emerald-50/90 sm:text-xl">{activeScene.caption}</p>
              <div className="relative h-1 w-full overflow-hidden rounded-full bg-emerald-400/10">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-300 via-emerald-200 to-emerald-100"
                  style={{ width: `${captionProgress * 100}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-6 pb-6 text-sm text-emerald-100/70 sm:flex-row sm:items-end sm:justify-between">
          <div>
            Crafted for instant playback—no external assets, just procedural animation in the browser.
          </div>
          <div className="flex flex-wrap items-center gap-3 text-emerald-200/80">
            <span className="rounded-full border border-emerald-400/30 px-4 py-1 text-xs uppercase tracking-[0.25em]">
              Lotto Gold
            </span>
            <span className="rounded-full border border-emerald-400/30 px-4 py-1 text-xs uppercase tracking-[0.25em]">
              Storyboard Prototype
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
