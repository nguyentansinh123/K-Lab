const footerLinks = ["Documentation", "GitHub", "Changelog", "Privacy"];

export default function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/15 bg-black flex flex-col md:flex-row justify-between items-center px-12 py-8 gap-6">
      <div className="text-lg font-black text-white">KINETIC LAB</div>

      <div className="text-outline text-[10px] tracking-widest uppercase">
        © 2025 KINETIC LAB. Track Smarter.
      </div>

      <div className="flex gap-8">
        {footerLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="cursor-pointer text-[10px] tracking-widest uppercase text-outline hover:text-primary-fixed hover:underline decoration-2 underline-offset-4 transition-all duration-300"
          >
            {link}
          </a>
        ))}
      </div>
    </footer>
  );
}
