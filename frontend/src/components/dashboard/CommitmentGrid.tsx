export interface CommitDay {
  date: string;  // "YYYY-MM-DD"
  hours: number;
}

interface CommitmentGridProps {
  /** Full year of data keyed by "YYYY-MM-DD". Reserved for future use. */
  data?: CommitDay[];
  /** Year to display. Reserved for future use. */
  year?: number;
}

// ── Component ──────────────────────────────────────────────────────────────
export default function CommitmentGrid(_props: CommitmentGridProps) {
  return (
    <section className="space-y-6">
      {/* ── Header ── */}
      <div className="flex justify-between items-end">
        <h3 className="text-xs font-label font-bold uppercase tracking-[0.4em] text-on-surface-variant">
          Commitment_Grid
        </h3>
        <div className="flex items-center gap-2 text-[10px] font-label text-outline">
          Less
          {["bg-surface-container-highest","bg-primary/20","bg-primary/50","bg-primary/80","bg-primary glow-primary"].map((cls) => (
            <div key={cls} className={`w-3 h-3 ${cls}`} />
          ))}
          More
        </div>
      </div>
    </section>
  );
}
