import { useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAppSelector } from "../hooks/dispatch";

type LanguageCode = "en" | "vi";

const languageOptions: Array<{ code: LanguageCode; label: string; short: string }> = [
  { code: "en", label: "English", short: "EN" },
  { code: "vi", label: "Tiếng Việt", short: "VI" },
];

const copy = {
  eyebrow: "Profile node",
  title: "Operator Profile",
  subtitle: "Learning identity, progress signal, and account controls in one command surface.",
  edit: "Edit profile",
  sync: "Sync data",
  role: "Role",
  status: "Status",
  online: "Online",
  experience: "Experience",
  language: "Language",
  languageNote: "Interface preference",
  analytics: "Learning time analytics",
  technical: "Technical",
  softSkills: "Soft skills",
  radarLegend: "Competency legend",
  learningHistory: "Learning history",
  achievements: "Achievements",
  metrics: "Metrics export",
  export: "Export report",
  identity: "Identity matrix",
  email: "Email",
  verification: "Verification",
  confirmed: "Confirmed",
  pending: "Pending",
  localRank: "Local rank",
  commit: "Profile commit",
  discard: "Discard",
  save: "Commit profile",
};

const historyRows = [
  ["UX Fundamentals", "-", "16.5H"],
  ["User Research Basics", "YES", "12H"],
  ["Wireframing Essentials", "-", "3.5H"],
  ["Prototyping Skills", "YES", "8H"],
  ["Usability Testing", "YES", "24.5H"],
];

const metrics = [
  ["timer", "Total learning hours", "254"],
  ["workspace_premium", "Certificates completed", "8"],
  ["construction", "Hands-on practice hours", "14"],
  ["menu_book", "Courses completed", "12"],
];

const achievements: Array<{
  icon: string;
  title: string;
  count: string;
  width: string;
  color: string;
  description: string;
}> = [
  {
    icon: "workspace_premium",
    title: "Learning Master",
    count: "4/5",
    width: "80%",
    color: "text-tertiary",
    description: "Complete one more long-form module to unlock the next tier.",
  },
  {
    icon: "science",
    title: "Skill Builder",
    count: "1/5",
    width: "20%",
    color: "text-secondary",
    description: "Log focused practice blocks across five separate skill domains.",
  },
  {
    icon: "verified_user",
    title: "Leadership",
    count: "2/2",
    width: "100%",
    color: "text-primary",
    description: "Mentorship and review milestones are fully certified.",
  },
  {
    icon: "forum",
    title: "Communicator",
    count: "5/10",
    width: "50%",
    color: "text-error",
    description: "Five more reflection notes will complete this protocol.",
  },
];

const performancePoints = [
  { label: "MON", hours: 5.1, target: 4.2 },
  { label: "TUE", hours: 4.4, target: 4.5 },
  { label: "WED", hours: 6.8, target: 4.8 },
  { label: "THU", hours: 5.9, target: 4.7 },
  { label: "FRI", hours: 7.4, target: 5.1 },
  { label: "SAT", hours: 6.3, target: 5.8 },
  { label: "SUN", hours: 8.2, target: 6.4 },
  { label: "TODAY", hours: 7.6, target: 6.7 },
];

