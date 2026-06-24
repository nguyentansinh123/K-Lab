const footerLinks = ["Documentation", "GitHub", "Changelog", "Privacy"];

export default function Footer() {
  return (
    <footer className="w-full px-3 pb-5 pt-2 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-6 rounded-[1.75rem] border border-white/[0.06] bg-black/55 px-6 py-6 backdrop-blur-sm md:flex-row md:px-8">
        <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.18em] text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-[999px] border border-primary-fixed/25 bg-primary-fixed/[0.07] text-[10px] text-primary-fixed">K</span>
          Kinetic <span className="-ml-2 text-primary-fixed">Lab</span>
        </div>

        <div className="text-[9px] uppercase tracking-[0.16em] text-outline">
          © 2025 KINETIC LAB. Track Smarter.
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {footerLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="cursor-pointer rounded-[999px] px-3 py-2 text-[9px] uppercase tracking-[0.14em] text-outline outline-none transition-colors duration-200 hover:bg-white/[0.05] hover:text-primary-fixed focus-visible:ring-2 focus-visible:ring-primary-fixed/70"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
