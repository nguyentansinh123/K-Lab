import { useState, useEffect } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const sparklineData = [5, 8, 2, 15, 10, 20, 12, 22, 18, 25, 20].map((v, i) => ({ i, v }));

interface NeuralSyncDiagnosticProps {
  syncPct?: number;
}

export default function NeuralSyncDiagnostic({ syncPct = 94.2 }: NeuralSyncDiagnosticProps) {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = time.toLocaleTimeString("en-US", { hour12: false });

  return (
    <div className="bg-surface-container-high border-t-4 xl:border-t-0 xl:border-l-4 border-primary p-6 space-y-0 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">
          Neural_Sync_Diagnostic
        </div>
        <div className="w-2 h-2 bg-primary rounded-full sync-pulse" />
      </div>

      {/* Digital clock */}
      <div className="text-center py-4 border-b border-outline-variant/10">
        <div className="text-3xl font-headline font-black tracking-widest text-primary glow-text-primary">
          {timeStr}
        </div>
        <div className="text-[8px] font-label uppercase tracking-[0.2em] text-outline mt-1">
          Local_Time_Index
        </div>
      </div>

      {/* Sync % */}
      <div className="py-6 flex flex-col items-center justify-center">
        <div className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2">
          Sync_Status
        </div>
        <div className="text-5xl font-headline font-bold text-on-surface relative">
          {syncPct.toFixed(1)}
          <span className="text-lg text-primary absolute top-1 -right-4">%</span>
        </div>
      </div>

      {/* Sparkline */}
      <div className="bg-surface-container p-4 border border-outline-variant/10">
        <div className="flex justify-between items-center mb-2">
          <div className="text-[8px] font-label text-outline uppercase tracking-widest">
            Consistency
          </div>
          <div className="text-[8px] font-label text-primary uppercase">+2.1%</div>
        </div>
        <div className="w-full h-16">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9cff93" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#9cff93" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke="#9cff93"
                strokeWidth={2}
                fill="url(#sparkGradient)"
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Diagnostic text */}
      <div className="pt-4 border-t border-outline-variant/10 mt-auto">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-xs text-primary">memory</span>
          <span className="text-[9px] font-label text-outline uppercase tracking-widest">
            Diagnostic_Run
          </span>
        </div>
        <div className="text-xs font-body text-on-surface-variant leading-relaxed">
          Neural pathways optimized. Latency at 12ms. Synaptic density registering above nominal
          baseline.
        </div>
      </div>
    </div>
  );
}
