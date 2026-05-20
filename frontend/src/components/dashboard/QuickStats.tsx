// Swap `data` prop with real API response when ready
export interface QuickStatsData {
  streak: number;
  categoryLeader: string;
  totalHours: number;
  loadPercentage: number;
}

interface QuickStatsProps {
  data?: QuickStatsData;
}

const defaultData: QuickStatsData = {
  streak: 14,
  categoryLeader: "ALGORITHMS",
  totalHours: 142.5,
  loadPercentage: 65,
};

export default function QuickStats({ data = defaultData }: QuickStatsProps) {
  return (
    <div className="bg-surface-container-high border-l-2 border-primary p-6 space-y-6 h-full">
      <div>
        <div className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">
          Quick_Stats
        </div>

        <div className="mt-4 space-y-4">
          <div className="bg-surface-container p-3 border border-outline-variant/10">
            <div className="text-[9px] font-label text-outline uppercase">
              Streak
            </div>
            <div className="text-xl font-headline font-bold">
              {data.streak} DAYS
            </div>
          </div>

          <div className="bg-surface-container p-3 border border-outline-variant/10">
            <div className="text-[9px] font-label text-outline uppercase">
              Category_Leader
            </div>
            <div className="text-xl font-headline font-bold text-primary">
              {data.categoryLeader}
            </div>
          </div>

          <div className="bg-surface-container p-3 border border-outline-variant/10">
            <div className="text-[9px] font-label text-outline uppercase">
              Total_Time
            </div>
            <div className="text-xl font-headline font-bold">
              {data.totalHours} HRS
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-outline-variant/10">
        <div className="text-[10px] font-label text-outline uppercase mb-3">
          Load_Status
        </div>
        <div className="h-1 bg-surface-container-highest w-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-700"
            style={{ width: `${data.loadPercentage}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[9px] font-label">
          <span>SYSTEM_NOMINAL</span>
          <span className="text-primary">{data.loadPercentage}%</span>
        </div>
      </div>
    </div>
  );
}
