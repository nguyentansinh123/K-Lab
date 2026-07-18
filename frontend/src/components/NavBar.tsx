import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/dispatch";
import UserSessionMenu from "./UserSessionMenu";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/dispatch";
import { logout } from "../features/auth/AuthSlice";
import { useLanguage } from "../i18n/LanguageContext";

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { accessToken, status, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const navLinks = [
    { label: t("dashboard"), to: "/dashboard" },
    { label: t("howItWorks"), to: "/#how-it-works" },
    { label: t("docs"), to: "/#docs" },
    { label: t("github"), to: "/#github" },
  ];

  const isAuthenticated = Boolean(accessToken) && status === "authenticated";
  const isActive = (to: string) => {
    const [pathname, hash] = to.split("#");
    return (
      location.pathname === pathname &&
      (!hash || location.hash === `#${hash}`)
    );
  };

  useEffect(() => {
    const scrollContainer = document.querySelector("main");
    const handleScroll = () => {
      const pageScroll = scrollContainer?.scrollTop ?? 0;
      setScrolled(window.scrollY > 40 || pageScroll > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    scrollContainer?.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-6 sm:pt-4">
        <nav
          aria-label="Primary navigation"
          className={`pointer-events-auto w-full border border-white/[0.08] bg-black/80 shadow-[0_16px_50px_rgba(0,0,0,0.45),0_0_32px_rgba(0,252,64,0.06)] backdrop-blur-xl transition-[max-width,background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none rounded-[999px] ${
            scrolled
              ? "max-w-[1280px] border-primary-fixed/15 bg-surface-container-lowest/85"
              : "max-w-[880px]"
          }`}
        >
          <div className="flex h-14 items-center gap-2 px-2 sm:px-3">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              aria-label="Kinetic Lab home"
              className="group flex shrink-0 items-center gap-3 rounded-[999px] px-2 py-1.5 outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed/70"
            >
              <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-[999px] border border-primary-fixed/35 bg-primary-fixed/10 font-headline text-xs font-black text-primary-fixed transition-colors group-hover:bg-primary-fixed group-hover:text-on-primary-fixed">
                K
                <span className="absolute right-0 top-0 h-1.5 w-1.5 rounded-[999px] bg-primary-fixed shadow-[0_0_8px_rgba(0,252,64,0.9)]" />
              </span>
              <span className="hidden whitespace-nowrap font-headline text-xs font-black uppercase tracking-[0.2em] text-on-surface sm:block">
                Kinetic <span className="text-primary-fixed">Lab</span>
              </span>
            </Link>

            <span className="hidden h-5 w-px bg-outline-variant/35 md:block" />

            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => {
                const active = isActive(link.to);

                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-[999px] px-3 py-2 font-body text-[11px] font-semibold uppercase tracking-[0.12em] outline-none transition-[padding,background-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:px-4 focus-visible:ring-2 focus-visible:ring-primary-fixed/70 motion-reduce:transition-none ${
                      active
                        ? "bg-primary-fixed/12 px-4 text-primary-fixed"
                        : "text-on-surface-variant hover:bg-white/[0.05] hover:text-on-surface"
                    }`}
                  >
                    <span className="relative">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="ml-auto flex items-center gap-2">
              {isAuthenticated ? (
                <UserSessionMenu user={user} />
              ) : (
                <Link
                  to="/register"
                  className="group hidden items-center gap-2 rounded-[999px] bg-primary-container py-2 pl-4 pr-2 font-headline text-[10px] font-black uppercase tracking-[0.16em] text-on-primary-container outline-none transition-all hover:bg-primary-fixed hover:shadow-[0_0_20px_rgba(0,252,64,0.22)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary-fixed focus-visible:ring-offset-2 focus-visible:ring-offset-black md:flex"
                >
                  {t("getStarted")}
                  <span className="flex h-6 w-6 items-center justify-center rounded-[999px] bg-black/10 text-sm transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
                    →
                  </span>
                </Link>
              )}

              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[999px] border border-white/10 text-primary-fixed outline-none transition-colors hover:border-primary-fixed/35 hover:bg-primary-fixed/10 focus-visible:ring-2 focus-visible:ring-primary-fixed/70 md:hidden"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
              >
                <span className="relative block h-4 w-5" aria-hidden="true">
                  <span
                    className={`absolute left-0 top-0.5 block h-px w-5 bg-current transition-all duration-200 ${
                      mobileOpen ? "translate-y-1.5 rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-2 block h-px w-5 bg-current transition-all duration-200 ${
                      mobileOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`absolute bottom-0.5 left-0 block h-px w-5 bg-current transition-all duration-200 ${
                      mobileOpen ? "-translate-y-1.5 -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </nav>
      </div>

      <div
        id="mobile-navigation"
        className={`fixed inset-x-3 top-[5.25rem] z-40 overflow-hidden rounded-[1.25rem] border bg-surface-container-low/95 shadow-[0_22px_70px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all duration-300 ease-out motion-reduce:transition-none md:hidden sm:inset-x-6 ${
          mobileOpen
            ? "visible translate-y-0 border-primary-fixed/15 opacity-100"
            : "invisible -translate-y-2 border-transparent opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 p-3">
          {navLinks.map((link) => {
            const active = isActive(link.to);

            return (
              <Link
                key={link.label}
                to={link.to}
                aria-current={active ? "page" : undefined}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between rounded-[999px] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary-fixed/70 ${
                  active
                    ? "bg-primary-fixed/12 text-primary-fixed"
                    : "text-on-surface-variant hover:bg-white/[0.05] hover:text-on-surface"
                }`}
              >
                {link.label}
                <span className={active ? "text-primary-fixed" : "text-outline"} aria-hidden="true">
                  {active ? "●" : "↗"}
                </span>
              </Link>
            );
          })}

          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-outline-variant/20 pt-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/person"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-[999px] border border-outline-variant/40 px-4 py-3 text-center text-[10px] font-black uppercase tracking-[0.16em] text-on-surface outline-none transition-colors hover:border-primary-fixed/40 hover:bg-primary-fixed/5 focus-visible:ring-2 focus-visible:ring-primary-fixed/70"
                >
                  {t("profile")}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    dispatch(logout());
                    navigate("/login", { replace: true });
                  }}
                  className="cursor-pointer rounded-[999px] border border-error/30 px-4 py-3 text-center text-[10px] font-black uppercase tracking-[0.16em] text-error outline-none transition-colors hover:bg-error/10 focus-visible:ring-2 focus-visible:ring-error/60"
                >
                  {t("logout")}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-[999px] border border-outline-variant/40 px-4 py-3 text-center text-[10px] font-black uppercase tracking-[0.16em] text-on-surface outline-none transition-colors hover:border-primary-fixed/40 hover:bg-primary-fixed/5 focus-visible:ring-2 focus-visible:ring-primary-fixed/70"
                >
                  {t("login")}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-[999px] bg-primary-container px-4 py-3 text-center text-[10px] font-black uppercase tracking-[0.16em] text-on-primary-container outline-none transition-all hover:bg-primary-fixed active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary-fixed/70"
                >
                  {t("getStarted")}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
