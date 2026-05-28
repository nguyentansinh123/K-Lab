import { useEffect, useRef, useState } from "react";
import type { UserType } from "../fetchLib/authapi";

type UserSessionMenuProps = {
  user: UserType | null;
};

const sessionActions = [
  ["person", "PROFILE_SETTINGS"],
  ["tune", "SYSTEM_CALIBRATION"],
  ["security", "ENCRYPTION_KEYS"],
  ["history", "HISTORY_LOGS"],
  ["schedule", "SESSIONS"],
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
    <div className="hidden md:flex items-center gap-4">
      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setProfileOpen((open) => !open)}
          className="cursor-pointer flex items-center gap-3 bg-surface-container-high px-3 py-1.5 transition-all duration-150 hover:bg-surface-container-highest"
          aria-expanded={profileOpen}
          aria-haspopup="menu"
        >
          <div className="text-right">
            <div className="font-headline text-[10px] font-black uppercase tracking-widest text-primary">
              Operational
            </div>
            <div className="font-headline text-[9px] uppercase tracking-tight text-on-surface-variant">
              OP_ID: {user?.id?.slice(0, 6) ?? "active"}
            </div>
          </div>

          {user?.imgUrl ? (
            <img
              src={user.imgUrl}
              alt="User avatar"
              className="h-10 w-10 border border-primary-fixed/25 object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center border border-primary-fixed/25 bg-surface-container-lowest font-headline text-xs font-black text-primary-fixed">
              {userInitials}
            </div>
          )}
        </button>

        {profileOpen ? (
          <div
            role="menu"
            className="absolute right-0 top-full z-60 mt-3 w-72 border border-primary-fixed/10 bg-surface-container-high/95 py-2 shadow-2xl backdrop-blur-xl"
          >
            <div className="mb-2 border-b border-outline-variant/10 px-4 py-3">
              <p className="font-headline text-[10px] uppercase tracking-widest text-on-surface-variant">
                Current_Session
              </p>
              <p className="font-headline font-bold text-primary">
                04:12:44 ACTIVE
              </p>
            </div>

            {sessionActions.map(([icon, label]) => (
              <button
                key={label}
                type="button"
                className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-primary-container hover:text-on-primary"
              >
                <span className="material-symbols-outlined text-sm">
                  {icon}
                </span>
                <span className="font-headline text-xs font-bold uppercase tracking-widest">
                  {label}
                </span>
              </button>
            ))}

            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-3 border-t border-outline-variant/10 px-4 py-4 text-left text-error transition-colors hover:bg-error-container hover:text-on-error-container"
            >
              <span className="material-symbols-outlined text-sm">
                power_settings_new
              </span>
              <span className="font-headline text-xs font-bold uppercase tracking-widest">
                TERMINATE_SESSION
              </span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}