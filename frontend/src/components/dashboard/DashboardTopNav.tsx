import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "DASHBOARD", href: "/dashboard" },
  { label: "SESSION", href: "/session" },
  { label: "ARCHIVE", href: "#" },
  { label: "TELEMETRY", href: "#" },
];

export default function DashboardTopNav() {
  const { pathname } = useLocation();

  return (
    <header className="flex justify-between items-center w-full px-6 h-16 bg-surface border-b border-outline-variant/10 z-30 shrink-0">
      <div className="flex items-center gap-4">
        <Link
          to="/dashboard"
          className="text-2xl font-headline font-black tracking-widest text-primary hover:opacity-90 transition-opacity"
        >
          KINETIC LAB
        </Link>

        <nav className="hidden sm:flex items-center gap-6 ml-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return isActive ? (
              <span
                key={link.label}
                className="text-primary font-bold border-b-2 border-primary pb-1 font-headline uppercase tracking-tighter cursor-default"
              >
                {link.label}
              </span>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="text-on-surface-variant font-medium font-headline uppercase tracking-tighter hover:text-primary transition-all duration-200"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-highest border border-outline-variant/10">
          <span className="material-symbols-outlined text-primary text-sm">sensors</span>
          <span className="text-[10px] font-label font-bold text-primary tracking-widest uppercase">
            OPERATIONAL
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="w-8 h-8 bg-surface-container-highest ml-2 overflow-hidden border border-outline-variant/20 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-on-surface-variant text-sm">
              person
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
