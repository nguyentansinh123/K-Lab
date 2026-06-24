import { useState } from "react";

export interface SessionDetails {
  title: string;
  appName: string;
  topic: string;
}

interface SessionDetailsPanelProps {
  details: SessionDetails;
  onChange: (details: SessionDetails) => void;
  contained?: boolean;
}

const FIELDS: { key: keyof SessionDetails; label: string; placeholder: string }[] = [
  { key: "title", label: "Title", placeholder: "DEEP_WORK_01" },
  { key: "appName", label: "App_Name", placeholder: "VS_CODE" },
  { key: "topic", label: "Topic", placeholder: "SYSTEM_ARCH" },
];

export default function SessionDetailsPanel({ details, onChange, contained = false }: SessionDetailsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${contained ? "absolute" : "fixed"} bottom-0 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 px-2`}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="mx-auto flex w-fit flex-col items-center"
      >
        <div
          className={`group flex items-center gap-2 rounded-t-[1rem] border-x border-t px-8 py-2 backdrop-blur-md transition-all hover:bg-surface ${
            isOpen
              ? "border-primary/60 bg-surface"
              : "border-outline/20 bg-surface/50 hover:border-primary/40"
          }`}
        >
          <span className="font-label text-[10px] tracking-[0.4em] text-primary uppercase">
            Session_Details
          </span>
          <span
            className={`material-symbols-outlined text-primary text-xs transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            keyboard_arrow_up
          </span>
        </div>
      </button>

      <div
        className={`overflow-hidden rounded-t-[1.25rem] border-x border-t border-primary/30 bg-surface-container-high/95 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[300px]" : "max-h-0"
        }`}
      >
        <div className={`grid grid-cols-1 gap-4 p-5 ${contained ? "" : "md:grid-cols-3 md:p-8"}`}>
          {FIELDS.map(({ key, label, placeholder }) => (
            <div key={key} className="space-y-2">
              <label className="font-label text-[10px] font-bold tracking-widest text-primary uppercase block ml-1">
                {label}
              </label>
              <input
                type="text"
                value={details[key]}
                placeholder={placeholder}
                onChange={(e) => onChange({ ...details, [key]: e.target.value })}
                className="w-full rounded-[0.75rem] border border-primary/25 bg-black px-3 py-2 font-mono text-xs uppercase text-primary outline-none transition-colors placeholder:text-primary/40 focus:border-primary focus:ring-1 focus:ring-primary/30"
              />
            </div>
          ))}
        </div>
        <div className="h-4 bg-primary/5 w-full" />
      </div>
    </div>
  );
}
