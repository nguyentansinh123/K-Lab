import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type LofiTrack = {
  id: number;
  name: string;
  image: string;
  link: string;
};

type CountingSettingsTabProps = {
  selectedLofi: LofiTrack | null;
  onSelectLofi: (lofi: LofiTrack | null) => void;
};

const data: LofiTrack[] = [
  {
    id: 1,
    name: "Beats to relax/study to",
    image: "/img/lofi1.jpg",
    link: "https://www.youtube.com/watch?v=X4VbdwhkE10"
  },
  {
    id: 2,
    name: "Beats to focus",
    image: "/img/lofi2.jpg",
    link: "https://www.youtube.com/watch?v=JD-kMIpDfnY"
  },
  {
    id: 3,
    name: "Jazz lofi radio",
    image: "/img/lofi3.jpg",
    link: "https://www.youtube.com/watch?v=E2vONfzoyRI"
  },
  {
    id: 4,
    name: "Jazzy & lofi hiphop beats",
    image: "/img/lofi4.jpg",
    link: "https://www.youtube.com/watch?v=5yx6BWlEVcY"
  },
  {
    id: 5,
    name: "Beats to study/relax to",
    image: "/img/lofi5.jpg",
    link: "https://www.youtube.com/watch?v=7NOSDKb0HlU"
  },
  {
    id: 6,
    name: "Beats to sleep/study/relax to",
    image: "/img/lofi6.jpg",
    link: "https://www.youtube.com/watch?v=rPjez8z61rI"
  },
  {
    id: 7,
    name: "Coffee Shop Radio (Chill & Jazzy)",
    image: "/img/lofi7.jpg",
    link: "https://www.youtube.com/watch?v=blAFxjhg62k"
  },
  {
    id: 8,
    name: "Sad & sleepy beats",
    image: "/img/lofi8.jpg",
    link: "https://www.youtube.com/watch?v=FWjZ0x2M8og"
  },
]

export default function CountingSettingsTab({
  selectedLofi,
  onSelectLofi,
}: CountingSettingsTabProps) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const tabRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = (lofi: LofiTrack | null) => {
    onSelectLofi(lofi);
    setOpen(false);
  };

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

  return (
    <div ref={tabRef} className="relative z-30 flex h-10 items-center justify-end">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close music" : "Open music"}
        aria-expanded={open}
        className={`relative z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-[999px] border bg-surface/50 text-on-surface-variant shadow-[0_0_20px_rgba(0,252,64,0.04)] backdrop-blur-sm outline-none transition-all active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-primary/60 ${
          open
            ? "border-primary/30 bg-primary/[0.09] text-primary"
            : "border-white/[0.08] hover:border-primary/25 hover:bg-primary/[0.07] hover:text-primary"
        }`}
      >
        <span
          className={`material-symbols-outlined block text-[1.25rem] leading-none transition-transform duration-200 ${
            open ? "rotate-45" : ""
          }`}
        >
          music_note_2
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.aside
            key="counting-settings-panel"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, x: 36, scale: 0.98 }
            }
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: 36, scale: 0.98 }
            }
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-14 flex h-[min(72vh,36rem)] w-[min(92vw,42rem)] origin-top-right flex-col overflow-hidden rounded-[1.35rem] border border-primary/15 bg-[#0b100d]/90 shadow-[0_26px_80px_rgba(0,0,0,0.55),0_0_34px_rgba(0,252,64,0.08)] backdrop-blur-xl"
          >
            <div className="shrink-0 border-b border-white/[0.07] px-5 py-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/70">
                    Visual settings
                  </p>
                  <h2 className="mt-1 font-headline text-sm font-bold uppercase tracking-[0.12em] text-on-surface">
                    Background
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close settings"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[999px] border border-white/[0.08] text-on-surface-variant outline-none transition-colors hover:border-primary/25 hover:bg-primary/[0.07] hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  <span className="material-symbols-outlined block text-[1rem] leading-none">
                    close
                  </span>
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <button
                  type="button"
                  aria-pressed={selectedLofi === null}
                  onClick={() => handleSelect(null)}
                  className={`group min-h-28 cursor-pointer overflow-hidden rounded-[1rem] border bg-white/[0.035] text-left outline-none transition-all hover:border-primary/25 hover:bg-primary/[0.06] focus-visible:ring-2 focus-visible:ring-primary/60 ${
                    selectedLofi === null
                      ? "border-primary/45 bg-primary/[0.08]"
                      : "border-white/[0.07]"
                  }`}
                >
                  <span className="flex h-16 items-center justify-center border-b border-white/[0.06] bg-[linear-gradient(135deg,rgba(0,252,64,0.12),rgba(255,255,255,0.035)_42%,rgba(0,0,0,0.22)),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:auto,18px_18px]">
                    <span className="material-symbols-outlined text-[1.4rem] text-primary/80">
                      timer
                    </span>
                  </span>
                  <span className="flex items-center justify-between gap-3 px-3 py-3">
                    <span className="min-w-0">
                      <span className="block truncate font-mono text-[10px] uppercase tracking-[0.14em] text-on-surface">
                        Default focus
                      </span>
                    </span>
                    <span className="material-symbols-outlined text-[1rem] text-outline transition-colors group-hover:text-primary">
                      restart_alt
                    </span>
                  </span>
                </button>

                {data.map((data) => (
                  <button
                    key={data.id}
                    type="button"
                    aria-pressed={selectedLofi?.id === data.id}
                    onClick={() => handleSelect(data)}
                    className={`group min-h-28 cursor-pointer overflow-hidden rounded-[1rem] border bg-white/[0.035] text-left outline-none transition-all hover:border-primary/25 hover:bg-primary/[0.06] focus-visible:ring-2 focus-visible:ring-primary/60 ${
                      selectedLofi?.id === data.id
                        ? "border-primary/45 bg-primary/[0.08]"
                        : "border-white/[0.07]"
                    }`}
                  >
                    <span className="block h-16 overflow-hidden border-b border-white/[0.06] bg-black/20">
                      <img
                        src={data.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                      />
                    </span>
                    <span className="flex items-center justify-between gap-3 px-3 py-3">
                      <span className="min-w-0">
                        <span className="block truncate font-mono text-[10px] uppercase tracking-[0.14em] text-on-surface">
                          {data.name}
                        </span>
                      </span>
                      <span className="material-symbols-outlined text-[1rem] text-outline transition-colors group-hover:text-primary">
                        image
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
