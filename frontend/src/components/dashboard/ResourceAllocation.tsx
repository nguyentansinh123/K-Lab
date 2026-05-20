// Swap `slices` + `efficiency` props with real API response when ready
export interface ResourceSlice {
  label: string;
  percentage: number;
  /** Tailwind bg class e.g. "bg-primary", "bg-tertiary", "bg-outline" */
  colorClass: string;
}

interface ResourceAllocationProps {
  slices?: ResourceSlice[];
  efficiency?: number;
}

const defaultSlices: ResourceSlice[] = [
  { label: "Logic_Synt", percentage: 45, colorClass: "bg-primary" },
  { label: "System_Arch", percentage: 35, colorClass: "bg-tertiary" },
  { label: "Idle/Misc", percentage: 20, colorClass: "bg-outline" },
];

export default function ResourceAllocation({
  slices = defaultSlices,
  efficiency = 88,
}: ResourceAllocationProps) {
  return (
    <div className="bg-surface-container p-6 border border-outline-variant/10 flex flex-col h-64">
      <div className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-6">
        Resource_Allocation
      </div>

      <div className="flex-1 flex items-center justify-around">
        {/* Donut rings */}
        <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
          <div className="absolute inset-0 rounded-full border-[10px] border-surface-container-highest" />
          <div
            className="absolute inset-0 rounded-full border-[10px] border-primary border-t-transparent border-l-transparent"
            style={{ transform: "rotate(45deg)" }}
          />
          <div
            className="absolute inset-0 rounded-full border-[10px] border-tertiary border-b-transparent border-r-transparent border-l-transparent"
            style={{ transform: "rotate(-120deg)" }}
          />
          <div className="text-center">
            <div className="text-xl font-headline font-black">{efficiency}%</div>
            <div className="text-[8px] font-label text-outline uppercase">
              Efficiency
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {slices.map((slice) => (
            <div key={slice.label} className="flex items-center gap-2">
              <div className={`w-2 h-2 shrink-0 ${slice.colorClass}`} />
              <div className="text-[10px] font-label text-on-surface uppercase">
                {slice.label} ({slice.percentage}%)
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
