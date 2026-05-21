import { useState } from "react";

export interface SessionDetails {
  title: string;
  appName: string;
  topic: string;
}

interface SessionDetailsPanelProps {
  details: SessionDetails;
  onChange: (details: SessionDetails) => void;
}

const FIELDS: { key: keyof SessionDetails; label: string; placeholder: string }[] = [
  { key: "title", label: "Title", placeholder: "DEEP_WORK_01" },
  { key: "appName", label: "App_Name", placeholder: "VS_CODE" },
  { key: "topic", label: "Topic", placeholder: "SYSTEM_ARCH" },
];

export default function SessionDetailsPanel({ details, onChange }: SessionDetailsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl z-50">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="mx-auto flex w-fit flex-col items-center"
      >
        <div
          className={`flex items-center gap-2 border-x border-t px-8 py-2 backdrop-blur-md transition-all hover:bg-surface group ${
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
        className={`overflow-hidden transition-all duration-500 ease-in-out border-t backdrop-blur-xl shadow-[0_-20px_50px_rgba(0,0,0,0.5)] bg-surface-container-high border-primary/40 ${
          isOpen ? "max-h-[300px]" : "max-h-0"
        }`}
      >
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className="w-full bg-black border border-primary/40 px-3 py-2 text-primary font-mono text-xs focus:border-primary focus:ring-1 focus:ring-primary/30 focus:outline-none transition-colors placeholder:text-primary/40 uppercase"
              />
            </div>
          ))}
        </div>
        <div className="h-4 bg-primary/5 w-full" />
      </div>
    </div>
  );
}
