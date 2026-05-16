import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/dispatch";
import UserSessionMenu from "./UserSessionMenu";

const navLinks = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "How it Works", to: "/#how-it-works" },
  { label: "Docs", to: "/#docs" },
  { label: "GitHub", to: "/#github" },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { accessToken, status, user } = useAppSelector((state) => state.auth);

  const isActive = (to: string) => location.pathname === to;
  const isAuthenticated = Boolean(accessToken) && status === "authenticated";

  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-xl z-50 border-b border-outline-variant/15 shadow-[0_0_40px_rgba(0,252,64,0.08)]">
      <div className="flex justify-between items-center px-8 h-16">
        {/* Logo */}
        <Link to="/" className="group">
          <span className="text-2xl font-black text-primary-container tracking-widest uppercase transition-all duration-200 group-hover:drop-shadow-[0_0_8px_rgba(0,252,64,0.4)]">
            KINETIC LAB
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`cursor-pointer font-body tracking-wider uppercase text-xs transition-colors duration-200 ${
                isActive(link.to)
                  ? "text-primary-fixed border-b-2 border-primary-fixed pb-1"
                  : "text-outline hover:text-primary-fixed"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side — CTA + hamburger */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <UserSessionMenu user={user} />
          ) : (
            <Link
              to="/register"
              className="cursor-pointer hidden md:block bg-primary-container text-on-primary-container px-6 py-2 text-xs font-bold uppercase tracking-widest ion-trace active:scale-95 transition-all hover:brightness-110"
            >
              Get Started
            </Link>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="cursor-pointer md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-primary-fixed transition-all duration-200 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-primary-fixed transition-all duration-200 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-primary-fixed transition-all duration-200 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          mobileOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-8 pb-6 pt-2 flex flex-col gap-4 border-t border-outline-variant/10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`cursor-pointer tracking-wider uppercase text-xs transition-colors duration-200 ${
                isActive(link.to)
                  ? "text-primary-fixed"
                  : "text-outline hover:text-primary-fixed"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-2">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="cursor-pointer border border-outline-variant/30 text-primary px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:border-primary/50 hover:bg-primary/5 active:scale-95 transition-all"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setMobileOpen(false)}
              className="cursor-pointer bg-primary-container text-on-primary-container px-5 py-2.5 text-xs font-bold uppercase tracking-widest ion-trace active:scale-95 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
