interface EndSessionModalProps {
  onResume: () => void;
  onEnd: () => void;
}

export default function EndSessionModal({ onResume, onEnd }: EndSessionModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-surface/80 backdrop-blur-md">
      <div className="bg-surface border border-primary p-8 max-w-sm w-full mx-4 shadow-[0_0_30px_rgba(156,255,147,0.15)] flex flex-col items-center text-center gap-6">
        <div className="space-y-2">
          <h2 className="font-headline text-2xl tracking-widest text-primary uppercase">
            END_SESSION?
          </h2>
          <p className="font-mono text-xs tracking-wider text-on-surface-variant uppercase">
            Do you want to end this activity?
          </p>
        </div>

        <div className="w-full h-px bg-primary/20" />

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <button
            onClick={onResume}
            className="flex-1 bg-transparent border border-outline-variant text-on-surface-variant font-mono font-light py-2 tracking-[0.2em] text-xs uppercase hover:text-on-surface hover:border-on-surface/50 transition-colors"
          >
            RESUME
          </button>
          <button
            onClick={onEnd}
            className="flex-1 bg-transparent border border-primary text-primary font-mono font-light py-2 tracking-[0.2em] text-xs uppercase hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(156,255,147,0.3)] transition-all"
          >
            END_ACTIVITY
          </button>
        </div>
      </div>
    </div>
  );
}
