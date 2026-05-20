const footerLinks = [
  { label: "System Status", href: "#" },
  { label: "API Docs", href: "#" },
  { label: "Protocol", href: "#" },
];

export default function DashboardFooter() {
  return (
    <footer className="flex justify-between items-center w-full px-8 py-4 bg-surface-container-lowest border-t border-outline-variant/10 shrink-0">
      <div className="text-sm font-headline font-bold text-on-surface">
        KINETIC LAB // V.01
      </div>

      <div className="hidden md:flex gap-8">
        {footerLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-body text-xs tracking-widest uppercase text-outline hover:text-on-surface transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="text-primary font-body text-[10px] tracking-widest uppercase font-bold">
        © 2024 KINETIC_LAB_V.01 // ALL SYSTEMS OPERATIONAL
      </div>
    </footer>
  );
}
