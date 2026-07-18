import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ReactPlayer from "react-player";
import { useLanguage } from "../../i18n/LanguageContext";

export type LofiTrack = {
  id: string;
  name: string;
  image?: string;
  link: string;
  sourceType: "youtube" | "audio";
};

type CountingSettingsTabProps = {
  selectedLofi: LofiTrack | null;
  onSelectLofi: (lofi: LofiTrack | null) => void;
};

const tracks: LofiTrack[] = [
  ["1", "Beats to relax/study to", "/img/lofi1.jpg", "https://www.youtube.com/watch?v=X4VbdwhkE10"],
  ["2", "Beats to focus", "/img/lofi2.jpg", "https://www.youtube.com/watch?v=JD-kMIpDfnY"],
  ["3", "Jazz lofi radio", "/img/lofi3.jpg", "https://www.youtube.com/watch?v=E2vONfzoyRI"],
  ["4", "Jazzy & lofi hiphop beats", "/img/lofi4.jpg", "https://www.youtube.com/watch?v=5yx6BWlEVcY"],
  ["5", "Beats to study/relax to", "/img/lofi5.jpg", "https://www.youtube.com/watch?v=7NOSDKb0HlU"],
  ["6", "Sleep/study/relax radio", "/img/lofi6.jpg", "https://www.youtube.com/watch?v=rPjez8z61rI"],
  ["7", "Coffee shop radio", "/img/lofi7.jpg", "https://www.youtube.com/watch?v=blAFxjhg62k"],
  ["8", "Sad & sleepy beats", "/img/lofi8.jpg", "https://www.youtube.com/watch?v=FWjZ0x2M8og"],
].map(([id, name, image, link]) => ({ id, name, image, link, sourceType: "youtube" as const }));

const isYouTubeUrl = (value: string) => {
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, "");
    return (
      (host === "youtube.com" || host === "m.youtube.com" || host === "youtu.be")
      && Boolean(ReactPlayer.canPlay?.(value))
    );
  } catch {
    return false;
  }
};

