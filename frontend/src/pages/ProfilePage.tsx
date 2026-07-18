import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout, uploadAvatar } from "../features/auth/AuthSlice";
import {
  getStoredStudyMode,
  storeStudyMode,
  type StudyMode,
} from "../features/focus/focusTracking";
import { useAppDispatch, useAppSelector } from "../hooks/dispatch";
import { useLanguage, type Language } from "../i18n/LanguageContext";

const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_AVATAR_BYTES = 5 * 1024 * 1024;

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const { language, setLanguage, t } = useLanguage();
  const [studyMode, setStudyMode] = useState<StudyMode>(getStoredStudyMode);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const initials =
    `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase() || "KL";
  const displayName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

  const selectMode = (mode: StudyMode) => {
    setStudyMode(mode);
    storeStudyMode(mode);
  };

  const handleAvatar = async (file?: File) => {
    if (!file) return;
    if (!IMAGE_TYPES.has(file.type)) {
      toast.error("Please choose a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > MAX_AVATAR_BYTES) {
      toast.error("Profile images must be 5 MB or smaller.");
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return localPreview;
    });
    setIsUploading(true);

    try {
      await dispatch(uploadAvatar(file)).unwrap();
      toast.success(language === "vi" ? "Đã cập nhật ảnh đại diện." : "Profile photo updated.");
      setPreviewUrl(null);
    } catch (error) {
      setPreviewUrl(null);
      toast.error(error instanceof Error ? error.message : "Avatar upload failed.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070a08] px-4 pb-16 pt-28 text-on-surface sm:px-7 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,252,64,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(0,252,64,0.018)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="pointer-events-none absolute -right-40 top-10 h-[32rem] w-[32rem] rounded-full bg-primary/[0.05] blur-[120px]" />

      <div className="relative mx-auto max-w-5xl">
        <header className="mb-8 border-b border-white/[0.07] pb-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary/70">
            SYS / PROFILE
          </p>
          <h1 className="mt-3 font-headline text-4xl font-black uppercase tracking-[-0.035em] text-white sm:text-6xl">
            {t("profileTitle")}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-on-surface-variant">
            {t("profileSubtitle")}
          </p>
        </header>

        <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <section className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.025] p-5 sm:p-7">
            <SectionLabel icon="fingerprint" label={t("identity")} />

            <div className="mt-7 flex flex-col items-center text-center">
              <div className="relative h-32 w-32 overflow-hidden rounded-full border border-primary/25 bg-black shadow-[0_0_36px_rgba(0,252,64,0.11)]">
                {previewUrl || user?.imgUrl ? (
                  <img
                    src={previewUrl ?? user?.imgUrl ?? ""}
                    alt={displayName || "Profile"}
                    crossOrigin={previewUrl ? undefined : "anonymous"}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(0,252,64,0.18),transparent_68%)] font-headline text-4xl font-black text-primary">
                    {initials}
                  </div>
                )}
                {isUploading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <span className="h-7 w-7 animate-spin rounded-full border-2 border-primary/25 border-t-primary" />
                  </div>
                ) : null}
              </div>

              <h2 className="mt-5 font-headline text-2xl font-black uppercase tracking-[0.08em] text-white">
                {displayName || "Operator"}
              </h2>
              <p className="mt-1 break-all font-mono text-xs text-on-surface-variant">
                {user?.email}
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={(event) => void handleAvatar(event.target.files?.[0])}
              />
              <button
                type="button"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.08] px-5 py-3 font-headline text-[10px] font-black uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary/[0.14] disabled:cursor-wait disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-base">add_a_photo</span>
                {isUploading ? t("uploading") : t("changePhoto")}
              </button>
              <p className="mt-3 text-[10px] text-outline">{t("photoHint")}</p>
            </div>
          </section>

          <div className="grid gap-5">
            <section className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.025] p-5 sm:p-7">
              <SectionLabel icon="translate" label={t("language")} />
              <p className="mt-3 text-sm leading-6 text-on-surface-variant">{t("languageHint")}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {([
                  ["en", "EN", t("english")],
                  ["vi", "VI", t("vietnamese")],
                ] as Array<[Language, string, string]>).map(([code, short, label]) => (
                  <button
                    key={code}
                    type="button"
                    aria-pressed={language === code}
                    onClick={() => setLanguage(code)}
                    className={`cursor-pointer rounded-[1rem] border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                      language === code
                        ? "border-primary/40 bg-primary/[0.1] text-primary"
                        : "border-white/[0.07] bg-black/20 text-on-surface-variant hover:border-primary/20 hover:text-white"
                    }`}
                  >
                    <span className="font-mono text-[10px] tracking-[0.18em]">{short}</span>
                    <span className="mt-2 block font-headline text-sm font-black uppercase tracking-[0.1em]">
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.025] p-5 sm:p-7">
              <SectionLabel icon="face" label={t("focusTracking")} />
              <p className="mt-3 text-sm leading-6 text-on-surface-variant">{t("focusHint")}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <ModeButton
                  active={studyMode === "screen"}
                  icon="desktop_windows"
                  title={t("screenMode")}
                  description={t("screenModeHint")}
                  onClick={() => selectMode("screen")}
                />
                <ModeButton
                  active={studyMode === "paper"}
                  icon="menu_book"
                  title={t("paperMode")}
                  description={t("paperModeHint")}
                  onClick={() => selectMode("paper")}
                />
              </div>
              <div className="mt-4 flex items-start gap-2 rounded-[0.9rem] border border-primary/15 bg-primary/[0.045] p-3 text-xs leading-5 text-primary/75">
                <span className="material-symbols-outlined mt-0.5 text-base">encrypted</span>
                <p>{t("privacy")}</p>
              </div>
            </section>

            <section className="flex flex-col gap-4 rounded-[1.5rem] border border-error/15 bg-error/[0.025] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div>
                <SectionLabel icon="manage_accounts" label={t("account")} />
                <p className="mt-3 text-xs text-on-surface-variant">
                  {t("loggedInAs")} <span className="text-white">{user?.email}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-error/30 px-5 py-3 font-headline text-[10px] font-black uppercase tracking-[0.16em] text-error transition-colors hover:bg-error/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error/60"
              >
                <span className="material-symbols-outlined text-base">logout</span>
                {t("logout")}
              </button>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

function SectionLabel({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/75">
      <span className="material-symbols-outlined text-base">{icon}</span>
      {label}
    </div>
  );
}

function ModeButton({
  active,
  icon,
  title,
  description,
  onClick,
}: {
  active: boolean;
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`cursor-pointer rounded-[1rem] border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
        active
          ? "border-primary/40 bg-primary/[0.1]"
          : "border-white/[0.07] bg-black/20 hover:border-primary/20"
      }`}
    >
      <span className={`material-symbols-outlined text-xl ${active ? "text-primary" : "text-outline"}`}>
        {icon}
      </span>
      <span className="mt-3 block font-headline text-xs font-black uppercase tracking-[0.1em] text-white">
        {title}
      </span>
      <span className="mt-2 block text-xs leading-5 text-on-surface-variant">{description}</span>
    </button>
  );
}
