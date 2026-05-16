import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-black text-on-surface font-body selection:bg-primary-container selection:text-on-primary relative">
      {/* Environment layers */}
      <div className="fixed inset-0 z-0">
        {/* Terminal grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,255,65,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.05) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle, transparent 30%, rgba(0,0,0,0.8) 100%)",
          }}
        />
        {/* Scanlines */}
        <div
          className="fixed inset-0 pointer-events-none z-50"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,255,65,0) 0%, rgba(0,255,65,0.03) 50%, rgba(0,255,65,0) 100%)",
            backgroundSize: "100% 4px",
          }}
        />

        {/* Scrolling code decoration */}
        <div
          className="absolute right-10 top-0 bottom-0 w-64 opacity-5 font-mono text-[10px] pointer-events-none hidden lg:block overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          }}
        >
          {[0, 1].map((i) => (
            <div key={i} className="animate-[marquee_20s_linear_infinite]">
              {[
                "0x404_ERR_NODE_NOT_FOUND",
                "FETCHING SESSION_METADATA...",
                "ERR: PACKET_LOSS_CRITICAL",
                "TRACING ROUTE TO DASHBOARD...",
                "SYSTEM.HALT(0)",
                "MEMORY_LEAK_IN_GRID_SECTOR_7",
                "REBOOT_REQUIRED_TRUE",
                "KINETIC_LAB_PROTO_V4.2",
              ].map((line) => (
                <p key={`${i}-${line}`}>{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Side diagnostic bar */}
      <aside className="fixed left-0 top-0 bottom-0 w-16 md:w-24 border-r border-white/5 z-20 flex flex-col items-center py-10 gap-10 opacity-30">
        <div className="[writing-mode:vertical-rl] text-[10px] font-headline tracking-[0.5em] text-primary-container uppercase">
          diagnostic_mode
        </div>
        <div className="flex-1 w-px bg-gradient-to-b from-primary-container/50 via-primary-container/5 to-transparent" />
        <div className="space-y-4">
          <div className="w-1 h-1 bg-primary-container rounded-full" />
          <div className="w-1 h-1 bg-primary-container rounded-full animate-pulse" />
          <div className="w-1 h-1 bg-white/20 rounded-full" />
        </div>
      </aside>

      {/* Main content */}
      <main className="relative z-10 h-full w-full flex flex-col md:flex-row items-center justify-center px-12 md:px-24">
        <div className="max-w-7xl w-full flex flex-col md:grid md:grid-cols-12 gap-8 items-center md:items-end">
          {/* Left — Big 404 */}
          <div className="md:col-span-7 relative flex flex-col items-start">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-mono text-primary-container/60 tracking-[0.3em] uppercase">
                SYSTEM_STATE:
              </span>
              <span className="px-2 py-0.5 bg-error/10 border border-error/30 text-error text-[10px] font-mono">
                CRITICAL_EXCEPTION
              </span>
            </div>

            <h1 className="font-headline font-black text-[10rem] md:text-[18rem] leading-[0.8] tracking-tighter uppercase text-white/90 glitch-404">
              404
            </h1>

            <div className="mt-8 font-mono text-xs md:text-sm text-on-surface-variant flex gap-4 items-center">
              <span className="text-primary-container">&gt;</span>
              <p>
                Request{" "}
                <span className="text-white">ID_GRID_SEARCH</span> returned
                null reference. Target sector does not exist.
              </p>
              <span className="w-2 h-4 bg-primary-container animate-[cursor-blink_1s_infinite]" />
            </div>
          </div>

          {/* Right — Context & actions */}
          <div className="md:col-span-5 w-full flex flex-col gap-10 md:pb-8">
            <div className="space-y-2">
              <h2 className="text-primary-container font-headline font-bold text-3xl md:text-5xl tracking-tight uppercase">
                SESSION <br />
                INTERRUPTED
              </h2>
              <p className="text-on-surface-variant text-sm md:text-base leading-relaxed max-w-sm">
                Terminal connection lost. Your request has bypassed the{" "}
                <span className="text-primary-container">performance grid</span>{" "}
                and entered a non-existent node.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-6 w-full max-w-xs">
              {/* Primary */}
              <Link
                to="/"
                className="group relative overflow-hidden bg-primary-container px-8 py-4 flex items-center justify-between transition-transform active:scale-[0.98] scan-btn"
              >
                <span className="relative z-10 text-on-primary font-headline font-bold text-sm tracking-[0.1em] uppercase">
                  Reboot to Dashboard
                </span>
                <span className="material-symbols-outlined text-on-primary text-xl group-hover:translate-x-1 transition-transform">
                  bolt
                </span>
              </Link>

              {/* Secondary */}
              <button className="flex items-center gap-2 text-[11px] font-mono text-on-surface-variant hover:text-primary transition-colors group cursor-pointer">
                <span className="opacity-40 group-hover:opacity-100">[</span>
                <span className="tracking-widest uppercase">
                  Report Anomaly
                </span>
                <span className="opacity-40 group-hover:opacity-100">]</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom HUD */}
      <div className="fixed bottom-10 left-12 md:left-24 right-12 md:right-24 z-20 flex justify-between items-end pointer-events-none">
        <div className="flex flex-col gap-1">
          <div className="text-[9px] font-mono text-outline-variant tracking-widest uppercase">
            Kinetic Lab Terminal // v4.2
          </div>
          <div className="h-0.5 w-16 bg-primary-container/20" />
        </div>
        <div className="flex items-center gap-8 text-[9px] font-mono text-outline-variant uppercase tracking-widest">
          <div className="flex gap-4">
            <span>Lat: 40.7128</span>
            <span>Long: -74.0060</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-error animate-pulse">●</span> Signal: 0%
          </div>
        </div>
      </div>

      {/* Border frame */}
      <div className="fixed inset-0 pointer-events-none border border-white/5 m-4" />
    </div>
  );
}