function Panel({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <section
      className={`relative overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-black/45 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-sm ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-fixed/45 to-transparent" />
      {children}
    </section>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <p className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-outline">
      {children}
    </p>
  );
}

function LanguageSelector({
  language,
  onChange,
}: {
  language: LanguageCode;
  onChange: (language: LanguageCode) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = languageOptions.find((option) => option.code === language) ?? languageOptions[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 rounded-[1rem] border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-left outline-none transition-colors hover:border-primary/25 hover:bg-white/[0.045] focus-visible:ring-2 focus-visible:ring-primary/60"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span>
          <span className="block font-headline text-sm font-black uppercase tracking-[0.16em] text-white">
            {selected.label}
          </span>
          <span className="mt-1 block font-label text-[9px] uppercase tracking-[0.16em] text-outline">
            Preference only
          </span>
        </span>
        <span
          className={`material-symbols-outlined text-base text-primary transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          expand_more
        </span>
      </button>

      {open ? (
        <div
          role="listbox"
          className="absolute right-0 top-full z-20 mt-2 w-full overflow-hidden rounded-[1rem] border border-primary/15 bg-surface-container-low/95 p-1 shadow-[0_18px_55px_rgba(0,0,0,0.55)] backdrop-blur-xl"
        >
          {languageOptions.map((option) => {
            const active = language === option.code;

            return (
              <button
                key={option.code}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(option.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-[0.8rem] px-3 py-2.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/60 ${
                  active
                    ? "bg-primary/[0.1] text-primary"
                    : "text-on-surface-variant hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <span className="font-headline text-xs font-bold uppercase tracking-[0.14em]">
                  {option.label}
                </span>
                <span className="font-label text-[9px] font-black uppercase tracking-[0.16em]">
                  {option.short}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: (typeof performancePoints)[number] }>;
}

function ProfileChartTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  const point = payload[0].payload;

  return (
    <div className="rounded-[0.9rem] border border-white/10 bg-surface-container-high px-3 py-2 shadow-xl">
      <p className="font-label text-[9px] font-bold uppercase tracking-[0.16em] text-outline">
        {point.label}
      </p>
      <p className="mt-1 font-headline text-sm font-black text-white">
        {point.hours.toFixed(1)}h
        <span className="ml-2 text-[10px] text-on-surface-variant">
          target {point.target.toFixed(1)}h
        </span>
      </p>
    </div>
  );
}

function PerformanceLineChart() {
  return (
    <div className="mt-7 rounded-[1.25rem] border border-white/[0.06] bg-surface-container-lowest/70 p-5">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <Label>Focus curve</Label>
          <p className="mt-1 font-headline text-3xl font-black tracking-tight text-white">
            87.4<span className="text-base text-primary">%</span>
          </p>
        </div>
        <div className="rounded-[999px] border border-primary/15 bg-primary/[0.06] px-3 py-1.5 font-label text-[9px] font-bold uppercase tracking-[0.15em] text-primary">
          +12.4%
        </div>
      </div>

      <div className="h-[18rem] min-h-0 min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart
            data={performancePoints}
            margin={{ top: 14, right: 12, left: -18, bottom: 8 }}
          >
            <defs>
              <linearGradient id="profileFocusArea" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#9cff93" stopOpacity="0.26" />
                <stop offset="100%" stopColor="#00fc40" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="rgba(255,255,255,0.055)"
              strokeDasharray="5 10"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#777575", fontSize: 10, fontFamily: "Space Grotesk" }}
              tickMargin={14}
            />
            <YAxis domain={[0, 9]} hide />
            <Tooltip
              content={<ProfileChartTooltip />}
              cursor={{
                stroke: "rgba(156,255,147,0.22)",
                strokeDasharray: "4 7",
              }}
            />
            <ReferenceLine
              y={4}
              stroke="rgba(222,255,171,0.24)"
              strokeDasharray="5 10"
              strokeWidth={1.4}
            />
            <Area
              activeDot={{
                fill: "#0b0c0b",
                r: 6,
                stroke: "#9cff93",
                strokeWidth: 3,
              }}
              dataKey="hours"
              dot={{
                fill: "#0b0c0b",
                r: 4,
                stroke: "#9cff93",
                strokeWidth: 2.5,
              }}
              fill="url(#profileFocusArea)"
              stroke="#9cff93"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={4}
              type="monotone"
            />
            <Area
              activeDot={false}
              dataKey="target"
              dot={false}
              fill="transparent"
              stroke="#deffab"
              strokeDasharray="5 10"
              strokeOpacity={0.38}
              strokeWidth={2}
              type="monotone"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SkillRadar() {
  const labels = [
    ["Client mgmt", "top-0 left-1/2 -translate-x-1/2"],
    ["Metrics", "right-0 top-[26%]"],
    ["User flow", "bottom-[24%] right-0"],
    ["Research", "bottom-0 right-[22%]"],
    ["Access", "bottom-0 left-[22%]"],
    ["Prototype", "bottom-[24%] left-0"],
    ["Visual", "left-0 top-[26%]"],
  ];

  return (
    <div className="relative mx-auto mt-8 aspect-square w-full max-w-[430px]">
      {labels.map(([label, position]) => (
        <span
          key={label}
          className={`absolute ${position} max-w-24 text-center font-label text-[9px] font-bold uppercase tracking-[0.13em] text-outline`}
        >
          {label}
        </span>
      ))}

      <svg className="absolute inset-[12%] h-[76%] w-[76%]" viewBox="0 0 100 100">
        {[18, 32, 46].map((offset) => (
          <polygon
            key={offset}
            fill="none"
            points={`50,${offset} ${92 - offset / 3},${34 + offset / 4} ${90 - offset / 5},${70 - offset / 5} ${62 - offset / 8},${96 - offset / 4} ${38 + offset / 8},${96 - offset / 4} ${10 + offset / 5},${70 - offset / 5} ${8 + offset / 3},${34 + offset / 4}`}
            stroke="rgba(255,255,255,0.09)"
            strokeWidth="0.8"
          />
        ))}
        {[
          ["50", "50", "50", "5"],
          ["50", "50", "90", "30"],
          ["50", "50", "90", "70"],
          ["50", "50", "70", "95"],
          ["50", "50", "30", "95"],
          ["50", "50", "10", "70"],
          ["50", "50", "10", "30"],
        ].map(([x1, y1, x2, y2]) => (
          <line
            key={`${x2}-${y2}`}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.8"
            x1={x1}
            x2={x2}
            y1={y1}
            y2={y2}
          />
        ))}
        <polygon
          fill="rgba(156,255,147,0.14)"
          points="50,13 82,34 77,66 61,86 39,83 21,66 29,35"
          stroke="#9cff93"
          strokeWidth="1.8"
        />
        <polygon
          fill="none"
          points="50,28 68,43 62,61 55,72 45,70 35,60 40,45"
          stroke="#ff7351"
          strokeDasharray="2 3"
          strokeWidth="1.2"
        />
        <polygon
          fill="none"
          points="50,9 86,30 84,75 50,94 16,75 15,30"
          stroke="#deffab"
          strokeOpacity="0.65"
          strokeWidth="1.1"
        />
      </svg>
    </div>
  );
}

function AchievementsPanel({ title }: { title: string }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollAchievements = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <Panel>
      <div className="flex items-center justify-between gap-4">
        <Label>{title}</Label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollAchievements("left")}
            className="flex h-9 w-9 items-center justify-center rounded-[999px] border border-white/[0.08] text-on-surface-variant transition-colors hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            aria-label="Scroll achievements left"
          >
            <span className="material-symbols-outlined text-base">chevron_left</span>
          </button>
          <button
            type="button"
            onClick={() => scrollAchievements("right")}
            className="flex h-9 w-9 items-center justify-center rounded-[999px] border border-white/[0.08] text-on-surface-variant transition-colors hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            aria-label="Scroll achievements right"
          >
            <span className="material-symbols-outlined text-base">chevron_right</span>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="hide-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
      >
        {achievements.map((achievement) => (
          <article
            key={achievement.title}
            className="min-w-[260px] snap-start rounded-[1.25rem] border border-white/[0.07] bg-white/[0.03] p-5 sm:min-w-[300px]"
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.15rem] border border-white/[0.08] bg-black/35 ${achievement.color}`}
              >
                <span className="material-symbols-outlined text-3xl">{achievement.icon}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-headline text-sm font-black uppercase tracking-[0.14em] text-white">
                    {achievement.title}
                  </h3>
                  <span className="font-label text-[10px] font-black text-outline">
                    {achievement.count}
                  </span>
                </div>
                <p className="mt-2 font-body text-xs leading-5 text-on-surface-variant">
                  {achievement.description}
                </p>
              </div>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-[999px] bg-white/[0.06]">
              <div className="h-full rounded-[999px] bg-primary" style={{ width: achievement.width }} />
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

export default function ProfilePage() {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const user = useAppSelector((state) => state.auth.user);
  const t = copy;

  const fullName = useMemo(
    () => [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Kinetic Operator",
    [user?.firstName, user?.lastName],
  );
  const initials = `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}` || "KL";
  const operatorId = user?.id?.slice(0, 8).toUpperCase() ?? "ACTIVE";

  return (
    <div className="relative h-screen overflow-hidden bg-[#0b0c0b] pt-16 text-on-surface">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(234,255,222,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(234,255,222,0.018)_1px,transparent_1px)] bg-[size:56px_56px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_50%_-20%,rgba(0,252,64,0.11),transparent_60%)]" />

      <main className="hide-scrollbar relative z-10 h-full overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1240px] space-y-6">
          <div className="flex flex-col gap-5 rounded-[2rem] border border-white/[0.07] bg-black/40 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:p-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-[999px] bg-primary-fixed/[0.07] px-3 py-1.5 font-label text-[9px] font-bold uppercase tracking-[0.17em] text-primary">
                <span className="material-symbols-outlined block text-sm leading-none">person_pin_circle</span>
                {t.eyebrow}
              </div>
              <h1 className="font-headline text-3xl font-black uppercase leading-none tracking-tight text-white sm:text-5xl">
                {t.title}
              </h1>
              <p className="mt-3 max-w-xl font-body text-sm leading-6 text-on-surface-variant">
                {t.subtitle}
              </p>
            </div>

            <div className="min-w-60 space-y-2">
              <div className="flex items-center justify-between gap-4">
                <Label>{t.language}</Label>
                <span className="font-label text-[9px] uppercase tracking-[0.16em] text-primary">
                  {t.languageNote}
                </span>
              </div>
              <LanguageSelector language={language} onChange={setLanguage} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
            <aside className="space-y-5 xl:col-span-3">
              <Panel className="text-center">
                <div className="mx-auto mb-5 flex h-36 w-36 items-center justify-center rounded-[999px] border border-dashed border-primary/45 bg-primary/[0.035] p-2">
                  <div className="relative h-28 w-28 overflow-hidden rounded-[999px] border border-white/10 bg-surface-container-lowest">
                    {user?.imgUrl ? (
                      <img
                        src={user.imgUrl}
                        alt={fullName}
                        className="h-full w-full object-cover grayscale-[35%] contrast-125"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(0,252,64,0.18),transparent_62%)] font-headline text-4xl font-black text-primary">
                        {initials}
                      </div>
                    )}
                    <span className="absolute bottom-1 right-1 rounded-[999px] bg-primary-fixed px-2 py-1 font-label text-[9px] font-black text-on-primary-fixed">
                      LVL 84
                    </span>
                  </div>
                </div>

                <h2 className="break-words font-headline text-2xl font-black uppercase tracking-widest text-white">
                  {fullName}
                </h2>
                <p className="mt-2 font-label text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                  OP_ID: {operatorId}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 text-left">
                  {[
                    [t.technical, "86%"],
                    [t.softSkills, "92%"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-[1rem] border border-white/[0.06] bg-white/[0.025] p-3"
                    >
                      <Label>{label}</Label>
                      <p className="mt-2 font-headline text-xl font-black text-white">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-2">
                  <button className="rounded-[999px] bg-primary-container px-4 py-3 font-headline text-[10px] font-black uppercase tracking-[0.16em] text-on-primary-container transition-all hover:bg-primary-fixed hover:shadow-[0_0_20px_rgba(0,252,64,0.2)]">
                    {t.edit}
                  </button>
                  <button className="rounded-[999px] border border-white/[0.08] px-4 py-3 font-headline text-[10px] font-black uppercase tracking-[0.16em] text-on-surface-variant transition-colors hover:border-primary/30 hover:text-primary">
                    {t.sync}
                  </button>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-5 text-left">
                  <Label>{t.experience}</Label>
                  <span className="font-headline text-sm font-black uppercase tracking-widest text-white">
                    8 Years
                  </span>
                </div>
              </Panel>

              <Panel>
                <Label>{t.identity}</Label>
                <div className="mt-5 space-y-4">
                  <div className="border-b border-white/[0.06] pb-3">
                    <p className="font-label text-[10px] uppercase tracking-widest text-outline">
                      {t.email}
                    </p>
                    <p className="mt-1 break-all font-headline text-sm text-white">
                      {user?.email ?? "operator@kinetic.local"}
                    </p>
                  </div>
                  <div className="border-b border-white/[0.06] pb-3">
                    <p className="font-label text-[10px] uppercase tracking-widest text-outline">
                      {t.verification}
                    </p>
                    <p className="mt-1 font-headline text-sm font-bold uppercase tracking-widest text-primary">
                      {user?.emailVerified ? t.confirmed : t.pending}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="font-label text-[10px] uppercase tracking-widest text-outline">
                        {t.role}
                      </p>
                      <p className="mt-1 font-headline text-sm font-bold uppercase tracking-widest text-primary">
                        {user?.role ?? "USER"}
                      </p>
                    </div>
                    <div>
                      <p className="font-label text-[10px] uppercase tracking-widest text-outline">
                        {t.status}
                      </p>
                      <p className="mt-1 font-headline text-sm font-bold uppercase tracking-widest text-secondary">
                        {t.online}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="font-label text-[10px] uppercase tracking-widest text-outline">
                      {t.localRank}
                    </p>
                    <p className="mt-1 font-headline text-sm font-bold uppercase tracking-widest text-tertiary">
                      Cohort 04 / Focus 91
                    </p>
                  </div>
                </div>
              </Panel>
            </aside>

            <Panel className="xl:col-span-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <Label>{t.analytics}</Label>
                  <p className="mt-2 font-headline text-2xl font-black uppercase tracking-tight text-white">
                    Learning velocity
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 font-label text-[10px] uppercase tracking-[0.14em] text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-[999px] bg-primary" />
                    Achieved
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-[999px] bg-error" />
                    Progressing
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-[999px] bg-tertiary" />
                    Want learn
                  </span>
                </div>
              </div>

              <PerformanceLineChart />
              <SkillRadar />
            </Panel>

            <aside className="space-y-5 xl:col-span-4">
              <Panel>
                <Label>{t.radarLegend}</Label>
                <ul className="mt-5 space-y-4">
                  {[
                    ["radio_button_unchecked", "Don't know this competency", "text-outline"],
                    ["fiber_manual_record", "Novice", "text-primary"],
                    ["check_circle", "Advanced beginner", "text-primary"],
                    ["task_alt", "Competent", "text-primary"],
                    ["adjust", "Proficient", "text-error"],
                    ["stars", "Expert", "text-tertiary"],
                  ].map(([icon, label, color]) => (
                    <li key={label} className="flex items-center gap-3 text-xs tracking-wide">
                      <span className={`material-symbols-outlined text-base ${color}`}>{icon}</span>
                      <span className="text-on-surface-variant">{label}</span>
                    </li>
                  ))}
                </ul>
              </Panel>

              <AchievementsPanel title={t.achievements} />
            </aside>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            <Panel className="lg:col-span-5">
              <div className="flex items-center justify-between gap-4">
                <Label>{t.learningHistory}</Label>
                <button className="text-outline transition-colors hover:text-primary" aria-label="Open history">
                  <span className="material-symbols-outlined text-lg">open_in_new</span>
                </button>
              </div>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.06] text-outline">
                      <th className="pb-3 font-label font-bold uppercase tracking-widest">Course</th>
                      <th className="pb-3 font-label font-bold uppercase tracking-widest">Certificate</th>
                      <th className="pb-3 text-right font-label font-bold uppercase tracking-widest">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-on-surface-variant">
                    {historyRows.map(([course, certification, duration]) => (
                      <tr key={course} className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.035]">
                        <td className="py-3 text-white">{course}</td>
                        <td className={certification === "YES" ? "py-3 text-primary" : "py-3 text-outline"}>
                          {certification}
                        </td>
                        <td className="py-3 text-right font-headline font-bold text-white">{duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>

            <Panel className="lg:col-span-4">
              <Label>{t.metrics}</Label>
              <div className="mt-5 space-y-3">
                {metrics.map(([icon, label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 rounded-[1rem] border border-white/[0.06] bg-white/[0.025] p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-base text-outline">{icon}</span>
                      <span className="font-label text-[10px] uppercase tracking-[0.13em] text-on-surface-variant">
                        {label}
                      </span>
                    </div>
                    <span className="font-headline text-xl font-black text-white">{value}</span>
                  </div>
                ))}
              </div>
              <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-[999px] border border-primary/20 bg-primary/[0.04] px-4 py-3 font-headline text-[10px] font-black uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/[0.1]">
                <span className="material-symbols-outlined text-base">download</span>
                {t.export}
              </button>
            </Panel>

            <Panel className="lg:col-span-3">
              <Label>{t.commit}</Label>
              <div className="mt-5 space-y-3">
                <input
                  readOnly
                  value={fullName}
                  className="w-full rounded-[1rem] border border-white/[0.07] bg-white/[0.025] px-4 py-3 font-headline text-sm uppercase tracking-widest text-white outline-none"
                />
                <input
                  readOnly
                  value={user?.email ?? "operator@kinetic.local"}
                  className="w-full rounded-[1rem] border border-white/[0.07] bg-white/[0.025] px-4 py-3 font-headline text-sm text-white outline-none"
                />
              </div>
              <div className="mt-5 grid gap-2">
                <button className="rounded-[999px] bg-primary px-5 py-3 font-headline text-[10px] font-black uppercase tracking-widest text-on-primary transition-all hover:bg-primary-fixed">
                  {t.save}
                </button>
                <Link
                  to="/dashboard"
                  className="rounded-[999px] border border-white/[0.08] px-5 py-3 text-center font-headline text-[10px] font-black uppercase tracking-widest text-on-surface-variant transition-colors hover:border-primary/30 hover:text-primary"
                >
                  {t.discard}
                </Link>
              </div>
            </Panel>
          </div>

          <footer className="flex flex-col gap-3 border-t border-white/[0.06] pb-8 pt-5 font-label text-[10px] uppercase tracking-[0.16em] text-outline sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-2 font-bold text-primary">
                <span className="h-1.5 w-1.5 rounded-[999px] bg-primary animate-pulse" />
                Status: live
              </span>
              <span>Node: K-LAB-ALPHA-08</span>
              <span>Latency: 12ms</span>
            </div>
            <span>Kinetic Lab // Core_v2.1.0</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
