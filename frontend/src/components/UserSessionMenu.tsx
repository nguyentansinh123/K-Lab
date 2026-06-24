import { useEffect, useRef, useState } from "react";
import type { UserType } from "../fetchLib/authapi";
import { Link } from "react-router-dom";

type UserSessionMenuProps = {
  user: UserType | null;
};

const sessionActions = [
  ["person", "PROFILE_SETTINGS", "/person"],
  ["tune", "SYSTEM_CALIBRATION", "/tune"],
  ["security", "ENCRYPTION_KEYS", "/security"],
  ["history", "HISTORY_LOGS", "/history"],
  ["schedule", "SESSIONS", "/session"],
];

export default function UserSessionMenu({ user }: UserSessionMenuProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const userInitials =
    `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}` || "KL";
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="hidden items-center md:flex">
      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setProfileOpen((open) => !open)}
          className={`group flex h-10 cursor-pointer items-center gap-2 rounded-[999px] border py-1 pl-3 pr-1 outline-none transition-[padding,background-color,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:pl-4 focus-visible:ring-2 focus-visible:ring-primary-fixed/70 motion-reduce:transition-none ${
            profileOpen
              ? "border-primary-fixed/20 bg-primary-fixed/10 pl-4"
              : "border-white/[0.07] bg-white/[0.04] hover:border-primary-fixed/15 hover:bg-primary-fixed/[0.07]"
          }`}
          aria-expanded={profileOpen}
          aria-haspopup="menu"
        >
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-[999px] bg-primary-fixed shadow-[0_0_8px_rgba(0,252,64,0.55)]"
            aria-hidden="true"
          />

          <div className="min-w-0 text-left leading-none">
            <div className="font-headline text-[9px] font-black uppercase tracking-[0.14em] text-primary-fixed">
              Operational
            </div>
            <div className="mt-1 font-headline text-[8px] uppercase tracking-[0.08em] text-on-surface-variant">
              OP_ID: {user?.id?.slice(0, 6) ?? "active"}
            </div>
          </div>

          {user?.imgUrl ? (
            <img
              src={user.imgUrl}
              alt="User avatar"
              className="h-8 w-8 rounded-[999px] border border-white/10 object-cover transition-transform duration-300 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-[999px] border border-primary-fixed/20 bg-surface-container-lowest font-headline text-[10px] font-black text-primary-fixed transition-transform duration-300 group-hover:scale-[1.04]">
              {userInitials}
            </div>
          )}

          <span
            className={`mr-1 text-xs text-on-surface-variant transition-transform duration-200 ${
              profileOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          >
            ↓
          </span>
        </button>

        {profileOpen ? (
          <div
            role="menu"
            className="absolute right-0 top-full z-60 mt-3 w-72 overflow-hidden rounded-[1.25rem] border border-primary-fixed/15 bg-surface-container-low/95 p-2 shadow-[0_22px_70px_rgba(0,0,0,0.65)] backdrop-blur-xl"
          >
            <div className="mb-2 rounded-[0.9rem] bg-white/[0.035] px-4 py-3">
              <p className="font-headline text-[9px] uppercase tracking-[0.16em] text-on-surface-variant">
                Current_Session
              </p>
              <p className="mt-1 flex items-center justify-between font-headline text-sm font-bold text-on-surface">
                <span>04:12:44</span>
                <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.14em] text-primary-fixed">
                  <span className="h-1.5 w-1.5 rounded-[999px] bg-primary-fixed" />
                  Active
                </span>
              </p>
            </div>

            {sessionActions.map(([icon, label, link]) => (
              <Link
                to={link}
                key={label}
                type="button"
                onClick={() => setProfileOpen(false)}
                className="group/menu flex w-full cursor-pointer items-center gap-3 rounded-[0.85rem] px-3 py-2.5 text-left text-on-surface-variant outline-none transition-[padding,background-color,color] duration-200 hover:bg-white/[0.055] hover:pl-4 hover:text-on-surface focus-visible:ring-2 focus-visible:ring-primary-fixed/70"
              >
                <span className="material-symbols-outlined text-base text-outline transition-colors group-hover/menu:text-primary-fixed">
                  {icon}
                </span>
                <span className="font-headline text-[10px] font-bold uppercase tracking-[0.13em]">
                  {label}
                </span>
                <span className="ml-auto text-outline opacity-0 transition-opacity group-hover/menu:opacity-100" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}

            <button
              type="button"
              className="mt-2 flex w-full cursor-pointer items-center gap-3 rounded-[0.85rem] border-t border-error/10 px-3 py-3 text-left text-error outline-none transition-colors hover:bg-error/10 focus-visible:ring-2 focus-visible:ring-error/60"
            >
              <span className="material-symbols-outlined text-base">
                power_settings_new
              </span>
              <span className="font-headline text-[10px] font-bold uppercase tracking-[0.13em]">
                TERMINATE_SESSION
              </span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
