const footerLinks = [
  { label: "System Status", href: "#" },
  { label: "API Docs", href: "#" },
  { label: "Protocol", href: "#" },
];

export default function DashboardFooter() {
  return (
    <footer className="relative z-10 w-full shrink-0 px-3 pb-3 sm:px-6">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 rounded-[999px] border border-white/[0.06] bg-black/70 px-5 py-3 backdrop-blur-xl sm:px-6">
        <div className="text-[10px] font-headline font-bold uppercase tracking-[0.14em] text-on-surface">
          KINETIC LAB <span className="text-primary-fixed">// V.01</span>
        </div>

        <div className="hidden gap-1 md:flex">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-[999px] px-3 py-2 font-body text-[9px] uppercase tracking-[0.13em] text-outline transition-colors hover:bg-white/[0.05] hover:text-on-surface"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden font-body text-[9px] font-bold uppercase tracking-[0.13em] text-primary sm:block">
          ALL SYSTEMS OPERATIONAL
        </div>
      </div>
    </footer>
  );
}