export default function CountingSettingsTab({ selectedLofi, onSelectLofi }: CountingSettingsTabProps) {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [sourceType, setSourceType] = useState<"youtube" | "audio">("youtube");
  const [name, setName] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const tabRef = useRef<HTMLDivElement | null>(null);
  const objectUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    const objectUrls = objectUrlsRef.current;
    const closeOutside = (event: MouseEvent) => {
      if (tabRef.current && !tabRef.current.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setCustomOpen(false);
      }
    };
    document.addEventListener("mousedown", closeOutside);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOutside);
      window.removeEventListener("keydown", closeOnEscape);
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const selectTrack = (track: LofiTrack | null) => {
    onSelectLofi(track);
    setOpen(false);
  };

  const resetForm = () => {
    setName("");
    setYoutubeUrl("");
    setAudioFile(null);
    setError(null);
  };

  const createTrack = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (sourceType === "youtube") {
      const link = youtubeUrl.trim();
      if (!isYouTubeUrl(link)) {
        setError(t("invalidYoutube"));
        return;
      }
      onSelectLofi({
        id: `youtube-${Date.now()}`,
        name: name.trim() || t("customMusic"),
        link,
        sourceType: "youtube",
      });
    } else {
      if (!audioFile) {
        setError(t("missingAudio"));
        return;
      }
      const link = URL.createObjectURL(audioFile);
      objectUrlsRef.current.push(link);
      onSelectLofi({
        id: `audio-${Date.now()}`,
        name: name.trim() || audioFile.name.replace(/\.[^.]+$/, ""),
        link,
        sourceType: "audio",
      });
    }

    resetForm();
    setCustomOpen(false);
    setOpen(false);
  };

  return (
    <div ref={tabRef} className="relative z-30 flex h-10 items-center justify-end">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? t("closeMusic") : t("openMusic")}
        aria-expanded={open}
        className={`relative z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border bg-surface/50 text-on-surface-variant backdrop-blur-sm outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary/60 ${
          open
            ? "border-primary/30 bg-primary/[0.09] text-primary"
            : "border-white/[0.08] hover:border-primary/25 hover:bg-primary/[0.07] hover:text-primary"
        }`}
      >
        <span className="material-symbols-outlined text-[1.2rem]">music_note_2</span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.aside
            initial={reduceMotion ? false : { opacity: 0, x: 28, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: reduceMotion ? 0 : 28, scale: 0.98 }}
            className="absolute right-0 top-14 flex h-[min(72vh,36rem)] w-[min(92vw,42rem)] flex-col overflow-hidden rounded-[1.35rem] border border-primary/15 bg-[#0b100d]/95 shadow-[0_26px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          >
            <header className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/70">AUDIO / LOOP</p>
                <h2 className="mt-1 font-headline text-sm font-bold uppercase tracking-[0.12em] text-on-surface">
                  {t("music")}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("closeMusic")}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/[0.08] text-on-surface-variant hover:border-primary/25 hover:text-primary"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto p-5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <TrackButton active={selectedLofi === null} name="Default focus" onClick={() => selectTrack(null)} />
                {tracks.map((track) => (
                  <TrackButton
                    key={track.id}
                    active={selectedLofi?.id === track.id}
                    name={track.name}
                    image={track.image}
                    onClick={() => selectTrack(track)}
                  />
                ))}
              </div>

              {selectedLofi ? (
                <div className="mt-4 flex items-center gap-3 rounded-[0.9rem] border border-primary/15 bg-primary/[0.055] px-4 py-3">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_10px_rgba(0,252,64,0.7)]" />
                  <span className="min-w-0 flex-1 truncate font-mono text-[10px] uppercase tracking-[0.12em] text-primary">
                    LOOPING · {selectedLofi.name}
                  </span>
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setCustomOpen(true);
                }}
                className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-primary/25 bg-primary/[0.07] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-primary hover:bg-primary/[0.12]"
              >
                <span className="material-symbols-outlined text-base">add</span>
                {t("customMusic")}
              </button>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {customOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 bottom-0 top-16 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          >
            <motion.form
              initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              onSubmit={createTrack}
              className="w-[min(92vw,34rem)] rounded-[1.3rem] border border-primary/18 bg-[#0b100d] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.7)] sm:p-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/70">CUSTOM / SOURCE</p>
              <h3 className="mt-2 font-headline text-xl font-black uppercase text-white">{t("customMusic")}</h3>

              <div className="mt-5 grid grid-cols-2 gap-2">
                {(["youtube", "audio"] as const).map((source) => (
                  <button
                    key={source}
                    type="button"
                    aria-pressed={sourceType === source}
                    onClick={() => {
                      setSourceType(source);
                      setError(null);
                    }}
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-[0.8rem] border px-3 py-3 font-mono text-[10px] uppercase tracking-[0.12em] ${
                      sourceType === source
                        ? "border-primary/40 bg-primary/[0.1] text-primary"
                        : "border-white/[0.08] text-on-surface-variant hover:border-primary/20"
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">
                      {source === "youtube" ? "smart_display" : "upload_file"}
                    </span>
                    {source === "youtube" ? t("youtubeLink") : t("uploadMusic")}
                  </button>
                ))}
              </div>

              <label className="mt-5 grid gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-on-surface-variant">{t("trackName")}</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Night coding radio"
                  className="h-11 rounded-[0.8rem] border border-white/[0.08] bg-black/25 px-3 text-sm text-white outline-none focus:border-primary/35 focus:ring-2 focus:ring-primary/20"
                />
              </label>

              {sourceType === "youtube" ? (
                <label className="mt-4 grid gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-on-surface-variant">{t("youtubeLink")}</span>
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(event) => setYoutubeUrl(event.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="h-11 rounded-[0.8rem] border border-white/[0.08] bg-black/25 px-3 text-sm text-white outline-none focus:border-primary/35 focus:ring-2 focus:ring-primary/20"
                  />
                </label>
              ) : (
                <label className="mt-4 grid gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-on-surface-variant">{t("audioFile")}</span>
                  <span className="flex h-12 cursor-pointer items-center justify-between rounded-[0.8rem] border border-dashed border-white/[0.12] bg-black/25 px-3 text-sm text-on-surface-variant hover:border-primary/30 hover:text-primary">
                    <span className="truncate">{audioFile?.name ?? t("chooseAudio")}</span>
                    <span className="material-symbols-outlined text-base">library_music</span>
                    <input
                      type="file"
                      accept="audio/*"
                      className="sr-only"
                      onChange={(event) => {
                        setAudioFile(event.target.files?.[0] ?? null);
                        setError(null);
                      }}
                    />
                  </span>
                </label>
              )}

              {error ? <p className="mt-3 text-xs text-error">{error}</p> : null}
              <p className="mt-4 flex items-center gap-2 text-xs text-primary/70">
                <span className="material-symbols-outlined text-base">repeat</span>
                {sourceType === "youtube" ? t("youtubeLoop") : t("audioLoop")}
              </p>

              <div className="mt-6 flex justify-end gap-2 border-t border-white/[0.07] pt-5">
                <button
                  type="button"
                  onClick={() => setCustomOpen(false)}
                  className="cursor-pointer rounded-full border border-white/[0.09] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.13em] text-on-surface-variant hover:text-white"
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded-full bg-primary px-5 py-3 font-mono text-[10px] font-black uppercase tracking-[0.13em] text-on-primary hover:bg-primary-fixed"
                >
                  {t("createAndPlay")}
                </button>
              </div>
            </motion.form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function TrackButton({
  active,
  name,
  image,
  onClick,
}: {
  active: boolean;
  name: string;
  image?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`group min-h-28 cursor-pointer overflow-hidden rounded-[1rem] border bg-white/[0.03] text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/60 ${
        active ? "border-primary/45 bg-primary/[0.08]" : "border-white/[0.07] hover:border-primary/25"
      }`}
    >
      <span className="flex h-16 items-center justify-center overflow-hidden border-b border-white/[0.06] bg-black/25">
        {image ? (
          <img src={image} alt="" className="h-full w-full object-cover opacity-80 transition-transform group-hover:scale-105" />
        ) : (
          <span className="material-symbols-outlined text-xl text-primary/70">timer</span>
        )}
      </span>
      <span className="block truncate px-3 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-on-surface">
        {name}
      </span>
    </button>
  );
}
