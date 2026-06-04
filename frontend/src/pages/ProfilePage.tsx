import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/dispatch";

const focusBars = [18, 42, 64, 52, 78, 92, 68, 56, 72, 48, 30, 62];
const weeklyLoad = [
  { day: "MON", value: "06:10", active: true },
  { day: "TUE", value: "04:35", active: false },
  { day: "WED", value: "07:20", active: true },
  { day: "THU", value: "05:50", active: true },
];
const badges = ["bolt", "memory", "workspace_premium", "verified"];

function Panel({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`relative border border-outline-variant/20 bg-black/55 p-5 shadow-[0_0_40px_rgba(0,252,64,0.05)] backdrop-blur-xl before:absolute before:left-0 before:top-0 before:h-3 before:w-3 before:border-l before:border-t before:border-primary/50 after:absolute after:right-0 after:bottom-0 after:h-3 after:w-3 after:border-b after:border-r after:border-primary/40 ${className}`}
    >
      {children}
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-label text-[10px] font-bold uppercase tracking-[0.22em] text-outline">
      {children}
    </p>
  );
}

export default function ProfilePage() {
  const user = useAppSelector((state) => state.auth.user);
  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    "Kinetic Operator";
  const initials =
    `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}` || "KL";
  const operatorId = user?.id?.slice(0, 8).toUpperCase() ?? "ACTIVE";

  return (
    <div className="min-h-screen overflow-hidden bg-surface pt-16 text-on-surface">
      <main className="dashboard-grid-bg min-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-6 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 xl:grid-cols-[330px_1fr]">
          <aside className="space-y-5">
            <Panel className="flex flex-col items-center text-center">
              <div className="relative mb-5 h-36 w-36 overflow-hidden border border-primary/30 bg-surface-container-lowest">
                {user?.imgUrl ? (
                  <img
                    src={user.imgUrl}
                    alt={fullName}
                    className="h-full w-full object-cover grayscale-[45%] contrast-125"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(0,252,64,0.18),transparent_62%)] font-headline text-4xl font-black text-primary">
                    {initials}
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 border-t border-primary/20 bg-black/65 py-1 font-label text-[9px] uppercase tracking-[0.2em] text-primary">
                  verified node
                </div>
              </div>

              <Label>Operator Profile</Label>
              <h1 className="mt-2 max-w-full break-words font-headline text-2xl font-black uppercase tracking-widest text-white">
                {fullName}
              </h1>
              <p className="mt-2 font-label text-xs uppercase tracking-[0.25em] text-primary">
                OP_ID: {operatorId}
              </p>

              <div className="mt-6 grid w-full grid-cols-2 gap-3 text-left">
                <div className="border border-outline-variant/15 bg-surface-container-low/60 p-3">
                  <Label>Role</Label>
                  <p className="mt-2 font-headline text-sm font-bold uppercase tracking-widest text-primary">
                    {user?.role ?? "USER"}
                  </p>
                </div>
                <div className="border border-outline-variant/15 bg-surface-container-low/60 p-3">
                  <Label>Status</Label>
                  <p className="mt-2 font-headline text-sm font-bold uppercase tracking-widest text-secondary">
                    Online
                  </p>
                </div>
              </div>
            </Panel>

            <Panel>
              <Label>Identity Matrix</Label>
              <div className="mt-5 space-y-4">
                <div className="border-b border-outline-variant/15 pb-3">
                  <p className="font-label text-[10px] uppercase tracking-widest text-outline">
                    Email
                  </p>
                  <p className="mt-1 break-all font-headline text-sm text-white">
                    {user?.email ?? "operator@kinetic.local"}
                  </p>
                </div>
                <div className="border-b border-outline-variant/15 pb-3">
                  <p className="font-label text-[10px] uppercase tracking-widest text-outline">
                    Verification
                  </p>
                  <p className="mt-1 font-headline text-sm font-bold uppercase tracking-widest text-primary">
                    {user?.emailVerified ? "Confirmed" : "Pending"}
                  </p>
                </div>
                <div>
                  <p className="font-label text-[10px] uppercase tracking-widest text-outline">
                    Local Rank
                  </p>
                  <p className="mt-1 font-headline text-sm font-bold uppercase tracking-widest text-tertiary">
                    Cohort 04 / Focus 91
                  </p>
                </div>
              </div>
            </Panel>
          </aside>

          <section className="space-y-5">
            <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
              <Panel>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <Label>Neural Output</Label>
                    <p className="mt-2 font-headline text-5xl font-black tracking-tight text-white">
                      87.4<span className="text-xl text-primary">%</span>
                    </p>
                  </div>
                  <div className="border border-primary/20 bg-primary/5 px-3 py-2 text-right">
                    <Label>Current Streak</Label>
                    <p className="mt-1 font-headline text-lg font-black text-primary">
                      14 DAYS
                    </p>
                  </div>
                </div>

                <div className="mt-8 h-44 border-b border-l border-outline-variant/20">
                  <svg
                    className="h-full w-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 100"
                    aria-hidden="true"
                  >
                    <polyline
                      points="0,78 9,70 18,74 27,52 36,57 45,36 54,43 63,28 72,35 81,20 90,24 100,14"
                      fill="none"
                      stroke="#00fc40"
                      strokeWidth="1.5"
                    />
                    <polyline
                      points="0,90 9,82 18,85 27,73 36,76 45,64 54,62 63,48 72,56 81,42 90,46 100,32"
                      fill="none"
                      stroke="#abfc00"
                      strokeOpacity="0.45"
                      strokeWidth="1"
                    />
                  </svg>
                </div>

                <div className="mt-3 flex justify-between font-label text-[10px] uppercase tracking-widest text-outline">
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>24:00</span>
                </div>
              </Panel>

              <Panel>
                <Label>Badge Protocol</Label>
                <div className="mt-6 grid grid-cols-4 gap-3">
                  {badges.map((badge, index) => (
                    <div
                      key={badge}
                      className={`flex aspect-square items-center justify-center border bg-surface-container-low/70 ${
                        index === 2
                          ? "border-primary text-primary shadow-[0_0_24px_rgba(0,252,64,0.14)]"
                          : "border-outline-variant/20 text-outline"
                      }`}
                    >
                      <span className="material-symbols-outlined">{badge}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 grid grid-cols-[92px_1fr] gap-5">
                  <div className="relative h-24 w-24">
                    <svg className="-rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="#262626"
                        strokeWidth="7"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="#00fc40"
                        strokeDasharray="196 264"
                        strokeLinecap="square"
                        strokeWidth="7"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-headline text-xl font-black text-white">
                      74
                    </div>
                  </div>
                  <div className="self-center">
                    <p className="font-headline text-sm font-bold uppercase tracking-widest text-white">
                      Deep Work Badge
                    </p>
                    <p className="mt-2 font-body text-xs leading-5 text-on-surface-variant">
                      26 sessions logged toward the next protocol tier.
                    </p>
                  </div>
                </div>
              </Panel>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              <Panel className="lg:col-span-2">
                <div className="flex items-center justify-between gap-4">
                  <Label>Weekly Load</Label>
                  <span className="font-label text-[10px] uppercase tracking-[0.22em] text-primary">
                    synchronized
                  </span>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-4">
                  {weeklyLoad.map((entry) => (
                    <div
                      key={entry.day}
                      className="border border-outline-variant/15 bg-surface-container-low/55 p-4"
                    >
                      <p className="font-label text-[10px] uppercase tracking-widest text-outline">
                        {entry.day}
                      </p>
                      <p className="mt-3 font-headline text-2xl font-black text-white">
                        {entry.value}
                      </p>
                      <div className="mt-4 h-1 bg-outline-variant/20">
                        <div
                          className={`h-full ${
                            entry.active ? "bg-primary" : "bg-tertiary"
                          }`}
                          style={{
                            width: entry.active ? "82%" : "54%",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel>
                <Label>Focus Histogram</Label>
                <div className="mt-7 flex h-32 items-end gap-2">
                  {focusBars.map((height, index) => (
                    <div
                      key={`${height}-${index}`}
                      className="flex-1 border border-primary/50 bg-primary/5"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <p className="mt-4 font-label text-[10px] uppercase tracking-[0.22em] text-outline">
                  Peak block: 92 minutes
                </p>
              </Panel>
            </div>

            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <Panel>
                <Label>Security</Label>
                <div className="mt-5 space-y-3">
                  {[
                    ["ACCESS_KEY", "Update password", "vpn_key"],
                    ["AUTH_FACTOR_2", "Configure 2FA", "shield_lock"],
                    ["CONNECTED_NODES", "3 active sessions", "hub"],
                  ].map(([label, value, icon]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4 border-b border-outline-variant/15 pb-3 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-base text-primary">
                          {icon}
                        </span>
                        <span className="font-label text-[10px] uppercase tracking-widest text-outline">
                          {label}
                        </span>
                      </div>
                      <button className="font-headline text-xs font-bold uppercase tracking-widest text-white transition-colors hover:text-primary">
                        {value}
                      </button>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel>
                <Label>Profile Commit</Label>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <input
                    readOnly
                    value={fullName}
                    className="border border-outline-variant/20 bg-surface-container-low/60 px-4 py-3 font-headline text-sm uppercase tracking-widest text-white outline-none"
                  />
                  <input
                    readOnly
                    value={user?.email ?? "operator@kinetic.local"}
                    className="border border-outline-variant/20 bg-surface-container-low/60 px-4 py-3 font-headline text-sm text-white outline-none"
                  />
                </div>
                <div className="mt-5 flex flex-wrap justify-end gap-3">
                  <Link
                    to="/dashboard"
                    className="border border-outline-variant/25 px-5 py-3 font-headline text-xs font-black uppercase tracking-widest text-on-surface-variant transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    Discard
                  </Link>
                  <button className="bg-primary px-5 py-3 font-headline text-xs font-black uppercase tracking-widest text-on-primary-container transition-all hover:brightness-110">
                    Commit Profile
                  </button>
                </div>
              </Panel>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
