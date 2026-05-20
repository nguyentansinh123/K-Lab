import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export interface ResourceSlice {
  label: string;
  percentage: number;
  colorClass: string;
  color?: string;
}

interface ResourceAllocationProps {
  slices?: ResourceSlice[];
  efficiency?: number;
}

const defaultSlices: ResourceSlice[] = [
  { label: "Logic_Synt", percentage: 45, colorClass: "bg-primary", color: "#9cff93" },
  { label: "System_Arch", percentage: 35, colorClass: "bg-tertiary", color: "#deffab" },
  { label: "Idle/Misc", percentage: 20, colorClass: "bg-outline", color: "#777575" },
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
        {/* Donut chart */}
        <div className="relative w-32 h-32 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={slices}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={56}
                dataKey="percentage"
                strokeWidth={0}
                startAngle={90}
                endAngle={-270}
                isAnimationActive={false}
              >
                {slices.map((slice, i) => (
                  <Cell key={i} fill={slice.color ?? "#9cff93"} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center label overlaid with absolute positioning */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-xl font-headline font-black">{efficiency}%</div>
            <div className="text-[8px] font-label text-outline uppercase">Efficiency</div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {slices.map((slice) => (
            <div key={slice.label} className="flex items-center gap-2">
              <div className={`w-2 h-2 shrink-0 rounded-full ${slice.colorClass}`} />
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
