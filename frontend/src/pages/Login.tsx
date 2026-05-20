import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { LoginType } from "../fetchLib/authapi";
import { login } from "../features/auth/AuthSlice";
import { useAppDispatch } from "../hooks/dispatch";
import { toast } from "react-toastify";

export default function Login() {
  const [mounted, setMounted] = useState(false);
  const [loginData, setLoginData] = useState<LoginType>({
    email: "",
    password: "",
  });
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const LoginHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast
      .promise(appDispatch(login(loginData)).unwrap(), {
        pending: "Logging in...",
        success: "Login successful",
        error: {
          render({ data }) {
            return data instanceof Error ? data.message : "Login failed";
          },
        },
      })
      .then(() => navigate("/dashboard"));
  };

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const reveal = (delay: number) =>
    `transition-all duration-700 ease-out ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }` + ` delay-[${delay}ms]`;

  return (
    <div className="h-screen overflow-hidden flex flex-col md:flex-row pt-16">
      {/* Left — visual anchor */}
      <section className="hidden md:flex md:w-1/2 relative overflow-hidden bg-surface-container-low">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-surface via-transparent to-transparent opacity-60" />

        <img
          alt="Deep Work Environment"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7rTQ6vMcpOGZ3YyQj6RjhJNMWLiB2qfUYR0sncX-3TxHptVh82eeZSK7Kpf7YxP5WH7UAbBxDaNhe5JpL9HT0ho4DDgPRiMBaMbHSnNKPNK1m-p11UJ8jOiieY96spxQirJjsRDLhd47wIE9a2bVxs1HaleU8cTxCnV8ez-s21YP4qgv8sSeEEkAtel7OYZzZuWRaw55xgtweDy7VWVqE59yj_6ckKMnxZ52h_ZsCiW_xG6-AmqsqioNSEw5w_P7ucwqKJd-DHmU"
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-40 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />

        {/* Hero text */}
        <div
          className={`absolute bottom-10 left-10 z-20 max-w-md ${reveal(200)}`}
        >
          <h1 className="font-headline font-black text-4xl lg:text-5xl text-primary leading-tight tracking-tighter uppercase mb-3">
            PULSE OF <br />
            FOCUS
          </h1>
          <p className="text-on-surface-variant text-base tracking-wide uppercase">
            Access the telemetry of your intellectual evolution. Precision
            engineered study analytics.
          </p>
        </div>
      </section>

      {/* Right — login form */}
      <section className="w-full md:w-1/2 flex items-center justify-center px-6 py-6 md:px-12 lg:px-20 bg-surface">
        <div className="w-full max-w-sm space-y-6">
          {/* Header */}
          <header className={`space-y-3 ${reveal(100)}`}>
            <div className="inline-block px-3 py-1 bg-surface-container-highest border-l-4 border-primary">
              <span className="font-headline text-[10px] tracking-[0.3em] text-primary uppercase">
                Study Session Authorized
              </span>
            </div>
            <h2 className="font-headline font-bold text-3xl text-on-surface tracking-tighter uppercase">
              RESUME YOUR SESSION
            </h2>
          </header>

          {/* Form */}
          <form
            className={`space-y-5 ${reveal(200)}`}
            onSubmit={LoginHandler}
          >
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="identifier"
                className="block font-headline text-[10px] tracking-[0.2em] text-outline uppercase font-bold"
              >
                OPERATIVE IDENTIFIER
              </label>
              <div className="relative group">
                <input
                  id="identifier"
                  name="email"
                  type="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="operative@kineticlab.sys"
                  className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant text-on-surface focus:outline-none focus:ring-0 placeholder:text-outline-variant py-4 px-3 font-body text-sm transition-all duration-300 focus:border-primary"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-focus-within:w-full" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="protocol"
                className="block font-headline text-[10px] tracking-[0.2em] text-outline uppercase font-bold"
              >
                FOCUS PROTOCOL
              </label>
              <div className="relative group">
                <input
                  id="protocol"
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="••••••••••••"
                  className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant text-on-surface focus:outline-none focus:ring-0 placeholder:text-outline-variant py-4 px-3 font-body text-sm transition-all duration-300 focus:border-primary"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-focus-within:w-full" />
              </div>
            </div>

            {/* Remember + forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded-none border-outline-variant bg-surface-container-lowest text-primary focus:outline-none focus:ring-0 focus:ring-offset-surface accent-primary"
                />
                <span className="font-headline text-[10px] tracking-widest text-on-surface-variant group-hover:text-primary transition-colors uppercase">
                  RETAIN SESSION
                </span>
              </label>
              <a
                href="#"
                className="font-headline text-[10px] tracking-widest text-outline hover:text-primary transition-colors uppercase underline decoration-1 underline-offset-4"
              >
                RECOVER KEY?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-primary-container text-on-primary font-headline font-black py-4 tracking-[0.2em] uppercase transition-all duration-200 hover:bg-primary hover:shadow-[0_0_20px_rgba(0,252,64,0.25)] active:scale-[0.98] neon-glow-sm"
            >
              ACCESS FOCUS DATA
            </button>
          </form>

          {/* Social / footer */}
          <footer className={`pt-4 space-y-4 ${reveal(300)}`}>
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-outline-variant/30" />
              <span className="flex-shrink mx-4 font-headline text-[10px] text-outline tracking-widest uppercase">
                OR SYNC VIA
              </span>
              <div className="flex-grow border-t border-outline-variant/30" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2.5 py-3 bg-surface-container border border-outline-variant/20 hover:bg-surface-container-high hover:border-primary/30 transition-all duration-200 font-headline text-[10px] tracking-widest uppercase text-on-surface">
                <span className="material-symbols-outlined text-sm">
                  terminal
                </span>
                KINETIC.SYS
              </button>
              <button className="flex items-center justify-center gap-2.5 py-3 bg-surface-container border border-outline-variant/20 hover:bg-surface-container-high hover:border-primary/30 transition-all duration-200 font-headline text-[10px] tracking-widest uppercase text-on-surface">
                <span className="material-symbols-outlined text-sm">
                  token
                </span>
                FOCUS.LINK
              </button>
            </div>

            <p className="text-center font-body text-xs tracking-widest text-on-surface-variant uppercase">
              NEW RESEARCHER?{" "}
              <Link
                to="/register"
                className="text-primary font-bold ml-2 hover:underline decoration-2 underline-offset-4 transition-all duration-200"
              >
                INITIALIZE PROFILE
              </Link>
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
}
