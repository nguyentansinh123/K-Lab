import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type AmbientSound = {
  id: string;
  label: string;
  icon: string;
  src: string;
};

type SoundState = {
  enabled: boolean;
  volume: number;
};

const ambientSounds: AmbientSound[] = [
  {
    id: "light-rain",
    label: "Light rain",
    icon: "rainy",
    src: "/sounds/moodist/rain/light-rain.mp3",
  },
  {
    id: "cafe",
    label: "Cafe",
    icon: "local_cafe",
    src: "/sounds/moodist/places/cafe.mp3",
  },
  {
    id: "campfire",
    label: "Campfire",
    icon: "local_fire_department",
    src: "/sounds/moodist/nature/campfire.mp3",
  },
  {
    id: "waves",
    label: "Waves",
    icon: "water",
    src: "/sounds/moodist/nature/waves.mp3",
  },
  {
    id: "keyboard",
    label: "Keyboard",
    icon: "keyboard",
    src: "/sounds/moodist/things/keyboard.mp3",
  },
  {
    id: "pink-noise",
    label: "Pink noise",
    icon: "graphic_eq",
    src: "/sounds/moodist/noise/pink-noise.wav",
  },
];

const initialSoundState = ambientSounds.reduce<Record<string, SoundState>>(
  (state, sound) => ({
    ...state,
    [sound.id]: { enabled: false, volume: 0.45 },
  }),
  {},
);

function AmbientSoundPlayer({
  enabled,
  src,
  volume,
}: {
  enabled: boolean;
  src: string;
  volume: number;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    if (enabled) {
      audio.play().catch(() => {
        audio.pause();
      });
      return;
    }

    audio.pause();
  }, [enabled, volume]);

  useEffect(() => {
    const audio = audioRef.current;
    return () => audio?.pause();
  }, []);

  return <audio ref={audioRef} src={src} loop preload="none" />;
}

export default function AmbientSoundSettings() {
  const [open, setOpen] = useState(false);
  const [soundState, setSoundState] = useState(initialSoundState);
  const reduceMotion = useReducedMotion();
  const tabRef = useRef<HTMLDivElement | null>(null);

  const enabledCount = ambientSounds.filter(
    (sound) => soundState[sound.id].enabled,
  ).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tabRef.current && !tabRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const toggleSound = (id: string) => {
    setSoundState((current) => ({
      ...current,
      [id]: {
        ...current[id],
        enabled: !current[id].enabled,
      },
    }));
  };

  const setVolume = (id: string, volume: number) => {
    setSoundState((current) => ({
      ...current,
      [id]: {
        ...current[id],
        volume,
      },
    }));
  };

  const clearSounds = () => {
    setSoundState((current) =>
      Object.fromEntries(
        Object.entries(current).map(([id, value]) => [
          id,
          { ...value, enabled: false },
        ]),
      ),
    );
  };

  return (
    <div ref={tabRef} className="relative z-30 flex h-10 items-center justify-end">
      {ambientSounds.map((sound) => (
        <AmbientSoundPlayer
          key={sound.id}
          enabled={soundState[sound.id].enabled}
          src={sound.src}
          volume={soundState[sound.id].volume}
        />
      ))}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close ambient sounds" : "Open ambient sounds"}
        aria-expanded={open}
        className={`relative z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-[999px] border bg-surface/50 text-on-surface-variant shadow-[0_0_20px_rgba(0,252,64,0.04)] backdrop-blur-sm outline-none transition-all active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-primary/60 ${
          open || enabledCount > 0
            ? "border-primary/30 bg-primary/[0.09] text-primary"
            : "border-white/[0.08] hover:border-primary/25 hover:bg-primary/[0.07] hover:text-primary"
        }`}
      >
        <span className="material-symbols-outlined block text-[1.25rem] leading-none">
          tune
        </span>
        {enabledCount > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full border border-[#0b100d] bg-primary px-1 font-mono text-[9px] font-bold leading-none text-black">
            {enabledCount}
          </span>
        ) : null}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.aside
            key="ambient-sounds-panel"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, x: 28, scale: 0.98 }
            }
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: 28, scale: 0.98 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute right-0 top-14 flex max-h-[min(72vh,25rem)] w-[min(88vw,18.5rem)] origin-top-right flex-col overflow-hidden rounded-[0.95rem] border border-primary/15 bg-[#0b100d]/92 shadow-[0_22px_64px_rgba(0,0,0,0.52),0_0_28px_rgba(0,252,64,0.07)] backdrop-blur-xl"
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary/70">
                  Moodist
                </p>
                <h2 className="mt-0.5 font-headline text-xs font-bold uppercase tracking-[0.12em] text-on-surface">
                  Ambient
                </h2>
              </div>

              <button
                type="button"
                onClick={clearSounds}
                aria-label="Clear ambient sounds"
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-[999px] border border-white/[0.08] text-on-surface-variant outline-none transition-colors hover:border-primary/25 hover:bg-primary/[0.07] hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                <span className="material-symbols-outlined block text-[0.95rem] leading-none">
                  restart_alt
                </span>
              </button>
            </div>

            <div className="grid min-h-0 gap-1.5 overflow-y-auto overscroll-contain px-3 py-3 pr-2">
              {ambientSounds.map((sound) => {
                const current = soundState[sound.id];

                return (
                  <div
                    key={sound.id}
                    className={`rounded-[0.75rem] border px-2.5 py-2 transition-colors ${
                      current.enabled
                        ? "border-primary/35 bg-primary/[0.08]"
                        : "border-white/[0.07] bg-white/[0.035]"
                    }`}
                  >
                    <button
                      type="button"
                      aria-pressed={current.enabled}
                      onClick={() => toggleSound(sound.id)}
                      className="flex w-full cursor-pointer items-center gap-2.5 rounded-[0.55rem] text-left outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    >
                      <span
                        aria-hidden="true"
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          current.enabled
                            ? "border-primary/35 bg-primary/15 text-primary"
                            : "border-white/[0.08] text-on-surface-variant hover:border-primary/25 hover:text-primary"
                        }`}
                      >
                        <span className="material-symbols-outlined block text-[0.95rem] leading-none">
                          {sound.icon}
                        </span>
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <span className="truncate font-mono text-[9px] uppercase tracking-[0.13em] text-on-surface">
                            {sound.label}
                          </span>
                          <span className="font-mono text-[9px] text-primary/70">
                            {Math.round(current.volume * 100)}
                          </span>
                        </div>
                      </div>
                    </button>

                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={current.volume}
                      aria-label={`${sound.label} volume`}
                      onChange={(event) =>
                        setVolume(sound.id, Number(event.target.value))
                      }
                      className="mt-2 h-1.5 w-full cursor-pointer accent-primary"
                    />
                  </div>
                );
              })}
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
